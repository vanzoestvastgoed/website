/* Licht/donker-knop. Zonder eigen keuze volgt de site de instelling van het apparaat. */
(function () {
  var root = document.documentElement;
  function systeemDonker() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function huidig() {
    return root.getAttribute("data-theme") || (systeemDonker() ? "dark" : "light");
  }
  function zetLabel(knop) {
    var taalVak = knop.closest("[lang]");
    var nl = (taalVak ? taalVak.lang : root.lang) === "nl";
    var naarDonker = huidig() === "light";
    knop.setAttribute("aria-label", nl
      ? (naarDonker ? "Donkere weergave" : "Lichte weergave")
      : (naarDonker ? "Dark mode" : "Light mode"));
    knop.setAttribute("aria-pressed", huidig() === "dark" ? "true" : "false");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var knoppen = document.querySelectorAll(".thema-knop");
    knoppen.forEach(zetLabel);
    knoppen.forEach(function (knop) {
      knop.addEventListener("click", function () {
        var nieuw = huidig() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", nieuw);
        try { localStorage.setItem("vanzoest-thema", nieuw); } catch (e) {}
        knoppen.forEach(zetLabel);
      });
    });
  });
})();
