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

            if (doc.data().lastLevel == 'level1') {

                document.body.style.display = "block";
                document.getElementById("greetUser").innerHTML = `Welcome ${user.email}`;
                let colArray = ["blue", "green", "red", "black", "pink"];
                let popped = 0;
                let lives = 3;
                let arr;
                const life = document.getElementById("lives")
                life.innerText = lives - 1;
                for (let i = 0; i < 50; i++) {
                    if (i < 5) {
                        arr = i;
                    }
                    else {
                        arr = Math.floor(Math.random() * 5);
                    }
                    const div = document.createElement("div");
                    div.setAttribute("class", "balloon " + colArray[arr]);
                    document.getElementById("balloon-gallery").appendChild(div);
                }
                let target;

                target = document.getElementsByClassName(colArray[arr]).length;
                if (!colArray[arr]) {
                    document.getElementById("gamemsg").innerText = "You win";
                }
                else {
                    document.getElementById("popmsg").innerText = `Pop the ${colArray[arr]} Ones`;
                }
                document.addEventListener('mouseover', function (e) {
                    if (e.target.classList.contains(colArray[arr])) {
                        e.target.style.visibility = 'hidden';
                        popped++;
                        checkAllPopped();
                    }
                    else if ((e.target.classList.contains('balloon'))) {
                        e.target.style.visibility = 'hidden';
                        lives--
                        gameOver();
                        life.innerText = lives - 1;
                    }

                });
                
                function checkAllPopped() {
                    if (popped === target) {
                        document.getElementById("yay-no-balloons").style.display = "block";
                        document.getElementById("balloon-gallery").style.display = "none";
                        // Add a new document in collection "cities"
                        db.collection("users").doc(user.uid).update({
                            lastLevel: "level2"
                        })
                            .then(() => {
                                location.href = "level2.html"
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                        setTimeout(() => {

                        }, 1000);
                    }
                };
                const gameOver = () => {
                    if (lives == 0) {
                        document.getElementById("game-over").style.display = "block";
                        document.getElementById("balloon-gallery").style.display = "none";
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
                    }

                }
            }
            else {
                location.href = `${doc.data().lastLevel}.html`
            }
           
        })
    }
    
});

function logout() {
    firebase.auth().signOut().then(() => {
     location.href = "index.html"
    }).catch((error) => {
       alert(error)
    });
}
