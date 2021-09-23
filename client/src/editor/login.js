import React from "react";
import './login.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
    }
    render(){
        return (
            <div className="container">
                <div className="login">
                    <h1>Department of Computer Science </h1>
                    <h2>Faculty Login</h2>
                    <div>
                        <form action="" method="POST">
                            <label>User Id: 
                            <input type="text" value={this.state.userid} name="userid" onChange={(event)=>this.handleChange(event)}/>
                            </label>
                            
                            <label>Passward:
                            <input type="password" value={this.state.password} name="password" onChange={(event)=>this.handleChange(event)}/>
                            </label>

                            <intput type="submit" value="submit" >Login</intput>
                            
                        </form>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}
export default Login;