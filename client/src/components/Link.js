import React from "react";
import "./Title.css";

class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <a className="link" id={this.props.id} href={this.props.href} target="_blank">{this.props.children}</a>;
  }
}
export default Link;
