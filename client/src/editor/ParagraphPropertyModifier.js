import React from "react";
import "./propertyModifier.css"

class ParagraphPropertyModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.object);
    this.state = {
      //figure out if passing that element object directly works better or not or even works or not
      //--- edit dont works props are non modifiable
      //props.object:this.props.object,
      id: this.props.object.props.id,
      value: this.props.object.props.children,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.object !== this.props.object) {
        this.setState({ value: this.props.object.props.children,id: this.props.object.props.id });
    }
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
          Value
          <textarea
            name="value"
            onChange={(e) => this.valueChange(e)}
            value={this.state.value}
            rows="30"
            cols="30"
            wrap="none"
          />
        </label>
        <label>
            ID<input type="text" onChange name="id" onChange={(e)=>this.valueChange(e)} value={this.state.id}></input>
        </label>
      </div>
    );
  }
}

export default ParagraphPropertyModifier;
