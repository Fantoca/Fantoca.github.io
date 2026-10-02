import type { APIRoute } from 'astro';
import projects from '../../public/data/projects.json';
export const GET: APIRoute = ({ site }) => {
  const urls = site ? ['/', ...projects.map(p => '/projects/' + p.slug + '/')].map(path => new URL(path, site).href) : [];
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(url => '<url><loc>' + escape(url) + '</loc></url>').join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
};
