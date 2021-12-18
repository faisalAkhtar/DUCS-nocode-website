import React from "react";
import "./updateUser.css";
import axios from "axios";

const baseurl = "http://localhost:5000/";
class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: {
        lastName: "",
        firstName: "",
        email: "",
        permissions: [],
        password: "",
        uid:"",
      },
    };
  }
  componentDidMount(){
    this.getUsers();
    }
  getUsers = () => {
    axios.get(baseurl + "users", {
      headers: { authorization: "Bearer " + this.props.authToken },
    }).then(
      res=>{
        console.log(res.data);
        this.setState({users:res.data});
      }
    ).catch(
        err=>{
          // console.log(err.response.data);
        }
    );
  };
  setUser=(e,user)=>{
    var formData=this.state.formData;
    formData.uid=user.uid;
    formData.firstName=user.firstName;
    formData.lastName=user.lastName;
    formData.password="******";
    formData.email=user.email;
    this.getUserPermissions(null,user.uid);
    // formData.permissions=[];
    this.setState({formData});
    var form=document.getElementById("UserForm");
    form.style.display="block";
    form=document.getElementById("permissionForm");
    form.style.display="block";
  }
  deleteUser = (e, uid) => {
    e.stopPropagation();
    console.log("inside delete menu");
    if (window.confirm("Are you sure to delete the user?")) {
      axios.delete(baseurl+"users/"+uid,{
        headers: { authorization: "Bearer " + this.props.authToken },
      }).then(
        res=>{
          var users=this.state.users;
          users=users.filter(user=>user.uid!==uid);
          console.log(users);
          this.setState({users},()=>{this.render()});
        }
      ).catch(
        err=>{
          alert("Some error occured in deletion");
          console.log(err.response.data);
        }
      );
    }
  };
  getMenu = () => {
    console.log("inside get menu");
    axios
      .get(baseurl + "awesome-editor/filesystem", {
        headers: { authorization: "Bearer " + this.props.authToken },
      })
      .then((res) => {
        let data = res.data;
        console.log(data);
        var formData = this.state.formData;
        formData.permissions = data;
        this.setState({ formData });
      })
      .catch((err) => {
        console.log(err.response.data);
        return null;
      });
  };
  //1.fix one notation for getting permissions somwhere its true false else -1 make it clear on both ends and work accordingly
  //2.for admin all trues should be there but there are falses as well
  createMenu = (menu) => {
    // console.log("inside create menu");
    if (!Array.isArray(menu) || menu.length <= 0) return null;
    //console.log(menu);
    return (
      <ul className="permissions-list">
        {menu.map((item, index) => {
          delete item.order;
          delete item.draft;
          return (
            <div>
              <li key={item.link}>
                {/* <label> */}
                <input
                  key={item.permitted}
                  type="checkbox"
                  onChange={(e) => this.toggleCheckboxMarking(item)}
                  checked={item.permitted}
                />
                {item.name}
                {item.link}
                {this.createMenu(item.items)}
                {/* </label> */}
              </li>
            </div>
          );
        })}
      </ul>
    );
  };
  getUserPermissions = (e,uid) => {
    if(e){
      e.stopPropagation();
    }
    axios
      .get(baseurl + "awesome-editor/filesystem/permissions/"+uid, {
        headers: { authorization: "Bearer " + this.props.authToken },
      })
      .then((res) => {
        var permissions = res.data;
        console.log(permissions);
        var formData=this.state.formData;
        formData.permissions=permissions;
        this.setState({ formData },()=>{this.render()});
        var form=document.getElementById("permissionForm");
        form.style.display="block";
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response);
      });
  };
  toggleCheckboxMarking = (item) => {
    console.log("toggling value from :" + item.permitted);
    if (!item) return;
    var newMark = !item.permitted;
    item.permitted = newMark;
    console.log("toggling value to :" + item.permitted);
    if (item.items) {
      //set childs to this value
      this.markAllchilds(item, newMark);
    }
    //now set all parents according to current changes made
    var formData = this.state.formData;
    this.markParent(formData.permissions);
    this.setState({ formData });
  };
  markParent = (menu) => {
    if (!menu) return;
    console.log(menu);
    var allchilds = true;
    menu.forEach((item) => {
      console.log(menu[0]);
      console.log(item);
      if (item.items) {
        var itemsChilds = this.markParent(item.items);
        item.permitted = itemsChilds;
      }
      allchilds = allchilds && item.permitted;
    });
    // ( var item in menu){
    //   console.log(menu[0])
    //   console.log(item);
    //   if(item.items){
    //     var itemsChilds=this.markParent(item.items);
    //     item.permitted=itemsChilds;
    //   }
    // allchilds=allchilds && item.permitted;
    // }
    return allchilds;
  };
  markAllchilds = (item, value) => {
    console.log("marking childs");
    if (!Array.isArray(item.items) || item.items.length <= 0) return;
    console.log("marking childs 2 ");
    item.items.map((childItem) => {
      childItem.permitted = value;
      console.log(childItem);
      this.markAllchilds(childItem, value);
      return null;
    });
  };
  valueChange = (event) => {
    var formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState(formData);
  };
  createUser = (event) => {
    console.log("inside create user");
    event.preventDefault();
    var data={
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      email: this.state.formData.email,
      password: this.state.formData.password,
    }
    if(this.state.formData.uid!==""){
      data.id=this.state.formData.uid;
    }
    axios
      .post(
        baseurl + "users",
        data,
        { headers: { authorization: "Bearer " + this.props.authToken } }
      )
      .then((res) => {
        console.log(res.data);
        alert("user created successfully");
        this.getUsers();
        var uid=res.data.id;
        console.log(uid);
        var formData = this.state.formData;
        if(formData.uid===""){
          formData.uid=uid;
          this.getUserPermissions(null,uid);
          // form=document.getElementById("permissionForm");
          // form.style.display="block";
          alert("user creation successful");
        }
        else{
          alert("user data changed successful");
        }
       var form = document.getElementById("UserForm");
        form.style.display = "none";
        
      })
      .catch(
        (err) => {
        alert("cant create user");
         console.log(err.response);
      });
  };
  displayCreateUser = (e) => {
    console.log("inside create user display");
    this.getMenu();
    var form = document.getElementById("UserForm");
    form.style.display = "block";
  };
  // displayPermission=(permissions)=>{
    
  // }
  cancelUserCreation=(e)=>{
    e.stopPropagation();
    var form=document.getElementById("UserForm");
    form.style.display="none";
    var form=document.getElementById("permissionForm");
    form.style.display="none";
    var formData=this.state.formData;
    formData.uid="";
    formData.email="";
    formData.firstName="";
    formData.lastName="";
    formData.permissions=[];
    this.setState({formData});
  }
  setPermission = (e) => {
    e.preventDefault();
    axios.post(
      baseurl + "awesome-editor/filesystem/permissions/"+this.state.formData.uid,
      this.state.formData.permissions, //type
      { headers: { authorization: "Bearer " + this.props.authToken } }
    ).then(
      res=>{
        var form=document.getElementById("permissionForm");
        form.style.display="none";
        var form=document.getElementById("UserForm");
        form.style.display="none";
        var formData={
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            uid:"",
            permissions: [],
          };
          this.setState({ formData });
          alert("changes saved successfully");
      }
    ).catch(
      err=>{
        alert("some error occured");
        console.log(err.response.data);
      }
    );
  };
  render() {
    return (
      <div className="">
        <div>
          <h1>Editors list</h1>
          <button
            className="addUser"
            onClick={(e) => this.displayCreateUser(e)}
          >
            &#43;
          </button>
        </div>

        {this.state.users.length <= 0 ? null : (
          <div>
            <div className="users">
              <div>Name</div>
              <div>Email id</div>
              <div>permissions</div>
            </div>
            {this.state.users.map((user, index) => {
              return (
                <div
                  className="users"
                  onClick={(e) => this.setUser(e, user)}
                >
                  <button
                    onClick={(e) => this.deleteUser(e,user.uid)}
                    className="delete-category"
                  >
                    <img
                      src="https://toppng.com/uploads/preview/free-recycle-bin-icon-vector-recycle-bin-icon-115534132079jvhnualpn.png"
                      alt="delete"
                    />
                  </button>
                  <div>{user.firstName + " " + user.lastName}</div>
                  <div>{user.email}</div>
                  <div>
                      <button
                        className="show-permission"
                        onClick={(e) => this.getUserPermissions(e, user.uid)}
                      >
                        Get Permissions
                      </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div id="permissionForm" className="permissionForm">
          <form onSubmit={(e) => this.setPermission(e)}>
            <label>
              Permissions:
              {this.createMenu(this.state.formData.permissions)}
            </label>
            {/* {console.log(this.state.formData.permissions)} */}
            <input type="submit" value="Save" />
          </form>
        </div>
        <div id="UserForm">
          <div>
            <h2>User Details</h2>
          </div>
          <form onSubmit={(e) => this.createUser(e)}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.formData.firstName}
                onChange={(e) => this.valueChange(e)}
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.formData.lastName}
                onChange={(e) => this.valueChange(e)}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={this.state.formData.email}
                onChange={(e) => this.valueChange(e)}
              />
            </label>

            <label>
              Password:
              <input
                type="text"
                name="password"
                value={this.state.formData.password}
                onChange={(e) => this.valueChange(e)}
              />
            </label>
            <input type="button" value="Cancel" onClick={e=>this.cancelUserCreation(e)}/>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateUser;