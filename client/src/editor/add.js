import React from "react";
import "./UpdateMenu.css"
class AddButton extends React.Component{
    constructor(props){
        super(props);
    }
    onclick=()=>{
        this.props.lastclicked(this.props.parent);
        this.props.toggle();
    }
    render(){
        return <button className="add" onClick={e=>this.onclick()}>Add</button>;
    }
}
class DeleteButton extends React.Component{
    constructor(props){
        super(props);
    }
    onclick=()=>{
        console.log("from button "+ this.props.address);
        this.props.delete(this.props.address);
    }
    render(){
        return <button className="delete" onClick={e=>this.onclick()}>Delete</button>;
    }
}
class UpdateButton extends React.Component{
    constructor(props){
        super(props);
    }
    onclick=()=>{
        var clicked={"address":this.props.address,
                    "order":this.props.order,
                    "name":this.props.name,
                    "draft":this.props.draft};
        console.log(clicked);
        this.props.lastclicked(clicked);
        this.props.toggle();
    }
    render(){
        return <button className="update" onClick={e=>this.onclick()}>Update</button>;
    }
}

export { AddButton,DeleteButton,UpdateButton};