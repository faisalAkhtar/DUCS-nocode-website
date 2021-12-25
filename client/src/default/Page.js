import React from "react";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'; 
import Title from "../components/Title";
import Image from "../components/Image";
import Table from "../components/Table";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";
import Div from "../components/Div";
import ImageGallery from "../components/ImageGallery";

const baseurl="http://localhost:5000/"
class Page extends React.Component{
    // constructor(){
    //     this.
    // }
    state={
        markup:[],
       }
    componentDidMount(){
      var page=window.location.pathname;
      // console.log(page);
        axios.get(baseurl+'page'+page).then(
            res=>{
                console.log("response header recieved");
                this.setState({markup : res.data},()=>{this.render();});
            }
        ).catch(
            (err)=>{
                console.log(err.message);
            }
        );
    }
    display=(file)=>{
        // console.log(file);
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
    render(){
        return this.display(this.state.markup);   
    }
}
export default Page;