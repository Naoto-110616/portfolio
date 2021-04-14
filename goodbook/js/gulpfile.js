// plug-in
var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var sass = require("gulp-sass");
var changed = require("gulp-changed");
var imagemin = require("gulp-imagemin");

// gulpタスクの作成
// gulp.task()を使う
// 第一引数に任意のタスク名、第二引数に実行したい処理をfunction関数で渡してあげる
// 関数内ではpipe()で処理を繋ぐ(jQueryのメソッドチェーンと同じ)

// CSS圧縮
gulp.task("minify-css", function () {
	return gulp
		.src("../src/css/*.css")
		.pipe(minifycss())
		.pipe(gulp.dest("../dist/css/"));
});

// defaultで動かすタスクを指定
// defaultに設定しておくとgulpコマンドだけでタスクが実行される
// 書き方は第二引数に配列でタスクを指定する
// gulp.task("default",["タスク名","タスク名","タスク名",...]);
gulp.task("default", gulp.task("minify-css"));

// sassをコンパイル
gulp.task("sass", function () {
	return gulp
		.src("../scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("../dist/css/"));
});
gulp.task("sass_top_page", function () {
	return gulp
		.src("../../sass/portfolio_style.scss")
		.pipe(sass())
		.pipe(gulp.dest("../../dist/css/"));
});
gulp.task("sass_practice", function () {
	return gulp
		.src("../../practice/scss/app.scss")
		.pipe(sass())
		.pipe(gulp.dest("../../practice/dist/css/"));
});

// 画像圧縮
// 圧縮前と圧縮後のlディレクトリを定義
var paths = {
	srcDir: "src",
	dstDir: "uploads",
};
// jpg,png,gif画像の圧縮タスク
gulp.task("imagemin", function () {
	var srcGlob = paths.srcDir + "/**/*.+(jpg|jpeg|png|gif)";
	var dstGlob = paths.dstDir;
	return gulp
		.src(srcGlob)
		.pipe(changed(dstGlob))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ progressive: true }),
				imagemin.optipng({ optimizationLeval: 5 }),
			])
		)
		.pipe(gulp.dest(dstGlob));
});

// Gulpを使ったファイルの監視
// watch()を使う
// 第一引数は監視したいディレクトリ配下
// 第二引数に変更があった場合に実行するタスクを配列形式で指定
gulp.task("watch_imagemin", function () {
	return gulp.watch(paths.srcDir + "/**/*", gulp.task("imagemin"));
});
gulp.task("watch_scss_compile_goodbook_page", function () {
	return gulp.watch("../scss/*.scss", gulp.task("sass"));
});
gulp.task("watch_scss_compile_top_page", function () {
	return gulp.watch(
		"../../sass/portfolio_style.scss",
		gulp.task("sass_top_page")
	);
});
gulp.task("watch_scss_compile_practice", function () {
	return gulp.watch("../../practice/scss/app.scss", gulp.task("sass_practice"));
});
