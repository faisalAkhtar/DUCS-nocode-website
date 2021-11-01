import React from "react";

class TitlePropertyModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.title);
    this.state = {
      //figure out if passing that element object directly works better or not or even works or not
      //--- edit dont works props are non modifiable
      // title:this.props.title,
      id: this.props.title.id,
      value: this.props.title.props.children,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
        this.setState({ value: this.props.title.props.children,id: this.props.title.id });
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
          <input
            type="text"
            name="value"
            onChange={(e) => this.valueChange(e)}
            value={this.state.value}
          ></input>
        </label>
        <label>
            ID<input type="text" onChange name="id" onChange={(e)=>this.valueChange(e)} value={this.state.id}></input>
        </label>
      </div>
    );
  }
}

export default TitlePropertyModifier;
