const audio = document.getElementById("music");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekSlider = document.getElementById("seekSlider");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const icon = document.getElementById("buttonicon");
const seekfwd = document.getElementById("seekForward");
const seekBck = document.getElementById("seekBackward");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
let currplaying = 0;
const p = async () => {
  try {
    const response = await fetch("https://music-stream-a261.onrender.com/search1");
    const data = await response.json();
    globalData = data;
    console.log(data);
  } catch (e) {
    console.log("Error: " + e);
  }
};

p();


function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  } else {
    audio.pause();
    icon.setAttribute("src", "images/play.png");
  }
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  seekSlider.value = progress;
  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60);
  currentTime.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function seek(e) {
  const seekTime = (audio.duration / 100) * e.target.value;
  audio.currentTime = seekTime;
}

function seekforward() {
  audio.currentTime += 10;
}

function seekbackward() {
  audio.currentTime -= 10;
}

function nextPlay() {
  currplaying++;
  if (currplaying >= globalData.length) {
    currplaying = 0; 
  }
  const audio = document.getElementById("music");
  audio.src = globalData[currplaying].url;
  const icon = document.getElementById("buttonicon");
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  }
  const imgElement = document.querySelector(".imgBx img");
  const nameElement = document.querySelector(".details .name");
  const authorElement = document.querySelector(".details .author");
  imgElement.src = globalData[currplaying].img;
  nameElement.textContent = globalData[currplaying].name;
  authorElement.textContent = `${globalData[currplaying].artist} - ${globalData[currplaying].year}`;
}

function previousPlay() {
  currplaying--;
  if (currplaying < 0) {
    currplaying = globalData.length - 1; 
  }
  const audio = document.getElementById("music");
  audio.src = globalData[currplaying].url;
  const icon = document.getElementById("buttonicon");
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  }
  const imgElement = document.querySelector(".imgBx img");
  const nameElement = document.querySelector(".details .name");
  const authorElement = document.querySelector(".details .author");
  imgElement.src = globalData[currplaying].img;
  nameElement.textContent = globalData[currplaying].name;
  authorElement.textContent = `${globalData[currplaying].artist} - ${globalData[currplaying].year}`;
}


audio.addEventListener("loadedmetadata", () => {
  const mins = Math.floor(audio.duration / 60);
  const secs = Math.floor(audio.duration % 60);
  duration.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
});

const items = document.querySelectorAll(".result-item");
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  item.addEventListener("click", () => {
    item.classList.add("click-animation");
    setTimeout(() => {
      item.classList.remove("click-animation");
    }, 300);

    const imgElement = document.querySelector(".imgBx img");
    const nameElement = document.querySelector(".details .name");
    const authorElement = document.querySelector(".details .author");
    const audio = document.getElementById("music");
    imgElement.src = globalData[i].img;
    nameElement.textContent = globalData[i].name;
    authorElement.textContent = `${globalData[i].artist} - ${globalData[i].year}`;
    const url = globalData[i].url;
    audio.src = globalData[i].url;
    currplaying++;
    if (audio.paused) {
      audio.play();
      icon.setAttribute("src", "images/pause.png");
    }
  });
}

playPauseBtn.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgress);
seekSlider.addEventListener("input", seek);
seekfwd.addEventListener("click", seekforward);
seekBck.addEventListener("click", seekbackward);
next.addEventListener("click",nextPlay);
previous.addEventListener("click",previousPlay);
