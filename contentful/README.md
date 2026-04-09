# Contentful Model Management

このディレクトリでは、`Contentful` のコンテンツモデルをコードベースで管理します。

## Structure

```text
contentful/
  config/
    env.ts
  migrations/
    001-create-site-settings.ts
    002-create-project.ts
    003-create-service-and-services-section.ts
    004-create-about-block-and-about-section.ts
    005-create-home-page.ts
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

公開データの取得には既存の `CONTENTFUL_ACCESS_TOKEN` を使い、モデル定義の反映には `CONTENTFUL_MANAGEMENT_TOKEN` を使います。

## Run migrations

```bash
npm run contentful:migrate -- --yes
```

`--yes` を付けない場合は、`contentful-migration` の確認プロンプトが表示されます。

途中まで成功した migration 以降だけを再実行したい場合は `--from` を使えます。

```bash
npm run contentful:migrate -- --from=004-create-about-block-and-about-section --yes
```

## Managed content types

- `siteSettings`
- `project`
- `service`
- `servicesSection`
- `aboutBlock`
- `aboutSection`
- `homePage`

## Object field shapes

`siteSettings.headerLinks`, `siteSettings.socialLinks`, `homePage.heroItems` は Object field です。入力する JSON は以下の形を想定しています。

```json
{
	"items": [{ "label": "Work", "href": "#work" }]
}
```

```json
{
	"items": [{ "label": "Name:", "value": "Naoto Ôkawa" }]
}
```

運用上は singleton 想定の Content Type も、Contentful では 1 entry 制約がないため、各 type につき 1 件だけ published 状態にするルールで管理します。
