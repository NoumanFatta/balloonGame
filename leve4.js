let colArray = ["blue", "green", "red", "black", "pink"];
let popped = 0;
let lives = 3;
let arr;
let gameCount = 0;
for (let i = 0; i < 10; i++) {
    if (i < 5) {
        arr = i;
    }
    else {
        arr = Math.floor(Math.random() * 5);
    }
    const div = document.createElement("div");
    div.setAttribute("class", "balloon " + colArray[arr]);
    document.getElementById("container").appendChild(div);
}
let target;
showmsg(0)
function showmsg() {
    target = document.getElementsByClassName(colArray[gameCount]).length;
    if (!colArray[gameCount]) {
        document.getElementById("gamemsg").innerText = "You win";
    }
    else{

        document.getElementById("popmsg").innerText = `Pop the ${colArray[gameCount]} Ones`;
    }
}

document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains(colArray[gameCount])) {
        console.log(gameCount);
        e.target.style.visibility = 'hidden';
        popped++;
        checkAllPopped();
    }
    else if ((e.target.classList.contains('balloon'))) {
        gameOver();
    }

});



function checkAllPopped() {
    if (popped === target) {
        gameCount++
        popped = 0;
        showmsg(gameCount)
    }
};
const gameOver = () => {
        document.getElementById("gamemsg").innerText = "game over";
        document.getElementById("container").style.display = "none";
}


