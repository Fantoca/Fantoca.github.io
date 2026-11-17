import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { renderMarkdown } from '../src/lib/markdown.js';
import Model from '../src/scripts/model.js';
import { projectForLocale, translations } from '../src/scripts/i18n.js';

test('every published project has unique routing, a cover and renderable content', async () => {
  const projects = await Model.fetchCaseStudies();
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    assert.ok(existsSync('public' + p.img), p.img);
    const { html, headings } = renderMarkdown(readFileSync('public' + p.readme, 'utf8'));
    assert.ok(html.includes('<h1>'));
    assert.ok(headings.length > 0);
    assert.equal(new Set(headings.map(h => h.id)).size, headings.length);
    if (p.i18n?.id?.readme) {
      const translated = renderMarkdown(readFileSync('public' + p.i18n.id.readme, 'utf8'));
      assert.ok(translated.html.includes('<h1>'), p.i18n.id.readme);
      assert.ok(translated.headings.length > 0, p.i18n.id.readme);
    }
  }
  for (const project of Model.featured) assert.ok(existsSync('public' + project.img));
});

test('intro and about paragraphs have Indonesian translations', () => {
  const page = readFileSync('src/pages/index.astro', 'utf8');
  const intro = page.match(/<p id="tagline">([^<]+)<\/p>/)?.[1];
  const about = page.match(/<div class="paper about-copy">([\s\S]*?)<p><a /)?.[1];
  const paragraphs = [...(about || '').matchAll(/<p>([^<]+)<\/p>/g)].map(match => match[1]);
  assert.equal(paragraphs.length, 3);
  for (const text of [intro, ...paragraphs]) assert.ok(translations[text], `Missing translation: ${text}`);
});

test('project translations fall back to English for missing fields', () => {
  const project = { title: 'Original', desc: 'English description', badge: 'Open source', i18n: { id: { title: 'Terjemahan', desc: '' } } };
  assert.equal(projectForLocale(project, 'id').title, 'Terjemahan');
  assert.equal(projectForLocale(project, 'id').desc, 'English description');
  assert.equal(projectForLocale(project, 'id').badge, 'Open source');
  assert.equal(projectForLocale(project, 'en').title, 'Original');
});

test('language selection persists and switches between Indonesian and English', async () => {
  const stored = new Map([['fantoca-language', 'id']]);
  const text = { nodeValue: 'Projects', parentElement: { closest: () => null } };
  const select = { matches: selector => selector === '[data-language-select]' };
  let changeLanguage;
  globalThis.localStorage = { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) };
  globalThis.NodeFilter = { SHOW_TEXT: 4 };
  globalThis.document = {
    documentElement: {}, querySelectorAll: selector => selector === '[data-language-select]' ? [select] : [],
    querySelector: () => null, dispatchEvent() {}, addEventListener(type, fn) { if (type === 'change') changeLanguage = fn; },
    createTreeWalker: () => { let visited = false; return { currentNode: text, nextNode: () => !visited && (visited = true) }; },
  };
  try {
    await import('../src/scripts/i18n.js?language-test');
    assert.equal(text.nodeValue, 'Proyek');
    assert.equal(document.documentElement.lang, 'id');
    select.value = 'en';
    changeLanguage({ target: select });
    assert.equal(text.nodeValue, 'Projects');
    assert.equal(document.documentElement.lang, 'en');
    assert.equal(stored.get('fantoca-language'), 'en');
  } finally {
    delete globalThis.document;
    delete globalThis.localStorage;
    delete globalThis.NodeFilter;
  }
});

test('music playlist points to the requested local tracks', () => {
  assert.deepEqual(Model.music, [
    { title: 'Beneath the Mask - Rain', src: '/assets/music/beneath-the-mask.mp3' },
    { title: 'Life Will Change', src: '/assets/music/life-will-change.mp3' },
    { title: 'Last Surprise', src: '/assets/music/last-surprise.mp3' },
  ]);
});

test('project music waits for a gesture and retains volume and sound controls', async () => {
  const events = {};
  const element = () => ({
    children: [], classList: { toggle() {} }, style: { setProperty() {} },
    addEventListener(type, fn) { this[type] = fn; },
    appendChild(child) { this.children.push(child); }, setAttribute() {},
  });
  const ids = Object.fromEntries(['sound-toggle', 'music-panel-toggle', 'music-player', 'music-close', 'music-audio', 'music-title', 'music-list', 'music-status', 'music-volume', 'music-volume-value', 'clock'].map(id => [id, element()]));
  const audio = ids['music-audio'];
  audio.getAttribute = name => name === 'src' ? audio.src : null;
  audio.play = () => { audio.plays = (audio.plays || 0) + 1; audio.paused = false; return Promise.resolve(); };
  audio.pause = () => { audio.paused = true; };
  const stored = new Map([['fantoca-music-volume', '35']]);
  const source = readFileSync('src/scripts/case-audio.js', 'utf8')
    .replace("import Model from './model.js';", '')
    .replace("import { t } from './i18n.js';", '');
  runInNewContext(source, {
    Model, t: text => text, document: { getElementById: id => ids[id], createElement: element, body: element(), addEventListener() {} },
    localStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) },
    addEventListener: (type, fn) => { events[type] = fn; }, setInterval() {}, Date,
  });
  assert.equal(audio.plays, undefined);
  assert.equal(audio.volume, 0.35);
  events.pointerdown();
  await Promise.resolve();
  assert.equal(audio.plays, 1);
  ids['music-list'].children[1].click();
  assert.equal(audio.src, '/assets/music/life-will-change.mp3');
  ids['sound-toggle'].click();
  assert.equal(audio.paused, true);
  assert.equal(stored.get('fantoca-sound'), 'off');
  ids['music-volume'].input({ currentTarget: { value: '70' } });
  assert.equal(audio.volume, 0.7);
  assert.equal(stored.get('fantoca-music-volume'), '70');
});

test('markdown preserves tables and code but strips executable markup', () => {
  const { html } = renderMarkdown('# Title\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```html\n<div>example</div>\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))\n\n<img src="/safe.png" onerror="alert(1)">');
  assert.ok(html.includes('<table>'));
  assert.ok(html.includes('&lt;div&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(!html.includes('onerror='));
});
