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
    else if((e.target.classList.contains('balloon'))){
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

    }

}
