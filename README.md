# wa976.github.io

Personal site of Seunggyu Jeong. Plain Jekyll, built by GitHub Pages from `main` (no plugins, no build step).

## Where things live

| What | File |
|---|---|
| Name, email, profile links | `_config.yml` (`author:`) |
| Bio, news, experience, education, awards, patents, service, skills | `_data/cv.yml` |
| Publication list on the home page | `_data/publications.yml` |
| Project pages (one per paper / challenge entry) | `_data/projects.yml` + a stub `projects/<slug>.md` |
| Filter chips | `_data/topics.yml` |
| Link button labels | `_data/link_labels.yml` |
| Figures | `assets/img/projects/<slug>/` |

## Add a project page

1. Add an entry to `_data/projects.yml` with a new `slug` (fields: title, short, venue, authors, tagline,
   problem, approach, result, metrics, tables, figures, links, topics).
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
