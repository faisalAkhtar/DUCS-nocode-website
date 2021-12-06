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
import ImagePropertyModifier from "./ImagePropertyModifier";
import TablePropertyModifier from "./TablePropertyModifier";
import crypto from "crypto";
import PreviewPopup from "./PreviewPopup";
import Div from "../components/Div";
import DivModifier from "./DivModifier";
import ImageGallery from "../components/ImageGallery";
import ImageGalleryModifier from "./ImageGalleryModifier";

const baseurl = "http://localhost:5000/";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      addIndex: -1,
      selected: -1,
      itemSelect: null,//selected item 
      previewPopup: false,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    //preventing default rerendering on state change
    return !this.equals(nextState, this.state);
  }
  equals = (next, current) => {
    // console.log(next);
    // console.log(JSON.stringify(current));

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
  addComp = (event, fileToAdd) => {
    event.stopPropagation();
    var index = event.target.id;
    index = index.substring(3); //remove add from id
    console.log("printing current selected item from add comp")
    console.log(this.state.itemSelect)
    if (this.state.itemSelect) {
      var oldId=this.state.itemSelect.id;
      var el=document.getElementById("item"+oldId);
      if(el)
        el.className ="item selectItem";
   }
    this.setState({ addIndex: parseInt(index), itemSelect: fileToAdd }, () => {
      // console.log("state updates");
      // console.log(this.state);
      this.render();
    });
  };
  itemSelected = (event, index, item) => {
    if (event) event.stopPropagation();
    // if(this!==event.target)
    //console.log(index);
    console.log("from item selection process");
    console.log(item);
    console.log(this.state.itemSelect)
     if (this.state.itemSelect) {
        var oldId=this.state.itemSelect.id;
        var el=document.getElementById("item"+oldId);
        if(el)
          el.className ="item selectItem";
     }
    //console.log(this.state.file[index].constructor.name);
    this.setState(
      { addIndex: -1, selected: parseInt(index), itemSelect: item },
      () => {
        console.log("printing current selected item from set state in item select")
        console.log(this.state.itemSelect);
        this.render();
      }
    ); //id of selected component on display page
    //id is same as index of element in file array
    document.getElementById("item"+item.id).className = "item selectedItem";
    // document.getElementById(index).style.borderRadius="10px";
    // document.getElementById(index).style.boxShadow="3px 3px grey";
  };
  titleComponentModifier = (modifierState) => {
    // var file = this.state.file;
    // var Element = file[this.state.selected];
    // Element = <Title id={modifierState.id}>{modifierState.value}</Title>;
    // file[this.state.selected] = Element;
    var selectedTitle = this.state.itemSelect;
    selectedTitle.id = modifierState.id;
    selectedTitle.props.children = modifierState.value;
    this.setState({ itemSelect: selectedTitle }, () => {
      this.render();
    });
  };
  paragraphComponentModifier = (modifierState) => {
    // var file = this.state.file;
    // var Element = file[this.state.selected];
    // Element = (
    //   <Paragraph id={modifierState.id}>{modifierState.value}</Paragraph>
    // );
    // file[this.state.selected] = Element;
    var selectedParagraph = this.state.itemSelect;
    selectedParagraph.id = modifierState.id;
    selectedParagraph.props.children = modifierState.value.replaceAll("\n","<br>");
    this.setState({ itemSelect: selectedParagraph }, () => {
      this.render();
    });
  };
  linkComponentModifier = (modifierState) => {
    // var file = this.state.file;
    // var Element = file[this.state.selected];
    // Element = (
    //   <Link id={modifierState.id} href={modifierState.link}>
    //     {modifierState.text}
    //   </Link>
    // );
    // file[this.state.selected] = Element;
    var selectedLink = this.state.itemSelect;
    selectedLink.id = modifierState.id;
    selectedLink.props.href = modifierState.link;
    selectedLink.props.children = modifierState.text;
    this.setState({ itemSelect: selectedLink }, () => {
      this.render();
    });
  };
  imageComponentModifier = (modifierState) => {
    var selectedImage = this.state.itemSelect;
    selectedImage.id = modifierState.id;
    selectedImage.props.source = modifierState.value;
    selectedImage.props.css = modifierState.css;
    this.setState({ itemSelect: selectedImage }, () => {
      this.render();
    });
  };
  tableComponentModifier = (modifierState) => {
    //   var file = this.state.file;
    //   var Element = file[this.state.selected];
    //   Element = (
    //     <Table
    //       id={modifierState.id}
    //       rows={modifierState.rows}
    //       cols={modifierState.cols}
    //     >
    //       {modifierState.children}
    //     </Table>
    //   );
    var selectedTable = this.state.itemSelect;
    console.log(selectedTable);
    selectedTable.props.rows = modifierState.rows;
    selectedTable.props.cols = modifierState.cols;
    selectedTable.props.children = modifierState.children;

    //   file[this.state.selected] = Element;
    this.setState({ itemSelect: selectedTable }, () => {
      this.render();
    });
  };
  divComponentModifier = (modifierState) => {
    // var file = this.state.file;
    // var Element = file[this.state.selected];
    // Element = <Div id={modifierState.id}>{modifierState.children}</Div>;
    // file[this.state.selected] = Element;
    var selectedDiv = this.state.itemSelect;
    selectedDiv.id = modifierState.id;
    selectedDiv.props.css = modifierState.css;
    this.setState({ itemSelect: selectedDiv }, () => {
      this.render();
    });
    this.setCss(modifierState.css, selectedDiv.id);
  };
  imageGalModifier=(modifierState)=>{
    var selectedGallery = this.state.itemSelect;
    selectedGallery.id = modifierState.id;
    //selectedGallery.props.css = modifierState.css;
    selectedGallery.props.imageLinks=modifierState.imageLinks;
    this.setState({ itemSelect: selectedGallery }, () => {
      this.render();
    });
  };
  addLine = (i, fileToAdd) => {
    //function to make add button after each component
    return (
      <div className="addComponentContainer">
        <div className="addComponent">
          <div className="addcellbutton">
            <button
              id={"add" + i}
              className="addComponentButton"
              onClick={(e) => this.addComp(e, fileToAdd)}
            >
              Add &#43;
            </button>
          </div>
          <hr className="addComponentLine"></hr>
        </div>
      </div>
    );
  };
  itemFocusGained = (e, item) => {
    //this.setState({ itemSelect: item });
  };
  setCss = (mycss, id) => {
    var element = document.getElementsByClassName(id)[0];
    // console.log(element);
    // console.log(mycss);
    // console.log(id);
    if (element && mycss) {
      if (mycss.width) element.style.width = mycss.width;
      // if (mycss.height) element.style.height = mycss.height+"%";
    }
  };
  setTableStyle=(props,id)=>{
    var element = document.getElementById("item"+id);
    if (element && props) {
      element.style.display="grid";
      element.style.gridTemplateColumns="repeat("+props.cols+",1fr)";
    }
  }
  displayFile = (file) => {
    //function to display whole file in modifiable form
    if (!file || !Array.isArray(file) || file.length === 0) return null;
    console.log(file);
    return file.map((item, index) => {
      return (
        <div className={"item-container " + item.id} key={index}>
          <div
            className={"item selectItem"}
            id={"item"+item.id}
            onClick={(e) => this.itemSelected(e, index, item)}
            onFocus={(e) => this.itemFocusGained(e, item)}
          >
            {/* {console.log(item)} */}
            {
              {
                title: <Title id={item.id}>{item.props.children}</Title>,
                image: (
                  <Image
                    id={item.id}
                    source={item.props.source}
                    css={item.props.css}
                  />
                ),
                link: (
                  <Link id={item.id} href={item.props.href}>
                    {item.props.children}
                  </Link>
                ),
                paragraph: (
                  <Paragraph id={item.id}>{item.props.children}</Paragraph>
                ),
                div: (
                  // <Div id={item.id} css={item.props.css}>
                  <>
                    {console.log("from div"+item.type)}
                    {this.addLine(0, item.props.children)}
                    {this.displayFile(item.props.children)}
                  </>
                  // </Div>
                ),
                table: (
                  <>
                  {/* {this.tablePropsSettings()} */}
                  {/* {this.displayFile(item.props.children)} */}
                    {item.type==="table" ? item.props.children.map((block,index) => {
                      return <div id={block.id} className="item selectItem">
                          {console.log("displaying block"+block.type)}
                          {this.addLine(0, block.props.children)}
                          {this.displayFile(block.props.children)}
                        </div>
                    })
                  :null}
                  {this.setTableStyle(item.props,item.id)}
                  </>
                ),
                imageGallery:(
                  <ImageGallery id={item.id} imageLinks={item.props.imageLinks} />
                ),
              }[item.type]
            }
            {this.setCss(item.props.css, item.id)}
            {/* .name==="Div"?this.displayFile(item.props.children):item} */}
          </div>
          {this.addLine(index + 1, file)}
        </div>
      );
    });
  };
  
  componentClicked = (event, itemType) => {
    //function to handle click for new component addition
    if (this.state.addIndex < 0) return;
    // var file = [...this.state.file];
    var file = this.state.itemSelect;
    var selected = this.state.addIndex;
    var newElement = {};
    var id = crypto.randomBytes(8).toString("hex");
    newElement.id = itemType + id;
    newElement.type = itemType;
    newElement.props = {};
    var r, c;
    switch (itemType) {
      case "title":
        newElement.props.children = "Title for page";
        break;
      case "paragraph":
        newElement.props.children = "New paragraph";
        break;
      case "image":
        newElement.props.source = "";
        newElement.props.css = { width: "30" /*height:"30"*/ };
        break;
      case "link":
        newElement.props.href = "";
        newElement.props.children = "Your link";
        break;
      case "table":
        r = parseInt(prompt("Enter number of rows for table"));
        c = parseInt(prompt("Enter number of columns for table"));
        newElement.props.rows = r;
        newElement.props.cols = c;
        newElement.props.children = [];
        // file.splice(
        //   this.state.addIndex,
        //   0,
        //   <Table id={"table-"+id} rows="0" cols="0"></Table>
        // );
        break;
      case "div":
        newElement.props.css = { width: "100%" };
        newElement.props.children = [];
        break;
      case "imageGallery":
        newElement.props.imageLinks=[];
        break;
    }
    file.splice(this.state.addIndex, 0, newElement);
    this.setState({ addIndex: -1 }, () => {
      this.render();
      this.itemSelected(null, selected, newElement);
    });
    // this.setState({ selected : this.state.addIndex },()=>{this.render()});
    // this.setState({ addIndex: -1 },()=>{this.render()});
  };
  showModifiers = () => {
    var selectedobject = this.state.itemSelect; //this.state.file[this.state.selected];
    //console.log(selectedobject);
    if (!selectedobject) return <p>select something</p>;
    // console.log(selectedobject.type);
    switch (selectedobject.type) {
      case "title":
        return (
          <TitlePropertyModifier
            title={selectedobject}
            work={this.titleComponentModifier}
          />
        );
        break;
      case "paragraph":
        return (
          <ParagraphPropertyModifier
            object={selectedobject}
            work={this.paragraphComponentModifier}
          />
        );
        break;
      case "link":
        return (
          <LinkPropertyModifier
            object={selectedobject}
            work={this.linkComponentModifier}
          />
        );
        break;
      case "image":
        return (
          <ImagePropertyModifier
            object={selectedobject}
            work={this.imageComponentModifier}
          />
        );
        break;
      case "table":
        return (
          <TablePropertyModifier
            object={selectedobject}
            work={this.tableComponentModifier}
          />
        );
        break;
      case "div":
        return (
          <DivModifier
            object={selectedobject}
            work={this.divComponentModifier}
          />
        );
        break;
      case "imageGallery":
        return (
          <ImageGalleryModifier object={selectedobject} work={this.imageGalModifier}/>
        );
        break;
    }
  };
  togglePreviewPopup = () => {
    this.setState({ previewPopup: !this.state.previewPopup });
  };
  componentDidMount() {
    var address = window.location.pathname;
    address = address.split("/");
    address.splice(0, 3);
    console.log(address);
    console.log(baseurl);
    axios
      .post(
        baseurl + "awesome-editor/file-editor",
        { address, type: "page" },
        { headers: { authorization: "Bearer " + this.props.authToken } }
      )
      .then((res) => {
        if (Array.isArray(res.data)) this.setState({ file: res.data });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  save = () => {
    var address = window.location.pathname;
    address = address.split("/");
    address.splice(0, 3);
    axios
      .put(
        baseurl + "awesome-editor/file-editor",
        { address, type: "page", data: this.state.file },
        { headers: { authorization: "Bearer " + this.props.authToken } }
      )
      .then((res) => {
        console.log(res);
        alert("file saved successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  render() {
    return (
      <div className="editorcontainer">
        {this.state.previewPopup ? (
          <PreviewPopup
            close={this.togglePreviewPopup}
            page={this.state.file}
          />
        ) : null}
        <div className="editorHeader">
          <p className="fileNameText">filename</p>
          <button
            id="savefile"
            className="saveFileButton"
            onClick={(e) => this.save()}
          >
            Save
          </button>
          <button
            id="preview"
            className="previewButton"
            onClick={(e) => this.togglePreviewPopup()}
          >
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
                        src="https://static.thenounproject.com/png/105256-200.png"
                        alt="divicon"
                      />
                      Div
                    </button>
                    <button
                      className="icon"
                      onClick={(e) => this.componentClicked(e, "imageGallery")}
                      id="imageGallery-icon"
                    >
                      <img
                        src="https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg"
                        alt="Scroll Gallery"
                      />
                      Image Gallery
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
            {this.addLine(0, this.state.file)}
            {this.displayFile(this.state.file)}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
