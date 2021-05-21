//Firebase
import firebase from '../firebase';

function LogOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful
    }).catch((error) => {
        console.log(error);
    });
}

export default LogOut;