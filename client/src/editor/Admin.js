import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./admin.css";
import UpdateMenu from "./UpdateMenu";
import Editor from "./contentModifier2";

class App extends React.Component {
  action = (name) => {
    //way 1
    //window.location.href="/awesomeeditor/"+name;
    //way 2
    this.props.history.push("/awesomeeditor/" + name);
  };
  logout = () => {
    console.log("logging out");
    this.props.logout("", "");
  };
  render() {
    return (
      <Switch>
        <Route path="/awesomeeditor/editFile">
          <Editor authToken={this.props.authToken}/>
        </Route>
        <Route path="/awesomeeditor">
          <div className="container">
            <div className="left">
              <h1>Editor Options</h1>
              <hr />
              <button
                name="update-users"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Users
              </button>
              <button
                name="update-collection"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Collections
              </button>
              <button
                name="update-page"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Pages
              </button>
              <button name="help" onClick={(e) => this.action(e.target.name)}>
                Help,ContactUs
              </button>
              <button onClick={(e) => this.logout()}>Logout</button>
            </div>
            <div className="right">
              <Switch>
                <Route path="/awesomeeditor/update-users">
                  {() => <h1> this is update user page</h1>}
                </Route>
                <Route path="/awesomeeditor/update-collection">
                  <h1> this is update collection page</h1>
                </Route>
                <Route path="/awesomeeditor/help">
                  <h1> this is help page</h1>
                </Route>
                <Route path="/awesomeeditor">
                  {/* <h1> this is update page page</h1> */}
                  <UpdateMenu
                    authToken={this.props.authToken}
                    logout={this.logout}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
