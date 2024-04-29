import React from "react";

type MyProps = {
  name: string;
  age: number;
};

type MyState = {
  count: number;
};

export default class MyClass extends React.Component<MyProps, MyState> {
  state: MyState = {
    count: 0,
  };

  constructor(props: MyProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({ count: 3 });
  }

  clickHandller = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.clickHandller}>Add</button>
        {this.props.name} {this.state.count}
      </div>
    );
  }
}
