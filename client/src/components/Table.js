import React from "react";
import Div from "./Div";
import "./Title.css";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  createDivs=()=>{
    var table=this.props.children;
    return table.map((item,index)=>{
      return <Div id={item.id} >{item.props.children}</Div>
    })
     
  }
  componentDidMount(){
    var table=document.getElementById(this.props.id);
    if(table){
      table.style.gridTemplateColumns="repeat("+this.props.cols+",1fr)";
    }  
  }
  render() {
    return <div className="table" id={this.props.id}>
      {/* {this.props.children} */}
        {this.createDivs()}
    </div>;
  }
}

export default Table;
//table will be having row and cols 
//as we are saving it as an object so we can keep a 2d array to keep table 
// then 