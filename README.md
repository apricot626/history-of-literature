# 文学の系譜（仮称）

作家・作品・時代・人物関係から、日本の文学史を**線と面で**学ぶ中学受験生向け学習サイトのリポジトリです。

> 文学者を「点」で覚えるのではなく、作品・時代・人物同士のつながり・文学的エピソード・文学用語を結び付けて理解し、応用できるようにすることを目指します。

## ドキュメント

| ファイル | 内容 |
|---|---|
| [docs/01_project-plan.md](docs/01_project-plan.md) | 企画方針・対象・学習カテゴリ・サイト構成・MVP・ロードマップ・課題一覧 |
| [docs/02_data-model.md](docs/02_data-model.md) | データ設計（エンティティ・項目・ID規則・相互リンク・公開/内部の分離） |
| [docs/03_content-guidelines.md](docs/03_content-guidelines.md) | 執筆・事実確認・著作権・人物関係の掲載基準 |
| [docs/04_initial-content.md](docs/04_initial-content.md) | 初期掲載候補（作家・作品・用語）と作成状況 |

## データ

`data/` 以下に公開教材用のマスターデータ（JSON）を置きます。

| ファイル | 内容 |
|---|---|
| `data/people.json` | 人物（作家・俳人・歌人・評論家など） |
| `data/works.json` | 作品 |
| `data/relationships.json` | 人物関係 |
| `data/events.json` | 文学史上の出来事 |
| `data/terms.json` | 文学用語 |
| `data/eras.json` | 時代区分 |
| `data/questions.json` | オリジナル問題 |

整合性チェック：

```sh
node scripts/validate.mjs
```

## 公開情報と内部情報の分離（最重要ルール）

このリポジトリは**公開**されています。以下は絶対にコミットしないでください。

- 特定の学校名
- 過去問の年度・出題実績・試験区分
- 過去問の問題文・選択肢・解答・解説

内部調査資料は `internal/`（`.gitignore` 済み）またはリポジトリ外の非公開の場所で管理します。
