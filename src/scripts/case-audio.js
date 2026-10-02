import Model from './model.js';

const els = {
  toggle: document.getElementById('sound-toggle'),
  panelToggle: document.getElementById('music-panel-toggle'),
  panel: document.getElementById('music-player'),
  close: document.getElementById('music-close'),
  mount: document.getElementById('youtube-player'),
  title: document.getElementById('music-title'),
  list: document.getElementById('music-list'),
  link: document.getElementById('music-youtube-link'),
  volume: document.getElementById('music-volume'),
  volumeValue: document.getElementById('music-volume-value'),
  clock: document.getElementById('clock'),
};

let muted = localStorage.getItem('fantoca-sound') === 'off';
const savedVolumeRaw = localStorage.getItem('fantoca-music-volume');
let volume = savedVolumeRaw === null ? 20 : Math.min(100, Math.max(0, Number(savedVolumeRaw) || 0));
let currentTrack = 0;
let started = false;

function send(command, args = []) {
  els.mount?.querySelector('iframe')?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args }), 'https://www.youtube-nocookie.com');
}

function updateSoundUi() {
  els.toggle?.setAttribute('aria-pressed', String(!muted));
  if (els.toggle) els.toggle.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
  document.body.classList.toggle('sound-on', !muted);
}

function updateVolumeUi() {
  if (!els.volume || !els.volumeValue) return;
  els.volume.value = String(volume);
  els.volumeValue.textContent = `${volume}%`;
  els.volume.style.setProperty('--volume', `${volume}%`);
}

function startMusic() {
  if (muted) return;
  if (started) {
    send('setVolume', [volume]);
    send('playVideo');
    return;
  }
  const track = Model.music[currentTrack];
  const iframe = document.createElement('iframe');
  iframe.title = track.title;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  const origin = encodeURIComponent(location.origin);
  iframe.src = `https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}&controls=1&rel=0&enablejsapi=1&origin=${origin}`;
  iframe.allowFullscreen = true;
  iframe.addEventListener('load', () => {
    setTimeout(() => send('setVolume', [volume]), 250);
    setTimeout(() => send('setVolume', [volume]), 1000);
  });
  els.mount?.replaceChildren(iframe);
  started = true;
}

function selectTrack(index) {
  currentTrack = index;
  started = false;
  const track = Model.music[index];
  if (els.title) els.title.textContent = track.title;
  if (els.link) els.link.href = `https://www.youtube.com/watch?v=${track.id}`;
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
updateVolumeUi();

els.toggle?.addEventListener('click', () => {
  muted = !muted;
  localStorage.setItem('fantoca-sound', muted ? 'off' : 'on');
  updateSoundUi();
  if (muted) send('pauseVideo');
  else startMusic();
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
  send('setVolume', [volume]);
});

const unlock = () => startMusic();
addEventListener('pointerdown', unlock, { once: true, capture: true });
addEventListener('keydown', unlock, { once: true, capture: true });

const updateClock = () => {
  if (els.clock) els.clock.textContent = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · LOCAL`;
};
updateClock();
setInterval(updateClock, 1000);
