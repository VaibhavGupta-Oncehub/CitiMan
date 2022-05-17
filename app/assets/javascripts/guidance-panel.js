var guidancePanel = (function () {
  var e,
    t,
    n = {
      ARRIVE: "-arrive",
      BEAR_LEFT: "-bear-left",
      BEAR_RIGHT: "-bear-right",
      DEPART: "-start -black",
      ENTER_MOTORWAY: "-motorway",
      FOLLOW: "-continue",
      KEEP_LEFT: "-keep-left",
      KEEP_RIGHT: "-keep-right",
      ROUNDABOUT_CROSS: {
        1: "-roundabout-left1",
        2: "-roundabout-left",
        3: "-roundabout-left3",
      },
      ROUNDABOUT_LEFT: {
        1: "-roundabout-left1",
        2: "-roundabout-left",
        3: "-roundabout-left3",
      },
      ROUNDABOUT_RIGHT: { 1: "-roundabout-right1", 2: "-roundabout-right" },
      STRAIGHT: "-continue",
      TAKE_EXIT: "-continue",
      TURN_LEFT: "-turn-left",
      TURN_RIGHT: "-turn-right",
    },
    i = "metric",
    r = {},
    a = [],
    o = {},
    c = document.querySelectorAll(".unit-button");
  return function (s, u) {
    u && ((e = u.map), (t = u.coordinates));
    var d = document.createElement("div"),
      l = document.createElement("div"),
      v = document.querySelector(".guidance-panel"),
      f = document.createElement("div");
    function p(e, t) {
      var n = document.createElement("div"),
        i = document.createElement("div");
      return (
        (n.className =
          "instruction" === e
            ? "guidance-marker-" + (t || "")
            : "supporting-marker"),
        (i.className = "tt-icon -white -" + e),
        n.appendChild(i),
        n
      );
    }
    function m(e) {
      return e.replace(
        /<([^/].*?)(?=>)(.*?)<\/(.*?)(?=>)/g,
        '<span class="$1"$2</span'
      );
    }
    function E(e, t) {
      var n = { length: e, modifier: t || "" };
      return (
        a.push(n),
        '<div class="distance-wrapper ' + (t || "") + '">' + g(e) + "</div>"
      );
    }
    function g(e) {
      return "metric" === i
        ? Formatters.formatAsMetricDistance(e)
        : Formatters.formatAsImperialDistance(e);
    }
    function h(t, n) {
      var i = n.target.classList[0].slice(-1);
      r[i].forEach(function (n) {
        "enter" === t && o[n].addTo(e), "leave" === t && o[n].remove();
      });
    }
    function L(t) {
      e.flyTo({ center: [t.longitude, t.latitude], duration: 500 });
    }
    function b(t, n) {
      var i = n.target.getAttribute("data-number"),
        r = o[i];
      "enter" === t && (r.addTo(e), r.togglePopup()),
        "leave" === t && r.remove();
    }
    function T(n) {
      var i = document.querySelector(".instructions-list-" + n).classList;
      if (
        ((function (e) {
          var t = document
            .querySelector(".instructions-header-" + e)
            .querySelector(".tt-icon").classList;
          t.contains("-down") ? t.remove("-down") : t.add("-down");
        })(n),
        i.toggle("not-visible"),
        u)
      ) {
        var a = new tt.LngLatBounds();
        i.contains("not-visible")
          ? t.forEach(function (e) {
              a.extend(tt.LngLat.convert(e));
            })
          : r[n].forEach(function (e) {
              a.extend(o[e].getLngLat());
            }),
          e.fitBounds(a, { duration: 500, padding: 150 });
      }
    }
    function w(e) {
      var t = [].slice.call(document.querySelectorAll(".distance-wrapper")),
        n = e.target;
      [].slice.call(c).forEach(function (e) {
        e.classList.remove("-checked");
      }),
        n.classList.add("-checked"),
        (i = n.dataset.unit),
        t.forEach(function (e, t) {
          var n = e.parentNode;
          n.removeChild(e),
            n.appendChild(
              (function (e) {
                var t = a[e].length;
                return DomHelpers.elementFactory(
                  "div",
                  "distance-wrapper " + a[e].modifier,
                  g(t)
                );
              })(t)
            );
        });
    }
    f.classList.add("summary-header"),
      (f.innerText = "Instructions"),
      l.appendChild(f),
      s.instructionGroups.forEach(function (e, t) {
        var i,
          a,
          c,
          l = document.createElement("li"),
          v = e.firstInstructionIndex,
          f = e.lastInstructionIndex;
        (r[t] = (function (e, t) {
          for (var n = [], i = e; i < t + 1; i++) n.push(i);
          return n;
        })(v, f)),
          (l.classList = "tt-results-list__item"),
          (l.innerHTML =
            ((i = t),
            (a = s.instructions.slice(r[i][0], r[i][r[i].length - 1] + 1)),
            (c = s.instructionGroups[i]),
            '<div class="instructions-header-' +
              i +
              ' with-distance"><div class="instruction-wrapper"><div class="icon-wrapper"><div class="tt-icon -arrow"></div></div><div>' +
              m(c.groupMessage) +
              "</div></div>" +
              E(c.groupLengthInMeters) +
              "</div>" +
              (function (e, t) {
                return (
                  '<div class="instructions-list-' +
                  t +
                  ' not-visible">' +
                  (function (e, t) {
                    var i = '<div class="instructions-overlay">';
                    return (
                      e.forEach(function (a, c) {
                        var s = r[t][c],
                          d = e[c + 1]
                            ? e[c + 1].routeOffsetInMeters -
                              a.routeOffsetInMeters
                            : 0;
                        (i +=
                          '<div class="instruction ' +
                          (d ? "with-distance" : "") +
                          '" data-number="' +
                          s +
                          '"><div class="instruction-wrapper"><div class="icon-wrapper"><div class="tt-icon ' +
                          ((function (e) {
                            return "ROUNDABOUT" === e.junctionType &&
                              0 !== e.roundaboutExitNumber
                              ? n[e.maneuver][e.roundaboutExitNumber]
                              : n[e.maneuver];
                          })(a) || "") +
                          '"></div></div><div class="message-wrapper">' +
                          m(a.message) +
                          "</div></div>" +
                          (d ? E(d, "-instruction") : "") +
                          "</div>"),
                          u &&
                            (o[s] = new tt.Marker({
                              element: p("instruction", String(s)),
                            })
                              .setLngLat([a.point.longitude, a.point.latitude])
                              .setPopup(
                                new tt.Popup({ offset: 20 }).setHTML(
                                  '<div class="popup-content">' +
                                    m(a.message) +
                                    "</div>"
                                )
                              ));
                      }),
                      (i += "</div>")
                    );
                  })(e, t) +
                  "</div>"
                );
              })(a, i))),
          d.appendChild(l);
      }),
      l.appendChild(d),
      v.appendChild(l),
      (GuidancePanel.prototype.bindEvents = function () {
        [].slice
          .call(document.querySelectorAll('[class^="instructions-header-"]'))
          .forEach(function (e, t) {
            e.addEventListener("click", T.bind(null, t)),
              u &&
                (e.addEventListener("mouseenter", h.bind(null, "enter")),
                e.addEventListener("mouseleave", h.bind(null, "leave")));
          }),
          u &&
            [].slice
              .call(document.querySelectorAll(".instruction"))
              .forEach(function (e, t) {
                e.addEventListener(
                  "click",
                  L.bind(null, s.instructions[t].point)
                ),
                  e.addEventListener("mouseenter", b.bind(null, "enter")),
                  e.addEventListener("mouseleave", b.bind(null, "leave"));
              }),
          [].slice.call(c).forEach(function (e) {
            e.addEventListener("click", w);
          });
      });
  };
})();
window.GuidancePanel = window.GuidancePanel || guidancePanel;
