// OllyTech Hub — shared site behavior. No framework, no build step.
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".nav-mobile");
  if (toggle && mobileNav) {
    var closeMenu = function (returnFocus) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      mobileNav.classList.remove("is-open");
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu(false);
      } else {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        mobileNav.classList.add("is-open");
      }
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu(false);
    });
    document.addEventListener("click", function (e) {
      var isOpen = mobileNav.classList.contains("is-open");
      if (isOpen && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });
  }

  // Contact form -> Formspree
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute("action");
      var submitBtn = form.querySelector("[type=submit]");
      submitBtn.disabled = true;
      status.dataset.state = "";
      status.textContent = "Sending…";
      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            status.dataset.state = "ok";
            status.textContent = "Message sent — we reply within a few hours.";
            form.reset();
          } else {
            throw new Error("submit failed");
          }
        })
        .catch(function () {
          status.dataset.state = "err";
          status.textContent =
            "Something went wrong sending that — please message us on WhatsApp or email instead.";
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }
})();
