import React from "react";
import "./Title.css";

class Div extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss) {
      if (mycss.width) element.style.width = mycss.width;
    }
  }
  componentDidUpdate(){
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss) {
      if (mycss.width) element.style.width = mycss.width;
      // if (mycss.height) element.style.height = mycss.height+"%";
    }
  }
  render() {
    return <div className="Div" id={this.props.id}>{this.props.children}
        {/* {
          this.props.rows.map((i,index)=>{
            this.props.cols.map((j,index2)=>{
              return <div id={this.props.id+"row"+index+"col"+index2} className="tableitem"></div>
            })
          })
        } */}
    </div>;
  }
}
export default Div;