# react-portfolio

Next.js + Contentful + TanStack Query のポートフォリオ構成です。

## セットアップ

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## 構成

- `GET /api/projects`: Contentful の `project` 一覧を返すAPI
- `src/components/providers/query-provider.tsx`: TanStack Query Provider
- `src/components/projects-list.tsx`: `useQuery` で `/api/projects` を取得

## 必要な環境変数

`.env.local` に以下を設定してください。

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` (preview利用時)
- `CONTENTFUL_ENVIRONMENT` (通常は `master`)
- `CONTENTFUL_USE_PREVIEW` (`true/false`)
