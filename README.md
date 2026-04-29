# Portfolio

大阪市平野区を拠点に活動するフロントエンドエンジニアの個人ポートフォリオサイトです。Next.js App Router を中心に、Contentful での実績・サービス管理、Resend による問い合わせ通知、Google Gemini を使ったチャット、Octopus Energy の月次電力使用量表示を組み込んでいます。

## 主な機能

- シングルページ構成のポートフォリオサイト
- Work / More Projects / Services / SNS リンクを Contentful から取得
- Contentful 未設定時もビルドできるフォールバックデータ
- Contact フォームの入力検証、Contentful への問い合わせ保存、Resend での通知メール送信
- Google Gemini API を使った `Pick My Brain!` チャット
- Octopus Energy API を使ったフッターの当月電力使用量表示
- Basic 認証による任意の公開制限
- SEO メタデータ、OGP、構造化データ、`sitemap.xml`、`robots.txt`
- Lenis / GSAP / Motion を使ったスクロール・表示アニメーション

## 技術スタック

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Contentful / Contentful Management API
- Resend
- TanStack Query
- Google Gemini API
- Octopus Energy API
- GSAP, Motion, Lenis
- Zod
- ESLint, Prettier

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

開発サーバー起動後、ブラウザで `http://localhost:3000` を開きます。

## Environment Variables

`.env.example` をベースに `.env.local` を作成してください。必須かどうかは利用する機能によって変わります。

### Site

- `NEXT_PUBLIC_SITE_URL`: サイト URL。未設定時は `http://localhost:3000`
- `BASIC_AUTH_ID`: Basic 認証 ID。`BASIC_AUTH_PASSWORD` と両方設定した場合のみ有効
- `BASIC_AUTH_PASSWORD`: Basic 認証パスワード

### Contentful

- `CONTENTFUL_SPACE_ID`: 対象 Space ID
- `CONTENTFUL_DELIVERY_ACCESS_TOKEN`: Content Delivery API Token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`: Preview API Token。必要に応じて設定
- `CONTENTFUL_ENVIRONMENT`: Environment ID。通常は `master`
- `CONTENTFUL_MANAGEMENT_TOKEN`: Content Management API Token。migration と問い合わせ保存で使用

Contentful からは `projects`, `services`, `snsLinks`, `contactFormSettings` を取得します。認証情報が未設定、または取得に失敗した場合はフォールバックデータを返します。

### Resend / Contact

- `RESEND_API_KEY`: Resend API Key
- `RESEND_FROM_EMAIL`: 通知メールの送信元
- `CONTACT_TO_EMAIL`: 問い合わせ通知の受信先

Contact フォームは `POST /api/contact` に送信されます。問い合わせは Contentful に保存したうえで Resend から通知します。

### Gemini

- `GEMINI_API_KEY`: Google AI Studio の API Key
- `GEMINI_MODEL`: 使用モデル。未設定時は `gemini-2.0-flash`

未設定時、チャット API は利用不可としてレスポンスを返します。

### Octopus Energy

- `OCTOPUSENERGY_EMAIL`: Octopus Energy ログインメール
- `OCTOPUSENERGY_PASSWORD`: Octopus Energy ログインパスワード
- `OCTOPUSENERGY_API_KEY`: API Key。必要に応じて設定
- `OCTOPUSENERGY_REFRESH_TOKEN`: Refresh Token。必要に応じて設定
- `OCTOPUSENERGY_GRAPHQL_URL`: GraphQL URL の上書き
- `OCTOPUSENERGY_ACCOUNT_NUMBER`: 対象アカウント番号。未設定時は viewer の最初のアカウント
- `OCTOPUSENERGY_TIMEZONE`: 電力使用量の集計タイムゾーン。未設定時は `Asia/Tokyo`

フッターの電気使用量表示は `GET /api/octopus/electricity-month` から取得します。Octopus Energy 連携が未設定の場合は何も表示しません。

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run fix
npm run contentful:migrate
```

`contentful:migrate` には `--yes` が含まれています。途中の migration から再実行したい場合は、次のように追加引数を渡します。

```bash
npm run contentful:migrate -- --from=003-create-sns-links
```

## API Routes

- `GET /api/status`: サイト URL と主要連携の設定状態を返す
- `POST /api/contact`: 問い合わせを検証し、Contentful に保存して Resend で通知する
- `POST /api/chat`: Gemini からチャット回答を取得する
- `GET /api/octopus/electricity-month`: 今月の電力使用量を kWh で返す
- `GET /api/contentful/projects`: Work / More Projects 用のプロジェクト一覧を返す
- `GET /api/contentful/services`: Services 用の一覧を返す
- `GET /api/contentful/sns-links`: フッター SNS リンクを返す
- `GET /api/contentful/contact-form-settings`: Contact フォームの設定を返す

## Project Structure

```text
src/
  app/
    api/
      chat/
      contact/
      contentful/
      octopus/
      status/
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    home/
    motion/
    providers/
    ui/
  lib/
    chat/
    contact/
    contentful/
    octopus/
    resend/
    env.ts
    site-content.ts
contentful/
  config/
  migrations/
  scripts/
middleware.ts
next.config.ts
```

## Content Management

Contentful のモデルは `contentful/migrations/` で管理しています。主な content type は次の通りです。

- `projects`: Work / More Projects に表示する実績
- `services`: Services に表示する提供内容
- `snsLinks`: フッターの SNS リンク
- `contactFormSettings`: Contact フォームの選択肢
- `contact`: Contact フォームから保存される問い合わせ

実績・サービス・SNS リンクは TanStack Query 経由で `/api/contentful/*` から取得します。About、Chat、ヘッダー、SEO メタデータなどの静的文言は `src/lib/site-content.ts` で管理しています。

## Deploy To Vercel

1. リポジトリを Vercel に接続する
2. `.env.example` を参考に、利用する機能に必要な Environment Variables を登録する
3. Build Command は `npm run build`、Install Command は `npm install` を使う
4. 必要に応じて `BASIC_AUTH_ID` と `BASIC_AUTH_PASSWORD` で公開前の Basic 認証を有効にする
5. デプロイ後にトップページ、`/api/status`、Contact フォーム、チャット、Octopus Energy 表示を確認する

## Build Notes

- Contentful 未設定でも、Work / Services / SNS / Contact フォーム設定はフォールバックでビルド可能です
- Contact フォームを本番利用するには Contentful Management API と Resend の設定が必要です
- Gemini 未設定時はチャット機能が利用不可になります
- Octopus Energy 未設定時は月次電力使用量を表示しません
- `NEXT_PUBLIC_SITE_URL` は metadata、OGP、sitemap、robots で使用します
- `next.config.ts` では Contentful と Figma の外部画像ドメインを許可しています
