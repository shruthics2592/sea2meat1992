! function(e) {
    "use strict";
    var i = {
        pips: function(i) {
            function l(i) {
                var l, s, t, a, n, r = [],
                    p = 0;
                if (b && b.length) {
                    for (t = u.element.slider("values"), a = e.map(t, function(e) {
                            return Math.abs(e - i)
                        }), n = Math.min.apply(Math, a), l = 0; l < a.length; l++) a[l] === n && r.push(l);
                    for (p = r[0], s = 0; s < r.length; s++) u._lastChangedValue === r[s] && (p = r[s])
                }
                return p
            }

            function s(i) {
                if (!u.option("disabled")) {
                    var s = e(i).data("value"),
                        t = l(s);
                    b && b.length ? u.element.slider("values", t, s) : u.element.slider("value", s), u._lastChangedValue = t
                }
            }

            function t(i) {
                var l, s, t = i,
                    n = "ui-slider-pip",
                    r = "";
                "first" === i ? t = 0 : "last" === i && (t = g);
                var p = c + u.options.step * t,
                    d = p.toString().replace(".", "-");
                if (l = "array" === e.type(y.labels) ? y.labels[t] || "" : "object" === e.type(y.labels) ? "first" === i ? y.labels.first || "" : "last" === i ? y.labels.last || "" : "array" === e.type(y.labels.rest) ? y.labels.rest[t - 1] || "" : p : p, "first" === i ? (s = "0%", n += " ui-slider-pip-first", n += "label" === y.first ? " ui-slider-pip-label" : "", n += !1 === y.first ? " ui-slider-pip-hide" : "") : "last" === i ? (s = "100%", n += " ui-slider-pip-last", n += "label" === y.last ? " ui-slider-pip-label" : "", n += !1 === y.last ? " ui-slider-pip-hide" : "") : (s = (100 / g * i).toFixed(4) + "%", n += "label" === y.rest ? " ui-slider-pip-label" : "", n += !1 === y.rest ? " ui-slider-pip-hide" : ""), n += " ui-slider-pip-" + d, b && b.length) {
                    for (a = 0; a < b.length; a++) p === b[a] && (n += " ui-slider-pip-initial-" + (a + 1), n += " ui-slider-pip-selected-" + (a + 1));
                    u.options.range && p > b[0] && p < b[1] && (n += " ui-slider-pip-inrange")
                } else p === v && (n += " ui-slider-pip-initial", n += " ui-slider-pip-selected");
                return r = "horizontal" === u.options.orientation ? "left: " + s : "bottom: " + s, '<span class="' + n + '" style="' + r + '"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="' + p + '">' + y.formatLabel(l) + "</span></span>"
            }
            var a, n, r, p, d, u = this,
                o = "",
                f = e._data(u.element.get(0), "events").mousedown,
                c = u._valueMin(),
                h = u._valueMax(),
                v = u._value(),
                b = u._values(),
                g = (h - c) / u.options.step,
                m = u.element.find(".ui-slider-handle"),
                y = {
                    first: "label",
                    last: "label",
                    rest: "pip",
                    labels: !1,
                    prefix: "",
                    suffix: "",
                    step: g > 100 ? Math.floor(.05 * g) : 1,
                    formatLabel: function(e) {
                        return this.prefix + e + this.suffix
                    }
                };
            e.extend(y, i), u.options.pipStep = y.step, u.element.addClass("ui-slider-pips").find(".ui-slider-pip").remove();
            var x = {
                single: function(e) {
                    this.resetClasses(), d.filter(".ui-slider-pip-" + this.classLabel(e)).addClass("ui-slider-pip-selected")
                },
                range: function(i) {
                    for (this.resetClasses(), a = 0; a < i.length; a++) d.filter(".ui-slider-pip-" + this.classLabel(i[a])).addClass("ui-slider-pip-selected-" + (a + 1));
                    u.options.range && d.each(function(l, s) {
                        var t = e(s).children(".ui-slider-label").data("value");
                        t > i[0] && t < i[1] && e(s).addClass("ui-slider-pip-inrange")
                    })
                },
                classLabel: function(e) {
                    return e.toString().replace(".", "-")
                },
                resetClasses: function() {
                    var e = /(^|\s*)(ui-slider-pip-selected|ui-slider-pip-inrange)(-{1,2}\d+|\s|$)/gi;
                    d.removeClass(function(i, l) {
                        return (l.match(e) || []).join(" ")
                    })
                }
            };
            for (u.options.pipStep = Math.round(u.options.pipStep), o += t("first"), r = 1; g > r; r++) r % u.options.pipStep === 0 && (o += t(r));
            for (o += t("last"), u.element.append(o), d = u.element.find(".ui-slider-pip"), n = 0; n < f.length; n++) "slider" === f[n].namespace && (p = f[n].handler);
            u.element.off("mousedown.slider").on("mousedown.selectPip", function(i) {
                var t = e(i.target),
                    a = l(t.data("value")),
                    n = m.eq(a);
                n.addClass("ui-state-active"), t.is(".ui-slider-label") ? (s(t), u.element.one("mouseup.selectPip", function() {
                    n.removeClass("ui-state-active").focus()
                })) : p(i)
            }), u.element.on("slide.selectPip slidechange.selectPip", function(i, l) {
                var s = e(this),
                    t = s.slider("value"),
                    a = s.slider("values");
                l && (t = l.value, a = l.values), a && a.length ? x.range(a) : x.single(t)
            })
        },
        "float": function(i) {
            function l(i) {
                var l = [],
                    r = e.map(i, function(e) {
                        return Math.ceil((e - a) / t.options.step)
                    });
                if ("array" === e.type(o.labels))
                    for (s = 0; s < i.length; s++) l[s] = o.labels[r[s]] || i[s];
                else if ("object" === e.type(o.labels))
                    for (s = 0; s < i.length; s++) i[s] === a ? l[s] = o.labels.first || a : i[s] === n ? l[s] = o.labels.last || n : "array" === e.type(o.labels.rest) ? l[s] = o.labels.rest[r[s] - 1] || i[s] : l[s] = i[s];
                else
                    for (s = 0; s < i.length; s++) l[s] = i[s];
                return l
            }
            var s, t = this,
                a = t._valueMin(),
                n = t._valueMax(),
                r = t._value(),
                p = t._values(),
                d = [],
                u = t.element.find(".ui-slider-handle"),
                o = {
                    handle: !0,
                    pips: !1,
                    labels: !1,
                    prefix: "",
                    suffix: "",
                    event: "slidechange slide",
                    formatLabel: function(e) {
                        return this.prefix + e + this.suffix
                    }
                };
            if (e.extend(o, i), a > r && (r = a), r > n && (r = n), p && p.length)
                for (s = 0; s < p.length; s++) p[s] < a && (p[s] = a), p[s] > n && (p[s] = n);
            if (t.element.addClass("ui-slider-float").find(".ui-slider-tip, .ui-slider-tip-label").remove(), o.handle)
                for (d = l(p && p.length ? p : [r]), s = 0; s < d.length; s++) u.eq(s).append(e('<span class="ui-slider-tip">' + o.formatLabel(d[s]) + "</span>"));
            o.pips && t.element.find(".ui-slider-label").each(function(i, s) {
                var t, a, n = e(s),
                    r = [n.data("value")];
                t = o.formatLabel(l(r)[0]), a = e('<span class="ui-slider-tip-label">' + t + "</span>").insertAfter(n)
            }), "slide" !== o.event && "slidechange" !== o.event && "slide slidechange" !== o.event && "slidechange slide" !== o.event && (o.event = "slidechange slide"), t.element.on(o.event, function(i, s) {
                var t = "array" === e.type(s.value) ? s.value : [s.value],
                    a = o.formatLabel(l(t)[0]);
                e(s.handle).find(".ui-slider-tip").html(a)
            })
        }
    };
    e.extend(!0, e.ui.slider.prototype, i)
}(jQuery);