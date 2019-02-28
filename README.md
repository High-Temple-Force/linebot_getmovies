# LINE BOT _ getmovies
### 要旨
映画ドットコムからスクレイピングしたデータをDatastoreへ、
そこからデータ取得しLINE Botで返信する。

### 環境
- GCP
  - Cloud Functions
  - Google Datastore
- LINE Messaging API

### 手順
1. LINE Bot アカウント作成
2. GCPアカウント作成
3. Datastore
4. GCF 
5. 必要モジュールインストール
6. Node.jsで書いていく
   1. スクレイピング処理
   2. Datastoreからデータ取得 + LINE Bot API へリプライ処理
7. デプロイ 
8. 友達登録して、運用！

### 環境
- Cloud Functions

- Google Datastore

- LINE Messaging API


### インストール
```
$ npm init -y
$ npm install --save @google-cloud/datastore
$ npm install --save cheerio 
$ npm install --save request
$ npm install --save @line/bot-sdk

```

### Datastoreにデータを登録する
Cloud API に対し、認証を行う
[ここ](https://cloud.google.com/docs/authentication/getting-started?hl=ja)参照


### Cloud Functions
```
$ gcloud functions deploy function-2 --set-env-vars foo=bar
```
### テスト
Mochaを使用
```
$ npm i -g mocha
```