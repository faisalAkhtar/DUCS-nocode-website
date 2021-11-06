import React from "react";
import Footer from "../default/Footer";
import Header from "../default/Header";
import Menu from "../default/Menu";
import Notifications from "../default/Notifications";
import Div from "../components/Div";
import Image from "../components/Image";
import Link from "../components/Link";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import "./popup.css";
import Table from "../components/Table";
import ImageGallery from "../components/ImageGallery";

class PreviewPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  close = () => {
    this.props.close();
  };
  display=(file)=>{
    console.log(file);
    if(!file || !Array.isArray(file) || file.length===0) return null;
    return file.map((item,index)=>{
      return {
        title: <Title id={item.id}>{item.props.children}</Title>,
        image: <Image id={item.id} source={item.props.source} css={item.props.css}/>,
        link: (
          <Link id={item.id} href={item.props.href}>
            {item.props.children}
          </Link>
        ),
        paragraph: (
          <Paragraph id={item.id}>{item.props.children}</Paragraph>
        ),
        div: (
          <Div id={item.id} css={item.props.css}>
            {item.props.children}
          </Div>
        ),
        table:(<Table id={item.id} rows={item.props.rows} cols={item.props.cols}>{item.props.children}</Table>),
        imageGallery:<ImageGallery id={item.id} imageLinks={item.props.imageLinks}/>
      }[item.type]
    })
  }
  render() {
    console.log("rendering popup");
    return (
      <div className="preview-popup">
        <div className="preview-popup-content">
            <button className="closePreviewPopup" onClick={(e)=>this.props.close()}>&#10006;</button>
          <Header />
          <Menu />
          <div style={{width:"100%",display:"inline-block",padding:"10px"}}>
            <div style={{width:"60%",display:"inline-block",}}>{this.display(this.props.page)}</div>
            <Notifications/>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default PreviewPopup;
