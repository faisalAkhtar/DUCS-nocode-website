import React from "react";
import "./Title.css";

class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1 className="title" id={this.props.id}>{this.props.children}</h1>;
  }
}
export default Title;
