import React from "react";
import "./Title.css";

class Paragraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p className="paragraph" id={this.props.id}>{this.props.children}</p>;
  }
}
export default Paragraph;
