import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onSetTimeInLocalStorage, 1000));
setVideoTime(localStorage.getItem(STORAGE_KEY));

function onSetTimeInLocalStorage(data) {
  const videoCurrentTime = data.seconds;

  localStorage.setItem(STORAGE_KEY, videoCurrentTime);
}

function setVideoTime(seconds) {
  player.setCurrentTime(seconds);
}
