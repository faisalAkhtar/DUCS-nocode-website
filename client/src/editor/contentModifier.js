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
import Table from "../components/Table";
import ImagePropertyModifier from "./ImagePropertyModifier"
import TablePropertyModifier from "./TablePropertyModifier"
import crypto from "crypto";
import PreviewPopup from "./PreviewPopup";
import Div from "../components/Div";
import DivModifier from "./DivModifier";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      addIndex: -1,
      selected: -1,
      itemSelect: null,
      previewPopup:false,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    //preventing default rerendering on state change
    return !this.equals(nextState, this.state);
  }
  equals = (next, current) => {
    console.log(next);
    console.log(JSON.stringify(current));

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
    if(this.state.selected!==-1){
      document.getElementById(this.state.selected).className="item selectItem";
    }
    //console.log(this.state.file[index].constructor.name);
    this.setState({ addIndex: -1, selected: parseInt(index) }, () => {
      console.log("from callback " + this.state.selected);
      this.render();
    }); //id of selected component on display page
    //id is same as index of element in file array
    document.getElementById(index).className="item selectedItem";
    // document.getElementById(index).style.borderRadius="10px";
    // document.getElementById(index).style.boxShadow="3px 3px grey";
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
      <Image id={modifierState.id} source={modifierState.value} css={modifierState.css}/>
    );
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  tableComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = (
      <Table id={modifierState.id} rows={modifierState.rows} cols={modifierState.cols}>{modifierState.children}</Table>
    );
    file[this.state.selected] = Element;
    this.setState({ file }, () => {
      this.render();
    });
  };
  divComponentModifier = (modifierState) => {
    var file = this.state.file;
    var Element = file[this.state.selected];
    Element = (
      <Div id={modifierState.id} >{modifierState.children}</Div>
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
  itemFocusGained=(e,item)=>{
    this.setState({"itemSelect" : item});
  }
  displayFile = () => {
    //function to display whole file in modifiable form
    return this.state.file.map((item, index) => {
      return (
        <div className="item-container" key={index}>
          <div
            className="item selectItem"
            id={index}
            onClick={(e) => this.itemSelected(index)}
            onFocus={(e) => this.itemFocusGained(e,item)}
          >
            {item.type.name==="Div"?this.displayFile(item.props.children):item}
          </div>
          {this.addLine(index + 1)}
        </div>
      );
    });
  };
  componentClicked = (event, itemType) => { //function to handle click for new component addition
    if (this.state.addIndex < 0) return;
    var file = [...this.state.file];
    var selected = this.state.addIndex;
    var id=crypto.randomBytes(8).toString("hex");
    switch (itemType) {
      case "title":
        file.splice(
          this.state.addIndex,
          0,
          <Title id={"title-"+id}> Title For page</Title>
        );
        break;
      case "paragraph":
        file.splice(
          this.state.addIndex,
          0,
          <Paragraph id={"paragraph-"+id}> Title For page</Paragraph>
        );
        break;
      case "image":
        file.splice(
          this.state.addIndex,
          0,
          <Image id={"image-"+id} source="" css={{width:"30",/*height:"30"*/}}/>
        );
        break;
      case "link":
        file.splice(
          this.state.addIndex,
          0,
          <Link id={"link-"+id} href="">Your link</Link>
        );
        break;
      case "table":
        file.splice(
          this.state.addIndex,
          0,
          <Table id={"table-"+id} rows="0" cols="0"></Table>
        );
        break;
      case "table":
        file.splice(
          this.state.addIndex,
          0,
          <Div id={"div-"+id} ></Div>
        );
        break;
    }
    this.setState({ file, addIndex: -1 }, () => {
      this.render();
      this.itemSelected(selected);
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
      case "Table":
          return (
             <TablePropertyModifier
                object={selectedobject}
                work={this.tableComponentModifier}
              />
            );
            break;
      case "Div":
          return (
             <DivModifier
                object={selectedobject}
                work={this.divComponentModifier}
              />
            );
            break;
    }
  };
  togglePreviewPopup=()=>{
    this.setState({"previewPopup":!(this.state.previewPopup)});
  }
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
        {this.state.previewPopup ? <PreviewPopup close={this.togglePreviewPopup} page={this.state.file}/> : null}
        <div className="editorHeader">
          <p className="fileNameText">filename</p>
          <button id="savefile" className="saveFileButton">
            Save
          </button>
          <button id="preview" className="previewButton" onClick={(e)=>this.togglePreviewPopup()}>
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
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "table")}
                      id="table-icon"
                    >
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/files-folders-line/100/spreadsheet-512.png"
                        alt="tableicon"
                      />
                      Table
                    </button>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "div")}
                      id="div-icon"
                    >
                      <img
                        src="https://lh3.googleusercontent.com/proxy/4Qs69ZbNsZ7GTr6mIiDe16O6i0fn01EAUHVMWDZx1Rr5gyCEAz7r_jyojvXiALyJ3vMiHB8KfZ_ral32TAMiOZlTfSpZlD20mYZuGUyg"
                        alt="divicon"
                      />
                      Div
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
