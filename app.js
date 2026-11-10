import { convert } from './convert.js';
const source = document.querySelector('#source');
const result = document.querySelector('#result');
const copy = document.querySelector('#copy');
const status = document.querySelector('#status');
let converted = convert('');
function render() {
  converted = convert(source.value);
  result.replaceChildren();
  copy.disabled = !converted.text;
  status.textContent = '';
  if (!converted.text) {
    const placeholder = document.createElement('span');
    placeholder.className = 'placeholder';
    placeholder.textContent = '변환된 내용이 여기에 표시됩니다.';
    result.append(placeholder);
    return;
  }
  for (const block of converted.blocks) {
    if (block.type === 'text') {
      const pre = document.createElement('pre');
      pre.textContent = block.text + '\n';
      result.append(pre);
    } else {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrap';
      const table = document.createElement('table');
      const head = table.createTHead().insertRow();
      for (const value of block.header) {
        const cell = document.createElement('th');
        cell.scope = 'col'; cell.textContent = value; head.append(cell);
      }
      const body = table.createTBody();
      for (const row of block.rows) {
        const element = body.insertRow();
        for (const value of row) element.insertCell().textContent = value;
      }
      wrapper.append(table); result.append(wrapper);
    }
  }
}
source.addEventListener('input', render);
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; render(); source.focus(); });
document.querySelector('#example').addEventListener('click', () => {
  source.value = '# 마크다운 테스트\n\n**굵은 글씨**와 *기울임 글씨*, ~~취소선~~\n\n- 첫 번째 항목\n  * 중첩 항목\n+ [x] 완료한 작업\n- [ ] 진행할 작업\n\n[Google](https://google.com)\n![이미지 설명](https://example.com/image.png)\n\n> 인용문도 내용은 그대로\n\n```swift\nlet message = "Hello, World!"\nprint(message)\n```\n\n| 이름 | 역할 |\n| --- | --- |\n| 홍길동 | 개발자 |\n| 김철수 | 디자이너 |';
  render();
});
copy.addEventListener('click', async () => {
  try {
    if (globalThis.ClipboardItem && navigator.clipboard?.write) {
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': new Blob([converted.text], { type: 'text/plain' }), 'text/html': new Blob([result.innerHTML], { type: 'text/html' }) })]);
    } else await navigator.clipboard.writeText(converted.text);
    status.textContent = '복사했습니다.';
  } catch {
    try { await navigator.clipboard.writeText(converted.text); status.textContent = '복사했습니다.'; }
    catch { status.textContent = '복사 권한을 확인하거나 결과를 선택해 복사해주세요.'; }
  }
});
result.addEventListener('copy', event => {
  const selection = window.getSelection();
  if (selection?.toString() && event.clipboardData) {
    const fragment = selection.getRangeAt(0).cloneContents();
    const container = document.createElement('div'); container.append(fragment);
    for (const row of container.querySelectorAll('tr')) {
      row.replaceWith(document.createTextNode([...row.cells].map(cell => cell.textContent).join('\t') + '\n'));
    }
    event.clipboardData.setData('text/plain', container.textContent);
    const html = document.createElement('div'); html.append(selection.getRangeAt(0).cloneContents());
    event.clipboardData.setData('text/html', html.innerHTML);
    event.preventDefault();
  }
});
