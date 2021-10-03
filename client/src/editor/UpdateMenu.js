import React from "react";
import "./UpdateMenu.css"
import axios from "axios";
import {AddButton,DeleteButton,UpdateButton} from "./add";
import {AddPop,UpdatePop} from "./Popup"

const baseurl="http://localhost:5000/"
class UpdateMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            oldMenu:[
                {
                    "type": "menu",
                    "link": "home",
                    "name": "Home",
                    "order": 1,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "hod",
                            "name": "HOD Message",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "faculty",
                            "name": "Faculty",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "staff",
                            "name": "Staff",
                            "order": 3,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "infra",
                            "name": "Infrastructure",
                            "order": 4,
                            "draft": false
                        }
                    ]
                },
                {
                    "type": "menu",
                    "link": "admissions",
                    "name": "Admissions",
                    "order": 2,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "phd",
                            "name": "Ph.D. Computer Science",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "mca",
                            "name": "MCA",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "msc",
                            "name": "M.Sc. Computer Science",
                            "order": 3,
                            "draft": false
                        }
                    ]
                },
                {
                    "type": "menu",
                    "link": "exams",
                    "name": "Examination",
                    "order": 3,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "phd",
                            "name": "PHD Computer Science",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "msc",
                            "name": "M.Sc. Computer Science",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "mca",
                            "name": "MCA",
                            "order": 3,
                            "draft": false
                        },
                        {
                            "type": "menu",
                            "link": "obe",
                            "name": "OBE",
                            "order": 4,
                            "permission": [],
                            "items": [
                                {
                                    "type": "page",
                                    "link": "june2021",
                                    "name": "June 2021",
                                    "order": 1,
                                    "draft": false
                                },
                                {
                                    "type": "page",
                                    "link": "june2020",
                                    "name": "June 2020",
                                    "order": 2,
                                    "draft": false
                                }
                            ]
                        }
                    ]
                }
            ],
            newMenu:[
                {
                    "type": "menu",
                    "link": "home",
                    "name": "Home",
                    "order": 1,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "hod",
                            "name": "HOD Message",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "faculty",
                            "name": "Faculty",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "staff",
                            "name": "Staff",
                            "order": 3,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "infra",
                            "name": "Infrastructure",
                            "order": 4,
                            "draft": false
                        }
                    ]
                },
                {
                    "type": "menu",
                    "link": "admissions",
                    "name": "Admissions",
                    "order": 2,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "phd",
                            "name": "Ph.D. Computer Science",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "mca",
                            "name": "MCA",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "msc",
                            "name": "M.Sc. Computer Science",
                            "order": 3,
                            "draft": false
                        }
                    ]
                },
                {
                    "type": "menu",
                    "link": "exams",
                    "name": "Examination",
                    "order": 3,
                    "permission": [],
                    "items": [
                        {
                            "type": "page",
                            "link": "phd",
                            "name": "PHD Computer Science",
                            "order": 1,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "msc",
                            "name": "M.Sc. Computer Science",
                            "order": 2,
                            "draft": false
                        },
                        {
                            "type": "page",
                            "link": "mca",
                            "name": "MCA",
                            "order": 3,
                            "draft": false
                        },
                        {
                            "type": "menu",
                            "link": "obe",
                            "name": "OBE",
                            "order": 4,
                            "permission": [],
                            "items": [
                                {
                                    "type": "page",
                                    "link": "june2021",
                                    "name": "June 2021",
                                    "order": 1,
                                    "draft": false
                                },
                                {
                                    "type": "page",
                                    "link": "june2020",
                                    "name": "June 2020",
                                    "order": 2,
                                    "draft": false
                                }
                            ]
                        }
                    ]
                }
            ],
            addPopUp:false,
            updatePopUp:false,
            lastclicked:{}
        }
    }
    changeLastClick=(arr)=>{
        this.setState({lastclicked:arr});
    }
    /*ComponentDidMount(){
        axios.get(baseurl).then(
            res=>{
                this.setState({oldMenu:res.data.Menu}); //change name of data object as provided in response
                this.setState({newMenu:oldMenu});
            }
        )
    }*/
    toggleAddPopup=()=>{
        this.setState({addPopUp:!(this.state.addPopUp)});
    }
    toggleUpdatePopup=()=>{
        this.setState({updatePopUp:!(this.state.updatePopUp)});
    }
    addToMenu=(name,fileName,type,parent)=>{
        //make update in new menu
        console.log(parent)
        console.log("while add call")
        var toAdd={"name":name,"link":fileName,"type":type,"draft":true,"order":-1};
        if(type==="menu"){
            console.log("new menu creation creating items array for it ")
            toAdd.items=[];
        }
        if(parent.length===0){
            toAdd.order=this.state.newMenu.length+1;
            this.state.newMenu.push(toAdd);
        }
        else if(parent.length===1){
            var obj=this.state.newMenu.filter(menuitem=> menuitem.link===parent[0]);
            console.log(obj);
            toAdd.order=obj[0].items.length+1;
            obj[0].items.push(toAdd);
        }
        else if(parent.length===2){
            console.log(parent[0])
            var obj1=this.state.newMenu.filter(menuitem=> menuitem.link===parent[0]);
            var obj2=obj1[0].items.filter(menuitem=> menuitem.link===parent[1]);
            console.log(obj2);
            toAdd.order=obj2[0].items.length+1;
            obj2[0].items.push(toAdd);
        }
        this.render();  //dont you think instead of doing all this we should directly send the request to backend to get new filestructure again if success has been achived
        /*axios.post(baseurl+"awesome-editor/",
            {"name":name,
            "type":type,
            "parent":parent.concat(filename)},//data format array[0]:parent array[1]:grandparent (if exist) will not taking order and draft set them defaultly
            {headers:{"authorization": "Bearer "+this.props.authToken}}).then( res =>
                {this.setState({[this.state.oldMenu]:[this.state.newMenu]});
                alert("Page/menu added successfully to this menu")}
        ).catch(    
            err=>{
                this.setState({[this.state.newMenu]:[this.state.oldMenu]});
                alert("Some error occurred CAN'T SAVE")
            }
        )*/
    }
    delete=(address)=>{
        // console.log(name);
        // console.log(parent);
        var nm=this.state.newMenu;
        if(address.length===1){
            nm=nm.filter(menuitem=>menuitem.link!==address[0]);
        }
        else if(address.length===2){
            for (let i = 0; i < nm.length; i++){
                if(nm[i].link===address[0]){
                    nm[i].items=nm[i].items.filter(m=>m.link!==address[1])
                    console.log(nm[i])
                }    
            }
        }
        else if(address.length===3){
            for (let i = 0; i < nm.length; i++){
                if(nm[i].link===address[0]){
                    for(let j=0;j<nm[i].items.length;j++)
                    if(nm[i].items[j].link===address[1]){
                    nm[i].items[j].items=nm[i].items[j].items.filter(m=>m.link!==address[2])
                    console.log(nm[i])
                }    
            }}
         }
         this.setState({newMenu:nm});
         console.log(address);
        axios.delete(baseurl+"awesome-editor",
            {address},
            {headers:{"authorization": "Bearer "+this.props.authToken}}
        ).then(res=>
            alert("delete success") //then rerequest for structure of files TBD
        ).catch(
                err=>alert("some error occured")
        )
    }
    update=(address,changes)=>{
        console.log(changes);
        axios.put(baseurl+"awesome-editor",
            {address,changes},//type
            {headers:{"authorization": "Bearer "+this.props.authToken}}
        ).then(
            res=>{
                alert("update successfully")
            }
        ).catch(
            err=>{
                alert("cant update")
            }
        )
    }
    createMenu=(Menu,parent,level)=>{
        if(!Array.isArray(Menu)) return null;
        return (
                    <ul>
                    {
                        Menu.map(menuitem => {
                            if(menuitem.type==="menu"){
                                return  <li> <> {menuitem.name} </>
                                                <DeleteButton address={parent.concat(menuitem.link)} delete={this.delete}/>
                                                <UpdateButton address={parent.concat(menuitem.link)} toggle={this.toggleUpdatePopup} lastclicked={this.changeLastClick} order={menuitem.order} draft={menuitem.draft} name={menuitem.name}/>
                                                <AddButton parent={parent.concat(menuitem.link)} toggle={this.toggleAddPopup} lastclicked={this.changeLastClick}/>
                                             {this.createMenu(menuitem.items,parent.concat(menuitem.link),level+1)}
                                        </li>
                               }
                            else{
                                return <li> <>{menuitem.name}</>
                                    <DeleteButton address={parent.concat(menuitem.link)} delete={this.delete}/>
                                    <UpdateButton address={parent.concat(menuitem.link)} toggle={this.toggleUpdatePopup} lastclicked={this.changeLastClick} order={menuitem.order} draft={menuitem.draft} name={menuitem.name}/>
                                </li>
                            }
                            }
                        )
                    }
                    </ul>);
           
    }
    render(){
        return <div className="menucreator">
            {this.createMenu(this.state.newMenu,[],0)}
            {
            this.state.addPopUp?
                <AddPop close={this.toggleAddPopup} add={this.addToMenu} parent={this.state.lastclicked}/> : null
            }
            {
            this.state.updatePopUp?
                <UpdatePop close={this.toggleUpdatePopup} update={this.update} parent={this.state.lastclicked}/> : null
            }
        </div>
    }
}

export default UpdateMenu;
/* we want popup to have knowledge about the button clicked 
    -the only way we can have is to contain this information in state of the update menu component
    -so we need to update this info from the button click to contain info about last clicked button */