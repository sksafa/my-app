import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handelGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedIn = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success:true

            }
            return signedIn;
        })

        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

export const handelFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            user.success = true
            var accessToken = credential.accessToken;
            return user;
        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

export const handelSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const userSignOut = {
                isSignIn: false,
                name: '',
                email: '',
                photo: ''

            }
            return userSignOut;

        })
        .catch((error) => {

        });
}

export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name)
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = { };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;

        });
}

export const signInWithEmailAndPassword = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = { };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
        });

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
