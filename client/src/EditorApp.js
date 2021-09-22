import React from "react";
import Login from './editor/login';
import App from './editor/Admin';


class EditorApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authToken:"a"
        };
    }
    logout=()=>{
        this.setState({authToken:""});
    }
    render() {
        //test if after loging in with url awsomeeditor/help help page opens or not 
        //if not then change url here only so not to show wrong thing there
        return this.state.authToken===""?<Login/>:<App logout={this.logout}/> ;
      }
}

export default EditorApp;
