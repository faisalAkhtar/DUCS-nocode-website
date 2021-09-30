import React from "react";
import "./UpdateMenu.css"
import axios from "axios";
import {AddButton,DeleteButton,UpdateButton} from "./add";
import AddPop from "./Popup"

const baseurl=process.env.REACT_BASEURL;
class UpdateUser extends React.Component{
    constructor(props){
        super(props);
    }
    /*ComponentDidMount(){
        axios.get(baseurl).then(
            res=>{
                this.setState({oldMenu:res.data.Menu}); //change name of data object as provided in response
                this.setState({newMenu:oldMenu});
            }
        )
    }*/
    render(){
        return <div className="menucreator">
            
        </div>
    }
}

export default UpdateUser;