import React from "react";
import './login.css';

class Login extends React.Component{
    render(){
        return (
            <div className="login">
                <form method="POST">
                    <label>User Id</label>
                    <input type="text" name="userid"></input>
                    <br>
                    <label>Passward</label>
                    <input type="password" name="password"></input>
                    </br>
                    <intput type="submit" value="Login" >Login</intput>
                </form>
            </div>
        )
    }
}
