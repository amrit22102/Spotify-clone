console.log("Welcome to spotify"); 


// Initialise variables
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSong = document.getElementById('masterSong');


let songs = [
    {songName: "Peaches", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Shape Of You", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Let Me Love You", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Attention", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Blinding Lights", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Stay", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Starboy", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Cupid", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
]

songItems.forEach((element, i) => {
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});


//Handle Play/Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('Timeupdate');
    //Update Seekbar
    let progress = parseInt(audioElement.currentTime/ audioElement.duration *100);
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();

        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSong.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

 })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSong.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=7;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSong.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})


