import '../assistents/css/styles.css';
import '../assistents/scss/styles.scss';
import logo from '../assistents/images/login.svg';
import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate , } from "react-router-dom";
import NotificationToast from "../Notifications/NotificationType/NotificationToast";

export default function LoginAndResgtration(){
    let history = useNavigate ();
    const [isSignUp, setSignUp] = useState(true);
    const [isUsername, setUsername] = useState('');
    const [isPassword, setPassword] = useState('');

    function LoginSend(){
        let getData = new FormData();
        getData.append('username',isUsername);
        getData.append('password',isPassword);
        const username = document.querySelector('#username_error');
        const password = document.querySelector('#password_error');
        const non_error = document.querySelector('#non_error');
        axios.post('http://127.0.0.1:8000/api/users/login/',
        getData,
        {headers:{
            'Content-Type': 'application/json',
            }
        })
        .then((data)=>{
            if(data.status ===200){
                console.log(data.data,'4sad');
                password.innerHTML='';
                non_error.innerHTML='';
                username.innerHTML='You have seccessfully logend!';
                username.style.background='rgb(20, 241, 20)';
                username.style.color = 'white';
                
                localStorage.setItem('token',data.data.token);
                localStorage.setItem('login',true);
                localStorage.setItem('id',data.data.user_id);

                setTimeout(()=>{
                    username.style.display='none';
                    history('feed/')
                  },2000)
            }
        })
        .catch((error) => {
            console.log(error)
            const arr = Object.keys(error.response.data);
            if(arr.some((item) => item ==="username")){
              username.innerHTML = error.response.data.username;
            }else{
                username.innerHTML = '';
            }
      
            if(arr.some((item) => item ==="non_field_errors")){
                non_error.innerHTML = error.response.data.non_field_errors[0] + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
              }else{
                non_error.innerHTML = ''
              }

            if(arr.some((item) => item ==="password")){
              password.style.color="red";
              password.innerHTML = error.response.data.password[0]  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
            }else{
                password.innerHTML = ''
            }

          }
          )
    }


    function RegisterSend(){
        let getData = new FormData();
        getData.append('username',isUsername);
        getData.append('password',isPassword);
        const username = document.querySelector('#usernames_error');
        const password = document.querySelector('#passwords_error');
        const non_error = document.querySelector('#non_error');
        axios.post('http://127.0.0.1:8000/api/users/register/',
        getData,
        {headers:{
            'Content-Type': 'application/json',
            }
        })
        .then((data)=>{
            if(data.status ===201){
                password.innerHTML='';
                non_error.innerHTML='';
                username.innerHTML='You have seccessfully register!';
                username.style.background='rgb(20, 241, 20)';
                username.style.color = 'white';
                localStorage.setItem('token',data.data.token);
                localStorage.setItem('login',true);
                setTimeout(()=>{
                    setSignUp(true)
                    username.style.display='none';
                  },4000)
            }
        })
        .catch((error) => {
            const arr = Object.keys(error.response.data.error);
            if(arr.some((item) => item ==="username")){
              username.innerHTML = error.response.data.error.username;
            }else{
                username.innerHTML = '';
            }
      
            if(arr.some((item) => item ==="non_field_errors")){
                non_error.innerHTML = error.response.data.non_field_errors[0] + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
              }else{
                non_error.innerHTML = ''
              }

            if(arr.some((item) => item ==="password")){
              password.style.color="red";
              password.innerHTML = error.response.data.error.password[0]  + '<i class="bi bi-x-circle-fill" style="color: red;"></i>'
            }else{
                password.innerHTML = ''
            }


            console.log(error.response.data)


          }
      
          )
    }


    return(
        <>
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={logo} alt="no_image" />
                </div>

                <div className="login__forms">
                    <div className="login__registre" id="login-in" style={{display: isSignUp ? "block" :"none" }}>
                        <h1 className="login__title">Sign In</h1>
                        <span style={{color:"red"}} id="username_error"></span>
                        <span style={{color:"red"}} id="non_error"></span>
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input onChange={(e)=> {setUsername(e.target.value);}} type="text" placeholder="Username" className="login__input" />
                        </div>
                        <span style={{color:"red"}} id="password_error"></span>
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input onChange={(e)=> {setPassword(e.target.value);}} type="password" placeholder="Password" className="login__input" />
                        </div>

                        <Link to={'/'} className="login__forgot">Forgot password?</Link>

                        <div onClick={LoginSend} className="login__button">Sign In</div>

                        <div>
                            <span className="login__account">Don't have an Account ?</span>
                            <span onClick={() => {setSignUp(false);setUsername('');setPassword('')}}  className="login__signin" id="sign-up">Sign Up</span>
                        </div>
                    </div>

                    <div className="login__create none" id="login-up" style={{display: isSignUp ? "none" :"block" }}>
                        <h1 className="login__title">Create Account</h1>
                        <span style={{color:"red"}} id="usernames_error"></span>
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input onChange={(e)=> {setUsername(e.target.value);}} type="text" placeholder="Username" className="login__input" />
                        </div>
    
                        {/* <div className="login__box">
                            <i className='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" className="login__input" />
                        </div> */}
                        <span style={{color:"red"}} id="passwords_error"></span>
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input onChange={(e)=> {setPassword(e.target.value);}} type="password" placeholder="Password" className="login__input" />
                        </div>
                        <Link to={'/password/'}  className="login__forgot">Password Ganaration</Link>
                        <div onClick={RegisterSend} className="login__button">Sign Up</div>

                        <div>
                            <span className="login__account">Already have an Account ?</span>
                            <span onClick={() => {setSignUp(true);setUsername('');setPassword('')}} className="login__signup" id="sign-in">Sign In</span>
                        </div>

                        <div className="login__social">
                            <a href="/" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                            <a href="/" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                            <a href="/" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NotificationToast />
        </>
    )
}