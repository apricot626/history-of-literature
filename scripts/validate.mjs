#!/usr/bin/env node
// 公開教材データ（data/*.json）の整合性チェック
// - JSONとして読めるか / IDの重複 / 必須項目 / 参照先IDの存在 / 値の範囲
// - 公開データに内部調査の情報が混入していないか
//   （共通の禁止語＋ internal/blocklist.txt に書いた語。internal/ は git 管理外）
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const load = (name) => {
  const path = join(root, "data", `${name}.json`);
  try {
    return { raw: readFileSync(path, "utf8"), data: JSON.parse(readFileSync(path, "utf8")) };
  } catch (e) {
    err(`${name}.json: 読み込めません (${e.message})`);
    return { raw: "", data: [] };
  }
};

const files = ["eras", "people", "works", "relationships", "events", "terms", "questions"];
const db = Object.fromEntries(files.map((f) => [f, load(f)]));
const ids = Object.fromEntries(files.map((f) => [f, new Set()]));

// ID重複・形式
const ID_RE = /^[a-z0-9]+(-[a-z0-9_]+)*$/;
for (const f of files) {
  for (const rec of db[f].data) {
    if (!rec.id) { err(`${f}: id がないレコードがあります`); continue; }
    if (!ID_RE.test(rec.id)) err(`${f}/${rec.id}: id の形式が不正です`);
    if (ids[f].has(rec.id)) err(`${f}/${rec.id}: id が重複しています`);
    ids[f].add(rec.id);
  }
}

const refs = (f, rec, target, field) => {
  for (const id of rec[field] ?? []) if (!ids[target].has(id)) err(`${f}/${rec.id}.${field}: 存在しない ${target} ID「${id}」`);
};
const required = (f, rec, fields) => {
  for (const k of fields) if (rec[k] === undefined || rec[k] === "") err(`${f}/${rec.id}: 必須項目 ${k} がありません`);
};
const VSTATUS = ["draft", "needs_check", "checked"];
const checkVerification = (f, rec) => {
  const v = rec.verification;
  if (!v || !VSTATUS.includes(v.status)) return err(`${f}/${rec.id}: verification.status が不正です`);
  if (v.status === "checked" && (!v.sources?.length || !v.checked_at)) err(`${f}/${rec.id}: checked には sources と checked_at が必要です`);
  if (v.status === "needs_check" && !v.note) warn(`${f}/${rec.id}: needs_check の理由（note）がありません`);
};

for (const p of db.people.data) {
  required("people", p, ["name", "kana", "nationality", "roles", "summary"]);
  refs("people", p, "eras", "era_ids");
  refs("people", p, "terms", "movement_term_ids");
  if (p.birth_year && p.death_year && p.birth_year >= p.death_year) err(`people/${p.id}: 生没年が逆転しています`);
  checkVerification("people", p);
}

for (const w of db.works.data) {
  required("works", w, ["title", "kana", "author_ids", "genre"]);
  if (!w.author_ids?.length) err(`works/${w.id}: author_ids が空です`);
  refs("works", w, "people", "author_ids");
  refs("works", w, "terms", "movement_term_ids");
  refs("works", w, "works", "related_work_ids");
  if (w.year == null && !w.year_note) warn(`works/${w.id}: year も year_note もありません`);
  if (!w.summary && w.verification?.status !== "needs_check") warn(`works/${w.id}: あらすじが空です`);
  for (const a of w.author_ids ?? []) {
    const p = db.people.data.find((x) => x.id === a);
    if (p && w.year && p.birth_year && w.year < p.birth_year) err(`works/${w.id}: 作者の生年より前の発表年です`);
  }
  checkVerification("works", w);
}

const REL_TYPES = ["parent_child", "mentor_student", "admiration", "friendship", "support", "conflict", "same_movement"];
for (const r of db.relationships.data) {
  required("relationships", r, ["from", "to", "type", "label", "description"]);
  if (!REL_TYPES.includes(r.type)) err(`relationships/${r.id}: type「${r.type}」は未定義です`);
  if (!ids.people.has(r.from)) err(`relationships/${r.id}: from「${r.from}」が存在しません`);
  if (!ids.people.has(r.to)) err(`relationships/${r.id}: to「${r.to}」が存在しません`);
  if (r.from === r.to) err(`relationships/${r.id}: 自分自身への関係です`);
  refs("relationships", r, "events", "event_ids");
  checkVerification("relationships", r);
}

for (const e of db.events.data) {
  required("events", e, ["year", "title", "description"]);
  refs("events", e, "people", "person_ids");
  refs("events", e, "works", "work_ids");
  refs("events", e, "terms", "term_ids");
  checkVerification("events", e);
}

const TERM_CATS = ["movement", "theory", "genre", "form"];
for (const t of db.terms.data) {
  required("terms", t, ["name", "kana", "category", "definition"]);
  if (!TERM_CATS.includes(t.category)) err(`terms/${t.id}: category「${t.category}」は未定義です`);
  refs("terms", t, "people", "person_ids");
  refs("terms", t, "works", "work_ids");
  refs("terms", t, "terms", "related_term_ids");
  checkVerification("terms", t);
}

const Q_TYPES = ["author_work", "not_by_author", "true_false", "chronology", "relationship", "episode", "term", "applied"];
const Q_CATS = ["work_id", "era", "profile", "relation", "theory", "poetry"];
for (const q of db.questions.data) {
  required("questions", q, ["type", "category", "difficulty", "prompt", "choices", "answer", "explanation"]);
  if (!Q_TYPES.includes(q.type)) err(`questions/${q.id}: type「${q.type}」は未定義です`);
  if (!Q_CATS.includes(q.category)) err(`questions/${q.id}: category「${q.category}」は未定義です`);
  if (![1, 2, 3].includes(q.difficulty)) err(`questions/${q.id}: difficulty は1〜3です`);
  if (!q.answer?.length) err(`questions/${q.id}: answer が空です`);
  for (const a of q.answer ?? []) if (!(a >= 0 && a < (q.choices?.length ?? 0))) err(`questions/${q.id}: answer ${a} が選択肢の範囲外です`);
  refs("questions", q, "people", "person_ids");
  refs("questions", q, "works", "work_ids");
  refs("questions", q, "terms", "term_ids");
  refs("questions", q, "events", "event_ids");
  checkVerification("questions", q);
}

// 内部情報の混入チェック
const blocklist = ["年度", "過去問", "出題", "入試問題", "一次試験", "二次試験"];
const blockPath = join(root, "internal", "blocklist.txt");
if (existsSync(blockPath)) {
  blocklist.push(...readFileSync(blockPath, "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#")));
}
for (const f of files) {
  for (const word of blocklist) {
    if (db[f].raw.includes(word)) err(`${f}.json: 公開データに禁止語「${word}」が含まれています`);
  }
}

// 集計
const count = (f, s) => db[f].data.filter((r) => r.verification?.status === s).length;
console.log("件数:");
for (const f of files) {
  const n = db[f].data.length;
  const v = f === "eras" ? "" : `（checked ${count(f, "checked")} / draft ${count(f, "draft")} / needs_check ${count(f, "needs_check")}）`;
  console.log(`  ${f.padEnd(14)} ${String(n).padStart(3)} ${v}`);
}
if (!existsSync(blockPath)) console.log("\n注意: internal/blocklist.txt がないため、学校名などの混入チェックは共通禁止語のみで行いました。");
for (const w of warnings) console.log(`warn: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);
console.log(errors.length ? `\n${errors.length} 件のエラー` : "\nOK: エラーはありません");
process.exit(errors.length ? 1 : 0);
