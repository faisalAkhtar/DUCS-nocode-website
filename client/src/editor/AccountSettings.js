import React from "react";
import "./updateUser.css";
import axios from "axios";

const baseurl = "http://localhost:5000/";
class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      email: "",
      password: "********",
    };
  }
  componentDidMount() {
    axios
      .get(baseurl + "user",{
        headers:{authorization: "Bearer " + this.props.authToken}
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          lastName: res.data.lastName,
          firstName: res.data.firstName,
          email: res.data.email,
          uid: res.data.uid,
        }); //change name of data object as provided in response
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  makeEditable = (value) => {
    var input = document.getElementById("firstName");
    input.disabled = value;
    var input = document.getElementById("lastName");
    input.disabled = value;
    var input = document.getElementById("email");
    input.disabled = value;
    if (!value) {
      input = document.getElementById("submit");
      input.style.display = "inline";
      input = document.getElementById("change");
      input.style.display = "none";
    } else {
      input = document.getElementById("submit");
      input.style.display = "none";
      input = document.getElementById("change");
      input.style.display = "inline";
    }
  };
  submit = (e) => {
    e.preventDefault();
    var data={
      lastName:this.state.lastName,
      firstName:this.state.firstName,
      email:this.state.email,
    }
    axios
      .put(baseurl + "user", data, {
        headers: { authorization: "Bearer " + this.props.authToken },
      })
      .then((res) => {
        this.makeEditable(true);
        alert("data saved");
      })
      .catch((err) => {
        alert("error occured");
        console.log(err.response.data);
      });
  };
  valueChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }
  makePasswordEditable=()=>{
    var input=document.getElementById("password");
    input.disabled=false;
    var button=document.getElementById("changePass");
    button.style.display="none";
    var button=document.getElementById("submitPass");
    button.style.display="inline";
  }
  changePassword=(e)=>{
    e.preventDefault();
    axios
    .put(baseurl + "user/password", this.state.password, {
      headers: { authorization: "Bearer " + this.props.authToken },
    })
    .then((res) => {
      var input=document.getElementById("password");
      input.disabled=true;
      var button=document.getElementById("changePass");
      button.style.display="inline";
      var button=document.getElementById("submitPass");
      button.style.display="none";
      this.setState({password:"*******"});
      alert("data saved");
    })
    .catch((err) => {
      alert("error occured");
      console.log(err.response.data);
    });
  }
  render() {
    return (
      <div className="userInfo">
        <form onSubmit={(e) => this.submit(e)}>
          <label for="firstName">
            First Name:
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={e=>this.valueChange(e)}
              disabled
            />
          </label>
          <label for="lastName">
            Last Name:
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={e=>this.valueChange(e)}
              value={this.state.lastName}
              disabled
            />
          </label>
          <label for="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              onChange={e=>this.valueChange(e)}
              value={this.state.email}
              disabled
            />
          </label>
          <input
            type="button"
            id="change"
            onClick={(e) => this.makeEditable(false)}
            value="change"
          />
          <input
            id="submit"
            name="submit"
            value="submit"
            type="submit"
            style={{ display: "none" }}
          />
        </form>
        <form onSubmit={e=>this.changePassword(e)}>
        <label for="password">
            Password:
            <input
              id="password"
              name="password"
              type="password"
              onChange={e=>this.valueChange(e)}
              value={this.state.password}
              disabled
            />
          </label>
          <input
            type="button"
            id="changePass"
            onClick={(e) => this.makePasswordEditable()}
            value="Change Password"
          />
          <input
            id="submitPass"
            name="submitPass"
            value="submit"
            type="submit"
            style={{ display: "none" }}
          />
        </form>
      </div>
    );
  }
}

export default AccountSettings;
