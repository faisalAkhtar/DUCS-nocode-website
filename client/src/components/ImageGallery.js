import React from "react";
import "./Title.css";

class ImageGallery extends React.Component {
    state = {
        visibleIndex: 0,
      };
  constructor(props) {
    super(props);
    this.autochange();
  }
  changeImage = (imageIndex) => {
    var oldIndex = this.state.visibleIndex;
    if (imageIndex >= this.props.imageLinks.length || imageIndex < 0)
      imageIndex = 0;
    this.setState({ visibleIndex: imageIndex });
  };
  autochange = () => {
    setInterval(()=>{
        this.changeImage(this.state.visibleIndex + 1)
    }, 2000);
  };
  render() {
    return (
      <div className="imageGallery" id={this.props.id}>
        <div>
          <img
            src={this.props.imageLinks[this.state.visibleIndex]}
            alt="not available"
          />
          {/* {this.props.imageLinks.map((link,index)=>{
                return <img src={link} alt="not available" className="image"/>
            })} */}
        </div>
        <div>
          <ul>
            {this.props.imageLinks.map((link, index) => {
              return (
                <li key={index}>
                  <button
                    className={
                      this.state.visibleIndex === index ? "selectedImage" : ""
                    }
                    onClick={(e) => this.changeImage(index)}
                  >
                    &bull;
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default ImageGallery;
