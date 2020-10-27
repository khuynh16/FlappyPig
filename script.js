let upperObstacle = document.getElementById('upperObstacle');
let lowerObstacle = document.getElementById('lowerObstacle');
let startButton = document.getElementById('startButton');
let piggy = document.getElementById('piggyCharacter');
let htmlPage = document.getElementById('html');

// holds jumping action (true or false; false is 0, 1 is true)
let jumping = 0;       

// runs the below code when animation repeats
// changes the lengths of the obstacles with a space big enough for piggy to fit through
upperObstacle.addEventListener('animationiteration', () => {
    let upperObsHeight = Math.floor((Math.random()*61)) + 10;
    let lowerObsHeight = 70 - upperObsHeight;

    let upperRand = Math.floor(Math.random()*upperObsHeight + 1);
    let lowerRand = Math.floor(Math.random()*lowerObsHeight + 1);

    upperObstacle.style.height = upperRand + 'vh';
    lowerObstacle.style.height = lowerRand + 'vh';
});

// calls when user click start game button
function startGame() {
    htmlPage.setAttribute('onclick', 'jump()');
    upperObstacle.classList.add('animationClass');
    lowerObstacle.classList.add('animationClass');
    startButton.style.display = 'none';

    setInterval(function(){
        // current piggy top in pixels
        let piggyTop = parseInt(window.getComputedStyle(piggy).getPropertyValue("top"));

        // top value of piggy in pixels
        let value = parseInt(piggy.style.top.substring(0, piggy.style.top.length - 2)) * 100;
        // cross-browser @media (width) and @media (height) values 
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // create the vh value of current piggy location on page
        let calculatedVh = value / vh;

        if(jumping==0){
            // stops at bottom; doesn't fall through map
            if (calculatedVh < 70)
                piggy.style.top = (piggyTop+3)+"px";
        }

        // boundary values of the objects
        let upperBoundary = upperObstacle.getBoundingClientRect();
        let lowerBoundary = lowerObstacle.getBoundingClientRect();
        let piggyBoundary = piggy.getBoundingClientRect();

        // cases where piggy hits top obstacle
        if (upperBoundary.left > 0 && (upperBoundary.left <= piggyBoundary.right) && (piggyBoundary.top + 20 < upperBoundary.bottom) && (upperBoundary.right > piggyBoundary.left)) {
            alert('Game over! Hit top obstacle!');
        }

        // cases where piggy hits bottom obstacle
        if (lowerBoundary.left > 0 && (lowerBoundary.left <= piggyBoundary.right) && (piggyBoundary.bottom > lowerBoundary.top + 16) && (lowerBoundary.right > piggyBoundary.left)) {
            alert('Game over! Hit bottom obstacle!');
        }
    },10);
}

// jump animation for piggy character
function jump(){
    jumping = 1;        // variable to mean currently jumping
    let jumpCount = 0;  // interval count; goes to 20 to enhance jumping animation

    let jumpInterval = setInterval(function(){
        let piggyTop = parseInt(window.getComputedStyle(piggy).getPropertyValue("top"));
        piggy.style.top = (piggyTop-5)+"px";
        if(jumpCount> 20 || piggyTop < 0){
            // stops interval from increasing height of jump
            clearInterval(jumpInterval);
            //need to reset and allow gravity
            jumping=0;
        }
        jumpCount++;
    },10);
}