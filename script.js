let upperObstacle = document.getElementById('upperObstacle');
let lowerObstacle = document.getElementById('lowerObstacle');
let startButton = document.getElementById('startButton');
let piggy = document.getElementById('piggyCharacter');
let htmlPage = document.getElementById('html');
var jumping = 0;                                            // holds jumping action (true or false)
var counter = 0;

upperObstacle.addEventListener('animationiteration', () => {
    let upperObsHeight = Math.floor((Math.random()*61)) + 10;
    let lowerObsHeight = 70 - upperObsHeight;
    // console.log(upperObsHeight);
    // console.log(lowerObsHeight);
    let upperRand = Math.floor(Math.random()*upperObsHeight + 1);
    let lowerRand = Math.floor(Math.random()*lowerObsHeight + 1);
    upperObstacle.style.height = upperRand + 'vh';
    lowerObstacle.style.height = lowerRand + 'vh';
    counter++;
});

function startGame() {
    htmlPage.setAttribute('onclick', 'jump()');
    upperObstacle.classList.add('animationClass');
    lowerObstacle.classList.add('animationClass');
    startButton.style.display = 'none';

    setInterval(function(){
        var piggyTop = parseInt(window.getComputedStyle(piggy).getPropertyValue("top"));
        // console.log('property value: ' + piggy.style.top);

        // get pixel numberic value of piggy style top
        let value = parseInt(piggy.style.top.substring(0, piggy.style.top.length - 2)) * 100;
        // cross-browser @media (width) and @media (height) values 
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        // create the vh value
        let calculatedVh = value / vh;

        if(jumping==0){
            // stops at bottom; doesn't fall through map
            if (calculatedVh < 70)
                piggy.style.top = (piggyTop+3)+"px";
        }

        var upperBoundary = upperObstacle.getBoundingClientRect();
        var lowerBoundary = lowerObstacle.getBoundingClientRect();
        var piggyBoundary = piggy.getBoundingClientRect();

        if (upperBoundary.left > 0 && (upperBoundary.left <= piggyBoundary.right) && (piggyBoundary.top + 20 < upperBoundary.bottom) && (upperBoundary.right > piggyBoundary.left)) {
            alert('Game over! Hit top obstacle!');
        }

        if (lowerBoundary.left > 0 && (lowerBoundary.left <= piggyBoundary.right) && (piggyBoundary.bottom > lowerBoundary.top + 16) && (lowerBoundary.right > piggyBoundary.left)) {
            alert('Game over! Hit bottom obstacle!');
        }
    },10);
}

function jump(){
    // variable to mean currently jumping
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var piggyTop = parseInt(window.getComputedStyle(piggy).getPropertyValue("top"));
        // console.log('piggyHeight: ' + piggyTop);
        // if((characterTop>6)&&(jumpCount<15)){
            piggy.style.top = (piggyTop-5)+"px";
        // }
        // console.log(jumpCount);
        if(jumpCount> 20 || piggyTop < 0){
            // stops interval from increasing height of jump
            clearInterval(jumpInterval);
            //need to reset and allow gravity
            jumping=0;
            // jumpCount=0;
        }
        jumpCount++;
    },10);
}