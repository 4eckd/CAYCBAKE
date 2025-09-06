 < !DOCTYPE html >
 < html >
 < head >
 < meta charset = "utf-8" >
     < meta name = "viewport" content = "width=device-width, initial-scale=1" >
     < meta name = "csrf-token" content = "VKUCPTsktjOOb6X2cxgmcfU125bPOy9EEfHoaQA6" >
     < title > Schnecky <  / title >
     < link rel = "icon" href = "/assets/logo.png" type = "image/png" >
     < link rel = "preconnect" href = "https://fonts.googleapis.com" >
     < link rel = "preconnect" href = "https://fonts.gstatic.com" crossorigin >
     < link href = "https://fonts.googleapis.com/css2?family=Bungee&family=Golos+Text:wght@400..900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Space+Grotesk:wght@300..700&display=swap" rel = "stylesheet" >
     < link rel = "preload" as = "style" href = "https://schneckyirl.com/build/assets/app-B8XtXJbW.css" /  >
     < link rel = "preload" as = "style" href = "https://schneckyirl.com/build/assets/app-CI3Qtzj3.css" /  >
     < link rel = "modulepreload" href = "https://schneckyirl.com/build/assets/app-DErpJv6x.js" /  >
     < link rel = "stylesheet" href = "https://schneckyirl.com/build/assets/app-B8XtXJbW.css" /  >
     < link rel = "stylesheet" href = "https://schneckyirl.com/build/assets/app-CI3Qtzj3.css" /  >
     < script type = "module" src = "https://schneckyirl.com/build/assets/app-DErpJv6x.js" >  <  / script >
     < script type = "text/javascript" >
    const Ziggy = {
    "url": "https:\/\/schneckyirl.com",
    "port": null,
    "defaults": {},
    "routes": {
        "login": {
            "uri": "login",
            "methods": ["GET", "HEAD"]
        },
        "auth.discord.redirect": {
            "uri": "discord\/redirect",
            "methods": ["GET", "HEAD"]
        },
        "storage.local": {
            "uri": "storage\/{path}",
            "methods": ["GET", "HEAD"],
            "wheres": {
                "path": ".*"
            },
            "parameters": ["path"]
        }
    }
};
!function (t, r) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (t || self).route = r()
}
(this, function () {
    function t(t, r) {
        for (var n = 0; n < r.length; n++) {
            var e = r[n];
            e.enumerable = e.enumerable || !1,
            e.configurable = !0,
            "value" in e && (e.writable = !0),
            Object.defineProperty(t, u(e.key), e)
        }
    }
    function r(r, n, e) {
        return n && t(r.prototype, n),
        e && t(r, e),
        Object.defineProperty(r, "prototype", {
            writable: !1
        }),
        r
    }
    function n() {
        return n = Object.assign ? Object.assign.bind() : function (t) {
            for (var r = 1; r < arguments.length; r++) {
                var n = arguments[r];
                for (var e in n)
                    ({}).hasOwnProperty.call(n, e) && (t[e] = n[e])
            }
            return t
        },
        n.apply(null, arguments)
    }
    function e(t) {
        return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        },
        e(t)
    }
    function o() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
        } catch (t) {}
        return (o = function () {
            return !!t
        })()
    }
    function i(t, r) {
        return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, r) {
            return t.__proto__ = r,
            t
        },
        i(t, r)
    }
    function u(t) {
        var r = function (t) {
            if ("object" != typeof t || !t)
                return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(t, "string");
                if ("object" != typeof n)
                    return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }
        (t);
        return "symbol" == typeof r ? r : r + ""
    }
    function f(t) {
        var r = "function" == typeof Map ? new Map : void 0;
        return f = function (t) {
            if (null === t || !function (t) {
                try {
                    return -1 !== Function.toString.call(t).indexOf("[native code]")
                } catch (r) {
                    return "function" == typeof t
                }
            }
                (t))
                return t;
            if ("function" != typeof t)
                throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== r) {
                if (r.has(t))
                    return r.get(t);
                r.set(t, n)
            }
            function n() {
                return function (t, r, n) {
                    if (o())
                        return Reflect.construct.apply(null, arguments);
                    var e = [null];
                    e.push.apply(e, r);
                    var u = new(t.bind.apply(t, e));
                    return n && i(u, n.prototype),
                    u
                }
                (t, arguments, e(this).constructor)
            }
            return n.prototype = Object.create(t.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            i(n, t)
        },
        f(t)
    }
    var a = String.prototype.replace,
    c = /%20/g,
    l = "RFC3986",
    s = {
    default:
        l,
        formatters: {
            RFC1738: function (t) {
                return a.call(t, c, "+")
            },
            RFC3986: function (t) {
                return String(t)
            }
        },
        RFC1738: "RFC1738",
        RFC3986: l
    },
    v = Object.prototype.hasOwnProperty,
    p = Array.isArray,
    y = function () {
        for (var t = [], r = 0; r < 256; ++r)
            t.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase());
        return t
    }
    (),
    d = function (t, r) {
        for (var n = r && r.plainObjects ? Object.create(null) : {}, e = 0; e < t.length; ++e)
            void 0 !== t[e] && (n[e] = t[e]);
        return n
    },
    b = {
        arrayToObject: d,
        assign: function (t, r) {
            return Object.keys(r).reduce(function (t, n) {
                return t[n] = r[n],
                t
            }, t)
        },
        combine: function (t, r) {
            return [].concat(t, r)
        },
        compact: function (t) {
            for (var r = [{
                        obj: {
                            o: t
                        },
                        prop: "o"
                    }
                ], n = [], e = 0; e < r.length; ++e)
                for (var o = r[e], i = o.obj[o.prop], u = Object.keys(i), f = 0; f < u.length; ++f) {
                    var a = u[f],
                    c = i[a];
                    "object" == typeof c && null !== c && -1 === n.indexOf(c) && (r.push({
                            obj: i,
                            prop: a
                        }),
                        n.push(c))
                }
            return function (t) {
                for (; t.length > 1; ) {
                    var r = t.pop(),
                    n = r.obj[r.prop];
                    if (p(n)) {
                        for (var e = [], o = 0; o < n.length; ++o)
                            void 0 !== n[o] && e.push(n[o]);
                        r.obj[r.prop] = e
                    }
                }
            }
            (r),
            t
        },
        decode: function (t, r, n) {
            var e = t.replace(/\+/g, " ");
            if ("iso-8859-1" === n)
                return e.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return e
            }
        },
        encode: function (t, r, n, e, o) {
            if (0 === t.length)
                return t;
            var i = t;
            if ("symbol" == typeof t ? i = Symbol.prototype.toString.call(t) : "string" != typeof t && (i = String(t)),
                "iso-8859-1" === n)
                return escape(i).replace(/%u[0-9a-f]{4}/gi, function (t) {
                    return "%26%23" + parseInt(t.slice(2), 16) + "%3B"
                });
            for (var u = "", f = 0; f < i.length; ++f) {
                var a = i.charCodeAt(f);
                45 === a || 46 === a || 95 === a || 126 === a || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || o === s.RFC1738 && (40 === a || 41 === a) ? u += i.charAt(f) : a < 128 ? u += y[a] : a < 2048 ? u += y[192 | a >> 6] + y[128 | 63 & a] : a < 55296 || a >= 57344 ? u += y[224 | a >> 12] + y[128 | a >> 6 & 63] + y[128 | 63 & a] : (a = 65536 + ((1023 & a) << 10 | 1023 & i.charCodeAt(f += 1)),
                    u += y[240 | a >> 18] + y[128 | a >> 12 & 63] + y[128 | a >> 6 & 63] + y[128 | 63 & a])
            }
            return u
        },
        isBuffer: function (t) {
            return !(!t || "object" != typeof t || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t)))
        },
        isRegExp: function (t) {
            return "[object RegExp]" === Object.prototype.toString.call(t)
        },
        maybeMap: function (t, r) {
            if (p(t)) {
                for (var n = [], e = 0; e < t.length; e += 1)
                    n.push(r(t[e]));
                return n
            }
            return r(t)
        },
        merge: function t(r, n, e) {
            if (!n)
                return r;
            if ("object" != typeof n) {
                if (p(r))
                    r.push(n);
                else {
                    if (!r || "object" != typeof r)
                        return [r, n];
                    (e && (e.plainObjects || e.allowPrototypes) || !v.call(Object.prototype, n)) && (r[n] = !0)
                }
                return r
            }
            if (!r || "object" != typeof r)
                return [r].concat(n);
            var o = r;
            return p(r) && !p(n) && (o = d(r, e)),
            p(r) && p(n) ? (n.forEach(function (n, o) {
                    if (v.call(r, o)) {
                        var i = r[o];
                        i && "object" == typeof i && n && "object" == typeof n ? r[o] = t(i, n, e) : r.push(n)
                    } else
                        r[o] = n
                }),
                r) : Object.keys(n).reduce(function (r, o) {
                var i = n[o];
                return r[o] = v.call(r, o) ? t(r[o], i, e) : i,
                r
            }, o)
        }
    },
    h = Object.prototype.hasOwnProperty,
    g = {
        brackets: function (t) {
            return t + "[]"
        },
        comma: "comma",
        indices: function (t, r) {
            return t + "[" + r + "]"
        },
        repeat: function (t) {
            return t
        }
    },
    m = Array.isArray,
    j = String.prototype.split,
    w = Array.prototype.push,
    O = function (t, r) {
        w.apply(t, m(r) ? r : [r])
    },
    E = Date.prototype.toISOString,
    R = s.default,
    S = {
        addQueryPrefix: !1,
        allowDots: !1,
        charset: "utf-8",
        charsetSentinel: !1,
        delimiter: "&",
        encode: !0,
        encoder: b.encode,
        encodeValuesOnly: !1,
        format: R,
        formatter: s.formatters[R],
        indices: !1,
        serializeDate: function (t) {
            return E.call(t)
        },
        skipNulls: !1,
        strictNullHandling: !1
    },
    k = function t(r, n, e, o, i, u, f, a, c, l, s, v, p, y) {
        var d,
        h = r;
        if ("function" == typeof f ? h = f(n, h) : h instanceof Date ? h = l(h) : "comma" === e && m(h) && (h = b.maybeMap(h, function (t) {
                        return t instanceof Date ? l(t) : t
                    })),
            null === h) {
            if (o)
                return u && !p ? u(n, S.encoder, y, "key", s) : n;
            h = ""
        }
        if ("string" == typeof(d = h) || "number" == typeof d || "boolean" == typeof d || "symbol" == typeof d || "bigint" == typeof d || b.isBuffer(h)) {
            if (u) {
                var g = p ? n : u(n, S.encoder, y, "key", s);
                if ("comma" === e && p) {
                    for (var w = j.call(String(h), ","), E = "", R = 0; R < w.length; ++R)
                        E += (0 === R ? "" : ",") + v(u(w[R], S.encoder, y, "value", s));
                    return [v(g) + "=" + E]
                }
                return [v(g) + "=" + v(u(h, S.encoder, y, "value", s))]
            }
            return [v(n) + "=" + v(String(h))]
        }
        var k,
        T = [];
        if (void 0 === h)
            return T;
        if ("comma" === e && m(h))
            k = [{
                    value: h.length > 0 ? h.join(",") || null : void 0
                }
            ];
        else if (m(f))
            k = f;
        else {
            var $ = Object.keys(h);
            k = a ? $.sort(a) : $
        }
        for (var x = 0; x < k.length; ++x) {
            var N = k[x],
            C = "object" == typeof N && void 0 !== N.value ? N.value : h[N];
            if (!i || null !== C) {
                var A = m(h) ? "function" == typeof e ? e(n, N) : n : n + (c ? "." + N : "[" + N + "]");
                O(T, t(C, A, e, o, i, u, f, a, c, l, s, v, p, y))
            }
        }
        return T
    },
    T = Object.prototype.hasOwnProperty,
    $ = Array.isArray,
    x = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: !1,
        comma: !1,
        decoder: b.decode,
        delimiter: "&",
        depth: 5,
        ignoreQueryPrefix: !1,
        interpretNumericEntities: !1,
        parameterLimit: 1e3,
        parseArrays: !0,
        plainObjects: !1,
        strictNullHandling: !1
    },
    N = function (t) {
        return t.replace(/&#(\d+);/g, function (t, r) {
            return String.fromCharCode(parseInt(r, 10))
        })
    },
    C = function (t, r) {
        return t && "string" == typeof t && r.comma && t.indexOf(",") > -1 ? t.split(",") : t
    },
    A = function (t, r, n, e) {
        if (t) {
            var o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
            i = /(\[[^[\]]*])/g,
            u = n.depth > 0 && /(\[[^[\]]*])/.exec(o),
            f = u ? o.slice(0, u.index) : o,
            a = [];
            if (f) {
                if (!n.plainObjects && T.call(Object.prototype, f) && !n.allowPrototypes)
                    return;
                a.push(f)
            }
            for (var c = 0; n.depth > 0 && null !== (u = i.exec(o)) && c < n.depth; ) {
                if (c += 1,
                    !n.plainObjects && T.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)
                    return;
                a.push(u[1])
            }
            return u && a.push("[" + o.slice(u.index) + "]"),
            function (t, r, n, e) {
                for (var o = e ? r : C(r, n), i = t.length - 1; i >= 0; --i) {
                    var u,
                    f = t[i];
                    if ("[]" === f && n.parseArrays)
                        u = [].concat(o);
                    else {
                        u = n.plainObjects ? Object.create(null) : {};
                        var a = "[" === f.charAt(0) && "]" === f.charAt(f.length - 1) ? f.slice(1, -1) : f,
                        c = parseInt(a, 10);
                        n.parseArrays || "" !== a ? !isNaN(c) && f !== a && String(c) === a && c >= 0 && n.parseArrays && c <= n.arrayLimit ? (u = [])[c] = o : "__proto__" !== a && (u[a] = o) : u = {
                            0: o
                        }
                    }
                    o = u
                }
                return o
            }
            (a, r, n, e)
        }
    },
    D = function (t, r) {
        var n = function (t) {
            if (!t)
                return x;
            if (null != t.decoder && "function" != typeof t.decoder)
                throw new TypeError("Decoder has to be a function.");
            if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset)
                throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            return {
                allowDots: void 0 === t.allowDots ? x.allowDots : !!t.allowDots,
                allowPrototypes: "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : x.allowPrototypes,
                arrayLimit: "number" == typeof t.arrayLimit ? t.arrayLimit : x.arrayLimit,
                charset: void 0 === t.charset ? x.charset : t.charset,
                charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : x.charsetSentinel,
                comma: "boolean" == typeof t.comma ? t.comma : x.comma,
                decoder: "function" == typeof t.decoder ? t.decoder : x.decoder,
                delimiter: "string" == typeof t.delimiter || b.isRegExp(t.delimiter) ? t.delimiter : x.delimiter,
                depth: "number" == typeof t.depth || !1 === t.depth ? +t.depth : x.depth,
                ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
                interpretNumericEntities: "boolean" == typeof t.interpretNumericEntities ? t.interpretNumericEntities : x.interpretNumericEntities,
                parameterLimit: "number" == typeof t.parameterLimit ? t.parameterLimit : x.parameterLimit,
                parseArrays: !1 !== t.parseArrays,
                plainObjects: "boolean" == typeof t.plainObjects ? t.plainObjects : x.plainObjects,
                strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : x.strictNullHandling
            }
        }
        (r);
        if ("" === t || null == t)
            return n.plainObjects ? Object.create(null) : {};
        for (var e = "string" == typeof t ? function (t, r) {
            var n,
            e = {},
            o = (r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t).split(r.delimiter, Infinity === r.parameterLimit ? void 0 : r.parameterLimit),
            i = -1,
            u = r.charset;
            if (r.charsetSentinel)
                for (n = 0; n < o.length; ++n)
                    0 === o[n].indexOf("utf8=")
                         && ("utf8=%E2%9C%93" === o[n] ? u = "utf-8" : "utf8=%26%2310003%3B" === o[n] && (u = "iso-8859-1"),
                            i = n,
                            n = o.length);
                for (n = 0; n < o.length; ++n)
                    if (n !== i) {
                        var f,
                        a,
                        c = o[n],
                        l = c.indexOf("]="),
                        s = -1 === l ? c.indexOf("=") : l + 1;
                        -1 === s ? (f = r.decoder(c, x.decoder, u, "key"),
                            a = r.strictNullHandling ? null : "") : (f = r.decoder(c.slice(0, s), x.decoder, u, "key"),
                            a = b.maybeMap(C(c.slice(s + 1), r), function (t) {
                                return r.decoder(t, x.decoder, u, "value")
                            })),
                        a && r.interpretNumericEntities && "iso-8859-1" === u && (a = N(a)),
                        c.indexOf("[]=") > -1 && (a = $(a) ? [a] : a),
                        e[f] = T.call(e, f) ? b.combine(e[f], a) : a
                    }
                return e
            }
                (t, n) : t, o = n.plainObjects ? Object.create(null) : {}, i = Object.keys(e), u = 0; u < i.length; ++u) {
                var f = i[u],
                a = A(f, e[f], n, "string" == typeof t);
                o = b.merge(o, a, n)
            }
        return b.compact(o)
    },
    P = /*#__PURE__*/
    function () {
        function t(t, r, n) {
            var e,
            o;
            this.name = t,
            this.definition = r,
            this.bindings = null != (e = r.bindings) ? e : {},
            this.wheres = null != (o = r.wheres) ? o : {},
            this.config = n
        }
        var n = t.prototype;
        return n.matchesUrl = function (t) {
            var r,
            n = this;
            if (!this.definition.methods.includes("GET"))
                return !1;
            var e = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, function (t, r, e, o) {
                var i,
                u = "(?<" + e + ">" + ((null == (i = n.wheres[e]) ? void 0 : i.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
                return o ? "(" + r + u + ")?" : "" + r + u
            }).replace(/^\w+:\/\//, ""),
            o = t.replace(/^\w+:\/\//, "").split("?"),
            i = o[0],
            u = o[1],
            f = null != (r = new RegExp("^" + e + "/?$").exec(i)) ? r : new RegExp("^" + e + "/?$").exec(decodeURI(i));
            if (f) {
                for (var a in f.groups)
                    f.groups[a] = "string" == typeof f.groups[a] ? decodeURIComponent(f.groups[a]) : f.groups[a];
                return {
                    params: f.groups,
                    query: D(u)
                }
            }
            return !1
        },
        n.compile = function (t) {
            var r = this;
            return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function (n, e, o) {
                var i,
                u;
                if (!o && [null, void 0].includes(t[e]))
                    throw new Error("Ziggy error: '" + e + "' parameter is required for route '" + r.name + "'.");
                if (r.wheres[e] && !new RegExp("^" + (o ? "(" + r.wheres[e] + ")?" : r.wheres[e]) + "$").test(null != (u = t[e]) ? u : ""))
                    throw new Error("Ziggy error: '" + e + "' parameter '" + t[e] + "' does not match required format '" + r.wheres[e] + "' for route '" + r.name + "'.");
                return encodeURI(null != (i = t[e]) ? i : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24")
            }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template
        },
        r(t, [{
                    key: "template",
                    get: function () {
                        var t = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
                        return "" === t ? "/" : t
                    }
                }, {
                    key: "origin",
                    get: function () {
                        return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : ""
                    }
                }, {
                    key: "parameterSegments",
                    get: function () {
                        var t,
                        r;
                        return null != (t = null == (r = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r.map(function (t) {
                                return {
                                    name: t.replace(/{|\??}/g, ""),
                                    required: !/\?}$/.test(t)
                                }
                            })) ? t : []
                    }
                }
            ])
    }
    (),
    F = /*#__PURE__*/
    function (t) {
        function e(r, e, o, i) {
            var u;
            if (void 0 === o && (o = !0),
                (u = t.call(this) || this).t = null != i ? i : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy,
                u.t = n({}, u.t, {
                    absolute: o
                }),
                r) {
                if (!u.t.routes[r])
                    throw new Error("Ziggy error: route '" + r + "' is not in the route list.");
                u.i = new P(r, u.t.routes[r], u.t),
                u.u = u.l(e)
            }
            return u
        }
        var o,
        u;
        u = t,
        (o = e).prototype = Object.create(u.prototype),
        o.prototype.constructor = o,
        i(o, u);
        var f = e.prototype;
        return f.toString = function () {
            var t = this,
            r = Object.keys(this.u).filter(function (r) {
                return !t.i.parameterSegments.some(function (t) {
                    return t.name === r
                })
            }).filter(function (t) {
                return "_query" !== t
            }).reduce(function (r, e) {
                var o;
                return n({}, r, ((o = {})[e] = t.u[e],
                        o))
            }, {});
            return this.i.compile(this.u) + function (t, r) {
                var n,
                e = t,
                o = function (t) {
                    if (!t)
                        return S;
                    if (null != t.encoder && "function" != typeof t.encoder)
                        throw new TypeError("Encoder has to be a function.");
                    var r = t.charset || S.charset;
                    if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset)
                        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    var n = s.default;
                    if (void 0 !== t.format) {
                        if (!h.call(s.formatters, t.format))
                            throw new TypeError("Unknown format option provided.");
                        n = t.format
                    }
                    var e = s.formatters[n],
                    o = S.filter;
                    return ("function" == typeof t.filter || m(t.filter)) && (o = t.filter), {
                        addQueryPrefix: "boolean" == typeof t.addQueryPrefix ? t.addQueryPrefix : S.addQueryPrefix,
                        allowDots: void 0 === t.allowDots ? S.allowDots : !!t.allowDots,
                        charset: r,
                        charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : S.charsetSentinel,
                        delimiter: void 0 === t.delimiter ? S.delimiter : t.delimiter,
                        encode: "boolean" == typeof t.encode ? t.encode : S.encode,
                        encoder: "function" == typeof t.encoder ? t.encoder : S.encoder,
                        encodeValuesOnly: "boolean" == typeof t.encodeValuesOnly ? t.encodeValuesOnly : S.encodeValuesOnly,
                        filter: o,
                        format: n,
                        formatter: e,
                        serializeDate: "function" == typeof t.serializeDate ? t.serializeDate : S.serializeDate,
                        skipNulls: "boolean" == typeof t.skipNulls ? t.skipNulls : S.skipNulls,
                        sort: "function" == typeof t.sort ? t.sort : null,
                        strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : S.strictNullHandling
                    }
                }
                (r);
                "function" == typeof o.filter ? e = (0,
                    o.filter)("", e) : m(o.filter) && (n = o.filter);
                var i = [];
                if ("object" != typeof e || null === e)
                    return "";
                var u = g[r && r.arrayFormat in g ? r.arrayFormat : r && "indices" in r ? r.indices ? "indices" : "repeat" : "indices"];
                n || (n = Object.keys(e)),
                o.sort && n.sort(o.sort);
                for (var f = 0; f < n.length; ++f) {
                    var a = n[f];
                    o.skipNulls && null === e[a] || O(i, k(e[a], a, u, o.strictNullHandling, o.skipNulls, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset))
                }
                var c = i.join(o.delimiter),
                l = !0 === o.addQueryPrefix ? "?" : "";
                return o.charsetSentinel && (l += "iso-8859-1" === o.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"),
                c.length > 0 ? l + c : ""
            }
            (n({}, r, this.u._query), {
                addQueryPrefix: !0,
                arrayFormat: "indices",
                encodeValuesOnly: !0,
                skipNulls: !0,
                encoder: function (t, r) {
                    return "boolean" == typeof t ? Number(t) : r(t)
                }
            })
        },
        f.v = function (t) {
            var r = this;
            t ? this.t.absolute && t.startsWith("/") && (t = this.p().host + t) : t = this.h();
            var e = {},
            o = Object.entries(this.t.routes).find(function (n) {
                return e = new P(n[0], n[1], r.t).matchesUrl(t)
            }) || [void 0, void 0];
            return n({
                name: o[0]
            }, e, {
                route: o[1]
            })
        },
        f.h = function () {
            var t = this.p(),
            r = t.pathname,
            n = t.search;
            return (this.t.absolute ? t.host + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n
        },
        f.current = function (t, r) {
            var e = this.v(),
            o = e.name,
            i = e.params,
            u = e.query,
            f = e.route;
            if (!t)
                return o;
            var a = new RegExp("^" + t.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o);
            if ([null, void 0].includes(r) || !a)
                return a;
            var c = new P(o, f, this.t);
            r = this.l(r, c);
            var l = n({}, i, u);
            if (Object.values(r).every(function (t) {
                    return !t
                }) && !Object.values(l).some(function (t) {
                    return void 0 !== t
                }))
                return !0;
            var s = function (t, r) {
                return Object.entries(t).every(function (t) {
                    var n = t[0],
                    e = t[1];
                    return Array.isArray(e) && Array.isArray(r[n]) ? e.every(function (t) {
                        return r[n].includes(t)
                    }) : "object" == typeof e && "object" == typeof r[n] && null !== e && null !== r[n] ? s(e, r[n]) : r[n] == e
                })
            };
            return s(r, l)
        },
        f.p = function () {
            var t,
            r,
            n,
            e,
            o,
            i,
            u = "undefined" != typeof window ? window.location : {},
            f = u.host,
            a = u.pathname,
            c = u.search;
            return {
                host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : void 0 === f ? "" : f,
                pathname: null != (n = null == (e = this.t.location) ? void 0 : e.pathname) ? n : void 0 === a ? "" : a,
                search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === c ? "" : c
            }
        },
        f.has = function (t) {
            return this.t.routes.hasOwnProperty(t)
        },
        f.l = function (t, r) {
            var e = this;
            void 0 === t && (t = {}),
            void 0 === r && (r = this.i),
            null != t || (t = {}),
            t = ["string", "number"].includes(typeof t) ? [t] : t;
            var o = r.parameterSegments.filter(function (t) {
                return !e.t.defaults[t.name]
            });
            if (Array.isArray(t))
                t = t.reduce(function (t, r, e) {
                    var i,
                    u;
                    return n({}, t, o[e] ? ((i = {})[o[e].name] = r,
                            i) : "object" == typeof r ? r : ((u = {})[r] = "",
                            u))
                }, {});
            else if (1 === o.length && !t[o[0].name] && (t.hasOwnProperty(Object.values(r.bindings)[0]) || t.hasOwnProperty("id"))) {
                var i;
                (i = {})[o[0].name] = t,
                t = i
            }
            return n({}, this.m(r), this.j(t, r))
        },
        f.m = function (t) {
            var r = this;
            return t.parameterSegments.filter(function (t) {
                return r.t.defaults[t.name]
            }).reduce(function (t, e, o) {
                var i,
                u = e.name;
                return n({}, t, ((i = {})[u] = r.t.defaults[u],
                        i))
            }, {})
        },
        f.j = function (t, r) {
            var e = r.bindings,
            o = r.parameterSegments;
            return Object.entries(t).reduce(function (t, r) {
                var i,
                u,
                f = r[0],
                a = r[1];
                if (!a || "object" != typeof a || Array.isArray(a) || !o.some(function (t) {
                        return t.name === f
                    }))
                    return n({}, t, ((u = {})[f] = a,
                            u));
                if (!a.hasOwnProperty(e[f])) {
                    if (!a.hasOwnProperty("id"))
                        throw new Error("Ziggy error: object passed as '" + f + "' parameter is missing route model binding key '" + e[f] + "'.");
                    e[f] = "id"
                }
                return n({}, t, ((i = {})[f] = a[e[f]],
                        i))
            }, {})
        },
        f.valueOf = function () {
            return this.toString()
        },
        r(e, [{
                    key: "params",
                    get: function () {
                        var t = this.v();
                        return n({}, t.params, t.query)
                    }
                }, {
                    key: "routeParams",
                    get: function () {
                        return this.v().params
                    }
                }, {
                    key: "queryParams",
                    get: function () {
                        return this.v().query
                    }
                }
            ])
    }
    (/*#__PURE__*/
        f(String));
    return function (t, r, n, e) {
        var o = new F(t, r, n, e);
        return t ? o.toString() : o
    }
});
 <  / script >
 <  / head >
 < body >
 < div id = "app" data - page = "{&quot;component&quot;:&quot;leaderboard&quot;,&quot;props&quot;:{&quot;errors&quot;:{},&quot;user&quot;:null,&quot;connections&quot;:null,&quot;leaderboard_settings&quot;:{&quot;rain&quot;:{&quot;id&quot;:1,&quot;provider&quot;:&quot;rain&quot;,&quot;enabled&quot;:false,&quot;prize&quot;:25000,&quot;start_date&quot;:&quot;2025-08-01T00:00:00.000000Z&quot;,&quot;end_date&quot;:&quot;2025-08-31T23:59:59.000000Z&quot;,&quot;auto_restart&quot;:true,&quot;created_at&quot;:&quot;2025-08-03T20:43:01.000000Z&quot;,&quot;updated_at&quot;:&quot;2025-08-22T00:00:00.000000Z&quot;},&quot;stake&quot;:{&quot;id&quot;:2,&quot;provider&quot;:&quot;stake&quot;,&quot;enabled&quot;:true,&quot;prize&quot;:10000,&quot;start_date&quot;:&quot;2025-09-01T00:00:00.000000Z&quot;,&quot;end_date&quot;:&quot;2025-09-15T23:59:59.000000Z&quot;,&quot;auto_restart&quot;:true,&quot;created_at&quot;:&quot;2025-08-03T20:43:01.000000Z&quot;,&quot;updated_at&quot;:&quot;2025-09-01T00:00:02.000000Z&quot;},&quot;rain_raffle&quot;:{&quot;id&quot;:3,&quot;provider&quot;:&quot;rain_raffle&quot;,&quot;enabled&quot;:true,&quot;prize&quot;:5000,&quot;start_date&quot;:&quot;2025-08-01T00:00:00.000000Z&quot;,&quot;end_date&quot;:&quot;2025-08-31T23:59:59.000000Z&quot;,&quot;auto_restart&quot;:true,&quot;created_at&quot;:&quot;2025-08-03T20:43:01.000000Z&quot;,&quot;updated_at&quot;:&quot;2025-08-22T00:00:03.000000Z&quot;},&quot;stake_raffle&quot;:{&quot;id&quot;:4,&quot;provider&quot;:&quot;stake_raffle&quot;,&quot;enabled&quot;:true,&quot;prize&quot;:1000,&quot;start_date&quot;:&quot;2025-09-01T00:00:00.000000Z&quot;,&quot;end_date&quot;:&quot;2025-09-14T23:59:59.000000Z&quot;,&quot;auto_restart&quot;:true,&quot;created_at&quot;:&quot;2025-08-03T20:43:01.000000Z&quot;,&quot;updated_at&quot;:&quot;2025-09-01T00:00:02.000000Z&quot;},&quot;stake_exclusives&quot;:{&quot;id&quot;:5,&quot;provider&quot;:&quot;stake_exclusives&quot;,&quot;enabled&quot;:true,&quot;prize&quot;:10000,&quot;start_date&quot;:&quot;2025-09-01T00:00:00.000000Z&quot;,&quot;end_date&quot;:&quot;2025-09-30T23:59:59.000000Z&quot;,&quot;auto_restart&quot;:true,&quot;created_at&quot;:&quot;2025-08-03T21:17:23.000000Z&quot;,&quot;updated_at&quot;:&quot;2025-09-01T00:00:03.000000Z&quot;}},&quot;chat&quot;:[{&quot;user&quot;:{&quot;id&quot;:563,&quot;username&quot;:&quot;jersey&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist2.png&quot;},&quot;message&quot;:{&quot;id&quot;:770,&quot;message&quot;:&quot;gl&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:22:30.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:699,&quot;username&quot;:&quot;Lparent28&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildpanda.png&quot;},&quot;message&quot;:{&quot;id&quot;:771,&quot;message&quot;:&quot;lfg&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:28:54.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:995,&quot;username&quot;:&quot;Blurryalan&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},&quot;message&quot;:{&quot;id&quot;:772,&quot;message&quot;:&quot;Yo&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:29:02.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:291,&quot;username&quot;:&quot;GlorbinETH&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68bb50be5dcb4.webp&quot;},&quot;message&quot;:{&quot;id&quot;:773,&quot;message&quot;:&quot;damn bru&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:30:40.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:564,&quot;username&quot;:&quot;Gragerik&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68a8ebd035e46.webp&quot;},&quot;message&quot;:{&quot;id&quot;:774,&quot;message&quot;:&quot;LFG!&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:32:01.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:82,&quot;username&quot;:&quot;dbc123x&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},&quot;message&quot;:{&quot;id&quot;:775,&quot;message&quot;:&quot;\ud83d\ude80&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:32:06.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:400,&quot;username&quot;:&quot;IBBS6&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/cashcrew.png&quot;},&quot;message&quot;:{&quot;id&quot;:776,&quot;message&quot;:&quot;1&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:32:27.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:118,&quot;username&quot;:&quot;CeoGoogle&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68bb5509e6a62.webp&quot;},&quot;message&quot;:{&quot;id&quot;:777,&quot;message&quot;:&quot;Cmon try this new&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:32:37.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:230,&quot;username&quot;:&quot;jzzazi&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},&quot;message&quot;:{&quot;id&quot;:778,&quot;message&quot;:&quot;hi&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:33:01.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:516,&quot;username&quot;:&quot;kasso00&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68bb577a394c1.webp&quot;},&quot;message&quot;:{&quot;id&quot;:779,&quot;message&quot;:&quot;hii&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:33:31.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:65,&quot;username&quot;:&quot;burninfire66&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},&quot;message&quot;:{&quot;id&quot;:780,&quot;message&quot;:&quot;hi&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:33:44.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:459,&quot;username&quot;:&quot;Darkbonesky&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68bb5c3eadd2b.webp&quot;},&quot;message&quot;:{&quot;id&quot;:781,&quot;message&quot;:&quot;When you&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:48:04.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:56,&quot;username&quot;:&quot;Jorcikk&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},&quot;message&quot;:{&quot;id&quot;:782,&quot;message&quot;:&quot;when me gang gang&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:50:06.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:459,&quot;username&quot;:&quot;Darkbonesky&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/68bb5c3eadd2b.webp&quot;},&quot;message&quot;:{&quot;id&quot;:783,&quot;message&quot;:&quot;And me&quot;,&quot;created_at&quot;:&quot;2025-09-05T21:55:31.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:72,&quot;username&quot;:&quot;martins2626&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},&quot;message&quot;:{&quot;id&quot;:784,&quot;message&quot;:&quot;lg&quot;,&quot;created_at&quot;:&quot;2025-09-05T23:44:12.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:205,&quot;username&quot;:&quot;PandawarriorIRL&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},&quot;message&quot;:{&quot;id&quot;:785,&quot;message&quot;:&quot;Wassup&quot;,&quot;created_at&quot;:&quot;2025-09-06T00:24:10.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:205,&quot;username&quot;:&quot;PandawarriorIRL&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},&quot;message&quot;:{&quot;id&quot;:786,&quot;message&quot;:&quot;So close to gold&quot;,&quot;created_at&quot;:&quot;2025-09-06T00:41:38.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:616,&quot;username&quot;:&quot;adlerandre20&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},&quot;message&quot;:{&quot;id&quot;:787,&quot;message&quot;:&quot;i won coins and i didnt get it :o&quot;,&quot;created_at&quot;:&quot;2025-09-06T00:43:56.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:36,&quot;username&quot;:&quot;intrigue&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/689a7f3d76347.webp&quot;},&quot;message&quot;:{&quot;id&quot;:788,&quot;message&quot;:&quot;on what game adleandre20 ?&quot;,&quot;created_at&quot;:&quot;2025-09-06T00:51:57.000000Z&quot;}},{&quot;user&quot;:{&quot;id&quot;:745,&quot;username&quot;:&quot;Pintola&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},&quot;message&quot;:{&quot;id&quot;:789,&quot;message&quot;:&quot;Yoo&quot;,&quot;created_at&quot;:&quot;2025-09-06T10:16:13.000000Z&quot;}}],&quot;rain&quot;:{&quot;leaderboard&quot;:[{&quot;username&quot;:&quot;Player1&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:10000,&quot;prize&quot;:500},{&quot;username&quot;:&quot;Player2&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:8500,&quot;prize&quot;:300},{&quot;username&quot;:&quot;Player3&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:7200,&quot;prize&quot;:200},{&quot;username&quot;:&quot;Player4&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:6100,&quot;prize&quot;:100},{&quot;username&quot;:&quot;Player5&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:5800,&quot;prize&quot;:75},{&quot;username&quot;:&quot;Player6&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:5200,&quot;prize&quot;:50},{&quot;username&quot;:&quot;Player7&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:4800,&quot;prize&quot;:40},{&quot;username&quot;:&quot;Player8&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:4300,&quot;prize&quot;:30},{&quot;username&quot;:&quot;Player9&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:3900,&quot;prize&quot;:25},{&quot;username&quot;:&quot;Player10&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:3500,&quot;prize&quot;:20}],&quot;prize&quot;:25000,&quot;end_date&quot;:&quot;2025-08-31T23:59:59.000000Z&quot;,&quot;enabled&quot;:false,&quot;history&quot;:[{&quot;id&quot;:8,&quot;prize&quot;:25000,&quot;date&quot;:&quot;2025-08-01&quot;,&quot;end_date&quot;:&quot;2025-08-21&quot;,&quot;entries_count&quot;:25,&quot;entries&quot;:[{&quot;uid&quot;:&quot;66fc2fdc4deba8e035567442&quot;,&quot;username&quot;:&quot;Thi***&quot;,&quot;wagered&quot;:196843,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:10000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist2.png&quot;},{&quot;uid&quot;:&quot;6826d5f6996021971ac90eaf&quot;,&quot;username&quot;:&quot;noe***&quot;,&quot;wagered&quot;:63393,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:5000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;66a5f756a6896768fcaca0b8&quot;,&quot;username&quot;:&quot;Pau***&quot;,&quot;wagered&quot;:42477,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2350,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist2.png&quot;},{&quot;uid&quot;:&quot;68905fad982aaf8fbbcd2ab8&quot;,&quot;username&quot;:&quot;alv***&quot;,&quot;wagered&quot;:36547,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1750,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;67a29f25e4be3d3759e3383f&quot;,&quot;username&quot;:&quot;pro***&quot;,&quot;wagered&quot;:34419,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1450,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;66ca2df92a6ddd3b162bdf41&quot;,&quot;username&quot;:&quot;Not***&quot;,&quot;wagered&quot;:23910,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1150,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dawnofkings.png&quot;},{&quot;uid&quot;:&quot;66542577ebe6a77815a1db51&quot;,&quot;username&quot;:&quot;Drx***&quot;,&quot;wagered&quot;:23685,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:900,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;},{&quot;uid&quot;:&quot;67bcfd2262974bd0c77ebd05&quot;,&quot;username&quot;:&quot;BLK***&quot;,&quot;wagered&quot;:23021,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:600,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;664e3fe873dfd9fffc6fb244&quot;,&quot;username&quot;:&quot;pev***&quot;,&quot;wagered&quot;:11198,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:450,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;},{&quot;uid&quot;:&quot;6859659b0c64bc9f7f96b385&quot;,&quot;username&quot;:&quot;Wha***&quot;,&quot;wagered&quot;:10319,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:325,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;66a68b1ba6896768fcafbfcd&quot;,&quot;username&quot;:&quot;(\u300d\u00b0***&quot;,&quot;wagered&quot;:8232,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:225,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;674b982c51cdeb9b6b393030&quot;,&quot;username&quot;:&quot;hal***&quot;,&quot;wagered&quot;:7874,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:170,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;},{&quot;uid&quot;:&quot;66ce8577067a6ca8a45f2586&quot;,&quot;username&quot;:&quot;iPA***&quot;,&quot;wagered&quot;:7179,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:125,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;},{&quot;uid&quot;:&quot;667f1ef89da2d15a7f5bfd1a&quot;,&quot;username&quot;:&quot;Smi***&quot;,&quot;wagered&quot;:5599,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:100,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;66561211171502aaadb5c46d&quot;,&quot;username&quot;:&quot;Jtr***&quot;,&quot;wagered&quot;:5531,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:80,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;6685d0031af637bccdddbefb&quot;,&quot;username&quot;:&quot;Luk***&quot;,&quot;wagered&quot;:5370,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:70,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/punkrocker2.png&quot;},{&quot;uid&quot;:&quot;66ce4811067a6ca8a45df29c&quot;,&quot;username&quot;:&quot;Das***&quot;,&quot;wagered&quot;:4502,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:60,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/cashcrew.png&quot;},{&quot;uid&quot;:&quot;67a4b6faf409f1952cb9c8f7&quot;,&quot;username&quot;:&quot;Lol***&quot;,&quot;wagered&quot;:3938,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;664f9c17f6f7f666934b58e0&quot;,&quot;username&quot;:&quot;Gut***&quot;,&quot;wagered&quot;:3803,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:40,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},{&quot;uid&quot;:&quot;667b0dd66cef6268465f205e&quot;,&quot;username&quot;:&quot;KAI***&quot;,&quot;wagered&quot;:3703,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:30,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;679e98f31256c80e9888b58a&quot;,&quot;username&quot;:&quot;xbs***&quot;,&quot;wagered&quot;:3478,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:25,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;},{&quot;uid&quot;:&quot;66667ad04863a7deba9f3722&quot;,&quot;username&quot;:&quot;Cab***&quot;,&quot;wagered&quot;:2352,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:20,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/razorshark.png&quot;},{&quot;uid&quot;:&quot;66ec75f2a9785e5cf1908d39&quot;,&quot;username&quot;:&quot;kin***&quot;,&quot;wagered&quot;:2234,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:15,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},{&quot;uid&quot;:&quot;6690b005b521cb4e461c95ed&quot;,&quot;username&quot;:&quot;Cod***&quot;,&quot;wagered&quot;:1680,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:10,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/lebandit.png&quot;},{&quot;uid&quot;:&quot;66befb1f292fc5ccbf4d1aed&quot;,&quot;username&quot;:&quot;Mat***&quot;,&quot;wagered&quot;:1569,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:5,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;}],&quot;total_prize&quot;:25000}]},&quot;stake&quot;:{&quot;leaderboard&quot;:[{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;wagered&quot;:307965,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:3000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;wagered&quot;:235309,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/cashcrew.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;One***&quot;,&quot;wagered&quot;:116833,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1500,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CAY***&quot;,&quot;wagered&quot;:29161,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/therave.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Raz***&quot;,&quot;wagered&quot;:19069,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:575,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/lebandit.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Aqu***&quot;,&quot;wagered&quot;:17236,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:425,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Woo***&quot;,&quot;wagered&quot;:15687,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:325,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;The***&quot;,&quot;wagered&quot;:15419,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:225,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Qui***&quot;,&quot;wagered&quot;:15300,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:150,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/doghouse.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;fea***&quot;,&quot;wagered&quot;:15072,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:100,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Kin***&quot;,&quot;wagered&quot;:13497,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:90,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/sanquentin.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CZE***&quot;,&quot;wagered&quot;:13012,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:85,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Jai***&quot;,&quot;wagered&quot;:12551,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:75,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Kid***&quot;,&quot;wagered&quot;:10950,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:65,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/razorshark.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Mav***&quot;,&quot;wagered&quot;:9626,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:60,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;mah***&quot;,&quot;wagered&quot;:7373,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:55,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Gra***&quot;,&quot;wagered&quot;:7198,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Sis***&quot;,&quot;wagered&quot;:5737,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:45,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/sanquentin.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Nic***&quot;,&quot;wagered&quot;:5576,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:40,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Bea***&quot;,&quot;wagered&quot;:5218,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:35,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;TVC***&quot;,&quot;wagered&quot;:5205,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:30,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;XSc***&quot;,&quot;wagered&quot;:5070,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:25,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;def***&quot;,&quot;wagered&quot;:5059,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:20,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Cry***&quot;,&quot;wagered&quot;:4943,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:15,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildpanda.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;hel***&quot;,&quot;wagered&quot;:4784,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:10,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;}],&quot;prize&quot;:10000,&quot;end_date&quot;:&quot;2025-09-15T23:59:59.000000Z&quot;,&quot;enabled&quot;:true,&quot;history&quot;:[{&quot;id&quot;:6,&quot;prize&quot;:10000,&quot;date&quot;:&quot;2025-08-01&quot;,&quot;end_date&quot;:&quot;2025-08-31&quot;,&quot;entries_count&quot;:25,&quot;entries&quot;:[{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;wagered&quot;:2027239,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:3000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Man***&quot;,&quot;wagered&quot;:518760,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;wagered&quot;:338731,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1500,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;fea***&quot;,&quot;wagered&quot;:336999,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Mon***&quot;,&quot;wagered&quot;:179575,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:575,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/lebandit.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Ani***&quot;,&quot;wagered&quot;:170959,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:425,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;fri***&quot;,&quot;wagered&quot;:146260,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:325,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Vxl***&quot;,&quot;wagered&quot;:144757,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:225,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/cashcrew.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Pri***&quot;,&quot;wagered&quot;:126650,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:150,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;def***&quot;,&quot;wagered&quot;:122734,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:100,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;One***&quot;,&quot;wagered&quot;:102902,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:90,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Qui***&quot;,&quot;wagered&quot;:96539,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:85,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;asi***&quot;,&quot;wagered&quot;:85492,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:75,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;ron***&quot;,&quot;wagered&quot;:81935,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:65,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Ice***&quot;,&quot;wagered&quot;:69646,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:60,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Raz***&quot;,&quot;wagered&quot;:68893,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:55,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Swo***&quot;,&quot;wagered&quot;:67396,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CZC***&quot;,&quot;wagered&quot;:64763,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:45,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;dun***&quot;,&quot;wagered&quot;:51075,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:40,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Dar***&quot;,&quot;wagered&quot;:48939,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:35,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;pat***&quot;,&quot;wagered&quot;:42894,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:30,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Kid***&quot;,&quot;wagered&quot;:40012,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:25,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildpanda.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Cry***&quot;,&quot;wagered&quot;:37572,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:20,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Squ***&quot;,&quot;wagered&quot;:36382,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:15,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/therave.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Pav***&quot;,&quot;wagered&quot;:35094,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:10,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;}],&quot;total_prize&quot;:10000},{&quot;id&quot;:2,&quot;prize&quot;:10000,&quot;date&quot;:&quot;2025-08-01&quot;,&quot;end_date&quot;:&quot;2025-08-16&quot;,&quot;entries_count&quot;:100,&quot;entries&quot;:[{&quot;uid&quot;:&quot;LimeGreen6969&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;wagered&quot;:1056853.02070592,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:3000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;Mansur389&quot;,&quot;username&quot;:&quot;Man***&quot;,&quot;wagered&quot;:533580.794693098,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;QuietGambleIRL&quot;,&quot;username&quot;:&quot;Qui***&quot;,&quot;wagered&quot;:356695.555266501,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1500,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;},{&quot;uid&quot;:&quot;amriraj29&quot;,&quot;username&quot;:&quot;amr***&quot;,&quot;wagered&quot;:306015.361499999,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;Foscod&quot;,&quot;username&quot;:&quot;Fos***&quot;,&quot;wagered&quot;:270566.329370842,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:575,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},{&quot;uid&quot;:&quot;casperkyza&quot;,&quot;username&quot;:&quot;cas***&quot;,&quot;wagered&quot;:249511.409006793,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:425,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;AnitaMaxiPad&quot;,&quot;username&quot;:&quot;Ani***&quot;,&quot;wagered&quot;:244340.244159926,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:325,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;toevstau&quot;,&quot;username&quot;:&quot;toe***&quot;,&quot;wagered&quot;:218243.69270001,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:225,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;Littouju&quot;,&quot;username&quot;:&quot;Lit***&quot;,&quot;wagered&quot;:217465.5,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:150,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;Hot7772&quot;,&quot;username&quot;:&quot;Hot***&quot;,&quot;wagered&quot;:207706.734054226,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:100,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/razorshark.png&quot;},{&quot;uid&quot;:&quot;IvanStreams&quot;,&quot;username&quot;:&quot;Iva***&quot;,&quot;wagered&quot;:147192.086310164,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:90,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;Bootysackk12&quot;,&quot;username&quot;:&quot;Boo***&quot;,&quot;wagered&quot;:88499.557412758,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:85,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;toruber10&quot;,&quot;username&quot;:&quot;tor***&quot;,&quot;wagered&quot;:87184.64182214,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:75,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;Pavadoshki69&quot;,&quot;username&quot;:&quot;Pav***&quot;,&quot;wagered&quot;:86314.8845568427,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:65,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;CryptoHODLR1&quot;,&quot;username&quot;:&quot;Cry***&quot;,&quot;wagered&quot;:85823.8889596509,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:60,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;},{&quot;uid&quot;:&quot;LoadsC&quot;,&quot;username&quot;:&quot;Loa***&quot;,&quot;wagered&quot;:82293.9873568469,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:55,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;deftsoup&quot;,&quot;username&quot;:&quot;def***&quot;,&quot;wagered&quot;:77362.2308877746,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;Micespy&quot;,&quot;username&quot;:&quot;Mic***&quot;,&quot;wagered&quot;:76340.6056700897,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:45,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;Savsports&quot;,&quot;username&quot;:&quot;Sav***&quot;,&quot;wagered&quot;:75705.069274007,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:40,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;coladincoladin&quot;,&quot;username&quot;:&quot;col***&quot;,&quot;wagered&quot;:71235.6320265093,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:35,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;},{&quot;uid&quot;:&quot;RazorSlotz&quot;,&quot;username&quot;:&quot;Raz***&quot;,&quot;wagered&quot;:64985.3678332518,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:30,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;feajusss&quot;,&quot;username&quot;:&quot;fea***&quot;,&quot;wagered&quot;:62370.5671644175,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:25,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;SwoopTheWin&quot;,&quot;username&quot;:&quot;Swo***&quot;,&quot;wagered&quot;:54166.2308633866,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:20,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/razorshark.png&quot;},{&quot;uid&quot;:&quot;Isouka890&quot;,&quot;username&quot;:&quot;Iso***&quot;,&quot;wagered&quot;:52680.3674872301,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:15,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/doghouse.png&quot;},{&quot;uid&quot;:&quot;Dariopla&quot;,&quot;username&quot;:&quot;Dar***&quot;,&quot;wagered&quot;:52196.4060382957,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:10,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;}],&quot;total_prize&quot;:10000}]},&quot;rain_raffle&quot;:{&quot;leaderboard&quot;:[{&quot;username&quot;:&quot;Player1&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:10000,&quot;prize&quot;:500},{&quot;username&quot;:&quot;Player2&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:8500,&quot;prize&quot;:300},{&quot;username&quot;:&quot;Player3&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:7200,&quot;prize&quot;:200},{&quot;username&quot;:&quot;Player4&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:6100,&quot;prize&quot;:100},{&quot;username&quot;:&quot;Player5&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:5800,&quot;prize&quot;:75},{&quot;username&quot;:&quot;Player6&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:5200,&quot;prize&quot;:50},{&quot;username&quot;:&quot;Player7&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:4800,&quot;prize&quot;:40},{&quot;username&quot;:&quot;Player8&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:4300,&quot;prize&quot;:30},{&quot;username&quot;:&quot;Player9&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:3900,&quot;prize&quot;:25},{&quot;username&quot;:&quot;Player10&quot;,&quot;avatar&quot;:&quot;\/assets\/S.png&quot;,&quot;wagered&quot;:3500,&quot;prize&quot;:20}],&quot;prize&quot;:5000,&quot;end_date&quot;:&quot;2025-08-31T23:59:59.000000Z&quot;,&quot;enabled&quot;:true,&quot;history&quot;:[{&quot;id&quot;:9,&quot;prize&quot;:5000,&quot;date&quot;:&quot;2025-08-14&quot;,&quot;end_date&quot;:&quot;2025-08-21&quot;,&quot;entries_count&quot;:10,&quot;entries&quot;:[{&quot;uid&quot;:&quot;66a5f756a6896768fcaca0b8&quot;,&quot;username&quot;:&quot;Pau***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;,&quot;wagered&quot;:&quot;42477.00&quot;,&quot;tickets&quot;:424,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:1},{&quot;uid&quot;:&quot;68905fad982aaf8fbbcd2ab8&quot;,&quot;username&quot;:&quot;alv***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;,&quot;wagered&quot;:&quot;36547.00&quot;,&quot;tickets&quot;:365,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:2},{&quot;uid&quot;:&quot;66542577ebe6a77815a1db51&quot;,&quot;username&quot;:&quot;Drx***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/cashcrew.png&quot;,&quot;wagered&quot;:&quot;23685.00&quot;,&quot;tickets&quot;:236,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:3},{&quot;uid&quot;:&quot;66fc2fdc4deba8e035567442&quot;,&quot;username&quot;:&quot;Thi***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dawnofkings.png&quot;,&quot;wagered&quot;:&quot;196843.00&quot;,&quot;tickets&quot;:1968,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:4},{&quot;uid&quot;:&quot;66ca2df92a6ddd3b162bdf41&quot;,&quot;username&quot;:&quot;Not***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;,&quot;wagered&quot;:&quot;23910.00&quot;,&quot;tickets&quot;:239,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:5},{&quot;uid&quot;:&quot;6826d5f6996021971ac90eaf&quot;,&quot;username&quot;:&quot;noe***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;,&quot;wagered&quot;:&quot;63393.00&quot;,&quot;tickets&quot;:633,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:6},{&quot;uid&quot;:&quot;66ce8577067a6ca8a45f2586&quot;,&quot;username&quot;:&quot;iPA***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;,&quot;wagered&quot;:&quot;7179.00&quot;,&quot;tickets&quot;:71,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:7},{&quot;uid&quot;:&quot;67a29f25e4be3d3759e3383f&quot;,&quot;username&quot;:&quot;pro***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/punkrocker2.png&quot;,&quot;wagered&quot;:&quot;34419.00&quot;,&quot;tickets&quot;:344,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:8},{&quot;uid&quot;:&quot;67bcfd2262974bd0c77ebd05&quot;,&quot;username&quot;:&quot;BLK***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;,&quot;wagered&quot;:&quot;23021.00&quot;,&quot;tickets&quot;:230,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:9},{&quot;uid&quot;:&quot;667f1ef89da2d15a7f5bfd1a&quot;,&quot;username&quot;:&quot;Smi***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;,&quot;wagered&quot;:&quot;5599.00&quot;,&quot;tickets&quot;:55,&quot;prize&quot;:&quot;500 RC&quot;,&quot;position&quot;:10}],&quot;total_prize&quot;:5000,&quot;random_org_data&quot;:{&quot;id&quot;:1755820803,&quot;result&quot;:{&quot;cost&quot;:0.001,&quot;random&quot;:{&quot;n&quot;:10,&quot;max&quot;:5316,&quot;min&quot;:1,&quot;base&quot;:10,&quot;data&quot;:[2954,3372,4173,336,1458,2371,4837,3522,4293,84],&quot;method&quot;:&quot;generateSignedIntegers&quot;,&quot;license&quot;:{&quot;text&quot;:&quot;Random values licensed for virtual item gambling only&quot;,&quot;type&quot;:&quot;gambling-virtual&quot;,&quot;infoUrl&quot;:null},&quot;userData&quot;:null,&quot;ticketData&quot;:null,&quot;licenseData&quot;:null,&quot;replacement&quot;:false,&quot;hashedApiKey&quot;:&quot;ffyNANk+wh4okscCSSO7pgVY\/8MrZr45TnKWHK3LV4RxZuFxUPE337YfK7Xyq2KWfAfVE9gGNHXD0nxUEir1LA==&quot;,&quot;serialNumber&quot;:41878,&quot;completionTime&quot;:&quot;2025-08-22 00:00:03Z&quot;,&quot;pregeneratedRandomization&quot;:null},&quot;bitsLeft&quot;:999999876,&quot;bitsUsed&quot;:124,&quot;signature&quot;:&quot;A5mmhBV6tMXnsmCfdQ76qz3Nm1967akA2wDPgh0BpB3eV7a6TPLtNpxbAU9mAY85KS6H+i6MeTS6CTwW+qg9jY\/WgrzhfI0iBk2DKZ\/NeB+Af71DeBSXXNG0ae9U96OA1JEIm7K6Y831KaCrrF7Z\/fHaaC4VgcS2KKRbMLbNyuRhtljFj2kLLJRkYzeKEVv5i5ONtsFUGlFq99irqMSNgho8P5lbfWsYvIE2\/jNHq6b5MUwhvrRRX32kMmHakchnlYNYE3O2Ed\/z\/Mu0UnzY82c5utar4J9MPJUlgVZupkjA1vBz1mBqx85\/lyIVxDVXeBuMXXsVeIQ2q4P0HFZp3fQaeogS9dEzzUWhARXw7GapI8uyMkesqKukpr95walPqbGK+ELFOxYi58N98JKpUSVCGTU\/2CUYtJitBuBDqNIVQBK31x\/KnWmiqTDZdzV8oOaf+1NWq3AzbMB4H+pNMzqArpdyZNfnCtvyBM\/onbZpZVRIwJQgfKWszMa+rR\/B3hRpMl5NiPUKpVcmjqDBmsJL6smFZQVpEodRfegpAUkIjX3ukMXPwtUj9Rc0yKOq3HeKQNOPe7aSY7V6YVgebHtJO4HonIuqExRy1WNRIwnPAqqeLpQG3c9muZdrIAK6pXl02g911MevNBuhWkUnun17bcO8WQbfwhVHaNTj3xw=&quot;,&quot;requestsLeft&quot;:999999,&quot;advisoryDelay&quot;:830},&quot;jsonrpc&quot;:&quot;2.0&quot;}}],&quot;raffle_winners&quot;:[]},&quot;stake_raffle&quot;:{&quot;leaderboard&quot;:[{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;wagered&quot;:307965,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:3079,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildpanda.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;wagered&quot;:235309,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2353,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;One***&quot;,&quot;wagered&quot;:116833,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1168,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist2.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CAY***&quot;,&quot;wagered&quot;:29161,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:291,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Raz***&quot;,&quot;wagered&quot;:19069,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:190,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/razorshark.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Aqu***&quot;,&quot;wagered&quot;:17236,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:172,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/therave.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Woo***&quot;,&quot;wagered&quot;:15687,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:156,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;The***&quot;,&quot;wagered&quot;:15419,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:154,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/deadwood.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Qui***&quot;,&quot;wagered&quot;:15300,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:153,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/therave.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;fea***&quot;,&quot;wagered&quot;:15072,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:150,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Kin***&quot;,&quot;wagered&quot;:13497,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:134,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CZE***&quot;,&quot;wagered&quot;:13012,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:130,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Jai***&quot;,&quot;wagered&quot;:12551,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:125,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/shadows.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Kid***&quot;,&quot;wagered&quot;:10950,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:109,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist2.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Mav***&quot;,&quot;wagered&quot;:9626,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:96,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;mah***&quot;,&quot;wagered&quot;:7373,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:73,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Gra***&quot;,&quot;wagered&quot;:7198,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:71,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Sis***&quot;,&quot;wagered&quot;:5737,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:57,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Nic***&quot;,&quot;wagered&quot;:5576,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:55,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildpanda.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Bea***&quot;,&quot;wagered&quot;:5218,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:52,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;}],&quot;prize&quot;:1000,&quot;end_date&quot;:&quot;2025-09-14T23:59:59.000000Z&quot;,&quot;enabled&quot;:true,&quot;history&quot;:[{&quot;id&quot;:11,&quot;prize&quot;:1000,&quot;date&quot;:&quot;2025-08-24&quot;,&quot;end_date&quot;:&quot;2025-08-31&quot;,&quot;entries_count&quot;:10,&quot;entries&quot;:[{&quot;uid&quot;:&quot;odge85uir&quot;,&quot;username&quot;:&quot;odg***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;,&quot;wagered&quot;:&quot;21938.02&quot;,&quot;tickets&quot;:219,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:1},{&quot;uid&quot;:&quot;LimeGreen6969&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;,&quot;wagered&quot;:&quot;2040641.05&quot;,&quot;tickets&quot;:20406,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:2},{&quot;uid&quot;:&quot;cluelessdee43&quot;,&quot;username&quot;:&quot;clu***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;,&quot;wagered&quot;:&quot;17884.78&quot;,&quot;tickets&quot;:178,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:3},{&quot;uid&quot;:&quot;GGSL1266&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;avatar&quot;:&quot;https:\/\/fls-9f9bd085-2313-4a74-8d01-15e5668a38f6.laravel.cloud\/avatars\/uploaded\/689a41b72db5c.webp&quot;,&quot;wagered&quot;:&quot;346936.41&quot;,&quot;tickets&quot;:3469,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:4},{&quot;uid&quot;:&quot;SwoopTheWin&quot;,&quot;username&quot;:&quot;Swo***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;,&quot;wagered&quot;:&quot;67396.81&quot;,&quot;tickets&quot;:673,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:5},{&quot;uid&quot;:&quot;Mansur389&quot;,&quot;username&quot;:&quot;Man***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/doghouse.png&quot;,&quot;wagered&quot;:&quot;518760.05&quot;,&quot;tickets&quot;:5187,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:6},{&quot;uid&quot;:&quot;NickIsThe179&quot;,&quot;username&quot;:&quot;Nic***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bonusbunny.png&quot;,&quot;wagered&quot;:&quot;11477.97&quot;,&quot;tickets&quot;:114,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:7},{&quot;uid&quot;:&quot;frizzledrizze1&quot;,&quot;username&quot;:&quot;fri***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;,&quot;wagered&quot;:&quot;175802.74&quot;,&quot;tickets&quot;:1758,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:8},{&quot;uid&quot;:&quot;dunkzkrlhadz&quot;,&quot;username&quot;:&quot;dun***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dawnofkings.png&quot;,&quot;wagered&quot;:&quot;56649.19&quot;,&quot;tickets&quot;:566,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:9},{&quot;uid&quot;:&quot;QuietGambleIRL&quot;,&quot;username&quot;:&quot;Qui***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;,&quot;wagered&quot;:&quot;96549.96&quot;,&quot;tickets&quot;:965,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:10}],&quot;total_prize&quot;:1000,&quot;random_org_data&quot;:{&quot;id&quot;:1756698158,&quot;result&quot;:{&quot;cost&quot;:0.001,&quot;random&quot;:{&quot;n&quot;:10,&quot;max&quot;:61358,&quot;min&quot;:1,&quot;base&quot;:10,&quot;data&quot;:[54330,13746,56213,9998,47993,22195,5114,35861,49388,22190],&quot;method&quot;:&quot;generateSignedIntegers&quot;,&quot;license&quot;:{&quot;text&quot;:&quot;Random values licensed for virtual item gambling only&quot;,&quot;type&quot;:&quot;gambling-virtual&quot;,&quot;infoUrl&quot;:null},&quot;userData&quot;:null,&quot;ticketData&quot;:null,&quot;licenseData&quot;:null,&quot;replacement&quot;:false,&quot;hashedApiKey&quot;:&quot;ffyNANk+wh4okscCSSO7pgVY\/8MrZr45TnKWHK3LV4RxZuFxUPE337YfK7Xyq2KWfAfVE9gGNHXD0nxUEir1LA==&quot;,&quot;serialNumber&quot;:51583,&quot;completionTime&quot;:&quot;2025-09-01 03:42:46Z&quot;,&quot;pregeneratedRandomization&quot;:null},&quot;bitsLeft&quot;:999997233,&quot;bitsUsed&quot;:159,&quot;signature&quot;:&quot;PECDGQYkloPwk4mMfx6uZqanXL0jYx5S3\/buZbBlvtfAkxj9wLVkGSkcawVq56DnlCALX91g6C+XLEccVhw9mPPAT9vQ9bfuDj2MkspmapZwYYbhwwMTfip\/VN2NzOn1psb1Txpp6h7HTJX6YmlIfmg7ONb4GJxl5yWzwIFH\/yWHdciwOPioAcFaDPwFsaMSPyDP9NCFHb0Lpwu0GafsieaNW2IalIkmdF\/Uy3hnGJm5C5OFYTKPY+f+jYJfO9U0f7wMZOqrNAtj9Jl2OCU71m9894ylETBSLCjHUOdHbk5ms5+Wz28I0mCktMT728Geu4zUyHmbC7SwE9CfESuWDc4BZQtcyo7+T\/nkFsKrnkZRpAFUCd\/D31gRfH2kNByyao0TH2HI+WahbpdaozpkAZCJ0NJs679\/FoAPiXUdzQJVCvOJY2YHKc0nHFukm4F6rZlcq0+gV8mqaAoMo40GN31ug9KtheWv8igYoXeZkngvCZeUJsWZUfJexDCE5uGtryyCFoE5ZjgcaIDoLrPbZAW4ddBVkB0juZBAeOXdxRzpfgzCP7pPcYcb3gKeS455+u57QEw+MbGpgTI+uWq8L\/YTD6ee\/ZWzLQiUwHxCeUx4vd0FtLYo+g2DwTvHALQO6kXsl0dJDGnB4MHWO35gNnmneta621pZtfGhuuVidMw=&quot;,&quot;requestsLeft&quot;:999891,&quot;advisoryDelay&quot;:350},&quot;jsonrpc&quot;:&quot;2.0&quot;}},{&quot;id&quot;:4,&quot;prize&quot;:1000,&quot;date&quot;:&quot;2025-08-09&quot;,&quot;end_date&quot;:&quot;2025-08-16&quot;,&quot;entries_count&quot;:10,&quot;entries&quot;:[{&quot;uid&quot;:&quot;LimeGreen6969&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;,&quot;wagered&quot;:&quot;1056853.02&quot;,&quot;tickets&quot;:10568,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:1},{&quot;uid&quot;:&quot;Bootysackk12&quot;,&quot;username&quot;:&quot;Boo***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;,&quot;wagered&quot;:&quot;88499.56&quot;,&quot;tickets&quot;:884,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:2},{&quot;uid&quot;:&quot;Mansur389&quot;,&quot;username&quot;:&quot;Man***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/doghouse.png&quot;,&quot;wagered&quot;:&quot;533580.79&quot;,&quot;tickets&quot;:5335,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:3},{&quot;uid&quot;:&quot;toruber10&quot;,&quot;username&quot;:&quot;tor***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;,&quot;wagered&quot;:&quot;87184.64&quot;,&quot;tickets&quot;:871,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:4},{&quot;uid&quot;:&quot;AnitaMaxiPad&quot;,&quot;username&quot;:&quot;Ani***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fireportals.png&quot;,&quot;wagered&quot;:&quot;244340.24&quot;,&quot;tickets&quot;:2443,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:5},{&quot;uid&quot;:&quot;amriraj29&quot;,&quot;username&quot;:&quot;amr***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/shadows.png&quot;,&quot;wagered&quot;:&quot;306015.36&quot;,&quot;tickets&quot;:3060,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:6},{&quot;uid&quot;:&quot;Littouju&quot;,&quot;username&quot;:&quot;Lit***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;,&quot;wagered&quot;:&quot;217465.50&quot;,&quot;tickets&quot;:2174,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:7},{&quot;uid&quot;:&quot;123talacho&quot;,&quot;username&quot;:&quot;123***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fireportals.png&quot;,&quot;wagered&quot;:&quot;20192.60&quot;,&quot;tickets&quot;:201,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:8},{&quot;uid&quot;:&quot;Brandt90&quot;,&quot;username&quot;:&quot;Bra***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;,&quot;wagered&quot;:&quot;15629.94&quot;,&quot;tickets&quot;:156,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:9},{&quot;uid&quot;:&quot;casperkyza&quot;,&quot;username&quot;:&quot;cas***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;,&quot;wagered&quot;:&quot;249511.41&quot;,&quot;tickets&quot;:2495,&quot;prize&quot;:&quot;$100&quot;,&quot;position&quot;:10}],&quot;total_prize&quot;:1000,&quot;random_org_data&quot;:{&quot;id&quot;:1755383128,&quot;result&quot;:{&quot;cost&quot;:0.001,&quot;random&quot;:{&quot;n&quot;:10,&quot;max&quot;:60869,&quot;min&quot;:1,&quot;base&quot;:10,&quot;data&quot;:[6132,38262,1259,39785,28039,21792,12055,39384,56457,27400],&quot;method&quot;:&quot;generateSignedIntegers&quot;,&quot;license&quot;:{&quot;text&quot;:&quot;Random values licensed for virtual item gambling only&quot;,&quot;type&quot;:&quot;gambling-virtual&quot;,&quot;infoUrl&quot;:null},&quot;userData&quot;:null,&quot;ticketData&quot;:null,&quot;licenseData&quot;:null,&quot;replacement&quot;:false,&quot;hashedApiKey&quot;:&quot;ffyNANk+wh4okscCSSO7pgVY\/8MrZr45TnKWHK3LV4RxZuFxUPE337YfK7Xyq2KWfAfVE9gGNHXD0nxUEir1LA==&quot;,&quot;serialNumber&quot;:37280,&quot;completionTime&quot;:&quot;2025-08-16 22:25:29Z&quot;,&quot;pregeneratedRandomization&quot;:null},&quot;bitsLeft&quot;:999757973,&quot;bitsUsed&quot;:159,&quot;signature&quot;:&quot;69\/Z3TSfF\/JZqYGrbSxeU+lhh92+g7O7dH78Kd\/q1uxXBdLCQUIDEOktN7TkTrkPbVmsLwwXoy7pW3Qm1PkECizOxON2D1Yy0zf0QGrBVOGREi0gWdR+OAV8WhyNtro24R9cHmFgDeclqf1WCWvT6nRz1+0tj3jBAfC3t+MuCho3HnJK53i4R3VTiVMSFt5HfnjoU\/8ALbYhN\/UOnTXAZ06nUC1yqdTDdDLear9inoFQjdc\/pikrOqTee9GCYyy1qSAKfrg+36\/w4yH2LfIU0ncLXmO\/cPwvc0GE5MFK7ma6fOTLeccmkECdP5Yv9Zi\/2jf\/kb9yQKxZuU1Z1G5wBunyO6OnAH+GocFFIofwEejefcfndcdRB9d0ld7bwjUJ9NtaXypAGRIki\/HLtchCWD\/cWWD01nSawrUD1z8nbXzgS0s8V4NOumjP2R+a\/3522cAu8mIEk9t5t0r+5vlkjtrfKeMwBRySob6ARurSqfDsmA6rea5aHKvKLoMafJHItiuP6VDf6DKiBLwR49Srlxha+nNlQ2NEAoyWeYfCN6wTWmN00MQgKElambg7KVTIxgJColBJ7YAnyWPgK44OhJa+f5ZZZLDjTTPiDWaGc3Dwc2cHa+Mq0kGCogdBxtFyl1U\/JYu\/11SlaX\/r1xlsb1sp+gWKYshJC9BtmeJ2hBY=&quot;,&quot;requestsLeft&quot;:999497,&quot;advisoryDelay&quot;:610},&quot;jsonrpc&quot;:&quot;2.0&quot;}}],&quot;raffle_winners&quot;:[]},&quot;stake_exclusives&quot;:{&quot;leaderboard&quot;:[{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;One***&quot;,&quot;wagered&quot;:120409,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:5000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ironbank.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;wagered&quot;:8540,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;wagered&quot;:7137,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1000,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/starlight.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Not***&quot;,&quot;wagered&quot;:3785,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:750,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/punkrocker2.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Ras***&quot;,&quot;wagered&quot;:2814,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:500,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dwarf.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;The***&quot;,&quot;wagered&quot;:2545,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:300,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CAY***&quot;,&quot;wagered&quot;:2271,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:200,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fist1.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Pav***&quot;,&quot;wagered&quot;:1690,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:125,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;CZE***&quot;,&quot;wagered&quot;:1504,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:75,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/lebandit.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Sis***&quot;,&quot;wagered&quot;:1421,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/thecrypt.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Aqu***&quot;,&quot;wagered&quot;:1153,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Vlo***&quot;,&quot;wagered&quot;:788,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Cry***&quot;,&quot;wagered&quot;:735,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gaelic.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Bea***&quot;,&quot;wagered&quot;:725,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fireportals.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Luc***&quot;,&quot;wagered&quot;:625,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/ripcity.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Cay***&quot;,&quot;wagered&quot;:558,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Woo***&quot;,&quot;wagered&quot;:485,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Nib***&quot;,&quot;wagered&quot;:419,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/gates.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;art***&quot;,&quot;wagered&quot;:394,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/hoarder.png&quot;},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Bra***&quot;,&quot;wagered&quot;:376,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:0,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bruteforce.png&quot;}],&quot;prize&quot;:10000,&quot;end_date&quot;:&quot;2025-09-30T23:59:59.000000Z&quot;,&quot;enabled&quot;:true,&quot;history&quot;:[{&quot;id&quot;:12,&quot;prize&quot;:10000,&quot;date&quot;:&quot;2025-08-01&quot;,&quot;end_date&quot;:&quot;2025-08-31&quot;,&quot;entries_count&quot;:10,&quot;entries&quot;:[{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;One***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/fireportals.png&quot;,&quot;wagered&quot;:160603.6,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:5000},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Lim***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/bigbass.png&quot;,&quot;wagered&quot;:115352.39,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:2000},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;fea***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;,&quot;wagered&quot;:89139.45,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:1000},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Loa***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/shadows.png&quot;,&quot;wagered&quot;:60058.02,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:750},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Mic***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/jokerbombs.png&quot;,&quot;wagered&quot;:54511.2,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:500},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;GGS***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/dawnofkings.png&quot;,&quot;wagered&quot;:53430.12,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:300},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Iso***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/doghouse.png&quot;,&quot;wagered&quot;:28010.97,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:200},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Ice***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;,&quot;wagered&quot;:26184.8,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:125},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Iva***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/xmasdrop.png&quot;,&quot;wagered&quot;:22217.9,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:75},{&quot;uid&quot;:&quot;&quot;,&quot;username&quot;:&quot;Uhm***&quot;,&quot;avatar&quot;:&quot;\/assets\/avatars\/default\/wildwest.png&quot;,&quot;wagered&quot;:18624.74,&quot;currency&quot;:&quot;USD&quot;,&quot;prize&quot;:50}],&quot;total_prize&quot;:10000}]}},&quot;url&quot;:&quot;\/leaderboard?l=stake-raffle&quot;,&quot;version&quot;:&quot;5ece34ec2e45d8575f3a75869c8a7e9e&quot;,&quot;clearHistory&quot;:false,&quot;encryptHistory&quot;:false}" >  <  / div >
     <  / body >
    <  / html >