const firebaseConfig = {
    apiKey: "AIzaSyBo343aO7ahpDKJr2INtYvgaSG3hYOaL4s",
    authDomain: "balloongame-97b91.firebaseapp.com",
    projectId: "balloongame-97b91",
    storageBucket: "balloongame-97b91.appspot.com",
    messagingSenderId: "424269562490",
    appId: "1:424269562490:web:2f7038c662df07692271c3",
    measurementId: "G-2XQK1BVJS6"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var database = firebase.database();



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      location.href = "level3.html"
    }
  });


const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Sign Up")
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);
        });
};

const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            location.href = "level3.html"
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}
