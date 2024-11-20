const tracks = [
  {
    name: "Let me down slowly",
    artist: "Alec Benjamin",
    cover: "letmedownslowly.jpg",
    source: "letmedownslowly.mp3",
  },
  {
    name: "Let me love you",
    artist: "DJ Snake/Justin Beiber",
    cover: "letmeloveyou.jpg",
    source: "letmeloveyou.mp3",
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    cover: "perfect.jpg",
    source: "Perfect.mp3",
  },
];

const audioImg = document.querySelector(".img");
const audioTitle = document.querySelector(".audio-title");
const audioSinger = document.querySelector(".audio-singer");
const progressBar = document.querySelector(".progress-bar");
const progressHead = document.querySelector(".progress-head");
const progress = document.querySelector(".progress");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const playBtn = document.querySelector(".play");
const skipForwardBtn = document.querySelector(".skip-forward");
const skipBackBtn = document.querySelector(".skip-back");

let currentTrackIndex = 0;

const audio = new Audio();
document.addEventListener("DOMContentLoaded", initializePlayer);

function initializePlayer() {
  loadTrack(currentTrackIndex);
  setupEventListeners();
}

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.source;
  audioImg.src = track.cover;
  audioTitle.textContent = track.name;
  audioSinger.textContent = track.artist;
  gsap.from(audioImg, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
  });
}

function setupEventListeners() {
  playBtn.addEventListener("click", togglePlay);
  skipForwardBtn.addEventListener("click", nextTrack);
  skipBackBtn.addEventListener("click", PrevTrack);
  progress.addEventListener("click", seek);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("ended", nextTrack);
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.querySelector("i").classList.remove("fa-play");
    playBtn.querySelector("i").classList.add("fa-pause");
    gsap.to(audioImg, {
      rotation: 360,
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  } else {
    audio.pause();
    playBtn.querySelector("i").classList.add("fa-play");
    playBtn.querySelector("i").classList.remove("fa-pause");
    gsap.killTweensOf(audioImg);
  }
}

function nextTrack() {
  currentTrackIndex =
    currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;
  loadTrack(currentTrackIndex);
  togglePlay();
}

function PrevTrack() {
  currentTrackIndex =
    currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
  loadTrack(currentTrackIndex);
  togglePlay();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
  progressHead.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function seek(e) {
  const rect = progress.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
}
