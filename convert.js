export function inline(source) {
  const saved = [];
  const protect = value => `\u0000${saved.push(value) - 1}\u0000`;
  let text = source.replace(/\\([\\`*{}_\[\]()#+.!>|~-])/g, (_, value) => protect(value));
  text = text.replace(/(`+)([\s\S]*?)\1/g, (_, ticks, value) => protect(value));
  text = text.replace(/!?\[([^\]]*)\]\(([^\s]*(?:\([^)]*\)[^\s]*)?)(?:\s+"[^"]*")?\)/g, (_, label, url) => `${label} (${url.replace(/^<|>$/g, '')})`);
  text = text.replace(/<((?:https?:\/\/|mailto:)[^>]+)>/g, '$1');
  for (let count = 0; count < 3; count++) {
    text = text.replace(/(\*\*|__|~~)(?=\S)(.+?)\1/g, '$2').replace(/\*(?=\S)([^*\n]+?)\*/g, '$1').replace(/(^|[^\w])_(?=\S)([^_\n]+?)_(?!\w)/g, '$1$2');
  }
  return text.replace(/\u0000(\d+)\u0000/g, (_, index) => saved[index]);
}

function cells(line) {
  return line.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/).map(cell => inline(cell.trim()).replace(/\t/g, ' '));
}

export function convert(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let pending = [];
  const flush = () => { if (pending.length) blocks.push({ type: 'text', text: pending.join('\n') }); pending = []; };
  let fence = null;
  let code = [];
  const flushCode = () => { blocks.push({ type: 'text', text: `${fence.language ? `[${fence.language}]\n` : ''}${code.join('\n')}` }); code = []; fence = null; };
  for (let index = 0; index < lines.length; index++) {
    const raw = lines[index];
    const line = raw.replace(/^(\s*)(?:>\s?)+/, '$1');
    if (fence) {
      if (new RegExp(`^\\s{0,3}${fence.marker}{${fence.size},}\\s*$`).test(line)) flushCode();
      else code.push(raw);
      continue;
    }
    const opening = line.match(/^\s{0,3}(`{3,}|~{3,})\s*([^\s]*)?.*$/);
    if (opening) { flush(); fence = { marker: opening[1][0], size: opening[1].length, language: opening[2] || '' }; continue; }
    const next = lines[index + 1]?.replace(/^(\s*)(?:>\s?)+/, '$1');
    if (line.includes('|') && next && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(next)) {
      flush();
      const header = cells(line);
      const rows = [];
      index++;
      while (index + 1 < lines.length && lines[index + 1].trim() && lines[index + 1].includes('|')) {
        const row = cells(lines[++index]);
        rows.push(header.map((_, column) => row[column] || ''));
      }
      blocks.push({ type: 'table', header, rows });
      continue;
    }
    if (/^\s{0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line)) continue;
    if (/^\s{0,3}(?:=+|-+)\s*$/.test(line) && index > 0 && lines[index - 1].trim()) continue;
    const content = /^\s{0,3}#{1,6}\s+/.test(line) ? line.replace(/^\s{0,3}#{1,6}\s+/, '').replace(/\s+#+\s*$/, '') : line;
    pending.push(inline(content.replace(/^(\s*)[*+]\s+/, '$1- ')).replace(/ {2}$/, ''));
  }
  if (fence) flushCode();
  flush();
  return { blocks, text: blocks.map(block => block.type === 'table' ? [block.header, ...block.rows].map(row => row.join('\t')).join('\n') : block.text).join('\n').trim() };
}
