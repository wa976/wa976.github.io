(function () {
  "use strict";

  // Theme toggle (initial theme is set inline in <head> to avoid a flash).
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Language toggle (initial language is set inline in <head>).
  var langBtn = document.querySelector(".lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-lang") === "ko" ? "en" : "ko";
      root.setAttribute("data-lang", next);
      root.setAttribute("lang", next);
      localStorage.setItem("lang", next);
      var url = new URL(window.location);
      if (url.searchParams.has("lang")) { url.searchParams.set("lang", next); history.replaceState(null, "", url); }
    });
  }

  // "Show all" for long lists (news).
  document.querySelectorAll(".more-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("." + btn.dataset.more).forEach(function (el) { el.hidden = false; });
      btn.remove();
    });
  });

  // Project filter chips. The choice is kept in the query string (?type=)
  // so a filtered view can be shared.
  document.querySelectorAll(".filters").forEach(function (bar) {
    var scope = bar.parentElement;
    var cards = scope.querySelectorAll(".card");
    var chips = bar.querySelectorAll(".chip");
    function apply(topic) {
      chips.forEach(function (c) { c.classList.toggle("is-active", c.dataset.filter === topic); });
      cards.forEach(function (card) {
        var topics = (card.dataset.types || "").split(" ");
        card.classList.toggle("is-hidden", topic !== "all" && topics.indexOf(topic) === -1);
      });
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        apply(chip.dataset.filter);
        var url = new URL(window.location);
        if (chip.dataset.filter === "all") url.searchParams.delete("type");
        else url.searchParams.set("type", chip.dataset.filter);
        history.replaceState(null, "", url);
      });
    });
    var initial = new URL(window.location).searchParams.get("type");
    if (initial && bar.querySelector('[data-filter="' + initial + '"]')) apply(initial);
  });

  // Figure lightbox.
  var box = document.querySelector(".lightbox");
  if (box) {
    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector("p");
    document.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        var cap = btn.parentElement.querySelector("figcaption");
        boxImg.src = img.src;
        boxImg.alt = img.alt;
        boxCap.textContent = cap ? cap.textContent : "";
        box.hidden = false;
      });
    });
    function close() { box.hidden = true; boxImg.src = ""; }
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  }

  // Highlight the nav link of the section in view (home page only).
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav nav a[href*="#"]'));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").split("#")[1]); })
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href").split("#")[1] === entry.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Gentle reveal of blocks and cards as they scroll in.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var items = document.querySelectorAll(".card, .metric");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }
})();
