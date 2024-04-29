import {
  useState,
  createContext,
  useContext,
  forwardRef,
  ReactNode,
  useRef,
} from "react";

import "./App.css";
import Person from "./Person.tsx";
import MyClass from "./MyClass.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";

import { Brother } from "./models";

interface CurrentUserContextType {
  username: string;
}

// 有三種方法可以建立context的預設值
// 1. {} as CurrentUserContextType => 欺騙
// 2. 使用時加上!
// 3. 設計一個hook，在裡面檢查若沒有值就噴錯，變相使拿到的物件一定有值 (讚啦)
export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};

function App() {
  const [brother] = useState<Brother>({
    name: "Tom",
    age: 25,
  });
  console.log(brother);
  const props = {
    name: "John",
    age: 20,
    disabled: false,
    names: ["John", "Tom"],
    status: "waiting" as const,
    obj: {
      id: "1",
      title: "title",
    },
    obj2: {},
    dict1: {
      key: "value",
    },
    dict2: {
      key: "value",
      key2: "value2",
    },
    onClick: () => {},
    onChange: (id: number) => {
      console.log(id);
    },
    onChange2: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
    }, // e的型別是呼叫端要擔心的，這邊只是定義
    onClick2: (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(e);
    },
    setState: () => {}, // 即使這邊連參數都沒放，乍看之下不需要丟參數，但是因為在上面的interface有定義，所以這邊也要丟
    children: null,
    childrenElement: <div>children</div>,
  };

  const [currentUser, setCurrentUser] = useState<CurrentUserContextType>({
    username: "filiptammergard",
  });

  const ref = useRef();

  const handleClick = () => {
    // 這裡可以直接訪問按鈕的 DOM 元素
    console.log(ref.current);
  };

  return (
    <>
      <ErrorBoundary>
        <button
          // 事件出錯，不會被ErrorBoundary捕捉
          onClick={() => {
            throw new Error("cry");
          }}
        >
          Error
        </button>

        <Buggy />
        <CurrentUserContext.Provider value={currentUser}>
          <Person {...props} />
          <MyClass name="Jim" age={11} />
          <FancyButton ref={ref} onClick={handleClick}>
            <div>hello</div>
          </FancyButton>
        </CurrentUserContext.Provider>
        {/* <Person {...props} shit="1" />  可以發現spread props 可以傳入多餘的參數，但手動指派不行*/}
      </ErrorBoundary>
    </>
  );
}

export default App;

const FancyButton = forwardRef<
  HTMLButtonElement,
  {
    children?: ReactNode;
    onClick: () => void;
  }
>((props, ref) => (
  <button ref={ref} type={props.type} onClick={props.onClick}>
    {props.children}
  </button>
));

const Buggy = () => {
  const [toggle, setToggle] = useState(true);
  if (!toggle) {
    return new Error("QQ");
  }
  return <button onClick={() => setToggle(false)}>Buggy</button>;
};
