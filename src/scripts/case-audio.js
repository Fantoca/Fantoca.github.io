import { t } from './i18n.js';
import Model from './model.js';

const els = {
  toggle: document.getElementById('sound-toggle'),
  panelToggle: document.getElementById('music-panel-toggle'),
  panel: document.getElementById('music-player'),
  close: document.getElementById('music-close'),
  audio: document.getElementById('music-audio'),
  title: document.getElementById('music-title'),
  list: document.getElementById('music-list'),
  status: document.getElementById('music-status'),
  volume: document.getElementById('music-volume'),
  volumeValue: document.getElementById('music-volume-value'),
  clock: document.getElementById('clock'),
};

let muted = localStorage.getItem('fantoca-sound') === 'off';
const savedVolumeRaw = localStorage.getItem('fantoca-music-volume');
let volume = savedVolumeRaw === null ? 20 : Math.min(100, Math.max(0, Number(savedVolumeRaw) || 0));
let currentTrack = 0;
let unlocked = false;
els.audio.volume = volume / 100;
els.audio.addEventListener('error', () => {
  els.status.textContent = t('Unable to load this track. Choose another track or try again.');
});

function updateSoundUi() {
  els.toggle?.setAttribute('aria-pressed', String(!muted));
  if (els.toggle) els.toggle.textContent = muted ? t('SOUND OFF') : t('SOUND ON');
  document.body.classList.toggle('sound-on', !muted);
}

function updateVolumeUi() {
  if (!els.volume || !els.volumeValue) return;
  els.volume.value = String(volume);
  els.volumeValue.textContent = `${volume}%`;
  els.volume.style.setProperty('--volume', `${volume}%`);
}

function startMusic() {
  if (muted || !unlocked) return;
  const src = els.audio.src;
  els.audio.play().then(() => {
    if (els.audio.src === src && !els.audio.paused) els.status.textContent = t('Playing.');
  }).catch(error => {
    if (els.audio.src === src && error.name !== 'AbortError' && !muted) {
      els.status.textContent = error.name === 'NotAllowedError'
        ? t('Playback was blocked. Turn sound off and on to retry.')
        : t('Unable to play this track. Choose another track or try again.');
    }
  });
}

function selectTrack(index) {
  currentTrack = index;
  const track = Model.music[index];
  if (els.title) els.title.textContent = track.title;
  if (els.audio.getAttribute('src') !== track.src) {
    els.audio.src = track.src;
    els.status.textContent = t('Playback starts after your first interaction.');
  }
  [...(els.list?.children || [])].forEach((button, i) => button.classList.toggle('active', i === index));
  if (!muted) startMusic();
}

Model.music.forEach((track, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${String(index + 1).padStart(2, '0')} · ${track.title}`;
  button.addEventListener('click', () => selectTrack(index));
  els.list?.appendChild(button);
});
selectTrack(0);
updateSoundUi();
document.addEventListener('languagechange', updateSoundUi);
updateVolumeUi();

els.toggle?.addEventListener('click', () => {
  muted = !muted;
  localStorage.setItem('fantoca-sound', muted ? 'off' : 'on');
  updateSoundUi();
  if (muted) {
    els.audio.pause();
    els.status.textContent = t('Sound is off.');
  } else {
    unlocked = true;
    startMusic();
  }
});
els.panelToggle?.addEventListener('click', () => {
  const open = els.panel?.hidden ?? false;
  if (els.panel) els.panel.hidden = !open;
  els.panelToggle?.setAttribute('aria-expanded', String(open));
});
els.close?.addEventListener('click', () => {
  if (els.panel) els.panel.hidden = true;
  els.panelToggle?.setAttribute('aria-expanded', 'false');
});
els.volume?.addEventListener('input', event => {
  volume = Number(event.currentTarget.value);
  localStorage.setItem('fantoca-music-volume', String(volume));
  updateVolumeUi();
  els.audio.volume = volume / 100;
});

const unlock = () => {
  unlocked = true;
  startMusic();
};
addEventListener('pointerdown', unlock, { once: true, capture: true });
addEventListener('keydown', unlock, { once: true, capture: true });

const updateClock = () => {
  if (els.clock) els.clock.textContent = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · LOCAL`;
};
updateClock();
setInterval(updateClock, 1000);
