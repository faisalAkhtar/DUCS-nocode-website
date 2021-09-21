import React from "react";
import "./App.css";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'; 

const baseurl="http://localhost:5000/"
class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    state={
        markup:""
    }
    componentDidMount(){
        axios.get(baseurl+'util/menu').then(
            res=>{
                console.log("response recieved");
                this.setState({markup : res.data});
            }
        );
    }
    //<li> <p> {menuitem.name} </p> </li> /*********needs some figure out here */
    render(){
        return ReactHtmlParser(this.state.markup);   
    }
}

export default Menu;
  /* 
  var menu=[
            {"name":"Home","type":"menu","items":[{
                        "type" : "page",
                        "name" : "HOD Message",
                        "link" : "hod"
                },{
                        "type" : "page",
                        "name" : "Faculty",
                        "link" : "faculty"
                },{
                        "type" : "page",
                        "name" : "Staff",
                        "link" : "staff"
                }]
            },{
                "type" : "menu",
                "name" : "Admissions",
                "link" : "admissions",
                "items" : [
                        {
                                "type" : "page",
                                "name" : "Ph.D. Computer Science",
                                "link" : "phd"
                        },
                        {
                                "type" : "page",
                                "name" : "MCA",
                                "link" : "mca"
                        },
                        {
                                "type" : "page",
                                "name" : "M.Sc. Computer Science",
                                "link" : "msc"
                        }
                    ]
            }
        ];
  <div className="mainmenu">
        <ul className="menu">{
            menu.map( menuitem => {   if(menuitem.type==='menu'){
                return (
                    <li className="horizontal"> <a>{menuitem.name}</a> 
                    <ul className="menu">{
                        menuitem.items.map( menuitem2 =>{ //as we are guranteed that submenu will never have a menu again hence directly building links for it 
                            <li className="vertical">
                                <a href={menuitem2.link}>{menuitem.name}</a>
                            </li>
                            })
                    }</ul>
                    </li>
                )
            }  
            else{
                return (
                        <li className="horizontal">
                            <a href={menuitem.link}>{menuitem.name}</a>
                        </li>
                )
            }
                
            }
        )
        }</ul>
        </div>
        fetch from port:5000
        util
        */