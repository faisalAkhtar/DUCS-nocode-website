import React from "react";
import './popup.css';

class AddPop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            filename:"",
            type:"page"
        }
    }
    close=()=>{
        this.setState({name:""});
        this.setState({filename:""});
        this.props.close();
        
    }
    onChange=(event)=>{
        this.setState({[event.target.id]:event.target.value});
    }
    submit=(e)=>{
        e.preventDefault(); //to stop default action of form so that we can do desired 
        console.log("from popup submit");
        console.log(this.props.parent);
        this.props.add(this.state.name,this.state.filename,this.state.type,this.props.parent);
        this.close();
    }
    render(){
        return(
            <div className="popup">
                <div className="popup_content">
                    <form onSubmit={this.submit}>
                    <label>Name
                        <input type="text" id="name" value={this.state.name} onChange={e=>this.onChange(e)}/>
                    </label>
                    <label>fileName
                        <input type="text" id="filename" value={this.state.filename} onChange={event=>this.onChange(event)}/>
                    </label>
                    <label>Type
                        <select id="type" value={this.state.type} onChange={this.onChange} >
                            {
                                this.props.parent.length<2?
                                <option id="menu" value="menu">menu</option> : null
                            }
                            <option id="page" value="page">page</option>
                        </select>
                    </label>
                    <button onClick={e=>this.close()}>Cancel</button>
                    <input type="submit" value="Save"/>
                    </form>
                </div>
        </div>
        );
    }
}

class UpdatePop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:this.props.parent.name,
            filename:this.props.parent.address[this.props.parent.address.length-1],
            order:this.props.parent.order,
            draft:this.props.parent.draft, }
    }
    close=()=>{
        this.props.close();
        
    }
    onChange=(event)=>{
        this.setState({[event.target.id]:event.target.value});
    }
    onDraftChange=(event)=>{
        if(event.target.value==="true")
        this.setState({draft:true});
        else this.setState({draft:false});
    }
    submit=(e)=>{
        e.preventDefault(); //to stop default action of form so that we can do desired 
        console.log("from popup submit");
        var changes={};
        if(this.state.name!==this.props.parent.name)
            changes.name=this.state.name;
        if(this.state.filename!==this.props.parent.address[this.props.parent.address.length-1])
            changes.link=this.state.filename;
        if(this.state.order!==this.props.parent.order)
            changes.order=this.state.order;
        if(this.state.draft!==this.props.parent.draft)
            changes.draft=this.state.draft;
        if(changes==={})
        else{
            this.props.update(this.props.parent.address,changes);
            this.close();
        }
        
    }
    render(){
        return(
            <div className="popup">
                <div className="popup_content">
                    <form onSubmit={this.submit}>
                    <label>Name
                        <input type="text" id="name" value={this.state.name} onChange={e=>this.onChange(e)}/>
                    </label>
                    <label>fileName
                        <input type="text" id="filename" value={this.state.filename} onChange={event=>this.onChange(event)}/>
                    </label>
                    <label>order
                        <input type="number" value={this.state.order} onChange={e=>this.onChange(e)}/>
                    </label>
                    <label>Draft
                        <input type="radio" id="draft" value="true" onChange={e=>this.onDraftChange(e)} checked={this.state.draft===true} />Yes
                        <input type="radio" id="draft" value="false" onChange={e=>this.onDraftChange(e)} checked={this.state.draft===false}/>No
                    </label>
                    <button onClick={e=>this.close()}>Cancel</button>
                    <input type="submit" value="Save"/>
                    </form>
                </div>
        </div>
        );
    }
}

export {AddPop,UpdatePop};