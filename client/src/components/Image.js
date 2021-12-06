import React from "react";
import "./Title.css";

class Image extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss) {
      if (mycss.width) element.style.width = mycss.width+"%";
      if (mycss.height) element.style.height = mycss.height+"%";
    }
  }
  componentDidUpdate(){
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss) {
      if (mycss.width) element.style.width = mycss.width+"%";
      // if (mycss.height) element.style.height = mycss.height+"%";
    }
  }
  render() {
    return (
      // <div>
        <img
          className={"image styleelement" + this.props.id}
          id={this.props.id}
          src={this.props.source}
        />
      // </div>
    );
  }
}
export default Image;
