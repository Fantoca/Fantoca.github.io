import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { renderMarkdown } from '../src/lib/markdown.js';
import Model from '../src/scripts/model.js';

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
  }
  for (const project of Model.featured) assert.ok(existsSync('public' + project.img));
});

test('markdown preserves tables and code but strips executable markup', () => {
  const { html } = renderMarkdown('# Title\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```html\n<div>example</div>\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))\n\n<img src="/safe.png" onerror="alert(1)">');
  assert.ok(html.includes('<table>'));
  assert.ok(html.includes('&lt;div&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(!html.includes('onerror='));
});
