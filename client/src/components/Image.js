import React from "react";
import "./Title.css";

class Image extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <img className="image" id={this.props.id} src={this.props.source}/>;
  }
}
export default Image;
