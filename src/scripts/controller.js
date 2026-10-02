import Model from './model.js';
import View from './view.js';

/* =====================================================================
   CONTROLLER — listens to the user, updates the Model, tells the View.
   ===================================================================== */

const Controller = {
  transitioning: false,
  audioUnlocked: false,

  init() {
    View.init();
    this.initAudio();
    this.bindMenu();
    this.bindKeyboard();
    this.bindAudioUnlock();
    this.bindContactForm();
    this.bindCaseStudies();
    this.bindGamepad();
    this.baseTitle = document.title;
    this.routeVersion = 0;
    addEventListener("hashchange", () => {
      if (location.pathname === "/" && !this.caseOpen) this.restoreRoute();
    });
    addEventListener("popstate", () => this.restoreHistoryRoute());
    const overlay = document.getElementById("enter-overlay");
    const shell = document.getElementById("shell");
    if (overlay && !location.hash) {
      shell.inert = true;
      overlay.focus();
    }
    let dismissing = false;
    const dismiss = (focusMenu = false) => {
      if (!overlay || dismissing) return;
      dismissing = true;
      this.audioUnlocked = true;
      this.startMusic();
      document.body.classList.add("portfolio-entering");
      overlay.classList.add("dismissed");
      View.wipe(() => {
        overlay.remove();
        shell.inert = false;
        document.body.classList.add("portfolio-entered");
      }, () => {
        document.body.classList.remove("portfolio-entering");
        if (focusMenu) View.els.menuItems[0]?.focus({ preventScroll: true });
      });
    };
    overlay?.addEventListener("click", () => dismiss(false));
    overlay?.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); dismiss(true); }
    });
    if (location.hash) { overlay?.remove(); shell.inert = false; this.restoreRoute(); }
  },

  /* ---------- In-shell project case studies ---------- */
  bindCaseStudies() {
    this.caseView = document.getElementById("case-view");
    this.caseOpen = false;
    this.caseLoading = false;
    this.caseView.addEventListener("scroll", () => {
      this.caseView.querySelector("[data-back-to-top]")?.classList.toggle("is-visible", this.caseView.scrollTop > 480);
      this.updateCaseSidebar();
    }, { passive: true });

    document.addEventListener("click", event => {
      const projectLink = event.target.closest?.("a.case-card[href^='/projects/']");
      if (projectLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        this.openCaseStudy(projectLink.getAttribute("href"));
        return;
      }
      if (!this.caseOpen) return;
      const backToTop = event.target.closest?.("#case-view [data-back-to-top]");
      if (backToTop) {
        this.caseView.scrollTo({ top: 0, behavior: View.reducedMotion ? "auto" : "smooth" });
        return;
      }
      const link = event.target.closest?.("#case-view a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href === "/#projects") {
        event.preventDefault();
        history.back();
      } else if (href.startsWith("#")) {
        event.preventDefault();
        this.caseView.querySelector(href)?.scrollIntoView({ behavior: View.reducedMotion ? "auto" : "smooth" });
      }
    });
  },

  async openCaseStudy(href, updateHistory = true) {
    if (this.caseLoading || this.caseOpen) return;
    this.caseLoading = true;
    try {
      const response = await fetch(href, { headers: { "X-Portfolio-Navigation": "case-study" } });
      if (!response.ok) throw new Error(response.status);
      const page = new DOMParser().parseFromString(await response.text(), "text/html");
      const content = page.querySelector(".document-page");
      if (!content) throw new Error("Case study content is missing");

      this.play();
      await new Promise(resolve => View.wipe(() => {
        this.caseView.replaceChildren(...content.cloneNode(true).childNodes);
        this.caseView.hidden = false;
        this.caseView.scrollTop = 0;
        this.caseOpen = true;
        this.activeCaseSection = "";
        Model.state.screen = "case";
        document.body.dataset.screen = "case";
        document.title = page.title || `CASE STUDY · ${this.baseTitle}`;
        if (updateHistory) history.pushState({ caseStudy: true }, "", href);
        this.caseView.querySelector("h1")?.setAttribute("tabindex", "-1");
        this.updateCaseSidebar();
      }, () => {
        this.caseView.querySelector("h1")?.focus({ preventScroll: true });
        resolve();
      }));
    } catch {
      location.assign(href);
    } finally {
      this.caseLoading = false;
    }
  },

  updateCaseSidebar() {
    if (!this.caseOpen && this.caseView.hidden) return;
    const headings = [...this.caseView.querySelectorAll(".markdown-body h2[id]")];
    if (!headings.length) return;
    const threshold = this.caseView.getBoundingClientRect().top + 180;
    let active = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= threshold) active = heading;
      else break;
    }
    if (active.id === this.activeCaseSection) return;
    this.activeCaseSection = active.id;
    this.caseView.querySelectorAll(".document-sidebar a[href^='#']").forEach(link => {
      const selected = link.getAttribute("href") === `#${active.id}`;
      link.classList.toggle("is-active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },

  closeCaseStudy() {
    if (!this.caseOpen || this.caseClosing) return;
    this.caseClosing = true;
    this.play();
    View.wipe(() => {
      this.caseOpen = false;
      this.activeCaseSection = "";
      this.caseView.hidden = true;
      this.caseView.replaceChildren();
      Model.state.screen = "projects";
      document.body.dataset.screen = "projects";
      document.title = `PROJECTS · ${this.baseTitle}`;
    }, () => {
      this.caseClosing = false;
    });
  },

  restoreHistoryRoute() {
    if (location.pathname.startsWith("/projects/")) {
      if (!this.caseOpen) this.openCaseStudy(location.pathname, false);
      return;
    }
    const closedCase = this.caseOpen;
    if (closedCase) this.closeCaseStudy();
    if (location.pathname === "/" && !closedCase) this.restoreRoute();
  },

  /* ---------- Site audio & YouTube background music ---------- */
  initAudio() {
    this.currentTrack = 0;
    this.musicStarted = false;
    this.audioEls = {
      toggle: document.getElementById("sound-toggle"),
      panelToggle: document.getElementById("music-panel-toggle"),
      panel: document.getElementById("music-player"),
      close: document.getElementById("music-close"),
      mount: document.getElementById("youtube-player"),
      title: document.getElementById("music-title"),
      list: document.getElementById("music-list"),
      link: document.getElementById("music-youtube-link"),
      volume: document.getElementById("music-volume"),
      volumeValue: document.getElementById("music-volume-value"),
    };

    // Sound is on by default. Only an explicit choice made on this site overrides it.
    const saved = localStorage.getItem("fantoca-sound");
    View.muted = saved === "off";
    const savedVolumeRaw = localStorage.getItem("fantoca-music-volume");
    const savedVolume = savedVolumeRaw === null ? NaN : Number(savedVolumeRaw);
    this.musicVolume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 100
      ? savedVolume
      : 20;
    this.audioEls.volume.value = String(this.musicVolume);
    this.updateVolumeUi();
    this.updateSoundUi();
    this.renderMusicList();

    this.audioEls.toggle?.addEventListener("click", () => {
      View.muted = !View.muted;
      localStorage.setItem("fantoca-sound", View.muted ? "off" : "on");
      this.updateSoundUi();
      if (View.muted) this.stopMusic();
      else {
        this.audioUnlocked = true;
        this.startMusic();
        View.playSelect();
      }
    });
    this.audioEls.panelToggle?.addEventListener("click", () => this.setMusicPanel(this.audioEls.panel.hidden));
    this.audioEls.close?.addEventListener("click", () => this.setMusicPanel(false));
    this.audioEls.volume?.addEventListener("input", event => {
      this.musicVolume = Number(event.currentTarget.value);
      localStorage.setItem("fantoca-music-volume", String(this.musicVolume));
      this.updateVolumeUi();
      this.sendMusicCommand("setVolume", [this.musicVolume]);
    });
  },

  updateVolumeUi() {
    this.audioEls.volumeValue.textContent = `${this.musicVolume}%`;
    this.audioEls.volume.style.setProperty("--volume", `${this.musicVolume}%`);
  },

  updateSoundUi() {
    const { toggle } = this.audioEls;
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(!View.muted));
    toggle.textContent = View.muted ? "SOUND OFF" : "SOUND ON";
    document.body.classList.toggle("sound-on", !View.muted);
  },

  setMusicPanel(open) {
    this.audioEls.panel.hidden = !open;
    this.audioEls.panelToggle.setAttribute("aria-expanded", String(open));
    if (open) this.audioEls.close.focus();
  },

  renderMusicList() {
    Model.music.forEach((track, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${String(index + 1).padStart(2, "0")} · ${track.title}`;
      button.classList.toggle("active", index === this.currentTrack);
      button.addEventListener("click", () => {
        this.currentTrack = index;
        this.musicStarted = false;
        this.audioUnlocked = true;
        this.updateTrackDetails();
        if (!View.muted) this.startMusic();
      });
      this.audioEls.list.appendChild(button);
    });
    this.updateTrackDetails();
  },

  updateTrackDetails() {
    const track = Model.music[this.currentTrack];
    this.audioEls.title.textContent = track.title;
    this.audioEls.link.href = `https://www.youtube.com/watch?v=${track.id}`;
    [...this.audioEls.list.children].forEach((button, index) => button.classList.toggle("active", index === this.currentTrack));
  },

  startMusic() {
    if (View.muted || !this.audioUnlocked) return;
    if (this.musicStarted) {
      this.sendMusicCommand("setVolume", [this.musicVolume]);
      this.sendMusicCommand("playVideo");
      return;
    }
    const track = Model.music[this.currentTrack];
    const iframe = document.createElement("iframe");
    iframe.title = track.title;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    const origin = encodeURIComponent(location.origin);
    iframe.src = `https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}&controls=1&rel=0&enablejsapi=1&origin=${origin}`;
    iframe.allowFullscreen = true;
    iframe.addEventListener("load", () => {
      // The player API becomes available just after the iframe document loads.
      setTimeout(() => this.sendMusicCommand("setVolume", [this.musicVolume]), 250);
      setTimeout(() => this.sendMusicCommand("setVolume", [this.musicVolume]), 1000);
    });
    this.audioEls.mount.replaceChildren(iframe);
    this.musicStarted = true;
  },

  stopMusic() {
    this.sendMusicCommand("pauseVideo");
  },

  sendMusicCommand(command, args = []) {
    const iframe = this.audioEls.mount?.querySelector("iframe");
    iframe?.contentWindow?.postMessage(JSON.stringify({
      event: "command",
      func: command,
      args,
    }), "https://www.youtube-nocookie.com");
  },

  restoreRoute() {
    document.getElementById("enter-overlay")?.remove();
    document.getElementById("shell").inert = false;
    const hash = location.hash.slice(1);
    if (hash.startsWith("project-")) {
      location.assign("/projects/" + encodeURIComponent(hash.slice(8)) + "/");
      return;
    }
    this.goTo(["projects", "skills", "about", "contact"].includes(hash) ? hash : "home", false);
  },

  /* ---------- Contact form ---------- */
  bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const btn = form.querySelector(".form-send");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (btn.disabled || !form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._honey) return;  // honeypot caught a bot
      if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        status.textContent = "Fill in all three fields first.";
        return;
      }
      btn.disabled = true;
      status.textContent = "Sending…";
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${Model.contactEmail}`, {
          method: "POST",
          signal: AbortSignal.timeout(15000),
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: `Portfolio message from ${data.name}`,
          }),
        });
        if (!res.ok) throw new Error(res.status);
        const result = await res.json();
        if (result.success !== true && result.success !== "true") throw new Error("Relay rejected message");
        status.textContent = "Message accepted. Thank you for reaching out.";
        form.reset();
        this.play();
      } catch {
        status.textContent = "Message was not confirmed. Your draft is saved here; retry or use the Email link above.";
      } finally {
        btn.disabled = false;
      }
    });
  },

  /* ---------- Navigation ---------- */
  goTo(screen, updateUrl = true) {
    if (!View.els.screens[screen]) return;
    if (Model.state.screen === screen && View.els.screens[screen].classList.contains("active")) {
      document.body.dataset.screen = screen;
      return;
    }
    if (updateUrl) {
      const hash = screen === "home" ? "" : "#" + screen;
      if (location.hash !== hash) history.pushState(null, "", location.pathname + location.search + hash);
    }
    const version = ++this.routeVersion;
    this.transitioning = true;
    this.play();
    View.wipe(() => {
      if (version !== this.routeVersion) return;
      Model.state.screen = screen;
      View.showScreen(screen);
      document.title = screen === "home" ? this.baseTitle : screen.toUpperCase() + " · " + this.baseTitle;
      if (screen === "projects") this.loadProjects();
      if (screen === "skills") this.loadSkills();
    }, () => { if (version === this.routeVersion) this.transitioning = false; });
  },

  select(index) {
    const n = View.els.menuItems.length;
    const next = (index + n) % n;
    if (next !== Model.state.menuIndex) this.play();
    Model.state.menuIndex = next;
    View.setMenuSelection(next);
  },

  async loadProjects() {
    View.renderFeatured(Model.featured);
    const cases = await Model.fetchCaseStudies();
    View.renderCaseStudies(cases);
  },

  loadSkills() {
    if (!Model.state.skillsBuilt) {
      View.renderSkills(Model.skills);
      Model.state.skillsBuilt = true;
    }
    View.animateSkillBars();
  },

  /* ---------- Sound (browsers block audio until first user gesture) ---------- */
  play() {
    if (this.audioUnlocked) View.playSelect();
  },

  bindAudioUnlock() {
    const unlock = () => {
      this.audioUnlocked = true;
      this.startMusic();
    };
    addEventListener("pointerdown", unlock, { once: true, capture: true });
    addEventListener("keydown", unlock, { once: true, capture: true });
  },

  /* ---------- Input bindings ---------- */
  bindMenu() {
    View.els.menuItems.forEach((item, i) => {
      item.addEventListener("mouseenter", () => this.select(i));
      item.addEventListener("focus", () => this.select(i));
      item.addEventListener("click", () => this.goTo(item.dataset.target));
    });

    document.querySelectorAll("[data-back]").forEach(b =>
      b.addEventListener("click", () => this.goTo("home")));

    document.querySelectorAll("[data-back-to-projects]").forEach(b =>
      b.addEventListener("click", () => this.goTo("projects")));

    // Clicking the name always takes you home
    document.getElementById("big-name").addEventListener("click", () => {
      if (Model.state.screen !== "home") this.goTo("home");
      else this.play();
    });
  },

  bindKeyboard() {
    addEventListener("keydown", e => {
      if (document.getElementById("enter-overlay") || e.target.closest?.("input,textarea,select,[contenteditable=true]")) return;
      if (Model.state.screen === "home") {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          this.select(Model.state.menuIndex + (e.key === "ArrowDown" ? 1 : -1));
          View.els.menuItems[Model.state.menuIndex].focus();
          e.preventDefault();
        }
        else if (e.key === "Enter" && !e.target.closest?.("button,a")) {
          e.preventDefault();
          this.goTo(View.els.menuItems[Model.state.menuIndex].dataset.target);
        }
      } else if (e.key === "Escape") {
        if (Model.state.screen === "case") history.back();
        else this.goTo("home");
      }
    });
  },

  /* ---------- Gamepad — PS4 DualShock / Xbox (Standard layout) ---------- */
  bindGamepad() {
    this._gp = { lastBtn: {}, lastAxis: 0, connected: false, hudOrig: "" };
    const hudBottom = document.getElementById("hud-bottom");
    if (hudBottom) this._gp.hudOrig = hudBottom.innerHTML;
    const setHudGamepad = (isPS) => {
      if (!hudBottom) return;
      // Replace Enter/Esc hints with controller layout: ✕/A confirm, ○/B back, analog scroll
      const confirm = isPS ? "✕ Confirm" : "A Confirm";
      const back = isPS ? "○ Back" : "B Back";
      hudBottom.innerHTML = `<span><span class="key">↕</span>Select</span><span><span class="key">${confirm.split(" ")[0]}</span>${confirm.split(" ").slice(1).join(" ")}</span><span><span class="key">${back.split(" ")[0]}</span>${back.split(" ").slice(1).join(" ")}</span><span><span class="key">LS</span>Scroll</span><span id="clock"></span>`;
      // re-bind clock ref
      View.els.clock = document.getElementById("clock");
    };
    const restoreHud = () => {
      if (hudBottom && this._gp.hudOrig) {
        hudBottom.innerHTML = this._gp.hudOrig;
        View.els.clock = document.getElementById("clock");
      }
    };
    addEventListener("gamepadconnected", e => {
      this._gp.connected = true;
      this.audioUnlocked = true;
      try { View.playSelect(); } catch {}
      const isPS = e.gamepad.id.includes("054c");
      const isXB = e.gamepad.id.includes("045e");
      // HUD top tag
      const tag = document.querySelector(".hud-tag.alt");
      if (tag && !tag.dataset.gp) {
        tag.dataset.gp = "1";
        tag.textContent += " · 🎮 " + (isPS ? "PS" : isXB ? "XB" : "PAD");
      }
      setHudGamepad(isPS);
    });
    addEventListener("gamepaddisconnected", () => {
      this._gp.connected = false;
      restoreHud();
    });
    const tick = () => {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      const gp = pads[0];
      if (gp && gp.connected) {
        // Standard mapping: 0=A/Cross confirm (Enter), 1=B/Circle back (Esc), 9=Options/Menu, 12=Up,13=Down,14=Left,15=Right, axes[1]=left stick Y, axes[3]=right stick Y
        const now = performance.now();
        const down = (i) => !!gp.buttons[i]?.pressed;
        const edge = (i) => {
          const v = down(i);
          const prev = this._gp.lastBtn[i] || false;
          this._gp.lastBtn[i] = v;
          return v && !prev;
        };
        const overlay = document.getElementById("enter-overlay");
        const isOverlay = overlay && !overlay.classList.contains("dismissed");
        // overlay dismiss — any main button (Cross/A, Circle/B, Options)
        if (isOverlay) {
          if (edge(0) || edge(1) || edge(9) || edge(12) || edge(13)) overlay.click();
        } else if (Model.state.screen === "home") {
          if (edge(12) || edge(14)) this.select(Model.state.menuIndex - 1);
          if (edge(13) || edge(15)) this.select(Model.state.menuIndex + 1);
          // analog scroll for menu: left stick Y + right stick Y
          const y = gp.axes[1] ?? 0;
          const ry = gp.axes[3] ?? 0;
          const ay = Math.abs(y) > Math.abs(ry) ? y : ry;
          if (Math.abs(ay) > 0.6 && now - this._gp.lastAxis > 180) {
            this._gp.lastAxis = now;
            if (ay < 0) this.select(Model.state.menuIndex - 1);
            else this.select(Model.state.menuIndex + 1);
          }
          if (edge(0) || edge(9)) { // Cross/A or Options/Menu = Enter
            const t = View.els.menuItems[Model.state.menuIndex]?.dataset.target;
            if (t) this.goTo(t);
          }
          if (edge(1) || edge(8)) this.goTo("home"); // Circle/B = Esc (no-op on home but consistent)
        } else {
          // Sub-screen: Circle/B / Share / Options = Esc → Back, Cross/A also does nothing (avoid double)
          if (edge(1) || edge(8) || edge(9)) this.goTo(Model.state.screen === "case" ? "projects" : "home");
          // ANALOG SCROLL — the missing piece: left/right stick scrolls the active screen
          const active = View.els.screens[Model.state.screen];
          if (active) {
            const ly = gp.axes[1] ?? 0;
            const ry = gp.axes[3] ?? 0;
            const sy = Math.abs(ly) > Math.abs(ry) ? ly : ry;
            const dy = gp.buttons[13]?.pressed ? 1 : gp.buttons[12]?.pressed ? -1 : 0; // D-Pad hold scroll
            let delta = 0;
            if (Math.abs(sy) > 0.25) delta = sy * 18; // analog variable speed
            else if (dy) delta = dy * 10; // D-Pad continuous
            if (delta) active.scrollTop += delta;
          }
          // D-Pad edge also scrolls a page chunk when tapped
          if (edge(12)) { const a = View.els.screens[Model.state.screen]; if (a) a.scrollTop -= 80; }
          if (edge(13)) { const a = View.els.screens[Model.state.screen]; if (a) a.scrollTop += 80; }
        }
        // weak haptic on confirm/back
        if ((edge(0) || edge(1)) && gp.vibrationActuator) gp.vibrationActuator.playEffect("dual-rumble", { duration: 40, weakMagnitude: 0.5, strongMagnitude: 0.2 }).catch(()=>{});
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
};

Controller.init();
