/* Filter op type op de projectenpagina. Zonder JavaScript staan alle projecten er gewoon. */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".filter").forEach(function (lijst) {
    var main = lijst.closest("main") || document;
    var knoppen = lijst.querySelectorAll("button[data-filter]");
    var projecten = main.querySelectorAll(".project");
    var leeg = main.querySelector(".geen-resultaat");
    knoppen.forEach(function (knop) {
      knop.addEventListener("click", function () {
        var f = knop.getAttribute("data-filter");
        var zichtbaar = 0;
        knoppen.forEach(function (k) { k.setAttribute("aria-pressed", k === knop ? "true" : "false"); });
        projecten.forEach(function (p) {
          var tonen = f === "alle" || (" " + p.getAttribute("data-type") + " ").indexOf(" " + f + " ") > -1;
          p.hidden = !tonen;
          if (tonen) zichtbaar++;
        });
        if (leeg) leeg.hidden = zichtbaar > 0;
      });
    });
  });
});
