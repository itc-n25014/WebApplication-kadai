# ドラゴンクエスト作品紹介サイト

ドラゴンクエストシリーズのナンバリング作品を紹介するサイトです。
https://web-application-kadai-sandy.vercel.app/

## 主な機能

-**作品一覧表示**: ドラゴンクエストシリーズの各作品をカード形式で一覧表示します。
-**作品詳細表示**: 各作品のメイン画像、発売時期、ストーリーを表示します。
-**キャラクター図鑑**: 作品ごとに登場キャラクターを全身画像付きでグリッド表示します。
-**おすすめBGMリンク**: リッチエディタを通じて、YouTubeなどへのリンク付きBGM紹介が可能です。

## 使用技術

-Next.js (App Router)

- CSS Modules
- microCMS
- Vercel
- TypeScript

## ディレクトリ構成
```text
dragonquest-introduction/
├── app/
│ ├── globals.css # 全体のスタイル設定（ホバー演出など）
│ ├── layout.tsx # 共通のレイアウト（フォント設定など）
│ ├── page.tsx # トップページ（作品一覧画面）
│ └── series/
│ └── [id]/
│ └── page.tsx # 各作品の詳細・キャラクター図鑑画面
├── lib/
│ └── microcms.ts # microCMSとの通信設定・APIクライアント
├── public/ # 画像やファビコンなどの静的ファイル
├── .env.local # 環境変数
├── next.config.js # Next.jsの設定ファイル
├── package.json # プロジェクトの依存関係
└── README.md
