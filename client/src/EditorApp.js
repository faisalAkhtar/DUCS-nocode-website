import React from "react";
import Login from "./editor/login";
import App from "./editor/Admin";
import axios from "axios";

const baseurl = "http://localhost:5000/";
class EditorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      refreshToken: "",
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("accessToken")) this.setToken("", "");
    else{
    this.setToken(
      localStorage.getItem("accessToken"),
      localStorage.getItem("refreshToken")
    );}
  }
  //set current autorization token values on reciept in current state
  setToken = (auth, refresh) => {
    this.setState({
      authToken: auth,
      refreshToken: refresh,
    });
    if (auth === "" || refresh === "") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } else {
      localStorage.setItem("accessToken", auth);
      localStorage.setItem("refreshToken", refresh);
    }
    console.log("tokens set");
    console.log(this.state.authToken);
  };
  //verify if the current token is valid or not
  verifyToken = () => {
    axios
      .get(baseurl + "awesome-editor/", {
        headers: { authorization: "Bearer " + this.state.authToken },
      })
      .then((res) => {
        console.log("Token valid"); /*if valid do nothing*/
      })
      .catch((err) => {
        this.setToken("", "");
        console.log("token not valid");
      });
  };
  render() {
    //test if after loging in with url awsomeeditor/help help page opens or not
    //if not then change url here only so not to show wrong thing there
    // if(this.state.authToken!=="")
    //     this.verifyToken();
    return this.state.authToken === "" ? (
      <Login onSucc={this.setToken} />
    ) : (
      <App logout={this.setToken} authToken={this.state.authToken} />
    );
  }
}

export default EditorApp;
