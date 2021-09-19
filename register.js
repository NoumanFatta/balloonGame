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
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                location.href = `${(doc.data().lastLevel)}.html`;
            }
        }).catch((error) => {
            alert(error);
        });
    }
    else {
        document.body.style.display = "block";
    }
});


const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Sign Up");
            db.collection("users").doc(userCredential.user.uid).set({
                email: email,
                lastLogin: new Date(),
                lastLevel: "level1"
            })
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
            // Add a new document in collection "cities"
            db.collection("users").doc(userCredential.user.uid).update({
                email: email,
                lastLogin: new Date()
            })
                .then(() => {
                    db.collection("users").doc(userCredential.user.uid).get().then((doc) => {
                        if (doc.exists) {
                            location.href = `${(doc.data().lastLevel)}.html`;
                        }
                    }).catch((error) => {
                        alert(error);
                    });
                })
                .catch((error) => {
                    alert(error);
                });
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}
