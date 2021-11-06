import React from "react";

class TitlePropertyModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.title);
    this.state = {
      id: this.props.object.id,
      rows: parseInt(this.props.object.props.rows),
      cols: parseInt(this.props.object.props.cols),
      children:this.props.object.props.children,
    };
    var table=this.state.children;
    var m=this.state.rows;
    var n=this.state.cols;
    if(m*n!==table.length){
      for(let i=table.length/n;i<m;i++){
        var j=0;
        console.log(table.length +" "+i + j +" "+(table.length%n<n));
        for( j=table.length%n;j<n;j++){
          console.log(table.length +" "+i+" "+j);
          var newElement = {};
          newElement.id = this.state.id+"row"+i+"col"+j;
          newElement.type = "div";
          newElement.props = {};
          newElement.props.children=[];
          table.push(newElement);
        }
      }
      this.setState({children:table},()=>{this.props.work(this.state)});
    }
    console.log(this.state.children);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.object !== this.props.object) {
      this.setState({
        rows: this.props.object.props.rows,
        cols: this.props.object.props.cols,
        id: this.props.object.id,
        children:this.props.object.props.children,
      });
    }
  }
  addRow=()=>{//currently adds a new row at the end of table
    var table=this.state.children;
    var rows=this.state.rows;
    for(let i=0;i<this.state.cols;i++){
      var newElement = {};
        newElement.id = this.state.id+"row"+rows+"col"+i;
        newElement.type = "div";
        newElement.props = {};
        newElement.props.children=[];
        table.push(newElement);
    }
    rows+=1;
    this.setState({rows,children:table},()=>{this.props.work(this.state)});
  }
  addCol=()=>{//currently adds a new row at the end of table
    var table=this.state.children;
    var cols=this.state.cols;
    var rows=this.state.rows;
    for(let i=rows-1;i>=0;i--){
      var newElement = {};
        newElement.id = this.state.id+"row"+i+"col"+cols;
        newElement.type = "div";
        newElement.props = {};
        newElement.props.children=[];
        table.splice(i*rows+cols,0,newElement);
        //table.push(newElement);
    }
    cols+=1;
    this.setState({cols,children:table},()=>{this.props.work(this.state)});
  }
  deleteRow=()=>{
    var table=this.state.children;
    var cols=this.state.cols;
    var rows=this.state.rows;
    var index=rows-1;
    table.splice(index*cols,cols);
    rows=rows-1;
    this.setState({rows,children:table},()=>{this.props.work(this.state)});
  }
  deleteCol=()=>{
    var table=this.state.children;
    var cols=this.state.cols;
    var rows=this.state.rows;
    var index=cols-1;
    for(let i=rows-1;i>=0;i--){
      console.log("delete at "+(i*rows+index));
      table.splice(i*rows+index,1);
    }
    cols=cols-1;
    this.setState({cols,children:table},()=>{this.props.work(this.state)});
  }
  valueChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, function () {
      this.props.work(this.state);
    });
  };
  render() {
    return (
      <div>
        <label>
          ID
          <input
            type="text"
            name="id"
            onChange={(e) => this.valueChange(e)}
            value={this.state.id}
          ></input>
        </label>
        {/* <label>
          Value
          <input
            type="text"
            name="rows"
            onChange={(e) => this.valueChange(e)}
            value={this.state.rows}
          ></input>
        </label> */}
        <button onClick={(e)=>this.addRow()}>Add row</button>
        <button onClick={(e)=>this.addCol()}>Add col</button>
        <button onClick={(e)=>this.deleteRow()}>Delete row</button>
        <button onClick={(e)=>this.deleteCol()}>Delete col</button>
        {/* <label>
          Value
          <input
            type="text"
            name="cols"
            onChange={(e) => this.valueChange(e)}
            value={this.state.cols}
          ></input>
        </label> */}
      </div>
    );
  }
}

export default TitlePropertyModifier;
