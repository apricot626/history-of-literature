# 02. データ設計

## 1. 基本方針

- 情報を独立したエンティティとして持ち、**IDで相互参照**する（作家ページ↔作品↔用語↔出来事↔クイズ）。
- 当面は `data/*.json` で管理し、技術スタック決定後もこの構造をそのまま読み込めるようにする（暫定）。
- **公開教材データと内部調査データは分離**する。内部調査データはこのリポジトリに置かない。
- 掲載前の全レコードに `verification`（事実確認状況）を持たせる。

## 2. エンティティ一覧

| ファイル | エンティティ | 概要 |
|---|---|---|
| `people.json` | Person | 作家に限らず、俳人・歌人・僧・評論家・学者・海外作家も含む「人物」 |
| `works.json` | Work | 作品 |
| `relationships.json` | Relationship | 人物同士の関係 |
| `events.json` | Event | 文学史上の出来事（文学賞・雑誌創刊・受賞・論争など） |
| `terms.json` | Term | 文学用語（文学運動・理論・ジャンル・表現形式） |
| `eras.json` | Era | 時代区分 |
| `questions.json` | Question | オリジナル問題 |

> 「Authors」ではなく「People」とした理由：調査で名前の挙がった人物には物理学者（寺田寅彦・湯川秀樹）、評論家、禅僧（良寛）、文学理論家なども含まれるため。役割は `roles` で表す。

## 3. ID規則

- 小文字ローマ字＋ハイフン（ヘボン式、長音記号なし）。例：`natsume-soseki`, `dazai-osamu`
- 作品：`作品名ローマ字`。重複時は作者名を付ける。例：`kokoro`, `rashomon`
- 関係：`rel-<from>-<to>-<type>`、出来事：`ev-<year>-<slug>`、用語：`term-<slug>`、問題：`q-<4桁連番>`
- 一度公開したIDは変更しない（URLに使うため）

## 4. 共通フィールド

```jsonc
"verification": {
  "status": "draft",        // draft: 下書き / needs_check: 要確認事項あり / checked: 複数資料で確認済み
  "sources": [],            // 確認に使った資料（書名・URLなど）
  "checked_at": null,       // 最終確認日 YYYY-MM-DD
  "note": ""                // 要確認の内容など
}
```

公開ページに出すのは原則 `checked` のみ（MVP時点では `draft` 表示も可とするかは要検討）。

## 5. 各エンティティの項目

### Person

| 項目 | 型 | 説明 |
|---|---|---|
| id | string | |
| name / kana | string | 表記・読み |
| real_name | string? | 本名（筆名と異なる場合） |
| birth_year / death_year | number? | 西暦。存命なら death_year は null |
| birthplace | string | 現在の都道府県名を併記 |
| nationality | string | 「日本」「アメリカ」など |
| roles | string[] | 小説家 / 俳人 / 歌人 / 詩人 / 評論家 / 僧 / 学者 など |
| era_ids | string[] | 主な活動時代 |
| movement_term_ids | string[] | 所属・関係する文学運動（Term） |
| summary | string | 独自執筆の紹介文（小学生が読める文章） |
| tags | string[] | |
| verification | object | |

代表作品は Work 側の `author_ids` から逆引きする（二重管理しない）。

### Work

| 項目 | 型 | 説明 |
|---|---|---|
| id, title, kana | string | |
| author_ids | string[] | |
| year | number? | 初出（発表）年。不明・要確認なら null |
| year_note | string | 「連載 1935〜1947」「執筆は1908年」など |
| genre | string | 長編小説 / 短編小説 / 随筆 / 紀行文 / 戯曲 / 詩 / 句集 など |
| summary | string | 独自執筆のあらすじ（結末のネタバレ配慮は要検討） |
| movement_term_ids, related_work_ids, tags | string[] | |
| verification | object | |

### Relationship

| 項目 | 型 | 説明 |
|---|---|---|
| id | string | |
| from / to | string | Person ID |
| type | enum | 下表 |
| directed | boolean | 向きがあるか（敬愛・影響・親子・師弟は true） |
| label | string | 相関図の線に出す短い言葉 |
| description | string | 独自執筆の説明 |
| event_ids | string[] | 関連する出来事 |
| verification | object | |

| type | 意味 | 例 |
|---|---|---|
| `parent_child` | 親子（from=親） | 太宰治 → 津島佑子 |
| `mentor_student` | 師弟（from=師） | 夏目漱石 → 芥川龍之介 |
| `admiration` | 敬愛・影響（from=敬愛する側） | 太宰治 → 芥川龍之介 |
| `friendship` | 友人・同人 | 菊池寛 ↔ 芥川龍之介 |
| `support` | 見出す・推す（from=推した側） | 川端康成 → 三島由紀夫 |
| `conflict` | 対立・確執 | 太宰治 ↔ 川端康成（芥川賞） |
| `same_movement` | 同じ文学運動・立場 | 反自然主義 など |

### Event

`id, year, month?, title, description, person_ids, work_ids, term_ids, tags, verification`

### Term

| 項目 | 説明 |
|---|---|
| id, name, kana | |
| category | `movement`（文学運動・流派）/ `theory`（理念）/ `genre`（ジャンル）/ `form`（表現形式） |
| period | 成立・活動時期の目安（文字列） |
| definition | 意味（独自執筆） |
| background | 成立背景 |
| difference | 類似用語との違い |
| person_ids / work_ids / related_term_ids | 関連 |
| verification | |

### Era

`id, name, start_year, end_year, summary`

### Question

| 項目 | 説明 |
|---|---|
| id | |
| type | `author_work` / `not_by_author` / `true_false` / `chronology` / `relationship` / `episode` / `term` / `applied` |
| category | 学習カテゴリ①〜⑥（`work_id` / `era` / `profile` / `relation` / `theory` / `poetry`） |
| difficulty | 1（基本）〜3（発展） |
| prompt | 問題文（オリジナル） |
| choices | string[] |
| answer | number[]（正解の選択肢インデックス。複数正解可） |
| explanation | 解説（オリジナル） |
| person_ids / work_ids / term_ids / event_ids | 関連（作家ページから関連クイズを引くため） |
| verification | |

## 6. 相互リンク

例：太宰治のページ

- 代表作品 … `works` を `author_ids` で検索
- 関連する作家 … `relationships` を from/to で検索
- 関連する出来事・文学賞 … `events` を `person_ids` で検索
- 関連する文学用語 … `movement_term_ids` と `terms.person_ids`
- 関連するクイズ … `questions.person_ids`

作品・用語・出来事のページからも同じ方法で逆引きする。

## 7. 内部調査データ（このリポジトリでは管理しない）

内部調査データ（調査記録・情報源・確認状況・掲載優先度）は非公開の場所で管理する。公開用のデータ・APIからは参照できないようにする。

- 公開データ側には「なぜその人物を優先したか」の根拠を書かない
- `scripts/validate.mjs` は、公開データに「年度」「過去問」などの語が混入していないか、また `internal/blocklist.txt`（git管理外）に書いた語が含まれていないかをチェックする
