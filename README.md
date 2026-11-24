# Shreeya Pandey, portfolio

A single static page: `index.html`, `styles.css`, `main.js`. No build step.

The hero chart uses Chart.js (from cdnjs) with made-up sample data, in the style of the patient
progress graphs I built at Deerhold.

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```

## Deploy on Render

1. Push this folder to a GitHub repo (for example `shreeya227/portfolio`).
2. On Render, choose **New > Static Site**, connect the repo.
3. Build command: leave empty. Publish directory: `.`
4. Deploy. Render gives you a URL like `https://shreeya-portfolio.onrender.com`.

`render.yaml` describes the same setup if you prefer **New > Blueprint**.
