let gameSeq=[];
let userSeq=[];
let high=0;

let btns=["yellow","red","blue","green"];

let started = false;
let level=0;
let h3 = document.querySelector('h3');

document.addEventListener('keypress',function(){
    if(started == false){
        console.log('game start');
        started = true;
        
        levelUp();
    }
})

function btnFlash(btn){        // making button to flash
    btn.classList.add('flash')  
    setTimeout(function(){      
        btn.classList.remove('flash')
    },300)
}

function levelUp() {
    userSeq=[];
    level++;
    h3.innerText = `Level ${level}`
    
    //to get random box/color

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);         // tracking color that game gave
    console.log(gameSeq)
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);

}


function check(idx){
    if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp , 1000)
        }
    }else{
        h3.innerHTML=`Wrong! Game over your score ${level} Press any key to start again`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white'
        },250);
        
        highScore(level);
        reset();
        
    }
    
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let pressed = btn.getAttribute('id'); 
    userSeq.push(pressed)
    console.log(userSeq)
    check(userSeq.length-1);
    
}

let allBtns=document.querySelectorAll('.btn')

for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    level=0;
}

function highScore(lvl){

    high = Math.max(lvl,high);
    let para = document.querySelector('p');
    para.innerText = `${high}`
    
}