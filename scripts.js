const audio = new Audio();
const playlist = [
    { title: 'Sayara wi Sayara', artist: 'Hindi Song', src: 'videoplayback.m4a', cover: '1.webp' },
    { title: 'Khuda Aur Muhabat', artist: 'Urdu Song', src: 'videoplayback.weba', cover: '2.webp' },
    { title: 'Sadiyon ka Safar', artist: 'Hindi Song', src: 'videoplayback (3).weba', cover: '3.webp' },
    { title: 'Dil Hy Mangta nhi', artist: 'Hindi Song', src: 'videoplayback (3).weba', cover: '4.webp' },
    { title: 'Rahti HOWWA ki Tum pass meri', artist: 'Hindi Song', src: 'videoplayback (1).weba', cover: '5.webp' },
    { title: 'Pa lara tershom Gunahgar Shom', artist: 'Pashto Song', src: 'gunahgar.weba', cover: '6.webp' }
];

let currentTrackIndex = 0;
let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrackIndex);
    document.getElementById('play-pause').addEventListener('click', playPause);
    document.getElementById('stop').addEventListener('click', stop);
    document.getElementById('next-track').addEventListener('click', nextTrack);
    document.getElementById('prev-track').addEventListener('click', prevTrack);
    document.getElementById('progress-bar').addEventListener('input', seek);
    document.getElementById('volume').addEventListener('input', adjustVolume);

    populatePlaylist();
});

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-artist').textContent = track.artist;
    document.getElementById('album-cover').src = track.cover;
    updatePlaylist();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('play-pause').innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        audio.play();
        document.getElementById('play-pause').innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    isPlaying = !isPlaying;
}

function stop() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('play-pause').innerHTML = '<i class="bi bi-play-fill"></i>';
    isPlaying = false;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function seek() {
    const progress = document.getElementById('progress-bar');
    audio.currentTime = (progress.value / 100) * audio.duration;
}

function adjustVolume() {
    audio.volume = document.getElementById('volume').value;
}

function updatePlaylist() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentTrackIndex);
    });
}

function populatePlaylist() {
    const playlistElement = document.querySelector('.playlist');
    playlist.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'playlist-item');
        listItem.textContent = `${track.title} - ${track.artist}`;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            if (isPlaying) audio.play();
        });
        playlistElement.appendChild(listItem);
    });
}

audio.addEventListener('timeupdate', () => {
    const progress = document.getElementById('progress-bar');
    if (!isNaN(audio.duration)) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});
