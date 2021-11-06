import React from "react";
import "./UpdateMenu.css";
import axios from "axios";
import { AddButton, DeleteButton, UpdateButton } from "./add";
import { AddPop, UpdatePop } from "./Popup";
import ReorderMenu from "./reorderMenu";
import { Route, Switch, withRouter } from "react-router";

const baseurl = "http://localhost:5000/";
class UpdateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldMenu: [],
      newMenu: [],
      addPopUp: false,
      updatePopUp: false,
      lastclicked: {},
      isMove: false,
    };
  }
  changeLastClick = (arr) => {
    this.setState({ lastclicked: arr });
  };
  componentDidMount() {
    axios
      .get(baseurl + "awesome-editor/filesystem", {
        headers: { authorization: "Bearer " + this.props.authToken },
      })
      .then((res) => {
        let data = res.data;
        let data2 = JSON.parse(JSON.stringify(res.data));
        this.setState({ oldMenu: data }); //change name of data object as provided in response
        this.setState({ newMenu: data2 });
      });
  }
  toggleAddPopup = () => {
    this.setState({ addPopUp: !this.state.addPopUp });
  };
  toggleUpdatePopup = () => {
    this.setState({ updatePopUp: !this.state.updatePopUp });
  };
  toggleMove = () => {
    this.props.history.push("/awesomeeditor/page/reorder");
  };
  addToMenu = (name, fileName, type, parent) => {
    //make update in new menu
    console.log(parent);
    console.log("while add call");
    var toAdd = {
      name: name,
      link: fileName,
      type: type,
      draft: true,
      order: -1,
    };
    if (type === "menu") {
      console.log("new menu creation creating items array for it ");
      toAdd.items = [];
    }
    if (parent.length === 0) {
      toAdd.order = this.state.newMenu.items
        ? this.state.newMenu.length + 1
        : 1;
        if(!this.state.newMenu.items)
            this.state.newMenu.items=[]
      this.state.newMenu.push(toAdd);
    } else if (parent.length === 1) {
      var obj = this.state.newMenu.filter(
        (menuitem) => menuitem.link === parent[0]
      );
      console.log(obj);
      toAdd.order = obj[0].items ? obj[0].items.length + 1 : 1;
      if(!obj[0].items)
            obj[0].items=[]
      obj[0].items.push(toAdd);
    } else if (parent.length === 2) {
      console.log(parent[0]);
      var obj1 = this.state.newMenu.filter(
        (menuitem) => menuitem.link === parent[0]
      );
      var obj2 = obj1[0].items.filter(
        (menuitem) => menuitem.link === parent[1]
      );
      console.log(obj2);
      toAdd.order = obj2[0].items ? obj2[0].items.length + 1 : 1;
      if(!obj2[0].items)
            obj2[0].items=[]
      obj2[0].items.push(toAdd);
    }
    //this.render();
    axios
      .post(
        baseurl + "awesome-editor/filesystem",
        {
          name: name,
          type: type,
          order: toAdd.order,
          address: parent.concat(fileName),
        },
        { headers: { authorization: "Bearer " + this.props.authToken } }
      )
      .then((res) => {
        let oldMenu = JSON.parse(JSON.stringify(this.state.newMenu));
        this.setState({ oldMenu });
        alert(type==="page"?"Page":"menu"+" added successfully to this menu");
      })
      .catch((err) => {
        let newMenu = JSON.parse(JSON.stringify(this.state.oldMenu));
        this.setState({ newMenu });
        console.log(this.state.newMenu[0]);
        console.log(this.state.oldMenu[0]);
        alert("Some error occurred CAN'T SAVE");
      });
  };
  delete = (address, type) => {
    // console.log(name);
    // console.log(parent);
    var nm = this.state.newMenu;
    if (address.length === 1) {
      nm = nm.filter((menuitem) => menuitem.link !== address[0]);
    } else if (address.length === 2) {
      for (let i = 0; i < nm.length; i++) {
        if (nm[i].link === address[0]) {
          nm[i].items = nm[i].items.filter((m) => m.link !== address[1]);
          //console.log(nm[i])
        }
      }
    } else if (address.length === 3) {
      for (let i = 0; i < nm.length; i++) {
        if (nm[i].link === address[0]) {
          for (let j = 0; j < nm[i].items.length; j++)
            if (nm[i].items[j].link === address[1]) {
              nm[i].items[j].items = nm[i].items[j].items.filter(
                (m) => m.link !== address[2]
              );
              //console.log(nm[i])
            }
        }
      }
    }
    //this.setState({newMenu:nm});
    console.log(address);
    axios
      .delete(baseurl + "awesome-editor/filesystem", {
        headers: { authorization: "Bearer " + this.props.authToken },
        data: { address, type },
      })
      .then(
        (res) => {
          alert("delete success");
          let oldMenu = JSON.parse(JSON.stringify(this.state.newMenu));
          this.setState({ oldMenu });
        } //then rerequest for structure of files TBD
      )
      .catch((err) => {
        alert("some error occured");
        let newMenu = JSON.parse(JSON.stringify(this.state.oldMenu));
        this.setState({ newMenu });
      });
  };
  update = (address, changes, type) => {
    console.log(changes);
    axios
      .patch(
        baseurl + "awesome-editor/filesystem",
        { address, changes, type }, //type
        { headers: { authorization: "Bearer " + this.props.authToken } }
      )
      .then((res) => {
        alert("update successfully");
        axios
          .get(baseurl + "awesome-editor/filesystem", {
            headers: { authorization: "Bearer " + this.props.authToken },
          })
          .then((res) => {
            let data = res.data;
            let data2 = JSON.parse(JSON.stringify(res.data));
            this.setState({ oldMenu: data }); //change name of data object as provided in response
            this.setState({ newMenu: data2 });
          });
      })
      .catch((err) => {
          console.log(err.response.data)
        alert("cant update");
      });
  };
  openInEditor=(filename)=>{
    // window.location.href
    console.log(filename)
    this.props.history.push("/awesomeeditor/editfile/" +filename.join("/"));
  }
  createMenu = (Menu, parent, level) => {
    if (!Array.isArray(Menu)) return null;
    Menu.sort((a, b) => (a.order > b.order ? 1 : -1));
    return (
      <ul>
        {Menu.map((menuitem) => {
          if (menuitem.type === "menu") {
            return (
              <li key={menuitem.link}>
                {" "}
                <> {menuitem.name} </>
                <div className="editbuttons">
                <button className="editbuttonsdropdown">&#10247;</button>
                <div className="editoptions">
                <DeleteButton
                  address={parent.concat(menuitem.link)}
                  delete={this.delete}
                  type="menu"
                />
                <UpdateButton
                  address={parent.concat(menuitem.link)}
                  toggle={this.toggleUpdatePopup}
                  lastclicked={this.changeLastClick}
                  order={menuitem.order}
                  draft={menuitem.draft}
                  name={menuitem.name}
                  type="menu"
                />
                <AddButton
                  parent={parent.concat(menuitem.link)}
                  toggle={this.toggleAddPopup}
                  lastclicked={this.changeLastClick}
                /></div></div>
                {this.createMenu(
                  menuitem.items,
                  parent.concat(menuitem.link),
                  level + 1
                )}
              </li>
            );
          } else {
            return (
              <li key={menuitem.link}>
                {" "}
                <p onDoubleClick={(e)=>this.openInEditor(parent.concat(menuitem.link))} style={{display:"inline"}}>{menuitem.name}</p>
                <div className="editbuttons">
                <button className="editbuttonsdropdown">&#10247;</button>
                <div className="editoptions">
                <DeleteButton
                  address={parent.concat(menuitem.link)}
                  delete={this.delete}
                  type="page"
                />
                <UpdateButton
                  address={parent.concat(menuitem.link)}
                  toggle={this.toggleUpdatePopup}
                  lastclicked={this.changeLastClick}
                  order={menuitem.order}
                  draft={menuitem.draft}
                  name={menuitem.name}
                  type="page"
                /></div></div>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  render() {
    return (
      <Switch baseurl="">
        <Route path="/awesomeeditor/page/reorder">
          <ReorderMenu
            toggleMove={this.toggleMove}
            newMenu={this.state.oldMenu}
            authToken={this.props.authToken}
          />
        </Route>
        <Route>
          <div className="menucreator">
            <div className="heading">
              <h1 className="head">FileSystem</h1>
              <div className="addbutton">
                <button className="move" onClick={(e) => this.toggleMove()}>
                  Move
                </button>
                <AddButton
                  parent={[]}
                  toggle={this.toggleAddPopup}
                  lastclicked={this.changeLastClick}
                />
              </div>
            </div>
            <div className="menu">
              {this.createMenu(this.state.oldMenu, [], 0)}
            </div>
            {this.state.addPopUp ? (
              <AddPop
                close={this.toggleAddPopup}
                add={this.addToMenu}
                parent={this.state.lastclicked}
              />
            ) : null}
            {this.state.updatePopUp ? (
              <UpdatePop
                close={this.toggleUpdatePopup}
                update={this.update}
                parent={this.state.lastclicked}
              />
            ) : null}
          </div>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(UpdateMenu);
/* we want popup to have knowledge about the button clicked 
    -the only way we can have is to contain this information in state of the update menu component
    -so we need to update this info from the button click to contain info about last clicked button 
    
      :
    */
