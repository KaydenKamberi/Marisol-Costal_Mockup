/* ==========================================================================
   Marisol — Coastal Kitchen & Bar
   Two jobs only: the mobile navigation panel, and the reservation form's
   client-side validation plus its fake-submit confirmation state.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */

  var navToggle = document.querySelector("[data-nav-toggle]");
  var navPanel = document.getElementById("site-nav");

  if (navToggle && navPanel) {
    var setNav = function (open) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navPanel.classList.toggle("is-open", open);
    };

    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Escape closes the panel and returns focus to the button that opened it.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Reservation form

     Non-functional by design: nothing is sent anywhere. The form validates
     in the browser and swaps itself for a confirmation panel.
     ------------------------------------------------------------------ */

  var form = document.querySelector("[data-reservation-form]");

  if (!form) {
    return;
  }

  var confirmation = document.querySelector("[data-reservation-confirmation]");
  var errorSummary = form.querySelector("[data-error-summary]");
  var errorList = form.querySelector("[data-error-list]");

  var fieldLabel = function (field) {
    var label = form.querySelector('label[for="' + field.id + '"]');
    return label ? label.textContent.replace(/\s*\(.*$/, "").trim() : field.name;
  };

  var messageFor = function (field) {
    var v = field.validity;
    var name = fieldLabel(field).toLowerCase();

    if (v.valueMissing) {
      if (field.tagName === "SELECT") {
        return "Choose a " + name + ".";
      }
      return "Enter " + (field.id === "email" ? "an" : "a") + " " + name + ".";
    }
    if (v.typeMismatch && field.type === "email") {
      return "Enter an email address with an @ in it.";
    }
    if (v.rangeUnderflow || v.rangeOverflow) {
      return "Party size must be between 1 and 12. For larger groups, call the location directly.";
    }
    if (v.tooShort) {
      return "That " + name + " looks too short.";
    }
    return "Check the " + name + " field.";
  };

  var showFieldError = function (field, message) {
    var slot = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", "true");
    if (slot) {
      slot.textContent = message;
      slot.hidden = false;
    }
  };

  var clearFieldError = function (field) {
    var slot = document.getElementById(field.id + "-error");
    field.removeAttribute("aria-invalid");
    if (slot) {
      slot.textContent = "";
      slot.hidden = true;
    }
  };

  var fields = Array.prototype.slice.call(
    form.querySelectorAll("input, select, textarea")
  );

  // Clear a field's error as soon as the visitor fixes it.
  fields.forEach(function (field) {
    var settle = function () {
      if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) {
        clearFieldError(field);
      }
    };
    field.addEventListener("input", settle);
    field.addEventListener("change", settle);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var invalid = [];

    fields.forEach(function (field) {
      clearFieldError(field);
      if (!field.checkValidity()) {
        invalid.push(field);
      }
    });

    if (invalid.length) {
      if (errorList) {
        errorList.innerHTML = "";
        invalid.forEach(function (field) {
          var message = messageFor(field);
          showFieldError(field, message);

          var item = document.createElement("li");
          var link = document.createElement("a");
          link.href = "#" + field.id;
          link.textContent = message;
          link.addEventListener("click", function (e) {
            e.preventDefault();
            field.focus();
          });
          item.appendChild(link);
          errorList.appendChild(item);
        });
      }

      if (errorSummary) {
        errorSummary.hidden = false;
        errorSummary.focus();
      }
      return;
    }

    if (errorSummary) {
      errorSummary.hidden = true;
    }

    if (confirmation) {
      var nameField = form.querySelector("#name");
      var slot = confirmation.querySelector("[data-confirmation-name]");
      if (slot && nameField) {
        slot.textContent = nameField.value.trim().split(/\s+/)[0];
      }

      form.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    }
  });
})();
