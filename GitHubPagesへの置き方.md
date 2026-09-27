# GitHub Pages への置き方（麻雀 スマホ版）

バトルシップのスマホ版（`gyokusen/battleship-android`）と**同じ流れ**です。

> **先に確認**：GitHub Free では **public（公開）リポジトリでないと Pages は使えません**。
> 中身はゲームだけで、職場の情報は入っていません。
> `snd` の音は元の Cell_Jong（Gen Muto 氏）の wav です。公開の場所に置くことになるので、
> 気になる場合は `snd` フォルダを外して上げてください（外しても音が鳴らないだけで遊べます）。

## 0. 入れ物の名前は別にしてあります

同じ `gyokusen.github.io` に置くほかのアプリとぶつからないよう、

- 設定・途中の保存・成績（localStorage）の名前 … `mahjong_ui` / `mahjong_len` / `mahjong_save` / `mahjong_stats`
- オフライン用の控え（sw.js の CACHE） … `mja-v1`（バトルシップは `bsa-v1`）

にしてあります。

## 1. リポジトリを作る

1. GitHub で **New repository**
2. 名前：`mahjong-android`
3. **Public** を選ぶ（README などは付けない＝空のまま）
4. Create repository

## 2. 上げる（コミットはこちらで作ってあります）

Git Bash で：

```
cd /c/Users/Public/クロード/T24_麻雀/android
git remote add origin https://github.com/gyokusen/mahjong-android.git
git push -u origin main
```

上がるもの：`index.html` / `manifest.webmanifest` / `sw.js` / `icon/` 3枚 / `snd/` 35個 / この手引き・手引書 / `.gitignore`

## 3. Pages を有効にする

リポジトリの **Settings → Pages** → Source：**Deploy from a branch** → Branch：**main** / **(root)** → Save。
1〜2分で https://gyokusen.github.io/mahjong-android/ が開けるようになります。

## 4. スマホに入れる

スマホの Chrome で上のURLを開き、メニュー →［ホーム画面に追加］（または［アプリをインストール］）。
ホーム画面から開くと全画面の横向きで開きます。

## 版を上げるとき

- `index.html` だけを直したときは CACHE を変えなくてよい（画面は毎回取りに行く）
- `snd` やアイコン・manifest を変えたときは sw.js の CACHE を `mja-v2` のように上げる
- 画面は PC版と同じ中身（T24_麻雀 の engine.js / game.js）から作っています
