## desc
hosting: Cloudflare Pages
api: Cloudflare Pages Functions
DB: d1

https://zenn.dev/knmt/scraps/476d448eb5bbfb


## usage

### ローカルにD1作成
※ 一度dev起動で作成される
```sh
npm run dev
```

### ローカルのD1にテーブル作成
```sh
npm run db:create-table -- --local

npm run db:add-todo -- --local
```

### デプロイ
```sh
npm run deploy
```
