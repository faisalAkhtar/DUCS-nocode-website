import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./admin.css";
import UpdateMenu from "./UpdateMenu";
import Editor from "./contentModifier2";
import UpdateNotification from "./UpdateNotificaion";
import UpdateUser from "./updateUser";
import AccountSettings from "./AccountSettings";

class App extends React.Component {
  action = (name) => {
    //way 1
    //window.location.href="/awesomeeditor/"+name;
    //way 2
    this.props.history.push("/awesomeeditor/" + name);
  };
  logout = () => {
    console.log("logging out");
    this.props.logout("", "", {});
  };
  render() {
    return (
      <Switch>
        <Route path="/awesomeeditor/editFile">
          <Editor authToken={this.props.authToken} />
        </Route>
        <Route path="/awesomeeditor">
          <div className="container">
            <div className="left">
              <h1>Editor Options</h1>
              <hr />
              {this.props.userObj.isAdmin ? (
                <button
                  name="update-users"
                  onClick={(e) => this.action(e.target.name)}
                >
                  Update Users
                </button>
              ) : null}

              <button
                name="update-collection"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Collections
              </button>
              <button
                name="update-notifications"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Notifications
              </button>
              <button
                name="update-page"
                onClick={(e) => this.action(e.target.name)}
              >
                Update Pages
              </button>
              <button
                name="settings"
                onClick={(e) => this.action(e.target.name)}
              >
                Account Settings
              </button>
              <button name="help" onClick={(e) => this.action(e.target.name)}>
                Help,ContactUs
              </button>
              <button onClick={(e) => this.logout()}>Logout</button>
            </div>
            <div className="right">
              <Switch>
                <Route path="/awesomeeditor/update-users">
                  {this.props.userObj.isAdmin ? (
                    <UpdateUser
                      authToken={this.props.authToken}
                      logout={this.logout}
                    />
                  ) : <h1>Please Log in as admin</h1>}

                  {/* {() => <h1> this is update user page</h1>} */}
                </Route>
                <Route path="/awesomeeditor/update-collection">
                  <h1> this is update collection page</h1>
                </Route>
                <Route path="/awesomeeditor/help">
                  <h1> this is help page</h1>
                </Route>
                <Route path="/awesomeeditor/settings">
                  <AccountSettings
                    authToken={this.props.authToken}
                    logout={this.logout}
                  />
                </Route>
                <Route path="/awesomeeditor/update-notifications">
                  <UpdateNotification
                    authToken={this.props.authToken}
                    logout={this.logout}
                  />
                  {/* <h1> this is help page</h1> */}
                </Route>
                <Route path="/awesomeeditor">
                  <UpdateMenu
                    authToken={this.props.authToken}
                    logout={this.logout}
                    userObj={this.props.userObj}
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
