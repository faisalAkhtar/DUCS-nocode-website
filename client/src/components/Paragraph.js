import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./Title.css";

class Paragraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p className="paragraph" id={this.props.id}>{ReactHtmlParser(this.props.children)}</p>;
  }
}
export default Paragraph;
