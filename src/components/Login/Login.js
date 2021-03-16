
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';
import { useContext, useState } from 'react';
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

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

  const [loginUser,setLoginUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handelSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedIn = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL

        }
        setUser(signedIn);
      })

      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handelSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const userSignOut = {
          isSignIn: false,
          name: '',
          email: '',
          photo: ''

        }
        setUser(userSignOut);

      })
      .catch((error) => {

      });
  }

  const handelSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)

        });

    }
    if (!newUser) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          setLoginUser(newUserInfo)
          history.replace(from);

          console.log('sign info',res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('user name updated successfully')
      
    }).catch(function (error) {
      console.log(error)
     
    });
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

  const facebookSignIn=()=>{
    firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log('fb user-',user);
  })
  .catch((error) => {
   
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  }


  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ? <button onClick={handelSignOut}>Sign Out</button> :
          <button onClick={handelSignIn}>Sign In</button>
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
