# 05. 作家の写真（取り込み待ち）

作家一覧（`authors.html`）の写真に使う画像の候補。すべてウィキメディア・コモンズで **Public domain** と表示されているもの（日本の古い写真〈PD-Japan-oldphoto〉、または作者の死後長い年月がたった絵）。

> 2026-11-12 時点：この作業環境からの取得は、ウィキメディア側のアクセス制限（429）で失敗したため、まだ取り込めていない。現在は全員を「名前の一文字アイコン」で表示している。

## 取り込みの手順

1. 下の表のコモンズのページを開き、元画像をダウンロードする
2. 横幅240pxに縮小し、`images/authors/<保存名>` に保存する（JPEG）
3. `authors.html` の該当作家の `<div class="portrait mono …">…</div>` を、次の形に置きかえる

```html
<figure class="portrait"><img src="images/authors/natsume-soseki.jpg" alt="夏目漱石の写真" width="240" height="（縮小後の高さ）" loading="lazy"><figcaption><a href="#photo-credits">1912年ごろ</a></figcaption></figure>
```

4. `authors.html` の最後の「アイコンについて」を「写真について」に変え、使った写真ごとに出典（ファイル名・撮影年・コモンズへのリンク・Public domain）を書く
5. 撮影年が1957年以降のもの、ライセンスが Public domain 以外のものは使わない

## 候補一覧

| 作家 | 保存名 | コモンズのファイル | 撮影・制作年 | 撮影者・作者 | ライセンス |
|---|---|---|---|---|---|
| 松尾芭蕉 | `matsuo-basho.jpg` | [Matsuo Basho by Sugiyama Sanpu.jpg](https://commons.wikimedia.org/wiki/File%3AMatsuo_Basho_by_Sugiyama_Sanpu.jpg) | 江戸時代 | 杉山杉風（芭蕉の弟子） | Public domain（肖像画） |
| 坪内逍遥 | `tsubouchi-shoyo.jpg` | [Shoyo Tsubouchi cropped.jpg](https://commons.wikimedia.org/wiki/File%3AShoyo_Tsubouchi_cropped.jpg) | before 1935| 不明 | Public domain（写真） |
| 二葉亭四迷 | `futabatei-shimei.jpg` | [Futabatei Shimei in 1908.jpg](https://commons.wikimedia.org/wiki/File%3AFutabatei_Shimei_in_1908.jpg) | Taken in 1908 | 不明 | Public domain（写真） |
| 森鷗外 | `mori-ogai.jpg` | [Mori Ogai (cropped).jpg](https://commons.wikimedia.org/wiki/File%3AMori_Ogai_%28cropped%29.jpg) | Taken in June 1899 | Ohashi Otowa (大橋乙羽, 1869 – 1901) | Public domain（写真） |
| 夏目漱石 | `natsume-soseki.jpg` | [Natsume Soseki photo.jpg](https://commons.wikimedia.org/wiki/File%3ANatsume_Soseki_photo.jpg) | 1912-09 | Ogawa Kazumasa（小川一真） | Public domain（写真） |
| 正岡子規 | `masaoka-shiki.jpg` | [Masaoka Shiki.jpg](https://commons.wikimedia.org/wiki/File%3AMasaoka_Shiki.jpg) | 1900年撮影 | 不明 | Public domain（写真） |
| 島崎藤村 | `shimazaki-toson.jpg` | [Toson Shimazaki 01.jpg](https://commons.wikimedia.org/wiki/File%3AToson_Shimazaki_01.jpg) | 1935-12 | 不明 | Public domain（写真） |
| 田山花袋 | `tayama-katai.jpg` | [Tayama Katai, September 1915.jpg](https://commons.wikimedia.org/wiki/File%3ATayama_Katai%2C_September_1915.jpg) | September 1915 | Unknown photographer | Public domain（写真） |
| 与謝野晶子 | `yosano-akiko.jpg` | [YOSANO Akiko (cropped).jpg](https://commons.wikimedia.org/wiki/File%3AYOSANO_Akiko_%28cropped%29.jpg) | before 1942| 不明 | Public domain（写真） |
| 志賀直哉 | `shiga-naoya.jpg` | [Shiga Naoya 1938.jpg](https://commons.wikimedia.org/wiki/File%3AShiga_Naoya_1938.jpg) | 1938-09 | 瀧井孝作 (Kōsaku TAKII, 1894-1984) | Public domain（写真） |
| 武者小路実篤 | `musha-no-koji-saneatsu.jpg` | [Saneatsu Mushanokōji.jpg](https://commons.wikimedia.org/wiki/File%3ASaneatsu_Mushanok%C5%8Dji.jpg) | 1951 | Unknown photographer | Public domain（写真） |
| 菊池寛 | `kikuchi-kan.jpg` | [Kan Kikuchi smoking.jpg](https://commons.wikimedia.org/wiki/File%3AKan_Kikuchi_smoking.jpg) | before 1948| 不明 | Public domain（写真） |
| 芥川龍之介 | `akutagawa-ryunosuke.jpg` | [Akutagawa Ryunosuke photo.jpg](https://commons.wikimedia.org/wiki/File%3AAkutagawa_Ryunosuke_photo.jpg) | 1926 | 不明 | Public domain（写真） |
| 荻原井泉水 | `ogiwara-seisensui.jpg` | [Ogiwara Seisensui.jpg](https://commons.wikimedia.org/wiki/File%3AOgiwara_Seisensui.jpg) | 1956-12-31 | 不明 | Public domain（写真） |
| 種田山頭火 | `taneda-santoka.jpg` | [Taneda Santoka 1.jpg](https://commons.wikimedia.org/wiki/File%3ATaneda_Santoka_1.jpg) | before 11 October 1940 date QS | 不明 | Public domain（写真） |
| 尾崎放哉 | `ozaki-hosai.jpg` | [Ozaki Hosai 1.jpg](https://commons.wikimedia.org/wiki/File%3AOzaki_Hosai_1.jpg) | before 7 April 1926| 不明 | Public domain（写真） |
| 横光利一 | `yokomitsu-riichi.jpg` | [Riichi Yokomitsu 01.jpg](https://commons.wikimedia.org/wiki/File%3ARiichi_Yokomitsu_01.jpg) | 1937-02 | 不明 | Public domain（写真） |
| 川端康成 | `kawabata-yasunari.jpg` | [Yasunari Kawabata 1938.jpg](https://commons.wikimedia.org/wiki/File%3AYasunari_Kawabata_1938.jpg) | 1938 | 不明 | Public domain（写真） |
| 坂口安吾 | `sakaguchi-ango.jpg` | [Ango Sakaguchi (cropped).jpg](https://commons.wikimedia.org/wiki/File%3AAngo_Sakaguchi_%28cropped%29.jpg) | 1946-12 | <span title | Public domain（写真） |
| 太宰治 | `dazai-osamu.jpg` | [Osamu Dazai.jpg](https://commons.wikimedia.org/wiki/File%3AOsamu_Dazai.jpg) | Published in（コモンズのページで確認）| <a href="https://en.wikipedia.org/wiki/e | Public domain（写真） |
| 三島由紀夫 | `mishima-yukio.jpg` | [Yukio Mishima, 1955 (cropped).jpg](https://commons.wikimedia.org/wiki/File%3AYukio_Mishima%2C_1955_%28cropped%29.jpg) | 1955-01-15 | <span title="Japanese pho | Public domain（写真） |

良寛・津島佑子は、使える画像が見つからなかったためアイコンのままにする。

