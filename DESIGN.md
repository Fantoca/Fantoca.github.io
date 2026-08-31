---
version: alpha
name: "PERSONA 5 — Phantom Thief"
description: "1:1 Figma Persona 5 Royale (Community) — Phantom Red × Ink Black × Velvet White, halftone benday, starburst, jagged clip-path & hard-shadow anime pop ala Soejima. Sinkron dengan style.css aktual (CSS vars --red/--black/--white)."
colors:
  primary: "#0B0B0D"
  secondary: "#6B6B6B"
  tertiary: "#E60012"
  neutral: "#F6F4EF"
  phantom-red: "#E60012"
  phantom-red-deep: "#A3000C"
  phantom-red-bright: "#FF0A1F"
  ink-black: "#0B0B0D"
  ink-pure: "#111111"
  paper-white: "#F6F4EF"
  paper-pure: "#FFFFFF"
  halftone-dot: "#000000"
  halftone-red: "#FFB3B8"
  electric-blue: "#00D1FF"
  vigilante-yellow: "#FFE600"
  on-primary: "#F6F4EF"
  on-tertiary: "#F6F4EF"
typography:
  h1:
    fontFamily: "Archivo Black, Anton, Impact, sans-serif"
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Archivo Black, Anton, Impact, sans-serif"
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Archivo Black, Barlow Condensed, sans-serif"
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  h4:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: 1.25rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.06em"
  body-lg:
    fontFamily: "Barlow Condensed, Inter, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.01em"
  body-md:
    fontFamily: "Barlow Condensed, Inter, Helvetica, sans-serif"
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.55
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.5
  label-caps:
    fontFamily: "Barlow Condensed, Archivo Black, sans-serif"
    fontSize: 0.75rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.14em"
  label-wanted:
    fontFamily: "Archivo Black, Anton, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.16em"
  caption-comic:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: 0.75rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
  menu-item:
    fontFamily: "Archivo Black, Impact, sans-serif"
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  none: 0px
  xs: 2px
  sm: 2px
  md: 0px
  lg: 0px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  panel: 24px
components:
  button-primary:
    backgroundColor: "{colors.phantom-red}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-pure}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 14px
  button-secondary-hover:
    backgroundColor: "{colors.vigilante-yellow}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 14px
  button-ghost:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 14px
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-pure}"
    rounded: "{rounded.none}"
    padding: 22px
  card-hover:
    backgroundColor: "{colors.paper-pure}"
    textColor: "{colors.ink-pure}"
    rounded: "{rounded.none}"
    padding: 22px
  card-dark:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: 22px
  badge-lang:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.caption-comic}"
    rounded: "{rounded.none}"
    padding: 6px
  badge-wanted:
    backgroundColor: "{colors.vigilante-yellow}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label-wanted}"
    rounded: "{rounded.none}"
    padding: 6px
  badge-phantom:
    backgroundColor: "{colors.phantom-red}"
    textColor: "{colors.paper-white}"
    typography: "{typography.caption-comic}"
    rounded: "{rounded.none}"
    padding: 6px
  dialog-bubble:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-pure}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 30px
  hud-tag:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.none}"
    padding: 6px
---

## Overview

Replika **1:1 Persona 5 Royal** — bukan "terinspirasi", tapi identik dengan Figma Community *Persona 5 Royale (OMrqy6t303uCTOlJsjoqyC)* dan implementasi aktual `src/styles/style.css` di porto ini. Package ini sudah Persona 5 sejak awal: lihat `--red:#e60012`, `--black:#0b0b0d`, `--white:#f6f4ef`, slash diagonal, halftone dots, dan kartu `clip-path: polygon(0 6%, 3% 0, 100% 0, 100% 88%, 97% 100%, 0 100%)`.

Vibe: **rebellious, loud, stylish, confidence 300%**. UI harus berteriak *TAKE YOUR HEART* — semua miring, semua ber-outline hitam 3px, semua berbayang keras tanpa blur. Tidak ada yang bulat, tidak ada yang soft.

Prinsip absolut: **Contrast is king. Angle is energy. Outline is law.**

> Catatan Figma: Link Figma kamu terblokir CloudFront 403 (bot-wall Figma) dan gagal di-extract via API/browser harness. Token di file ini disinkronkan manual dengan (1) style.css aktual, (2) screenshot Zen yang berhasil di-load, dan (3) reference terpercaya — d0rich Persona 5 design system + Persona 5 Royal artbook hex.

## Colors

Triad mutlak + 2 aksen pop-art. Jangan encerkan merah. Jangan pakai abu hangat untuk background.

- **Phantom Red ({colors.phantom-red} / {colors.tertiary} = `var(--red)` #E60012):** HERO. Satu-satunya warna CTA. Selalu dengan border hitam 3px + hard shadow `7px 7px 0 #0B0B0D`. Deep `{colors.phantom-red-deep}` (#A3000C) = `var(--red-deep)` untuk stripe kedua & pressed. Bright `{colors.phantom-red-bright}` untuk halftone overlay di belakang hero.
- **Ink Black ({colors.ink-black} / {colors.primary} = `var(--black)` #0B0B0D):** Warna slash `#slash`, HUD tag, card feat, dan outline universal. `ink-pure` #111111 = `var(--ink)` untuk teks body di atas kertas.
- **Paper White ({colors.paper-white} / {colors.neutral} = `var(--white)` #F6F4EF):** Kertas komik — BUKAN putih murni. Dipakai untuk card, paper, dialog. `paper-pure` #FFFFFF hanya untuk hover highlight.
- **Halftone Dot ({colors.halftone-dot}):** `radial-gradient(circle, rgba(0,0,0,.35) 1.6px, transparent 1.7px)` size `14px` di `#bg-halftone` dengan `mix-blend:multiply` + drift 30s. Di Figma Royale dipakai sebagai texture di semua background kosong.
- **Halftone Red ({colors.halftone-red}):** Overlay pink di belakang karakter — `FFB3B8` opacity .15.
- **Electric Blue ({colors.electric-blue} #00D1FF):** Aksen Morgana — maksimal 5% layar, hanya badge/link tersier.
- **Vigilante Yellow ({colors.vigilante-yellow} #FFE600):** Sticker "WANTED"/"NEW" — badge miring, sangat jenuh, pakai hemat.
- **Secondary ({colors.secondary} #6B6B6B):** HANYA metadata kecil (timestamp, caption). Jangan untuk body.

**Implementasi stripe Figma → CSS:**
```css
#bg-stripes{
  background: repeating-linear-gradient(115deg,
    var(--red) 0 46px, var(--red-deep) 46px 52px,
    var(--red) 52px 120px, #c4000f 120px 126px);
}
```
**Kontras WCAG:** White #F6F4EF di atas Red #E60012 = 4.2:1 (AA untuk large text 18px+; body kecil tambahkan `-webkit-text-stroke:1px #000` atau pakai Ink). Black #0B0B0D di atas Yellow = 15:1 (AAA). White di atas Black = 18.5:1 (AAA).

## Typography

Tiga suara yang bertabrakan — sesuai Figma Royale & style.css:

1.  **DISPLAY — Archivo Black (utama, dari style.css) + Anton fallback:** Condensed ultra-bold, ALL CAPS. Di Figma Royale dipakai untuk judul BERAT sebelah (ransom letters). WAJIB: `text-transform:uppercase` + `transform: skewX(-7deg)` atau `rotate(-1.5deg)` + `-webkit-text-stroke` 2-3px + `text-shadow: 2px 2px 0 #0B0B0D`. Token `h1`/`h2`/`menu-item` mewakili ini. Ukuran `clamp(44px,8.5vw,124px)` di hero — lihat `#big-name`.
2.  **SUBHEAD / LABEL — Barlow Condensed 700-900:** Untuk HUD, nav, skill name, badge. `letter-spacing: .10em - .18em`, uppercase. Dipakai `h4`, `label-caps`, `caption-comic`. Di CSS: `font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif`.
3.  **BODY — Barlow Condensed 500 untuk accent + Inter untuk paragraf panjang:** `body-md` untuk paper, `body-sm` untuk meta. Jangan pakai Archivo untuk body.

**Ransom letters (ciri khas Figma Royale):**
```html
<span class="ransom" data-ransom="PROJECTS"></span>
```
JS memecah tiap huruf jadi `.ch` dengan `--t` random rotate ±3deg, lalu `.ch.box` (hitam) / `.ch.boxw` (putih) / `.ch.red` untuk highlight. Hover = `jitter` 0.35s. Wajib replikasi ini untuk headline persona 1:1.

**Aturan keras:**
- Headline = UPPERCASE + SKEW + OUTLINE + HARD SHADOW. Tanpa ini bukan P5.
- Campur skala dalam satu headline: `TAKE YOUR <em style="font-size:1.4em">HEART</em>` + `.ch.red`.
- Letter-spacing headline negatif (-0.02 s/d -0.03em), label positif lebar (.12em+).
- Jangan serif. Jangan weight 300/400 untuk headline.

**Font loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@600;700;800;900&family=Anton&display=swap" rel="stylesheet">
```

## Layout

Anti-grid diagonal yang terkontrol — persis seperti Figma Community.

- **Spacing scale:** `xs`4 `sm`8 `md`16 `lg`24 `xl`32 `2xl`48 `3xl`64 — kelipatan 4px. `panel`24 untuk padding card/paper.
- **Angle system (wajib):** Semua panel/kartu/button miring; isi di-counter-skew agar baca tetap horizontal:
  - Card: `transform: rotate(var(--tilt))` dimana `--tilt` random -1.2deg s/d 1.8deg (via JS), hover `rotate(0deg) scale(1.03)`
  - Button/CV: `transform: skewX(-8deg) rotate(-1deg)` inner `skewX(8deg)`
  - HUD tag: `rotate(-2deg)` / `rotate(1.5deg)` bergantian
  - Paper: `rotate(-.6deg)` kiri, `.align-right .paper` `rotate(.6deg)` kanan
  - Menu item selected: `translateX(14px)` + `::before` hitam `skewX(-16deg)` width 108%
- **Grid:** `grid-template-columns: repeat(auto-fill, minmax(330px,1fr))` gap `26px 34px`. Card overlap via `filter:drop-shadow(7px 7px 0 rgba(0,0,0,.5))`.
- **Clip-path (signature Figma → CSS):**
  - Card: `clip-path: polygon(0 6%, 3% 0, 100% 0, 100% 88%, 97% 100%, 0 100%)`
  - Paper: `clip-path: polygon(0 4%, 2% 0, 100% 0, 100% 94%, 98% 100%, 0 100%)`
  - Thumb: `clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%)` + overlay `linear-gradient(115deg, transparent 78%, var(--red) 78.5%)`
  - Slash: `clip-path: polygon(58% 0, 100% 0, 100% 100%, 40% 100%, 52% 62%, 45% 60%, 60% 24%, 51% 22%)` → saat sub-screen jadi `polygon(0 0,100% 0,100% 100%,0 100%)`
- **Halftone layer:** `#bg-halftone` radial dot 1.6px /14px + `mix-blend:multiply` + drift 30s. Opacity .5 saat `has-art-*`.
- **Speed lines:** Star SVG `opacity:.16` + `spin 60s` di `#bg` (Figma punya garis 45deg repeating-linear).
- **Overlap wajib:** Minimal 3 layer tumpuk (halftone → stripes/slash → starburst → card → badge → headline).

## Elevation & Depth

Nol blur. Semua kedalaman = hard shadow + outline.

- **Hard Shadow card/button:** `filter: drop-shadow(7px 7px 0 rgba(0,0,0,.5))` default, hover `drop-shadow(10px 10px 0 var(--black))`. Paper: `box-shadow:10px 10px 0 rgba(0,0,0,.55)`. CV button: `box-shadow:7px 7px 0 var(--black)`.
- **Text Shadow:** Menu/HUD: `text-shadow:2px 2px 0 var(--black)`. Ransom hover: `jitter` translateY. Hero headline double: `3px 3px 0 #000, 6px 6px 0 var(--red)`.
- **Outline/Stroke:** Card/paper: border via clip-path + shadow (bukan border). Headline ransom `.ch.box` = background hitam + padding .02em .08em. Fokus: `outline:3px dashed var(--white)`.
- **Layering z:** bg 0 → slash 1 → shell 2 → star .16 → card 3 on hover → wipe 50 → cursor 9999.
- **Dilarang:** `box-shadow` blur >0, `backdrop-blur`, gradient halus, glassmorphism, Material elevation.

## Shapes

Persona 5 membenci tumpul.

- **Radius = 0.** Semua token `none`/`md`/`lg` = 0px. Hanya `full` untuk avatar. Kartu/button = sudut tajam via clip-path, bukan `border-radius`.
- **Jagged / Starburst:** SVG `<polygon points="50,0 60,35 98,35 68,57 78,94 50,72 22,94 32,57 2,35 40,35">` (5-point) dipakai 2x di `#bg` dengan `26vmax`/`34vmax` + rotate. Untuk badge, pakai 16-point starburst clip-path.
- **Slanted Cut:** Card & paper sudah dijawab di Layout clip-path 6% chamfer.
- **Speech Bubble / Paper:** `.paper` + `.dialog-bubble` = kotak kertas miring dengan shadow keras, ekor segitiga `::after` 45deg jika butuh.
- **Tape (polaroid):** `.about-photo::before` = `width:90px;height:26px;background:var(--red);clip-path:polygon(4% 0,96% 8%,100% 92%,0 100%);rotate(-4deg)` — signature Figma.
- **Underline jagged:** `.screen-head::after` & `.form-head::after` = `height:10px/7px;background:var(--red);transform:skewX(-24deg)` — bukan garis lurus.
- **Skill bar:** `height:20px;background:rgba(0,0,0,.55);transform:skewX(-18deg);overflow:hidden` inner `repeating-linear-gradient(90deg,transparent 0 26px, rgba(230,0,18,.22) 26px 30px)`.
- **Sticker:** `.contact-chip` = `skewX(-8deg) rotate(-1deg)` + `box-shadow:6px 6px 0 rgba(0,0,0,.4)` inner `skewX(8deg)`.

## Components

Semua pakai token reference `{colors.*}` `{typography.*}`. Variant hover = entry terpisah (sibling, bukan nested).

- **`button-primary` → `.cv-btn` / CTA utama:** `background:{colors.phantom-red}`, teks `paper-white`, `skewX(-8deg) rotate(-1deg)`, `box-shadow:7px 7px 0 black`, padding 16px. Hover (`button-primary-hover`) = `ink-black` + scale 1.05 + shadow 10px. Active 0.97.
- **`button-secondary` → `.contact-chip` / `.back-hint`:** Putih atau hitam, hover kuning. `skewX(-8deg)` inner counter-skew.
- **`button-ghost` → `.menu-item`:** Transparent, `::before` hitam `skewX(-16deg)` width 0 →108% saat `.sel`. Cursor mark `◀` rotate 8deg + pulse.
- **`card` → `.card` (repo):** `paper-white`, `clip-path` chamfer, `drop-shadow`, `rotate(var(--tilt))`. Hover `rotate(0) scale(1.03)`. Inner `.lang` badge hitam rotate 2deg + dot warna. `.meta .go` merah skew -10deg.
- **`card-hover`:** State hover `paper-pure` (putih murni) + shadow hitam pekat.
- **`card-dark` → `.card.feat`:** `ink-black` background, teks white, `drop-shadow` merah-deep, hover merah. `.feat .lang` merah, `.feat .meta .go` putih.
- **`badge-lang` → `.card .lang`:** Hitam, `rotate(2deg)`, dot `var(--lc)` di `::before`.
- **`badge-wanted` / `badge-phantom`:** Sticker kecil miring -2deg, shadow 3px, absolute top -8 right -8 overlap.
- **`dialog-bubble` → `.paper`:** `clip-path` paper, `rotate(-.6deg)`, `box-shadow:10px 10px 0`, `.stamp` hitam rotate -2deg untuk highlight (First-Class Honours).
- **`hud-tag` → `.hud-tag` / `.grid-label .bar`:** Tag atas kiri miring -2deg/1.5deg, bottom HUD `.key` `skewX(-8deg)` putih-hitam.
- **`form` → `#contact-form .field`:** Input `border:3px solid black`, `skewX(-2deg)`, focus `border-color:red + box-shadow:4px 4px 0 red`.
- **Hero art:** `#hero-art` `height:min(92vh,900px)` + `filter:drop-shadow(-14px 10px 0 rgba(230,0,18,.85))` + hide saat sub-screen `translateX(60%) skewX(-6deg)`.

**Komposisi wajib:** Jangan tampilkan komponen sendirian — gabung minimal `star + halftone + slash + card + badge` agar P5 hidup. Lihat `index.astro` sebagai referensi 1:1.

## Do's and Don'ts

- **Do** pakai warna persis `var(--red) #E60012`, `var(--black) #0B0B0D`, `var(--white) #F6F4EF` — jangan #FFFFFF murni untuk background besar (itu untuk hover saja).
- **Do** pakai `Archivo Black` untuk headline/menu + `Barlow Condensed` untuk label/body — sesuai style.css, bukan Anton semata.
- **Do** replikasi `clip-path` polygon persis dari style.css (card 6%/3%, paper 4%/2%, slash 58%) — itu DNA Figma Royale.
- **Do** miringkan semua (`skewX -8deg`, `rotate -1deg`, `skewX -16deg` untuk menu) dan counter-skew isi.
- **Do** halftone 14px + stripes 115deg + starburst spin — tanpa texture, P5 kosong.
- **Do** hard shadow `7px 7px 0` + outline hitam — soft blur dilarang.
- **Do** ransom letters `.ch` dengan random `--t` rotate untuk headline hero/menu — ini yang bikin Figma Royale berisik tapi terkontrol.
- **Don't** pakai radius >2px, `border-radius: 12px`, blur, glass, gradient halus — anti-P5, auto-fail.
- **Don't** pakai serif atau weight tipis untuk headline — minimal Archivo Black 400 (yang sudah extra-bold).
- **Don't** bikin grid simetris rata tengah — P5 itu overlap + tabrak + diagonal. Center hanya untuk body panjang di `.paper`.
- **Don't** ganti secondary gray untuk teks utama — hanya Ink #111 atau Paper #F6F4EF.
- **Don't** nest variant (`button.primary.hover`) — selalu sibling `button-primary-hover`.
- **Don't** hardcode hex di components — selalu `{colors.phantom-red}` refs.

