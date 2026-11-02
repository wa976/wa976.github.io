# wa976.github.io

Personal site of Seunggyu Jeong. Plain Jekyll, built by GitHub Pages from `main` (no plugins, no build step).
English and Korean are both in the HTML; the EN/한 button shows one of them.

## Where things live

| What | File |
|---|---|
| Name, email, profile links | `_config.yml` (`author:`) |
| Bio, highlights, news, startup timeline, experience, education, awards, patents, service, skills | `_data/cv.yml` |
| Publication list on the home page | `_data/publications.yml` |
| Project pages (papers, products, programs) | `_data/projects.yml` + a stub `projects/<slug>.md` |
| Project-grid tabs | `_data/types.yml` |
| Interface words (section titles, buttons) | `_data/ui.yml` |
| Link button labels | `_data/link_labels.yml` |
| Figures and photos | `assets/img/projects/<slug>/` |

## Two languages

Any visible text field can have a Korean twin with the same name plus `_ko`
(`tagline` / `tagline_ko`, `label` / `label_ko`, ...). If the `_ko` field is missing, the English text shows in both modes.
Templates print both through `_includes/t.html`; CSS hides the one that is not selected.
The language follows `?lang=ko|en`, then the visitor's last choice, then the browser language.
The theme is light unless the visitor switches to dark.

## Add a project page

1. Add an entry to `_data/projects.yml` with a new `slug` and `type` (`research` or `startup`).
   Research pages use `problem` / `approach` / `result` (+ `metrics`, `tables`); other pages use `facts` and `sections`.
2. Create `projects/<slug>.md` containing only front matter:

   ```
   ---
   layout: project
   slug: <slug>
   title: "<short name>"
   ---
   ```
3. Optionally link it from `_data/publications.yml` with `page: <slug>`.

## Preview locally

`jekyll serve` (Jekyll 3.10, the version GitHub Pages uses), then open http://127.0.0.1:4000.
