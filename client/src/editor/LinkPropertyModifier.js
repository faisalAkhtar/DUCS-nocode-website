import React from "react";
import "./propertyModifier.css"

class ParagraphPropertyModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.object);
    this.state = {
      id: this.props.object.id,
      text: this.props.object.props.children,
      link: this.props.object.props.href,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.object !== this.props.object) {
        this.setState({ text: this.props.object.props.children,link: this.props.object.props.href,id: this.props.object.id });
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
          Link:
          <input
            type="text"
            name="link"
            onChange={(e) => this.valueChange(e)}
            value={this.state.value}
            wrap="none"
          />
        </label>
        <label>
          Text:
          <input
            type="text"
            name="text"
            onChange={(e) => this.valueChange(e)}
            value={this.state.value}
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
