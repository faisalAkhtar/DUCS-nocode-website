import React from "react";
import "./contentModifier.css";
import Title from "../components/Title";
import TitlePropertyModifier from "./TitlePropertyModifier";
import ParagraphPropertyModifier from "./ParagraphPropertyModifier";
import LinkPropertyModifier from "./LinkPropertyModifier";
import axios from "axios";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";
import Image from "../components/Image";
import ImagePropertyModifier from "./ImagePropertyModifier"

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      addIndex: -1,
      selected: -1,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    //preventing default rerendering on state change
    return !this.equals(nextState, this.state);
  }
  equals = (next, current) => {
    console.log(next);
    console.log(current);
    if (next.addIndex !== -1 || next.selected === current.selected)
      //no issues in these cases u can directly rerender on state change
      return false;
    if (
      next.selected !== current.selected &&
      next.addIndex === current.addIndex
    )
      return false;
    if (
      next.file.length !== current.file.length &&
      next.selected === current.addIndex
    )
      return false;
    return true;

    //return next===current;
  };
  addComp = (event) => {
    var index = event.target.id;
    index = index.substring(3); //remove add from id
    this.setState({ addIndex: parseInt(index) }, () => {
      console.log("state updates");
      console.log(this.state);
      this.render();
    });
  };
  itemSelected = (index) => {
    //console.log(index);
    console.log(this.state.file[index].constructor.name);
    this.setState({ addIndex: -1, selected: parseInt(index) }, () => {
      console.log("from callback " + this.state.selected);
      this.render();
    }); //id of selected component on display page
    //id is same as index of element in file array

    // document.getElementById(event.target.id).style.boxShadow="3px 3px grey";
  };
  titleComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = <Title id={modifierState.id}>{modifierState.value}</Title>;
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  paragraphComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = (
      <Paragraph id={modifierState.id}>{modifierState.value}</Paragraph>
    );
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  linkComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = (
      <Link id={modifierState.id} href={modifierState.link}>{modifierState.text}</Link>
    );
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  imageComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = (
      <Image id={modifierState.id} source={modifierState.value}/>
    );
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  addLine = (i) => {
    //function to make add button after each component
    return (
      <div className="addComponentContainer">
        <div className="addComponent">
          <div className="addcellbutton">
            <button
              id={"add" + i}
              className="addComponentButton"
              onClick={(e) => this.addComp(e)}
            >
              Add &#43;
            </button>
          </div>
          <hr className="addComponentLine"></hr>
        </div>
      </div>
    );
  };
  displayFile = () => {
    //function to display whole file in modifiable form
    return this.state.file.map((item, index) => {
      return (
        <div className="item" key={index}>
          <div
            className="selectedItem"
            id={index}
            onClick={(e) => this.itemSelected(index)}
          >
            {" "}
            {/*selectedItemto show currently selected item and make left pane to show its properties*/}
            {item}
          </div>
          {this.addLine(index + 1)}
        </div>
      );
    });
  };

  componentClicked = (event, itemType) => {
    if (this.state.addIndex < 0) return;
    var file = [...this.state.file];
    var selected = this.state.addIndex;
    switch (itemType) {
      case "title":
        file.splice(
          this.state.addIndex,
          0,
          <Title id="Main-title"> Title For page</Title>
        );
        break;
      case "paragraph":
        file.splice(
          this.state.addIndex,
          0,
          <Paragraph id="paragraph"> Title For page</Paragraph>
        );
        break;
      case "image":
        file.splice(
          this.state.addIndex,
          0,
          <Image id="Main-title" source=""/>
        );
        break;
      case "link":
        file.splice(
          this.state.addIndex,
          0,
          <Link id="defaultlink" href="">Your link</Link>
        );
        break;
    }
    this.setState({ file, selected, addIndex: -1 }, () => {
      this.render();
    });
    // this.setState({ selected : this.state.addIndex },()=>{this.render()});
    // this.setState({ addIndex: -1 },()=>{this.render()});
  };
  showModifiers = () => {
    var selectedobject = this.state.file[this.state.selected];
    console.log(selectedobject.type.name);
    switch (selectedobject.type.name) {
      case "Title":
        return (
          <TitlePropertyModifier
            title={selectedobject}
            work={this.titleComponentModifier}
          />
        );
        break;
      case "Paragraph":
        return (
          <ParagraphPropertyModifier
            object={selectedobject}
            work={this.paragraphComponentModifier}
          />
        );
        break;
      case "Link":
        return (
          <LinkPropertyModifier
            object={selectedobject}
            work={this.linkComponentModifier}
          />
        );
        break;
      case "Image":
          return (
            <ImagePropertyModifier
              object={selectedobject}
              work={this.imageComponentModifier}
            />
          );
          break;
    }
  };
  // componentDidMount(){
  //   axios.get(baseurl+""//addfilename here).then(
  //     {
  //       //set file in state with response data
  //     }
  //   )
  //   .catch(
  //     //some error happened while loading file reload file
  //   )
  // }
  render() {
    console.log("render");
    return (
      <div className="editorcontainer">
        <div className="editorHeader">
          <p className="fileNameText">filename</p>
          <button id="savefile" className="saveFileButton">
            Save
          </button>
          <button id="preview" className="previewButton">
            Preview
          </button>
        </div>
        <div className="editor">
          <div className="editorLeft">
            {
              //work here to display modifiable properties or icons accordingy
              this.state.addIndex !== -1 ? (
                <div className="iconscontainer">
                  <Title id="icons-title" isIcon>
                    Elements
                  </Title>
                  <div>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "title")}
                      id="title-icon"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2799/2799932.png"
                        alt="Title"
                      />
                      Title
                    </button>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "paragraph")}
                      id="paragraph-icon"
                    >
                      <img
                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/paragraph-2168670-1844417.png"
                        alt="Paragraph"
                      />
                      Paragraph
                    </button>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "link")}
                      id="link-icon"
                    >
                      <img
                        src="https://icons-for-free.com/iconfiles/png/512/icon+link+icon-1320183703660020157.png"
                        alt="link"
                      />
                      Link
                    </button>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "image")}
                      id="image-icon"
                    >
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                        alt="pictreicon"
                      />
                      Image
                    </button>
                  </div>
                </div>
              ) : this.state.selected !== -1 ? (
                this.showModifiers()
              ) : (
                <p>select some item </p>
              )
            }
          </div>
          <div className="display">
            {this.addLine(0)}
            {this.displayFile()}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
