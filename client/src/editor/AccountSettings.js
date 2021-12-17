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
      password: "",
    };
  }
  // componentDidMount() {
  //   axios
  //     .get(baseurl + "user")
  //     .then((res) => {
  //       this.setState({ users: res.data }); //change name of data object as provided in response
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // }
  makeEditable = (value) => {
    var input = document.getElementById("firstName");
    input.disabled = value;
    var input = document.getElementById("lastName");
    input.disabled = value;
    var input = document.getElementById("email");
    input.disabled = value;
    var input = document.getElementById("password");
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
      input.style.display = "block";
    }
  };
  submit = (e) => {
    e.preventDefault();
    axios
      .put(baseurl + "user", this.state, {
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
  render() {
    return (
      <div className="userInfo">
        <form onSubmit={(e) => this.submit(e)}>
          <label for="firstName">First Name:
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={this.state.firstName}
            disabled
          />
          </label>
          <label for="lastName">Last Name:
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={this.state.lastName}
            disabled
          /></label>
          <label for="email">Email:
          <input id="email" name="email" type="email" value={this.state.email} disabled /></label>
          <label for="password">Password:
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            disabled
          /></label>
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
      </div>
    );
  }
}

export default AccountSettings;
