import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convert } from './convert.js';
test('headings, inline syntax and nested lists', () => {
  assert.equal(convert('# 제목\n**강조** *기울임* ~~삭제~~ `a_b`\n- 유지\n  * 중첩\n+ [x] 완료\n- [ ] 대기\n1. 순서').text, '제목\n강조 기울임 삭제 a_b\n- 유지\n  - 중첩\n- [x] 완료\n- [ ] 대기\n1. 순서');
});
test('links, images, quotes and fences', () => {
  assert.equal(convert('[검색](https://google.com)\n![설명](https://x.test/a.png)\n> 인용\n```swift\n**원문**\n```').text, '검색 (https://google.com)\n설명 (https://x.test/a.png)\n인용\n[swift]\n**원문**');
});
test('table preview model and TSV', () => {
  const result = convert('| 이름 | 역할 |\n| --- | :---: |\n| **홍길동** | 개발자 |\n| 김철수 | 디자이너 |');
  assert.equal(result.blocks[0].type, 'table');
  assert.equal(result.text, '이름\t역할\n홍길동\t개발자\n김철수\t디자이너');
});
test('literal symbols, escaped pipes, unfinished fences and CRLF', () => {
  assert.equal(convert('snake_case 와 \\*문자\\*\r\n~~~js\r\nconst x = 1;').text, 'snake_case 와 *문자*\n[js]\nconst x = 1;');
  assert.equal(convert('| 값 |\n| --- |\n| a\\|b |').text, '값\na|b');
});
test('code and ordinary trailing hashes remain literal', () => {
  assert.equal(convert('내용 #\n```text\n> 원문\n* 그대로\n```').text, '내용 #\n[text]\n> 원문\n* 그대로');
});
