
import { useContext, useState } from 'react';
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";
import { handelGoogleSignIn, handelSignOut, initializeLoginFramework,handelFacebookSignIn, createUserWithEmailAndPassword,signInWithEmailAndPassword } from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: ''
  })
  initializeLoginFramework();
  const [loginUser,setLoginUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = ()=>{
      handelGoogleSignIn()
      .then(res=>{
        setUser(res);
        setLoginUser(res);
        history.replace(from);
      })
  }

  const facebookSignIn = () =>{
    handelFacebookSignIn()
    .then(res =>{
        setUser(res);
        setLoginUser(res);
        history.replace(from);
    } )
  }

  const SignOut = () =>{
    handelSignOut()
    .then(res =>{
        setUser(res);
        setLoginUser(res);
    } )
  }



  const handelSubmit = (e) => {
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name,user.email, user.password)
        .then(res =>{
            setUser(res);
            setLoginUser(res);
            history.replace(from);
        } )


    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
            setUser(res);
            setLoginUser(res);
            history.replace(from);
        } )

     

    }
    e.preventDefault();
  }

 


  const handelBlur = (e) => {
    let fieldValid;
    if (e.target.name === 'name') {
      fieldValid = e.target.value
    }
    if (e.target.name === 'email') {
      fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const validPasswordLength = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      fieldValid = validPasswordLength && passwordHasNumber;
    }
    if (fieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);

    }

  }




  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ? <button onClick={SignOut}>Sign Out</button> :
          <button onClick={GoogleSignIn}>Sign In</button>
      }
      {
        <button onClick ={facebookSignIn}>Logging With Facebook</button>
      }

      {
        user.isSignIn && <div>
          <p>welcome {user.name}</p>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt="ff" />
        </div>
      }
      <h2>Our own Authentication</h2>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handelSubmit}>
        {newUser && <input type="text" name="name" onBlur={handelBlur} placeholder="Enter Your name" required />} <br />
        <input type="text" name="email" onBlur={handelBlur} placeholder="Enter Your Email" required /><br />
        <input type="password" name="password" onBlur={handelBlur} placeholder="Enter Your password" required /><br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged In'} Successfully</p>
      }


    </div>
  );
}

export default Login;
