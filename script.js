
// Initialize the variables 

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let pre = document.getElementById('pre');
let nxt = document.getElementById('nxt');
let masterSongName = document.getElementById('masterSongName');

let progressBar = document.getElementById('progressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let gif = document.getElementById('gif');

let songs=[
    {songName:"Love Me Like You Do - Ellie Goulding",filepath:"songs/1.mp3"},
    {songName:"Shape of You - Ed Sheeran",filepath:"songs/2.mp3"},
    {songName:"Despacito ft. Daddy Yankee - Luis Fonsi",filepath:"songs/3.mp3"},
]


songItem.forEach((element,i)=>{
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Events Handling

// play/pause music
masterPlay.addEventListener('click',()=>{
    if(audioElement.play || audioElement.currentTime <= 0){
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    
    }else{
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
});


pre.addEventListener('click',(e)=>{
    if(songIndex<=0){
        songIndex=0
    }else{
        songIndex -= 1; 
    }
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML= songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

nxt.addEventListener('click',(e)=>{

    if(songIndex>=2){
        songIndex=0;
    }else{
        songIndex += 1; 
    }
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML= songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Updating progress Bar
audioElement.addEventListener('timeupdate',()=>{
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
progressBar.value = progress;
});

// Upading change in progress Bar
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})

const makeAllPlays = () =>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML= songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

