/**
 * モデルが Markdown 風に出力した場合の表示用に整える（プレーンテキスト前提の UI 向け）。
 */
export function stripMarkdownDecorations(text: string): string {
	return (
		text
			// **太字** → 内側の文字だけ
			.replace(/\*\*(.+?)\*\*/g, "$1")
			// 行頭の * 箇条書き → 「・」
			.replace(/^\s*\*\s+/gm, "・ ")
			// 行頭の # 見出し
			.replace(/^#{1,6}\s+/gm, "")
	);
}
