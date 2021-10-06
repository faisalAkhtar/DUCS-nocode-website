import React from "react";
import "./UpdateMenu.css"
import axios from "axios";
import { withRouter } from "react-router";

const baseurl="http://localhost:5000/"
class ReorderMenu extends React.Component{
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
            newMenu:this.props.newMenu,
            addPopUp:false,
            updatePopUp:false,
            lastclicked:{}
        }
    }
    changeLastClick=(arr)=>{
        this.setState({lastclicked:arr});
    }
    // componentDidMount(){
    //     axios.get(baseurl+"awesome-editor/filesystem").then(
    //         res=>{
    //             this.setState({oldMenu:res.data.Menu}); //change name of data object as provided in response
    //             this.setState({newMenu:res.data.Menu});
    //         }
    //     )
    // }
    findlinkOrder=(Menu)=>{
        var newData=[]
        Menu.forEach(element => {
            var newEl={"link":element.link,
                "type":element.type,
                "order":element.order}
            if(newEl.type==="menu"){
                newEl.items=this.findlinkOrder(element.items);
            }
            newData.push(newEl);
        })
        return newData;
    }
    save=()=>{
        var newData=this.findlinkOrder(this.state.newMenu);
        console.log(newData);
        axios.patch(baseurl+"awesome-editor/filesystem",
            {"newMenu":this.state.newMenu},//type
            {headers:{"authorization": "Bearer "+this.props.authToken}}
        ).then(
            res=>{
                alert("update successfully");
                this.props.history.push("/awesomeeditor");
            }
        ).catch(
            err=>{
                alert("Some error occurred can't update")
            }
        )
    }
    cancel=()=>{
        this.props.history.push("/awesomeeditor");
    }
    down=(clicked,below)=>{
        clicked.order=below.order;
        below.order=below.order-1;
        this.setState({newMenu:this.state.newMenu});
    }
    up=(clicked,above)=>{
        clicked.order=above.order;
        above.order=above.order+1;
        this.setState({newMenu:this.state.newMenu});
    }
    createMenu=(Menu,parent,level)=>{
        if(!Array.isArray(Menu)) return null;
        Menu.sort((a,b)=>a.order>b.order?1:-1);
        return (
                    <ul>
                    {
                        Menu.map(menuitem => {
                            if(menuitem.type==="menu"){
                                return  <li> <> {menuitem.name} </>
                                        {menuitem.order!==Menu.length?
                                            <button className="down" onClick={e=>this.down(menuitem,Menu.find(mi=>mi.order===menuitem.order+1))}> &#8595;
                                            </button>
                                            : null
                                        }
                                        {menuitem.order!==1?
                                            <button className="down" onClick={e=>this.up(menuitem,Menu.find(mi=>mi.order===menuitem.order-1))}> &#8593;
                                            </button>
                                            : null
                                        }   
                                        {this.createMenu(menuitem.items,parent.concat(menuitem.link),level+1)}
                                        </li>
                               }
                            else{
                                return <li> <>{menuitem.name}</>
                                   {menuitem.order!==Menu.length?
                                            <button className="down" onClick={e=>this.down(menuitem,Menu.find(mi=>mi.order===menuitem.order+1))}> &#8595;
                                            </button>
                                            : null
                                        }
                                        {menuitem.order!==1?
                                            <button className="down" onClick={e=>this.up(menuitem,Menu.find(mi=>mi.order===menuitem.order-1))}> &#8593;
                                            </button>
                                            : null
                                        } 
                                </li>
                            }
                            }
                        )
                    }
                    </ul>);
           
    }
    render(){
        return <div className="menucreator">
            <div className="heading">
                <h1>FileSystem</h1>
                <div className="addbutton">
                <button className="save" onClick={e=>this.save()}>Save</button>
                <button className="cancel" onClick={e=>this.cancel()}>Cancel</button>
                </div>
            </div>
            <div className="menu">
            {this.createMenu(this.state.newMenu,[],0)}
            </div>
        </div>
    }
}

export default withRouter(ReorderMenu);
/* we want popup to have knowledge about the button clicked 
    -the only way we can have is to contain this information in state of the update menu component
    -so we need to update this info from the button click to contain info about last clicked button */