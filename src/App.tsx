import { useState } from "react";

import "./App.css";
import Person from "./Person.tsx";

import { Brother } from "./models";

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

  return (
    <>
      <Person {...props} />

      {/* <Person {...props} shit="1" />  可以發現spread props 可以傳入多餘的參數，但手動指派不行*/}
    </>
  );
}

export default App;
