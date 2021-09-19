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

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.data().lastLevel == 'level2') {

                document.body.style.display = "block";
                let popped = 0;
                let lives = 3;
                const life = document.getElementById("lives")
                life.innerText = lives - 1;
                document.addEventListener('mouseover', function (e) {
                    if (e.target.classList.contains('yellow')) {
                        e.target.style.backgroundColor = "#ededed";
                        popped++;
                        e.target.classList.remove("yellow");
                        checkAllPopped();
                    }
                    else if ((e.target.classList.contains('balloon'))) {
                        e.target.classList.remove("balloon")
                        lives--
                        e.target.style.backgroundColor = "#ededed";
                        gameOver();
                        life.innerText = lives - 1;
                    }

                });

                function checkAllPopped() {
                    if (popped === 7) {
                        let gallery = document.querySelector('#balloon-gallery');
                        let message = document.querySelector('#yay-no-balloons');
                        const lifeHeading = document.getElementById("lifeHeading");
                        gallery.innerHTML = '';
                        message.style.display = 'block';
                    }
                };
                const gameOver = () => {
                    if (lives == 0) {
                        let gallery = document.querySelector('#balloon-gallery');
                        let message = document.querySelector('#game-over');
                        gallery.innerHTML = '';
                        message.style.display = 'block';
                        lifeHeading.style.display = 'none';
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
