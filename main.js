// "Before and after" chart: real results from my work (see the Work section).
(function () {
  const canvas = document.getElementById("results");
  if (!canvas || typeof Chart === "undefined") return;

  const metrics = [
    {
      unit: "ms", label: "API response time",
      before: 820, after: 530,
      summary: "API response time: 820 ms to 530 ms, 35% faster.",
      how: "Deerhold: removed N+1 queries, tuned SQL and indexes, cached hot reads in Redis.",
    },
    {
      unit: "minutes", label: "Pipeline runtime",
      before: 180, after: 30,
      summary: "Pipeline runtime: 3 hours to 30 minutes. Failures fell from 30% to under 5%.",
      how: "University research lab: split a distributed AWS pipeline into parallel, checkpointed stages.",
    },
    {
      unit: "minutes", label: "Deployment time",
      before: 20, after: 8,
      summary: "Deployment time: 20 minutes to 8, 60% faster.",
      how: "Enfinitty: containerized services, Terraform for infrastructure, automated deploys to Kubernetes.",
    },
  ];

  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const summaryEl = document.getElementById("chart-summary");
  const howEl = document.getElementById("chart-how");

  function data(m) {
    return {
      labels: ["Before", "After"],
      datasets: [{
        label: `${m.label} (${m.unit})`,
        data: [m.before, m.after],
        backgroundColor: [css("--muted"), css("--blue")],
        borderRadius: 6,
        maxBarThickness: 120,
      }],
    };
  }

  function show(m) {
    summaryEl.textContent = m.summary;
    howEl.textContent = m.how;
  }

  const chart = new Chart(canvas, {
    type: "bar",
    data: data(metrics[0]),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: reduceMotion ? false : { duration: 600 },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: metrics[0].unit, color: css("--muted") },
          ticks: { color: css("--muted") },
          grid: { color: css("--grid") },
        },
        x: { ticks: { color: css("--ink"), font: { weight: "600" } }, grid: { display: false } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.parsed.y} ${chart.$unit}` } },
      },
    },
  });
  chart.$unit = metrics[0].unit;
  show(metrics[0]);

  document.querySelectorAll(".toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const m = metrics[Number(btn.dataset.metric)];
      document.querySelectorAll(".toggle button").forEach((b) =>
        b.setAttribute("aria-pressed", String(b === btn))
      );
      chart.data = data(m);
      chart.options.scales.y.title.text = m.unit;
      chart.$unit = m.unit;
      chart.update();
      show(m);
    });
  });
})();
