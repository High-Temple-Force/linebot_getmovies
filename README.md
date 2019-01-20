# LINE BOT _ getmovies

### 環境
- Google Functions

- Google Datastore

- LINE Messaging API


### インストール
```
$ npm init -y
$ npm install --save @google-cloud/datastore
$ npm install --save cheerio 
$ npm install --save request

```

### Datastoreにデータを登録する
getmovies.js
Cloud API に対し、認証を行う
[ここ](https://cloud.google.com/docs/authentication/getting-started?hl=ja)参照

### テスト
Mochaを使用
```
$ npm i -g mocha
```