import React from "react";
//import Div from "./Div";
import Image from "./Image";
import Link from "./Link";
import Paragraph from "./Paragraph";
import Title from "./Title";
import "./Title.css";

class Div extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss) {
      if (mycss.width) element.style.width = mycss.width;
    }
  }
  componentDidUpdate(){
    var element = document.getElementById(this.props.id);
    var mycss = this.props.css;
    console.log(this.props.css);
    if (mycss && element) {
      if (mycss.width) element.style.width = mycss.width;
      // if (mycss.height) element.style.height = mycss.height+"%";
    }
  }
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
      }[item.type]
    })
  }
  render() {
    return <div className="Div" id={this.props.id}>{this.display(this.props.children)}
        {/* {
          this.props.rows.map((i,index)=>{
            this.props.cols.map((j,index2)=>{
              return <div id={this.props.id+"row"+index+"col"+index2} className="tableitem"></div>
            })
          })
        } */}
    </div>;
  }
}
export default Div;