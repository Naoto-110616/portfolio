# Contentful Model Management

このディレクトリでは、`Contentful` のコンテンツモデルをコードベースで管理します。

## Structure

```text
contentful/
  config/
    env.ts
  migrations/
    001-create-projects.ts
    002-create-services.ts
    003-create-sns-links.ts
    004-create-contact.ts
  scripts/
    migrate.ts
```

## Required environment variables

`.env` または `.env.local` に以下を設定します。`contentful:migrate` は `Next.js` と同じ方法で env を自動読込します。

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_MANAGEMENT_TOKEN=your_content_management_token
```

公開データの取得には `CONTENTFUL_DELIVERY_ACCESS_TOKEN` を使い、モデル定義の反映には `CONTENTFUL_MANAGEMENT_TOKEN` を使います。

## Run migrations

```bash
npm run contentful:migrate -- --yes
```

`--yes` を付けない場合は、`contentful-migration` の確認プロンプトが表示されます。

途中まで成功した migration 以降だけを再実行したい場合は `--from` を使えます。

```bash
npm run contentful:migrate -- --from=003-create-sns-links --yes
```

## Managed content types

- `projects`
- `services`
- `snsLinks`
- `contact`

## Field definitions

### `projects`

- `img`: Asset
- `tag`: Symbol
- `title`: Symbol
- `url`: Symbol
- `description`: Text
- `with`: Symbol
- `published`: Date
- `role`: Symbol
- `stack`: Symbol array

### `services`

- `title`: Symbol
- `point`: Symbol array

### `snsLinks`

- `title`: Symbol
- `url`: Symbol

### `contact`

- `title`: Symbol
- `description`: Text
- `email`: Symbol

## App-side usage

- `projects`: Work / More Projects セクションで使用
- `services`: Services セクションで使用
- `snsLinks`: フッターのSNSリンクで使用
- `contact`: フッターのメールアドレスで使用
- `hero` / `about` / `chat` / ヘッダーリンク / サイトメタデータは現在コード内定数で管理

## Initial content notes

- `contact` は singleton 想定です。運用上は 1 件だけ published にしてください。
- `projects` は `published` の新しい順で並びます。Work には先頭3件、More Projects には4件目以降を表示します。
- `services` と `snsLinks` は作成順で表示します。
