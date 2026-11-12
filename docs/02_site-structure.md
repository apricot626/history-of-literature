# 02. ページ構成と編集ルール

## 1. 基本方針

- **HTMLとCSSだけで構成する**。データベース、ビルド工程、JavaScriptは使わない。
- 各ページのHTMLを直接編集して内容を追加・修正する。
- 全ページで `style.css` を共有する。ヘッダーのナビゲーションとフッターは各ページに同じものを書く。
- 答えの表示（演習問題）は `<details>`、人物相関図はインラインSVGを使い、HTMLとCSSだけで動くようにする。

## 2. ページ一覧

| ページ | 構成 |
|---|---|
| `index.html` | ヒーロー → 学習コンテンツ（6つのタイル） → 身につく知識（6カテゴリ） → 今日の問題 → つながりの例（太宰治） |
| `authors.html` | 時代別の目次 → 時代ごとの `<section>` → 作家ごとの `<article class="card person">` |
| `works.html` | 時代別の目次 → 時代ごとの `<section>` → 作品ごとの `<article class="card work">`（発表の古い順） |
| `timeline.html` | 時代区分ごとの `<section class="era">` → `<ol class="timeline">`（出来事・作品・誕生） |
| `relations.html` | 凡例 → 相関図（SVG 2枚） → 関係の種類ごとの説明リスト |
| `poetry.html` | 詩のかたちの比較表 → 詩のかたちの流れ → 有名な句と歌（`<article class="card poem">`） → 俳人・歌人のつながり |
| `foreign.html` | 覚える順番（3レベル） → 基本：国ごとのカード → 標準：代表作の表（行に `id="f-…"`） → 発展：文学者・思想家の表 → 日本の作家とのつながり → 確かめ問題 |
| `glossary.html`（単語帳） | 分類別の目次 → 言葉ごとの `<article class="card term">`（ひとことで言うと／くわしい説明／にている言葉とのちがい） |
| `ichimon.html` | 分類ごとの `<details class="qa">`（summary に問題、中に答えと知識） |
| `quiz.html` | 解き方の4ステップ → 9分類ごとの `<section>` → 問題ごとの `<article class="card quiz">` |

## 3. アンカーIDの規則（ページ間リンク用）

一度公開したIDは変更しない。

| 対象 | 形式 | 例 |
|---|---|---|
| 作家 | ローマ字（姓-名、ヘボン式、長音記号なし） | `authors.html#dazai-osamu` |
| 作品 | 作品名のローマ字 | `works.html#ningen-shikkaku` |
| 単語帳の言葉 | `term-` ＋ ローマ字 | `glossary.html#term-buraiha` |
| 年表の出来事 | `ev-年-内容` | `timeline.html#ev-1935-first-akutagawa-prize` |
| 問題 | `q-4桁連番` | `quiz.html#q-0003` |

## 4. 記事の追加方法

### 作家を追加する（`authors.html`）

該当する時代の `<section>` に、次の形で追加する。目次（`.toc`）にもリンクを追加する。

```html
<article class="card person" id="ローマ字ID">
  <h3>作家名<span class="kana">よみがな</span></h3>
  <div class="points">
    <p class="points-title">覚えておきたいポイント</p>
    <ul><li>問題を解くために必要な知識を、短く箇条書きで</li></ul>
  </div>
  <dl class="facts">
    <div><dt>生没年</dt><dd>1867〜1916年</dd></div>
    <div><dt>出身地</dt><dd>…（現在の…）</dd></div>
    <div><dt>国籍</dt><dd>日本</dd></div>
    <div><dt>本名</dt><dd>…</dd></div>
    <div><dt>分野</dt><dd>小説家</dd></div>
    <div><dt>活動した時代</dt><dd>明治時代・大正時代</dd></div>
    <div><dt>文学的立場・形式</dt><dd><a href="glossary.html#term-…">…</a></dd></div>
  </dl>
  <p>紹介文（独自執筆）</p>
  <h4>主な作品</h4>
  <ul class="list"><li><a href="works.html#…">『…』</a><span class="muted">（1905年・長編小説）</span></li></ul>
  <h4>関係する人物</h4>
  <ul class="list rel-list"><li><strong><a href="authors.html#…">…</a></strong><span class="tag">師弟</span>説明</li></ul>
  <h4>文学史上の出来事</h4>
  <ul class="list"><li><a href="timeline.html#ev-…">1916年　…</a></li></ul>
</article>
```

作家を追加したら、次のページも合わせて更新する。

- `works.html`：その作家の作品
- `timeline.html`：誕生と作品の発表
- `relations.html`：人物関係（SVGと説明リスト）。相手の作家の「関係する人物」にも同じ関係を書く
- `glossary.html`：関連する用語の「関連する人物」

### 作品を追加する（`works.html`）

```html
<article class="card work" id="ローマ字ID">
  <h3>『作品名』<span class="kana">よみがな</span></h3>
  <p class="meta">作者：<a href="authors.html#…">…</a>　／　発表：1905年（補足）　／　長編小説</p>
  <p>あらすじ（独自執筆）</p>
  <p class="related">関連用語：<a href="glossary.html#…">…</a></p>
</article>
```

### 人物相関図に線を追加する（`relations.html`）

- 人物の箱：`<a href="authors.html#ID"><rect class="node" x y width="118" height="40" rx="8"/><text class="nlabel" x y>名前</text></a>`
- 線：`<line class="edge e-種類" x1 y1 x2 y2 marker-end="url(#arrow-種類)"/>`（向きのある関係のみ `marker-end` を付ける）
- 線の上の文字：`<text class="elabel" x y>ラベル</text>`

| 種類（クラス名） | 意味 | 向き |
|---|---|---|
| `e-parent_child` | 親子 | 親 → 子 |
| `e-mentor_student` | 師弟 | 師 → 弟子 |
| `e-admiration` | 敬愛・愛読 | 敬愛する側 → される側 |
| `e-friendship` | 友人・仲間 | なし |
| `e-support` | 見出す・後押し | 後押しした側 → された側 |
| `e-conflict` | 対立・確執 | なし |
| `e-same_movement` | 同じ文学的立場 | なし |

### 問題を追加する（`quiz.html`）

問題はすべてオリジナルで作る（実際の入試問題の文章・選択肢の組み合わせを使わない）。該当する分類の `<section>` に追加する。

```html
<article class="card quiz" id="q-0017">
  <p class="meta"><span class="tag">分類</span><span class="tag">形式</span><span class="stars" aria-label="むずかしさ2">★★☆</span></p>
  <h3>問17</h3>
  <p>問題文</p>
  <ol class="choices"><li>…</li><li>…</li><li>…</li><li>…</li></ol>
  <details>
    <summary>答えと解き方を見る</summary>
    <ol class="steps">
      <li><p class="step-title">問題文の手掛かり</p><ul><li>…</li></ul></li>
      <li><p class="step-title">必要な知識</p><ul><li>…</li></ul></li>
      <li><p class="step-title">考え方</p><p>…</p></li>
      <li><p class="step-title">答え</p><p class="answer">ア　…</p></li>
    </ol>
    <p class="related">くわしく：<a href="authors.html#…">…</a></p>
  </details>
</article>
```

分類（`<section>` の id）：作家と作品（`c-work`）／文学史・年代（`c-era`）／作家のプロフィール（`c-profile`）／作家どうしの関係（`c-relation`）／文学のエピソード（`c-episode`）／文学の考え方（`c-theory`）／文学の種類（`c-genre`）／俳句・短歌（`c-poem`）／俳人どうしの関係（`c-poet`）

問題を追加したら、関係する作家ページの「この作家が出てくる問題」と、単語帳の「問題」リンクも更新する。

## 5. 単語帳と、むずかしい言葉へのリンク

読者は中学受験をする小学生。本文に出てくるむずかしい言葉は、単語帳の説明にリンクする。

- リンクの書き方：`<a class="word" href="glossary.html#term-anti-naturalism">反自然主義</a>`（点線の下線で表示される）
- 本文に出てくる作家名も、作家一覧（`<a class="person" href="authors.html#…">`）や海外の作家ページへリンクする
- 同じ段落の中では、同じ言葉は最初の1回だけリンクする
- 単語帳にない言葉がむずかしいときは、単語帳に追加するか、本文をやさしい言い方に書き直す（例：「門下」→「弟子」）
- 学習上とくに大切な言葉には、見出しに `<span class="badge">とくに大切</span>` を付ける
- 単語帳の記事は次の形で書く

```html
<article class="card term" id="term-…">
  <h3>言葉<span class="kana">よみがな</span></h3>
  <p class="short"><span class="label">ひとことで言うと</span>短い説明</p>
  <p>くわしい説明</p>
  <p class="diff"><span class="label">にている言葉とのちがい</span>…</p>
  <p class="related">作家：<a href="authors.html#…">…</a>　／　あわせて読む：<a class="word" href="glossary.html#term-…">…</a></p>
</article>
```

## 6. 事実確認の印

未確認の内容には、該当する `<article>` の中に HTML コメントで印を付ける（画面には表示されない）。

```html
<!-- 要確認: 執筆年・初出年・初出誌を確認する。 -->
```

`grep -rn "要確認" *.html` で一覧できる。公開前にすべて解消する。

## 7. コミット前のチェック

学校名や過去問の情報が混入していないかを確認する。

```sh
grep -rn -E "年度|過去問|出題|入試" *.html
```

内部資料 `internal/blocklist.txt` に書いた語（学校名など）でも検索する。

```sh
grep -rn -f internal/blocklist.txt *.html docs/
```
