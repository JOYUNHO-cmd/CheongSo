import assert from "node:assert/strict";
import test from "node:test";
import {
  choose,
  getPrompt,
  situations,
  summaryText,
  chatFaq,
} from "../src/components/consultation/chat-flow.ts";

test("ten situation paths and every available answer lead to a finite summary", () => {
  assert.equal(getPrompt([]).options.length, 10);
  let terminals = 0;
  function visit(answers) {
    const prompt = getPrompt(answers);
    if (!prompt) {
      assert.equal(answers.length, 5);
      assert.match(summaryText(answers), /아직 접수·예약되지 않았습니다/);
      terminals++;
      return;
    }
    assert.ok(prompt.options.length > 0);
    assert.equal(new Set(prompt.options.map((o) => o.value)).size, prompt.options.length);
    for (const o of prompt.options) {
      const next = choose(answers, o.value);
      assert.equal(next.length, answers.length + 1);
      assert.deepEqual(next.slice(0, -1), answers);
      visit(next);
    }
  }
  visit([]);
  assert.ok(terminals > 1000);
});
test("invalid choices and completed paths cannot advance", () => {
  const initial = [];
  assert.equal(choose(initial, "invalid"), initial);
  let answers = [];
  for (let i = 0; i < 5; i++) answers = choose(answers, getPrompt(answers).options[0].value);
  assert.equal(choose(answers, "invalid"), answers);
});
test("backtracking allows replacing a prior answer", () => {
  let answers = choose([], situations[0].id);
  answers = choose(answers, getPrompt(answers).options[0].value);
  const back = answers.slice(0, -1);
  const changed = choose(back, getPrompt(back).options.at(-1).value);
  assert.equal(changed.length, 2);
  assert.notEqual(changed[1].value, answers[1].value);
});
test("only jjin contact and no inherited third-party claims", () => {
  assert.doesNotMatch(JSON.stringify({ situations, chatFaq }), /한스클린|hans|channel\.io|1688/);
});
test("privacy guidance explains manual email transmission without promising server-side storage behavior", () => {
  const answer = chatFaq.find(item => item.question === "선택한 내용이 저장되나요?").answer;
  assert.match(answer, /선택 내용은 자동 전송되지 않습니다/);
  assert.match(answer, /상담 내용 이메일로 보내기를 누르면 찐청소로 전달됩니다/);
  assert.match(answer, /새로고침하면 초기화/);
  assert.doesNotMatch(answer, /서버로 전송하거나 저장하지 않습니다|저장되지 않습니다/);
});
