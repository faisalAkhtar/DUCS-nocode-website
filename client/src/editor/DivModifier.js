import React from "react";
import "./propertyModifier.css"

class DivModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.object);
    this.state = {
      id: this.props.object.id,
      css:this.props.object.props.css,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.object !== this.props.object) {
        this.setState({ id: this.props.object.id,css:this.props.object.props.css });
    }
  }
  valueChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, function () {
      this.props.work(this.state);
    });
  };
  CSSChange=(event)=>{
    var mycss=this.state.css;
    mycss[event.target.name]=event.target.value.substring(0,event.target.value.length-1)+"%";
    this.setState({ "css": mycss }, function () {
      this.props.work(this.state);
    });
  }
  render() {
    return (
      <div>
        <label>
            ID<input type="text" onChange name="id" onChange={(e)=>this.valueChange(e)} value={this.state.id}></input>
        </label>
        <label>
            Width<input type="text" onChange name="width" onChange={(e)=>this.CSSChange(e)} value={this.state.css.width}></input>
        </label>
      </div>
    );
  }
}

export default DivModifier;
