import React from "react";
import "./App.css";
import axios from "axios";

const baseurl="http://localhost:5000/"
class Notification extends React.Component{
    state={
        markup:""
    }
    componentDidMount(){
        axios.get(baseurl+'notification/student').then(
            res=>{
                console.log("response header recieved");
                console.log(res.data);
                this.setState({markup : res.data});
            }
        ).catch(
            err=>console.log(err)
        );
    }
    render(){
        return this.state.markup;   
    }
}
export default Notification;