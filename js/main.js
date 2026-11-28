/* =========================================================
   Tere — site scripts (shared layout + interactions)
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const page = document.body.dataset.page || "home";

  const NAV = [
    ["index.html", "Home", "home"],
    ["about.html", "About", "about"],
    ["services.html", "Services", "services"],
    ["drive.html", "Drive with Tere", "drive"],
    ["contact.html", "Contact", "contact"],
  ];

  /* ---------- Layout ---------- */
  const header = `
    <div class="progress-bar"></div>
    <div class="announce"><span class="shine"></span><div class="container">
      <span>🚗 <b>New:</b> Get <b>50% off</b> your first 3 rides<span class="hide-sm"> with code <b>TERE50</b></span></span>
      <a href="services.html#pricing">Learn more</a>
    </div></div>
    <header class="header"><div class="container">
      <a href="index.html" class="logo" aria-label="Tere home"><img src="about/logo.png" alt="Tere"></a>
      <nav class="nav" aria-label="Main">
        <span class="indicator"></span>
        ${NAV.map(([h, l, k]) => `<a href="${h}" class="${k === page ? "active" : ""}">${l}</a>`).join("")}
      </nav>
      <div class="header-cta">
        <a href="contact.html#help" class="btn btn-ghost btn-sm hide-md"><i class="fa-regular fa-circle-question"></i> Help Center</a>
        <a href="index.html#download" class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Get the App</a>
        <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div></header>
    <div class="mobile-menu" aria-hidden="true">
      ${NAV.map(([h, l, k]) => `<a href="${h}" class="mm-link ${k === page ? "active" : ""}">${l} <i class="fa-solid fa-arrow-right"></i></a>`).join("")}
      <div class="mm-foot">
        <a href="index.html#download" class="btn btn-primary btn-block"><i class="fa-solid fa-download"></i> Get the App</a>
        <a href="contact.html#help" class="btn btn-ghost btn-block">Help Center</a>
      </div>
    </div>`;

  const footer = `
    <footer class="footer"><div class="container">
      <div class="footer-grid">
        <div>
          <img class="flogo" src="about/logo2.png" alt="Tere">
          <p>Tere connects people going the same way. Share rides, split costs, cut traffic and reduce your carbon footprint — together.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div><h5>Company</h5><ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="about.html#team">Our team</a></li>
          <li><a href="about.html#careers">Careers</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul></div>
        <div><h5>Product</h5><ul>
          <li><a href="services.html">Services</a></li>
          <li><a href="services.html#pricing">Pricing</a></li>
          <li><a href="drive.html">Become a driver</a></li>
          <li><a href="contact.html#help">Help center</a></li>
        </ul></div>
        <div><h5>Be our friend</h5><ul>
          <li><i class="fa-solid fa-location-dot"></i> 3 Shahrah-e-Faisal, Karachi</li>
          <li><i class="fa-solid fa-envelope"></i> hello@tere.app</li>
          <li><i class="fa-solid fa-phone"></i> +92 21 1111 2222</li>
        </ul>
        <form class="news" data-news><input type="email" placeholder="Your email for updates" required aria-label="Email"><button aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button></form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Tere Technologies. All rights reserved.</span>
        <span class="credit">Designed &amp; developed by <a href="https://saconsultancy.pk/futurevision/" target="_blank" rel="noopener">Future Vision Enterprises</a></span>
        <span><a href="#">Privacy policy</a> · <a href="#">Terms of service</a></span>
      </div>
    </div></footer>
    <a class="wa-btn" href="https://wa.me/922111112222" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
    <button class="to-top" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
    <div class="toast-wrap"></div>`;

  $("#header").outerHTML = header;
  $("#footer").outerHTML = footer;

  /* ---------- Preloader ---------- */
  const pre = $(".preloader");
  if (pre) window.addEventListener("load", () => setTimeout(() => pre.classList.add("done"), 300));
  setTimeout(() => pre && pre.classList.add("done"), 2500);

  /* ---------- Toast ---------- */
  function toast(msg, type = "ok") {
    const t = document.createElement("div");
    t.className = "toast " + (type === "error" ? "error" : "");
    t.innerHTML = `<i class="fa-solid ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}"></i><span></span>`;
    t.querySelector("span").textContent = msg;
    $(".toast-wrap").appendChild(t);
    setTimeout(() => { t.classList.add("hide"); setTimeout(() => t.remove(), 300); }, 3200);
  }
  window.toast = toast;

  /* ---------- Header: scroll state, progress, back-to-top ---------- */
  const hdr = $(".header"), bar = $(".progress-bar"), top = $(".to-top");
  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle("scrolled", y > 20);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    top.classList.toggle("show", y > 700);
    // Safety net: reveal anything already scrolled past (e.g. after jumping to an anchor)
    $$(".reveal:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Sliding nav indicator ---------- */
  const nav = $(".nav"), ind = $(".indicator");
  const moveTo = (a) => {
    if (!a) { ind.style.opacity = 0; return; }
    ind.style.left = a.offsetLeft + "px";
    ind.style.width = a.offsetWidth + "px";
    ind.style.opacity = 1;
  };
  const activeLink = $(".nav a.active");
  $$(".nav a").forEach((a) => a.addEventListener("mouseenter", () => moveTo(a)));
  nav.addEventListener("mouseleave", () => moveTo(activeLink));
  addEventListener("load", () => moveTo(activeLink));
  setTimeout(() => moveTo(activeLink), 900);

  /* ---------- Mobile menu ---------- */
  const burger = $(".burger"), menu = $(".mobile-menu");
  burger.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("lock", open);
  });
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => { menu.classList.remove("open"); burger.classList.remove("open"); document.body.classList.remove("lock"); }));

  /* ---------- Reveal + counters ---------- */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
    const start = performance.now(), dur = 1800;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).concat(en.target.matches("[data-count]") ? [en.target] : []).forEach(countUp);
      io.unobserve(en.target);
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal, .stats").forEach((el) => io.observe(el));
  } else $$(".reveal").forEach((el) => el.classList.add("in"));

  /* ---------- Typing word rotator ---------- */
  const rot = $(".rotator");
  if (rot) {
    const words = rot.dataset.words.split(",");
    let wi = 0, ci = words[0].length, del = true;
    const tick = () => {
      const w = words[wi];
      rot.textContent = w.slice(0, ci);
      if (del) { ci--; if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; } }
      else { ci++; if (ci > words[wi].length) { del = true; ci = words[wi].length; return setTimeout(tick, 1800); } }
      setTimeout(tick, del ? 55 : 110);
    };
    setTimeout(tick, 2200);
  }

  /* ---------- Testimonials slider ---------- */
  const track = $(".testi-track");
  if (track) {
    const slides = $$(".testi", track), dots = $(".dots");
    let idx = 0, timer;
    const perView = () => (innerWidth <= 900 ? 1 : 3);
    const pages = () => slides.length - perView() + 1;
    const draw = () => {
      dots.innerHTML = Array.from({ length: pages() }, (_, i) => `<button class="${i === idx ? "active" : ""}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join("");
      track.style.transform = `translateX(-${(idx * 100) / perView()}%)`;
    };
    const go = (n) => { idx = (n + pages()) % pages(); draw(); clearInterval(timer); timer = setInterval(() => go(idx + 1), 5000); };
    $("[data-prev]").addEventListener("click", () => go(idx - 1));
    $("[data-next]").addEventListener("click", () => go(idx + 1));
    dots.addEventListener("click", (e) => e.target.dataset.i && go(+e.target.dataset.i));
    addEventListener("resize", () => { idx = Math.min(idx, pages() - 1); draw(); });
    let sx = 0;
    track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(idx + (d < 0 ? 1 : -1)); });
    go(0);
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item), a = $(".faq-a", item);
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const open = !item.classList.contains("open");
      $$(".faq-item.open").forEach((o) => { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = 0; $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      if (open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; q.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ---------- Validation helpers ---------- */
  const phoneOk = (v) => /^(\+?92|0)?3\d{2}[- ]?\d{7}$/.test(v.trim());
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  function validate(scope) {
    let ok = true;
    $$("[required], [data-type]", scope).forEach((el) => {
      const f = el.closest(".field");
      if (!f) return;
      const v = el.value;
      let valid = el.type === "checkbox" ? el.checked : v.trim() !== "";
      if (valid && el.dataset.type === "phone") valid = phoneOk(v);
      if (valid && el.type === "email") valid = emailOk(v);
      if (valid && el.minLength > 0) valid = v.trim().length >= el.minLength;
      if (!el.required && !v.trim()) valid = true;
      f.classList.toggle("invalid", !valid);
      ok = ok && valid;
    });
    const bad = $(".field.invalid", scope);
    if (bad) $("input,select,textarea", bad).focus();
    return ok;
  }
  document.addEventListener("input", (e) => { const f = e.target.closest(".field.invalid"); if (f) f.classList.remove("invalid"); });
  const save = (key, data) => { const l = JSON.parse(localStorage.getItem(key) || "[]"); l.push({ ...data, at: new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(l)); };

  /* ---------- Get-the-app link form ---------- */
  $$("[data-getlink]").forEach((form) => form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("input", form);
    if (!phoneOk("0" + input.value.replace(/^0/, ""))) return toast("Please enter a valid mobile number, e.g. 300 1234567", "error");
    save("tere_links", { phone: input.value });
    form.reset();
    toast("Download link sent! Check your SMS 📱");
  }));

  /* ---------- Newsletter ---------- */
  $$("[data-news]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("input", f).value;
    if (!emailOk(v)) return toast("Please enter a valid email", "error");
    save("tere_news", { email: v });
    f.reset();
    toast("Thanks for subscribing!");
  }));

  /* ---------- Pricing toggle ---------- */
  const sw = $(".switch");
  if (sw) {
    let yearly = false;
    const upd = () => {
      sw.classList.toggle("on", yearly);
      sw.setAttribute("aria-checked", yearly);
      $$("[data-month]").forEach((el) => {
        const m = +el.dataset.month;
        el.textContent = m === 0 ? "Free" : "Rs. " + (yearly ? Math.round(m * 12 * 0.8) : m).toLocaleString();
      });
      $$("[data-per]").forEach((el) => (el.textContent = el.closest(".plan").querySelector("[data-month]").dataset.month === "0" ? "forever" : yearly ? "/ year" : "/ month"));
    };
    sw.addEventListener("click", () => { yearly = !yearly; upd(); });
    upd();
  }

  /* ---------- Earnings calculator ---------- */
  const calc = $(".calc");
  if (calc) {
    const hours = $("#c-hours"), days = $("#c-days"), city = $("#c-city");
    const run = () => {
      const rate = +city.value;
      $("#c-hours-v").textContent = hours.value + " hrs";
      $("#c-days-v").textContent = days.value + " days";
      const weekly = hours.value * days.value * rate;
      $("#c-week").textContent = "Rs. " + weekly.toLocaleString();
      $("#c-month").textContent = "Rs. " + Math.round(weekly * 4.3).toLocaleString();
    };
    [hours, days, city].forEach((el) => el.addEventListener("input", run));
    run();
  }

  /* ---------- Driver multi-step application ---------- */
  const app = $("#driver-form");
  if (app) {
    const yr = $("#d-year");
    for (let y = new Date().getFullYear(); y >= 2008; y--) yr.insertAdjacentHTML("beforeend", `<option>${y}</option>`);
    const steps = $$(".fstep", app), sts = $$(".stepper .st"), sbar = $(".stepper .bar");
    let cur = 0;
    const show = (n) => {
      cur = n;
      steps.forEach((s, i) => s.classList.toggle("active", i === n));
      sts.forEach((s, i) => s.classList.toggle("on", i <= n));
      sbar.style.width = `calc(${(n / (steps.length - 1)) * 100}% - ${(n / (steps.length - 1)) * 60}px)`;
      $("[data-back]", app).style.visibility = n === 0 ? "hidden" : "visible";
      $("[data-next-step]", app).innerHTML = n === steps.length - 1 ? 'Submit application <i class="fa-solid fa-paper-plane"></i>' : 'Continue <i class="fa-solid fa-arrow-right"></i>';
    };
    $("[data-back]", app).addEventListener("click", () => show(cur - 1));
    $("[data-next-step]", app).addEventListener("click", () => {
      if (!validate(steps[cur])) return toast("Please complete the highlighted fields", "error");
      if (cur < steps.length - 1) return show(cur + 1);
      const data = Object.fromEntries(new FormData(app));
      save("tere_drivers", data);
      app.innerHTML = `<div class="success"><div class="tick"><i class="fa-solid fa-check"></i></div><h3>Application received!</h3><p class="lead" style="margin:10px auto 24px">Thanks ${data.name.split(" ")[0]}! Our onboarding team will call you on <b>${data.phone}</b> within 48 hours to schedule your verification.</p><a href="index.html" class="btn btn-primary">Back to home</a></div>`;
      toast("Application submitted successfully");
    });
    show(0);
  }

  /* ---------- Contact form ---------- */
  const cf = $("#contact-form");
  if (cf) cf.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(cf)) return toast("Please complete the highlighted fields", "error");
    const btn = $("button[type=submit]", cf);
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
      const data = Object.fromEntries(new FormData(cf));
      save("tere_messages", data);
      cf.innerHTML = `<div class="success"><div class="tick"><i class="fa-solid fa-check"></i></div><h3>Message sent!</h3><p class="lead" style="margin:10px auto 0">Thanks ${data.name.split(" ")[0]}, we'll get back to you within 24 hours.</p></div>`;
      toast("Your message has been sent");
    }, 1200);
  });

  /* Prefill contact topic from ?topic= */
  const topic = new URLSearchParams(location.search).get("topic");
  if (topic && $("#topic")) $("#topic").value = topic;

  /* ---------- Subtle tilt on hero visual ---------- */
  const tilt = $(".hero-visual");
  if (tilt && matchMedia("(pointer:fine)").matches) {
    tilt.addEventListener("mousemove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    tilt.addEventListener("mouseleave", () => (tilt.style.transform = ""));
    tilt.style.transition = "transform .3s ease-out";
  }
})();
