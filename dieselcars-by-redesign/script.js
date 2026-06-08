(function () {
  const body = document.body;
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const form = document.querySelector("#quote-form");
  const status = document.querySelector("#form-status");

  if (nav && toggle) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("nav-open", isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        return;
      }

      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const car = String(data.get("car") || "").trim();
      const message = String(data.get("message") || "").trim();
      const bodyLines = [
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Автомобиль: ${car || "не указан"}`,
        "",
        "Описание:",
        message || "не указано",
      ];

      const subject = encodeURIComponent("Запрос на диагностику Diesel Service");
      const mailBody = encodeURIComponent(bodyLines.join("\n"));
      status.textContent = "Открываю почтовый клиент с подготовленным письмом.";
      window.location.href = `mailto:info@diesel-cars.by?subject=${subject}&body=${mailBody}`;
    });
  }
})();
