# QuarterFull 📚

あらゆる学習を1つにまとめる、シンプルな暗記(フラッシュカード)学習アプリです。
サーバー不要・完全にブラウザだけで動く静的サイトなので、GitHub Pages などにそのまま公開できます。

## 主な機能

- デッキ(単語帳)ごとのフラッシュカード学習
- ○×判定による正誤記録と、簡易的な間隔反復(スペースドリピティション)
  - 前回間違えたカードや、復習期限が近い/過ぎたカードを優先的に出題
- デッキ・カードの追加/編集/削除(サイドバーの「＋」ボタン、各デッキの✏️/🗑️ボタンから)
- **CSV(Excel)でのカード一括インポート/エクスポート**
  - カード管理画面の「📥 CSVから追加」から、Excel等で作成したCSVファイルを取り込み、
    1列目=単語、2列目=意味、3列目=例文(英語)、4列目=例文の日本語訳
    として一括でカードを追加できます(1行目は見出し行でもOK、3・4列目は省略可)
  - 「📤 CSVで書き出す」で、デッキ内のカードをCSVとしてダウンロードできます(Excelでそのまま開けます)
  - 「テンプレートをダウンロード」から、書式の分かるサンプルCSVを入手できます
- **発音の読み上げ(🔊)**
  - 学習画面の単語・例文の横にある🔊ボタンを押すと、Web Speech APIでその場で読み上げます
  - 日本語の意味・訳文は読み上げず、英単語と例文(英語)のみを読み上げます
  - 対応ブラウザ(Chrome/Edge/Safari等)であれば追加設定不要で動作します
  - ヘッダーの「🔊速度」から読み上げ速度(0.5倍〜2.0倍)を変更できます(設定は保存され次回も反映されます)
- 学習完了画面(正答率の表示、「もう一度」「デッキ一覧に戻る」)
- ダッシュボード(今日の学習数・正答率・連続学習日数)
- ライト/ダークテーマ切り替え
- 学習データのバックアップ書き出し/読み込み(JSON)
- オフライン対応(PWA / Service Worker によるキャッシュ)
- ホーム画面に追加してアプリのように起動可能(PWA)

## 技術構成

- HTML / CSS / JavaScript(フレームワーク不使用のVanilla JS)
- データ保存は `localStorage`(バックエンド・データベース不要)
- ビルド不要。静的ファイルをそのまま配信するだけで動作します

```
QuarterFull/
├── index.html          # エントリーポイント
├── manifest.json        # PWAマニフェスト
├── sw.js                 # Service Worker(オフラインキャッシュ)
├── favicon.ico
├── icons/                # アプリアイコン各種
├── css/
│   └── style.css
├── js/
│   ├── app.js            # 初期化・イベント統括
│   ├── ui.js              # DOM描画・UI操作
│   ├── lesson.js          # 学習ロジック(出題順・進捗)
│   ├── storage.js         # localStorage永続化・間隔反復アルゴリズム
│   └── deckManager.js    # デッキ/カードCRUD用モーダル
└── data/
    └── sample.json        # 組み込みのサンプルデッキ
```

## ローカルでの動作確認

ブラウザの `fetch` を使ってJSONを読み込むため、`index.html` を直接ファイルとして
開くのではなく、簡易サーバー経由で開いてください。

```bash
# プロジェクトのルートで
python3 -m http.server 8000
# → http://localhost:8000 をブラウザで開く
```

Node.js がある場合は `npx serve` などでも構いません。

## GitHub Pages への公開手順

1. GitHub で新しいリポジトリを作成します(例: `quarterfull`)。
2. このフォルダの中身一式をリポジトリのルートに push します。

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/【あなたのユーザー名】/quarterfull.git
   git push -u origin main
   ```

3. GitHub のリポジトリページで **Settings → Pages** を開きます。
4. "Build and deployment" の Source を **Deploy from a branch** にし、
   Branch を `main` / フォルダを `/ (root)` に設定して **Save** します。
5. 数分待つと `https://【あなたのユーザー名】.github.io/quarterfull/` で公開されます。

> 補足: このアプリ内のファイル参照はすべて相対パスなので、
> `https://ユーザー名.github.io/リポジトリ名/` のようなサブパス配下でもそのまま動作します。

### 公開前のチェックリスト

- [ ] `data/sample.json` の内容を、公開したいデッキ内容に差し替える(任意)
- [ ] `manifest.json` の `name` / `short_name` / `theme_color` を必要に応じて調整
- [ ] `index.html` の `<title>` / OGP用メタタグ(og:title, og:description など)を確認
- [ ] `icons/` のアイコン画像を、必要であれば自作のロゴに差し替え
- [ ] スマートフォン・PC 両方のブラウザで一通り操作して確認
- [ ] 一度キャッシュ(Service Worker)を有効化した後、機能追加をした場合は
      `js/sw.js` の `CACHE_VERSION` を上げてキャッシュを更新する

## 学習データについて

学習の進捗・履歴・作成したデッキはすべて**ブラウザの localStorage** に保存されます。
そのため:

- サーバーやアカウント登録は不要です
- 別のブラウザ/端末とはデータが共有されません(必要であればヘッダーの
  ⬇️ エクスポート / ⬆️ インポート機能でJSONファイルとして移行してください)
- ブラウザのデータ削除(キャッシュクリア)を行うと学習データも消えるのでご注意ください

## ライセンス

MIT License. 詳細は [LICENSE](./LICENSE) を参照してください。
