import React from "react";

class TitlePropertyModifier extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.title);
        this.state={
            //figure out if passing that element object directly works better or not or even works or not 
            //--- edit dont works props are non modifiable
            // title:this.props.title,
            id:this.props.title.props.id,
            value:this.props.title.props.children,
        };
    }
    valueChange=(event)=>{
        this.setState({value:event.target.value},function(){
            this.props.work(this.state);
        });
    }
    render(){
        return <div>
        <label>Value
            <input type="text" onChange={e=>this.valueChange(e)} value={this.state.value}></input>
        </label>
    </div>
    }
}

export default TitlePropertyModifier;