// give me a person component
import {
  useCallback,
  useState,
  useReducer,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { Brother } from "./models";
import { useCurrentUser } from "./App";

interface PersonProps {
  name: string;
  age: number;
  disabled: boolean;
  names: string[];
  status: "waiting" | "success";
  obj: {
    // 輸入的obj不能有額外的屬性
    id: string;
    title: string;
  };
  obj2: object;
  dict1: {
    [key: string]: string;
  };
  dict2: Record<string, string>;
  onClick: () => void;
  onChange: (id: number) => void;
  onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick2(event: React.MouseEvent<HTMLButtonElement>): void;
  setState: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  childrenElement: React.JSX.Element; // What is the difference between JSX.Element, ReactNode, and ReactElement? 結論：ReactNode更泛用
}

// 傳入的props可以多於PersonProps，不可以少，這跟常見的interface賦予不太一樣

// interface Test {
//   name: string;
//   age: number;
// }
// let test: Test = {
//   name: "John",
//   age: 20,
//   xx: 1,
// };

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

// use React FC props
//  React.FunctionComponent<PersonProps>
const Person = (props: PersonProps) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  // const [brother, setBrother] = useState<Brother>({} as Brother);
  // 如果你馬上幫brother賦值，那麼欺騙一下typescript也無所謂的，但我更喜歡用null

  function clickHandler(fn: React.Dispatch<React.SetStateAction<number>>) {
    fn((v) => v + 1);
  }

  // 不是紀錄執行結果，只是該函數的ref不變，無趣
  const memoizedCallback = useCallback(() => {
    console.log("call memoizedCallback");
    return { ok: count };
  }, [count]);

  // state 跟 action的type可以這樣寫
  function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch (action.type) {
      case "increment":
        return { count: state.count + action.payload + count };
      case "decrement":
        return { count: state.count - Number(action.payload) - count };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const divRef = useRef<HTMLDivElement>(null);
  // 這邊不是用HTMLDivElement|null
  // 而是在取用current時可能是null
  // 所以要檢查current

  console.log(divRef.current);

  useEffect(() => {
    if (!divRef.current) throw Error("divRef is not assigned");
    console.log(divRef.current);
  });

  const targetRef = useRef<number>(0);
  const handlerX = () => {
    targetRef.current = 1;
  };

  const countdownEl = useRef<CountdownHandle>(null);

  useEffect(() => {
    if (countdownEl.current) {
      countdownEl.current.start();
    }
  }, []);

  const [isLoading, load] = useLoading();

  const currentUser = useCurrentUser();

  return (
    <div>
      <p>Name: {currentUser.username}.</p>
      <h1 ref={divRef}>{props.name}</h1>
      <h2>{props.age}</h2>
      <button onClick={() => clickHandler(setCount)}>Click me</button>
      <button onClick={() => clickHandler(setCount2)}>Click me2</button>
      <h3>{count}</h3>
      <h3>{memoizedCallback().ok}</h3>
      <h3>{count2}</h3>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <Countdown ref={countdownEl} />;
    </div>
  );
};

export default Person;

type CountdownHandle = {
  start: () => void;
};

type CountdownProps = {};

const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
  // 可以匯出給外部呼叫的方法
  useImperativeHandle(ref, () => ({
    // start() has type inference here
    start() {
      console.log("start");
    },
  }));

  return <div>Countdown</div>;
});

// array返回值用as const 可以讓每一個位置的型別被正確推斷
function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
