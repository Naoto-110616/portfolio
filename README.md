# Zexora Starter Package

`Next.js + Contentful + Resend + TanStack Query` を前提にしたスターターパッケージです。デザイン実装だけを手作業で差し替え、CMS 連携・問い合わせ送信・クライアントデータ取得基盤・デプロイ手順はそのまま使える状態を目指しています。

## Included

- Next.js 16 App Router
- TypeScript strict mode
- Tailwind CSS
- Contentful fetch layer with fallback content
- Resend contact API route
- TanStack Query provider and sample dashboard
- Environment variable validation and `.env.example`
- Vercel deployment-ready scripts

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、以下を確認できます。

- Contentful の接続状態とフォールバック表示
- TanStack Query による Integration Status の取得
- Resend 送信用の問い合わせフォーム

## Environment Variables

`.env.example` をベースに、以下を設定してください。

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_ENVIRONMENT=master

RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=hello@your-domain.com
CONTACT_TO_EMAIL=team@your-domain.com
```

### Contentful

- `CONTENTFUL_SPACE_ID`: 対象 Space の ID
- `CONTENTFUL_ACCESS_TOKEN`: Content Delivery API Token
- `CONTENTFUL_ENVIRONMENT`: 通常は `master`

補足:

- 取得対象の Content Model は固定していません
- 公開済み Entry を新しい順に取得し、`title` / `name` / `headline` など代表的なフィールド名から表示用データを組み立てます
- Entry がない場合や接続失敗時はローカルのフォールバックカードを表示します

### Resend

- `RESEND_API_KEY`: Resend の API Key
- `RESEND_FROM_EMAIL`: 送信元メールアドレス
- `CONTACT_TO_EMAIL`: 問い合わせ受信先メールアドレス

補足:

- フォーム送信先は `src/app/api/contact/route.ts`
- バリデーションは `src/lib/contact/schema.ts` で管理しています
- 設定不足時は API がエラーを返すため、デプロイ後も設定漏れを検出しやすい構成です

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Project Structure

```text
src/
  app/
    api/
      contact/route.ts
      status/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    home/
    providers/
  lib/
    contact/
    contentful/
    resend/
    env.ts
```

## Deploy To Vercel

1. リポジトリを Vercel に接続する
2. Environment Variables に `.env.example` の値を登録する
3. Build Command は `npm run build`、Install Command は `npm install` のままで問題ありません
4. デプロイ後にトップページと `/api/status`、問い合わせフォームを確認する

## Design Replacement Guide

- レイアウト差し替えの入口は `src/app/page.tsx`
- 共通 Provider は `src/app/layout.tsx`
- Contentful 取得処理は `src/lib/contentful/queries.ts`
- Resend 送信処理は `src/app/api/contact/route.ts`
- クライアントクエリの例は `src/components/home/integration-status.tsx`

## Build Notes

- Contentful 未設定でもビルドはフォールバックで通るようにしています
- Resend のキー未設定時は問い合わせ API の呼び出し時に失敗します
- 環境変数に不正な URL やメールアドレス形式を入れた場合は起動時に検知します
