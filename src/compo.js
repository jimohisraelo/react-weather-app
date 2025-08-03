import React from "react";

class ClassComponent extends React.Component{
  constructor(){
    super();
    this.state = {first_name: "Peter",
      last_name: "Fred"
    }
  }
  render() {
    return <h1>Hello, My name is {this.props.second_name} {this.state.first_name} Max {this.state.last_name}!</h1>
  }
}

export default ClassComponent;