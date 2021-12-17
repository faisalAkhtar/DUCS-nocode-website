import React from "react";
import axios from "axios";
import './login.css';

const baseurl="http://localhost:5000/";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.FormSubmit=this.FormSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }
    FormSubmit(event){
        event.preventDefault();
        //let data=
        axios.post(baseurl+'awesome-editor/auth',{"email":this.state.userid,"password":this.state.password}).then(
            res=>{
                console.log(res.data);
                //set token in editor app's state
                this.props.onSucc(res.data.accessToken,res.data.refreshToken,res.data.userObj);
            }
        ).catch(
            err => {alert("invalid email or password")
            console.log(err)}
        );
    }
    render(){
        return (
            <div className="logincontainer">
                <div className="login">
                    <h1>Department of Computer Science </h1>
                    <h2>Faculty Login</h2>
                    <div>
                        <form action="" method="POST" onSubmit={this.FormSubmit}>
                            <label>User Id: 
                            <input type="text" value={this.state.userid} name="userid" onChange={(event)=>this.handleChange(event)}/>
                            </label>
                            
                            <label>Passward:
                            <input type="password" value={this.state.password} name="password" onChange={(event)=>this.handleChange(event)}/>
                            </label>

                            <input type="submit" value="Login" />
                            
                        </form>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}
export default Login;