/* 麻雀 スマホ版 — オフラインでも動くようにするための入れ物。
   版を上げたいときは CACHE の名前だけ変える（例 mja-v1 → mja-v2）。
   古い入れ物は activate のときに片づける。

   ★ 名前はほかのアプリ（bsa-* バトルシップ・eiw-* 英単語・wta-* 作業時間管理 など）と別にしてある。
     同じ gyokusen.github.io に置くので、名前がぶつかると片方の更新でもう片方の控えが消える。 */
const CACHE = "mja-v7";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon/icon-192.png",
  "./icon/icon-512.png",
  "./icon/icon-maskable-512.png",
  "./snd/beep/snd_chi.wav",
  "./snd/beep/snd_kan.wav",
  "./snd/beep/snd_noten.wav",
  "./snd/beep/snd_pon.wav",
  "./snd/beep/snd_reach.wav",
  "./snd/beep/snd_ron.wav",
  "./snd/beep/snd_tenpai.wav",
  "./snd/beep/snd_tumo.wav",
  "./snd/com/snd_chi.wav",
  "./snd/com/snd_kan.wav",
  "./snd/com/snd_noten.wav",
  "./snd/com/snd_pon.wav",
  "./snd/com/snd_reach.wav",
  "./snd/com/snd_ron.wav",
  "./snd/com/snd_tenpai.wav",
  "./snd/com/snd_tumo.wav",
  "./snd/man/snd_chi.wav",
  "./snd/man/snd_kan.wav",
  "./snd/man/snd_noten.wav",
  "./snd/man/snd_pon.wav",
  "./snd/man/snd_reach.wav",
  "./snd/man/snd_ron.wav",
  "./snd/man/snd_tenpai.wav",
  "./snd/man/snd_tumo.wav",
  "./snd/ol/snd_chi.wav",
  "./snd/ol/snd_kan.wav",
  "./snd/ol/snd_noten.wav",
  "./snd/ol/snd_pon.wav",
  "./snd/ol/snd_reach.wav",
  "./snd/ol/snd_ron.wav",
  "./snd/ol/snd_tenpai.wav",
  "./snd/ol/snd_tumo.wav",
  "./snd/se/snd_naki.wav",
  "./snd/se/snd_sute.wav",
  "./snd/se/snd_suteb.wav"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith("mja-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 画面のファイルは「まず取りに行って、だめなら控えを出す」（バトルシップと同じ）。
   GitHub Pages は HTML を10分キャッシュさせるので、画面そのものは no-store で毎回聞きに行く。 */
function isDoc(req) {
  return req.mode === "navigate" || req.destination === "document";
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const go = isDoc(req) ? fetch(req.url, {cache: "no-store"}) : fetch(req);
  e.respondWith(
    go
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});
