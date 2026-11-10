import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'convert.js', 'robots.txt', 'sitemap.xml', 'privacy.html']) await copyFile(file, `dist/${file}`);
