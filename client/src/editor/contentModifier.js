import React from "react";
import "./contentModifier.css";
import Title from "../components/Title";
import TitlePropertyModifier from "./PropertyModifier";
import axios from "axios";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      addIndex: -1,
      selected: -1,
    };
  }
  shouldComponentUpdate(nextProps,nextState){ //preventing default rerendering on state change
    return !this.equals(nextState,this.state);
  }
  equals=(next,current)=>{
    return next===current;
  }
  addComp = (event) => {
    var index = event.target.id;
    index = index.substring(3); //remove add from id
    this.setState({ addIndex: parseInt(index) },()=>{this.render()});
  };
  itemSelected = (index) => {
    //console.log(index);
    this.setState({ selected: parseInt(index) },()=>{console.log("from callback "+this.state.selected);this.render()}); //id of selected component on display page
    //id is same as index of element in file array

    // document.getElementById(event.target.id).style.boxShadow="3px 3px grey";
  };
  titleComponentModifier=(modifierState)=>{
      var file=this.state.file;
      var Element=file[this.state.selected];
      Element=<Title id={modifierState.id}>{modifierState.value}</Title>
      file[this.state.selected]=Element;
      this.setState({file},()=>{this.render();});
  }
  addLine = (i) => {  //function to make add button after each component
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
  displayFile = () => { //function to display whole file in modifiable form
    return this.state.file.map((item, index) => {
      return (
        <div className="item">
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

  componentClicked = (event) => {
    if (this.state.addIndex < 0) return;
    var file = this.state.file;
    var selected=this.state.addIndex;
    switch (event.target.id) {
      case "title":
        file.splice(this.state.addIndex, 0, <Title id="Main-title"> Title For page</Title>);
        console.log(file);
        break;
    }
    this.setState({file,selected,addIndex:-1},()=>{this.render()});
    // this.setState({ selected : this.state.addIndex },()=>{this.render()});
    // this.setState({ addIndex: -1 },()=>{this.render()});
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
            {//work here to display modifiable properties or icons accordingy
              this.state.addIndex !== -1 ? (
                <div className="iconscontainer">
                  <Title id="icons-title" isIcon>
                    Elements
                  </Title>
                  <div>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e)}
                      id="title"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2799/2799932.png"
                        alt="Title"
                      />
                      Title
                    </button>
                  </div>
                </div>
              ) :this.state.selected!==-1 ? (
                <TitlePropertyModifier  title={this.state.file[this.state.selected]} work={this.titleComponentModifier}/>
              ):<p>select some item </p>
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
