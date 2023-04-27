// import {StartNewGame} from "./game.js";
// switch between divs
function showScreen(screenId) {
    const screens = document.getElementsByClassName('screen');
    for (const screen of screens) {
        screen.classList.add('hidden');
    }
    if(loggedInUser === null && screenId === "game"){
        // check if user is logged in
        alert("You Are Not Logged-in");
        return;

    }else{
        if(screenId === "game"){
            if(gameRuning == false){
                StartNewGame(p,enemies);
                gameRuning = true
            }

            // background_sound.play();
        }
        document.getElementById(screenId).classList.remove('hidden');
        const errorMessage = document.getElementById('errorMessages').style.display = 'none';
    }


}

document.getElementById('homeButton').addEventListener('click', () => showScreen('home'));
document.getElementById('gameButton').addEventListener('click', () => showScreen('game'));
document.getElementById('loginButton').addEventListener('click', () => showScreen('login'));
document.getElementById('loginButtonw').addEventListener('click', () => showScreen('login'));
document.getElementById('signUpButton').addEventListener('click', () => showScreen('signUp'));
document.getElementById('signUpButtonw').addEventListener('click', () => showScreen('signUp'));

let gameRuning = false
var loggedInUser = null;
// sign up page
// save the users to an array
const myUsers = [];
myUsers.push({
        username: 'p',
        password: 'testuser',
        firstName: 'Mr p',
        lastName: 'pp',
        email: 'p@gamil.com',
        birthDay: "2023",
        isLoggedIn: false,
    })
//get the value of each input and assign it to a field inside the myUsers array
function registerUser() {
    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        birthDay: document.getElementById('birthDay').value,
        isLoggedIn: false,

    };
    myUsers.push(user);
    console.log('Registered user:', user);
    console.log('All users:',myUsers);
}

//validate the input received from the register form
function validateRegistrationForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordVerify = document.getElementById('passwordVerify').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const errorMessages = [];

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const nameRegex = /^[A-Za-z]+$/;

    if (!passwordRegex.test(password)) {
        errorMessages.push('Password must contain at least 8 characters, including letters and numbers.');
    }

    if (password !== passwordVerify) {
        errorMessages.push('Password and password verification must match.');
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        errorMessages.push('First and last names must not contain numbers.');
    }

    if (errorMessages.length > 0) {
        document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
        document.getElementById('errorMessages').style.display = 'block';
        return false;
    }

    return true;
}

function successRegister(){
    alert("you have successfuly registered to our game!");
}
function successLogin(){

    alert("you have successfuly logged-in to your account!");
}
// the logic for the submit button when pressed
document.getElementById('registrationForm').addEventListener('submit', (event) => {
    // use this so that i can use my validate function
    event.preventDefault();
    if (validateRegistrationForm()) {
        registerUser();
        showScreen('home');
        success();
        // event.target.submit();
    }
});
// configuration form
let fireKey = ' ';
const keySelect = document.getElementById('keySelect');
        keySelect.addEventListener('change', (event) => {
            fireKey = event.target.value;
            if (fireKey == ""){
                fireKey = ' ';
                console.log('Selected Key:', "sppppacccee");

            }
            console.log('Selected Key:', fireKey);
        });

let gameDuration = 2*60; 
const timeSelect = document.getElementById('timeSelect');
        timeSelect.addEventListener('change', (event) => {

            gameDuration = event.target.value *60;
            console.log('gameDuration:', gameDuration);
        });


document.getElementById('configurationButton').addEventListener('click', () => showScreen('game'));

//validate the input received from the login form
function validateLoginForm() {
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const errorMessages = [];


    // check if user is already registered in the myusers array
    const user = myUsers.find(user => user.username === username);
    if (!user){
        errorMessages.push('Wrong Name');
    }
    if (user && user.password === password) {
        // Successful login
        user.isLoggedIn = true;
        loggedInUser = user.username;
        return true;
    } else {
        // Show an error message
        errorMessages.push('Wrong Password');
    }

    if (errorMessages.length > 0) {
        document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
        document.getElementById('errorMessages').style.display = 'block';
        return false;
    }

    return false;
}


// logic for the login form
document.getElementById('loginForm').addEventListener('submit', (event) => {
    // use this so that i can use my validate function
    event.preventDefault();
    if (validateLoginForm()) {
        showScreen('configuration');
        successLogin();
        const errorMessage = document.getElementById('errorMessages').style.display = 'none';
    }
});


// add the modal about

    const aboutModal = document.getElementById('aboutModal');
    const openModalBtn = document.getElementById('aboutButton').addEventListener('click', () => {aboutModal.style.display = 'block'});
    const closeModalBtn = document.querySelector('.close').addEventListener('click', () => {aboutModal.style.display = 'none'});

    window.addEventListener('click', function (event) {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            aboutModal.style.display = 'none';
        }
    });















class GoodSpaceship{
    constructor(){
        this.position = {
            x: 300,
            y: canvas.height - 70 
        }
        this.velocity ={
            x:0,
            y:0
        }
        // this.Image =
        this.speed = 4;
        this.width =100
        this.height = 50
        const projectil_list = []
        this.projectiles = projectil_list
        this.score=0
        this.life=3
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      
        if (this.position.x < canvas.width * 0.3) {
          this.position.x = canvas.width * 0.3;
        } else if (this.position.x > canvas.width * 0.7 - this.width) {
          this.position.x = canvas.width * 0.7 - this.width;
        }
      
        if (this.position.y < 0) {
          this.position.y = 0;
        } else if (this.position.y > canvas.height - this.height) {
          this.position.y = canvas.height - this.height;
        }
      }
    draw(){
        c.drawImage(goodSpa, this.position.x, this.position.y, this.width, this.height);
    }
    fire(){
        const projectile = new Projectile(this.position.x + this.width / 2, this.position.y);
        this.projectiles.push(projectile);
    }
    addPoints(points_to_add){
        this.score+=points_to_add
        // document.getElementById("score").textContent = this.score;
        // console.log("Player score: " + this.score);

    }
    Death(){
        this.life--
        this.position.x= 300,
        this.position.y= canvas.height - 70
        // if(this.life==0){
        //     endGame()
        // }
    }
}

class EnemySpaceship{
    constructor(x2,y2,z3, id){
        this.position = {
            x: x2,
            y: y2
        }
        this.velocity ={
            x:0,
            y:0
        }
        
        this.speed = z3;
        this.width =40
        this.height = 40
        const projectil_Egg_list = []
        this.projectiles_egg = projectil_Egg_list
        this.hitScreenEdge = false; 
        this.id = id;
    }

    draw(){
        c.drawImage(enemy_image, this.position.x, this.position.y, this.width, this.height);
    }
    fire(){
        const projectile_egg = new ProjectileEnemySpaceship(this.position.x + this.width / 2, this.position.y,-4);
        this.projectiles_egg.push(projectile_egg);
    }
    move(direction) {
        if(this.hitScreenEdge==false){
            this.position.x += direction * this.speed;
            if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
                this.hitScreenEdge = true; }
        }
        else{
            this.position.x += direction * this.speed;
            if (this.position.x - this.width <= canvas.width || this.position.x >= 0) {
                this.hitScreenEdge = false; }
        
        // this.position.x += direction * this.speed;
      }
        }
}

class Projectile {
    constructor(x1,y1) {
        this.position ={
            x:x1,
            y:y1
        } 
        this.velocity ={
            x:0,
            y:-8
            
        }
        this.radius = 5

    }

    update() {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle = 'red';
        c.fill ()
        c.closePath()
    }
}

class ProjectileEnemySpaceship {
    constructor(x1,y1,z1) {
        this.position ={
            x:x1,
            y:y1
        } 
        this.velocity ={
            x:0,
            y:z1
            
        }
        this.radius = 5
        this.width =25;
        this.height=25
    }

    update() {
        this.draw()
        this.position.x -= this.velocity.x;
        this.position.y -= this.velocity.y;
    }
    draw() {
        c.drawImage(egg_image, this.position.x, this.position.y, this.width, this.height);
    }
}




let direction = 1;
function moveEnemies() {
    let hitScreenEdge = false; 
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move(direction);
      if (enemies[i].hitScreenEdge) {
        hitScreenEdge = true;
      }
    }
    if (hitScreenEdge) { 
      direction *= -1;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].hitScreenEdge = false;
      }
    }
  }


function enemyAttacks(){
    setTimeout(() => {
        if(enemies.length !=0){
            const randomIndex = Math.floor(Math.random() * enemies.length);
            setTimeout(enemyAttacks, 1000)
            enemies[randomIndex].fire();  
        }
    }, 2000);
}

function enemiesDead(){
    if(enemies.length ==0){
        endGame()
    }
}

function HitTheEnemy(player,list_of_enemys){
    player.projectiles.forEach((projectile,j)=>{
        list_of_enemys.forEach((enemy,i)=>{
            if(projectile.position.y- projectile.radius<= enemy.position.y+enemy.height &&
                projectile.position.y + projectile.radius>=enemy.position.y &&
                projectile.position.x+ projectile.radius>=enemy.position.x &&
                projectile.position.x- projectile.radius<=enemy.position.x+enemy.width
                 ){
                    victoryPoint.play();
                    setTimeout(()=>{
                        p.addPoints(enemy.id)
                        list_of_enemys.splice(i,1)
                        player.projectiles.splice(j,1)
                },0)
            }
            })
        })
    }

    
function HitPlayer(player,list_of_enemys){
    list_of_enemys.forEach((enemy)=>{
        enemy.projectiles_egg.forEach((egg,i)=>{
            if (
                egg.position.y + egg.height >= player.position.y &&
                egg.position.y <= player.position.y + player.height &&
                egg.position.x + egg.width >= player.position.x && 
                egg.position.x <= player.position.x + player.width
              ) {
                    loseMusic.play()
                    enemy.projectiles_egg.splice(i,1)
                    player.Death()
                    if(player.life==0){
                        endGame()
                        }
                 }
        })
    })
}

function speedUP(player, list_of_enemys) {
    let counter = 0;
    const interval1 = setInterval(() => {
      if (counter === 4) {
        clearInterval(interval1);
      } else {
        player.speed += 2;
        list_of_enemys.forEach((enemy) => {
          enemy.speed += 2;
          enemy.projectiles_egg.forEach((projectile) => {
            projectile.velocity -= 2;
          });
        });

        counter++;
      }
    }, 5000);
  }



document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: 
            p.velocity.x = -p.speed;
            break;
        case 38: 
            p.velocity.y = -p.speed;
            break;
        case 39: 
            p.velocity.x = p.speed;
            break;
        case 40: 
            p.velocity.y = p.speed;
            break;
    }
});
////////////////////////////////////////////////
document.addEventListener('keydown', event => {
    if (event.code  === fireKey || event.key  === fireKey) {
        p.fire();
    }
});
//////////////////////////////////////////////////

document.addEventListener('keyup', ({key}) =>{
    switch(event.keyCode) {
        case 37: 
        case 39: 
            p.velocity.x = 0;
            break;
        case 38: 
        case 40: 
            p.velocity.y = 0;
            break;
    }

});


var animationId = 0
function animate() {
    animationId = requestAnimationFrame(animate);
    moveEnemies();
    HitTheEnemy(p,enemies)
    HitPlayer(p,enemies)
    // enemyAttacks()
    enemiesDead()


    c.drawImage(background_image, 0, 0, canvas.width, canvas.height);

    p.update()
    p.draw()
    

    p.projectiles.forEach(projectile=>{
        projectile.update()
    })

    enemies.forEach(enemy => {
        enemy.draw();
        enemy.projectiles_egg.forEach(projectile=>{
            projectile.update()
            projectile.draw()
        })
      });

    drawScoreAndLives()
}



function drawScoreAndLives() {
    c.font = "40px Calibri Light"
    c.fillStyle = "white"
    c.fillText(`Score: ${p.score}`, 10, 40)
    c.fillText(`Lives: ${p.life}`, 10, 100)
}

// c.fillStyle = 'black';
// c.fillRect(0, 0, canvas.width, canvas.height);
const background_image = new Image();
background_image.src = 'img/background.png';
background_image.addEventListener('load', () => {
    c.drawImage(background_image, 0, 0, canvas.width, canvas.height);
});

function endGame(){
    if(p.life==0){
        cancelAnimationFrame(animationId);
        const game_over = new Image();
        game_over.src = 'img/gameOver.jpg';
        game_over.addEventListener('load', () => {
        c.drawImage(game_over, 0, 0, canvas.width, canvas.height);
        c.fillText("you lost!", 300, 200)
        c.fillText(`Score: ${p.score}`, 300, 140)
        });
    }
    else if(enemies.length == 0){
        cancelAnimationFrame(animationId);
        const win_game = new Image();
        win_game.src = 'img/win.jpg';
        win_game.addEventListener('load', () => {
        c.drawImage(win_game, 0, 0, canvas.width, canvas.height);
        c.fillText("Champion!", 300, 200)
        c.fillText(`Score: ${p.score}`, 300, 140)
        });
    }
    /////////////////////////////////////////////////////////////
    else {
        cancelAnimationFrame(animationId);
        if(p.score<100){
        const game_over = new Image();
        game_over.src = 'img/gameOver.jpg';
        game_over.addEventListener('load', () => {
        c.drawImage(game_over, 0, 0, canvas.width, canvas.height);
        c.fillText("You can do better!", 300, 200)
        c.fillText(`Score: ${p.score}`, 300, 140)
        })
    }
        else{
            const win_game = new Image();
            win_game.src = 'img/win.jpg';
            win_game.addEventListener('load', () => {
            c.drawImage(win_game, 0, 0, canvas.width, canvas.height);
            c.fillText("Winner!", 300, 200)
            c.fillText(`Score: ${p.score}`, 300, 140)
        });
        }
    }
    document.getElementById('playbutton').style.display = 'block';
    scoreList.push(p.score);
    scoreList.sort((a, b) => b - a);
    console.log(scoreList);
    displayScores(scoreList);
    document.getElementById('scoreList').style.display = 'block';
    gameEnded = true
    background_sound.currentTime = 0
    background_sound.pause();

    /////////////////////////////////////////////////////////////
    

    setTimeout(() => {
    // location.reload()
    p.score=0
    // StartNewGame(p,enemies)
      }, 2000);
    
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1200
canvas.height = 576
var p = new GoodSpaceship()
let enemies = [];

function StartNewGame(player,enemies_list){

    ////////////////////////////////////////////////////////////
    gameEnded = false
    document.getElementById('playbutton').style.display = 'none';
    document.getElementById('scoreList').style.display = 'none';
    startTime = Date.now();
    updateTimer();
    background_sound.play();

    /////////////////////////////////////////////////////////////

    
    player.life=3
    player.score=0
    player.speed = 4;
    enemies_list.length = 0;
    player.projectiles.length = 0
    // enemies_list.splice(0,enemies_list.length)
    // const z = 2;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
        let x = startX + j * spaceXBetweenEnemies;
        let y = 50 + i * spaceYBetweenEnemies;
        let enemy = new EnemySpaceship(x, y, 2,(20-i*5));
        enemy.projectiles_egg.length= 0
        enemies_list.push(enemy);
        console.log("+")
        }
    }
        enemyAttacks()
        speedUP(p,enemies)
        animate();
}


const startX = canvas.width * 0.3;
const endX = canvas.width * 0.7 - 100;
const totalSpaceX = endX - startX;
const spaceXBetweenEnemies = totalSpaceX / (5 - 1);
const spaceYBetweenEnemies = 50;



const goodSpa = new Image();
goodSpa.src = 'img/goodSpa.png';
goodSpa.addEventListener('load', () => {
});

const enemy_image = new Image();
enemy_image.src = 'img/enemy.png';
enemy_image.addEventListener('load', () => {
});

const egg_image = new Image();
egg_image.src = 'img/egg.png';
egg_image.addEventListener('load', () => {
});

const game_over = new Image();

let background_sound = new Audio("music/backgroundMusic.mp3")
background_sound.volume =0.5

let loseMusic = new Audio("music/lose.wav")
loseMusic.volume = 0.3

let victoryPoint = new Audio("music/victoryPoint.wav")
victoryPoint.volume = 0.3

// document.getElementById("playButton").addEventListener("click", function() {
//     background_sound.play();
// })

// StartNewGame(p,enemies)


///////////////////////////////////////////////////////////////////////////////
let scoreList = [];
function displayScores(scoreList) {
    const scoreListDiv = document.getElementById('scoreList');
    let content = '<ul>';
    scoreList.forEach((score, index) => {
      content += `<li>Score ${index + 1}: ${score}</li>`;
    });
    content += '</ul>';
    scoreListDiv.innerHTML = content;
  }
  

document.getElementById('playbutton').addEventListener('click', () => StartNewGame(p, enemies));
let gameEnded = false;
function updateTimer() {
    if (!gameEnded) {
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    const timeLeft = gameDuration - timeElapsed;
    // console.log("timeElapsed", timeElapsed);
    // console.log("timeLeft", timeLeft);

  
    if (timeElapsed%60 === 0) {
        background_sound.currentTime = 0
        background_sound.play();
        // console.log("enter times");
      }
    if (timeLeft <= 0) {
      endGame();
      return;
    }
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    setTimeout(updateTimer, 1000);
  }
/////////////////////////////////////////////////////////////////////////////




