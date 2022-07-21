import React,{ useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import authService from "../../service/auth.service";
import './Login.css'


function Register(){
    const [info, setInfo] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        redirect: false
    });

    const handleInput = (e)=>setInfo({
        ...info,
        [e.target.name] : e.target.value
    })

    const handleSubmit = (e) =>{
        console.log('info: ',info)
        e.preventDefault();
        if(info.password !== info.confirmPassword){
            setInfo({
                username: "",
                password: "",
                confirmPassword: "",
                redirect: false
            })
        }else{
            authService.signup(info.username, info.password).then(res=>{
                console.log('register: ', res)
                setInfo({
                    ...info,
                    redirect: true
                })
            }).catch(err=>{
                console.log(err)
            
            })
        }

    }


    if(info.redirect == true){
        return <Redirect to='/login'/>
    }
   
    return(
      <div className="component-container">
         <div className="btn-done-div">
        <Link to="/">
          <button className="btn-play btn-done">
            HOME
          </button>
        </Link>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="username" className="text-label">Username</label>
                  <input type="text" id="username"
                  name="username"
                  onChange={handleInput}
                  className='input'/>
              </div>
              <div>
                  <label htmlFor="password" className="text-label">Password</label>
                  <input type="password" id="password"
                  onChange={handleInput}
                  name="password"
                  className= 'input'/>
              </div>
              <div>
                  <label htmlFor="password" className="text-label">Confirm Password</label>
                  <input type="password" 
                  name="confirmPassword"
                  id="password"
                  onChange={handleInput}
                  className= 'input'/>
              </div>
              <div>
                  <button type="submit" className="btn-enter">Register</button>
              </div>
              <div>
                <Link to='/login'>
                  <button className="btn-enter">Login</button>
                </Link>
              </div>
          </form>
        </div>
      </div>
    )
  }



export default connect(null,{})(Register);