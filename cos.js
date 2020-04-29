if (function(t, e, i, o) {
		var s = t(e);
		t.fn.lazyload = function(n) {
			function r() {
				var e = 0;
				a.each(function() {
					var i = t(this);
					if (!(l.skip_invisible && !i.is(":visible") || t.abovethetop(this, l) || t.leftofbegin(this, l)))
						if (t.belowthefold(this, l) || t.rightoffold(this, l)) {
							if (++e > l.failure_limit) return !1
						} else i.trigger("appear"), e = 0
				})
			}
			var a = this,
				l = {
					threshold: 0,
					failure_limit: 0,
					event: "scroll",
					effect: "show",
					container: e,
					data_attribute: "original",
					skip_invisible: !0,
					appear: null,
					load: null,
					placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
				};
			return n && (o !== n.failurelimit && (n.failure_limit = n.failurelimit, delete n.failurelimit), o !== n.effectspeed && (n.effect_speed = n.effectspeed, delete n.effectspeed), t.extend(l, n)), n = l.container === o || l.container === e ? s : t(l.container), 0 === l.event.indexOf("scroll") && n.bind(l.event, function() {
				return r()
			}), this.each(function() {
				var e = this,
					i = t(e);
				e.loaded = !1, (i.attr("src") === o || !1 === i.attr("src")) && i.is("img") && i.attr("src", l.placeholder), i.one("appear", function() {
					this.loaded || (l.appear && l.appear.call(e, a.length, l), t("<img />").bind("load", function() {
						var o = i.attr("data-" + l.data_attribute);
						i.hide(), i.is("img") ? i.attr("src", o) : i.css("background-image", "url('" + o + "')"), i[l.effect](l.effect_speed), e.loaded = !0, o = t.grep(a, function(t) {
							return !t.loaded
						}), a = t(o), l.load && l.load.call(e, a.length, l)
					}).attr("src", i.attr("data-" + l.data_attribute)))
				}), 0 !== l.event.indexOf("scroll") && i.bind(l.event, function() {
					e.loaded || i.trigger("appear")
				})
			}), s.bind("resize", function() {
				r()
			}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && s.bind("pageshow", function(e) {
				e.originalEvent && e.originalEvent.persisted && a.each(function() {
					t(this).trigger("appear")
				})
			}), t(i).ready(function() {
				r()
			}), this
		}, t.belowthefold = function(i, n) {
			return (n.container === o || n.container === e ? (e.innerHeight ? e.innerHeight : s.height()) + s.scrollTop() : t(n.container).offset().top + t(n.container).height()) <= t(i).offset().top - n.threshold
		}, t.rightoffold = function(i, n) {
			return (n.container === o || n.container === e ? s.width() + s.scrollLeft() : t(n.container).offset().left + t(n.container).width()) <= t(i).offset().left - n.threshold
		}, t.abovethetop = function(i, n) {
			return (n.container === o || n.container === e ? s.scrollTop() : t(n.container).offset().top) >= t(i).offset().top + n.threshold + t(i).height()
		}, t.leftofbegin = function(i, n) {
			return (n.container === o || n.container === e ? s.scrollLeft() : t(n.container).offset().left) >= t(i).offset().left + n.threshold + t(i).width()
		}, t.inviewport = function(e, i) {
			return !(t.rightoffold(e, i) || t.leftofbegin(e, i) || t.belowthefold(e, i) || t.abovethetop(e, i))
		}, t.extend(t.expr[":"], {
			"below-the-fold": function(e) {
				return t.belowthefold(e, {
					threshold: 0
				})
			},
			"above-the-top": function(e) {
				return !t.belowthefold(e, {
					threshold: 0
				})
			},
			"right-of-screen": function(e) {
				return t.rightoffold(e, {
					threshold: 0
				})
			},
			"left-of-screen": function(e) {
				return !t.rightoffold(e, {
					threshold: 0
				})
			},
			"in-viewport": function(e) {
				return t.inviewport(e, {
					threshold: 0
				})
			},
			"above-the-fold": function(e) {
				return !t.belowthefold(e, {
					threshold: 0
				})
			},
			"right-of-fold": function(e) {
				return t.rightoffold(e, {
					threshold: 0
				})
			},
			"left-of-fold": function(e) {
				return !t.rightoffold(e, {
					threshold: 0
				})
			}
		})
	}(jQuery, window, document), function(t, e, i) {
		! function(t) {
			"use strict";
			"function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.qtip && t(jQuery)
		}(function(o) {
			"use strict";

			function s(t, e, i, s) {
				this.id = i, this.target = t, this.tooltip = D, this.elements = {
					target: t
				}, this._id = U + "-" + i, this.timers = {
					img: {}
				}, this.options = e, this.plugins = {}, this.cache = {
					event: {},
					target: o(),
					disabled: I,
					attr: s,
					onTooltip: I,
					lastClass: ""
				}, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = I
			}

			function n(t) {
				return t === D || "object" !== o.type(t)
			}

			function r(t) {
				return !(o.isFunction(t) || t && t.attr || t.length || "object" === o.type(t) && (t.jquery || t.then))
			}

			function a(t) {
				var e, i, s, a;
				return n(t) ? I : (n(t.metadata) && (t.metadata = {
					type: t.metadata
				}), "content" in t && (e = t.content, n(e) || e.jquery || e.done ? e = t.content = {
					text: i = r(e) ? I : e
				} : i = e.text, "ajax" in e && (s = e.ajax, a = s && s.once !== I, delete e.ajax, e.text = function(t, e) {
					var n = i || o(this).attr(e.options.content.attr) || "Loading...",
						r = o.ajax(o.extend({}, s, {
							context: e
						})).then(s.success, D, s.error).then(function(t) {
							return t && a && e.set("content.text", t), t
						}, function(t, i, o) {
							e.destroyed || 0 === t.status || e.set("content.text", i + ": " + o)
						});
					return a ? n : (e.set("content.text", n), r)
				}), "title" in e && (o.isPlainObject(e.title) && (e.button = e.title.button, e.title = e.title.text), r(e.title || I) && (e.title = I))), "position" in t && n(t.position) && (t.position = {
					my: t.position,
					at: t.position
				}), "show" in t && n(t.show) && (t.show = t.show.jquery ? {
					target: t.show
				} : t.show === A ? {
					ready: A
				} : {
					event: t.show
				}), "hide" in t && n(t.hide) && (t.hide = t.hide.jquery ? {
					target: t.hide
				} : {
					event: t.hide
				}), "style" in t && n(t.style) && (t.style = {
					classes: t.style
				}), o.each(B, function() {
					this.sanitize && this.sanitize(t)
				}), t)
			}

			function l(t, e) {
				for (var i, o = 0, s = t, n = e.split("."); s = s[n[o++]];) o < n.length && (i = s);
				return [i || t, n.pop()]
			}

			function h(t, e) {
				var i, o, s;
				for (i in this.checks)
					for (o in this.checks[i])(s = new RegExp(o, "i").exec(t)) && (e.push(s), ("builtin" === i || this.plugins[i]) && this.checks[i][o].apply(this.plugins[i] || this, e))
			}

			function d(t) {
				return Q.concat("").join(t ? "-" + t + " " : " ")
			}

			function c(t, e) {
				return e > 0 ? setTimeout(o.proxy(t, this), e) : void t.call(this)
			}

			function p(t) {
				this.tooltip.hasClass(tt) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = c.call(this, function() {
					this.toggle(A, t)
				}, this.options.show.delay))
			}

			function u(t) {
				if (!this.tooltip.hasClass(tt) && !this.destroyed) {
					var e = o(t.relatedTarget),
						i = e.closest(Y)[0] === this.tooltip[0],
						s = e[0] === this.options.show.target[0];
					if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== e[0] && "mouse" === this.options.position.target && i || this.options.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (i || s)) try {
						t.preventDefault(), t.stopImmediatePropagation()
					} catch (t) {} else this.timers.hide = c.call(this, function() {
						this.toggle(I, t)
					}, this.options.hide.delay, this)
				}
			}

			function f(t) {
				!this.tooltip.hasClass(tt) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = c.call(this, function() {
					this.hide(t)
				}, this.options.hide.inactive))
			}

			function g(t) {
				this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
			}

			function m(t, i, s) {
				o(e.body).delegate(t, (i.split ? i : i.join("." + U + " ")) + "." + U, function() {
					var t = T.api[o.attr(this, V)];
					t && !t.disabled && s.apply(t, arguments)
				})
			}

			function v(t, i, n) {
				var r, l, h, d, c, p = o(e.body),
					u = t[0] === e ? p : t,
					f = t.metadata ? t.metadata(n.metadata) : D,
					g = "html5" === n.metadata.type && f ? f[n.metadata.name] : D,
					m = t.data(n.metadata.name || "qtipopts");
				try {
					m = "string" == typeof m ? o.parseJSON(m) : m
				} catch (t) {}
				if (d = o.extend(A, {}, T.defaults, n, "object" == typeof m ? a(m) : D, a(g || f)), l = d.position, d.id = i, "boolean" == typeof d.content.text) {
					if (h = t.attr(d.content.attr), d.content.attr === I || !h) return I;
					d.content.text = h
				}
				if (l.container.length || (l.container = p), l.target === I && (l.target = u), d.show.target === I && (d.show.target = u), d.show.solo === A && (d.show.solo = l.container.closest("body")), d.hide.target === I && (d.hide.target = u), d.position.viewport === A && (d.position.viewport = l.container), l.container = l.container.eq(0), l.at = new _(l.at, A), l.my = new _(l.my), t.data(U))
					if (d.overwrite) t.qtip("destroy", !0);
					else if (d.overwrite === I) return I;
				return t.attr(H, i), d.suppress && (c = t.attr("title")) && t.removeAttr("title").attr(it, c).attr("title", ""), r = new s(t, d, i, !!h), t.data(U, r), r
			}

			function b(t) {
				return t.charAt(0).toUpperCase() + t.slice(1)
			}

			function y(t, e) {
				var o, s, n = e.charAt(0).toUpperCase() + e.slice(1),
					r = (e + " " + vt.join(n + " ") + n).split(" "),
					a = 0;
				if (mt[e]) return t.css(mt[e]);
				for (; o = r[a++];)
					if ((s = t.css(o)) !== i) return mt[e] = o, s
			}

			function w(t, e) {
				return Math.ceil(parseFloat(y(t, e)))
			}

			function x(t, e) {
				this._ns = "tip", this.options = e, this.offset = e.offset, this.size = [e.width, e.height], this.init(this.qtip = t)
			}

			function $(t, e) {
				this.options = e, this._ns = "-modal", this.init(this.qtip = t)
			}

			function C(t) {
				this._ns = "ie6", this.init(this.qtip = t)
			}
			var T, k, _, S, E, A = !0,
				I = !1,
				D = null,
				q = "x",
				O = "y",
				j = "width",
				N = "height",
				z = "top",
				R = "left",
				L = "bottom",
				P = "right",
				W = "center",
				M = "flipinvert",
				F = "shift",
				B = {},
				U = "qtip",
				H = "data-hasqtip",
				V = "data-qtip-id",
				Q = ["ui-widget", "ui-tooltip"],
				Y = "." + U,
				G = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
				X = U + "-fixed",
				J = U + "-default",
				K = U + "-focus",
				Z = U + "-hover",
				tt = U + "-disabled",
				et = "_replacedByqTip",
				it = "oldtitle",
				ot = {
					ie: function() {
						for (var t = 4, i = e.createElement("div");
							(i.innerHTML = "\x3c!--[if gt IE " + t + "]><i></i><![endif]--\x3e") && i.getElementsByTagName("i")[0]; t += 1);
						return t > 4 ? t : NaN
					}(),
					iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || I
				};
			(k = s.prototype)._when = function(t) {
				return o.when.apply(o, t)
			}, k.render = function(t) {
				if (this.rendered || this.destroyed) return this;
				var e = this,
					i = this.options,
					s = this.cache,
					n = this.elements,
					r = i.content.text,
					a = i.content.title,
					l = i.content.button,
					h = i.position,
					d = (this._id, []);
				return o.attr(this.target[0], "aria-describedby", this._id), s.posClass = this._createPosClass((this.position = {
					my: h.my,
					at: h.at
				}).my), this.tooltip = n.tooltip = o("<div/>", {
					id: this._id,
					class: [U, J, i.style.classes, s.posClass].join(" "),
					width: i.style.width || "",
					height: i.style.height || "",
					tracking: "mouse" === h.target && h.adjust.mouse,
					role: "alert",
					"aria-live": "polite",
					"aria-atomic": I,
					"aria-describedby": this._id + "-content",
					"aria-hidden": A
				}).toggleClass(tt, this.disabled).attr(V, this.id).data(U, this).appendTo(h.container).append(n.content = o("<div />", {
					class: U + "-content",
					id: this._id + "-content",
					"aria-atomic": A
				})), this.rendered = -1, this.positioning = A, a && (this._createTitle(), o.isFunction(a) || d.push(this._updateTitle(a, I))), l && this._createButton(), o.isFunction(r) || d.push(this._updateContent(r, I)), this.rendered = A, this._setWidget(), o.each(B, function(t) {
					var i;
					"render" === this.initialize && (i = this(e)) && (e.plugins[t] = i)
				}), this._unassignEvents(), this._assignEvents(), this._when(d).then(function() {
					e._trigger("render"), e.positioning = I, e.hiddenDuringWait || !i.show.ready && !t || e.toggle(A, s.event, I), e.hiddenDuringWait = I
				}), T.api[this.id] = this, this
			}, k.destroy = function(t) {
				function e() {
					if (!this.destroyed) {
						this.destroyed = A;
						var t, e = this.target,
							i = e.attr(it);
						this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), o.each(this.plugins, function() {
							this.destroy && this.destroy()
						});
						for (t in this.timers) clearTimeout(this.timers[t]);
						e.removeData(U).removeAttr(V).removeAttr(H).removeAttr("aria-describedby"), this.options.suppress && i && e.attr("title", i).removeAttr(it), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = D, delete T.api[this.id]
					}
				}
				return this.destroyed ? this.target : (t === A && "hide" !== this.triggering || !this.rendered ? e.call(this) : (this.tooltip.one("tooltiphidden", o.proxy(e, this)), !this.triggering && this.hide()), this.target)
			}, S = k.checks = {
				builtin: {
					"^id$": function(t, e, i, s) {
						var n = i === A ? T.nextid : i,
							r = U + "-" + n;
						n !== I && n.length > 0 && !o("#" + r).length ? (this._id = r, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : t[e] = s
					},
					"^prerender": function(t, e, i) {
						i && !this.rendered && this.render(this.options.show.ready)
					},
					"^content.text$": function(t, e, i) {
						this._updateContent(i)
					},
					"^content.attr$": function(t, e, i, o) {
						this.options.content.text === this.target.attr(o) && this._updateContent(this.target.attr(i))
					},
					"^content.title$": function(t, e, i) {
						return i ? (i && !this.elements.title && this._createTitle(), void this._updateTitle(i)) : this._removeTitle()
					},
					"^content.button$": function(t, e, i) {
						this._updateButton(i)
					},
					"^content.title.(text|button)$": function(t, e, i) {
						this.set("content." + e, i)
					},
					"^position.(my|at)$": function(t, e, i) {
						"string" == typeof i && (this.position[e] = t[e] = new _(i, "at" === e))
					},
					"^position.container$": function(t, e, i) {
						this.rendered && this.tooltip.appendTo(i)
					},
					"^show.ready$": function(t, e, i) {
						i && (!this.rendered && this.render(A) || this.toggle(A))
					},
					"^style.classes$": function(t, e, i, o) {
						this.rendered && this.tooltip.removeClass(o).addClass(i)
					},
					"^style.(width|height)": function(t, e, i) {
						this.rendered && this.tooltip.css(e, i)
					},
					"^style.widget|content.title": function() {
						this.rendered && this._setWidget()
					},
					"^style.def": function(t, e, i) {
						this.rendered && this.tooltip.toggleClass(J, !!i)
					},
					"^events.(render|show|move|hide|focus|blur)$": function(t, e, i) {
						this.rendered && this.tooltip[(o.isFunction(i) ? "" : "un") + "bind"]("tooltip" + e, i)
					},
					"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
						if (this.rendered) {
							var t = this.options.position;
							this.tooltip.attr("tracking", "mouse" === t.target && t.adjust.mouse), this._unassignEvents(), this._assignEvents()
						}
					}
				}
			}, k.get = function(t) {
				if (this.destroyed) return this;
				var e = l(this.options, t.toLowerCase()),
					i = e[0][e[1]];
				return i.precedance ? i.string() : i
			};
			var st = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
				nt = /^prerender|show\.ready/i;
			k.set = function(t, e) {
				if (this.destroyed) return this;
				var i, s = this.rendered,
					n = I,
					r = this.options;
				return this.checks, "string" == typeof t ? (i = t, t = {}, t[i] = e) : t = o.extend({}, t), o.each(t, function(e, i) {
					if (s && nt.test(e)) delete t[e];
					else {
						var a, h = l(r, e.toLowerCase());
						a = h[0][h[1]], h[0][h[1]] = i && i.nodeType ? o(i) : i, n = st.test(e) || n, t[e] = [h[0], h[1], i, a]
					}
				}), a(r), this.positioning = A, o.each(t, o.proxy(h, this)), this.positioning = I, this.rendered && this.tooltip[0].offsetWidth > 0 && n && this.reposition("mouse" === r.position.target ? D : this.cache.event), this
			}, k._update = function(t, e) {
				var i = this,
					s = this.cache;
				return this.rendered && t ? (o.isFunction(t) && (t = t.call(this.elements.target, s.event, this) || ""), o.isFunction(t.then) ? (s.waiting = A, t.then(function(t) {
					return s.waiting = I, i._update(t, e)
				}, D, function(t) {
					return i._update(t, e)
				})) : t === I || !t && "" !== t ? I : (t.jquery && t.length > 0 ? e.empty().append(t.css({
					display: "block",
					visibility: "visible"
				})) : e.html(t), this._waitForContent(e).then(function(t) {
					i.rendered && i.tooltip[0].offsetWidth > 0 && i.reposition(s.event, !t.length)
				}))) : I
			}, k._waitForContent = function(t) {
				var e = this.cache;
				return e.waiting = A, (o.fn.imagesLoaded ? t.imagesLoaded() : o.Deferred().resolve([])).done(function() {
					e.waiting = I
				}).promise()
			}, k._updateContent = function(t, e) {
				this._update(t, this.elements.content, e)
			}, k._updateTitle = function(t, e) {
				this._update(t, this.elements.title, e) === I && this._removeTitle(I)
			}, k._createTitle = function() {
				var t = this.elements,
					e = this._id + "-title";
				t.titlebar && this._removeTitle(), t.titlebar = o("<div />", {
					class: U + "-titlebar " + (this.options.style.widget ? d("header") : "")
				}).append(t.title = o("<div />", {
					id: e,
					class: U + "-title",
					"aria-atomic": A
				})).insertBefore(t.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(t) {
					o(this).toggleClass("ui-state-active ui-state-focus", "down" === t.type.substr(-4))
				}).delegate(".qtip-close", "mouseover mouseout", function(t) {
					o(this).toggleClass("ui-state-hover", "mouseover" === t.type)
				}), this.options.content.button && this._createButton()
			}, k._removeTitle = function(t) {
				var e = this.elements;
				e.title && (e.titlebar.remove(), e.titlebar = e.title = e.button = D, t !== I && this.reposition())
			}, k._createPosClass = function(t) {
				return U + "-pos-" + (t || this.options.position.my).abbrev()
			}, k.reposition = function(i, s) {
				if (!this.rendered || this.positioning || this.destroyed) return this;
				this.positioning = A;
				var n, r, a, l, h = this.cache,
					d = this.tooltip,
					c = this.options.position,
					p = c.target,
					u = c.my,
					f = c.at,
					g = c.viewport,
					m = c.container,
					v = c.adjust,
					b = v.method.split(" "),
					y = d.outerWidth(I),
					w = d.outerHeight(I),
					x = 0,
					$ = 0,
					C = d.css("position"),
					T = {
						left: 0,
						top: 0
					},
					k = d[0].offsetWidth > 0,
					_ = i && "scroll" === i.type,
					S = o(t),
					E = m[0].ownerDocument,
					D = this.mouse;
				if (o.isArray(p) && 2 === p.length) f = {
					x: R,
					y: z
				}, T = {
					left: p[0],
					top: p[1]
				};
				else if ("mouse" === p) f = {
					x: R,
					y: z
				}, (!v.mouse || this.options.hide.distance) && h.origin && h.origin.pageX ? i = h.origin : !i || i && ("resize" === i.type || "scroll" === i.type) ? i = h.event : D && D.pageX && (i = D), "static" !== C && (T = m.offset()), E.body.offsetWidth !== (t.innerWidth || E.documentElement.clientWidth) && (r = o(e.body).offset()), T = {
					left: i.pageX - T.left + (r && r.left || 0),
					top: i.pageY - T.top + (r && r.top || 0)
				}, v.mouse && _ && D && (T.left -= (D.scrollX || 0) - S.scrollLeft(), T.top -= (D.scrollY || 0) - S.scrollTop());
				else {
					if ("event" === p ? i && i.target && "scroll" !== i.type && "resize" !== i.type ? h.target = o(i.target) : i.target || (h.target = this.elements.target) : "event" !== p && (h.target = o(p.jquery ? p : this.elements.target)), p = h.target, 0 === (p = o(p).eq(0)).length) return this;
					p[0] === e || p[0] === t ? (x = ot.iOS ? t.innerWidth : p.width(), $ = ot.iOS ? t.innerHeight : p.height(), p[0] === t && (T = {
						top: (g || p).scrollTop(),
						left: (g || p).scrollLeft()
					})) : B.imagemap && p.is("area") ? n = B.imagemap(this, p, f, B.viewport ? b : I) : B.svg && p && p[0].ownerSVGElement ? n = B.svg(this, p, f, B.viewport ? b : I) : (x = p.outerWidth(I), $ = p.outerHeight(I), T = p.offset()), n && (x = n.width, $ = n.height, r = n.offset, T = n.position), T = this.reposition.offset(p, T, m), (ot.iOS > 3.1 && ot.iOS < 4.1 || ot.iOS >= 4.3 && ot.iOS < 4.33 || !ot.iOS && "fixed" === C) && (T.left -= S.scrollLeft(), T.top -= S.scrollTop()), (!n || n && n.adjustable !== I) && (T.left += f.x === P ? x : f.x === W ? x / 2 : 0, T.top += f.y === L ? $ : f.y === W ? $ / 2 : 0)
				}
				return T.left += v.x + (u.x === P ? -y : u.x === W ? -y / 2 : 0), T.top += v.y + (u.y === L ? -w : u.y === W ? -w / 2 : 0), B.viewport ? (a = T.adjusted = B.viewport(this, T, c, x, $, y, w), r && a.left && (T.left += r.left), r && a.top && (T.top += r.top), a.my && (this.position.my = a.my)) : T.adjusted = {
					left: 0,
					top: 0
				}, h.posClass !== (l = this._createPosClass(this.position.my)) && d.removeClass(h.posClass).addClass(h.posClass = l), this._trigger("move", [T, g.elem || g], i) ? (delete T.adjusted, s === I || !k || isNaN(T.left) || isNaN(T.top) || "mouse" === p || !o.isFunction(c.effect) ? d.css(T) : o.isFunction(c.effect) && (c.effect.call(d, this, o.extend({}, T)), d.queue(function(t) {
					o(this).css({
						opacity: "",
						height: ""
					}), ot.ie && this.style.removeAttribute("filter"), t()
				})), this.positioning = I, this) : this
			}, k.reposition.offset = function(t, i, s) {
				function n(t, e) {
					i.left += e * t.scrollLeft(), i.top += e * t.scrollTop()
				}
				if (!s[0]) return i;
				var r, a, l, h, d = o(t[0].ownerDocument),
					c = !!ot.ie && "CSS1Compat" !== e.compatMode,
					p = s[0];
				do {
					"static" !== (a = o.css(p, "position")) && ("fixed" === a ? (l = p.getBoundingClientRect(), n(d, -1)) : (l = o(p).position(), l.left += parseFloat(o.css(p, "borderLeftWidth")) || 0, l.top += parseFloat(o.css(p, "borderTopWidth")) || 0), i.left -= l.left + (parseFloat(o.css(p, "marginLeft")) || 0), i.top -= l.top + (parseFloat(o.css(p, "marginTop")) || 0), r || "hidden" === (h = o.css(p, "overflow")) || "visible" === h || (r = o(p)))
				} while (p = p.offsetParent);
				return r && (r[0] !== d[0] || c) && n(r, 1), i
			};
			var rt = (_ = k.reposition.Corner = function(t, e) {
				t = ("" + t).replace(/([A-Z])/, " $1").replace(/middle/gi, W).toLowerCase(), this.x = (t.match(/left|right/i) || t.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (t.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!e;
				var i = t.charAt(0);
				this.precedance = "t" === i || "b" === i ? O : q
			}).prototype;
			rt.invert = function(t, e) {
				this[t] = this[t] === R ? P : this[t] === P ? R : e || this[t]
			}, rt.string = function(t) {
				var e = this.x,
					i = this.y,
					o = e !== i ? "center" === e || "center" !== i && (this.precedance === O || this.forceY) ? [i, e] : [e, i] : [e];
				return !1 !== t ? o.join(" ") : o
			}, rt.abbrev = function() {
				var t = this.string(!1);
				return t[0].charAt(0) + (t[1] && t[1].charAt(0) || "")
			}, rt.clone = function() {
				return new _(this.string(), this.forceY)
			}, k.toggle = function(t, i) {
				var s = this.cache,
					n = this.options,
					r = this.tooltip;
				if (i) {
					if (/over|enter/.test(i.type) && s.event && /out|leave/.test(s.event.type) && n.show.target.add(i.target).length === n.show.target.length && r.has(i.relatedTarget).length) return this;
					s.event = o.event.fix(i)
				}
				if (this.waiting && !t && (this.hiddenDuringWait = A), !this.rendered) return t ? this.render(1) : this;
				if (this.destroyed || this.disabled) return this;
				var a, l, h, d = t ? "show" : "hide",
					c = this.options[d],
					p = (this.options[t ? "hide" : "show"], this.options.position),
					u = this.options.content,
					f = this.tooltip.css("width"),
					g = this.tooltip.is(":visible"),
					m = t || 1 === c.target.length,
					v = !i || c.target.length < 2 || s.target[0] === i.target;
				return (typeof t).search("boolean|number") && (t = !g), a = !r.is(":animated") && g === t && v, l = a ? D : !!this._trigger(d, [90]), this.destroyed ? this : (l !== I && t && this.focus(i), !l || a ? this : (o.attr(r[0], "aria-hidden", !t), t ? (this.mouse && (s.origin = o.event.fix(this.mouse)), o.isFunction(u.text) && this._updateContent(u.text, I), o.isFunction(u.title) && this._updateTitle(u.title, I), !E && "mouse" === p.target && p.adjust.mouse && (o(e).bind("mousemove." + U, this._storeMouse), E = A), f || r.css("width", r.outerWidth(I)), this.reposition(i, arguments[2]), f || r.css("width", ""), c.solo && ("string" == typeof c.solo ? o(c.solo) : o(Y, c.solo)).not(r).not(c.target).qtip("hide", o.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete s.origin, E && !o(Y + '[tracking="true"]:visible', c.solo).not(r).length && (o(e).unbind("mousemove." + U), E = I), this.blur(i)), h = o.proxy(function() {
					t ? (ot.ie && r[0].style.removeAttribute("filter"), r.css("overflow", ""), "string" == typeof c.autofocus && o(this.options.show.autofocus, r).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : r.css({
						display: "",
						visibility: "",
						opacity: "",
						left: "",
						top: ""
					}), this._trigger(t ? "visible" : "hidden")
				}, this), c.effect === I || m === I ? (r[d](), h()) : o.isFunction(c.effect) ? (r.stop(1, 1), c.effect.call(r, this), r.queue("fx", function(t) {
					h(), t()
				})) : r.fadeTo(90, t ? 1 : 0, h), t && c.target.trigger("qtip-" + this.id + "-inactive"), this))
			}, k.show = function(t) {
				return this.toggle(A, t)
			}, k.hide = function(t) {
				return this.toggle(I, t)
			}, k.focus = function(t) {
				if (!this.rendered || this.destroyed) return this;
				var e = o(Y),
					i = this.tooltip,
					s = parseInt(i[0].style.zIndex, 10),
					n = T.zindex + e.length;
				return i.hasClass(K) || this._trigger("focus", [n], t) && (s !== n && (e.each(function() {
					this.style.zIndex > s && (this.style.zIndex = this.style.zIndex - 1)
				}), e.filter("." + K).qtip("blur", t)), i.addClass(K)[0].style.zIndex = n), this
			}, k.blur = function(t) {
				return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(K), this._trigger("blur", [this.tooltip.css("zIndex")], t), this)
			}, k.disable = function(t) {
				return this.destroyed ? this : ("toggle" === t ? t = !(this.rendered ? this.tooltip.hasClass(tt) : this.disabled) : "boolean" != typeof t && (t = A), this.rendered && this.tooltip.toggleClass(tt, t).attr("aria-disabled", t), this.disabled = !!t, this)
			}, k.enable = function() {
				return this.disable(I)
			}, k._createButton = function() {
				var t = this,
					e = this.elements,
					i = e.tooltip,
					s = this.options.content.button,
					n = "string" == typeof s ? s : "Close tooltip";
				e.button && e.button.remove(), e.button = s.jquery ? s : o("<a />", {
					class: "qtip-close " + (this.options.style.widget ? "" : U + "-icon"),
					title: n,
					"aria-label": n
				}).prepend(o("<span />", {
					class: "ui-icon ui-icon-close",
					html: "&times;"
				})), e.button.appendTo(e.titlebar || i).attr("role", "button").click(function(e) {
					return i.hasClass(tt) || t.hide(e), I
				})
			}, k._updateButton = function(t) {
				if (!this.rendered) return I;
				var e = this.elements.button;
				t ? this._createButton() : e.remove()
			}, k._setWidget = function() {
				var t = this.options.style.widget,
					e = this.elements,
					i = e.tooltip,
					o = i.hasClass(tt);
				i.removeClass(tt), tt = t ? "ui-state-disabled" : "qtip-disabled", i.toggleClass(tt, o), i.toggleClass("ui-helper-reset " + d(), t).toggleClass(J, this.options.style.def && !t), e.content && e.content.toggleClass(d("content"), t), e.titlebar && e.titlebar.toggleClass(d("header"), t), e.button && e.button.toggleClass(U + "-icon", !t)
			}, k._storeMouse = function(t) {
				return (this.mouse = o.event.fix(t)).type = "mousemove", this
			}, k._bind = function(t, e, i, s, n) {
				if (t && i && e.length) {
					var r = "." + this._id + (s ? "-" + s : "");
					return o(t).bind((e.split ? e : e.join(r + " ")) + r, o.proxy(i, n || this)), this
				}
			}, k._unbind = function(t, e) {
				return t && o(t).unbind("." + this._id + (e ? "-" + e : "")), this
			}, k._trigger = function(t, e, i) {
				var s = o.Event("tooltip" + t);
				return s.originalEvent = i && o.extend({}, i) || this.cache.event || D, this.triggering = t, this.tooltip.trigger(s, [this].concat(e || [])), this.triggering = I, !s.isDefaultPrevented()
			}, k._bindEvents = function(t, e, i, s, n, r) {
				var a = i.filter(s).add(s.filter(i)),
					l = [];
				a.length && (o.each(e, function(e, i) {
					var s = o.inArray(i, t);
					s > -1 && l.push(t.splice(s, 1)[0])
				}), l.length && (this._bind(a, l, function(t) {
					(!!this.rendered && this.tooltip[0].offsetWidth > 0 ? r : n).call(this, t)
				}), i = i.not(a), s = s.not(a))), this._bind(i, t, n), this._bind(s, e, r)
			}, k._assignInitialEvents = function(t) {
				function e(t) {
					return this.disabled || this.destroyed ? I : (this.cache.event = t && o.event.fix(t), this.cache.target = t && o(t.target), clearTimeout(this.timers.show), void(this.timers.show = c.call(this, function() {
						this.render("object" == typeof t || i.show.ready)
					}, i.prerender ? 0 : i.show.delay)))
				}
				var i = this.options,
					s = i.show.target,
					n = i.hide.target,
					r = i.show.event ? o.trim("" + i.show.event).split(" ") : [],
					a = i.hide.event ? o.trim("" + i.hide.event).split(" ") : [];
				this._bind(this.elements.target, ["remove", "removeqtip"], function() {
					this.destroy(!0)
				}, "destroy"), /mouse(over|enter)/i.test(i.show.event) && !/mouse(out|leave)/i.test(i.hide.event) && a.push("mouseleave"), this._bind(s, "mousemove", function(t) {
					this._storeMouse(t), this.cache.onTarget = A
				}), this._bindEvents(r, a, s, n, e, function() {
					return this.timers ? void clearTimeout(this.timers.show) : I
				}), (i.show.ready || i.prerender) && e.call(this, t)
			}, k._assignEvents = function() {
				var i = this,
					s = this.options,
					n = s.position,
					r = this.tooltip,
					a = s.show.target,
					l = s.hide.target,
					h = n.container,
					d = n.viewport,
					c = o(e),
					m = (o(e.body), o(t)),
					v = s.show.event ? o.trim("" + s.show.event).split(" ") : [],
					b = s.hide.event ? o.trim("" + s.hide.event).split(" ") : [];
				o.each(s.events, function(t, e) {
					i._bind(r, "toggle" === t ? ["tooltipshow", "tooltiphide"] : ["tooltip" + t], e, null, r)
				}), /mouse(out|leave)/i.test(s.hide.event) && "window" === s.hide.leave && this._bind(c, ["mouseout", "blur"], function(t) {
					/select|option/.test(t.target.nodeName) || t.relatedTarget || this.hide(t)
				}), s.hide.fixed ? l = l.add(r.addClass(X)) : /mouse(over|enter)/i.test(s.show.event) && this._bind(l, "mouseleave", function() {
					clearTimeout(this.timers.show)
				}), ("" + s.hide.event).indexOf("unfocus") > -1 && this._bind(h.closest("html"), ["mousedown", "touchstart"], function(t) {
					var e = o(t.target),
						i = this.rendered && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0,
						s = e.parents(Y).filter(this.tooltip[0]).length > 0;
					e[0] === this.target[0] || e[0] === this.tooltip[0] || s || this.target.has(e[0]).length || !i || this.hide(t)
				}), "number" == typeof s.hide.inactive && (this._bind(a, "qtip-" + this.id + "-inactive", f, "inactive"), this._bind(l.add(r), T.inactiveEvents, f)), this._bindEvents(v, b, a, l, p, u), this._bind(a.add(r), "mousemove", function(t) {
					if ("number" == typeof s.hide.distance) {
						var e = this.cache.origin || {},
							i = this.options.hide.distance,
							o = Math.abs;
						(o(t.pageX - e.pageX) >= i || o(t.pageY - e.pageY) >= i) && this.hide(t)
					}
					this._storeMouse(t)
				}), "mouse" === n.target && n.adjust.mouse && (s.hide.event && this._bind(a, ["mouseenter", "mouseleave"], function(t) {
					return this.cache ? void(this.cache.onTarget = "mouseenter" === t.type) : I
				}), this._bind(c, "mousemove", function(t) {
					this.rendered && this.cache.onTarget && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
				})), (n.adjust.resize || d.length) && this._bind(o.event.special.resize ? d : m, "resize", g), n.adjust.scroll && this._bind(m.add(n.container), "scroll", g)
			}, k._unassignEvents = function() {
				var i = this.options,
					s = i.show.target,
					n = i.hide.target,
					r = o.grep([this.elements.target[0], this.rendered && this.tooltip[0], i.position.container[0], i.position.viewport[0], i.position.container.closest("html")[0], t, e], function(t) {
						return "object" == typeof t
					});
				s && s.toArray && (r = r.concat(s.toArray())), n && n.toArray && (r = r.concat(n.toArray())), this._unbind(r)._unbind(r, "destroy")._unbind(r, "inactive")
			}, o(function() {
				m(Y, ["mouseenter", "mouseleave"], function(t) {
					var e = "mouseenter" === t.type,
						i = o(t.currentTarget),
						s = o(t.relatedTarget || t.target),
						n = this.options;
					e ? (this.focus(t), i.hasClass(X) && !i.hasClass(tt) && clearTimeout(this.timers.hide)) : "mouse" === n.position.target && n.position.adjust.mouse && n.hide.event && n.show.target && !s.closest(n.show.target[0]).length && this.hide(t), i.toggleClass(Z, e)
				}), m("[" + V + "]", G, f)
			}), T = o.fn.qtip = function(t, e, s) {
				var n = ("" + t).toLowerCase(),
					r = D,
					l = o.makeArray(arguments).slice(1),
					h = l[l.length - 1],
					d = this[0] ? o.data(this[0], U) : D;
				return !arguments.length && d || "api" === n ? d : "string" == typeof t ? (this.each(function() {
					var t = o.data(this, U);
					if (!t) return A;
					if (h && h.timeStamp && (t.cache.event = h), !e || "option" !== n && "options" !== n) t[n] && t[n].apply(t, l);
					else {
						if (s === i && !o.isPlainObject(e)) return r = t.get(e), I;
						t.set(e, s)
					}
				}), r !== D ? r : this) : "object" != typeof t && arguments.length ? void 0 : (d = a(o.extend(A, {}, t)), this.each(function(t) {
					var e, i;
					return i = o.isArray(d.id) ? d.id[t] : d.id, i = !i || i === I || i.length < 1 || T.api[i] ? T.nextid++ : i, e = v(o(this), i, d), e === I ? A : (T.api[i] = e, o.each(B, function() {
						"initialize" === this.initialize && this(e)
					}), void e._assignInitialEvents(h))
				}))
			}, o.qtip = s, T.api = {}, o.each({
				attr: function(t, e) {
					if (this.length) {
						var i = this[0],
							s = "title",
							n = o.data(i, "qtip");
						if (t === s && n && "object" == typeof n && n.options.suppress) return arguments.length < 2 ? o.attr(i, it) : (n && n.options.content.attr === s && n.cache.attr && n.set("content.text", e), this.attr(it, e))
					}
					return o.fn["attr" + et].apply(this, arguments)
				},
				clone: function(t) {
					var e = (o([]), o.fn["clone" + et].apply(this, arguments));
					return t || e.filter("[" + it + "]").attr("title", function() {
						return o.attr(this, it)
					}).removeAttr(it), e
				}
			}, function(t, e) {
				if (!e || o.fn[t + et]) return A;
				var i = o.fn[t + et] = o.fn[t];
				o.fn[t] = function() {
					return e.apply(this, arguments) || i.apply(this, arguments)
				}
			}), o.ui || (o["cleanData" + et] = o.cleanData, o.cleanData = function(t) {
				for (var e, i = 0;
					(e = o(t[i])).length; i++)
					if (e.attr(H)) try {
						e.triggerHandler("removeqtip")
					} catch (t) {}
				o["cleanData" + et].apply(this, arguments)
			}), T.version = "2.2.1", T.nextid = 0, T.inactiveEvents = G, T.zindex = 15e3, T.defaults = {
				prerender: I,
				id: I,
				overwrite: A,
				suppress: A,
				content: {
					text: A,
					attr: "title",
					title: I,
					button: I
				},
				position: {
					my: "top left",
					at: "bottom right",
					target: I,
					container: I,
					viewport: I,
					adjust: {
						x: 0,
						y: 0,
						mouse: A,
						scroll: A,
						resize: A,
						method: "flipinvert flipinvert"
					},
					effect: function(t, e) {
						o(this).animate(e, {
							duration: 200,
							queue: I
						})
					}
				},
				show: {
					target: I,
					event: "mouseenter",
					effect: A,
					delay: 90,
					solo: I,
					ready: I,
					autofocus: I
				},
				hide: {
					target: I,
					event: "mouseleave",
					effect: A,
					delay: 0,
					fixed: I,
					inactive: I,
					leave: "window",
					distance: I
				},
				style: {
					classes: "",
					widget: I,
					width: I,
					height: I,
					def: A
				},
				events: {
					render: D,
					move: D,
					show: D,
					hide: D,
					toggle: D,
					visible: D,
					hidden: D,
					focus: D,
					blur: D
				}
			};
			var at, lt = "margin",
				ht = "border",
				dt = "color",
				ct = "background-color",
				pt = "transparent",
				ut = " !important",
				ft = !!e.createElement("canvas").getContext,
				gt = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
				mt = {},
				vt = ["Webkit", "O", "Moz", "ms"];
			if (ft) var bt = t.devicePixelRatio || 1,
				yt = function() {
					var t = e.createElement("canvas").getContext("2d");
					return t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || 1
				}(),
				wt = bt / yt;
			else var xt = function(t, e, i) {
				return "<qtipvml:" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (e || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />'
			};
			o.extend(x.prototype, {
				init: function(t) {
					var e, i;
					i = this.element = t.elements.tip = o("<div />", {
						class: U + "-tip"
					}).prependTo(t.tooltip), ft ? (e = o("<canvas />").appendTo(this.element)[0].getContext("2d"), e.lineJoin = "miter", e.miterLimit = 1e5, e.save()) : (e = xt("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(e + e), t._bind(o("*", i).add(i), ["click", "mousedown"], function(t) {
						t.stopPropagation()
					}, this._ns)), t._bind(t.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create()
				},
				_swapDimensions: function() {
					this.size[0] = this.options.height, this.size[1] = this.options.width
				},
				_resetDimensions: function() {
					this.size[0] = this.options.width, this.size[1] = this.options.height
				},
				_useTitle: function(t) {
					var e = this.qtip.elements.titlebar;
					return e && (t.y === z || t.y === W && this.element.position().top + this.size[1] / 2 + this.options.offset < e.outerHeight(A))
				},
				_parseCorner: function(t) {
					var e = this.qtip.options.position.my;
					return t === I || e === I ? t = I : t === A ? t = new _(e.string()) : t.string || (t = new _(t), t.fixed = A), t
				},
				_parseWidth: function(t, e, i) {
					var o = this.qtip.elements,
						s = ht + b(e) + "Width";
					return (i ? w(i, s) : w(o.content, s) || w(this._useTitle(t) && o.titlebar || o.content, s) || w(o.tooltip, s)) || 0
				},
				_parseRadius: function(t) {
					var e = this.qtip.elements,
						i = ht + b(t.y) + b(t.x) + "Radius";
					return ot.ie < 9 ? 0 : w(this._useTitle(t) && e.titlebar || e.content, i) || w(e.tooltip, i) || 0
				},
				_invalidColour: function(t, e, i) {
					var o = t.css(e);
					return !o || i && o === t.css(i) || gt.test(o) ? I : o
				},
				_parseColours: function(t) {
					var e = this.qtip.elements,
						i = this.element.css("cssText", ""),
						s = ht + b(t[t.precedance]) + b(dt),
						n = this._useTitle(t) && e.titlebar || e.content,
						r = this._invalidColour,
						a = [];
					return a[0] = r(i, ct) || r(n, ct) || r(e.content, ct) || r(e.tooltip, ct) || i.css(ct), a[1] = r(i, s, dt) || r(n, s, dt) || r(e.content, s, dt) || r(e.tooltip, s, dt) || e.tooltip.css(s), o("*", i).add(i).css("cssText", ct + ":" + pt + ut + ";" + ht + ":0" + ut + ";"), a
				},
				_calculateSize: function(t) {
					var e, i, o, s = t.precedance === O,
						n = this.options.width,
						r = this.options.height,
						a = "c" === t.abbrev(),
						l = (s ? n : r) * (a ? .5 : 1),
						h = Math.pow,
						d = Math.round,
						c = Math.sqrt(h(l, 2) + h(r, 2)),
						p = [this.border / l * c, this.border / r * c];
					return p[2] = Math.sqrt(h(p[0], 2) - h(this.border, 2)), p[3] = Math.sqrt(h(p[1], 2) - h(this.border, 2)), e = c + p[2] + p[3] + (a ? 0 : p[0]), i = e / c, o = [d(i * n), d(i * r)], s ? o : o.reverse()
				},
				_calculateTip: function(t, e, i) {
					i = i || 1;
					var o = (e = e || this.size)[0] * i,
						s = e[1] * i,
						n = Math.ceil(o / 2),
						r = Math.ceil(s / 2),
						a = {
							br: [0, 0, o, s, o, 0],
							bl: [0, 0, o, 0, 0, s],
							tr: [0, s, o, 0, o, s],
							tl: [0, 0, 0, s, o, s],
							tc: [0, s, n, 0, o, s],
							bc: [0, 0, o, 0, n, s],
							rc: [0, 0, o, r, 0, s],
							lc: [o, 0, o, s, 0, r]
						};
					return a.lt = a.br, a.rt = a.bl, a.lb = a.tr, a.rb = a.tl, a[t.abbrev()]
				},
				_drawCoords: function(t, e) {
					t.beginPath(), t.moveTo(e[0], e[1]), t.lineTo(e[2], e[3]), t.lineTo(e[4], e[5]), t.closePath()
				},
				create: function() {
					var t = this.corner = (ft || ot.ie) && this._parseCorner(this.options.corner);
					return (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = t.clone(), this.update()), this.element.toggle(this.enabled), this.corner
				},
				update: function(e, i) {
					if (!this.enabled) return this;
					var s, n, r, a, l, h, d, c, p = this.qtip.elements,
						u = this.element,
						f = u.children(),
						g = this.options,
						m = this.size,
						v = g.mimic,
						b = Math.round;
					e || (e = this.qtip.cache.corner || this.corner), v === I ? v = e : (v = new _(v), v.precedance = e.precedance, "inherit" === v.x ? v.x = e.x : "inherit" === v.y ? v.y = e.y : v.x === v.y && (v[e.precedance] = e[e.precedance])), n = v.precedance, e.precedance === q ? this._swapDimensions() : this._resetDimensions(), (s = this.color = this._parseColours(e))[1] !== pt ? (c = this.border = this._parseWidth(e, e[e.precedance]), g.border && 1 > c && !gt.test(s[1]) && (s[0] = s[1]), this.border = c = g.border !== A ? g.border : c) : this.border = c = 0, d = this.size = this._calculateSize(e), u.css({
						width: d[0],
						height: d[1],
						lineHeight: d[1] + "px"
					}), h = e.precedance === O ? [b(v.x === R ? c : v.x === P ? d[0] - m[0] - c : (d[0] - m[0]) / 2), b(v.y === z ? d[1] - m[1] : 0)] : [b(v.x === R ? d[0] - m[0] : 0), b(v.y === z ? c : v.y === L ? d[1] - m[1] - c : (d[1] - m[1]) / 2)], ft ? ((r = f[0].getContext("2d")).restore(), r.save(), r.clearRect(0, 0, 6e3, 6e3), a = this._calculateTip(v, m, wt), l = this._calculateTip(v, this.size, wt), f.attr(j, d[0] * wt).attr(N, d[1] * wt), f.css(j, d[0]).css(N, d[1]), this._drawCoords(r, l), r.fillStyle = s[1], r.fill(), r.translate(h[0] * wt, h[1] * wt), this._drawCoords(r, a), r.fillStyle = s[0], r.fill()) : (a = this._calculateTip(v), a = "m" + a[0] + "," + a[1] + " l" + a[2] + "," + a[3] + " " + a[4] + "," + a[5] + " xe", h[2] = c && /^(r|b)/i.test(e.string()) ? 8 === ot.ie ? 2 : 1 : 0, f.css({
						coordsize: d[0] + c + " " + (d[1] + c),
						antialias: "" + (v.string().indexOf(W) > -1),
						left: h[0] - h[2] * Number(n === q),
						top: h[1] - h[2] * Number(n === O),
						width: d[0] + c,
						height: d[1] + c
					}).each(function(t) {
						var e = o(this);
						e[e.prop ? "prop" : "attr"]({
							coordsize: d[0] + c + " " + (d[1] + c),
							path: a,
							fillcolor: s[0],
							filled: !!t,
							stroked: !t
						}).toggle(!(!c && !t)), !t && e.html(xt("stroke", 'weight="' + 2 * c + 'px" color="' + s[1] + '" miterlimit="1000" joinstyle="miter"'))
					})), t.opera && setTimeout(function() {
						p.tip.css({
							display: "inline-block",
							visibility: "visible"
						})
					}, 1), i !== I && this.calculate(e, d)
				},
				calculate: function(t, e) {
					if (!this.enabled) return I;
					var i, s, n = this,
						r = this.qtip.elements,
						a = this.element,
						l = this.options.offset,
						h = (r.tooltip.hasClass("ui-widget"), {});
					return t = t || this.corner, i = t.precedance, e = e || this._calculateSize(t), s = [t.x, t.y], i === q && s.reverse(), o.each(s, function(o, s) {
						var a, d, c;
						s === W ? (a = i === O ? R : z, h[a] = "50%", h[lt + "-" + a] = -Math.round(e[i === O ? 0 : 1] / 2) + l) : (a = n._parseWidth(t, s, r.tooltip), d = n._parseWidth(t, s, r.content), c = n._parseRadius(t), h[s] = Math.max(-n.border, o ? d : l + (c > a ? c : -a)))
					}), h[t[i]] -= e[i === q ? 0 : 1], a.css({
						margin: "",
						top: "",
						bottom: "",
						left: "",
						right: ""
					}).css(h), h
				},
				reposition: function(t, e, o) {
					function s(t, e, i, o, s) {
						t === F && h.precedance === e && d[o] && h[i] !== W ? h.precedance = h.precedance === q ? O : q : t !== F && d[o] && (h[e] = h[e] === W ? d[o] > 0 ? o : s : h[e] === o ? s : o)
					}

					function n(t, e, s) {
						h[t] === W ? g[lt + "-" + e] = f[t] = r[lt + "-" + e] - d[e] : (a = r[s] !== i ? [d[e], -r[e]] : [-d[e], r[e]], (f[t] = Math.max(a[0], a[1])) > a[0] && (o[e] -= d[e], f[e] = I), g[r[s] !== i ? s : e] = f[t])
					}
					if (this.enabled) {
						var r, a, l = e.cache,
							h = this.corner.clone(),
							d = o.adjusted,
							c = e.options.position.adjust.method.split(" "),
							p = c[0],
							u = c[1] || c[0],
							f = {
								left: I,
								top: I,
								x: 0,
								y: 0
							},
							g = {};
						this.corner.fixed !== A && (s(p, q, O, R, P), s(u, O, q, z, L), (h.string() !== l.corner.string() || l.cornerTop !== d.top || l.cornerLeft !== d.left) && this.update(h, I)), (r = this.calculate(h)).right !== i && (r.left = -r.right), r.bottom !== i && (r.top = -r.bottom), r.user = this.offset, (f.left = p === F && !!d.left) && n(q, R, P), (f.top = u === F && !!d.top) && n(O, z, L), this.element.css(g).toggle(!(f.x && f.y || h.x === W && f.y || h.y === W && f.x)), o.left -= r.left.charAt ? r.user : p !== F || f.top || !f.left && !f.top ? r.left + this.border : 0, o.top -= r.top.charAt ? r.user : u !== F || f.left || !f.left && !f.top ? r.top + this.border : 0, l.cornerLeft = d.left, l.cornerTop = d.top, l.corner = h.clone()
					}
				},
				destroy: function() {
					this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
				}
			}), (at = B.tip = function(t) {
				return new x(t, t.options.style.tip)
			}).initialize = "render", at.sanitize = function(t) {
				if (t.style && "tip" in t.style) {
					var e = t.style.tip;
					"object" != typeof e && (e = t.style.tip = {
						corner: e
					}), /string|boolean/i.test(typeof e.corner) || (e.corner = A)
				}
			}, S.tip = {
				"^position.my|style.tip.(corner|mimic|border)$": function() {
					this.create(), this.qtip.reposition()
				},
				"^style.tip.(height|width)$": function(t) {
					this.size = [t.width, t.height], this.update(), this.qtip.reposition()
				},
				"^content.title|style.(classes|widget)$": function() {
					this.update()
				}
			}, o.extend(A, T.defaults, {
				style: {
					tip: {
						corner: A,
						mimic: I,
						width: 6,
						height: 6,
						border: A,
						offset: 0
					}
				}
			});
			var $t, Ct, Tt = "qtip-modal",
				kt = "." + Tt;
			Ct = new(Ct = function() {
				function t(t) {
					if (o.expr[":"].focusable) return o.expr[":"].focusable;
					var e, i, s, n = !isNaN(o.attr(t, "tabindex")),
						r = t.nodeName && t.nodeName.toLowerCase();
					return "area" === r ? (e = t.parentNode, i = e.name, !(!t.href || !i || "map" !== e.nodeName.toLowerCase()) && (!!(s = o("img[usemap=#" + i + "]")[0]) && s.is(":visible"))) : /input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || n : n
				}

				function i(t) {
					d.length < 1 && t.length ? t.not("body").blur() : d.first().focus()
				}

				function s(t) {
					if (l.is(":visible")) {
						var e = o(t.target),
							s = n.tooltip,
							a = e.closest(Y);
						(a.length < 1 ? I : parseInt(a[0].style.zIndex, 10) > parseInt(s[0].style.zIndex, 10)) || e.closest(Y)[0] === s[0] || i(e), r = t.target === d[d.length - 1]
					}
				}
				var n, r, a, l, h = this,
					d = {};
				o.extend(h, {
					init: function() {
						return l = h.elem = o("<div />", {
							id: "qtip-overlay",
							html: "<div></div>",
							mousedown: function() {
								return I
							}
						}).hide(), o(e.body).bind("focusin" + kt, s), o(e).bind("keydown" + kt, function(t) {
							n && n.options.show.modal.escape && 27 === t.keyCode && n.hide(t)
						}), l.bind("click" + kt, function(t) {
							n && n.options.show.modal.blur && n.hide(t)
						}), h
					},
					update: function(e) {
						n = e, d = e.options.show.modal.stealfocus !== I ? e.tooltip.find("*").filter(function() {
							return t(this)
						}) : []
					},
					toggle: function(t, s, r) {
						var d = (o(e.body), t.tooltip),
							c = t.options.show.modal,
							p = c.effect,
							u = s ? "show" : "hide",
							f = l.is(":visible"),
							g = o(kt).filter(":visible:not(:animated)").not(d);
						return h.update(t), s && c.stealfocus !== I && i(o(":focus")), l.toggleClass("blurs", c.blur), s && l.appendTo(e.body), l.is(":animated") && f === s && a !== I || !s && g.length ? h : (l.stop(A, I), o.isFunction(p) ? p.call(l, s) : p === I ? l[u]() : l.fadeTo(parseInt(r, 10) || 90, s ? 1 : 0, function() {
							s || l.hide()
						}), s || l.queue(function(t) {
							l.css({
								left: "",
								top: ""
							}), o(kt).length || l.detach(), t()
						}), a = s, n.destroyed && (n = D), h)
					}
				}), h.init()
			}), o.extend($.prototype, {
				init: function(t) {
					var e = t.tooltip;
					return this.options.on ? (t.elements.overlay = Ct.elem, e.addClass(Tt).css("z-index", T.modal_zindex + o(kt).length), t._bind(e, ["tooltipshow", "tooltiphide"], function(t, i, s) {
						var n = t.originalEvent;
						if (t.target === e[0])
							if (n && "tooltiphide" === t.type && /mouse(leave|enter)/.test(n.type) && o(n.relatedTarget).closest(Ct.elem[0]).length) try {
								t.preventDefault()
							} catch (t) {} else(!n || n && "tooltipsolo" !== n.type) && this.toggle(t, "tooltipshow" === t.type, s)
					}, this._ns, this), t._bind(e, "tooltipfocus", function(t, i) {
						if (!t.isDefaultPrevented() && t.target === e[0]) {
							var s = o(kt),
								n = T.modal_zindex + s.length,
								r = parseInt(e[0].style.zIndex, 10);
							Ct.elem[0].style.zIndex = n - 1, s.each(function() {
								this.style.zIndex > r && (this.style.zIndex -= 1)
							}), s.filter("." + K).qtip("blur", t.originalEvent), e.addClass(K)[0].style.zIndex = n, Ct.update(i);
							try {
								t.preventDefault()
							} catch (t) {}
						}
					}, this._ns, this), void t._bind(e, "tooltiphide", function(t) {
						t.target === e[0] && o(kt).filter(":visible").not(e).last().qtip("focus", t)
					}, this._ns, this)) : this
				},
				toggle: function(t, e, i) {
					return t && t.isDefaultPrevented() ? this : void Ct.toggle(this.qtip, !!e, i)
				},
				destroy: function() {
					this.qtip.tooltip.removeClass(Tt), this.qtip._unbind(this.qtip.tooltip, this._ns), Ct.toggle(this.qtip, I), delete this.qtip.elements.overlay
				}
			}), ($t = B.modal = function(t) {
				return new $(t, t.options.show.modal)
			}).sanitize = function(t) {
				t.show && ("object" != typeof t.show.modal ? t.show.modal = {
					on: !!t.show.modal
				} : void 0 === t.show.modal.on && (t.show.modal.on = A))
			}, T.modal_zindex = T.zindex - 200, $t.initialize = "render", S.modal = {
				"^show.modal.(on|blur)$": function() {
					this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
				}
			}, o.extend(A, T.defaults, {
				show: {
					modal: {
						on: I,
						effect: A,
						blur: A,
						stealfocus: A,
						escape: A
					}
				}
			}), B.viewport = function(i, o, s, n, r, a, l) {
				function h(t, e, i, s, n, r, a, l, h) {
					var d = o[n],
						b = w[t],
						y = x[t],
						$ = i === F,
						C = b === n ? h : b === r ? -h : -h / 2,
						T = y === n ? l : y === r ? -l : -l / 2,
						k = m[n] + v[n] - (u ? 0 : p[n]),
						_ = k - d,
						S = d + h - (a === j ? f : g) - k,
						E = C - (w.precedance === t || b === w[e] ? T : 0) - (y === W ? l / 2 : 0);
					return $ ? (E = (b === n ? 1 : -1) * C, o[n] += _ > 0 ? _ : S > 0 ? -S : 0, o[n] = Math.max(-p[n] + v[n], d - E, Math.min(Math.max(-p[n] + v[n] + (a === j ? f : g), d + E), o[n], "center" === b ? d - C : 1e9))) : (s *= i === M ? 2 : 0, _ > 0 && (b !== n || S > 0) ? (o[n] -= E + s, c.invert(t, n)) : S > 0 && (b !== r || _ > 0) && (o[n] -= (b === W ? -E : E) + s, c.invert(t, r)), o[n] < m && -o[n] > S && (o[n] = d, c = w.clone())), o[n] - d
				}
				var d, c, p, u, f, g, m, v, b = s.target,
					y = i.elements.tooltip,
					w = s.my,
					x = s.at,
					$ = s.adjust,
					C = $.method.split(" "),
					T = C[0],
					k = C[1] || C[0],
					_ = s.viewport,
					S = s.container,
					E = (i.cache, {
						left: 0,
						top: 0
					});
				return _.jquery && b[0] !== t && b[0] !== e.body && "none" !== $.method ? (p = S.offset() || E, u = "static" === S.css("position"), d = "fixed" === y.css("position"), f = _[0] === t ? _.width() : _.outerWidth(I), g = _[0] === t ? _.height() : _.outerHeight(I), m = {
					left: d ? 0 : _.scrollLeft(),
					top: d ? 0 : _.scrollTop()
				}, v = _.offset() || E, ("shift" !== T || "shift" !== k) && (c = w.clone()), E = {
					left: "none" !== T ? h(q, O, T, $.x, R, P, j, n, a) : 0,
					top: "none" !== k ? h(O, q, k, $.y, z, L, N, r, l) : 0,
					my: c
				}) : E
			}, B.polys = {
				polygon: function(t, e) {
					var i, o, s, n = {
							width: 0,
							height: 0,
							position: {
								top: 1e10,
								right: 0,
								bottom: 0,
								left: 1e10
							},
							adjustable: I
						},
						r = 0,
						a = [],
						l = 1,
						h = 1,
						d = 0,
						c = 0;
					for (r = t.length; r--;)(i = [parseInt(t[--r], 10), parseInt(t[r + 1], 10)])[0] > n.position.right && (n.position.right = i[0]), i[0] < n.position.left && (n.position.left = i[0]), i[1] > n.position.bottom && (n.position.bottom = i[1]), i[1] < n.position.top && (n.position.top = i[1]), a.push(i);
					if (o = n.width = Math.abs(n.position.right - n.position.left), s = n.height = Math.abs(n.position.bottom - n.position.top), "c" === e.abbrev()) n.position = {
						left: n.position.left + n.width / 2,
						top: n.position.top + n.height / 2
					};
					else {
						for (; o > 0 && s > 0 && l > 0 && h > 0;)
							for (o = Math.floor(o / 2), s = Math.floor(s / 2), e.x === R ? l = o : e.x === P ? l = n.width - o : l += Math.floor(o / 2), e.y === z ? h = s : e.y === L ? h = n.height - s : h += Math.floor(s / 2), r = a.length; r-- && !(a.length < 2);) d = a[r][0] - n.position.left, c = a[r][1] - n.position.top, (e.x === R && d >= l || e.x === P && l >= d || e.x === W && (l > d || d > n.width - l) || e.y === z && c >= h || e.y === L && h >= c || e.y === W && (h > c || c > n.height - h)) && a.splice(r, 1);
						n.position = {
							left: a[0][0],
							top: a[0][1]
						}
					}
					return n
				},
				rect: function(t, e, i, o) {
					return {
						width: Math.abs(i - t),
						height: Math.abs(o - e),
						position: {
							left: Math.min(t, i),
							top: Math.min(e, o)
						}
					}
				},
				_angles: {
					tc: 1.5,
					tr: 7 / 4,
					tl: 5 / 4,
					bc: .5,
					br: .25,
					bl: .75,
					rc: 2,
					lc: 1,
					c: 0
				},
				ellipse: function(t, e, i, o, s) {
					var n = B.polys._angles[s.abbrev()],
						r = 0 === n ? 0 : i * Math.cos(n * Math.PI),
						a = o * Math.sin(n * Math.PI);
					return {
						width: 2 * i - Math.abs(r),
						height: 2 * o - Math.abs(a),
						position: {
							left: t + r,
							top: e + a
						},
						adjustable: I
					}
				},
				circle: function(t, e, i, o) {
					return B.polys.ellipse(t, e, i, i, o)
				}
			}, B.svg = function(t, i, s) {
				for (var n, r, a, l, h, d, c, p, u, f = (o(e), i[0]), g = o(f.ownerSVGElement), m = f.ownerDocument, v = (parseInt(i.css("stroke-width"), 10) || 0) / 2; !f.getBBox;) f = f.parentNode;
				if (!f.getBBox || !f.parentNode) return I;
				switch (f.nodeName) {
					case "ellipse":
					case "circle":
						p = B.polys.ellipse(f.cx.baseVal.value, f.cy.baseVal.value, (f.rx || f.r).baseVal.value + v, (f.ry || f.r).baseVal.value + v, s);
						break;
					case "line":
					case "polygon":
					case "polyline":
						for (p = [], d = -1, l = (c = f.points || [{
								x: f.x1.baseVal.value,
								y: f.y1.baseVal.value
							}, {
								x: f.x2.baseVal.value,
								y: f.y2.baseVal.value
							}]).numberOfItems || c.length; ++d < l;) h = c.getItem ? c.getItem(d) : c[d], p.push.apply(p, [h.x, h.y]);
						p = B.polys.polygon(p, s);
						break;
					default:
						p = {
							width: (p = f.getBBox()).width,
							height: p.height,
							position: {
								left: p.x,
								top: p.y
							}
						}
				}
				return u = p.position, (g = g[0]).createSVGPoint && (r = f.getScreenCTM(), c = g.createSVGPoint(), c.x = u.left, c.y = u.top, a = c.matrixTransform(r), u.left = a.x, u.top = a.y), m !== e && "mouse" !== t.position.target && (n = o((m.defaultView || m.parentWindow).frameElement).offset()) && (u.left += n.left, u.top += n.top), m = o(m), u.left += m.scrollLeft(), u.top += m.scrollTop(), p
			}, B.imagemap = function(t, e, i) {
				e.jquery || (e = o(e));
				var s, n, r, a, l, h = (e.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
					d = o('img[usemap="#' + e.parent("map").attr("name") + '"]'),
					c = o.trim(e.attr("coords")).replace(/,$/, "").split(",");
				if (!d.length) return I;
				if ("polygon" === h) a = B.polys.polygon(c, i);
				else {
					if (!B.polys[h]) return I;
					for (r = -1, l = c.length, n = []; ++r < l;) n.push(parseInt(c[r], 10));
					a = B.polys[h].apply(this, n.concat(i))
				}
				return s = d.offset(), s.left += Math.ceil((d.outerWidth(I) - d.width()) / 2), s.top += Math.ceil((d.outerHeight(I) - d.height()) / 2), a.position.left += s.left, a.position.top += s.top, a
			};
			o.extend(C.prototype, {
				_scroll: function() {
					var e = this.qtip.elements.overlay;
					e && (e[0].style.top = o(t).scrollTop() + "px")
				},
				init: function(i) {
					var s = i.tooltip;
					o("select, object").length < 1 && (this.bgiframe = i.elements.bgiframe = o('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>').appendTo(s), i._bind(s, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = o("<div/>", {
						id: U + "-rcontainer"
					}).appendTo(e.body), i.elements.overlay && i.elements.overlay.addClass("qtipmodal-ie6fix") && (i._bind(t, ["scroll", "resize"], this._scroll, this._ns, this), i._bind(s, ["tooltipshow"], this._scroll, this._ns, this)), this.redraw()
				},
				adjustBGIFrame: function() {
					var t, e, i = this.qtip.tooltip,
						o = {
							height: i.outerHeight(I),
							width: i.outerWidth(I)
						},
						s = this.qtip.plugins.tip,
						n = this.qtip.elements.tip;
					e = {
						left: -(e = parseInt(i.css("borderLeftWidth"), 10) || 0),
						top: -e
					}, s && n && (t = "x" === s.corner.precedance ? [j, R] : [N, z], e[t[1]] -= n[t[0]]()), this.bgiframe.css(e).css(o)
				},
				redraw: function() {
					if (this.qtip.rendered < 1 || this.drawing) return this;
					var t, e, i, o, s = this.qtip.tooltip,
						n = this.qtip.options.style,
						r = this.qtip.options.position.container;
					return this.qtip.drawing = 1, n.height && s.css(N, n.height), n.width ? s.css(j, n.width) : (s.css(j, "").appendTo(this.redrawContainer), 1 > (e = s.width()) % 2 && (e += 1), i = s.css("maxWidth") || "", o = s.css("minWidth") || "", t = (i + o).indexOf("%") > -1 ? r.width() / 100 : 0, i = (i.indexOf("%") > -1 ? t : 1) * parseInt(i, 10) || e, o = (o.indexOf("%") > -1 ? t : 1) * parseInt(o, 10) || 0, e = i + o ? Math.min(Math.max(e, o), i) : e, s.css(j, Math.round(e)).appendTo(r)), this.drawing = 0, this
				},
				destroy: function() {
					this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([t, this.qtip.tooltip], this._ns)
				}
			}), (B.ie6 = function(t) {
				return 6 === ot.ie ? new C(t) : I
			}).initialize = "render", S.ie6 = {
				"^content|style$": function() {
					this.redraw()
				}
			}
		})
	}(window, document), jQuery(document).ready(function() {
		$(".complete-casts").each(function() {
			$(this).find("span").slice(24).addClass("more")
		}), $(".read-more-show").on("click", function() {
			$(".more").toggle()
		})
	}), $(document).ready(function() {
		$(".complete-casts").click(function() {
			$(".read-more-show").fadeOut(function() {
				$(".read-more-show").text("Show More" == $(".read-more-show").text() ? "Show Less" : "Show More").fadeIn()
			})
		})
	}), $(document).ready(function() {
		$("#search a.box-title").click(function() {
			$("#search .box").toggleClass("active")
		}), $(".mobile-menu").click(function() {
			$("#menu,.mobile-menu").toggleClass("active"), $("#search, .mobile-search").removeClass("active")
		}), $(".mobile-search").click(function() {
			$("#search,.mobile-search").toggleClass("active"), $("#menu, .mobile-menu").removeClass("active")
		}), $(".filter-toggle").click(function() {
			$("#filter").toggleClass("active"), $(".filter-toggle").toggleClass("active")
		}), $(".bp-btn-light").click(function() {
			$(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").toggleClass("active")
		}), $("#overlay").click(function() {
			$(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").removeClass("active")
		}), $(".bp-btn-auto").click(function() {
			$(".bp-btn-auto").toggleClass("active")
		}), $("#toggle, .cac-close").click(function() {
			$("#comment").toggleClass("active")
		}), $(".top-menu> li").bind("mouseover", function() {
			$(this).find(".sub-container").css("display", "block")
		}), $(".top-menu> li").bind("mouseout", function() {
			$(this).find(".sub-container").css("display", "none")
		});
		var t = 0;
		$(window).on("scroll", function() {
			$(window).scrollTop() < t ? "fixed" != $("header").css("position") && ($("header").css({
				position: "fixed",
				top: -$("header").outerHeight(),
				backgroundColor: "#fff"
			}), $("header").animate({
				top: "0px"
			}, 500), $("#main").css("padding-top", $("header").outerHeight())) : ($("header").css({
				position: "relative",
				top: "0px"
			}), $("#main").css("padding-top", "0px")), t = $(window).scrollTop()
		})
	}), $(document).ready(function() {
		$(".averagerate").each(function(t) {
			len = $(this).text().length, len > 3 && $(this).text($(this).text().substr(0, 3))
		})
	}), $(document).ready(function() {
		$('a[data-toggle="tab"]').on("shown.bs.tab", function(t) {
			$(window).trigger("scroll")
		})
	}), $(document).ready(function() {
		$("#sug-nav li:first").addClass("active")
	}), $(document).ready(function() {
		$("#sug-cont div:first").addClass("active")
	}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
	"use strict";
	var e = t.fn.jquery.split(" ")[0].split(".");
	if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery),
function(t) {
	"use strict";

	function e() {
		var t = document.createElement("bootstrap"),
			e = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			};
		for (var i in e)
			if (void 0 !== t.style[i]) return {
				end: e[i]
			};
		return !1
	}
	t.fn.emulateTransitionEnd = function(e) {
		var i = !1,
			o = this;
		t(this).one("bsTransitionEnd", function() {
			i = !0
		});
		return setTimeout(function() {
			i || t(o).trigger(t.support.transition.end)
		}, e), this
	}, t(function() {
		t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
			bindType: t.support.transition.end,
			delegateType: t.support.transition.end,
			handle: function(e) {
				return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
			}
		})
	})
}(jQuery),
function(t) {
	"use strict";
	var e = '[data-dismiss="alert"]',
		i = function(i) {
			t(i).on("click", e, this.close)
		};
	i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.close = function(e) {
		function o() {
			r.detach().trigger("closed.bs.alert").remove()
		}
		var s = t(this),
			n = s.attr("data-target");
		n || (n = s.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
		var r = t(n);
		e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o())
	};
	var o = t.fn.alert;
	t.fn.alert = function(e) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.alert");
			s || o.data("bs.alert", s = new i(this)), "string" == typeof e && s[e].call(o)
		})
	}, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
		return t.fn.alert = o, this
	}, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.button"),
				n = "object" == typeof e && e;
			s || o.data("bs.button", s = new i(this, n)), "toggle" == e ? s.toggle() : e && s.setState(e)
		})
	}
	var i = function(e, o) {
		this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
	};
	i.VERSION = "3.3.4", i.DEFAULTS = {
		loadingText: "loading..."
	}, i.prototype.setState = function(e) {
		var i = "disabled",
			o = this.$element,
			s = o.is("input") ? "val" : "html",
			n = o.data();
		e += "Text", null == n.resetText && o.data("resetText", o[s]()), setTimeout(t.proxy(function() {
			o[s](null == n[e] ? this.options[e] : n[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
		}, this), 0)
	}, i.prototype.toggle = function() {
		var t = !0,
			e = this.$element.closest('[data-toggle="buttons"]');
		if (e.length) {
			var i = this.$element.find("input");
			"radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
		} else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
		t && this.$element.toggleClass("active")
	};
	var o = t.fn.button;
	t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
		return t.fn.button = o, this
	}, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
		var o = t(i.target);
		o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault()
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
		t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
	})
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.carousel"),
				n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
				r = "string" == typeof e ? e : n.slide;
			s || o.data("bs.carousel", s = new i(this, n)), "number" == typeof e ? s.to(e) : r ? s[r]() : n.interval && s.pause().cycle()
		})
	}
	var i = function(e, i) {
		this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
	};
	i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: !0,
		keyboard: !0
	}, i.prototype.keydown = function(t) {
		if (!/input|textarea/i.test(t.target.tagName)) {
			switch (t.which) {
				case 37:
					this.prev();
					break;
				case 39:
					this.next();
					break;
				default:
					return
			}
			t.preventDefault()
		}
	}, i.prototype.cycle = function(e) {
		return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
	}, i.prototype.getItemIndex = function(t) {
		return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
	}, i.prototype.getItemForDirection = function(t, e) {
		var i = this.getItemIndex(e);
		if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap) return e;
		var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
		return this.$items.eq(o)
	}, i.prototype.to = function(t) {
		var e = this,
			i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
		return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
			e.to(t)
		}) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
	}, i.prototype.pause = function(e) {
		return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	}, i.prototype.next = function() {
		return this.sliding ? void 0 : this.slide("next")
	}, i.prototype.prev = function() {
		return this.sliding ? void 0 : this.slide("prev")
	}, i.prototype.slide = function(e, o) {
		var s = this.$element.find(".item.active"),
			n = o || this.getItemForDirection(e, s),
			r = this.interval,
			a = "next" == e ? "left" : "right",
			l = this;
		if (n.hasClass("active")) return this.sliding = !1;
		var h = n[0],
			d = t.Event("slide.bs.carousel", {
				relatedTarget: h,
				direction: a
			});
		if (this.$element.trigger(d), !d.isDefaultPrevented()) {
			if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
				this.$indicators.find(".active").removeClass("active");
				var c = t(this.$indicators.children()[this.getItemIndex(n)]);
				c && c.addClass("active")
			}
			var p = t.Event("slid.bs.carousel", {
				relatedTarget: h,
				direction: a
			});
			return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, s.addClass(a), n.addClass(a), s.one("bsTransitionEnd", function() {
				n.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
					l.$element.trigger(p)
				}, 0)
			}).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
		}
	};
	var o = t.fn.carousel;
	t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
		return t.fn.carousel = o, this
	};
	var s = function(i) {
		var o, s = t(this),
			n = t(s.attr("data-target") || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
		if (n.hasClass("carousel")) {
			var r = t.extend({}, n.data(), s.data()),
				a = s.attr("data-slide-to");
			a && (r.interval = !1), e.call(n, r), a && n.data("bs.carousel").to(a), i.preventDefault()
		}
	};
	t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function() {
		t('[data-ride="carousel"]').each(function() {
			var i = t(this);
			e.call(i, i.data())
		})
	})
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
		return t(o)
	}

	function i(e) {
		return this.each(function() {
			var i = t(this),
				s = i.data("bs.collapse"),
				n = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
			!s && n.toggle && /show|hide/.test(e) && (n.toggle = !1), s || i.data("bs.collapse", s = new o(this, n)), "string" == typeof e && s[e]()
		})
	}
	var o = function(e, i) {
		this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
	};
	o.VERSION = "3.3.4", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
		toggle: !0
	}, o.prototype.dimension = function() {
		return this.$element.hasClass("width") ? "width" : "height"
	}, o.prototype.show = function() {
		if (!this.transitioning && !this.$element.hasClass("in")) {
			var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
			if (!(s && s.length && (e = s.data("bs.collapse")) && e.transitioning)) {
				var n = t.Event("show.bs.collapse");
				if (this.$element.trigger(n), !n.isDefaultPrevented()) {
					s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
					var r = this.dimension();
					this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
					var a = function() {
						this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
					};
					if (!t.support.transition) return a.call(this);
					var l = t.camelCase(["scroll", r].join("-"));
					this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
				}
			}
		}
	}, o.prototype.hide = function() {
		if (!this.transitioning && this.$element.hasClass("in")) {
			var e = t.Event("hide.bs.collapse");
			if (this.$element.trigger(e), !e.isDefaultPrevented()) {
				var i = this.dimension();
				this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
				var s = function() {
					this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
				};
				return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : s.call(this)
			}
		}
	}, o.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	}, o.prototype.getParent = function() {
		return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
			var s = t(o);
			this.addAriaAndCollapsedClass(e(s), s)
		}, this)).end()
	}, o.prototype.addAriaAndCollapsedClass = function(t, e) {
		var i = t.hasClass("in");
		t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
	};
	var s = t.fn.collapse;
	t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
		return t.fn.collapse = s, this
	}, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
		var s = t(this);
		s.attr("data-target") || o.preventDefault();
		var n = e(s),
			r = n.data("bs.collapse") ? "toggle" : s.data();
		i.call(n, r)
	})
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		e && 3 === e.which || (t(o).remove(), t(s).each(function() {
			var o = t(this),
				s = i(o),
				n = {
					relatedTarget: this
				};
			s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", n)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", n)))
		}))
	}

	function i(e) {
		var i = e.attr("data-target");
		i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
		var o = i && t(i);
		return o && o.length ? o : e.parent()
	}
	var o = ".dropdown-backdrop",
		s = '[data-toggle="dropdown"]',
		n = function(e) {
			t(e).on("click.bs.dropdown", this.toggle)
		};
	n.VERSION = "3.3.4", n.prototype.toggle = function(o) {
		var s = t(this);
		if (!s.is(".disabled, :disabled")) {
			var n = i(s),
				r = n.hasClass("open");
			if (e(), !r) {
				"ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
				var a = {
					relatedTarget: this
				};
				if (n.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented()) return;
				s.trigger("focus").attr("aria-expanded", "true"), n.toggleClass("open").trigger("shown.bs.dropdown", a)
			}
			return !1
		}
	}, n.prototype.keydown = function(e) {
		if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
			var o = t(this);
			if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
				var n = i(o),
					r = n.hasClass("open");
				if (!r && 27 != e.which || r && 27 == e.which) return 27 == e.which && n.find(s).trigger("focus"), o.trigger("click");
				var a = " li:not(.disabled):visible a",
					l = n.find('[role="menu"]' + a + ', [role="listbox"]' + a);
				if (l.length) {
					var h = l.index(e.target);
					38 == e.which && h > 0 && h--, 40 == e.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
				}
			}
		}
	};
	var r = t.fn.dropdown;
	t.fn.dropdown = function(e) {
		return this.each(function() {
			var i = t(this),
				o = i.data("bs.dropdown");
			o || i.data("bs.dropdown", o = new n(this)), "string" == typeof e && o[e].call(i)
		})
	}, t.fn.dropdown.Constructor = n, t.fn.dropdown.noConflict = function() {
		return t.fn.dropdown = r, this
	}, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
		t.stopPropagation()
	}).on("click.bs.dropdown.data-api", s, n.prototype.toggle).on("keydown.bs.dropdown.data-api", s, n.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', n.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', n.prototype.keydown)
}(jQuery),
function(t) {
	"use strict";

	function e(e, o) {
		return this.each(function() {
			var s = t(this),
				n = s.data("bs.modal"),
				r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
			n || s.data("bs.modal", n = new i(this, r)), "string" == typeof e ? n[e](o) : r.show && n.show(o)
		})
	}
	var i = function(e, i) {
		this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
			this.$element.trigger("loaded.bs.modal")
		}, this))
	};
	i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	}, i.prototype.toggle = function(t) {
		return this.isShown ? this.hide() : this.show(t)
	}, i.prototype.show = function(e) {
		var o = this,
			s = t.Event("show.bs.modal", {
				relatedTarget: e
			});
		this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
			o.$element.one("mouseup.dismiss.bs.modal", function(e) {
				t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
			})
		}), this.backdrop(function() {
			var s = t.support.transition && o.$element.hasClass("fade");
			o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), s && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
			var n = t.Event("shown.bs.modal", {
				relatedTarget: e
			});
			s ? o.$dialog.one("bsTransitionEnd", function() {
				o.$element.trigger("focus").trigger(n)
			}).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n)
		}))
	}, i.prototype.hide = function(e) {
		e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
	}, i.prototype.enforceFocus = function() {
		t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
			this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
		}, this))
	}, i.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
			27 == t.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	}, i.prototype.resize = function() {
		this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
	}, i.prototype.hideModal = function() {
		var t = this;
		this.$element.hide(), this.backdrop(function() {
			t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
		})
	}, i.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, i.prototype.backdrop = function(e) {
		var o = this,
			s = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var n = t.support.transition && s;
			if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
					return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
				}, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
			n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass("in");
			var r = function() {
				o.removeBackdrop(), e && e()
			};
			t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
		} else e && e()
	}, i.prototype.handleUpdate = function() {
		this.adjustDialog()
	}, i.prototype.adjustDialog = function() {
		var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
			paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
		})
	}, i.prototype.resetAdjustments = function() {
		this.$element.css({
			paddingLeft: "",
			paddingRight: ""
		})
	}, i.prototype.checkScrollbar = function() {
		var t = window.innerWidth;
		if (!t) {
			var e = document.documentElement.getBoundingClientRect();
			t = e.right - Math.abs(e.left)
		}
		this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
	}, i.prototype.setScrollbar = function() {
		var t = parseInt(this.$body.css("padding-right") || 0, 10);
		this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
	}, i.prototype.resetScrollbar = function() {
		this.$body.css("padding-right", this.originalBodyPad)
	}, i.prototype.measureScrollbar = function() {
		var t = document.createElement("div");
		t.className = "modal-scrollbar-measure", this.$body.append(t);
		var e = t.offsetWidth - t.clientWidth;
		return this.$body[0].removeChild(t), e
	};
	var o = t.fn.modal;
	t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
		return t.fn.modal = o, this
	}, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
		var o = t(this),
			s = o.attr("href"),
			n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
			r = n.data("bs.modal") ? "toggle" : t.extend({
				remote: !/#/.test(s) && s
			}, n.data(), o.data());
		o.is("a") && i.preventDefault(), n.one("show.bs.modal", function(t) {
			t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
				o.is(":visible") && o.trigger("focus")
			})
		}), e.call(n, r, this)
	})
}(jQuery),
function(t) {
	"use strict";
	var e = function(t, e) {
		this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e)
	};
	e.VERSION = "3.3.4", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: "body",
			padding: 0
		}
	}, e.prototype.init = function(e, i, o) {
		if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
		for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
			var r = s[n];
			if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
			else if ("manual" != r) {
				var a = "hover" == r ? "mouseenter" : "focusin",
					l = "hover" == r ? "mouseleave" : "focusout";
				this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = t.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	}, e.prototype.getDefaults = function() {
		return e.DEFAULTS
	}, e.prototype.getOptions = function(e) {
		return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
			show: e.delay,
			hide: e.delay
		}), e
	}, e.prototype.getDelegateOptions = function() {
		var e = {},
			i = this.getDefaults();
		return this._options && t.each(this._options, function(t, o) {
			i[t] != o && (e[t] = o)
		}), e
	}, e.prototype.enter = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
		return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
			"in" == i.hoverState && i.show()
		}, i.options.delay.show)) : i.show())
	}, e.prototype.leave = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
		return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
			"out" == i.hoverState && i.hide()
		}, i.options.delay.hide)) : i.hide()
	}, e.prototype.show = function() {
		var i = t.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(i);
			var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (i.isDefaultPrevented() || !o) return;
			var s = this,
				n = this.tip(),
				r = this.getUID(this.type);
			this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
			var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
				l = /\s?auto?\s?/i,
				h = l.test(a);
			h && (a = a.replace(l, "") || "top"), n.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
			var d = this.getPosition(),
				c = n[0].offsetWidth,
				p = n[0].offsetHeight;
			if (h) {
				var u = a,
					f = this.options.container ? t(this.options.container) : this.$element.parent(),
					g = this.getPosition(f);
				a = "bottom" == a && d.bottom + p > g.bottom ? "top" : "top" == a && d.top - p < g.top ? "bottom" : "right" == a && d.right + c > g.width ? "left" : "left" == a && d.left - c < g.left ? "right" : a, n.removeClass(u).addClass(a)
			}
			var m = this.getCalculatedOffset(a, d, c, p);
			this.applyPlacement(m, a);
			var v = function() {
				var t = s.hoverState;
				s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
			};
			t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", v).emulateTransitionEnd(e.TRANSITION_DURATION) : v()
		}
	}, e.prototype.applyPlacement = function(e, i) {
		var o = this.tip(),
			s = o[0].offsetWidth,
			n = o[0].offsetHeight,
			r = parseInt(o.css("margin-top"), 10),
			a = parseInt(o.css("margin-left"), 10);
		isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(o[0], t.extend({
			using: function(t) {
				o.css({
					top: Math.round(t.top),
					left: Math.round(t.left)
				})
			}
		}, e), 0), o.addClass("in");
		var l = o[0].offsetWidth,
			h = o[0].offsetHeight;
		"top" == i && h != n && (e.top = e.top + n - h);
		var d = this.getViewportAdjustedDelta(i, e, l, h);
		d.left ? e.left += d.left : e.top += d.top;
		var c = /top|bottom/.test(i),
			p = c ? 2 * d.left - s + l : 2 * d.top - n + h,
			u = c ? "offsetWidth" : "offsetHeight";
		o.offset(e), this.replaceArrow(p, o[0][u], c)
	}, e.prototype.replaceArrow = function(t, e, i) {
		this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
	}, e.prototype.setContent = function() {
		var t = this.tip(),
			e = this.getTitle();
		t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
	}, e.prototype.hide = function(i) {
		function o() {
			"in" != s.hoverState && n.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), i && i()
		}
		var s = this,
			n = t(this.$tip),
			r = t.Event("hide.bs." + this.type);
		return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(e.TRANSITION_DURATION) : o(), this.hoverState = null, this)
	}, e.prototype.fixTitle = function() {
		var t = this.$element;
		(t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
	}, e.prototype.hasContent = function() {
		return this.getTitle()
	}, e.prototype.getPosition = function(e) {
		var i = (e = e || this.$element)[0],
			o = "BODY" == i.tagName,
			s = i.getBoundingClientRect();
		null == s.width && (s = t.extend({}, s, {
			width: s.right - s.left,
			height: s.bottom - s.top
		}));
		var n = o ? {
				top: 0,
				left: 0
			} : e.offset(),
			r = {
				scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
			},
			a = o ? {
				width: t(window).width(),
				height: t(window).height()
			} : null;
		return t.extend({}, s, r, a, n)
	}, e.prototype.getCalculatedOffset = function(t, e, i, o) {
		return "bottom" == t ? {
			top: e.top + e.height,
			left: e.left + e.width / 2 - i / 2
		} : "top" == t ? {
			top: e.top - o,
			left: e.left + e.width / 2 - i / 2
		} : "left" == t ? {
			top: e.top + e.height / 2 - o / 2,
			left: e.left - i
		} : {
			top: e.top + e.height / 2 - o / 2,
			left: e.left + e.width
		}
	}, e.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
		var s = {
			top: 0,
			left: 0
		};
		if (!this.$viewport) return s;
		var n = this.options.viewport && this.options.viewport.padding || 0,
			r = this.getPosition(this.$viewport);
		if (/right|left/.test(t)) {
			var a = e.top - n - r.scroll,
				l = e.top + n - r.scroll + o;
			a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
		} else {
			var h = e.left - n,
				d = e.left + n + i;
			h < r.left ? s.left = r.left - h : d > r.width && (s.left = r.left + r.width - d)
		}
		return s
	}, e.prototype.getTitle = function() {
		var t = this.$element,
			e = this.options;
		return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
	}, e.prototype.getUID = function(t) {
		do {
			t += ~~(1e6 * Math.random())
		} while (document.getElementById(t));
		return t
	}, e.prototype.tip = function() {
		return this.$tip = this.$tip || t(this.options.template)
	}, e.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	}, e.prototype.enable = function() {
		this.enabled = !0
	}, e.prototype.disable = function() {
		this.enabled = !1
	}, e.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	}, e.prototype.toggle = function(e) {
		var i = this;
		e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
	}, e.prototype.destroy = function() {
		var t = this;
		clearTimeout(this.timeout), this.hide(function() {
			t.$element.off("." + t.type).removeData("bs." + t.type)
		})
	};
	var i = t.fn.tooltip;
	t.fn.tooltip = function(i) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.tooltip"),
				n = "object" == typeof i && i;
			(s || !/destroy|hide/.test(i)) && (s || o.data("bs.tooltip", s = new e(this, n)), "string" == typeof i && s[i]())
		})
	}, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
		return t.fn.tooltip = i, this
	}
}(jQuery),
function(t) {
	"use strict";
	var e = function(t, e) {
		this.init("popover", t, e)
	};
	if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
	e.VERSION = "3.3.4", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
		return e.DEFAULTS
	}, e.prototype.setContent = function() {
		var t = this.tip(),
			e = this.getTitle(),
			i = this.getContent();
		t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
	}, e.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	}, e.prototype.getContent = function() {
		var t = this.$element,
			e = this.options;
		return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
	}, e.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	var i = t.fn.popover;
	t.fn.popover = function(i) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.popover"),
				n = "object" == typeof i && i;
			(s || !/destroy|hide/.test(i)) && (s || o.data("bs.popover", s = new e(this, n)), "string" == typeof i && s[i]())
		})
	}, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
		return t.fn.popover = i, this
	}
}(jQuery),
function(t) {
	"use strict";

	function e(i, o) {
		this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
	}

	function i(i) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.scrollspy"),
				n = "object" == typeof i && i;
			s || o.data("bs.scrollspy", s = new e(this, n)), "string" == typeof i && s[i]()
		})
	}
	e.VERSION = "3.3.4", e.DEFAULTS = {
		offset: 10
	}, e.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}, e.prototype.refresh = function() {
		var e = this,
			i = "offset",
			o = 0;
		this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
			var e = t(this),
				s = e.data("target") || e.attr("href"),
				n = /^#./.test(s) && t(s);
			return n && n.length && n.is(":visible") && [
				[n[i]().top + o, s]
			] || null
		}).sort(function(t, e) {
			return t[0] - e[0]
		}).each(function() {
			e.offsets.push(this[0]), e.targets.push(this[1])
		})
	}, e.prototype.process = function() {
		var t, e = this.$scrollElement.scrollTop() + this.options.offset,
			i = this.getScrollHeight(),
			o = this.options.offset + i - this.$scrollElement.height(),
			s = this.offsets,
			n = this.targets,
			r = this.activeTarget;
		if (this.scrollHeight != i && this.refresh(), e >= o) return r != (t = n[n.length - 1]) && this.activate(t);
		if (r && e < s[0]) return this.activeTarget = null, this.clear();
		for (t = s.length; t--;) r != n[t] && e >= s[t] && (void 0 === s[t + 1] || e < s[t + 1]) && this.activate(n[t])
	}, e.prototype.activate = function(e) {
		this.activeTarget = e, this.clear();
		var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
			o = t(i).parents("li").addClass("active");
		o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
	}, e.prototype.clear = function() {
		t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var o = t.fn.scrollspy;
	t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
		return t.fn.scrollspy = o, this
	}, t(window).on("load.bs.scrollspy.data-api", function() {
		t('[data-spy="scroll"]').each(function() {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.tab");
			s || o.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
		})
	}
	var i = function(e) {
		this.element = t(e)
	};
	i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
		var e = this.element,
			i = e.closest("ul:not(.dropdown-menu)"),
			o = e.data("target");
		if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
			var s = i.find(".active:last a"),
				n = t.Event("hide.bs.tab", {
					relatedTarget: e[0]
				}),
				r = t.Event("show.bs.tab", {
					relatedTarget: s[0]
				});
			if (s.trigger(n), e.trigger(r), !r.isDefaultPrevented() && !n.isDefaultPrevented()) {
				var a = t(o);
				this.activate(e.closest("li"), i), this.activate(a, a.parent(), function() {
					s.trigger({
						type: "hidden.bs.tab",
						relatedTarget: e[0]
					}), e.trigger({
						type: "shown.bs.tab",
						relatedTarget: s[0]
					})
				})
			}
		}
	}, i.prototype.activate = function(e, o, s) {
		function n() {
			r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
		}
		var r = o.find("> .active"),
			a = s && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
		r.length && a ? r.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), r.removeClass("in")
	};
	var o = t.fn.tab;
	t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
		return t.fn.tab = o, this
	};
	var s = function(i) {
		i.preventDefault(), e.call(t(this), "show")
	};
	t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery),
function(t) {
	"use strict";

	function e(e) {
		return this.each(function() {
			var o = t(this),
				s = o.data("bs.affix"),
				n = "object" == typeof e && e;
			s || o.data("bs.affix", s = new i(this, n)), "string" == typeof e && s[e]()
		})
	}
	var i = function(e, o) {
		this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
	};
	i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
		offset: 0,
		target: window
	}, i.prototype.getState = function(t, e, i, o) {
		var s = this.$target.scrollTop(),
			n = this.$element.offset(),
			r = this.$target.height();
		if (null != i && "top" == this.affixed) return i > s && "top";
		if ("bottom" == this.affixed) return null != i ? !(s + this.unpin <= n.top) && "bottom" : !(t - o >= s + r) && "bottom";
		var a = null == this.affixed,
			l = a ? s : n.top,
			h = a ? r : e;
		return null != i && i >= s ? "top" : null != o && l + h >= t - o && "bottom"
	}, i.prototype.getPinnedOffset = function() {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(i.RESET).addClass("affix");
		var t = this.$target.scrollTop(),
			e = this.$element.offset();
		return this.pinnedOffset = e.top - t
	}, i.prototype.checkPositionWithEventLoop = function() {
		setTimeout(t.proxy(this.checkPosition, this), 1)
	}, i.prototype.checkPosition = function() {
		if (this.$element.is(":visible")) {
			var e = this.$element.height(),
				o = this.options.offset,
				s = o.top,
				n = o.bottom,
				r = t(document.body).height();
			"object" != typeof o && (n = s = o), "function" == typeof s && (s = o.top(this.$element)), "function" == typeof n && (n = o.bottom(this.$element));
			var a = this.getState(r, e, s, n);
			if (this.affixed != a) {
				null != this.unpin && this.$element.css("top", "");
				var l = "affix" + (a ? "-" + a : ""),
					h = t.Event(l + ".bs.affix");
				if (this.$element.trigger(h), h.isDefaultPrevented()) return;
				this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
			}
			"bottom" == a && this.$element.offset({
				top: r - e - n
			})
		}
	};
	var o = t.fn.affix;
	t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
		return t.fn.affix = o, this
	}, t(window).on("load", function() {
		t('[data-spy="affix"]').each(function() {
			var i = t(this),
				o = i.data();
			o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
		})
	})
}(jQuery),
function(t) {
	function e(t, e) {
		return -1 < t.toUpperCase().indexOf(e.toUpperCase())
	}

	function i(e) {
		return t.each([{
			re: /[\xC0-\xC6]/g,
			ch: "A"
		}, {
			re: /[\xE0-\xE6]/g,
			ch: "a"
		}, {
			re: /[\xC8-\xCB]/g,
			ch: "E"
		}, {
			re: /[\xE8-\xEB]/g,
			ch: "e"
		}, {
			re: /[\xCC-\xCF]/g,
			ch: "I"
		}, {
			re: /[\xEC-\xEF]/g,
			ch: "i"
		}, {
			re: /[\xD2-\xD6]/g,
			ch: "O"
		}, {
			re: /[\xF2-\xF6]/g,
			ch: "o"
		}, {
			re: /[\xD9-\xDC]/g,
			ch: "U"
		}, {
			re: /[\xF9-\xFC]/g,
			ch: "u"
		}, {
			re: /[\xC7-\xE7]/g,
			ch: "c"
		}, {
			re: /[\xD1]/g,
			ch: "N"
		}, {
			re: /[\xF1]/g,
			ch: "n"
		}], function() {
			e = e.replace(this.re, this.ch)
		}), e
	}

	function o(t) {
		var e = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#x27;",
				"`": "&#x60;"
			},
			i = "(?:" + Object.keys(e).join("|") + ")",
			o = new RegExp(i, "g");
		return t = null == t ? "" : "" + t, new RegExp(i).test(t) ? t.replace(o, function(t) {
			return e[t]
		}) : t
	}

	function s(e, i) {
		var o = arguments,
			s = e;
		e = o[0], i = o[1], [].shift.apply(o), void 0 === e && (e = s);
		var r, s = this.each(function() {
			var s = t(this);
			if (s.is("select")) {
				var a = s.data("selectpicker"),
					l = "object" == typeof e && e;
				if (a) {
					if (l)
						for (var h in l) l.hasOwnProperty(h) && (a.options[h] = l[h])
				} else a = t.extend({}, n.DEFAULTS, t.fn.selectpicker.defaults || {}, s.data(), l), s.data("selectpicker", a = new n(this, a, i));
				"string" == typeof e && (r = a[e] instanceof Function ? a[e].apply(a, o) : a.options[e])
			}
		});
		return void 0 !== r ? r : s
	}
	t.expr[":"].icontains = function(i, o, s) {
		return e(t(i).text(), s[3])
	}, t.expr[":"].aicontains = function(i, o, s) {
		return e(t(i).data("normalizedText") || t(i).text(), s[3])
	};
	var n = function(e, i, o) {
		o && (o.stopPropagation(), o.preventDefault()), this.$element = t(e), this.$lis = this.$menu = this.$button = this.$newElement = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = n.prototype.val, this.render = n.prototype.render, this.refresh = n.prototype.refresh, this.setStyle = n.prototype.setStyle, this.selectAll = n.prototype.selectAll, this.deselectAll = n.prototype.deselectAll, this.remove = this.destroy = n.prototype.remove, this.show = n.prototype.show, this.hide = n.prototype.hide, this.init()
	};
	n.VERSION = "1.6.3", n.DEFAULTS = {
		noneSelectedText: "Nothing selected",
		noneResultsText: "No results match",
		countSelectedText: function(t, e) {
			return 1 == t ? "{0} item selected" : "{0} items selected"
		},
		maxOptionsText: function(t, e) {
			var i = [];
			return i[0] = 1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", i[1] = 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)", i
		},
		selectAllText: "Select All",
		deselectAllText: "Deselect All",
		multipleSeparator: ", ",
		style: "btn-default",
		size: "auto",
		title: null,
		selectedTextFormat: "values",
		width: !1,
		container: !1,
		hideDisabled: !1,
		showSubtext: !1,
		showIcon: !0,
		showContent: !0,
		dropupAuto: !0,
		header: !1,
		liveSearch: !1,
		actionsBox: !1,
		iconBase: "glyphicon",
		tickIcon: "glyphicon-ok",
		maxOptions: !1,
		mobile: !1,
		selectOnTab: !1,
		dropdownAlignRight: !1,
		searchAccentInsensitive: !1
	}, n.prototype = {
		constructor: n,
		init: function() {
			var e = this,
				i = this.$element.attr("id");
			this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$menu = this.$newElement.find("> .dropdown-menu"), this.$button = this.$newElement.find("> button"), this.$searchbox = this.$newElement.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), void 0 !== i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function(t) {
				t.preventDefault(), e.$button.focus()
			})), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile()
		},
		createDropdown: function() {
			var e = this.multiple ? " show-tick" : "",
				i = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
				o = this.autofocus ? " autofocus" : "",
				s = this.$element.parents().hasClass("form-group-lg") ? " btn-lg" : this.$element.parents().hasClass("form-group-sm") ? " btn-sm" : "";
			return t('<div class="btn-group bootstrap-select' + e + i + '"><button type="button" class="btn dropdown-toggle selectpicker' + s + '" data-toggle="dropdown"' + o + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + (this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "") + (this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : "") + (this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">' + this.options.deselectAllText + "</button></div></div>" : "") + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>')
		},
		createView: function() {
			var t = this.createDropdown(),
				e = this.createLi();
			return t.find("ul").append(e), t
		},
		reloadLi: function() {
			this.destroyLi();
			var t = this.createLi();
			this.$menu.find("ul").append(t)
		},
		destroyLi: function() {
			this.$menu.find("li").remove()
		},
		createLi: function() {
			var e = this,
				s = [],
				n = 0,
				r = function(t, e, i) {
					return "<li" + (void 0 !== i ? ' class="' + i + '"' : "") + (void 0 !== e | null === e ? ' data-original-index="' + e + '"' : "") + ">" + t + "</li>"
				},
				a = function(t, s, n, r) {
					var a = i(o(t));
					return '<a tabindex="0"' + (void 0 !== s ? ' class="' + s + '"' : "") + (void 0 !== n ? ' style="' + n + '"' : "") + (void 0 !== r ? 'data-optgroup="' + r + '"' : "") + ' data-normalized-text="' + a + '">' + t + '<span class="' + e.options.iconBase + " " + e.options.tickIcon + ' check-mark"></span></a>'
				};
			return this.$element.find("option").each(function() {
				var i = t(this),
					o = i.attr("class") || "",
					l = i.attr("style"),
					h = i.data("content") ? i.data("content") : i.html(),
					d = void 0 !== i.data("subtext") ? '<small class="muted text-muted">' + i.data("subtext") + "</small>" : "",
					c = void 0 !== i.data("icon") ? '<span class="' + e.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
					p = i.is(":disabled") || i.parent().is(":disabled"),
					u = i[0].index;
				"" !== c && p && (c = "<span>" + c + "</span>"), i.data("content") || (h = c + '<span class="text">' + h + d + "</span>"), e.options.hideDisabled && p || (i.parent().is("optgroup") && !0 !== i.data("divider") ? (0 === i.index() && (n += 1, d = i.parent().attr("label"), c = void 0 !== i.parent().data("subtext") ? '<small class="muted text-muted">' + i.parent().data("subtext") + "</small>" : "", d = (i.parent().data("icon") ? '<span class="' + e.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "") + '<span class="text">' + d + c + "</span>", 0 !== u && 0 < s.length && s.push(r("", null, "divider")), s.push(r(d, null, "dropdown-header"))), s.push(r(a(h, "opt " + o, l, n), u))) : !0 === i.data("divider") ? s.push(r("", u, "divider")) : !0 === i.data("hidden") ? s.push(r(a(h, o, l), u, "hide is-hidden")) : s.push(r(a(h, o, l), u)))
			}), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), t(s.join(""))
		},
		findLis: function() {
			return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
		},
		render: function(e) {
			var i = this;
			!1 !== e && this.$element.find("option").each(function(e) {
				i.setDisabled(e, t(this).is(":disabled") || t(this).parent().is(":disabled")), i.setSelected(e, t(this).is(":selected"))
			}), this.tabIndex();
			var s = this.options.hideDisabled ? ":not([disabled])" : "";
			if (e = this.$element.find("option:selected" + s).map(function() {
					var e, o = t(this),
						s = o.data("icon") && i.options.showIcon ? '<i class="' + i.options.iconBase + " " + o.data("icon") + '"></i> ' : "";
					return e = i.options.showSubtext && o.attr("data-subtext") && !i.multiple ? ' <small class="muted text-muted">' + o.data("subtext") + "</small>" : "", o.data("content") && i.options.showContent ? o.data("content") : void 0 !== o.attr("title") ? o.attr("title") : s + o.html() + e
				}).toArray(), s = this.multiple ? e.join(this.options.multipleSeparator) : e[0], this.multiple && -1 < this.options.selectedTextFormat.indexOf("count")) {
				var n = this.options.selectedTextFormat.split(">");
				(1 < n.length && e.length > n[1] || 1 == n.length && 2 <= e.length) && (s = this.options.hideDisabled ? ", [disabled]" : "", s = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + s).length, s = ("function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, s) : this.options.countSelectedText).replace("{0}", e.length.toString()).replace("{1}", s.toString()))
			}
			this.options.title = this.$element.attr("title"), "static" == this.options.selectedTextFormat && (s = this.options.title), s || (s = void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", o(s)), this.$newElement.find(".filter-option").html(s)
		},
		setStyle: function(t, e) {
			this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
			var i = t || this.options.style;
			"add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
		},
		liHeight: function() {
			if (!1 !== this.options.size) {
				var t = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", !1).end().appendTo("body"),
					e = (s = t.addClass("open").find("> .dropdown-menu")).find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(),
					i = this.options.header ? s.find(".popover-title").outerHeight() : 0,
					o = this.options.liveSearch ? s.find(".bs-searchbox").outerHeight() : 0,
					s = this.options.actionsBox ? s.find(".bs-actionsbox").outerHeight() : 0;
				t.remove(), this.$newElement.data("liHeight", e).data("headerHeight", i).data("searchHeight", o).data("actionsHeight", s)
			}
		},
		setSize: function() {
			this.findLis();
			var e, i, o, s = this,
				n = this.$menu,
				r = n.find(".inner"),
				a = this.$newElement.outerHeight(),
				l = this.$newElement.data("liHeight"),
				h = this.$newElement.data("headerHeight"),
				d = this.$newElement.data("searchHeight"),
				c = this.$newElement.data("actionsHeight"),
				p = this.$lis.filter(".divider").outerHeight(!0),
				u = parseInt(n.css("padding-top")) + parseInt(n.css("padding-bottom")) + parseInt(n.css("border-top-width")) + parseInt(n.css("border-bottom-width")),
				f = this.options.hideDisabled ? ", .disabled" : "",
				g = t(window),
				m = u + parseInt(n.css("margin-top")) + parseInt(n.css("margin-bottom")) + 2,
				v = function() {
					i = s.$newElement.offset().top - g.scrollTop(), o = g.height() - i - a
				};
			v(), this.options.header && n.css("padding-top", 0), "auto" == this.options.size ? ((p = function() {
				var t;
				t = s.$lis.not(".hide"), v(), e = o - m, s.options.dropupAuto && s.$newElement.toggleClass("dropup", i > o && e - m < n.height()), s.$newElement.hasClass("dropup") && (e = i - m), t = 3 < t.length + t.filter(".dropdown-header").length ? 3 * l + m - 2 : 0, n.css({
					"max-height": e + "px",
					overflow: "hidden",
					"min-height": t + h + d + c + "px"
				}), r.css({
					"max-height": e - h - d - c - u + "px",
					"overflow-y": "auto",
					"min-height": Math.max(t - u, 0) + "px"
				})
			})(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", p), t(window).off("resize.getSize").on("resize.getSize", p), t(window).off("scroll.getSize").on("scroll.getSize", p)) : this.options.size && "auto" != this.options.size && n.find("li" + f).length > this.options.size && (f = this.$lis.not(".divider" + f).find(" > *").slice(0, this.options.size).last().parent().index(), f = this.$lis.slice(0, f + 1).filter(".divider").length, e = l * this.options.size + f * p + u, s.options.dropupAuto && this.$newElement.toggleClass("dropup", i > o && e < n.height()), n.css({
				"max-height": e + h + d + c + "px",
				overflow: "hidden"
			}), r.css({
				"max-height": e - u + "px",
				"overflow-y": "auto"
			}))
		},
		setWidth: function() {
			if ("auto" == this.options.width) {
				this.$menu.css("min-width", "0");
				var t = this.$newElement.clone().appendTo("body"),
					e = t.find("> .dropdown-menu").css("width"),
					i = t.css("width", "auto").find("> button").css("width");
				t.remove(), this.$newElement.css("width", Math.max(parseInt(e), parseInt(i)) + "px")
			} else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
			this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
		},
		selectPosition: function() {
			var e, i, o = this,
				s = t("<div />"),
				n = function(t) {
					s.addClass(t.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, s.css({
						top: e.top + i,
						left: e.left,
						width: t[0].offsetWidth,
						position: "absolute"
					})
				};
			this.$newElement.on("click", function() {
				o.isDisabled() || (n(t(this)), s.appendTo(o.options.container), s.toggleClass("open", !t(this).hasClass("open")), s.append(o.$menu))
			}), t(window).resize(function() {
				n(o.$newElement)
			}), t(window).on("scroll", function() {
				n(o.$newElement)
			}), t("html").on("click", function(e) {
				1 > t(e.target).closest(o.$newElement).length && s.removeClass("open")
			})
		},
		setSelected: function(t, e) {
			this.findLis(), this.$lis.filter('[data-original-index="' + t + '"]').toggleClass("selected", e)
		},
		setDisabled: function(t, e) {
			this.findLis(), e ? this.$lis.filter('[data-original-index="' + t + '"]').addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + t + '"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0)
		},
		isDisabled: function() {
			return this.$element.is(":disabled")
		},
		checkDisabled: function() {
			var t = this;
			this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 == this.$button.attr("tabindex") && (this.$element.data("tabindex") || this.$button.removeAttr("tabindex"))), this.$button.click(function() {
				return !t.isDisabled()
			})
		},
		tabIndex: function() {
			this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
		},
		clickListener: function() {
			var e = this;
			this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
				t.stopPropagation()
			}), this.$newElement.on("click", function() {
				e.setSize(), e.options.liveSearch || e.multiple || setTimeout(function() {
					e.$menu.find(".selected a").focus()
				}, 10)
			}), this.$menu.on("click", "li a", function(i) {
				var o = t(this),
					s = o.parent().data("originalIndex"),
					n = e.$element.val(),
					r = e.$element.prop("selectedIndex");
				if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !o.parent().hasClass("disabled")) {
					var a = (i = (p = e.$element.find("option")).eq(s)).prop("selected"),
						l = i.parent("optgroup"),
						h = e.options.maxOptions,
						d = l.data("maxOptions") || !1;
					if (e.multiple) {
						if (i.prop("selected", !a), e.setSelected(s, !a), o.blur(), !1 !== h || !1 !== d) {
							var a = h < p.filter(":selected").length,
								c = d < l.find("option:selected").length;
							if (h && a || d && c)
								if (h && 1 == h) p.prop("selected", !1), i.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(s, !0);
								else if (d && 1 == d) l.find("option:selected").prop("selected", !1), i.prop("selected", !0), i = o.data("optgroup"), e.$menu.find(".selected").has('a[data-optgroup="' + i + '"]').removeClass("selected"), e.setSelected(s, !0);
							else {
								var p = (o = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(h, d) : e.options.maxOptionsText)[0].replace("{n}", h),
									l = o[1].replace("{n}", d),
									u = t('<div class="notify"></div>');
								o[2] && (p = p.replace("{var}", o[2][1 < h ? 0 : 1]), l = l.replace("{var}", o[2][1 < d ? 0 : 1])), i.prop("selected", !1), e.$menu.append(u), h && a && (u.append(t("<div>" + p + "</div>")), e.$element.trigger("maxReached.bs.select")), d && c && (u.append(t("<div>" + l + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
									e.setSelected(s, !1)
								}, 10), u.delay(750).fadeOut(300, function() {
									t(this).remove()
								})
							}
						}
					} else p.prop("selected", !1), i.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(s, !0);
					e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (n != e.$element.val() && e.multiple || r != e.$element.prop("selectedIndex") && !e.multiple) && e.$element.change()
				}
			}), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(t) {
				t.target == this && (t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus())
			}), this.$menu.on("click", "li.divider, li.dropdown-header", function(t) {
				t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
			}), this.$menu.on("click", ".popover-title .close", function() {
				e.$button.focus()
			}), this.$searchbox.on("click", function(t) {
				t.stopPropagation()
			}), this.$menu.on("click", ".actions-btn", function(i) {
				e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).is(".bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.change()
			}), this.$element.change(function() {
				e.render(!1)
			})
		},
		liveSearchListener: function() {
			var e = this,
				s = t('<li class="no-results"></li>');
			this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
				e.$menu.find(".active").removeClass("active"), e.$searchbox.val() && (e.$searchbox.val(""), e.$lis.not(".is-hidden").removeClass("hide"), s.parent().length && s.remove()), e.multiple || e.$menu.find(".selected").addClass("active"), setTimeout(function() {
					e.$searchbox.focus()
				}, 10)
			}), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
				t.stopPropagation()
			}), this.$searchbox.on("input propertychange", function() {
				e.$searchbox.val() ? (e.options.searchAccentInsensitive ? e.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains(" + i(e.$searchbox.val()) + ")").parent().addClass("hide") : e.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + e.$searchbox.val() + ")").parent().addClass("hide"), e.$menu.find("li").filter(":visible:not(.no-results)").length ? s.parent().length && s.remove() : (s.parent().length && s.remove(), s.html(e.options.noneResultsText + ' "' + o(e.$searchbox.val()) + '"').show(), e.$menu.find("li").last().after(s))) : (e.$lis.not(".is-hidden").removeClass("hide"), s.parent().length && s.remove()), e.$menu.find("li.active").removeClass("active"), e.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(), t(this).focus()
			})
		},
		val: function(t) {
			return void 0 !== t ? (this.$element.val(t), this.render(), this.$element) : this.$element.val()
		},
		selectAll: function() {
			this.findLis(), this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click()
		},
		deselectAll: function() {
			this.findLis(), this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click()
		},
		keydown: function(e) {
			var o, s, n, r, a, l, h, d, c = t(this),
				p = c.is("input") ? c.parent().parent() : c.parent(),
				u = p.data("this"),
				f = {
					32: " ",
					48: "0",
					49: "1",
					50: "2",
					51: "3",
					52: "4",
					53: "5",
					54: "6",
					55: "7",
					56: "8",
					57: "9",
					59: ";",
					65: "a",
					66: "b",
					67: "c",
					68: "d",
					69: "e",
					70: "f",
					71: "g",
					72: "h",
					73: "i",
					74: "j",
					75: "k",
					76: "l",
					77: "m",
					78: "n",
					79: "o",
					80: "p",
					81: "q",
					82: "r",
					83: "s",
					84: "t",
					85: "u",
					86: "v",
					87: "w",
					88: "x",
					89: "y",
					90: "z",
					96: "0",
					97: "1",
					98: "2",
					99: "3",
					100: "4",
					101: "5",
					102: "6",
					103: "7",
					104: "8",
					105: "9"
				};
			if (u.options.liveSearch && (p = c.parent().parent()), u.options.container && (p = u.$menu), o = t("[role=menu] li a", p), !(d = u.$menu.parent().hasClass("open")) && /([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode)) && (u.options.container ? u.$newElement.trigger("click") : (u.setSize(), u.$menu.parent().addClass("open"), d = !0), u.$searchbox.focus()), u.options.liveSearch && (/(^9$|27)/.test(e.keyCode.toString(10)) && d && 0 === u.$menu.find(".active").length && (e.preventDefault(), u.$menu.parent().removeClass("open"), u.$button.focus()), o = t("[role=menu] li:not(.divider):not(.dropdown-header):visible", p), c.val() || /(38|40)/.test(e.keyCode.toString(10)) || 0 === o.filter(".active").length && (o = u.options.searchAccentInsensitive ? u.$newElement.find("li").filter(":aicontains(" + i(f[e.keyCode]) + ")") : u.$newElement.find("li").filter(":icontains(" + f[e.keyCode] + ")"))), o.length) {
				if (/(38|40)/.test(e.keyCode.toString(10))) p = o.index(o.filter(":focus")), n = o.parent(":not(.disabled):visible").first().index(), r = o.parent(":not(.disabled):visible").last().index(), s = o.eq(p).parent().nextAll(":not(.disabled):visible").eq(0).index(), a = o.eq(p).parent().prevAll(":not(.disabled):visible").eq(0).index(), l = o.eq(s).parent().prevAll(":not(.disabled):visible").eq(0).index(), u.options.liveSearch && (o.each(function(e) {
					t(this).is(":not(.disabled)") && t(this).data("index", e)
				}), p = o.index(o.filter(".active")), n = o.filter(":not(.disabled):visible").first().data("index"), r = o.filter(":not(.disabled):visible").last().data("index"), s = o.eq(p).nextAll(":not(.disabled):visible").eq(0).data("index"), a = o.eq(p).prevAll(":not(.disabled):visible").eq(0).data("index"), l = o.eq(s).prevAll(":not(.disabled):visible").eq(0).data("index")), h = c.data("prevIndex"), 38 == e.keyCode && (u.options.liveSearch && --p, p != l && p > a && (p = a), p < n && (p = n), p == h && (p = r)), 40 == e.keyCode && (u.options.liveSearch && (p += 1), -1 == p && (p = 0), p != l && p < s && (p = s), p > r && (p = r), p == h && (p = n)), c.data("prevIndex", p), u.options.liveSearch ? (e.preventDefault(), c.is(".dropdown-toggle") || (o.removeClass("active"), o.eq(p).addClass("active").find("a").focus(), c.focus())) : o.eq(p).focus();
				else if (!c.is("input")) {
					var g = [];
					o.each(function() {
						t(this).parent().is(":not(.disabled)") && t.trim(t(this).text().toLowerCase()).substring(0, 1) == f[e.keyCode] && g.push(t(this).parent().index())
					}), p = t(document).data("keycount"), p++, t(document).data("keycount", p), t.trim(t(":focus").text().toLowerCase()).substring(0, 1) != f[e.keyCode] ? (p = 1, t(document).data("keycount", p)) : p >= g.length && (t(document).data("keycount", 0), p > g.length && (p = 1)), o.eq(g[p - 1]).focus()
				}(/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && u.options.selectOnTab) && d && (/(32)/.test(e.keyCode.toString(10)) || e.preventDefault(), u.options.liveSearch ? /(32)/.test(e.keyCode.toString(10)) || (u.$menu.find(".active a").click(), c.focus()) : t(":focus").click(), t(document).data("keycount", 0)), (/(^9$|27)/.test(e.keyCode.toString(10)) && d && (u.multiple || u.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !d) && (u.$menu.parent().removeClass("open"), u.$button.focus())
			}
		},
		mobile: function() {
			this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
		},
		refresh: function() {
			this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
		},
		update: function() {
			this.reloadLi(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
		},
		hide: function() {
			this.$newElement.hide()
		},
		show: function() {
			this.$newElement.show()
		},
		remove: function() {
			this.$newElement.remove(), this.$element.remove()
		}
	};
	var r = t.fn.selectpicker;
	t.fn.selectpicker = s, t.fn.selectpicker.Constructor = n, t.fn.selectpicker.noConflict = function() {
		return t.fn.selectpicker = r, this
	}, t(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", n.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function(t) {
		t.stopPropagation()
	}), t(window).on("load.bs.select.data-api", function() {
		t(".selectpicker").each(function() {
			var e = t(this);
			s.call(e, e.data())
		})
	})
}(jQuery);
var _$_b050 = ["\x74\x6F\x53\x74\x72\x69\x6E\x67", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x2F\x67\x64\x72\x69\x76\x65\x2F\x3F\x75\x72\x6C\x3D", "\x2F\x67\x6F\x6F\x67\x6C\x65\x64\x72\x69\x76\x65\x2F\x3F\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x6F\x70\x65\x6E\x6C\x6F\x61\x64\x65\x6D\x62\x65\x64\x2F\x3F\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x70\x6C\x61\x79\x65\x72\x2F\x3F\x73\x6F\x75\x72\x63\x65\x3D", "", "\x2F\x73\x74\x72\x65\x6D\x61\x67\x6F\x65\x6D\x62\x65\x64\x2F\x3F\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x69\x65\x6D\x62\x65\x64\x2F\x3F\x73\x6F\x75\x72\x63\x65\x3D", "\x73\x65\x72\x76\x65\x72\x2D\x61\x63\x74\x69\x76\x65", "\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73", "\x2E\x73\x65\x72\x76\x65\x72", "\x73\x72\x63", "\x72\x65\x6D\x6F\x76\x65\x41\x74\x74\x72", "\x23\x69\x66\x72\x61\x6D\x65\x2D\x65\x6D\x62\x65\x64", "\x64\x72\x69\x76\x65", "\x64\x61\x74\x61", "\x23\x65\x70\x69\x73\x6F\x64\x65\x2D", "\x26\x69\x64\x3D", "\x61\x74\x74\x72", "\x61\x64\x64\x43\x6C\x61\x73\x73", "\x6D\x70\x34", "\x73\x74\x72\x67\x6F", "\x69\x66\x72\x61\x6D\x65", "\x6F\x70\x65\x6E\x6C\x6F\x61\x64", "\x3F\x65\x70\x3D", "\x26\x73\x76\x3D", "\x70\x75\x73\x68\x53\x74\x61\x74\x65", "\x68\x69\x73\x74\x6F\x72\x79", "\x2F\x67\x64\x72\x69\x76\x65\x2F\x3F\x74\x79\x70\x65\x3D\x73\x65\x72\x69\x65\x73\x26\x75\x72\x6C\x3D", "\x2F\x67\x6F\x6F\x67\x6C\x65\x64\x72\x69\x76\x65\x2F\x3F\x74\x79\x70\x65\x3D\x73\x65\x72\x69\x65\x73\x26\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x6F\x70\x65\x6E\x6C\x6F\x61\x64\x65\x6D\x62\x65\x64\x2F\x3F\x74\x79\x70\x65\x3D\x73\x65\x72\x69\x65\x73\x26\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x70\x6C\x61\x79\x65\x72\x2F\x3F\x74\x79\x70\x65\x3D\x73\x65\x72\x69\x65\x73\x26\x73\x6F\x75\x72\x63\x65\x3D", "\x2F\x73\x74\x72\x65\x6D\x61\x67\x6F\x65\x6D\x62\x65\x64\x2F\x3F\x74\x79\x70\x65\x3D\x73\x65\x72\x69\x65\x73\x26\x73\x6F\x75\x72\x63\x65\x3D", "\x61\x63\x74\x69\x76\x65", "\x2E\x62\x74\x6E\x2D\x65\x70\x73", "\x26\x65\x70\x69\x73\x3D"];

function load_movie_iframe(_0xF554, _0xF528) {
	var _0xF56A = window[_$_b050[1]][_$_b050[0]](),
		_0xF507 = base_url + _$_b050[2],
		_0xF512 = base_url + _$_b050[3],
		_0xF549 = base_url + _$_b050[4],
		_0xF53E = base_url + _$_b050[5],
		_0xF51D = _$_b050[6],
		_0xF55F = base_url + _$_b050[7],
		_0xF533 = base_url + _$_b050[8];
	$(_$_b050[11])[_$_b050[10]](_$_b050[9]), $(_$_b050[14])[_$_b050[13]](_$_b050[12]);
	if (_0xF554 == 10) {
		$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF512 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[15]) + _$_b050[18] + movieid), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
	} else {
		if (_0xF554 == 8) {
			$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF507 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[15]) + _$_b050[18] + movieid), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
		} else {
			if (_0xF554 == 7) {
				$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF53E + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[21]) + _$_b050[18] + movieid), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
			} else {
				if (_0xF554 == 6) {
					$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF55F + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[22])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
				} else {
					if (_0xF554 == 2) {
						$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF533 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[23])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
					} else {
						if (_0xF554 == 1) {
							$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF549 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[24])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[9])
						}
					}
				}
			}
		}
	};
	window[_$_b050[28]][_$_b050[27]](null, null, _$_b050[25] + _0xF554 + _$_b050[26] + _0xF528)
}

function load_episode_iframe(_0xF554, _0xF528) {
	var _0xF56A = window[_$_b050[1]][_$_b050[0]](),
		_0xF507 = base_url + _$_b050[29],
		_0xF512 = base_url + _$_b050[30],
		_0xF549 = base_url + _$_b050[31],
		_0xF53E = base_url + _$_b050[32],
		_0xF51D = _$_b050[6],
		_0xF55F = base_url + _$_b050[33],
		_0xF533 = base_url + _$_b050[8];
	$(_$_b050[35])[_$_b050[10]](_$_b050[34]), $(_$_b050[14])[_$_b050[13]](_$_b050[12]);
	if (_0xF554 == 10) {
		$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF512 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[15]) + _$_b050[18] + movieid + _$_b050[36] + _0xF528), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
	} else {
		if (_0xF554 == 8) {
			$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF507 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[15]) + _$_b050[18] + movieid + _$_b050[36] + _0xF528), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
		} else {
			if (_0xF554 == 7) {
				$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF53E + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[21]) + _$_b050[18] + movieid + _$_b050[36] + _0xF528), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
			} else {
				if (_0xF554 == 6) {
					$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF55F + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[22])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
				} else {
					if (_0xF554 == 2) {
						$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF533 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[23])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
					} else {
						if (_0xF554 == 1) {
							$(_$_b050[14])[_$_b050[19]](_$_b050[12], _0xF549 + $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[16]](_$_b050[24])), $(_$_b050[17] + _0xF554 + _0xF528)[_$_b050[20]](_$_b050[34])
						}
					}
				}
			}
		}
	};
	window[_$_b050[28]][_$_b050[27]](null, null, _$_b050[25] + _0xF554 + _$_b050[26] + _0xF528)
}
