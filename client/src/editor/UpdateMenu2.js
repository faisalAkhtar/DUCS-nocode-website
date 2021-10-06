import React from "react";
import "./UpdateMenu.css"
import axios from "axios";
import {AddButton,DeleteButton} from "./add";
//import AddPop from "./Popup"
import Popup from "reactjs-popup";

const baseurl="http://localhost:5000/"
class UpdateMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            oldMenu:[
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
                            },
                            {
                                "type" : "menu",
                                "name" : "M.Sc. Computer Science",
                                "link" : "msc",
                                items:[
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
                        ]
                }
            ],
            newMenu:[
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
            ],
            addPopUp:false
        }
    }
    closePopup=()=>this.setState({addPopUp:false});
    /*ComponentDidMount(){
        axios.get(baseurl).then(
            res=>{
                this.setState({oldMenu:res.data.Menu}); //change name of data object as provided in response
                this.setState({newMenu:oldMenu});
            }
        )
    }*/
    addToMenu=(name,fileName,type,parent)=>{
        this.setState({addPopUp:true});
        //make update in new menu
        if(parent.length===0){
            this.state.newMenu.push({"name":name,"link":fileName,"type":type});
        }
        else if(parent.length===1){
            var obj=this.state.newMenu.filter(menuitem=> menuitem.name===parent[0]);
            obj.push({"name":name,"link":fileName,"type":type});
        }
        else if(parent.length===2){
            var obj1=this.state.newMenu.filter(menuitem=> menuitem.name===parent[1]);
            var obj2=obj1.filter(menuitem=> menuitem.name===parent[0])
            obj2.push({"name":name,"link":fileName,"type":type});
        }
        axios.post(baseurl+"awesome-editor/",
            {"name":name,
            "fileName":fileName,
            "type":type,
            "parent":parent},//data format array[0]:parent array[1]:grandparent (if exist) will not taking order and draft set them defaultly
            {headers:{"authorization": "Bearer "+this.props.authToken}}).then( res =>
                {this.setState({[this.state.oldMenu]:[this.state.newMenu]});
                alert("Page/menu added successfully to this menu")}
        ).catch(    
            err=>{
                this.setState({[this.state.newMenu]:[this.state.oldMenu]});
                alert("Some error occurred CAN'T SAVE")
            }
        )
    }
    createMenu=(Menu,parent)=>{
        if(parent!==[])
        parent.push(Menu.name);
        return <div className="menucreator">
                    <ul>
                    {
                        Menu.map(menuitem => {
                            if(menuitem.type==="menu"){
                                return  <li> <> {menuitem.name} </>
                                                <DeleteButton name={menuitem.name} parent={parent}/>
                                                <AddButton name={menuitem.name} parent={parent} add={this.addToMenu}/>
                                             {this.createMenu(menuitem.items,parent)}
                                        </li>
                               }
                            else{
                                return <li> <>{menuitem.name}</>
                                    <DeleteButton name={menuitem.name} parent={parent}/>
                                </li>
                            }
                            }
                        )
                    }
                    </ul>
            </div>
    }
    render(){
        return <div /*className="menucreator"*/>
            {this.createMenu(this.state.newMenu,[])}
            {
            this.state.addPopUp?
                <Popup>
                    <h1>Please enter neccessary information</h1>
                    <form>
                        <label>Name
                            <input type="text" id="name" value={this.state.name} onChange={e=>this.onChange(e)}/>
                        </label>
                        <label>fileName
                            <input type="text" id="filename" value={this.state.filename} onChange={event=>this.onChange(event)}/>
                        </label>
                        <label>Type
                            <select value={this.state.type} onChange={e=>this.onChange(e)} >
                                <option id="menu" value="menu">menu</option>
                                <option id="page" value="page">page</option>
                            </select>
                        </label>
                        <button onClick={e=>this.close()}>Cancel</button>
                        <button onClick={e=>this.submit()}>Save</button>
                    </form>
                </Popup>
                /*<AddPop close={this.closePopup}/>*/ : null
            }
        </div>
    }
}

export default UpdateMenu;