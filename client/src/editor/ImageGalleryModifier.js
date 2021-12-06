import React from "react";
import "./propertyModifier.css";

class ImageGalleryModifier extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.title);
    this.state = {
      id: this.props.object.id,
      imageLinks: this.props.object.props.imageLinks,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.object !== this.props.object) {
      this.setState({
        id: this.props.object.id,
        imageLinks: this.props.object.props.imageLinks,
        link: "",
      });
    }
  }
  valueChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addlink = () => {
    var imageLinks = this.state.imageLinks;
    imageLinks.push(this.state.link); //get value from link here;
    this.props.work(this.state);
    this.setState({link:""});
  };
  deleteLink=(index)=>{
    var imageLinks = this.state.imageLinks;
    imageLinks.splice(index,1);
    this.props.work(this.state);
  }
  render() {
    return (
      <div>
        <label>Current Image links:</label>
        {this.state.imageLinks.map((link, index) => {
          return (
            <div className="image-link">
              <button className="delete-image-link" onClick={(e) => this.deleteLink(index)}>
                <img
                  src="https://toppng.com/uploads/preview/free-recycle-bin-icon-vector-recycle-bin-icon-115534132079jvhnualpn.png"
                  alt="delete"
                />
              </button>
              <a href={link} target="_blank">{link}</a>
            </div>
          );
        })}
        <label>New link</label>
        <input
          type="text"
          name="link"
          onChange={(e) => this.valueChange(e)}
          value={this.state.link}
        ></input>
        <button onClick={(e) => this.addlink()}>Add Link</button>
      </div>
    );
  }
}

export default ImageGalleryModifier;
