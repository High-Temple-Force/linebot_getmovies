# LINE BOT _ getmovies
### 要旨
[映画ドットコム](https://eiga.com/now/all/rank/)からスクレイピングしたデータをDatastoreへ、
そこからデータ取得しLINE Botで返信する。
サーバーレス構成。

### 環境
- GCP
  - Cloud Functions(GCF)
  - Datastore
  - Cloud Scheduler
- LINE Messaging API

### 手順
1. LINE Bot アカウント作成
2. GCPアカウント作成
3. 必要モジュールインストール
4. Node.jsで書いていく
   1. スクレイピング処理 on GCF
   2. Datastoreからデータ取得 + LINE Bot API へリプライ処理 on GCF
5. デプロイ 
6. Cloud Scheduler 設定
7. 友達登録して、運用！

### 環境
- Cloud Functions

- Google Datastore

- LINE Messaging API


### インストール
```
$ npm init -y
$ npm install --save @google-cloud/datastore
$ npm install --save cheerio 
$ npm install --save @line/bot-sdk

```


### Cloud Functions
環境変数の設定方法 Via gcloud コマンド
```
$ gcloud functions deploy function-2 --set-env-vars foo=bar
```
### テスト
Mochaを使用
```
$ npm i -g mocha
```

### QR 
友達登録してもらえれば、なにかメッセージを送るだけで映画のタイトルを教えてくれます！

<img width="176" alt="スクリーンショット 2019-03-17 16 26 50" src="https://user-images.githubusercontent.com/40015780/54486873-ae3b5700-48d1-11e9-9bfa-31d303a99afc.png">
