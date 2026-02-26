# ドラゴンクエスト作品紹介サイト

ドラゴンクエストシリーズのナンバリング作品を紹介するサイトです。
https://web-application-kadai-sandy.vercel.app/

## 🚀 主な機能

* **作品一覧表示**: シリーズ作品をカード形式で一覧表示。ホバー時のアニメーション付き。
* **作品詳細表示**: 各作品のメイン画像、発売時期、ストーリーを表示。
* **キャラクター図鑑**: 作品ごとの登場キャラクターを全身画像付きでグリッド表示。
* **おすすめBGMリンク**: YouTube等へのリンク付きでBGMを紹介。

## 🛠 使用技術

* **Next.js** (App Router)
* **TypeScript**
* **microCMS** (ヘッドレスCMS)
* **Tailwind CSS** & **Custom CSS**
* **Vercel** (デプロイ環境)

## 📂 ディレクトリ構成

```text
dragonquest-introduction/
├── app/                  # メインの画面（ページ）
│   ├── layout.tsx        # 共通レイアウト
│   ├── page.tsx          # トップページ（作品一覧）
│   ├── globals.css       # 全体のスタイル（ホバー演出等）
│   └── series/[id]/
│       └── page.tsx      # 作品詳細・キャラ図鑑
├── lib/
│   └── microcms.ts       # microCMS APIクライアント
├── public/               # 静的ファイル
├── .env.local            # 環境変数
├── next.config.js        # Next.js設定
└── README.md             # このファイル
