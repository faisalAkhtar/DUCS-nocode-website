import React from "react";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'; 

const baseurl="http://localhost:5000/"
class Footer extends React.Component{
    state={
        markup:""
    }
    componentDidMount(){
        axios.get(baseurl+'util/footer').then(
            res=>{
                console.log("response header recieved");
                this.setState({markup : res.data});
            }
        );
    }
    render(){
        return ReactHtmlParser( this.state.markup);   
    }
}
export default Footer;