!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.SDK = t() : e.SDK = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {exports: {}, id: r, loaded: !1};
            return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";
        n(153), e.exports = n(345)
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            "object" === ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) ? (this.callFunc = e.callFunc || null, this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date, this.timetag = +this.time
        }

        var s = n(15), i = r(s), a = n(46), c = n(100), u = n(139), l = n(111);
        n(181);
        var m = n(44), d = m.getGlobal(), f = /\s+/;
        m.shouldDisplayInstallFlashHint = function () {
            var e = a.name.toLowerCase();
            if ("ie" === e) {
                var t = +a.version || 0;
                return t = Math.floor(t), 7 === t && !c.Transport.flashsocket.check()
            }
            return !1
        }, m.deduplicate = function (e) {
            var t = [];
            return e.forEach(function (e) {
                t.indexOf(e) === -1 && t.push(e)
            }), t
        }, m.capFirstLetter = function (e) {
            return e ? (e = "" + e, e.slice(0, 1).toUpperCase() + e.slice(1)) : ""
        }, m.guid = function () {
            var e = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return function () {
                return e() + e() + e() + e() + e() + e() + e() + e()
            }
        }(), m.extend = function (e, t, n) {
            for (var r in t) "undefined" != typeof e[r] && n !== !0 || (e[r] = t[r])
        }, m.filterObj = function (e, t) {
            var n = {};
            return m.isString(t) && (t = t.split(f)), t.forEach(function (t) {
                e.hasOwnProperty(t) && (n[t] = e[t])
            }), n
        }, m.simpleClone = function (e) {
            return JSON.parse(JSON.stringify(e))
        }, m.copy = function (e, t) {
            return t = t || {}, e ? (Object.keys(e).forEach(function (n) {
                m.exist(e[n]) && (t[n] = e[n])
            }), t) : t
        }, m.copyWithNull = function (e, t) {
            return t = t || {}, e ? (Object.keys(e).forEach(function (n) {
                (m.exist(e[n]) || m.isnull(e[n])) && (t[n] = e[n])
            }), t) : t
        }, m.findObjIndexInArray = function (e, t) {
            e = e || [];
            var n = t.keyPath || "id", r = -1;
            return e.some(function (e, o) {
                if (l(e, n) === t.value) return r = o, !0
            }), r
        }, m.findObjInArray = function (e, t) {
            var n = m.findObjIndexInArray(e, t);
            return n === -1 ? null : e[n]
        }, m.mergeObjArray = function () {
            var e = [], t = [].slice.call(arguments, 0, -1), n = arguments[arguments.length - 1];
            m.isArray(n) && (t.push(n), n = {});
            var r = n.keyPath = n.keyPath || "id";
            for (n.sortPath = n.sortPath || r; !e.length && t.length;) e = t.shift() || [], e = e.slice(0);
            var o;
            return t.forEach(function (t) {
                t && t.forEach(function (t) {
                    o = m.findObjIndexInArray(e, {
                        keyPath: r,
                        value: l(t, r)
                    }), o !== -1 ? e[o] = m.merge({}, e[o], t) : e.push(t)
                })
            }), n.notSort || (e = m.sortObjArray(e, n)), e
        }, m.cutObjArray = function (e) {
            var t = e.slice(0), n = arguments.length, r = [].slice.call(arguments, 1, n - 1), o = arguments[n - 1];
            m.isObject(o) || (r.push(o), o = {});
            var s, i = o.keyPath = o.keyPath || "id";
            return r.forEach(function (e) {
                m.isArray(e) || (e = [e]), e.forEach(function (e) {
                    e && (o.value = l(e, i), s = m.findObjIndexInArray(t, o), s !== -1 && t.splice(s, 1))
                })
            }), t
        }, m.sortObjArray = function (e, t) {
            t = t || {};
            var n = t.sortPath || "id";
            u.insensitive = !!t.insensitive;
            var r, o, s, i = !!t.desc;
            return s = m.isFunction(t.compare) ? t.compare : function (e, t) {
                return r = l(e, n), o = l(t, n), i ? u(o, r) : u(r, o)
            }, e.sort(s)
        }, m.emptyFunc = function () {
        }, m.isEmptyFunc = function (e) {
            return e === m.emptyFunc
        }, m.notEmptyFunc = function (e) {
            return e !== m.emptyFunc
        }, m.splice = function (e, t, n) {
            return [].splice.call(e, t, n)
        }, m.reshape2d = function (e, t) {
            if (Array.isArray(e)) {
                m.verifyParamType("type", t, "number", "util::reshape2d");
                var n = e.length;
                if (n <= t) return [e];
                for (var r = Math.ceil(n / t), o = [], s = 0; s < r; s++) o.push(e.slice(s * t, (s + 1) * t));
                return o
            }
            return e
        }, m.flatten2d = function (e) {
            if (Array.isArray(e)) {
                var t = [];
                return e.forEach(function (e) {
                    t = t.concat(e)
                }), t
            }
            return e
        }, m.dropArrayDuplicates = function (e) {
            if (Array.isArray(e)) {
                for (var t = {}, n = []; e.length > 0;) {
                    var r = e.shift();
                    t[r] = !0
                }
                for (var o in t) t[o] === !0 && n.push(o);
                return n
            }
            return e
        }, m.onError = function (e) {
            throw new o(e)
        }, m.verifyParamPresent = function (e, t, n, r) {
            n = n || "";
            var o = !1;
            switch (m.typeOf(t)) {
                case"undefined":
                case"null":
                    o = !0;
                    break;
                case"string":
                    "" === t && (o = !0);
                    break;
                case"object":
                    Object.keys(t).length || (o = !0);
                    break;
                case"array":
                    t.length ? t.some(function (e) {
                        if (m.notexist(e)) return o = !0, !0
                    }) : o = !0
            }
            o && m.onParamAbsent(n + e, r)
        }, m.onParamAbsent = function (e, t) {
            m.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
        }, m.verifyParamAbsent = function (e, t, n, r) {
            n = n || "", void 0 !== t && m.onParamPresent(n + e, r)
        }, m.onParamPresent = function (e, t) {
            m.onParamError("多余的参数 " + e, t)
        }, m.verifyParamType = function (e, t, n, r) {
            var o = m.typeOf(t).toLowerCase();
            m.isArray(n) || (n = [n]), n = n.map(function (e) {
                return e.toLowerCase()
            });
            var s = !0;
            switch (n.indexOf(o) === -1 && (s = !1), o) {
                case"number":
                    isNaN(t) && (s = !1)
            }
            s || m.onParamInvalidType(e, n, "", r)
        }, m.onParamInvalidType = function (e, t, n, r) {
            n = n || "", m.isArray(t) ? (t = t.map(function (e) {
                return '"' + e + '"'
            }), t = t.join(", ")) : t = '"' + t + '"', m.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]", r)
        }, m.verifyParamValid = function (e, t, n, r) {
            m.isArray(n) || (n = [n]), n.indexOf(t) === -1 && m.onParamInvalidValue(e, n, r)
        }, m.onParamInvalidValue = function (e, t, n) {
            m.isArray(t) || (t = [t]), t = t.map(function (e) {
                return '"' + e + '"'
            }), m.isArray(t) && (t = t.join(", ")), m.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(t) + "]", n)
        }, m.verifyParamMin = function (e, t, n, r) {
            t < n && m.onParamError("参数" + e + "的值不能小于" + n, r)
        }, m.verifyParamMax = function (e, t, n, r) {
            t > n && m.onParamError("参数" + e + "的值不能大于" + n, r)
        }, m.verifyArrayMax = function (e, t, n, r) {
            t.length > n && m.onParamError("参数" + e + "的长度不能大于" + n, r)
        }, m.verifyEmail = function () {
            var e = /^\S+@\S+$/;
            return function (t, n, r) {
                e.test(n) || m.onParamError("参数" + t + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", r)
            }
        }(), m.verifyTel = function () {
            var e = /^[+\-()\d]+$/;
            return function (t, n, r) {
                e.test(n) || m.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", r)
            }
        }(), m.verifyBirth = function () {
            var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            return function (t, n, r) {
                e.test(n) || m.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', r)
            }
        }(), m.onParamError = function (e, t) {
            m.onError({message: e, callFunc: t})
        }, m.verifyOptions = function (e, t, n, r, o) {
            if (e = e || {}, t && (m.isString(t) && (t = t.split(f)), m.isArray(t))) {
                "boolean" != typeof n && (o = n || null, n = !0, r = "");
                var s = n ? m.verifyParamPresent : m.verifyParamAbsent;
                t.forEach(function (t) {
                    s.call(m, t, e[t], r, o)
                })
            }
            return e
        }, m.verifyParamAtLeastPresentOne = function (e, t, n) {
            if (t && (m.isString(t) && (t = t.split(f)), m.isArray(t))) {
                var r = t.some(function (t) {
                    return m.exist(e[t])
                });
                r || m.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", n)
            }
        }, m.verifyParamPresentJustOne = function (e, t, n) {
            if (t && (m.isString(t) && (t = t.split(f)), m.isArray(t))) {
                var r = t.reduce(function (t, n) {
                    return m.exist(e[n]) && t++, t
                }, 0);
                1 !== r && m.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", n)
            }
        }, m.verifyBooleanWithDefault = function (e, t, n, r, o) {
            m.undef(n) && (n = !0), f.test(t) && (t = t.split(f)), m.isArray(t) ? t.forEach(function (t) {
                m.verifyBooleanWithDefault(e, t, n, r, o)
            }) : "undefined" == typeof e[t] ? e[t] = n : m.isBoolean(e[t]) || m.onParamInvalidType(t, "boolean", r, o)
        }, m.verifyFileInput = function (e, t) {
            return m.verifyParamPresent("fileInput", e, "", t), m.isString(e) && (e = document.getElementById(e), e || m.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() && "file" === e.type.toLowerCase() || m.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" + e.tagName + ", filetype:" + e.type, t), e
        }, m.verifyFileType = function (e, t) {
            m.verifyParamValid("type", e, m.validFileTypes, t)
        }, m.verifyCallback = function (e, t, n) {
            f.test(t) && (t = t.split(f)), m.isArray(t) ? t.forEach(function (t) {
                m.verifyCallback(e, t, n)
            }) : e[t] ? m.isFunction(e[t]) || m.onParamInvalidType(t, "function", "", n) : e[t] = m.emptyFunc
        }, m.verifyFileUploadCallback = function (e, t) {
            m.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
        }, m.validFileTypes = ["image", "audio", "video", "file"], m.validFileExts = {
            image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
            audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
            video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
        }, m.filterFiles = function (e, t) {
            t = t.toLowerCase();
            var n, r, o, s = "file" === t, i = [];
            return [].forEach.call(e, function (e) {
                if (s) i.push(e); else if (n = e.name.slice(e.name.lastIndexOf(".") + 1), r = e.type.split("/"), r[0] && r[1]) {
                    o = r[0].toLowerCase();
                    var a = !1;
                    a = o === t || m.validFileExts[t].indexOf(n) !== -1, a && i.push(e)
                }
            }), i
        };
        var p = m.supportFormData = m.notundef(d.FormData);
        m.getFileName = function () {
            return function (e) {
                return e = m.verifyFileInput(e), p ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
            }
        }(), m.getFileInfo = function () {
            var e = {ppt: 1, pptx: 2, pdf: 3};
            return function (t) {
                t = m.verifyFileInput(t);
                var n = t.files[0], r = {};
                return p && (r.name = n.name, r.size = n.size, r.type = n.name.match(/\.(\w+)$/), r.type = r.type && r.type[1].toLowerCase(), r.transcodeType = e[r.type] || 0), r
            }
        }(), m.sizeText = function () {
            var e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"];
            return function (t) {
                var n, r = 0;
                do {
                    t = Math.floor(100 * t) / 100;
                    var o = e[r];
                    n = t + o, t /= 1024, r++
                } while (t > 1);
                return n
            }
        }(), m.promises2cmds = function (e) {
            return e.map(function (e) {
                return e.cmd
            })
        }, m.objs2accounts = function (e) {
            return e.map(function (e) {
                return e.account
            })
        }, m.teams2ids = function (e) {
            return e.map(function (e) {
                return e.teamId
            })
        }, m.objs2ids = function (e) {
            return e.map(function (e) {
                return e.id
            })
        }, m.getMaxUpdateTime = function (e) {
            var t = e.map(function (e) {
                return +e.updateTime
            });
            return Math.max.apply(Math, t)
        }, m.genCheckUniqueFunc = function (e, t) {
            return e = e || "id", t = t || 1e3, function (t) {
                this.uniqueSet = this.uniqueSet || {};
                var n = this.uniqueSet[e] = this.uniqueSet[e] || new Set, r = t[e];
                return !n.has(r) && (n.add(r), !0)
            }
        }, m.fillPropertyWithDefault = function (e, t, n) {
            return !!m.undef(e[t]) && (e[t] = n, !0)
        }, e.exports = m
    }, function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (e, t, n) {
        var r = n(35)("wks"), o = n(22), s = n(2).Symbol, i = "function" == typeof s, a = e.exports = function (e) {
            return r[e] || (r[e] = i && s[e] || (i ? s : o)("Symbol." + e))
        };
        a.store = r
    }, function (e, t, n) {
        (function (t) {
            "use strict";
            var n = "'a8127541deb97f1499a6e47e6f8a199a894d782b", r = "a812754'", o = "5.0.0", s = "2.6.0.328",
                i = "3.9.0", a = "46", c = "1", u = 1, l = "https://lbs.netease.im/lbs/webconf.jsp",
                m = "roomserver.netease.im", d = "https://dr.netease.im/1.gif",
                f = "development" === t.env.NODE_ENV ? 6e3 : 42e3, p = {
                    info: {
                        hash: n,
                        shortHash: r,
                        version: o,
                        sdkVersion: a,
                        nrtcVersion: i,
                        nrtcSdkVersion: c,
                        protocolVersion: u
                    },
                    agentVersion: s,
                    lbsUrl: l,
                    roomserver: m,
                    connectTimeout: f,
                    xhrTimeout: f,
                    socketTimeout: f,
                    reconnectionDelay: 656.25,
                    reconnectionDelayMax: f,
                    reconnectionJitter: .1,
                    heartbeatInterval: 18e4,
                    cmdTimeout: f,
                    defaultReportUrl: d
                };
            p.formatSocketUrl = function (e) {
                var t = e.url, n = e.secure, r = n ? "https" : "http";
                return t.indexOf("http") === -1 ? r + "://" + t : t
            }, p.uploadUrl = "https://nos.netease.com", p.replaceUrl = "https://{bucket}.nosdn.127.net/{object}", p.downloadHost = "nos.netease.com", p.downloadUrl = "https://{bucket}.nosdn.127.net/{object}", p.httpsEnabled = !1, p.genUploadUrl = function (e) {
                return p.uploadUrl + "/" + e
            }, p.genDownloadUrl = function (e, t) {
                var n = p.replaceUrl;
                return /^http/.test(n) ? p.httpsEnabled && (n = n.replace("http", "https")) : n = p.httpsEnabled ? "https://" + n : "http://" + n, n.replace("{bucket}", e).replace("{object}", t)
            }, e.exports = p
        }).call(t, n(31))
    }, function (e, t, n) {
        (function (t, r) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */
            !function (t, n) {
                e.exports = n()
            }(this, function () {
                "use strict";

                function e(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }

                function o(e) {
                    return "function" == typeof e
                }

                function s(e) {
                    K = e
                }

                function i(e) {
                    G = e
                }

                function a() {
                    return function () {
                        return t.nextTick(d)
                    }
                }

                function c() {
                    return "undefined" != typeof z ? function () {
                        z(d)
                    } : m()
                }

                function u() {
                    var e = 0, t = new Z(d), n = document.createTextNode("");
                    return t.observe(n, {characterData: !0}), function () {
                        n.data = e = ++e % 2
                    }
                }

                function l() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = d, function () {
                        return e.port2.postMessage(0)
                    }
                }

                function m() {
                    var e = setTimeout;
                    return function () {
                        return e(d, 1)
                    }
                }

                function d() {
                    for (var e = 0; e < V; e += 2) {
                        var t = ne[e], n = ne[e + 1];
                        t(n), ne[e] = void 0, ne[e + 1] = void 0
                    }
                    V = 0
                }

                function f() {
                    try {
                        var e = n(96);
                        return z = e.runOnLoop || e.runOnContext, c()
                    } catch (t) {
                        return m()
                    }
                }

                function p(e, t) {
                    var n = arguments, r = this, o = new this.constructor(y);
                    void 0 === o[oe] && F(o);
                    var s = r._state;
                    return s ? !function () {
                        var e = n[s - 1];
                        G(function () {
                            return A(s, o, e, r._result)
                        })
                    }() : x(r, o, e, t), o
                }

                function g(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t) return e;
                    var n = new t(y);
                    return w(n, e), n
                }

                function y() {
                }

                function h() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function v() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function b(e) {
                    try {
                        return e.then
                    } catch (t) {
                        return ce.error = t, ce
                    }
                }

                function M(e, t, n, r) {
                    try {
                        e.call(t, n, r)
                    } catch (o) {
                        return o
                    }
                }

                function T(e, t, n) {
                    G(function (e) {
                        var r = !1, o = M(n, t, function (n) {
                            r || (r = !0, t !== n ? w(e, n) : O(e, n))
                        }, function (t) {
                            r || (r = !0, I(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                        !r && o && (r = !0, I(e, o))
                    }, e)
                }

                function k(e, t) {
                    t._state === ie ? O(e, t._result) : t._state === ae ? I(e, t._result) : x(t, void 0, function (t) {
                        return w(e, t)
                    }, function (t) {
                        return I(e, t)
                    })
                }

                function S(e, t, n) {
                    t.constructor === e.constructor && n === p && t.constructor.resolve === g ? k(e, t) : n === ce ? I(e, ce.error) : void 0 === n ? O(e, t) : o(n) ? T(e, t, n) : O(e, t)
                }

                function w(t, n) {
                    t === n ? I(t, h()) : e(n) ? S(t, n, b(n)) : O(t, n)
                }

                function C(e) {
                    e._onerror && e._onerror(e._result), _(e)
                }

                function O(e, t) {
                    e._state === se && (e._result = t, e._state = ie, 0 !== e._subscribers.length && G(_, e))
                }

                function I(e, t) {
                    e._state === se && (e._state = ae, e._result = t, G(C, e))
                }

                function x(e, t, n, r) {
                    var o = e._subscribers, s = o.length;
                    e._onerror = null, o[s] = t, o[s + ie] = n, o[s + ae] = r, 0 === s && e._state && G(_, e)
                }

                function _(e) {
                    var t = e._subscribers, n = e._state;
                    if (0 !== t.length) {
                        for (var r = void 0, o = void 0, s = e._result, i = 0; i < t.length; i += 3) r = t[i], o = t[i + n], r ? A(n, r, o, s) : o(s);
                        e._subscribers.length = 0
                    }
                }

                function P() {
                    this.error = null
                }

                function E(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        return ue.error = n, ue
                    }
                }

                function A(e, t, n, r) {
                    var s = o(n), i = void 0, a = void 0, c = void 0, u = void 0;
                    if (s) {
                        if (i = E(n, r), i === ue ? (u = !0, a = i.error, i = null) : c = !0, t === i) return void I(t, v())
                    } else i = r, c = !0;
                    t._state !== se || (s && c ? w(t, i) : u ? I(t, a) : e === ie ? O(t, i) : e === ae && I(t, i))
                }

                function j(e, t) {
                    try {
                        t(function (t) {
                            w(e, t)
                        }, function (t) {
                            I(e, t)
                        })
                    } catch (n) {
                        I(e, n)
                    }
                }

                function R() {
                    return le++
                }

                function F(e) {
                    e[oe] = le++, e._state = void 0, e._result = void 0, e._subscribers = []
                }

                function N(e, t) {
                    this._instanceConstructor = e, this.promise = new e(y), this.promise[oe] || F(this.promise), X(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? O(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && O(this.promise, this._result))) : I(this.promise, U())
                }

                function U() {
                    return new Error("Array Methods must be provided an Array")
                }

                function D(e) {
                    return new N(this, e).promise
                }

                function L(e) {
                    var t = this;
                    return new t(X(e) ? function (n, r) {
                        for (var o = e.length, s = 0; s < o; s++) t.resolve(e[s]).then(n, r)
                    } : function (e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    })
                }

                function B(e) {
                    var t = this, n = new t(y);
                    return I(n, e), n
                }

                function q() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function W() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function H(e) {
                    this[oe] = R(), this._result = this._state = void 0, this._subscribers = [], y !== e && ("function" != typeof e && q(), this instanceof H ? j(this, e) : W())
                }

                function J() {
                    var e = void 0;
                    if ("undefined" != typeof r) e = r; else if ("undefined" != typeof self) e = self; else try {
                        e = Function("return this")()
                    } catch (t) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = e.Promise;
                    if (n) {
                        var o = null;
                        try {
                            o = Object.prototype.toString.call(n.resolve())
                        } catch (t) {
                        }
                        if ("[object Promise]" === o && !n.cast) return
                    }
                    e.Promise = H
                }

                var $ = void 0;
                $ = Array.isArray ? Array.isArray : function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
                var X = $, V = 0, z = void 0, K = void 0, G = function (e, t) {
                        ne[V] = e, ne[V + 1] = t, V += 2, 2 === V && (K ? K(d) : re())
                    }, Y = "undefined" != typeof window ? window : void 0, Q = Y || {},
                    Z = Q.MutationObserver || Q.WebKitMutationObserver,
                    ee = "undefined" == typeof self && "undefined" != typeof t && "[object process]" === {}.toString.call(t),
                    te = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    ne = new Array(1e3), re = void 0;
                re = ee ? a() : Z ? u() : te ? l() : void 0 === Y ? f() : m();
                var oe = Math.random().toString(36).substring(16), se = void 0, ie = 1, ae = 2, ce = new P, ue = new P,
                    le = 0;
                return N.prototype._enumerate = function () {
                    for (var e = this.length, t = this._input, n = 0; this._state === se && n < e; n++) this._eachEntry(t[n], n)
                }, N.prototype._eachEntry = function (e, t) {
                    var n = this._instanceConstructor, r = n.resolve;
                    if (r === g) {
                        var o = b(e);
                        if (o === p && e._state !== se) this._settledAt(e._state, t, e._result); else if ("function" != typeof o) this._remaining--, this._result[t] = e; else if (n === H) {
                            var s = new n(y);
                            S(s, e, o), this._willSettleAt(s, t)
                        } else this._willSettleAt(new n(function (t) {
                            return t(e)
                        }), t)
                    } else this._willSettleAt(r(e), t)
                }, N.prototype._settledAt = function (e, t, n) {
                    var r = this.promise;
                    r._state === se && (this._remaining--, e === ae ? I(r, n) : this._result[t] = n), 0 === this._remaining && O(r, this._result)
                }, N.prototype._willSettleAt = function (e, t) {
                    var n = this;
                    x(e, void 0, function (e) {
                        return n._settledAt(ie, t, e)
                    }, function (e) {
                        return n._settledAt(ae, t, e)
                    })
                }, H.all = D, H.race = L, H.resolve = g, H.reject = B, H._setScheduler = s, H._setAsap = i, H._asap = G, H.prototype = {
                    constructor: H,
                    then: p,
                    "catch": function (e) {
                        return this.then(null, e)
                    }
                }, H.polyfill = J, H.Promise = H, H
            })
        }).call(t, n(31), function () {
            return this
        }())
    }, function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {
            return n.call(e, t)
        }
    }, , function (e, t, n) {
        e.exports = !n(19)(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (e, t, n) {
        var r = n(10), o = n(21);
        e.exports = n(8) ? function (e, t, n) {
            return r.f(e, t, o(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, function (e, t, n) {
        var r = n(14), o = n(51), s = n(37), i = Object.defineProperty;
        t.f = n(8) ? Object.defineProperty : function (e, t, n) {
            if (r(e), t = s(t, !0), r(n), o) try {
                return i(e, t, n)
            } catch (a) {
            }
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function (e, t) {
        var n = e.exports = {version: "2.5.3"};
        "number" == typeof __e && (__e = n)
    }, function (e, t) {
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }, function (e, t, n) {
        var r = n(58), o = n(32);
        e.exports = function (e) {
            return r(o(e))
        }
    }, function (e, t, n) {
        var r = n(12);
        e.exports = function (e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        t.__esModule = !0;
        var o = n(76), s = r(o), i = n(75), a = r(i),
            c = "function" == typeof a["default"] && "symbol" == typeof s["default"] ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof a["default"] && e.constructor === a["default"] && e !== a["default"].prototype ? "symbol" : typeof e
            };
        t["default"] = "function" == typeof a["default"] && "symbol" === c(s["default"]) ? function (e) {
            return "undefined" == typeof e ? "undefined" : c(e)
        } : function (e) {
            return e && "function" == typeof a["default"] && e.constructor === a["default"] && e !== a["default"].prototype ? "symbol" : "undefined" == typeof e ? "undefined" : c(e)
        }
    }, , , function (e, t, n) {
        var r = n(2), o = n(11), s = n(45), i = n(9), a = "prototype", c = function (e, t, n) {
            var u, l, m, d = e & c.F, f = e & c.G, p = e & c.S, g = e & c.P, y = e & c.B, h = e & c.W,
                v = f ? o : o[t] || (o[t] = {}), b = v[a], M = f ? r : p ? r[t] : (r[t] || {})[a];
            f && (n = t);
            for (u in n) l = !d && M && void 0 !== M[u], l && u in v || (m = l ? M[u] : n[u], v[u] = f && "function" != typeof M[u] ? n[u] : y && l ? s(m, r) : h && M[u] == m ? function (e) {
                var t = function (t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                };
                return t[a] = e[a], t
            }(m) : g && "function" == typeof m ? s(Function.call, m) : m, g && ((v.virtual || (v.virtual = {}))[u] = m, e & c.R && b && !b[u] && i(b, u, m)))
        };
        c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function (e, t) {
        e.exports = function (e) {
            try {
                return !!e()
            } catch (t) {
                return !0
            }
        }
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        function o(e, t, n) {
            this.fn = e, this.context = t, this.once = n || !1
        }

        function s() {
            this._events = new r, this._eventsCount = 0
        }

        var i = Object.prototype.hasOwnProperty, a = "~";
        Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (a = !1)), s.prototype.eventNames = function () {
            var e, t, n = [];
            if (0 === this._eventsCount) return n;
            for (t in e = this._events) i.call(e, t) && n.push(a ? t.slice(1) : t);
            return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
        }, s.prototype.listeners = function (e, t) {
            var n = a ? a + e : e, r = this._events[n];
            if (t) return !!r;
            if (!r) return [];
            if (r.fn) return [r.fn];
            for (var o = 0, s = r.length, i = new Array(s); o < s; o++) i[o] = r[o].fn;
            return i
        }, s.prototype.emit = function (e, t, n, r, o, s) {
            var i = a ? a + e : e;
            if (!this._events[i]) return !1;
            var c, u, l = this._events[i], m = arguments.length;
            if (l.fn) {
                switch (l.once && this.removeListener(e, l.fn, void 0, !0), m) {
                    case 1:
                        return l.fn.call(l.context), !0;
                    case 2:
                        return l.fn.call(l.context, t), !0;
                    case 3:
                        return l.fn.call(l.context, t, n), !0;
                    case 4:
                        return l.fn.call(l.context, t, n, r), !0;
                    case 5:
                        return l.fn.call(l.context, t, n, r, o), !0;
                    case 6:
                        return l.fn.call(l.context, t, n, r, o, s), !0
                }
                for (u = 1, c = new Array(m - 1); u < m; u++) c[u - 1] = arguments[u];
                l.fn.apply(l.context, c)
            } else {
                var d, f = l.length;
                for (u = 0; u < f; u++) switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), m) {
                    case 1:
                        l[u].fn.call(l[u].context);
                        break;
                    case 2:
                        l[u].fn.call(l[u].context, t);
                        break;
                    case 3:
                        l[u].fn.call(l[u].context, t, n);
                        break;
                    case 4:
                        l[u].fn.call(l[u].context, t, n, r);
                        break;
                    default:
                        if (!c) for (d = 1, c = new Array(m - 1); d < m; d++) c[d - 1] = arguments[d];
                        l[u].fn.apply(l[u].context, c)
                }
            }
            return !0
        }, s.prototype.on = function (e, t, n) {
            var r = new o(t, n || this), s = a ? a + e : e;
            return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this
        }, s.prototype.once = function (e, t, n) {
            var r = new o(t, n || this, !0), s = a ? a + e : e;
            return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this
        }, s.prototype.removeListener = function (e, t, n, o) {
            var s = a ? a + e : e;
            if (!this._events[s]) return this;
            if (!t) return 0 === --this._eventsCount ? this._events = new r : delete this._events[s], this;
            var i = this._events[s];
            if (i.fn) i.fn !== t || o && !i.once || n && i.context !== n || (0 === --this._eventsCount ? this._events = new r : delete this._events[s]); else {
                for (var c = 0, u = [], l = i.length; c < l; c++) (i[c].fn !== t || o && !i[c].once || n && i[c].context !== n) && u.push(i[c]);
                u.length ? this._events[s] = 1 === u.length ? u[0] : u : 0 === --this._eventsCount ? this._events = new r : delete this._events[s]
            }
            return this
        }, s.prototype.removeAllListeners = function (e) {
            var t;
            return e ? (t = a ? a + e : e, this._events[t] && (0 === --this._eventsCount ? this._events = new r : delete this._events[t])) : (this._events = new r, this._eventsCount = 0), this
        }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function () {
            return this
        }, s.prefixed = a, s.EventEmitter = s, e.exports = s
    }, function (e, t) {
        e.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, function (e, t) {
        var n = 0, r = Math.random();
        e.exports = function (e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            u.verifyOptions(e, "appKey account token", "protocol::IMProtocol"), u.verifyCallback(e, ["onconnect", "onerror", "onwillreconnect", "ondisconnect", "onloginportschange", "onmyinfo", "onblacklist", "onmutelist", "onfriends", "onusers", "onrobots", "onteams", "onsessions", "onroamingmsgs", "onofflinemsgs", "onofflinefiltermsgs", "onroamingsysmsgs", "onofflinesysmsgs", "onofflinefiltersysmsgs", "onofflinecustomsysmsgs", "onofflinefiltercustomsysmsgs", "onbroadcastmsg", "onbroadcastmsgs", "onsysmsgunread", "onsyncdone", "onteammembers", "onsyncteammembersdone", "onmsg", "onsysmsg", "oncustomsysmsg", "onupdatemyinfo", "onupdateuser", "onupdateteammember", "onCreateTeam", "onUpdateTeam", "onAddTeamMembers", "onRemoveTeamMembers", "onUpdateTeamManagers", "onDismissTeam", "onTransferTeam", "onUpdateTeamMembersMute", "onTeamMsgReceipt", "onupdatesession", "onupdatesysmsgunread", "onupdatesysmsg", "onsynccreateteam", "onsyncmarkinblacklist", "onsyncmarkinmutelist", "onsyncfriendaction", "shouldIgnoreNotification", "shouldCountNotifyUnread", "onPushNotificationMultiportConfig", "onPushNotificationMultiportConfigUpdate", "onpushevents"], "protocol::IMProtocol"), t.db = e.api.db = new s({logger: e.logger}), i.call(t, e)
        }

        var o = n(5).Promise, s = n(50), i = n(64), a = n(27), c = n(4), u = n(1), l = u.undef, m = n(143),
            d = n(97).getInstance("IM"), f = n(103), p = i.fn, g = r.fn = r.prototype = Object.create(p);
        g.init = function () {
            var e = this;
            p.init.call(e), e.socketUrls = [], e.parser = d, e.syncing = !0, e.hasSynced = !1, e.hasSyncedTeamMembers = !1, e.syncPromiseArray = [], e.syncResult = {}, e.syncTeamMembersPromiseArray = [], e.syncTeamMembersResult = {}, e.timetags = {}, e.sysMsgUnread = f.completeUnread({}), e.resetUnsettledMsgs(), e.resetUnsettledSysMsgs(), e.msgPromise = o.resolve(), e.sysMsgPromise = o.resolve(), e.sessionSet = {}, e.msgReceiptTasks = {}, e.userSet = {}, e.pushNotificationMultiportConfig = m.getDefaultConfig()
        }, g.reset = function () {
            var e = this;
            p.reset.call(e);
            var t = e.options;
            e.db.reset(t.db), l(t.lbsUrl) && (t.lbsUrl = c.lbsUrl), e.resetAutoMarkRead()
        }, g.resetAutoMarkRead = function () {
            var e = this.options;
            u.verifyBooleanWithDefault(e, "autoMarkRead", !0, "", "protocol::resetAutoMarkRead")
        }, g.resetUnsettledMsgs = function () {
            var e = this;
            e.unhandledMsgs = [], e.unupdatedMsgs = []
        }, g.resetUnsettledSysMsgs = function () {
            var e = this;
            e.unhandledSysMsgs = [], e.unupdatedSysMsgs = []
        }, g.packetFromSync = function (e) {
            return !e.obj || !!e.obj.sync
        }, g.onCustomError = function (e, t) {
            var n = a.customError(e, t), r = t.message || "未知错误";
            this.onMiscError(r, n)
        }, e.exports = r, n(270), n(268), n(282), n(285), n(273), n(279), n(284), n(278), n(274), n(276), n(275), n(283), n(280), n(281), n(269), n(272), n(271)
    }, function (e, t, n) {
        var r = n(54), o = n(33);
        e.exports = Object.keys || function (e) {
            return r(e, o)
        }
    }, function (e, t) {
        t.f = {}.propertyIsEnumerable
    }, function (e, t) {
        e.exports = {}
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = this;
            r.message = e || n.message || "", "object" === ("undefined" == typeof t ? "undefined" : (0, i["default"])(t)) ? (r.event = t, r.code = "Other_Error") : "undefined" != typeof t && (r.code = t), r.timetag = +new Date, "undefined" != typeof n && (r.event = n), r.event && (r.callFunc = r.event.callFunc || null, delete r.event.callFunc)
        }

        var s = n(15), i = r(s);
        o.prototype = Object.create(Error.prototype), o.prototype.name = "NIMError";
        var a = {
            201: "客户端版本不对, 需升级sdk",
            302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",
            403: "非法操作或没有权限",
            404: "对象(用户/群/聊天室)不存在",
            405: "参数长度过长",
            408: "客户端请求超时",
            414: "参数错误",
            415: "服务不可用/没有聊天室服务器可分配",
            416: "频率控制",
            417: "重复操作",
            422: "帐号被禁用",
            500: "服务器内部错误",
            501: "数据库操作失败",
            503: "服务器繁忙",
            508: "删除有效期过了",
            509: "已失效",
            7101: "被拉黑",
            801: "群人数达到上限",
            802: "没有权限",
            803: "群不存在或未发生变化",
            804: "用户不在群里面",
            805: "群类型不匹配",
            806: "创建群数量达到限制",
            807: "群成员状态不对",
            809: "已经在群里",
            811: "强推列表中帐号数量超限",
            812: "群被禁言",
            813: "因群数量限制，部分拉人成功",
            997: "协议已失效",
            998: "解包错误",
            999: "打包错误",
            9102: "通道失效",
            9103: "已经在其他端接听/拒绝过这通电话",
            11001: "对方离线, 通话不可送达",
            13002: "聊天室状态异常",
            13003: "在黑名单中",
            13004: "在禁言名单中",
            13006: "聊天室处于整体禁言状态,只有管理员能发言",
            Connect_Failed: "无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下",
            Error_Internet_Disconnected: "网断了",
            Error_Connection_is_not_Established: "连接未建立",
            Error_Connection_Socket_State_not_Match: "socket状态不对",
            Error_Timeout: "超时",
            Param_Error: "参数错误",
            No_File_Selected: "请选择文件",
            Wrong_File_Type: "文件类型错误",
            File_Too_Large: "文件过大",
            Cross_Origin_Iframe: "不能获取跨域Iframe的内容",
            Not_Support: "不支持",
            NO_DB: "无数据库",
            DB: "数据库错误",
            Still_In_Team: "还在群里",
            Session_Exist: "会话已存在",
            Session_Not_Exist: "会话不存在",
            Error_Unknown: "未知错误",
            Operation_Canceled: "操作取消"
        }, c = [200, 406, 808, 810];
        c.forEach(function (e) {
            a[e] = null
        }), o.genError = function (e) {
            var t = a[e];
            return void 0 === t && (t = "操作失败"), null === t ? null : new o(t, e)
        }, o.multiInstance = function (e) {
            return new o("不允许初始化多个实例", "Not_Allow_Multi_Instance", e)
        }, o.newNetworkError = function (e) {
            var t = "Error_Internet_Disconnected";
            return new o(a[t], t, e)
        }, o.newConnectError = function (e) {
            var t = "Connect_Failed";
            return new o(a[t] || null, t, e)
        }, o.newConnectionError = function (e) {
            var t = "Error_Connection_is_not_Established";
            return new o(a[t], t, e)
        }, o.newSocketStateError = function (e) {
            var t = "Error_Connection_Socket_State_not_Match";
            return new o(a[t], t, e)
        }, o.newTimeoutError = function (e) {
            var t = "Error_Timeout";
            return new o(a[t], t, e)
        }, o.newFrequencyControlError = function (e) {
            var t = 416, n = new o(a[t], t, e);
            return n.from = "local", n
        }, o.newParamError = function (e, t) {
            var n = "Param_Error";
            return new o(e || a[n], n, t)
        }, o.newNoFileError = function (e, t) {
            var n = "No_File_Selected";
            return new o(e || a[n], n, t)
        }, o.newWrongFileTypeError = function (e, t) {
            var n = "Wrong_File_Type";
            return new o(e || a[n], n, t)
        }, o.newFileTooLargeError = function (e, t) {
            var n = "File_Too_Large";
            return new o(e || a[n], n, t)
        }, o.newCORSIframeError = function (e) {
            var t = "Cross_Origin_Iframe";
            return new o(a[t], t, e)
        }, o.newSupportError = function (e, t, n) {
            return new o("不支持" + e, "Not_Support_" + t, n)
        }, o.newSupportDBError = function (e) {
            return o.newSupportError("数据库", "DB", e)
        }, o.noDBError = function (e) {
            var t = "NO_DB";
            return new o(a[t], t, e)
        }, o.newDBError = function (e) {
            var t = "DB";
            return new o(a[t], t, e)
        }, o.newUnknownError = function (e) {
            var t = "Error_Unknown";
            return new o(a[t], t, e)
        }, o.stillInTeamError = function (e) {
            var t = "Still_In_Team";
            return new o(a[t], t, e)
        }, o.sessionExist = function (e) {
            var t = "Session_Exist";
            return new o(a[t], t, e)
        }, o.sessionNotExist = function (e) {
            var t = "Session_Not_Exist";
            return new o(a[t], t, e)
        }, o.cancel = function (e) {
            var t = "Operation_Canceled";
            return new o(a[t], t, e)
        }, o.customError = function (e, t) {
            e = e || "Other_Error", t = t || {};
            var n = "";
            return t.message || (n = a[e] || e), "object" !== ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) ? new o(n, e, t) : "undefined" == typeof t ? new o(n, "Other_Error", e) : new o(n, "Other_Error", t)
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            return t.subType = "im", e.Protocol = s, e.Message = a, e.constructor = r, t.init(e)
        }

        var o = n(48), s = n(23), i = n(4), a = n(255), c = n(97).getInstance("IM");
        r.Protocol = s, r.parser = c, r.use = o.use, r.getInstance = o.getInstance, r.rmAllInstances = o.rmAllInstances, r.genInstanceName = function (e) {
            return "NIM-account-" + e.account
        };
        var u = r.fn = r.prototype = Object.create(o.prototype);
        r.info = u.info = i.info, e.exports = r, n(218), n(214), n(224), n(229), n(217), n(225), n(228), n(226), n(219), n(227), n(213), n(221), n(222), n(212), n(215), n(223), n(216)
    }, function (e, t) {
        e.exports = !0
    }, function (e, t, n) {
        var r = n(10).f, o = n(6), s = n(3)("toStringTag");
        e.exports = function (e, t, n) {
            e && !o(e = n ? e : e.prototype, s) && r(e, s, {configurable: !0, value: t})
        }
    }, function (e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (l === setTimeout) return setTimeout(e, 0);
            if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
            try {
                return l(e, 0)
            } catch (t) {
                try {
                    return l.call(null, e, 0)
                } catch (t) {
                    return l.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (m === clearTimeout) return clearTimeout(e);
            if ((m === r || !m) && clearTimeout) return m = clearTimeout, clearTimeout(e);
            try {
                return m(e)
            } catch (t) {
                try {
                    return m.call(null, e)
                } catch (t) {
                    return m.call(this, e)
                }
            }
        }

        function i() {
            g && f && (g = !1, f.length ? p = f.concat(p) : y = -1, p.length && a())
        }

        function a() {
            if (!g) {
                var e = o(i);
                g = !0;
                for (var t = p.length; t;) {
                    for (f = p, p = []; ++y < t;) f && f[y].run();
                    y = -1, t = p.length
                }
                f = null, g = !1, s(e)
            }
        }

        function c(e, t) {
            this.fun = e, this.array = t
        }

        function u() {
        }

        var l, m, d = e.exports = {};
        !function () {
            try {
                l = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                l = n
            }
            try {
                m = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                m = r
            }
        }();
        var f, p = [], g = !1, y = -1;
        d.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            p.push(new c(e, t)), 1 !== p.length || g || o(a)
        }, c.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = u, d.addListener = u, d.once = u, d.off = u, d.removeListener = u, d.removeAllListeners = u, d.emit = u, d.prependListener = u, d.prependOnceListener = u, d.listeners = function (e) {
            return []
        }, d.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, d.cwd = function () {
            return "/"
        }, d.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, d.umask = function () {
            return 0
        }
    }, function (e, t) {
        e.exports = function (e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    }, function (e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function (e, t, n) {
        var r = n(35)("keys"), o = n(22);
        e.exports = function (e) {
            return r[e] || (r[e] = o(e))
        }
    }, function (e, t, n) {
        var r = n(2), o = "__core-js_shared__", s = r[o] || (r[o] = {});
        e.exports = function (e) {
            return s[e] || (s[e] = {})
        }
    }, function (e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function (e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
        }
    }, function (e, t, n) {
        var r = n(12);
        e.exports = function (e, t) {
            if (!r(e)) return e;
            var n, o;
            if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
            if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
            if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (e, t, n) {
        var r = n(2), o = n(11), s = n(29), i = n(39), a = n(10).f;
        e.exports = function (e) {
            var t = o.Symbol || (o.Symbol = s ? {} : r.Symbol || {});
            "_" == e.charAt(0) || e in t || a(t, e, {value: i.f(e)})
        }
    }, function (e, t, n) {
        t.f = n(3)
    }, , function (e, t) {
        var n = {}.toString;
        e.exports = function (e) {
            return n.call(e).slice(8, -1)
        }
    }, function (e, t, n) {
        var r = n(14), o = n(86), s = n(33), i = n(34)("IE_PROTO"), a = function () {
        }, c = "prototype", u = function () {
            var e, t = n(47)("iframe"), r = s.length, o = "<", i = ">";
            for (t.style.display = "none", n(68).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(o + "script" + i + "document.F=Object" + o + "/script" + i), e.close(), u = e.F; r--;) delete u[c][s[r]];
            return u()
        };
        e.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (a[c] = r(e), n = new a, a[c] = null, n[i] = e) : n = u(), void 0 === t ? n : o(n, t)
        }
    }, function (e, t) {
        t.f = Object.getOwnPropertySymbols
    }, function (e, t) {
        (function (e) {
            "use strict";

            function n() {
                return "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof e ? e : {}
            }

            function r(e) {
                var t = !1, n = "Webkit Moz ms O".split(" "), r = document.createElement("div"), o = null;
                if (e = e.toLowerCase(), void 0 !== r.style[e] && (t = !0), t === !1) {
                    o = e.charAt(0).toUpperCase() + e.substr(1);
                    for (var s = 0; s < n.length; s++) if (void 0 !== r.style[n[s] + o]) {
                        t = !0;
                        break
                    }
                }
                return t
            }

            function o(e, t) {
                t = t || 2;
                for (var n = "" + e; n.length < t;) n = "0" + n;
                return n
            }

            function s(e) {
                return "" + e.getFullYear()
            }

            function i(e) {
                return o(e.getMonth() + 1)
            }

            function a(e) {
                return o(e.getDate())
            }

            function c(e) {
                return o(e.getHours())
            }

            function u(e) {
                return o(e.getMinutes())
            }

            function l(e) {
                return o(e.getSeconds())
            }

            function m(e) {
                return o(e.getMilliseconds(), 3)
            }

            function d(e) {
                return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "))
            }

            function f(e) {
                return Object.prototype.toString.call(e).slice(8, -1)
            }

            function p(e) {
                return f(e).toLowerCase()
            }

            function g(e) {
                return "string" === p(e)
            }

            function y(e) {
                return "number" === p(e)
            }

            function h(e) {
                return "boolean" === p(e)
            }

            function v(e) {
                return "array" === p(e)
            }

            function b(e) {
                return "function" === p(e)
            }

            function M(e) {
                return "date" === p(e)
            }

            function T(e) {
                return "regexp" === p(e)
            }

            function k(e) {
                return "error" === p(e)
            }

            function S(e) {
                return null === e
            }

            function w(e) {
                return null !== e
            }

            function C(e) {
                return "undefined" == typeof e
            }

            function O(e) {
                return "undefined" != typeof e
            }

            function I(e) {
                return O(e) && w(e)
            }

            function x(e) {
                return C(e) || S(e)
            }

            function _(e) {
                return I(e) && "object" === p(e)
            }

            function P(e) {
                return x(e) || (g(e) || v(e)) && 0 === e.length
            }

            function E(e, t) {
                if (e === t) return !0;
                for (; t.parentNode;) {
                    if (t.parentNode === e) return !0;
                    t = t.parentNode
                }
                return !1
            }

            function A(e) {
                var t = e.parentNode || document.body;
                e = e.cloneNode(!0), e.style.display = "block", e.style.opacity = 0, e.style.height = "auto", t.appendChild(e);
                var n = e.offsetHeight;
                return t.removeChild(e), n
            }

            function j(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }

            function R(e, t, n) {
                return I(n) ? void e.setAttribute("data-" + t, n) : e.getAttribute("data-" + t)
            }

            function F(e) {
                return e.target || e.srcElement
            }

            function N(e) {
                function t(r) {
                    n.src && (e.multi || se(n, "load", t), e.onload(r))
                }

                e = e || {};
                var n;
                if (e.name) try {
                    n = document.createElement('<iframe name="' + e.name + '"></iframe>'), n.frameBorder = 0
                } catch (r) {
                    n = document.createElement("iframe"), n.name = e.name
                } else n = document.createElement("iframe");
                e.visible || (n.style.display = "none"), b(e.onload) && re(n, "load", t);
                var o = e.parent;
                (o || document.body).appendChild(n);
                var s = e.src || "about:blank";
                return setTimeout(function () {
                    n.src = s
                }, 0), n
            }

            function U(e) {
                var t = document.createElement("div");
                t.innerHTML = e;
                var n = [], r = void 0, o = void 0;
                if (t.children) for (r = 0, o = t.children.length; r < o; r++) n.push(t.children[r]); else for (r = 0, o = t.childNodes.length; r < o; r++) {
                    var s = t.childNodes[r];
                    1 === s.nodeType && n.push(s)
                }
                return n.length > 1 ? t : n[0]
            }

            function D(e) {
                return I(e) && (document.documentElement.scrollTop = document.body.scrollTop = e), window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            }

            function L(e) {
                var t = n(), r = void 0;
                r = e.split(",")[0].indexOf("base64") >= 0 ? t.atob(e.split(",")[1]) : t.decodeURIComponent(e.split(",")[1]);
                for (var o = e.split(",")[0].split(":")[1].split(";")[0], s = new Uint8Array(r.length), i = 0; i < r.length; i++) s[i] = r.charCodeAt(i);
                return new t.Blob([s], {type: o})
            }

            function B(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "image/jpeg",
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
                if (e.toBlob) e.toBlob(t, n, r); else {
                    var o = e.toDataURL(n, r);
                    t(L(o))
                }
            }

            function q() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
                    }, n = arguments[2];
                for (var r in e) e.hasOwnProperty(r) && t.call(n, r, e[r])
            }

            function W(e, t) {
                q(t, function (t, n) {
                    e[t] = n
                })
            }

            function H(e) {
                return g(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
            }

            function J(e) {
                try {
                    H(e) && (e = JSON.parse(e)), _(e) && q(e, function (t, n) {
                        switch (p(n)) {
                            case"string":
                            case"object":
                                e[t] = J(n)
                        }
                    })
                } catch (t) {
                    console.error(t)
                }
                return e
            }

            function $(e) {
                return JSON.parse(JSON.stringify(e))
            }

            function X() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                return n.forEach(function (t) {
                    W(e, t)
                }), e
            }

            function V(e, t) {
                return q(t, function (t, n) {
                    C(e[t]) && (e[t] = n)
                }), e
            }

            function z(e, t, n) {
                var r = e[t] || e[t.toLowerCase()];
                return x(r) && (r = n, e[t] = r), r
            }

            function K(e, t) {
                return q(e, function (n, r) {
                    I(t[n]) && (e[n] = t[n])
                }), e
            }

            function G() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",", n = {};
                return e.split(t).forEach(function (e) {
                    var t = e.split("="), r = t.shift();
                    r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join("=")))
                }), n
            }

            function Y(e, t, n) {
                if (!e) return "";
                var r = [];
                return q(e, function (e, t) {
                    b(t) || (M(t) ? t = t.getTime() : v(t) ? t = t.join(",") : _(t) && (t = JSON.stringify(t)), n && (t = encodeURIComponent(t)), r.push(encodeURIComponent(e) + "=" + t))
                }), r.join(t || ",")
            }

            function Q(e) {
                return e.indexOf("?") < 0 ? "?" : "&"
            }

            function Z(e) {
                return Y(e, "&", !0)
            }

            function ee(e) {
                var t = n();
                return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
            }

            function te(e, t) {
                var n = Object.keys(e);
                return t && n.sort(function (t, n) {
                    var r = ee(e[t]), o = ee(e[n]);
                    return r === o ? 0 : r ? 1 : -1
                }), n
            }

            t.__esModule = !0, t.getGlobal = n, t.detectCSSFeature = r, t.fix = o, t.getYearStr = s, t.getMonthStr = i, t.getDayStr = a, t.getHourStr = c, t.getMinuteStr = u, t.getSecondStr = l, t.getMillisecondStr = m, t.dateFromDateTimeLocal = d, t.getClass = f, t.typeOf = p, t.isString = g, t.isNumber = y, t.isBoolean = h, t.isArray = v, t.isFunction = b, t.isDate = M, t.isRegExp = T, t.isError = k, t.isnull = S, t.notnull = w, t.undef = C, t.notundef = O, t.exist = I, t.notexist = x, t.isObject = _, t.isEmpty = P, t.containsNode = E, t.calcHeight = A, t.remove = j, t.dataset = R, t.target = F, t.createIframe = N, t.html2node = U, t.scrollTop = D, t.blobFromDataURL = L, t.blobFromCanvas = B, t.forOwn = q, t.mixin = W, t.isJSON = H, t.parseJSON = J, t.simpleClone = $, t.merge = X, t.fillUndef = V, t.checkWithDefault = z, t.fetch = K, t.string2object = G, t.object2string = Y, t.genUrlSep = Q, t.object2query = Z, t.isFileInput = ee, t.getKeys = te;
            var ne = (t.o = {}, t.emptyObj = {}, t.f = function () {
            }, t.emptyFunc = function () {
            }, t.regBlank = /\s+/gi, t.regWhiteSpace = /\s+/gi, t.format = function () {
                var e = /yyyy|MM|dd|hh|mm|ss|SSS/g, t = {yyyy: s, MM: i, dd: a, hh: c, mm: u, ss: l, SSS: m};
                return function (n, r) {
                    return n = new Date(n), isNaN(+n) ? "invalid date" : (r = r || "yyyy-MM-dd", r.replace(e, function (e) {
                        return t[e](n)
                    }))
                }
            }(), t.addEventListener = function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
            }), re = t.on = ne, oe = t.removeEventListener = function (e, t, n) {
                e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
            }, se = t.off = oe;
            t.uniqueID = function () {
                var e = 0;
                return function () {
                    return "" + e++
                }
            }(), t.url2origin = function () {
                var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
                return function (t) {
                    return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
                }
            }()
        }).call(t, function () {
            return this
        }())
    }, function (e, t, n) {
        var r = n(56);
        e.exports = function (e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function (n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function (n, r, o) {
                        return e.call(t, n, r, o)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }
    }, function (e, t, n) {
        var r;
        (function (e, o) {
            (function () {
                "use strict";

                function s(e) {
                    return e = String(e), e.charAt(0).toUpperCase() + e.slice(1)
                }

                function i(e, t, n) {
                    var r = {
                        "10.0": "10",
                        6.4: "10 Technical Preview",
                        6.3: "8.1",
                        6.2: "8",
                        6.1: "Server 2008 R2 / 7",
                        "6.0": "Server 2008 / Vista",
                        5.2: "Server 2003 / XP 64-bit",
                        5.1: "XP",
                        5.01: "2000 SP1",
                        "5.0": "2000",
                        "4.0": "NT",
                        "4.90": "ME"
                    };
                    return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = c(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }

                function a(e, t) {
                    var n = -1, r = e ? e.length : 0;
                    if ("number" == typeof r && r > -1 && r <= T) for (; ++n < r;) t(e[n], n, e); else u(e, t)
                }

                function c(e) {
                    return e = p(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : s(e)
                }

                function u(e, t) {
                    for (var n in e) w.call(e, n) && t(e[n], n, e)
                }

                function l(e) {
                    return null == e ? s(e) : C.call(e).slice(8, -1)
                }

                function m(e, t) {
                    var n = null != e ? typeof e[t] : "number";
                    return !(/^(?:boolean|number|string|undefined)$/.test(n) || "object" == n && !e[t])
                }

                function d(e) {
                    return String(e).replace(/([ -])(?!$)/g, "$1?")
                }

                function f(e, t) {
                    var n = null;
                    return a(e, function (r, o) {
                        n = t(n, r, o, e)
                    }), n
                }

                function p(e) {
                    return String(e).replace(/^ +| +$/g, "")
                }

                function g(e) {
                    function t(t) {
                        return f(t, function (t, n) {
                            return t || RegExp("\\b" + (n.pattern || d(n)) + "\\b", "i").exec(e) && (n.label || n)
                        })
                    }

                    function n(t) {
                        return f(t, function (t, n, r) {
                            return t || (n[X] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(X)] || RegExp("\\b" + d(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r
                        })
                    }

                    function r(t) {
                        return f(t, function (t, n) {
                            return t || RegExp("\\b" + (n.pattern || d(n)) + "\\b", "i").exec(e) && (n.label || n)
                        })
                    }

                    function o(t) {
                        return f(t, function (t, n) {
                            var r = n.pattern || d(n);
                            return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = i(t, r, n.label || n)), t
                        })
                    }

                    function s(t) {
                        return f(t, function (t, n) {
                            var r = n.pattern || d(n);
                            return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = c(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))),
                                t
                        })
                    }

                    function a(t) {
                        return f(t, function (t, n) {
                            return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
                        })
                    }

                    function y() {
                        return this.description || ""
                    }

                    var v = h, b = e && "object" == typeof e && "String" != l(e);
                    b && (v = e, e = null);
                    var M = v.navigator || {}, T = M.userAgent || "";
                    e || (e = T);
                    var S, w, O = b ? !!M.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(C.toString()),
                        I = "Object", x = b ? I : "ScriptBridgingProxyObject", _ = b ? I : "Environment",
                        P = b && v.java ? "JavaPackage" : l(v.java), E = b ? I : "RuntimeObject",
                        A = /\bJava/.test(P) && v.java, j = A && l(v.environment) == _, R = A ? "a" : "α",
                        F = A ? "b" : "β", N = v.document || {}, U = v.operamini || v.opera,
                        D = k.test(D = b && U ? U["[[Class]]"] : l(U)) ? D : U = null, L = e, B = [], q = null,
                        W = e == T, H = W && U && "function" == typeof U.version && U.version(),
                        J = t([{label: "EdgeHTML", pattern: "Edge"}, "Trident", {
                            label: "WebKit",
                            pattern: "AppleWebKit"
                        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
                        $ = r(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                            label: "Microsoft Edge",
                            pattern: "Edge"
                        }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                            label: "Samsung Internet",
                            pattern: "SamsungBrowser"
                        }, "SeaMonkey", {
                            label: "Silk",
                            pattern: "(?:Cloud9|Silk-Accelerated)"
                        }, "Sleipnir", "SlimBrowser", {
                            label: "SRWare Iron",
                            pattern: "Iron"
                        }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                            label: "Opera Mini",
                            pattern: "OPiOS"
                        }, "Opera", {label: "Opera", pattern: "OPR"}, "Chrome", {
                            label: "Chrome Mobile",
                            pattern: "(?:CriOS|CrMo)"
                        }, {label: "Firefox", pattern: "(?:Firefox|Minefield)"}, {
                            label: "Firefox for iOS",
                            pattern: "FxiOS"
                        }, {label: "IE", pattern: "IEMobile"}, {label: "IE", pattern: "MSIE"}, "Safari"]),
                        X = s([{label: "BlackBerry", pattern: "BB10"}, "BlackBerry", {
                            label: "Galaxy S",
                            pattern: "GT-I9000"
                        }, {label: "Galaxy S2", pattern: "GT-I9100"}, {
                            label: "Galaxy S3",
                            pattern: "GT-I9300"
                        }, {label: "Galaxy S4", pattern: "GT-I9500"}, {
                            label: "Galaxy S5",
                            pattern: "SM-G900"
                        }, {label: "Galaxy S6", pattern: "SM-G920"}, {
                            label: "Galaxy S6 Edge",
                            pattern: "SM-G925"
                        }, {label: "Galaxy S7", pattern: "SM-G930"}, {
                            label: "Galaxy S7 Edge",
                            pattern: "SM-G935"
                        }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                            label: "Kindle Fire",
                            pattern: "(?:Cloud9|Silk-Accelerated)"
                        }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                            label: "Wii U",
                            pattern: "WiiU"
                        }, "Wii", "Xbox One", {label: "Xbox 360", pattern: "Xbox"}, "Xoom"]), V = n({
                            Apple: {iPad: 1, iPhone: 1, iPod: 1},
                            Archos: {},
                            Amazon: {Kindle: 1, "Kindle Fire": 1},
                            Asus: {Transformer: 1},
                            "Barnes & Noble": {Nook: 1},
                            BlackBerry: {PlayBook: 1},
                            Google: {"Google TV": 1, Nexus: 1},
                            HP: {TouchPad: 1},
                            HTC: {},
                            LG: {},
                            Microsoft: {Xbox: 1, "Xbox One": 1},
                            Motorola: {Xoom: 1},
                            Nintendo: {"Wii U": 1, Wii: 1},
                            Nokia: {Lumia: 1},
                            Samsung: {"Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1},
                            Sony: {PlayStation: 1, "PlayStation Vita": 1}
                        }), z = o(["Windows Phone", "Android", "CentOS", {
                            label: "Chrome OS",
                            pattern: "CrOS"
                        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
                    if (J && (J = [J]), V && !X && (X = s([V])), (S = /\bGoogle TV\b/.exec(X)) && (X = S[0]), /\bSimulator\b/i.test(e) && (X = (X ? X + " " : "") + "Simulator"), "Opera Mini" == $ && /\bOPiOS\b/.test(e) && B.push("running in Turbo/Uncompressed mode"), "IE" == $ && /\blike iPhone OS\b/.test(e) ? (S = g(e.replace(/like iPhone OS/, "")), V = S.manufacturer, X = S.product) : /^iP/.test(X) ? ($ || ($ = "Safari"), z = "iOS" + ((S = / OS ([\d_]+)/i.exec(e)) ? " " + S[1].replace(/_/g, ".") : "")) : "Konqueror" != $ || /buntu/i.test(z) ? V && "Google" != V && (/Chrome/.test($) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(X)) || /\bAndroid\b/.test(z) && /^Chrome/.test($) && /\bVersion\//i.test(e) ? ($ = "Android Browser", z = /\bAndroid\b/.test(z) ? z : "Android") : "Silk" == $ ? (/\bMobi/i.test(e) || (z = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && B.unshift("accelerated")) : "PaleMoon" == $ && (S = /\bFirefox\/([\d.]+)\b/.exec(e)) ? B.push("identifying as Firefox " + S[1]) : "Firefox" == $ && (S = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (z || (z = "Firefox OS"), X || (X = S[1])) : !$ || (S = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec($)) ? ($ && !X && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(S + "/") + 8)) && ($ = null), (S = X || V || z) && (X || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(z)) && ($ = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(z) ? z : S) + " Browser")) : "Electron" == $ && (S = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && B.push("Chromium " + S) : z = "Kubuntu", H || (H = a(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", d($), "(?:Firefox|Minefield|NetFront)"])), (S = "iCab" == J && parseFloat(H) > 3 && "WebKit" || /\bOpera\b/.test($) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(J) && "WebKit" || !J && /\bMSIE\b/i.test(e) && ("Mac OS" == z ? "Tasman" : "Trident") || "WebKit" == J && /\bPlayStation\b(?! Vita\b)/i.test($) && "NetFront") && (J = [S]), "IE" == $ && (S = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? ($ += " Mobile", z = "Windows Phone " + (/\+$/.test(S) ? S : S + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? ($ = "IE Mobile", z = "Windows Phone 8.x", B.unshift("desktop mode"), H || (H = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != $ && "Trident" == J && (S = /\brv:([\d.]+)/.exec(e)) && ($ && B.push("identifying as " + $ + (H ? " " + H : "")), $ = "IE", H = S[1]), W) {
                        if (m(v, "global")) if (A && (S = A.lang.System, L = S.getProperty("os.arch"), z = z || S.getProperty("os.name") + " " + S.getProperty("os.version")), j) {
                            try {
                                H = v.require("ringo/engine").version.join("."), $ = "RingoJS"
                            } catch (K) {
                                (S = v.system) && S.global.system == v.system && ($ = "Narwhal", z || (z = S[0].os || null))
                            }
                            $ || ($ = "Rhino")
                        } else "object" == typeof v.process && !v.process.browser && (S = v.process) && ("object" == typeof S.versions && ("string" == typeof S.versions.electron ? (B.push("Node " + S.versions.node), $ = "Electron", H = S.versions.electron) : "string" == typeof S.versions.nw && (B.push("Chromium " + H, "Node " + S.versions.node), $ = "NW.js", H = S.versions.nw)), $ || ($ = "Node.js", L = S.arch, z = S.platform, H = /[\d.]+/.exec(S.version), H = H ? H[0] : null)); else l(S = v.runtime) == x ? ($ = "Adobe AIR", z = S.flash.system.Capabilities.os) : l(S = v.phantom) == E ? ($ = "PhantomJS", H = (S = S.version || null) && S.major + "." + S.minor + "." + S.patch) : "number" == typeof N.documentMode && (S = /\bTrident\/(\d+)/i.exec(e)) ? (H = [H, N.documentMode], (S = +S[1] + 4) != H[1] && (B.push("IE " + H[1] + " mode"), J && (J[1] = ""), H[1] = S), H = "IE" == $ ? String(H[1].toFixed(1)) : H[0]) : "number" == typeof N.documentMode && /^(?:Chrome|Firefox)\b/.test($) && (B.push("masking as " + $ + " " + H), $ = "IE", H = "11.0", J = ["Trident"], z = "Windows");
                        z = z && c(z)
                    }
                    if (H && (S = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(H) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (W && M.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (q = /b/i.test(S) ? "beta" : "alpha", H = H.replace(RegExp(S + "\\+?$"), "") + ("beta" == q ? F : R) + (/\d+\+?/.exec(S) || "")), "Fennec" == $ || "Firefox" == $ && /\b(?:Android|Firefox OS)\b/.test(z)) $ = "Firefox Mobile"; else if ("Maxthon" == $ && H) H = H.replace(/\.[\d.]+/, ".x"); else if (/\bXbox\b/i.test(X)) "Xbox 360" == X && (z = null), "Xbox 360" == X && /\bIEMobile\b/.test(e) && B.unshift("mobile mode"); else if (!/^(?:Chrome|IE|Opera)$/.test($) && (!$ || X || /Browser|Mobi/.test($)) || "Windows CE" != z && !/Mobi/i.test(e)) if ("IE" == $ && W) try {
                        null === v.external && B.unshift("platform preview")
                    } catch (K) {
                        B.unshift("embedded")
                    } else (/\bBlackBerry\b/.test(X) || /\bBB10\b/.test(e)) && (S = (RegExp(X.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || H) ? (S = [S, /BB10/.test(e)], z = (S[1] ? (X = null, V = "BlackBerry") : "Device Software") + " " + S[0], H = null) : this != u && "Wii" != X && (W && U || /Opera/.test($) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == $ && /\bOS X (?:\d+\.){2,}/.test(z) || "IE" == $ && (z && !/^Win/.test(z) && H > 5.5 || /\bWindows XP\b/.test(z) && H > 8 || 8 == H && !/\bTrident\b/.test(e))) && !k.test(S = g.call(u, e.replace(k, "") + ";")) && S.name && (S = "ing as " + S.name + ((S = S.version) ? " " + S : ""), k.test($) ? (/\bIE\b/.test(S) && "Mac OS" == z && (z = null), S = "identify" + S) : (S = "mask" + S, $ = D ? c(D.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(S) && (z = null), W || (H = null)), J = ["Presto"], B.push(S)); else $ += " Mobile";
                    (S = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (S = [parseFloat(S.replace(/\.(\d)$/, ".0$1")), S], "Safari" == $ && "+" == S[1].slice(-1) ? ($ = "WebKit Nightly", q = "alpha", H = S[1].slice(0, -1)) : H != S[1] && H != (S[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (H = null), S[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == S[0] && 537.36 == S[2] && parseFloat(S[1]) >= 28 && "WebKit" == J && (J = ["Blink"]), W && (O || S[1]) ? (J && (J[1] = "like Chrome"), S = S[1] || (S = S[0], S < 530 ? 1 : S < 532 ? 2 : S < 532.05 ? 3 : S < 533 ? 4 : S < 534.03 ? 5 : S < 534.07 ? 6 : S < 534.1 ? 7 : S < 534.13 ? 8 : S < 534.16 ? 9 : S < 534.24 ? 10 : S < 534.3 ? 11 : S < 535.01 ? 12 : S < 535.02 ? "13+" : S < 535.07 ? 15 : S < 535.11 ? 16 : S < 535.19 ? 17 : S < 536.05 ? 18 : S < 536.1 ? 19 : S < 537.01 ? 20 : S < 537.11 ? "21+" : S < 537.13 ? 23 : S < 537.18 ? 24 : S < 537.24 ? 25 : S < 537.36 ? 26 : "Blink" != J ? "27" : "28")) : (J && (J[1] = "like Safari"), S = S[0], S = S < 400 ? 1 : S < 500 ? 2 : S < 526 ? 3 : S < 533 ? 4 : S < 534 ? "4+" : S < 535 ? 5 : S < 537 ? 6 : S < 538 ? 7 : S < 601 ? 8 : "8"), J && (J[1] += " " + (S += "number" == typeof S ? ".x" : /[.+]/.test(S) ? "" : "+")), "Safari" == $ && (!H || parseInt(H) > 45) && (H = S)), "Opera" == $ && (S = /\bzbov|zvav$/.exec(z)) ? ($ += " ", B.unshift("desktop mode"), "zvav" == S ? ($ += "Mini", H = null) : $ += "Mobile", z = z.replace(RegExp(" *" + S + "$"), "")) : "Safari" == $ && /\bChrome\b/.exec(J && J[1]) && (B.unshift("desktop mode"), $ = "Chrome Mobile", H = null, /\bOS X\b/.test(z) ? (V = "Apple", z = "iOS 4.3+") : z = null), H && 0 == H.indexOf(S = /[\d.]+$/.exec(z)) && e.indexOf("/" + S + "-") > -1 && (z = p(z.replace(S, ""))), J && !/\b(?:Avant|Nook)\b/.test($) && (/Browser|Lunascape|Maxthon/.test($) || "Safari" != $ && /^iOS/.test(z) && /\bSafari\b/.test(J[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test($) && J[1]) && (S = J[J.length - 1]) && B.push(S), B.length && (B = ["(" + B.join("; ") + ")"]), V && X && X.indexOf(V) < 0 && B.push("on " + V), X && B.push((/^on /.test(B[B.length - 1]) ? "" : "on ") + X), z && (S = / ([\d.+]+)$/.exec(z), w = S && "/" == z.charAt(z.length - S[0].length - 1), z = {
                        architecture: 32,
                        family: S && !w ? z.replace(S[0], "") : z,
                        version: S ? S[1] : null,
                        toString: function () {
                            var e = this.version;
                            return this.family + (e && !w ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
                        }
                    }), (S = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(L)) && !/\bi686\b/i.test(L) ? (z && (z.architecture = 64, z.family = z.family.replace(RegExp(" *" + S), "")), $ && (/\bWOW64\b/i.test(e) || W && /\w(?:86|32)$/.test(M.cpuClass || M.platform) && !/\bWin64; x64\b/i.test(e)) && B.unshift("32-bit")) : z && /^OS X/.test(z.family) && "Chrome" == $ && parseFloat(H) >= 39 && (z.architecture = 64), e || (e = null);
                    var G = {};
                    return G.description = e, G.layout = J && J[0], G.manufacturer = V, G.name = $, G.prerelease = q, G.product = X, G.ua = e, G.version = $ && H, G.os = z || {
                        architecture: null,
                        family: null,
                        version: null,
                        toString: function () {
                            return "null"
                        }
                    }, G.parse = g, G.toString = y, G.version && B.unshift(H), G.name && B.unshift($), z && $ && (z != String(z).split(" ")[0] || z != $.split(" ")[0] && !X) && B.push(X ? "(" + z + ")" : "on " + z), B.length && (G.description = B.join(" ")), G
                }

                var y = {"function": !0, object: !0}, h = y[typeof window] && window || this, v = y[typeof t] && t,
                    b = y[typeof e] && e && !e.nodeType && e, M = v && b && "object" == typeof o && o;
                !M || M.global !== M && M.window !== M && M.self !== M || (h = M);
                var T = Math.pow(2, 53) - 1, k = /\bOpera/, S = Object.prototype, w = S.hasOwnProperty, C = S.toString,
                    O = g();
                h.platform = O, r = function () {
                    return O
                }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
            }).call(this)
        }).call(t, n(57)(e), function () {
            return this
        }())
    }, function (e, t, n) {
        var r = n(12), o = n(2).document, s = r(o) && r(o.createElement);
        e.exports = function (e) {
            return s ? o.createElement(e) : {}
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o() {
        }

        var s = n(15), i = r(s), a = n(20), c = n(5).Promise, u = n(1), l = u.notundef, m = n(182), d = n(4), f = {};
        o.rmAllInstances = function () {
            for (var e in f) f[e].destroy();
            f = {}
        }, o.getInstance = function (e) {
            var t = this;
            u.verifyOptions(e, "account", "api::Base.getInstance");
            var n = t.genInstanceName(e), r = f[n];
            return r ? o.updateInstance(r, e) : r = f[n] = new t(e), r
        }, o.updateInstance = function (e, t) {
            e.setOptions(t), e.connect()
        };
        var p = o.fn = o.prototype = Object.create(new a);
        p.updatePrivateConf = function (e) {
            if (e && "object" === (0, i["default"])(e.privateConf)) {
                var t = e.privateConf;
                "string" == typeof t.lbs_web && (e.lbsUrl = t.lbs_web), "boolean" == typeof t.link_ssl_web && (e.secure = t.link_ssl_web), "boolean" == typeof t.https_enabled && (e.httpsEnabled = t.https_enabled), e.uploadUrl = t.nos_uploader_web ? t.nos_uploader_web : null, e.replaceUrl = t.nos_downloader ? t.nos_downloader : null, e.downloadUrl = t.nos_accelerate ? t.nos_accelerate : null, e.downloadHost = t.nos_accelerate_host ? t.nos_accelerate_host : null, e.ntServerAddress = t.nt_server
            }
            return null === e.ntServerAddress || "" === e.ntServerAddress ? d.ntServerAddress = null : d.ntServerAddress = e.ntServerAddress || d.defaultReportUrl, d.uploadUrl = e.uploadUrl || d.uploadUrl, d.downloadUrl = e.downloadUrl || d.downloadUrl, d.downloadHost = e.downloadHost || d.downloadHost, d.replaceUrl = e.replaceUrl || d.replaceUrl, d.httpsEnabled = e.httpsEnabled || d.httpsEnabled, e
        }, p.init = function (e) {
            var t = this;
            u.verifyOptions(e, "account", "api::Base.init"), e = this.updatePrivateConf(e);
            var n = t.account = e.account = e.account + "", r = e.constructor, s = r.genInstanceName(e), i = f[s];
            if (e._disableSingleton && (i = null), i) return o.updateInstance(i, e), i;
            t.name = s, f[s] = t, t.logger = e.logger = new m({
                debug: e.debug,
                logFunc: e.logFunc,
                prefix: t.subType
            }), e.api = t;
            var a = t.protocol = new e.Protocol(e);
            return a.name = "Protocol-" + s, a.account = n, a.api = t, a.message = t.message = new e.Message({account: n}), t.options = u.copy(e), t.reset(), t
        }, p.destroy = function (e) {
            var t = this, n = this.name;
            this.isConnected && this.isConnected() && this.disconnect(), Object.getOwnPropertyNames(this).forEach(function (e) {
                delete t[e]
            }), f && (f[n] = null, delete f[n]), console.info("ApiBase::destroy: instance destroyed ...")
        }, p.reset = function () {
            var e = this.updatePrivateConf(this.options);
            u.verifyBooleanWithDefault(e, "exifOrientation", !0, "", "api::Base.reset")
        }, p.setOptions = function (e) {
            this.reset(), this.protocol.setOptions(e)
        }, p.processCallback = function (e, t) {
            g(e, t)
        }, p.processCallbackPromise = function (e, t) {
            var n = new c(function (n, r) {
                g(e, t, !0, n, r)
            });
            return n
        };
        var g = function (e, t, n, r, o) {
            var s = "api::processCallback";
            n && (s = "api::processCallbackPromise"), u.verifyCallback(e, "done", s), e.callback = function (i, a, c) {
                var m = e.callback.options;
                if (a = a || m, t && (a = m), u.isFunction(e.cbaop)) {
                    var d = e.cbaop(i, a);
                    l(d) && (a = d)
                }
                var f = e.done;
                u.isObject(a) && (delete a.done, delete a.cb, delete a.callback), n ? i ? o({
                    message: "生成接口回调错误",
                    callFunc: s,
                    event: i
                }) : r(a) : f(i, a, c)
            }, e.callback.options = u.copy(e)
        };
        p.processPs = function (e) {
            u.notexist(e.ps) && (e.ps = "")
        }, p.processCustom = function (e) {
            u.notexist(e.custom) && (e.custom = "")
        }, p.sendCmd = function () {
            this.protocol.sendCmd.apply(this.protocol, arguments)
        }, p.sendCmdWithResp = function (e, t, n) {
            this.sendCmd(e, t, function (e, t, r) {
                u.isFunction(n) && (e ? n(e, t) : n(null, r))
            })
        }, p.cbAndSendCmd = function (e, t) {
            var n = this.processCallbackPromise(t);
            return this.sendCmd(e, t), n
        }, o.use = function (e, t) {
            e && e.install && u.isFunction(e.install) && e.install(this, t)
        }, e.exports = o, n(154), n(156), n(157), n(158), n(155), n(159)
    }, , function (e, t, n) {
        "use strict";

        function r(e) {
            y = e, l.set("db", e, c)
        }

        function o(e) {
            this.concurrency = 0, this.pendingTasks = [], this.queue = s.resolve(), this.logger = e.logger
        }

        var s = n(5).Promise, i = n(46), a = n(111), c = n(140), u = n(1), l = n(148), m = n(27),
            d = m.newSupportDBError, f = m.noDBError, p = n(231), g = "nim-", y = !1, h = u.getGlobal();
        if (r(!!h.indexedDB), "IE" === i.name && r(!1), "Microsoft Edge" === i.name && r(!1), "Safari" === i.name) {
            try {
                var v = parseInt(i.version.split(".")[0], 10);
                v < 10 && r(!1)
            } catch (b) {
            }
            r(!1)
        }
        var M = o.fn = o.prototype;
        M.reset = u.emptyFunc, y && (M.reset = function (e) {
            this.enable = e !== !1
        }), M.addTask = function (e) {
            var t = this;
            return new s(function (n, r) {
                function o(e) {
                    t.concurrency--;
                    var n = t.pendingTasks.shift();
                    n && t.addTask(n), e()
                }

                return t.concurrency < 100 ? (t.concurrency++, e().then(function (t) {
                    o(function () {
                        n(t), e.resolve && e.resolve(t)
                    })
                }, function (t) {
                    o(function () {
                        var n = new m("数据库并发错误", "DB_ERROR", {event: t, callFunc: "db::addTask"});
                        r(n), e.reject && e.reject(n)
                    })
                })) : (e.resolve || (e.resolve = n, e.reject = r), void t.pendingTasks.push(e))
            })
        }, M.init = function (e) {
            var t = this;
            return t.addTask(function () {
                return t.enable ? t.server ? s.resolve() : (t.name = g + e, c.open({
                    server: t.name,
                    version: p.version,
                    schema: p.schema
                }).then(function (e) {
                    t.logger.log("db::init: " + t.name), t.server = e
                }, function (e) {
                    throw r(!1), t.server = null, t.name = null, e
                })) : s.reject(d({callFunc: "db::init"}))
            })
        }, M.destroy = function () {
            var e = this;
            return e.addTask(function () {
                return e.enable ? e.server ? c.remove(e.name).then(function () {
                    e.logger.log("db::destroy: " + e.name), e.server = null, e.name = null
                }) : s.resolve() : s.reject(d({callFunc: "db::destroy"}))
            })
        }, M.clear = function () {
            var e = this;
            return e.addTask(function () {
                return e.enable ? e.server ? e.server.clear("timetag").then(function () {
                    var t = [].slice.call(e.server.getIndexedDB().objectStoreNames), n = [];
                    if (t.forEach(function (t) {
                            n.push(e.server.clear(t))
                        }), n.length) return s.all(n).then(function () {
                        e.logger.log("db::clear: " + e.name)
                    })
                }) : s.resolve() : s.reject(d({callFunc: "db::clear"}))
            })
        }, M.close = function () {
            var e = this;
            e.server && (e.server.close(), e.server = null, e.name = null)
        }, M.remove = function (e, t) {
            var n = this;
            return n.addTask(function () {
                return n.enable ? n.server ? (u.isArray(t) || (t = [t]), n.server.remove(e, t).then(function () {
                    n.logger.log("db::delete: " + e + " " + (1 === t.length ? t[0] : t))
                })) : s.reject(f({callFunc: "db::remove"})) : s.reject(d({callFunc: "db::remove"}))
            })
        }, M.put = function (e, t) {
            var n = this;
            return n.addTask(function () {
                return n.enable ? n.server ? (u.isArray(t) || (t = [t]), n.server.update(e, t).then(function (t) {
                    var r = ["put", e], o = p.keyPath(e), s = [];
                    return o && (t.forEach(function (e) {
                        s.push(a(e, o))
                    }), r.push(1 === s.length ? s[0] : s)), r.push(1 === t.length ? t[0] : t), r.unshift("db::put:"), n.logger.log.apply(n.logger.log, r), t
                })) : s.reject(f({callFunc: "db::put"})) : s.reject(d({callFunc: "db::put"}))
            })
        }, M.modifyOrPut = function (e) {
            var t = this, n = e.table, r = u.copy(e.obj), o = e.key, s = e.modifyObjWhenPut, i = u.copy(r);
            return delete i[o], t.getOne(n, null, r[o], {modifyObj: i}).then(function (e) {
                return e ? (t.logger.log("db::modifyOrPut: update table " + n, r), e) : (r = u.merge(r, s), t.put(n, r).then(function (e) {
                    return e[0]
                }))
            })
        }, M.updateAndDelete = function (e, t, n) {
            var r = this;
            return r.addTask(function () {
                return r.enable ? r.server ? r.server.updateAndDelete(e, t, n) : s.reject(f({callFunc: "db::updateAndDelete"})) : s.reject(d({callFunc: "db::updateAndDelete"}))
            })
        }, M.get = function (e, t) {
            var n = this;
            return n.addTask(function () {
                return n.enable ? n.server ? n.server.get(e, t) : s.reject(f({callFunc: "db::get"})) : s.reject(d({callFunc: "db::get"}))
            })
        }, M.getAll = function (e, t) {
            var n = this;
            return n.addTask(function () {
                return n.enable ? n.server ? (t = t || {}, t.keys = t.keys === !0, t.desc = t.desc === !0, t.distinct = t.distinct === !0, n.server.query(e, t.index).filter(t.filter).keys(t.keys).desc(t.desc).limit(t.limit).distinct(t.distinct).map(t.mapper).modify(t.modifyObj).execute()) : s.reject(f({callFunc: "db::getAll"})) : s.reject(d({callFunc: "db::getAll"}))
            })
        }, M.getOnly = function (e, t, n, r) {
            var o = this;
            return o.addTask(function () {
                if (!o.enable) throw d({callFunc: "db::getOnly"});
                if (!o.server) throw f({callFunc: "db::getOnly"});
                return r = r || {}, r.keys = r.keys === !0, r.desc = r.desc === !0, r.distinct = r.distinct === !0, r.remove = r.remove === !0, o.server.query(e, t).only(n).filter(r.filter).keys(r.keys).desc(r.desc).limit(r.limit).distinct(r.distinct).map(r.mapper).modify(r.modifyObj).remove(r.remove).execute()
            })
        }, M.getOne = function () {
            var e = this;
            return e.getOnly.apply(e, arguments).then(function (e) {
                return e[0]
            })
        }, M.clearTable = function (e) {
            var t = this;
            return t.addTask(function () {
                if (!t.enable) throw d({callFunc: "db::clearTable"});
                if (!t.server) throw f({callFunc: "db::clearTable"});
                return t.server.clear(e)
            })
        }, M.checkDB = function () {
            var e = this;
            if (!e.enable) throw d({callFunc: "db::checkDB"});
            if (!e.server) throw f({callFunc: "db::checkDB"})
        }, e.exports = o, n(233), n(239), n(235), n(232), n(238), n(240), n(234), n(237), n(230), n(236)
    }, function (e, t, n) {
        e.exports = !n(8) && !n(19)(function () {
            return 7 != Object.defineProperty(n(47)("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(29), o = n(18), s = n(55), i = n(9), a = n(6), c = n(26), u = n(83), l = n(30), m = n(88),
            d = n(3)("iterator"), f = !([].keys && "next" in [].keys()), p = "@@iterator", g = "keys", y = "values",
            h = function () {
                return this
            };
        e.exports = function (e, t, n, v, b, M, T) {
            u(n, t, v);
            var k, S, w, C = function (e) {
                    if (!f && e in _) return _[e];
                    switch (e) {
                        case g:
                            return function () {
                                return new n(this, e)
                            };
                        case y:
                            return function () {
                                return new n(this, e)
                            }
                    }
                    return function () {
                        return new n(this, e)
                    }
                }, O = t + " Iterator", I = b == y, x = !1, _ = e.prototype, P = _[d] || _[p] || b && _[b],
                E = !f && P || C(b), A = b ? I ? C("entries") : E : void 0, j = "Array" == t ? _.entries || P : P;
            if (j && (w = m(j.call(new e)), w !== Object.prototype && w.next && (l(w, O, !0), r || a(w, d) || i(w, d, h))), I && P && P.name !== y && (x = !0, E = function () {
                    return P.call(this)
                }), r && !T || !f && !x && _[d] || i(_, d, E), c[t] = E, c[O] = h, b) if (k = {
                    values: I ? E : C(y),
                    keys: M ? E : C(g),
                    entries: A
                }, T) for (S in k) S in _ || s(_, S, k[S]); else o(o.P + o.F * (f || x), t, k);
            return k
        }
    }, function (e, t, n) {
        var r = n(54), o = n(33).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function (e) {
            return r(e, o)
        }
    }, function (e, t, n) {
        var r = n(6), o = n(13), s = n(80)(!1), i = n(34)("IE_PROTO");
        e.exports = function (e, t) {
            var n, a = o(e), c = 0, u = [];
            for (n in a) n != i && r(a, n) && u.push(n);
            for (; t.length > c;) r(a, n = t[c++]) && (~s(u, n) || u.push(n));
            return u
        }
    }, function (e, t, n) {
        e.exports = n(9)
    }, function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function (e, t) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }, function (e, t, n) {
        var r = n(41);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
            return "String" == r(e) ? e.split("") : Object(e)
        }
    }, function (e, t, n) {
        var r = n(25), o = n(21), s = n(13), i = n(37), a = n(6), c = n(51), u = Object.getOwnPropertyDescriptor;
        t.f = n(8) ? u : function (e, t) {
            if (e = s(e), t = i(t, !0), c) try {
                return u(e, t)
            } catch (n) {
            }
            if (a(e, t)) return o(!r.f.call(e, t), e[t])
        }
    }, function (e, t, n) {
        var r = n(32);
        e.exports = function (e) {
            return Object(r(e))
        }
    }, , function (e, t, n) {
        "use strict";
        var r = n(107), o = n(176), s = n(180);
        r.json = o, r.upload = s, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = {};
        o.init = function () {
            o.deviceId = r.guid()
        }, o.init(), o.clientTypeMap = {
            1: "Android",
            2: "iOS",
            4: "PC",
            8: "WindowsPhone",
            16: "Web",
            32: "Server",
            64: "Mac"
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            o.undef(e.secure) && (e.secure = !0), t.options = o.copy(e), t.init(), t.connect()
        }

        var o = n(1), s = n(4), i = n(27), a = r.fn = r.prototype;
        a.init = function () {
            var e = this;
            e.logger = e.options.logger, e.cmdTaskArray = [], e.timerMap = {}, e.cmdCallbackMap = {}, e.cmdContentMap = {}, e.initConnect(), e.reset()
        }, a.reset = function () {
            var e = this;
            e.resetConnect()
        }, a.setOptions = function (e) {
            var t = this, n = t.options, r = Object.keys(n), s = r.indexOf("account");
            s !== -1 && r.splice(s, 1), e = o.filterObj(e, r), t.options = o.merge(n, e), t.reset()
        }, a.sendCmd = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments[2], r = this;
            r.heartbeat(), "heartbeat" !== e && r.logger.warn("protocol::sendCmd: " + e, t);
            var o = e;
            e = r.parser.createCmd(e, t);
            var s, i = e.SER;
            t = t || {}, r.cmdContentMap[i] = t, t.single && (delete t.single, s = Object.keys(t), 1 === s.length && (r.cmdContentMap[i] = t[s[0]])), t.NOTSTORE && (s = t.NOTSTORE.split(" "), s.forEach(function (e) {
                delete t[e]
            }), delete t.NOTSTORE), n = n || t.callback, n && (r.cmdCallbackMap[i] = n), r.cmdTaskArray.push({
                cmdName: o,
                cmd: JSON.stringify(e)
            }), r.startCmdTaskTimer()
        }, a.startCmdTaskTimer = function () {
            var e = this;
            e.cmdTaskTimer || (e.cmdTaskTimer = setTimeout(function () {
                var t = e.cmdTaskArray.shift();
                e.cmdTaskTimer = null, t && e.executeCmdTask(t), e.cmdTaskArray.length && e.startCmdTaskTimer()
            }, 0))
        }, a.executeCmdTask = function (e) {
            var t = this, n = e.cmdName, r = e.cmd;
            r = JSON.parse(r);
            var o = r.SER;
            t.isFrequencyControlled(n) ? (t.logger.warn("protocol::executeCmdTask: " + n + " hit freq control"), t.markCallbackInvalid(o, i.newFrequencyControlError({
                callFunc: "protocol::executeCmdTask",
                message: n + " hit freq control"
            }))) : t.isConnected() ? (t.logger.log("protocol::sendCmd: " + n + " " + JSON.stringify(r)), t.doSendCmd(r)) : (t.logger.warn("protocol::executeCmdTask: " + n + " not connected"), t.markCallbackInvalid(o, i.newSocketStateError({
                callFunc: "protocol::executeCmdTask",
                message: n + " not connected"
            })))
        }, a.isFrequencyControlled = function (e) {
            var t = this.frequencyControlMap && this.frequencyControlMap[e];
            if (t) {
                if (Date.now() < t.from + t.duration) return !0;
                delete this.frequencyControlMap[e]
            }
        }, a.doSendCmd = function (e) {
            var t = this, n = e.SER;
            t.timerMap[n] = setTimeout(function () {
                t.markCallbackInvalid(n, i.newTimeoutError({
                    callFunc: "protocol::doSendCmd",
                    message: "ser " + n + " Timeout Error"
                }))
            }, s.cmdTimeout);
            try {
                t.socket.send(JSON.stringify(e))
            } catch (r) {
                t.markCallbackInvalid(n, i.newSocketStateError({
                    callFunc: "protocol::doSendCmd",
                    message: "ser " + n + " socketSendJson Error"
                })), t.onDisconnect(!0, "protocol::doSendCmd:socketSendJson")
            }
        }, a.getObjWithSer = function (e) {
            var t = this, n = t.cmdContentMap[e];
            return delete t.cmdContentMap[e], n && o.copy(n)
        }, a.getCallbackWithSer = function (e) {
            var t = this, n = t.cmdCallbackMap[e];
            return delete t.cmdCallbackMap[e], n
        }, a.getTimerWithSer = function (e) {
            var t = this, n = t.timerMap[e];
            return delete t.timerMap[e], n
        }, a.clearTimerWithSer = function (e) {
            var t = this, n = t.getTimerWithSer(e);
            n && clearTimeout(n)
        }, a.markCallbackInvalid = function (e, t) {
            var n = this;
            n.getObjWithSer(e), n.clearTimerWithSer(e);
            var r = n.getCallbackWithSer(e);
            if (r) {
                var o = r.options;
                setTimeout(function () {
                    r(t || i.newUnknownError({ser: e}), o)
                }, 0)
            }
        }, a.markAllCallbackInvalid = function (e) {
            var t = this;
            Object.keys(this.cmdCallbackMap).forEach(function (n) {
                t.markCallbackInvalid(n, e)
            })
        }, a.getPacketObj = function (e) {
            var t = null;
            if (e && e.raw) {
                var n = e.raw.ser;
                o.notundef(n) && (t = this.getObjWithSer(n))
            }
            return t
        }, a.callPacketAckCallback = function (e) {
            var t = this;
            if (e && e.raw) {
                var n = e.raw.ser;
                if (o.notundef(n)) {
                    t.clearTimerWithSer(n);
                    var r = t.getCallbackWithSer(n);
                    r && (e.promise ? e.promise.then(function () {
                        r(e.error, e.obj)
                    }, function (o) {
                        o.callFunc = "protocol::callPacketAckCallback", o.message = "Resp Promoise Error: cmd: " + e.cmd + ", ser: " + n;
                        var s = i.customError("CALLBACK_ACK_ERR", o);
                        t.logger.error("protocol::callPacketAckCallback: promise error " + JSON.stringify(o)), r(s, e.obj, e.content)
                    }) : r(e.error, e.obj, e.content))
                }
            }
        }, a.onMessage = function (e) {
            var t = this;
            t.heartbeat();
            var n = t.parser.parseResponse(e);
            n.notFound && t.logger.warn("protocol::onMessage: packet not found " + JSON.stringify(n)), n.error ? (n.error.message = n.cmd + " error: " + n.error.message, t.logger.error("protocol::onMessage: packet error " + JSON.stringify(n.error))) : n.content || "heartbeat" === n.cmd || t.logger.warn("protocol::onMessage: packet.content undefined " + JSON.stringify(n)), n.frequencyControlDuration && (t.logger.error("protocol::onMessage: server freq control " + JSON.stringify(n.cmd)), t.frequencyControlMap = t.frequencyControlMap || {}, t.frequencyControlMap[n.cmd] = {
                from: +new Date,
                duration: n.frequencyControlDuration
            }), n.obj = t.getPacketObj(n), "heartbeat" !== n.cmd && "getClientAntispam" !== n.cmd && t.logger.log("protocol::recvCmd: " + n.cmd + " " + n.rawStr);
            var r = "process" + o.capFirstLetter(n.service);
            t[r] ? (t.logger.warn("protocol::recvCmd: " + n.cmd + " " + r, n.content), t[r](n)) : t.logger.warn("protocol::onMessage: " + r + " not found"), t.callPacketAckCallback(n)
        }, a.onMiscError = function (e, t, n) {
            t && this.notifyError(e, t, n)
        }, a.notifyError = function (e, t, n) {
            var r = this;
            if (r.isConnected()) {
                var o = [(e || "") + " " + r.name + " " + JSON.stringify(t)];
                n && o.push(n), r.logger.error.apply(r.logger.error, o), r.options.onerror(t, n)
            }
        }, a.emitAPI = function (e) {
            var t = e.type, n = e.obj;
            this.api.emit(t, n)
        }, e.exports = r, n(164), n(163), n(165), n(166)
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            var t = this;
            e.resend ? (c.verifyOptions(e, "idClient", "msg::Message"), t.idClient = e.idClient) : t.idClient = c.guid(), t.type = f[e.type], t.resend = e.resend ? 1 : 0, u(e.custom) && ("object" === (0, i["default"])(e.custom) ? (t.logger.info("model::Message: custom should be JsonString, auto transfer"), t.custom = JSON.stringify(e.custom)) : t.custom = "" + e.custom), u(e.text) && (t.body = "" + e.text), u(e.body) && (t.body = "" + e.body), u(e.yidunEnable) && (t.yidunEnable = e.yidunEnable ? 1 : 0), u(e.antiSpamUsingYidun) && (t.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0), u(e.antiSpamContent) && ("object" === (0, i["default"])(e.antiSpamContent) ? (t.logger.info("model::Message: antiSpamContent should be JsonString, auto transfer"), t.antiSpamContent = JSON.stringify(e.antiSpamContent)) : t.antiSpamContent = "" + e.antiSpamContent), u(e.antiSpamBusinessId) && ("object" === (0, i["default"])(e.antiSpamBusinessId) ? (t.logger.info("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), t.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : t.antiSpamBusinessId = "" + e.antiSpamBusinessId), u(e.skipHistory) && (t.skipHistory = e.skipHistory ? 1 : 0), u(e.highPriority) && (t.highPriority = e.highPriority ? 1 : 0), u(e.clientAntiSpam) && (t.clientAntiSpam = e.clientAntiSpam ? 1 : 0)
        }

        var s = n(15), i = r(s), a = n(74), c = n(1), u = c.notundef, l = c.exist, m = n(101), d = n(151),
            f = d.typeMap;
        o.validTypes = d.validTypes, c.merge(o.prototype, d.prototype), o.getType = d.getType, o.reverse = function (e) {
            var t = c.filterObj(e, "chatroomId idClient from fromNick fromAvatar fromCustom userUpdateTime custom status");
            return u(t.fromAvatar) && (t.fromAvatar = (0, a.genPrivateUrl)(t.fromAvatar)), t = c.merge(t, {
                fromClientType: m.reverseType(e.fromClientType),
                time: +e.time,
                type: o.getType(e),
                text: l(e.body) ? e.body : "",
                resend: 1 === +e.resend
            }), u(t.userUpdateTime) && (t.userUpdateTime = +t.userUpdateTime), t.status = t.status || "success", t
        }, o.setExtra = function (e, t) {
            d.setFlow(e, t)
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            a.verifyOptions(e, "scene to type", "msg::Message"), a.verifyParamValid("scene", e.scene, y, "msg::Message");
            var t = this;
            t.scene = p[e.scene], t.to = "" + e.to, t.type = h[e.type], t.resend = e.resend ? 1 : 0, e.resend ? (a.verifyOptions(e, "idClient", "msg::Message"), t.idClient = e.idClient) : t.idClient = a.guid(), u(e.text) && (t.body = "" + e.text), u(e.custom) && ("object" === (0, i["default"])(e.custom) ? (t.logger.warn("model::Message: custom should be JsonString, auto transfer"), t.custom = JSON.stringify(e.custom)) : t.custom = "" + e.custom), u(e.body) && (t.body = "" + e.body), u(e.pushContent) && (t.pushContent = "" + e.pushContent), u(e.pushPayload) && (t.pushPayload = "" + e.pushPayload);
            var n = e.apns;
            if (u(n) && "team" === e.scene) {
                var r = n.accounts;
                u(r) && a.verifyParamType("apns.accounts", r, "array", "msg::Message"), t.apnsAccounts = r ? JSON.stringify(r) : f, t.apnsContent = n.content || e.pushContent || "", a.verifyBooleanWithDefault(n, "forcePush", !0, "options.apns", "msg::Message"), t.apnsForcePush = n.forcePush ? 1 : 0
            }
            u(e.isHistoryable) && (t.isHistoryable = e.isHistoryable ? 1 : 0), u(e.isRoamingable) && (t.isRoamingable = e.isRoamingable ? 1 : 0), u(e.isSyncable) && (t.isSyncable = e.isSyncable ? 1 : 0), u(e.cc) && (t.cc = e.cc ? 1 : 0), u(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0), u(e.isOfflinable) && (t.isOfflinable = e.isOfflinable ? 1 : 0), u(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0), u(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0), u(e.needMsgReceipt) && (t.needMsgReceipt = e.needMsgReceipt ? 1 : 0), u(e.yidunEnable) && (t.yidunEnable = e.yidunEnable ? 1 : 0), u(e.antiSpamUsingYidun) && (t.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0), u(e.clientAntiSpam) && (t.clientAntiSpam = e.clientAntiSpam ? 1 : 0), u(e.antiSpamContent) && ("object" === (0, i["default"])(e.antiSpamContent) ? (t.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), t.antiSpamContent = JSON.stringify(e.antiSpamContent)) : t.antiSpamContent = "" + e.antiSpamContent), u(e.antiSpamBusinessId) && ("object" === (0, i["default"])(e.antiSpamBusinessId) ? (t.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), t.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : t.antiSpamBusinessId = "" + e.antiSpamBusinessId)
        }

        var s = n(15), i = r(s), a = n(1), c = a.undef, u = a.notundef, l = a.exist, m = n(101), d = n(151),
            f = "#%@all@%#", p = {p2p: 0, team: 1}, g = {0: "p2p", 1: "team"}, y = Object.keys(p), h = d.typeMap,
            v = d.validTypes;
        a.merge(o.prototype, d.prototype), o.prototype.getScene = function () {
            return g[this.scene]
        }, o.getType = d.getType, o.reverse = function (e) {
            var t = g[e.scene], n = {
                scene: t || e.scene,
                from: e.from,
                fromNick: e.fromNick,
                fromClientType: m.reverseType(e.fromClientType),
                fromDeviceId: e.fromDeviceId,
                to: "" + e.to,
                time: +e.time,
                type: o.getType(e),
                text: l(e.body) ? e.body : "",
                isHistoryable: c(e.isHistoryable) || 1 === +e.isHistoryable,
                isRoamingable: c(e.isRoamingable) || 1 === +e.isRoamingable,
                isSyncable: c(e.isSyncable) || 1 === +e.isSyncable,
                cc: c(e.cc) || 1 === +e.cc,
                isPushable: c(e.isPushable) || 1 === +e.isPushable,
                isOfflinable: c(e.isOfflinable) || 1 === +e.isOfflinable,
                isUnreadable: c(e.isUnreadable) || 1 === +e.isUnreadable,
                isReplyMsg: c(e.isReplyMsg) || 1 === +e.isReplyMsg,
                needPushNick: c(e.needPushNick) || 1 === +e.needPushNick,
                needMsgReceipt: 1 === +e.needMsgReceipt,
                isLocal: !1
            };
            if (u(e.isMuted) && (n.isMuted = 1 === +e.isMuted), u(e.resend) && (n.resend = 1 === +e.resend), u(e.idClient) && (n.idClient = e.idClient), u(e.idServer) && (n.idServer = "" + e.idServer), u(e.userUpdateTime) && (n.userUpdateTime = +e.userUpdateTime), u(e.custom) && (n.custom = e.custom), u(e.pushContent) && (n.pushContent = e.pushContent), u(e.pushPayload) && (n.pushPayload = e.pushPayload), u(e.tempTeamMemberCount) && (n.tempTeamMemberCount = +e.tempTeamMemberCount), u(e.apnsAccounts)) {
                if (n.apns = {}, e.apnsAccounts !== f) {
                    var r = e.apnsAccounts;
                    try {
                        n.apns.accounts = JSON.parse(r)
                    } catch (s) {
                        n.apns.accounts = []
                    }
                }
                n.apns.content = e.apnsContent || "", n.apns.forcePush = 1 === +e.apnsForcePush
            }
            return n.status = e.status || "success", u(e.filter) && (n.filter = e.filter), n
        }, o.setExtra = function (e, t) {
            e.target = o.getMsgTarget(e, t), e.sessionId = e.scene + "-" + e.target, d.setFlow(e, t)
        }, o.getMsgTarget = function (e, t) {
            return "p2p" === e.scene ? e.to === t ? e.from : e.to : "team" === e.scene ? e.to : void 0
        }, o.deduplication = function (e) {
            var t, n = {}, r = [];
            return e.forEach(function (e) {
                t = e.idClient, n[t] || (n[t] = !0, r.push(e))
            }), r
        }, o.sortMsgs = function (e) {
            return e = e.slice(0), a.sortObjArray(e, {sortPath: "time"}), e
        }, o.getLastMsg = function (e) {
            return e = o.sortMsgs(e), e[e.length - 1]
        }, o.getLastNotIgnoredMsg = function (e) {
            e = o.sortMsgs(e);
            for (var t = null, n = e.length - 1; n >= 0; n--) if (t = e[n], !t.ignore) return t;
            return null
        }, o.getMaxTimetag = function (e) {
            return o.getLastMsg(e).time
        }, o.validScenes = y, o.validTypes = v, e.exports = o
    }, , function (e, t, n) {
        var r = n(2).document;
        e.exports = r && r.documentElement
    }, function (e, t, n) {
        var r = n(36), o = Math.min;
        e.exports = function (e) {
            return e > 0 ? o(r(e), 9007199254740991) : 0
        }
    }, function (e, t) {
    }, function (e, t, n) {
        "use strict";
        var r = n(89)(!0);
        n(52)(String, "String", function (e) {
            this._t = String(e), this._i = 0
        }, function () {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {value: void 0, done: !0} : (e = r(t, n), this._i += e.length, {value: e, done: !1})
        })
    }, function (e, t, n) {
        n(91);
        for (var r = n(2), o = n(9), s = n(26), i = n(3)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < a.length; c++) {
            var u = a[c], l = r[u], m = l && l.prototype;
            m && !m[i] && o(m, i, u), s[u] = s.Array
        }
    }, , function (e, t, n) {
        "use strict";
        var r = n(4), o = {
            genUrlSep: function (e) {
                e = "" + e;
                var t = e.indexOf("?") === -1 ? "?imageView&" : "&";
                return t
            }, url2object: function (e) {
                e = e || "";
                var t = e.indexOf("https") >= 0 ? "https://" : "http://", n = e.replace(t, "");
                n.indexOf("?") >= 0 && (n = n.substring(0, n.indexOf("?")));
                var r = n.split("/");
                n = r[0];
                var o = "";
                if (r.length > 0 && (o = r.slice(1).join("/")), e.indexOf("?") === -1) return {
                    protocol: t,
                    hostname: n,
                    path: o,
                    query: {}
                };
                var s = e.substr(e.indexOf("?") + 1), i = s.split("&"), a = {};
                return i.forEach(function (e) {
                    if (e.indexOf("=") > 0) {
                        var t = e.split("=");
                        a[t[0]] = decodeURIComponent(t[1])
                    } else a[e] = ""
                }), {protocol: t, hostname: n, path: o, query: a}
            }, object2url: function (e) {
                var t = e.protocol, n = e.hostname, r = e.path, o = e.query;
                t = t || "http://", n = n || "", r && (n = n + "/" + r), o = o || {};
                var s = [];
                for (var i in o) "imageView" !== i && s.push(i + "=" + encodeURIComponent(o[i]));
                return s.length > 0 ? "" + t + n + "?imageView&" + s.join("&") : "" + t + n
            }, genPrivateUrl: function (e) {
                var t = o.url2object(e), n = t.hostname, s = t.path, i = r.downloadHost, a = r.downloadUrl;
                if (n === i) {
                    var c = s.indexOf("/");
                    if (c !== -1) {
                        var u = s.substring(0, c), l = s.substring(c + 1);
                        return a.replace("{bucket}", u).replace("{object}", l)
                    }
                } else {
                    if (n.indexOf(i) === -1) return e;
                    var m = t.path, d = m.indexOf(".");
                    if (d !== -1) {
                        var f = m.substring(0, d), p = m;
                        return a.replace("{bucket}", f).replace("{object}", p)
                    }
                }
            }
        };
        e.exports = o
    }, function (e, t, n) {
        e.exports = {"default": n(77), __esModule: !0}
    }, function (e, t, n) {
        e.exports = {"default": n(78), __esModule: !0}
    }, function (e, t, n) {
        n(92), n(70), n(93), n(94), e.exports = n(11).Symbol
    }, function (e, t, n) {
        n(71), n(72), e.exports = n(39).f("iterator")
    }, function (e, t) {
        e.exports = function () {
        }
    }, function (e, t, n) {
        var r = n(13), o = n(69), s = n(90);
        e.exports = function (e) {
            return function (t, n, i) {
                var a, c = r(t), u = o(c.length), l = s(i, u);
                if (e && n != n) {
                    for (; u > l;) if (a = c[l++], a != a) return !0
                } else for (; u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
                return !e && -1
            }
        }
    }, function (e, t, n) {
        var r = n(24), o = n(43), s = n(25);
        e.exports = function (e) {
            var t = r(e), n = o.f;
            if (n) for (var i, a = n(e), c = s.f, u = 0; a.length > u;) c.call(e, i = a[u++]) && t.push(i);
            return t
        }
    }, function (e, t, n) {
        var r = n(41);
        e.exports = Array.isArray || function (e) {
            return "Array" == r(e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(42), o = n(21), s = n(30), i = {};
        n(9)(i, n(3)("iterator"), function () {
            return this
        }), e.exports = function (e, t, n) {
            e.prototype = r(i, {next: o(1, n)}), s(e, t + " Iterator")
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            return {value: t, done: !!e}
        }
    }, function (e, t, n) {
        var r = n(22)("meta"), o = n(12), s = n(6), i = n(10).f, a = 0, c = Object.isExtensible || function () {
            return !0
        }, u = !n(19)(function () {
            return c(Object.preventExtensions({}))
        }), l = function (e) {
            i(e, r, {value: {i: "O" + ++a, w: {}}})
        }, m = function (e, t) {
            if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!s(e, r)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                l(e)
            }
            return e[r].i
        }, d = function (e, t) {
            if (!s(e, r)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                l(e)
            }
            return e[r].w
        }, f = function (e) {
            return u && p.NEED && c(e) && !s(e, r) && l(e), e
        }, p = e.exports = {KEY: r, NEED: !1, fastKey: m, getWeak: d, onFreeze: f}
    }, function (e, t, n) {
        var r = n(10), o = n(14), s = n(24);
        e.exports = n(8) ? Object.defineProperties : function (e, t) {
            o(e);
            for (var n, i = s(t), a = i.length, c = 0; a > c;) r.f(e, n = i[c++], t[n]);
            return e
        }
    }, function (e, t, n) {
        var r = n(13), o = n(53).f, s = {}.toString,
            i = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
            a = function (e) {
                try {
                    return o(e)
                } catch (t) {
                    return i.slice()
                }
            };
        e.exports.f = function (e) {
            return i && "[object Window]" == s.call(e) ? a(e) : o(r(e))
        }
    }, function (e, t, n) {
        var r = n(6), o = n(60), s = n(34)("IE_PROTO"), i = Object.prototype;
        e.exports = Object.getPrototypeOf || function (e) {
            return e = o(e), r(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? i : null
        }
    }, function (e, t, n) {
        var r = n(36), o = n(32);
        e.exports = function (e) {
            return function (t, n) {
                var s, i, a = String(o(t)), c = r(n), u = a.length;
                return c < 0 || c >= u ? e ? "" : void 0 : (s = a.charCodeAt(c), s < 55296 || s > 56319 || c + 1 === u || (i = a.charCodeAt(c + 1)) < 56320 || i > 57343 ? e ? a.charAt(c) : s : e ? a.slice(c, c + 2) : (s - 55296 << 10) + (i - 56320) + 65536)
            }
        }
    }, function (e, t, n) {
        var r = n(36), o = Math.max, s = Math.min;
        e.exports = function (e, t) {
            return e = r(e), e < 0 ? o(e + t, 0) : s(e, t)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(79), o = n(84), s = n(26), i = n(13);
        e.exports = n(52)(Array, "Array", function (e, t) {
            this._t = i(e), this._i = 0, this._k = t
        }, function () {
            var e = this._t, t = this._k, n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [n, e[n]])
        }, "values"), s.Arguments = s.Array, r("keys"), r("values"), r("entries")
    }, function (e, t, n) {
        "use strict";
        var r = n(2), o = n(6), s = n(8), i = n(18), a = n(55), c = n(85).KEY, u = n(19), l = n(35), m = n(30),
            d = n(22), f = n(3), p = n(39), g = n(38), y = n(81), h = n(82), v = n(14), b = n(12), M = n(13), T = n(37),
            k = n(21), S = n(42), w = n(87), C = n(59), O = n(10), I = n(24), x = C.f, _ = O.f, P = w.f, E = r.Symbol,
            A = r.JSON, j = A && A.stringify, R = "prototype", F = f("_hidden"), N = f("toPrimitive"),
            U = {}.propertyIsEnumerable, D = l("symbol-registry"), L = l("symbols"), B = l("op-symbols"), q = Object[R],
            W = "function" == typeof E, H = r.QObject, J = !H || !H[R] || !H[R].findChild, $ = s && u(function () {
                return 7 != S(_({}, "a", {
                    get: function () {
                        return _(this, "a", {value: 7}).a
                    }
                })).a
            }) ? function (e, t, n) {
                var r = x(q, t);
                r && delete q[t], _(e, t, n), r && e !== q && _(q, t, r)
            } : _, X = function (e) {
                var t = L[e] = S(E[R]);
                return t._k = e, t
            }, V = W && "symbol" == typeof E.iterator ? function (e) {
                return "symbol" == typeof e
            } : function (e) {
                return e instanceof E
            }, z = function (e, t, n) {
                return e === q && z(B, t, n), v(e), t = T(t, !0), v(n), o(L, t) ? (n.enumerable ? (o(e, F) && e[F][t] && (e[F][t] = !1), n = S(n, {enumerable: k(0, !1)})) : (o(e, F) || _(e, F, k(1, {})), e[F][t] = !0), $(e, t, n)) : _(e, t, n)
            }, K = function (e, t) {
                v(e);
                for (var n, r = y(t = M(t)), o = 0, s = r.length; s > o;) z(e, n = r[o++], t[n]);
                return e
            }, G = function (e, t) {
                return void 0 === t ? S(e) : K(S(e), t)
            }, Y = function (e) {
                var t = U.call(this, e = T(e, !0));
                return !(this === q && o(L, e) && !o(B, e)) && (!(t || !o(this, e) || !o(L, e) || o(this, F) && this[F][e]) || t)
            }, Q = function (e, t) {
                if (e = M(e), t = T(t, !0), e !== q || !o(L, t) || o(B, t)) {
                    var n = x(e, t);
                    return !n || !o(L, t) || o(e, F) && e[F][t] || (n.enumerable = !0), n
                }
            }, Z = function (e) {
                for (var t, n = P(M(e)), r = [], s = 0; n.length > s;) o(L, t = n[s++]) || t == F || t == c || r.push(t);
                return r
            }, ee = function (e) {
                for (var t, n = e === q, r = P(n ? B : M(e)), s = [], i = 0; r.length > i;) !o(L, t = r[i++]) || n && !o(q, t) || s.push(L[t]);
                return s
            };
        W || (E = function () {
            if (this instanceof E) throw TypeError("Symbol is not a constructor!");
            var e = d(arguments.length > 0 ? arguments[0] : void 0), t = function (n) {
                this === q && t.call(B, n), o(this, F) && o(this[F], e) && (this[F][e] = !1), $(this, e, k(1, n))
            };
            return s && J && $(q, e, {configurable: !0, set: t}), X(e)
        }, a(E[R], "toString", function () {
            return this._k
        }), C.f = Q, O.f = z, n(53).f = w.f = Z, n(25).f = Y, n(43).f = ee, s && !n(29) && a(q, "propertyIsEnumerable", Y, !0), p.f = function (e) {
            return X(f(e))
        }), i(i.G + i.W + i.F * !W, {Symbol: E});
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) f(te[ne++]);
        for (var re = I(f.store), oe = 0; re.length > oe;) g(re[oe++]);
        i(i.S + i.F * !W, "Symbol", {
            "for": function (e) {
                return o(D, e += "") ? D[e] : D[e] = E(e)
            }, keyFor: function (e) {
                if (!V(e)) throw TypeError(e + " is not a symbol!");
                for (var t in D) if (D[t] === e) return t
            }, useSetter: function () {
                J = !0
            }, useSimple: function () {
                J = !1
            }
        }), i(i.S + i.F * !W, "Object", {
            create: G,
            defineProperty: z,
            defineProperties: K,
            getOwnPropertyDescriptor: Q,
            getOwnPropertyNames: Z,
            getOwnPropertySymbols: ee
        }), A && i(i.S + i.F * (!W || u(function () {
            var e = E();
            return "[null]" != j([e]) || "{}" != j({a: e}) || "{}" != j(Object(e))
        })), "JSON", {
            stringify: function (e) {
                for (var t, n, r = [e], o = 1; arguments.length > o;) r.push(arguments[o++]);
                if (n = t = r[1], (b(t) || void 0 !== e) && !V(e)) return h(t) || (t = function (e, t) {
                    if ("function" == typeof n && (t = n.call(this, e, t)), !V(t)) return t
                }), r[1] = t, j.apply(A, r)
            }
        }), E[R][N] || n(9)(E[R], N, E[R].valueOf), m(E, "Symbol"), m(Math, "Math", !0), m(r.JSON, "JSON", !0)
    }, function (e, t, n) {
        n(38)("asyncIterator")
    }, function (e, t, n) {
        n(38)("observable")
    }, function (e, t, n) {
        var r, o;
        !function (s, i) {
            "use strict";
            r = i, o = "function" == typeof r ? r.call(t, n, t, e) : r, !(void 0 !== o && (e.exports = o))
        }(this, function () {
            var e, t, n, r, o = Function.call, s = Object.prototype, i = o.bind(s.hasOwnProperty),
                a = o.bind(s.propertyIsEnumerable), c = o.bind(s.toString), u = i(s, "__defineGetter__");
            u && (e = o.bind(s.__defineGetter__), t = o.bind(s.__defineSetter__), n = o.bind(s.__lookupGetter__), r = o.bind(s.__lookupSetter__));
            var l = function (e) {
                return null == e || "object" != typeof e && "function" != typeof e
            };
            Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
                var t = e.__proto__;
                return t || null === t ? t : "[object Function]" === c(e.constructor) ? e.constructor.prototype : e instanceof Object ? s : null
            });
            var m = function (e) {
                try {
                    return e.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(e, "sentinel").value
                } catch (t) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var d = m({}), f = "undefined" == typeof document || m(document.createElement("div"));
                if (!f || !d) var p = Object.getOwnPropertyDescriptor
            }
            if (!Object.getOwnPropertyDescriptor || p) {
                var g = "Object.getOwnPropertyDescriptor called on a non-object: ";
                Object.getOwnPropertyDescriptor = function (e, t) {
                    if (l(e)) throw new TypeError(g + e);
                    if (p) try {
                        return p.call(Object, e, t)
                    } catch (o) {
                    }
                    var c;
                    if (!i(e, t)) return c;
                    if (c = {enumerable: a(e, t), configurable: !0}, u) {
                        var m = e.__proto__, d = e !== s;
                        d && (e.__proto__ = s);
                        var f = n(e, t), y = r(e, t);
                        if (d && (e.__proto__ = m), f || y) return f && (c.get = f), y && (c.set = y), c
                    }
                    return c.value = e[t], c.writable = !0, c
                }
            }
            if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (e) {
                    return Object.keys(e)
                }), !Object.create) {
                var y, h = !({__proto__: null} instanceof Object), v = function () {
                    if (!document.domain) return !1;
                    try {
                        return !!new ActiveXObject("htmlfile")
                    } catch (e) {
                        return !1
                    }
                }, b = function () {
                    var e, t;
                    t = new ActiveXObject("htmlfile");
                    var n = "script";
                    return t.write("<" + n + "></" + n + ">"), t.close(), e = t.parentWindow.Object.prototype, t = null, e
                }, M = function () {
                    var e, t = document.createElement("iframe"), n = document.body || document.documentElement;
                    return t.style.display = "none", n.appendChild(t), t.src = "javascript:", e = t.contentWindow.Object.prototype, n.removeChild(t), t = null, e
                };
                y = h || "undefined" == typeof document ? function () {
                    return {__proto__: null}
                } : function () {
                    var e = v() ? b() : M();
                    delete e.constructor, delete e.hasOwnProperty, delete e.propertyIsEnumerable, delete e.isPrototypeOf, delete e.toLocaleString, delete e.toString, delete e.valueOf;
                    var t = function () {
                    };
                    return t.prototype = e, y = function () {
                        return new t
                    }, new t
                }, Object.create = function (e, t) {
                    var n, r = function () {
                    };
                    if (null === e) n = y(); else {
                        if (null !== e && l(e)) throw new TypeError("Object prototype may only be an Object or null");
                        r.prototype = e, n = new r, n.__proto__ = e
                    }
                    return void 0 !== t && Object.defineProperties(n, t), n
                }
            }
            var T = function (e) {
                try {
                    return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
                } catch (t) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var k = T({}), S = "undefined" == typeof document || T(document.createElement("div"));
                if (!k || !S) var w = Object.defineProperty, C = Object.defineProperties
            }
            if (!Object.defineProperty || w) {
                var O = "Property description must be an object: ", I = "Object.defineProperty called on non-object: ",
                    x = "getters & setters can not be defined on this javascript engine";
                Object.defineProperty = function (o, i, a) {
                    if (l(o)) throw new TypeError(I + o);
                    if (l(a)) throw new TypeError(O + a);
                    if (w) try {
                        return w.call(Object, o, i, a)
                    } catch (c) {
                    }
                    if ("value" in a) if (u && (n(o, i) || r(o, i))) {
                        var m = o.__proto__;
                        o.__proto__ = s, delete o[i], o[i] = a.value, o.__proto__ = m
                    } else o[i] = a.value; else {
                        var d = "get" in a, f = "set" in a;
                        if (!u && (d || f)) throw new TypeError(x);
                        d && e(o, i, a.get), f && t(o, i, a.set)
                    }
                    return o
                }
            }
            Object.defineProperties && !C || (Object.defineProperties = function (e, t) {
                if (C) try {
                    return C.call(Object, e, t)
                } catch (n) {
                }
                return Object.keys(t).forEach(function (n) {
                    "__proto__" !== n && Object.defineProperty(e, n, t[n])
                }), e
            }), Object.seal || (Object.seal = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.seal can only be called on Objects.");
                return e
            }), Object.freeze || (Object.freeze = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.freeze can only be called on Objects.");
                return e
            });
            try {
                Object.freeze(function () {
                })
            } catch (_) {
                Object.freeze = function (e) {
                    return function (t) {
                        return "function" == typeof t ? t : e(t)
                    }
                }(Object.freeze)
            }
            Object.preventExtensions || (Object.preventExtensions = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.preventExtensions can only be called on Objects.");
                return e
            }), Object.isSealed || (Object.isSealed = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.isSealed can only be called on Objects.");
                return !1
            }), Object.isFrozen || (Object.isFrozen = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.isFrozen can only be called on Objects.");
                return !1
            }), Object.isExtensible || (Object.isExtensible = function (e) {
                if (Object(e) !== e) throw new TypeError("Object.isExtensible can only be called on Objects.");
                for (var t = ""; i(e, t);) t += "?";
                e[t] = !0;
                var n = i(e, t);
                return delete e[t], n
            })
        })
    }, function (e, t) {
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            this.mixin(e)
        }

        var o = n(1), s = o.undef, i = n(27), a = n(144), c = n(169), u = n(171), l = n(167), m = n(168), d = n(170);
        r.prototype.mixin = function (e) {
            var t = this;
            this.configMap = this.configMap || {}, ["idMap", "cmdConfig", "packetConfig"].forEach(function (n) {
                t.configMap[n] = o.merge({}, t.configMap[n], e.configMap && e.configMap[n])
            }), ["serializeMap", "unserializeMap"].forEach(function (n) {
                t[n] = o.merge({}, t[n], e[n])
            })
        };
        var f = new r({configMap: a, serializeMap: c, unserializeMap: u}),
            p = new r({configMap: l, serializeMap: m, unserializeMap: d});
        r.getInstance = function (e) {
            switch (e) {
                case"IM":
                    return f;
                case"Chatroom":
                    return p
            }
        }, r.prototype.createCmd = function () {
            var e = 1;
            return function (t, n) {
                var r = this, o = this.configMap.cmdConfig[t];
                return t = {
                    SID: o.sid,
                    CID: o.cid,
                    SER: "heartbeat" === t ? 0 : e++
                }, o.params && (t.Q = [], o.params.forEach(function (e) {
                    var o = e.type, i = e.name, a = e.entity, c = n[i];
                    if (!s(c)) {
                        switch (o) {
                            case"PropertyArray":
                                o = "ArrayMable", c = c.map(function (e) {
                                    return {t: "Property", v: r.serialize(e, a)}
                                });
                                break;
                            case"Property":
                                c = r.serialize(c, i);
                                break;
                            case"bool":
                                c = c ? "true" : "false"
                        }
                        t.Q.push({t: o, v: c})
                    }
                })), t
            }
        }(), r.prototype.parseResponse = function (e) {
            var t = this, n = JSON.parse(e), r = {raw: n, rawStr: e, error: i.genError(n.code)},
                s = t.configMap.packetConfig[n.sid + "_" + n.cid];
            if (!s) return r.notFound = {sid: n.sid, cid: n.cid}, r;
            var a = n.r, c = "notify" === s.service && !s.cmd;
            if (r.isNotify = c, c) {
                var u = n.r[1].headerPacket;
                if (s = t.configMap.packetConfig[u.sid + "_" + u.cid], a = n.r[1].body, !s) return r.notFound = {
                    sid: u.sid,
                    cid: u.cid
                }, r
            }
            if (r.service = s.service, r.cmd = s.cmd, r.error) {
                var l = n.sid + "_" + n.cid;
                if (c && (l = u.sid + "_" + u.cid), r.error.cmd = r.cmd, r.error.callFunc = "protocol::parseResponse: " + l, 416 === r.error.code) {
                    var m = a[0];
                    m && (r.frequencyControlDuration = 1e3 * m)
                }
            }
            var d = !1;
            return r.error && s.trivialErrorCodes && (d = s.trivialErrorCodes.indexOf(r.error.code) !== -1), r.error && !d || !s.response || (r.content = {}, s.response.forEach(function (e, s) {
                var i = a[s];
                if (!o.undef(i)) {
                    var u = e.type, l = e.name, m = e.entity || l;
                    switch (u) {
                        case"Property":
                            r.content[l] = t.unserialize(i, m);
                            break;
                        case"PropertyArray":
                            r.content[l] = [], i.forEach(function (e) {
                                r.content[l].push(t.unserialize(e, m))
                            });
                            break;
                        case"KVArray":
                            r.content[l] = i;
                            break;
                        case"long":
                        case"Long":
                        case"byte":
                        case"Byte":
                        case"Number":
                            r.content[l] = +i;
                            break;
                        default:
                            r.content[l] = i
                    }
                    if (c && "msg" === l || "sysMsg" === l) {
                        var d = r.content[l];
                        o.isObject(d) && !d.idServer && (d.idServer = "" + n.r[0], d.type && "8" === d.type && d.deletedIdClient && (d.idServer = d.deletedIdClient))
                    }
                }
            })), r
        }, r.prototype.serialize = function (e, t) {
            var n = this.serializeMap[t], r = {};
            for (var o in n) e.hasOwnProperty(o) && (r[n[o]] = e[o]);
            return r
        }, r.prototype.unserialize = function (e, t) {
            var n = this.unserializeMap[t], r = {};
            if (e) for (var o in n) e.hasOwnProperty(o) && (r[n[o]] = e[o]);
            return r
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            o.verifyOptions(e, "teamId", "team::TeamMember"), o.verifyParamAtLeastPresentOne(e, "nickInTeam muteTeam muteNotiType custom", "team::TeamMember"), t.teamId = e.teamId, s(e.account) && (t.account = e.account), s(e.nickInTeam) && (t.nickInTeam = e.nickInTeam), s(e.muteNotiType) ? t.bits = e.muteNotiType : s(e.muteTeam) && (t.bits = 0, e.muteTeam && (t.bits += 1)), s(e.mute) && (t.mute = e.mute ? 1 : 0), s(e.custom) && (t.custom = "" + e.custom)
        }

        var o = n(1), s = o.notundef, i = o.fillPropertyWithDefault, a = {0: "normal", 1: "owner", 2: "manager"};
        r.reverse = function (e) {
            var t = o.copy(e);
            if (s(t.teamId) && (t.teamId = "" + t.teamId), s(t.type) && (t.type = a[t.type]), s(t.active) && (t.active = 1 === +t.active), s(t.valid) && (t.valid = 1 === +t.valid), s(t.mute) && (t.mute = 1 === +t.mute), s(t.joinTime) && (t.joinTime = +t.joinTime), s(t.updateTime) && (t.updateTime = +t.updateTime), s(t.bits)) {
                var n = t.bits;
                delete t.bits, t.muteTeam = !!(1 & n), t.muteNotiType = n
            }
            return s(t.teamId) && s(t.account) && (t.id = r.genId(t.teamId, t.account)), t
        }, r.reverseMembers = function (e) {
            return e.map(function (e) {
                return r.reverse(e)
            })
        }, r.fillProperties = function (e) {
            var t = i(e, "mute", !1), n = i(e, "custom", "");
            return t || n
        }, r.genId = function (e, t) {
            return e + "-" + t
        }, r.accounts2ids = function (e, t) {
            return t.map(function (t) {
                return r.genId(e, t)
            })
        }, r.assembleMembers = function (e, t) {
            return o.isArray(t) || (t = [t]), t.map(function (t) {
                return r.assembleMember(e, t)
            })
        }, r.assembleMember = function (e, t) {
            return {
                id: r.genId(e.teamId, t),
                account: t,
                teamId: e.teamId,
                type: "normal",
                nickInTeam: "",
                muteTeam: !1,
                mute: !1,
                joinTime: e.memberUpdateTime,
                updateTime: e.memberUpdateTime,
                active: !0,
                valid: !0
            }
        }, r.assembleOwner = function (e) {
            var t = r.assembleMember(e, e.owner);
            return t.type = "owner", t
        }, e.exports = r
    }, , function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function (module) {/*! Socket.IO.js build:0.9.11, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
            var io = module.exports;
            window.io ? module && (module.exports = io = window.io) : window.io = io, function () {
                if (function (e, t) {
                        var n = e;
                        n.version = "0.9.11", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function (e, r) {
                            var o, s, i = n.util.parseUri(e);
                            t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port), o = n.util.uniqueUri(i);
                            var a = {
                                host: i.host,
                                secure: "https" == i.protocol,
                                port: i.port || ("https" == i.protocol ? 443 : 80),
                                query: i.query || ""
                            };
                            return n.util.merge(a, r), !a["force new connection"] && n.sockets[o] || (s = new n.Socket(a)), !a["force new connection"] && s && (n.sockets[o] = s), s = s || n.sockets[o], s.of(i.path.length > 1 ? i.path : "")
                        }
                    }(module.exports, window), function (e, t) {
                        var n = e.util = {},
                            r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                            o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                        n.parseUri = function (e) {
                            for (var t = r.exec(e || ""), n = {}, s = 14; s--;) n[o[s]] = t[s] || "";
                            return n
                        }, n.uniqueUri = function (e) {
                            var n = e.protocol, r = e.host, o = e.port;
                            return "document" in t ? (r = r || document.domain, o = o || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (r = r || "localhost", o || "https" != n || (o = 443)), (n || "http") + "://" + r + ":" + (o || 80)
                        }, n.query = function (e, t) {
                            var r = n.chunkQuery(e || ""), o = [];
                            n.merge(r, n.chunkQuery(t || ""));
                            for (var s in r) r.hasOwnProperty(s) && o.push(s + "=" + r[s]);
                            return o.length ? "?" + o.join("&") : ""
                        }, n.chunkQuery = function (e) {
                            for (var t, n = {}, r = e.split("&"), o = 0, s = r.length; o < s; ++o) t = r[o].split("="), t[0] && (n[t[0]] = t[1]);
                            return n
                        };
                        var s = !1;
                        n.load = function (e) {
                            return "document" in t && "complete" === document.readyState || s ? e() : void n.on(t, "load", e, !1)
                        }, n.on = function (e, t, n, r) {
                            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r)
                        }, n.request = function (e) {
                            if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS) return new XDomainRequest;
                            if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
                            if (!e) try {
                                return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                            } catch (t) {
                            }
                            return null
                        }, "undefined" != typeof window && n.load(function () {
                            s = !0
                        }), n.defer = function (e) {
                            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function () {
                                setTimeout(e, 100)
                            }) : e()
                        }, n.merge = function (e, t, r, o) {
                            var s, i = o || [], a = "undefined" == typeof r ? 2 : r;
                            for (s in t) t.hasOwnProperty(s) && n.indexOf(i, s) < 0 && ("object" == typeof e[s] && a ? n.merge(e[s], t[s], a - 1, i) : (e[s] = t[s], i.push(t[s])));
                            return e
                        }, n.mixin = function (e, t) {
                            n.merge(e.prototype, t.prototype)
                        }, n.inherit = function (e, t) {
                            function n() {
                            }

                            n.prototype = t.prototype, e.prototype = new n
                        }, n.isArray = Array.isArray || function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }, n.intersect = function (e, t) {
                            for (var r = [], o = e.length > t.length ? e : t, s = e.length > t.length ? t : e, i = 0, a = s.length; i < a; i++) ~n.indexOf(o, s[i]) && r.push(s[i]);
                            return r
                        }, n.indexOf = function (e, t, n) {
                            for (var r = e.length, n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++) ;
                            return r <= n ? -1 : n
                        }, n.toArray = function (e) {
                            for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
                            return t
                        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function () {
                            try {
                                var e = new XMLHttpRequest
                            } catch (t) {
                                return !1
                            }
                            return void 0 != e.withCredentials
                        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
                    }("undefined" != typeof io ? io : module.exports, window), function (e, t) {
                        function n() {
                        }

                        e.EventEmitter = n, n.prototype.on = function (e, n) {
                            return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this
                        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function (e, t) {
                            function n() {
                                r.removeListener(e, n), t.apply(this, arguments)
                            }

                            var r = this;
                            return n.listener = t, this.on(e, n), this
                        }, n.prototype.removeListener = function (e, n) {
                            if (this.$events && this.$events[e]) {
                                var r = this.$events[e];
                                if (t.util.isArray(r)) {
                                    for (var o = -1, s = 0, i = r.length; s < i; s++) if (r[s] === n || r[s].listener && r[s].listener === n) {
                                        o = s;
                                        break
                                    }
                                    if (o < 0) return this;
                                    r.splice(o, 1), r.length || delete this.$events[e]
                                } else (r === n || r.listener && r.listener === n) && delete this.$events[e]
                            }
                            return this
                        }, n.prototype.removeAllListeners = function (e) {
                            return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this)
                        }, n.prototype.listeners = function (e) {
                            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
                        }, n.prototype.emit = function (e) {
                            if (!this.$events) return !1;
                            var n = this.$events[e];
                            if (!n) return !1;
                            var r = Array.prototype.slice.call(arguments, 1);
                            if ("function" == typeof n) n.apply(this, r); else {
                                if (!t.util.isArray(n)) return !1;
                                for (var o = n.slice(), s = 0, i = o.length; s < i; s++) o[s].apply(this, r)
                            }
                            return !0
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (exports, nativeJSON) {
                        "use strict";

                        function f(e) {
                            return e < 10 ? "0" + e : e
                        }

                        function date(e, t) {
                            return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null
                        }

                        function quote(e) {
                            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                                var t = meta[e];
                                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                            }) + '"' : '"' + e + '"'
                        }

                        function str(e, t) {
                            var n, r, o, s, i, a = gap, c = t[e];
                            switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                                case"string":
                                    return quote(c);
                                case"number":
                                    return isFinite(c) ? String(c) : "null";
                                case"boolean":
                                case"null":
                                    return String(c);
                                case"object":
                                    if (!c) return "null";
                                    if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                                        for (s = c.length, n = 0; n < s; n += 1) i[n] = str(n, c) || "null";
                                        return o = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + a + "]" : "[" + i.join(",") + "]", gap = a, o
                                    }
                                    if (rep && "object" == typeof rep) for (s = rep.length, n = 0; n < s; n += 1) "string" == typeof rep[n] && (r = rep[n], o = str(r, c), o && i.push(quote(r) + (gap ? ": " : ":") + o)); else for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (o = str(r, c), o && i.push(quote(r) + (gap ? ": " : ":") + o));
                                    return o = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + a + "}" : "{" + i.join(",") + "}", gap = a, o
                            }
                        }

                        if (nativeJSON && nativeJSON.parse) return exports.JSON = {
                            parse: nativeJSON.parse,
                            stringify: nativeJSON.stringify
                        };
                        var JSON = exports.JSON = {},
                            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                            gap, indent, meta = {
                                "\b": "\\b",
                                "\t": "\\t",
                                "\n": "\\n",
                                "\f": "\\f",
                                "\r": "\\r",
                                '"': '\\"',
                                "\\": "\\\\"
                            }, rep;
                        JSON.stringify = function (e, t, n) {
                            var r;
                            if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1) indent += " "; else "string" == typeof n && (indent = n);
                            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("socket.io:: replacer cannot JSON.stringify");
                            return str("", {"": e})
                        }, JSON.parse = function (text, reviver) {
                            function walk(e, t) {
                                var n, r, o = e[t];
                                if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
                                return reviver.call(e, t, o)
                            }

                            var j;
                            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
                            throw new SyntaxError("socket.io:: reviver cannot JSON.parse")
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function (e, t) {
                        var n = e.parser = {},
                            r = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
                            o = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
                            s = n.advice = ["reconnect"], i = t.JSON, a = t.util.indexOf;
                        n.encodePacket = function (e) {
                            var t = a(r, e.type), n = e.id || "", c = e.endpoint || "", u = e.ack, l = null;
                            switch (e.type) {
                                case"error":
                                    var m = e.reason ? a(o, e.reason) : "", d = e.advice ? a(s, e.advice) : "";
                                    "" === m && "" === d || (l = m + ("" !== d ? "+" + d : ""));
                                    break;
                                case"message":
                                    "" !== e.data && (l = e.data);
                                    break;
                                case"event":
                                    var f = {name: e.name};
                                    e.args && e.args.length && (f.args = e.args), l = i.stringify(f);
                                    break;
                                case"json":
                                    l = i.stringify(e.data);
                                    break;
                                case"connect":
                                    e.qs && (l = e.qs);
                                    break;
                                case"ack":
                                    l = e.ackId + (e.args && e.args.length ? "+" + i.stringify(e.args) : "")
                            }
                            var p = [t, n + ("data" == u ? "+" : ""), c];
                            return null !== l && void 0 !== l && p.push(l), p.join(":")
                        }, n.encodePayload = function (e) {
                            var t = "";
                            if (1 == e.length) return e[0];
                            for (var n = 0, r = e.length; n < r; n++) {
                                var o = e[n];
                                t += "�" + o.length + "�" + e[n]
                            }
                            return t
                        };
                        var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
                        n.decodePacket = function (e) {
                            var t = e.match(c);
                            if (!t) return {};
                            var n = t[2] || "", e = t[5] || "", a = {type: r[t[1]], endpoint: t[4] || ""};
                            switch (n && (a.id = n, t[3] ? a.ack = "data" : a.ack = !0), a.type) {
                                case"error":
                                    var t = e.split("+");
                                    a.reason = o[t[0]] || "", a.advice = s[t[1]] || "";
                                    break;
                                case"message":
                                    a.data = e || "";
                                    break;
                                case"event":
                                    try {
                                        var u = i.parse(e);
                                        a.name = u.name, a.args = u.args
                                    } catch (l) {
                                    }
                                    a.args = a.args || [];
                                    break;
                                case"json":
                                    try {
                                        a.data = i.parse(e)
                                    } catch (l) {
                                    }
                                    break;
                                case"connect":
                                    a.qs = e || "";
                                    break;
                                case"ack":
                                    var t = e.match(/^([0-9]+)(\+)?(.*)/);
                                    if (t && (a.ackId = t[1], a.args = [], t[3])) try {
                                        a.args = t[3] ? i.parse(t[3]) : []
                                    } catch (l) {
                                    }
                                    break;
                                case"disconnect":
                                case"heartbeat":
                            }
                            return a
                        }, n.decodePayload = function (e) {
                            var t = function (e, t) {
                                for (var n = 0, r = e; r < t.length; r++) {
                                    if ("�" == t.charAt(r)) return n;
                                    n++
                                }
                                return n
                            };
                            if ("�" == e.charAt(0)) {
                                for (var r = [], o = 1, s = ""; o < e.length; o++) if ("�" == e.charAt(o)) {
                                    var i = e.substr(o + 1).substr(0, s);
                                    if ("�" != e.charAt(o + 1 + Number(s)) && o + 1 + Number(s) != e.length) {
                                        var a = Number(s);
                                        l = t(o + a + 1, e), i = e.substr(o + 1).substr(0, a + l), o += l
                                    }
                                    r.push(n.decodePacket(i)), o += Number(s) + 1, s = ""
                                } else s += e.charAt(o);
                                return r
                            }
                            return [n.decodePacket(e)]
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.sessid = t
                        }

                        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function () {
                            return !0
                        }, n.prototype.onData = function (e) {
                            if (this !== this.socket.transport) return this;
                            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e) {
                                var n = t.parser.decodePayload(e);
                                if (n && n.length) for (var r = 0, o = n.length; r < o; r++) this.onPacket(n[r])
                            }
                            return this
                        }, n.prototype.onPacket = function (e) {
                            return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
                        }, n.prototype.setCloseTimeout = function () {
                            if (!this.closeTimeout) {
                                var e = this;
                                this.closeTimeout = setTimeout(function () {
                                    e.onDisconnect()
                                }, this.socket.closeTimeout)
                            }
                        }, n.prototype.onDisconnect = function () {
                            return this.isOpen && this.close(), this.clearTimeouts(), this.socket.transport === this ? this.socket.onDisconnect() : this.socket.setBuffer(!1), this
                        }, n.prototype.onConnect = function () {
                            return this.socket.onConnect(), this
                        }, n.prototype.clearCloseTimeout = function () {
                            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
                        }, n.prototype.clearTimeouts = function () {
                            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
                        }, n.prototype.packet = function (e) {
                            this.send(t.parser.encodePacket(e))
                        }, n.prototype.onHeartbeat = function (e) {
                            this.packet({type: "heartbeat"})
                        }, n.prototype.onOpen = function () {
                            this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
                        }, n.prototype.onClose = function () {
                            this.isOpen = !1, this.socket.transport === this ? this.socket.onClose() : this.socket.setBuffer(!1), this.onDisconnect()
                        }, n.prototype.prepareUrl = function () {
                            var e = this.socket.options;
                            return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
                        }, n.prototype.ready = function (e, t) {
                            t.call(this)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function r(e) {
                            if (this.options = {
                                    port: 80,
                                    secure: !1,
                                    document: "document" in n && document,
                                    resource: "socket.io",
                                    transports: e.transports || t.transports,
                                    "connect timeout": 1e4,
                                    "try multiple transports": !0,
                                    reconnect: !0,
                                    "reconnection delay": 500,
                                    "reconnection limit": 1 / 0,
                                    "reopen delay": 3e3,
                                    "max reconnection attempts": 10,
                                    "sync disconnect on unload": !1,
                                    "auto connect": !0,
                                    "flash policy port": 10843,
                                    manualFlush: !1
                                }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                                var r = this;
                                t.util.on(n, "beforeunload", function () {
                                    r.disconnectSync()
                                }, !1)
                            }
                            this.options["auto connect"] && this.connect()
                        }

                        function o() {
                        }

                        e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function (e) {
                            return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({type: "connect"})), this.namespaces[e]
                        }, r.prototype.publish = function () {
                            this.emit.apply(this, arguments);
                            var e;
                            for (var t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
                        }, r.prototype.handshake = function (e) {
                            function n(t) {
                                t instanceof Error ? (r.connecting = !1, r.onError(t.message)) : (console.log("D handshake success " + t), e.apply(null, t.split(":")))
                            }

                            var r = this, s = this.options,
                                i = ["http" + (s.secure ? "s" : "") + ":/", s.host + ":" + s.port, s.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
                            if (this.isXDomain() && !t.util.ua.hasCORS && document && document.getElementsByTagName) {
                                var a = document.getElementsByTagName("script")[0],
                                    c = document.createElement("script");
                                c.src = i + "&jsonp=" + t.j.length, c.onreadystatechange = function () {
                                    "loaded" == this.readyState && c.parentNode && (c.parentNode.removeChild(c), r.connecting = !1, !r.reconnecting && r.onError("Server down or port not open"), r.publish("handshake_failed"))
                                }, a.parentNode.insertBefore(c, a), t.j.push(function (e) {
                                    n(e), c.parentNode.removeChild(c)
                                })
                            } else {
                                var u = t.util.request();
                                u.open("GET", i, !0), u.timeout = 1e4, this.isXDomain() && (u.withCredentials = !0), u.onreadystatechange = function () {
                                    4 == u.readyState && (u.onreadystatechange = o, 200 == u.status ? n(u.responseText) : 403 == u.status ? (r.onError(u.responseText), r.publish("handshake_failed")) : (r.connecting = !1, !r.reconnecting && r.onError(u.responseText), r.publish("handshake_failed")))
                                }, u.ontimeout = function (e) {
                                    r.connecting = !1, !r.reconnecting && r.onError(u.responseText), r.publish("handshake_failed")
                                }, u.send(null)
                            }
                        }, r.prototype.connect = function (e) {
                            if (this.connecting) return this;
                            var n = this;
                            return n.connecting = !0, this.handshake(function (r, o, s, i) {
                                n.sessionid = r, n.closeTimeout = 1e3 * s, n.heartbeatTimeout = 1e3 * o, n.transports || (n.transports = n.origTransports = i ? t.util.intersect(i.split(","), n.options.transports) : n.options.transports), console.log("D options transports: " + n.options.transports), console.log("D transports: " + n.transports), n.setHeartbeatTimeout(), n.once("connect", function () {
                                    clearTimeout(n.connectTimeoutTimer), n.connectTimeoutTimer = null, e && "function" == typeof e && e()
                                }), n.doConnect()
                            }), this
                        }, r.prototype.doConnect = function () {
                            var e = this;
                            return e.transport && e.transport.clearTimeouts(), e.transport = e.getTransport(e.transports), e.transport ? void e.transport.ready(e, function () {
                                e.connecting = !0, e.publish("connecting", e.transport.name), e.transport.open(), e.options["connect timeout"] && (e.connectTimeoutTimer && clearTimeout(e.connectTimeoutTimer), e.connectTimeoutTimer = setTimeout(e.tryNextTransport.bind(e), e.options["connect timeout"]))
                            }) : e.publish("connect_failed")
                        }, r.prototype.getTransport = function (e) {
                            for (var n, r = e || this.transports, o = 0; n = r[o]; o++) if (console.log("D check " + n + " " + t.Transport[n].check(this) + " , cors " + t.Transport[n].xdomainCheck(this)), t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck(this))) {
                                var s = new t.Transport[n](this, this.sessionid);
                                return s
                            }
                            return null
                        }, r.prototype.tryNextTransport = function () {
                            console.log("D try next transport");
                            var e = this;
                            if (!e.connected && (e.connecting = !1, e.options["try multiple transports"])) {
                                for (var t = e.transports; t.length > 0 && t.splice(0, 1)[0] != e.transport.name;) ;
                                t.length ? e.doConnect() : e.publish("connect_failed")
                            }
                        }, r.prototype.setHeartbeatTimeout = function () {
                            if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                                var e = this;
                                this.heartbeatTimeoutTimer = setTimeout(function () {
                                    e.transport && e.transport.onClose()
                                }, this.heartbeatTimeout)
                            }
                        }, r.prototype.packet = function (e) {
                            return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
                        }, r.prototype.setBuffer = function (e) {
                            this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
                        }, r.prototype.flushBuffer = function () {
                            this.transport.payload(this.buffer), this.buffer = []
                        }, r.prototype.disconnect = function () {
                            return (this.connected || this.connecting) && (this.open && this.of("").packet({type: "disconnect"}), this.onDisconnect("booted")), this
                        }, r.prototype.disconnectSync = function () {
                            var e = t.util.request(),
                                n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
                            e.open("GET", n, !1), e.send(null), this.onDisconnect("booted")
                        }, r.prototype.isXDomain = function () {
                            var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
                            return this.options.host !== n.location.hostname || this.options.port != e
                        }, r.prototype.onConnect = function () {
                            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
                        }, r.prototype.onOpen = function () {
                            this.open = !0
                        }, r.prototype.onClose = function () {
                            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
                        }, r.prototype.onPacket = function (e) {
                            this.of(e.endpoint).onPacket(e)
                        }, r.prototype.onError = function (e) {
                            e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
                        }, r.prototype.onDisconnect = function (e) {
                            var t = this.connected, n = this.connecting;
                            this.connected = !1, this.connecting = !1, this.open = !1, (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()), n && this.tryNextTransport())
                        }, r.prototype.reconnect = function () {
                            function e() {
                                if (n.connected) {
                                    for (var e in n.namespaces) n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({type: "connect"});
                                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                                }
                                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", t), n.removeListener("connect", t), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = o
                            }

                            function t() {
                                if (n.reconnecting) return n.connected ? e() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(t, 1e3) : void(n.reconnectionAttempts++ >= r ? n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < s && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay)))
                            }

                            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
                            var n = this, r = this.options["max reconnection attempts"],
                                o = this.options["try multiple transports"], s = this.options["reconnection limit"];
                            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(t, this.reconnectionDelay), this.on("connect", t)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, window), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {}
                        }

                        function r(e, t) {
                            this.namespace = e, this.name = t
                        }

                        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function () {
                            return this.socket.of.apply(this.socket, arguments)
                        }, n.prototype.packet = function (e) {
                            return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
                        }, n.prototype.send = function (e, t) {
                            var n = {type: this.flags.json ? "json" : "message", data: e};
                            return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n)
                        }, n.prototype.emit = function (e) {
                            var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1],
                                r = {type: "event", name: e};
                            return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r)
                        }, n.prototype.disconnect = function () {
                            return "" === this.name ? this.socket.disconnect() : (this.packet({type: "disconnect"}), this.$emit("disconnect")), this
                        }, n.prototype.onPacket = function (e) {
                            function n() {
                                r.packet({type: "ack", args: t.util.toArray(arguments), ackId: e.id})
                            }

                            var r = this;
                            switch (e.type) {
                                case"connect":
                                    this.$emit("connect");
                                    break;
                                case"disconnect":
                                    "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                                    break;
                                case"message":
                                case"json":
                                    var o = ["message", e.data];
                                    "data" == e.ack ? o.push(n) : e.ack && this.packet({
                                        type: "ack",
                                        ackId: e.id
                                    }), this.$emit.apply(this, o);
                                    break;
                                case"event":
                                    var o = [e.name].concat(e.args);
                                    "data" == e.ack && o.push(n), this.$emit.apply(this, o);
                                    break;
                                case"ack":
                                    this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                                    break;
                                case"error":
                                    e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
                            }
                        }, r.prototype.send = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
                        }, r.prototype.emit = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function r(e) {
                            t.Transport.apply(this, arguments)
                        }

                        e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function () {
                            var e, r = t.util.query(this.socket.options.query), o = this;
                            return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + r), this.websocket.onopen = function () {
                                o.onOpen(), o.socket.setBuffer(!1)
                            }, this.websocket.onmessage = function (e) {
                                o.onData(e.data)
                            }, this.websocket.onclose = function () {
                                o.socket.setBuffer(!0), o.onClose()
                            }, this.websocket.onerror = function (e) {
                                o.onError(e)
                            }, this
                        }, t.util.ua.iDevice ? r.prototype.send = function (e) {
                            var t = this;
                            return setTimeout(function () {
                                t.websocket.send(e)
                            }, 0), this
                        } : r.prototype.send = function (e) {
                            return this.websocket.send(e), this
                        }, r.prototype.payload = function (e) {
                            for (var t = 0, n = e.length; t < n; t++) this.packet(e[t]);
                            return this
                        }, r.prototype.close = function () {
                            return this.websocket.close(), this
                        }, r.prototype.onError = function (e) {
                            this.socket.onError(e)
                        }, r.prototype.scheme = function () {
                            return this.socket.options.secure ? "wss" : "ws"
                        }, r.check = function () {
                            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
                        }, r.xdomainCheck = function () {
                            return !0
                        }, t.transports.push("websocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window), function (e, t) {
                        function n() {
                            t.Transport.websocket.apply(this, arguments)
                        }

                        e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.open.apply(e, n)
                            }), this
                        }, n.prototype.send = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.send.apply(e, n)
                            }), this
                        }, n.prototype.close = function () {
                            return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this
                        }, n.prototype.ready = function (e, r) {
                            function o() {
                                var t = e.options, o = t["flash policy port"],
                                    i = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = i.join("/")), 843 !== o && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + o), WebSocket.__initialize(), n.loaded = !0), r.call(s)
                            }

                            var s = this;
                            return document.body ? o() : void t.util.load(o)
                        }, n.check = function () {
                            return !!("undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject) && swfobject.getFlashPlayerVersion().major >= 10
                        }, n.xdomainCheck = function () {
                            return !0
                        }, "undefined" != typeof window && (window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window && "undefined" != typeof window.document) var swfobject = function () {
                    function e() {
                        if (!H) {
                            try {
                                var e = N.getElementsByTagName("body")[0].appendChild(y("span"));
                                e.parentNode.removeChild(e)
                            } catch (t) {
                                return
                            }
                            H = !0;
                            for (var n = L.length, r = 0; r < n; r++) L[r]()
                        }
                    }

                    function t(e) {
                        H ? e() : L[L.length] = e
                    }

                    function n(e) {
                        if (typeof F.addEventListener != x) F.addEventListener("load", e, !1); else if (typeof N.addEventListener != x) N.addEventListener("load", e, !1); else if (typeof F.attachEvent != x) h(F, "onload", e); else if ("function" == typeof F.onload) {
                            var t = F.onload;
                            F.onload = function () {
                                t(), e()
                            }
                        } else F.onload = e
                    }

                    function r() {
                        D ? o() : s()
                    }

                    function o() {
                        var e = N.getElementsByTagName("body")[0], t = y(_);
                        t.setAttribute("type", A);
                        var n = e.appendChild(t);
                        if (n) {
                            var r = 0;
                            !function () {
                                if (typeof n.GetVariable != x) {
                                    var o = n.GetVariable("$version");
                                    o && (o = o.split(" ")[1].split(","), X.pv = [parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)])
                                } else if (r < 10) return r++, void setTimeout(arguments.callee, 10);
                                e.removeChild(t), n = null, s()
                            }()
                        } else s()
                    }

                    function s() {
                        var e = B.length;
                        if (e > 0) for (var t = 0; t < e; t++) {
                            var n = B[t].id, r = B[t].callbackFn, o = {success: !1, id: n};
                            if (X.pv[0] > 0) {
                                var s = g(n);
                                if (s) if (!v(B[t].swfVersion) || X.wk && X.wk < 312) if (B[t].expressInstall && a()) {
                                    var l = {};
                                    l.data = B[t].expressInstall, l.width = s.getAttribute("width") || "0", l.height = s.getAttribute("height") || "0", s.getAttribute("class") && (l.styleclass = s.getAttribute("class")), s.getAttribute("align") && (l.align = s.getAttribute("align"));
                                    for (var m = {}, d = s.getElementsByTagName("param"), f = d.length, p = 0; p < f; p++) "movie" != d[p].getAttribute("name").toLowerCase() && (m[d[p].getAttribute("name")] = d[p].getAttribute("value"));
                                    c(l, m, n, r)
                                } else u(s), r && r(o); else M(n, !0), r && (o.success = !0, o.ref = i(n), r(o))
                            } else if (M(n, !0), r) {
                                var y = i(n);
                                y && typeof y.SetVariable != x && (o.success = !0, o.ref = y), r(o)
                            }
                        }
                    }

                    function i(e) {
                        var t = null, n = g(e);
                        if (n && "OBJECT" == n.nodeName) if (typeof n.SetVariable != x) t = n; else {
                            var r = n.getElementsByTagName(_)[0];
                            r && (t = r)
                        }
                        return t
                    }

                    function a() {
                        return !J && v("6.0.65") && (X.win || X.mac) && !(X.wk && X.wk < 312)
                    }

                    function c(e, t, n, r) {
                        J = !0, w = r || null, C = {success: !1, id: n};
                        var o = g(n);
                        if (o) {
                            "OBJECT" == o.nodeName ? (k = l(o), S = null) : (k = o, S = n), e.id = j, (typeof e.width == x || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == x || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), N.title = N.title.slice(0, 47) + " - Flash Player Installation";
                            var s = X.ie && X.win ? ["Active"].concat("").join("X") : "PlugIn",
                                i = "MMredirectURL=" + F.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + s + "&MMdoctitle=" + N.title;
                            if (typeof t.flashvars != x ? t.flashvars += "&" + i : t.flashvars = i, X.ie && X.win && 4 != o.readyState) {
                                var a = y("div");
                                n += "SWFObjectNew", a.setAttribute("id", n), o.parentNode.insertBefore(a, o), o.style.display = "none", function () {
                                    4 == o.readyState ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10)
                                }()
                            }
                            m(e, t, n)
                        }
                    }

                    function u(e) {
                        if (X.ie && X.win && 4 != e.readyState) {
                            var t = y("div");
                            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(l(e), t), e.style.display = "none", function () {
                                4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                            }()
                        } else e.parentNode.replaceChild(l(e), e)
                    }

                    function l(e) {
                        var t = y("div");
                        if (X.win && X.ie) t.innerHTML = e.innerHTML; else {
                            var n = e.getElementsByTagName(_)[0];
                            if (n) {
                                var r = n.childNodes;
                                if (r) for (var o = r.length, s = 0; s < o; s++) 1 == r[s].nodeType && "PARAM" == r[s].nodeName || 8 == r[s].nodeType || t.appendChild(r[s].cloneNode(!0))
                            }
                        }
                        return t
                    }

                    function m(e, t, n) {
                        var r, o = g(n);
                        if (X.wk && X.wk < 312) return r;
                        if (o) if (typeof e.id == x && (e.id = n), X.ie && X.win) {
                            var s = "";
                            for (var i in e) e[i] != Object.prototype[i] && ("data" == i.toLowerCase() ? t.movie = e[i] : "styleclass" == i.toLowerCase() ? s += ' class="' + e[i] + '"' : "classid" != i.toLowerCase() && (s += " " + i + '="' + e[i] + '"'));
                            var a = "";
                            for (var c in t) t[c] != Object.prototype[c] && (a += '<param name="' + c + '" value="' + t[c] + '" />');
                            o.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + s + ">" + a + "</object>", q[q.length] = e.id, r = g(e.id)
                        } else {
                            var u = y(_);
                            u.setAttribute("type", A);
                            for (var l in e) e[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? u.setAttribute("class", e[l]) : "classid" != l.toLowerCase() && u.setAttribute(l, e[l]));
                            for (var m in t) t[m] != Object.prototype[m] && "movie" != m.toLowerCase() && d(u, m, t[m]);
                            o.parentNode.replaceChild(u, o), r = u
                        }
                        return r
                    }

                    function d(e, t, n) {
                        var r = y("param");
                        r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r)
                    }

                    function f(e) {
                        var t = g(e);
                        t && "OBJECT" == t.nodeName && (X.ie && X.win ? (t.style.display = "none", function () {
                            4 == t.readyState ? p(e) : setTimeout(arguments.callee, 10)
                        }()) : t.parentNode.removeChild(t))
                    }

                    function p(e) {
                        var t = g(e);
                        if (t) {
                            for (var n in t) "function" == typeof t[n] && (t[n] = null);
                            t.parentNode.removeChild(t)
                        }
                    }

                    function g(e) {
                        var t = null;
                        try {
                            t = N.getElementById(e)
                        } catch (n) {
                        }
                        return t
                    }

                    function y(e) {
                        return N.createElement(e)
                    }

                    function h(e, t, n) {
                        e.attachEvent(t, n), W[W.length] = [e, t, n]
                    }

                    function v(e) {
                        var t = X.pv, n = e.split(".");
                        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2]
                    }

                    function b(e, t, n, r) {
                        if (!X.ie || !X.mac) {
                            var o = N.getElementsByTagName("head")[0];
                            if (o) {
                                var s = n && "string" == typeof n ? n : "screen";
                                if (r && (O = null, I = null), !O || I != s) {
                                    var i = y("style");
                                    i.setAttribute("type", "text/css"), i.setAttribute("media", s), O = o.appendChild(i), X.ie && X.win && typeof N.styleSheets != x && N.styleSheets.length > 0 && (O = N.styleSheets[N.styleSheets.length - 1]), I = s
                                }
                                X.ie && X.win ? O && typeof O.addRule == _ && O.addRule(e, t) : O && typeof N.createTextNode != x && O.appendChild(N.createTextNode(e + " {" + t + "}"))
                            }
                        }
                    }

                    function M(e, t) {
                        if ($) {
                            var n = t ? "visible" : "hidden";
                            H && g(e) ? g(e).style.visibility = n : b("#" + e, "visibility:" + n)
                        }
                    }

                    function T(e) {
                        var t = /[\\\"<>\.;]/, n = null != t.exec(e);
                        return n && typeof encodeURIComponent != x ? encodeURIComponent(e) : e
                    }

                    var k, S, w, C, O, I, x = "undefined", _ = "object", P = "Shockwave Flash",
                        E = "ShockwaveFlash.ShockwaveFlash", A = "application/x-shockwave-flash",
                        j = "SWFObjectExprInst", R = "onreadystatechange", F = window, N = document, U = navigator,
                        D = !1, L = [r], B = [], q = [], W = [], H = !1, J = !1, $ = !0, X = function () {
                            var e = typeof N.getElementById != x && typeof N.getElementsByTagName != x && typeof N.createElement != x,
                                t = U.userAgent.toLowerCase(), n = U.platform.toLowerCase(),
                                r = n ? /win/.test(n) : /win/.test(t), o = n ? /mac/.test(n) : /mac/.test(t),
                                s = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                                i = !1, a = [0, 0, 0], c = null;
                            if (typeof U.plugins != x && typeof U.plugins[P] == _) c = U.plugins[P].description, !c || typeof U.mimeTypes != x && U.mimeTypes[A] && !U.mimeTypes[A].enabledPlugin || (D = !0, i = !1, c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof F[["Active"].concat("Object").join("X")] != x) try {
                                var u = new (window[["Active"].concat("Object").join("X")])(E);
                                u && (c = u.GetVariable("$version"), c && (i = !0, c = c.split(" ")[1].split(","), a = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]))
                            } catch (l) {
                            }
                            return {w3: e, pv: a, wk: s, ie: i, win: r, mac: o}
                        }();
                    (function () {
                        X.w3 && ((typeof N.readyState != x && "complete" == N.readyState || typeof N.readyState == x && (N.getElementsByTagName("body")[0] || N.body)) && e(),
                        H || (typeof N.addEventListener != x && N.addEventListener("DOMContentLoaded", e, !1), X.ie && X.win && (N.attachEvent(R, function () {
                            "complete" == N.readyState && (N.detachEvent(R, arguments.callee), e())
                        }), F == top && !function () {
                            if (!H) {
                                try {
                                    N.documentElement.doScroll("left")
                                } catch (t) {
                                    return void setTimeout(arguments.callee, 0)
                                }
                                e()
                            }
                        }()), X.wk && !function () {
                            if (!H) return /loaded|complete/.test(N.readyState) ? void e() : void setTimeout(arguments.callee, 0)
                        }(), n(e)))
                    })(), function () {
                        X.ie && X.win && window.attachEvent("onunload", function () {
                            for (var e = W.length, t = 0; t < e; t++) W[t][0].detachEvent(W[t][1], W[t][2]);
                            for (var n = q.length, r = 0; r < n; r++) f(q[r]);
                            for (var o in X) X[o] = null;
                            X = null;
                            for (var s in swfobject) swfobject[s] = null;
                            swfobject = null
                        })
                    }();
                    return {
                        registerObject: function (e, t, n, r) {
                            if (X.w3 && e && t) {
                                var o = {};
                                o.id = e, o.swfVersion = t, o.expressInstall = n, o.callbackFn = r, B[B.length] = o, M(e, !1)
                            } else r && r({success: !1, id: e})
                        }, getObjectById: function (e) {
                            if (X.w3) return i(e)
                        }, embedSWF: function (e, n, r, o, s, i, u, l, d, f) {
                            var p = {success: !1, id: n};
                            X.w3 && !(X.wk && X.wk < 312) && e && n && r && o && s ? (M(n, !1), t(function () {
                                r += "", o += "";
                                var t = {};
                                if (d && typeof d === _) for (var g in d) t[g] = d[g];
                                t.data = e, t.width = r, t.height = o;
                                var y = {};
                                if (l && typeof l === _) for (var h in l) y[h] = l[h];
                                if (u && typeof u === _) for (var b in u) typeof y.flashvars != x ? y.flashvars += "&" + b + "=" + u[b] : y.flashvars = b + "=" + u[b];
                                if (v(s)) {
                                    var T = m(t, y, n);
                                    t.id == n && M(n, !0), p.success = !0, p.ref = T
                                } else {
                                    if (i && a()) return t.data = i, void c(t, y, n, f);
                                    M(n, !0)
                                }
                                f && f(p)
                            })) : f && f(p)
                        }, switchOffAutoHideShow: function () {
                            $ = !1
                        }, ua: X, getFlashPlayerVersion: function () {
                            return {major: X.pv[0], minor: X.pv[1], release: X.pv[2]}
                        }, hasFlashPlayerVersion: v, createSWF: function (e, t, n) {
                            return X.w3 ? m(e, t, n) : void 0
                        }, showExpressInstall: function (e, t, n, r) {
                            X.w3 && a() && c(e, t, n, r)
                        }, removeSWF: function (e) {
                            X.w3 && f(e)
                        }, createCSS: function (e, t, n, r) {
                            X.w3 && b(e, t, n, r)
                        }, addDomLoadEvent: t, addLoadEvent: n, getQueryParamValue: function (e) {
                            var t = N.location.search || N.location.hash;
                            if (t) {
                                if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return T(t);
                                for (var n = t.split("&"), r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return T(n[r].substring(n[r].indexOf("=") + 1))
                            }
                            return ""
                        }, expressInstallCallback: function () {
                            if (J) {
                                var e = g(j);
                                e && k && (e.parentNode.replaceChild(k, e), S && (M(S, !0), X.ie && X.win && (k.style.display = "block")), w && w(C)), J = !1
                            }
                        }
                    }
                }();
                !function () {
                    if ("undefined" != typeof window && !window.WebSocket) {
                        var e = window.console;
                        if (e && e.log && e.error || (e = {
                                log: function () {
                                }, error: function () {
                                }
                            }), !swfobject.hasFlashPlayerVersion("10.0.0")) return void e.error("Flash Player >= 10.0.0 is required.");
                        "file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function (e, t, n, r, o) {
                            var s = this;
                            s.__id = WebSocket.__nextId++, WebSocket.__instances[s.__id] = s, s.readyState = WebSocket.CONNECTING, s.bufferedAmount = 0, s.__events = {}, t ? "string" == typeof t && (t = [t]) : t = [], setTimeout(function () {
                                WebSocket.__addTask(function () {
                                    WebSocket.__flash.create(s.__id, e, t, n || null, r || 0, o || null)
                                })
                            }, 0)
                        }, WebSocket.prototype.send = function (e) {
                            if (this.readyState == WebSocket.CONNECTING) throw"socket.io::send: INVALID_STATE_ERR: Web Socket connection has not been established";
                            var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
                            return t < 0 || (this.bufferedAmount += t, !1)
                        }, WebSocket.prototype.close = function () {
                            this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
                        }, WebSocket.prototype.addEventListener = function (e, t, n) {
                            e in this.__events || (this.__events[e] = []), this.__events[e].push(t)
                        }, WebSocket.prototype.removeEventListener = function (e, t, n) {
                            if (e in this.__events) for (var r = this.__events[e], o = r.length - 1; o >= 0; --o) if (r[o] === t) {
                                r.splice(o, 1);
                                break
                            }
                        }, WebSocket.prototype.dispatchEvent = function (e) {
                            for (var t = this.__events[e.type] || [], n = 0; n < t.length; ++n) t[n](e);
                            var r = this["on" + e.type];
                            r && r(e)
                        }, WebSocket.prototype.__handleEvent = function (e) {
                            "readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol);
                            var t;
                            if ("open" == e.type || "error" == e.type) t = this.__createSimpleEvent(e.type); else if ("close" == e.type) t = this.__createSimpleEvent("close"); else {
                                if ("message" != e.type) throw"socket.io::handleFlashEvent: unknown event type: " + e.type;
                                var n = decodeURIComponent(e.message);
                                t = this.__createMessageEvent("message", n)
                            }
                            this.dispatchEvent(t)
                        }, WebSocket.prototype.__createSimpleEvent = function (e) {
                            if (document.createEvent && window.Event) {
                                var t = document.createEvent("Event");
                                return t.initEvent(e, !1, !1), t
                            }
                            return {type: e, bubbles: !1, cancelable: !1}
                        }, WebSocket.prototype.__createMessageEvent = function (e, t) {
                            if (document.createEvent && window.MessageEvent && !window.opera) {
                                var n = document.createEvent("MessageEvent");
                                return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n
                            }
                            return {type: e, data: t, bubbles: !1, cancelable: !1}
                        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (e) {
                            WebSocket.__addTask(function () {
                                WebSocket.__flash.loadManualPolicyFile(e)
                            })
                        }, WebSocket.__initialize = function () {
                            if (!WebSocket.__flash) {
                                if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION) return void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                                var t = document.createElement("div");
                                t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
                                var n = document.createElement("div");
                                n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                                    hasPriority: !0,
                                    swliveconnect: !0,
                                    allowScriptAccess: "always"
                                }, null, function (t) {
                                    t.success || e.error("[WebSocket] swfobject.embedSWF failed")
                                })
                            }
                        }, WebSocket.__onFlashInitialized = function () {
                            setTimeout(function () {
                                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                                for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
                                WebSocket.__tasks = []
                            }, 0)
                        }, WebSocket.__onFlashEvent = function () {
                            return setTimeout(function () {
                                try {
                                    for (var t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                                } catch (r) {
                                    e.error(r)
                                }
                            }, 0), !0
                        };
                        var t = function () {
                            var e = function (e, t) {
                                    t = t || 2;
                                    for (var n = "" + e; n.length < t;) n = "0" + n;
                                    return n
                                }, t = new Date,
                                n = t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate()) + " " + e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds()) + ":" + e(t.getMilliseconds(), 3);
                            return n
                        };
                        WebSocket.__log = function (n) {
                            e.log(t(), decodeURIComponent(n))
                        }, WebSocket.__error = function (n) {
                            e.error(t(), decodeURIComponent(n))
                        }, WebSocket.__addTask = function (e) {
                            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
                        }, WebSocket.__isFlashLite = function () {
                            if (!window.navigator || !window.navigator.mimeTypes) return !1;
                            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
                            return !!(e && e.enabledPlugin && e.enabledPlugin.filename) && !!e.enabledPlugin.filename.match(/flashlite/i)
                        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
                            WebSocket.__initialize()
                        }, !1) : window.attachEvent("onload", function () {
                            WebSocket.__initialize()
                        }))
                    }
                }(), function (e, t, n) {
                    function r(e) {
                        e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
                    }

                    function o() {
                    }

                    e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function () {
                        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
                    }, r.prototype.payload = function (e) {
                        for (var n = [], r = 0, o = e.length; r < o; r++) n.push(t.parser.encodePacket(e[r]));
                        this.send(t.parser.encodePayload(n))
                    }, r.prototype.send = function (e) {
                        return this.post(e), this
                    }, r.prototype.post = function (e) {
                        function t() {
                            4 == this.readyState && (this.onreadystatechange = o, s.posting = !1, 200 == this.status ? s.socket.setBuffer(!1) : s.onClose())
                        }

                        function r() {
                            this.onload = o, s.socket.setBuffer(!1)
                        }

                        var s = this;
                        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = r : this.sendXHR.onreadystatechange = t, this.sendXHR.send(e)
                    }, r.prototype.close = function () {
                        return this.onClose(), this
                    }, r.prototype.request = function (e) {
                        var n = t.util.request(this.socket.isXDomain()),
                            r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        if (n.open(e || "GET", this.prepareUrl() + r, !0), "POST" == e) try {
                            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                        } catch (o) {
                        }
                        return n
                    }, r.prototype.scheme = function () {
                        return this.socket.options.secure ? "https" : "http"
                    }, r.check = function (e, r) {
                        try {
                            var o = t.util.request(r), s = n.XDomainRequest && o instanceof XDomainRequest,
                                i = e && e.options && e.options.secure ? "https:" : "http:",
                                a = n.location && i != n.location.protocol;
                            if (o && (!s || !a)) return !0
                        } catch (c) {
                        }
                        return !1
                    }, r.xdomainCheck = function (e) {
                        return r.check(e, !0)
                    }
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window), function (e, t) {
                    function n(e) {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function () {
                        this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
                        var e = this.doc.createElement("div");
                        e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
                        var n = this, r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        this.iframe.src = this.prepareUrl() + r, t.util.on(window, "unload", function () {
                            n.destroy()
                        })
                    }, n.prototype._ = function (e, t) {
                        this.onData(e);
                        try {
                            var n = t.getElementsByTagName("script")[0];
                            n.parentNode.removeChild(n)
                        } catch (r) {
                        }
                    }, n.prototype.destroy = function () {
                        if (this.iframe) {
                            try {
                                this.iframe.src = "about:blank"
                            } catch (e) {
                            }
                            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
                        }
                    }, n.prototype.close = function () {
                        return this.destroy(), t.Transport.XHR.prototype.close.call(this)
                    }, n.check = function (e) {
                        if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
                            var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                            return n && t.Transport.XHR.check(e)
                        } catch (r) {
                        }
                        return !1
                    }, n.xdomainCheck = function () {
                        return !1
                    }, t.transports.push("htmlfile")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                    function r() {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    function o() {
                    }

                    e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function () {
                        return !1
                    }, r.prototype.open = function () {
                        var e = this;
                        return t.Transport.XHR.prototype.open.call(e), !1
                    }, r.prototype.get = function () {
                        function e() {
                            4 == this.readyState && (this.onreadystatechange = o, 200 == this.status ? (s.onData(this.responseText), s.get()) : s.onClose())
                        }

                        function t() {
                            this.onload = o, this.onerror = o, s.retryCounter = 1, s.onData(this.responseText), s.get()
                        }

                        function r() {
                            s.retryCounter++, !s.retryCounter || s.retryCounter > 3 ? s.onClose() : s.get()
                        }

                        if (this.isOpen) {
                            var s = this;
                            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = r) : this.xhr.onreadystatechange = e, this.xhr.send(null)
                        }
                    }, r.prototype.onClose = function () {
                        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = o;
                            try {
                                this.xhr.abort()
                            } catch (e) {
                            }
                            this.xhr = null
                        }
                    }, r.prototype.ready = function (e, n) {
                        var r = this;
                        t.util.defer(function () {
                            n.call(r)
                        })
                    }, t.transports.push("xhr-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window), function (e, t, n) {
                    function r(e) {
                        t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
                        var n = this;
                        t.j.push(function (e) {
                            n._(e)
                        })
                    }

                    var o = n.document && "MozAppearance" in n.document.documentElement.style;
                    e["jsonp-polling"] = r, t.util.inherit(r, t.Transport["xhr-polling"]), r.prototype.name = "jsonp-polling", r.prototype.post = function (e) {
                        function n() {
                            r(), o.socket.setBuffer(!1)
                        }

                        function r() {
                            o.iframe && o.form.removeChild(o.iframe);
                            try {
                                i = document.createElement('<iframe name="' + o.iframeId + '">')
                            } catch (e) {
                                i = document.createElement("iframe"), i.name = o.iframeId
                            }
                            i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
                        }

                        var o = this,
                            s = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        if (!this.form) {
                            var i, a = document.createElement("form"), c = document.createElement("textarea"),
                                u = this.iframeId = "socketio_iframe_" + this.index;
                            a.className = "socketio", a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.display = "none", a.target = u, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), c.name = "d", a.appendChild(c), document.body.appendChild(a), this.form = a, this.area = c
                        }
                        this.form.action = this.prepareUrl() + s, r(), this.area.value = t.JSON.stringify(e);
                        try {
                            this.form.submit()
                        } catch (l) {
                        }
                        this.iframe.attachEvent ? i.onreadystatechange = function () {
                            "complete" == o.iframe.readyState && n()
                        } : this.iframe.onload = n, this.socket.setBuffer(!0)
                    }, r.prototype.get = function () {
                        var e = this, n = document.createElement("script"),
                            r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + r, n.onerror = function () {
                            e.onClose()
                        };
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(n, s), this.script = n, o && setTimeout(function () {
                            var e = document.createElement("iframe");
                            document.body.appendChild(e), document.body.removeChild(e)
                        }, 100)
                    }, r.prototype._ = function (e) {
                        return this.onData(e), this.isOpen && this.get(), this
                    }, r.prototype.ready = function (e, n) {
                        var r = this;
                        return o ? void t.util.load(function () {
                            n.call(r)
                        }) : n.call(this)
                    }, r.check = function () {
                        return "document" in n
                    }, r.xdomainCheck = function () {
                        return !0
                    }, t.transports.push("jsonp-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window), __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return io
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            }()
        }).call(exports, __webpack_require__(57)(module))
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o() {
        }

        var s = n(63), i = r(s), a = i["default"].clientTypeMap;
        o.reverse = function (e) {
            var t = e;
            return t.type = a[t.type], t
        }, o.reverseType = function (e) {
            return a[e] || e
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1);
        r.parse = function (e) {
            var t = e.split("|");
            return {scene: t[0], to: t[1]}
        }, r.genSessionByMsg = function (e) {
            var t = {id: e.sessionId, scene: e.scene, to: e.target, updateTime: e.time, lastMsg: e};
            return t
        }, r.appendLastMsg = function (e) {
            var t = e.lastMsg, n = o.capFirstLetter(t.type);
            e["last" + n + "Msg"] = t;
            var r = o.capFirstLetter(t.flow);
            e["last" + r + "Msg"] = t
        }, r.genSessionByMsgs = function (e, t) {
            var n = e.getLastNotIgnoredMsg(t);
            return n ? r.genSessionByMsg(n) : null
        }, r.trim = function (e) {
            delete e.msgReceiptSendTime, delete e.msgReceiptServerTime, delete e.ack, delete e.unreadMsgs
        }, r.isComplete = function (e) {
            return e.id && e.scene && e.to
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            var t = this;
            a.verifyOptions(e, "type to", "sysmsg::SystemMessage"), a.verifyParamValid("type", e.type, o.validTypes, "sysmsg::SystemMessage"), e.type.indexOf("custom") !== -1 && (a.verifyOptions(e, "content", "sysmsg::SystemMessage"), t.attach = e.content, u(e.apnsText) && (t.apnsText = "" + e.apnsText), u(e.pushPayload) && ("object" === (0, i["default"])(e.pushPayload) ? (t.logger.warn("model::Message: pushPayload should be JsonString, auto transfer"), t.pushPayload = JSON.stringify(e.pushPayload)) : t.pushPayload = "" + e.pushPayload), u(e.sendToOnlineUsersOnly) && (t.sendToOnlineUsersOnly = e.sendToOnlineUsersOnly ? 0 : 1), u(e.cc) && (t.cc = e.cc ? 1 : 0), u(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0), u(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0), u(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0)), t.time = e.time || +new Date, t.type = f[e.type], t.to = e.to, u(e.from) && (t.from = e.from), u(e.ps) && (t.ps = e.ps), u(e.deletedIdClient) && (t.deletedIdClient = e.deletedIdClient), u(e.deletedIdServer) && (t.deletedIdServer = e.deletedIdServer), u(e.opeAccount) && (t.opeAccount = e.opeAccount), u(e.yidunEnable) && (t.yidunEnable = e.yidunEnable ? 1 : 0), u(e.antiSpamContent) && ("object" === (0, i["default"])(e.antiSpamContent) ? (t.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), t.antiSpamContent = JSON.stringify(e.antiSpamContent)) : t.antiSpamContent = "" + e.antiSpamContent), u(e.antiSpamBusinessId) && ("object" === (0, i["default"])(e.antiSpamBusinessId) ? (t.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), t.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : t.antiSpamBusinessId = "" + e.antiSpamBusinessId), t.idClient = e.idClient || a.guid()
        }

        var s = n(15), i = r(s), a = n(1), c = a.undef, u = a.notundef, l = n(97).getInstance("IM"), m = n(104),
            d = n(98), f = {customP2p: 100, customTeam: 101, deleteMsgP2p: 7, deleteMsgTeam: 8}, p = {
                0: "applyTeam",
                1: "rejectTeamApply",
                2: "teamInvite",
                3: "rejectTeamInvite",
                5: "friendRequest",
                6: "deleteFriend",
                7: "deleteMsgP2p",
                8: "deleteMsgTeam",
                100: "customP2p",
                101: "customTeam",
                102: "customP2p"
            }, g = {1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply"}, y = "team",
            h = "friend", v = "msg", b = [y, h, v], M = {
                applyTeam: y,
                rejectTeamApply: y,
                teamInvite: y,
                rejectTeamInvite: y,
                addFriend: h,
                applyFriend: h,
                passFriendApply: h,
                rejectFriendApply: h,
                deleteFriend: h,
                deleteMsg: v
            };
        o.validTypes = Object.keys(f).concat(Object.keys(M)), o.validCategories = ["team", "friend"], o.isCustom = function (e) {
            return "custom" === e.type
        }, o.reverse = function (e) {
            var t = {time: +e.time, to: e.to, type: p[e.type]};
            if (u(e.from) && (t.from = e.from), u(e.idServer) && (t.idServer = "" + e.idServer), u(e.deletedIdClient) && (t.deletedIdClient = e.deletedIdClient), u(e.deletedIdServer) && (t.deletedIdServer = "" + e.deletedIdServer), u(e.deletedMsgTime) && (t.deletedMsgTime = +e.deletedMsgTime), u(e.deletedMsgFromNick) && (t.deletedMsgFromNick = "" + e.deletedMsgFromNick), u(e.opeAccount) && (t.opeAccount = e.opeAccount), u(e.ps) && (t.ps = e.ps), e.attach = e.attach ? "" + e.attach : "", "customP2p" === t.type || "customTeam" === t.type) t.content = e.attach, u(e.apnsText) && (t.apnsText = e.apnsText), u(e.pushPayload) && (t.pushPayload = e.pushPayload), a.merge(t, {
                sendToOnlineUsersOnly: c(e.sendToOnlineUsersOnly) || 0 === +e.sendToOnlineUsersOnly,
                cc: c(e.cc) || 1 === +e.cc,
                isPushable: c(e.isPushable) || 1 === +e.isPushable,
                isUnreadable: c(e.isUnreadable) || 1 === +e.isUnreadable,
                needPushNick: u(e.needPushNick) && 1 === +e.needPushNick
            }), t.scene = t.type.slice(6).toLowerCase(), t.type = "custom"; else if ("deleteMsgP2p" === t.type || "deleteMsgTeam" === t.type) t.scene = t.type.slice(9).toLowerCase(), t.type = "deleteMsg"; else {
                if (e.attach) {
                    t.attach = {};
                    var n = JSON.parse(e.attach);
                    u(n.vt) ? (t.type = g[n.vt], delete t.attach) : (u(n.tinfo) && (t.attach.team = m.reverse(l.unserialize(n.tinfo, "team"))), u(n.tlist) && (t.attach.member = d.reverse(l.unserialize(n.tlist, "teamMember"))), u(n.attach) && (t.attach.custom = n.attach))
                }
                t.category = M[t.type], t.read = !1, t.state = "init"
            }
            return u(e.cc) && (t.cc = 1 === +e.cc), t.status = e.status || "success", u(e.filter) && (t.filter = e.filter), t
        }, o.reverseSysMsgs = function (e, t) {
            t = t || {};
            var n = t.mapper, r = a.isFunction(n);
            return e.map(function (e) {
                return e = o.reverse(e), r && (e = n(e)), e
            })
        }, o.completeUnread = function (e) {
            e = e || {}, b.forEach(function (t) {
                delete e[t]
            });
            var t;
            return Object.keys(M).forEach(function (n) {
                e[n] = e[n] || 0, e[n] < 0 && (e[n] = 0), t = M[n], e[t] = e[t] || 0, e[t] = e[t] + e[n]
            }), e.total = 0, b.forEach(function (t) {
                e.total += e[t]
            }), e
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            switch (s.verifyOptions(e, "action", "team::Team"), e.action) {
                case"create":
                    s.verifyOptions(e, "teamId", !1, "team::Team"), s.verifyOptions(e, "type name", "team::Team"), s.verifyParamValid("type", e.type, g, "team::Team");
                    break;
                case"update":
                    s.verifyOptions(e, "teamId", "team::Team"), s.verifyOptions(e, "type", !1, "team::Team")
            }
            i(e.teamId) && (t.teamId = e.teamId), i(e.type) && (t.type = f[e.type]), i(e.avatar) && (t.avatar = "" + e.avatar), i(e.name) && (t.name = "" + e.name), i(e.intro) && (t.intro = "" + e.intro), i(e.announcement) && (t.announcement = "" + e.announcement), m.forEach(t.setMode.bind(t, e)), i(e.custom) && (t.custom = "" + e.custom)
        }

        function o(e, t) {
            t += "Mode", i(e[t]) && (e[t] = l[t][e[t]])
        }

        var s = n(1), i = s.notundef, a = s.fillPropertyWithDefault, c = Object.keys, u = {}, l = {}, m = [], d = {},
            f = {normal: 0, advanced: 1}, p = {0: "normal", 1: "advanced"}, g = c(f),
            y = u.joinMode = {noVerify: 0, needVerify: 1, rejectAll: 2};
        l.joinMode = {0: "noVerify", 1: "needVerify", 2: "rejectAll"}, m.push("join"), d.joinMode = c(y);
        var h = u.beInviteMode = {needVerify: 0, noVerify: 1};
        l.beInviteMode = {0: "needVerify", 1: "noVerify"}, m.push("beInvite"), d.beInviteMode = c(h);
        var v = u.inviteMode = {manager: 0, all: 1};
        l.inviteMode = {0: "manager", 1: "all"}, m.push("invite"), d.inviteMode = c(v);
        var b = u.updateTeamMode = {manager: 0, all: 1};
        l.updateTeamMode = {0: "manager", 1: "all"}, m.push("updateTeam"), d.updateTeamMode = c(b);
        var M = u.updateCustomMode = {manager: 0, all: 1};
        l.updateCustomMode = {0: "manager", 1: "all"}, m.push("updateCustom"), d.updateCustomMode = c(M);
        var T = r.prototype;
        T.setMode = function (e, t) {
            var n = this;
            t += "Mode", i(e[t]) && (s.verifyParamValid(t, e[t], d[t], "team::Team"), n[t] = u[t][e[t]])
        }, r.reverse = function (e, t) {
            var n = s.copy(e);
            if (i(n.teamId) && (n.teamId = "" + n.teamId), i(n.type) && (n.type = p[n.type]), i(n.level) && (n.level = +n.level), i(n.valid) && (n.valid = 1 === +n.valid), i(n.memberNum) && (n.memberNum = +n.memberNum), i(n.memberUpdateTime) && (n.memberUpdateTime = +n.memberUpdateTime), i(n.createTime) && (n.createTime = +n.createTime), i(n.updateTime) && (n.updateTime = +n.updateTime), i(n.validToCurrentUser) && (n.validToCurrentUser = "1" === n.validToCurrentUser), i(n.mute) && (n.mute = "1" === n.mute), i(n.muteType)) switch (n.muteType) {
                case"0":
                    n.mute = !1, n.muteType = "none";
                    break;
                case"1":
                    n.mute = !0, n.muteType = "normal";
                    break;
                case"2":
                    n.mute = !0, n.muteType = "all"
            } else i(n.mute) && (1 === n.mute ? (n.mute = !0, n.muteType = "normal") : (n.mute = !1, n.muteType = "none"));
            return m.forEach(o.bind(null, n)), delete n.bits, t || r.fillProperties(n), n
        }, r.fillProperties = function (e) {
            var t = a(e, "beInviteMode", "needVerify"), n = a(e, "inviteMode", "manager"),
                r = a(e, "updateTeamMode", "manager"), o = a(e, "updateCustomMode", "manager"), s = a(e, "avatar", "");
            return t || n || r || o || s
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            s.verifyOptions(e, "appKey account chatroomId chatroomAddresses", "protocol::ChatroomProtocol"), e.isAnonymous || s.verifyOptions(e, "token", "protocol::ChatroomProtocol"), s.verifyParamType("chatroomAddresses", e.chatroomAddresses, "array", "protocol::ChatroomProtocol"), s.verifyCallback(e, "onconnect onerror onwillreconnect ondisconnect onmsg onmsgs onrobots", "protocol::ChatroomProtocol"), o.call(t, e)
        }

        var o = n(64), s = n(1), i = s.undef, a = s.notundef, c = n(4), u = n(97).getInstance("Chatroom"), l = n(160),
            m = n(142), d = o.fn, f = r.fn = r.prototype = Object.create(d);
        f.init = function () {
            var e = this;
            d.init.call(e), e.parser = u, e.syncResult = {}, e.timetags = {}, e.msgBuffer = []
        }, f.reset = function () {
            var e = this;
            d.reset.call(e);
            var t = e.options;
            i(t.msgBufferInterval) && (t.msgBufferInterval = 300), s.verifyParamType("msgBufferInterval", t.msgBufferInterval, "number", "protocol::ChatroomProtocol.reset"), i(t.msgBufferSize) && (t.msgBufferSize = 500), s.verifyParamType("msgBufferSize", t.msgBufferSize, "number", "protocol::ChatroomProtocol.reset"), a(t.chatroomAddresses) && (e.socketUrls = t.chatroomAddresses.map(function (t) {
                return c.formatSocketUrl({url: t, secure: e.options.secure})
            }), e.socketUrlsBackup = e.socketUrls.slice(0))
        }, f.processChatroom = function (e) {
            var t = this;
            switch (e.cmd) {
                case"login":
                    e.error || (e.obj = {
                        chatroom: l.reverse(e.content.chatroom),
                        member: m.reverse(e.content.chatroomMember)
                    });
                    break;
                case"kicked":
                    t.onKicked(e);
                    break;
                case"logout":
                    break;
                case"sendMsg":
                    t.onSendMsg(e);
                    break;
                case"msg":
                    t.onMsg(e);
                    break;
                case"getChatroomMembers":
                    t.onChatroomMembers(e);
                    break;
                case"getHistoryMsgs":
                    t.onHistoryMsgs(e);
                    break;
                case"markChatroomMember":
                    t.onMarkChatroomMember(e);
                    break;
                case"closeChatroom":
                    break;
                case"getChatroom":
                    t.onChatroom(e);
                    break;
                case"updateChatroom":
                    break;
                case"updateMyChatroomMemberInfo":
                    delete e.obj.chatroomMember;
                    break;
                case"getChatroomMembersInfo":
                    t.onChatroomMembersInfo(e);
                    break;
                case"kickChatroomMember":
                    break;
                case"updateChatroomMemberTempMute":
                    break;
                case"queueList":
                    e.error || (e.obj = e.content);
                    break;
                case"syncRobot":
                    t.onSyncRobot(e)
            }
        }, f.onChatroom = function (e) {
            e.error || (e.obj.chatroom = l.reverse(e.content.chatroom))
        }, e.exports = r, n(265), n(264), n(267), n(266)
    }, , function (e, t, n) {
        "use strict";

        function r(e) {
            var t = e.mode, n = f, r = d.getGlobal();
            return r.FormData || (t = "iframe"), "iframe" === t && (n = e.upload ? p : g), new n(e)
        }

        function o(e) {
            var t = e.upload = "multipart/form-data" === (e.headers || d.o)["Content-Type"], n = !1;
            try {
                var o = (location.protocol + "//" + location.host).toLowerCase(), s = d.url2origin(e.url);
                n = o !== s
            } catch (i) {
            }
            return e.cors = n, t || n || e.mode ? r(e) : new f(e)
        }

        function s(e) {
            var t = y[e];
            t && (t.req.destroy(), delete y[e])
        }

        function i(e, t) {
            t = {data: t};
            var n = e.result.headers;
            return n && (t.headers = e.req.header(n)), t
        }

        function a(e, t, n) {
            var r = y[e];
            if (r) {
                "onload" === t && r.result && (n = i(r, n)), s(e);
                var o = {type: t, result: n};
                h(o), o.stopped || r[t](o.result)
            }
        }

        function c(e, t) {
            a(e, "onload", t)
        }

        function u(e, t) {
            a(e, "onerror", t)
        }

        function l(e, t) {
            var n = d.genUrlSep(e);
            return t = t || "", d.isObject(t) && (t = d.object2query(t)), t && (e += n + t), e
        }

        function m(e, t) {
            t = t || {};
            var n = d.uniqueID(), r = {result: t.result, onload: t.onload || d.f, onerror: t.onerror || d.f};
            y[n] = r, t.onload = c.bind(null, n), t.onerror = u.bind(null, n), t.query && (e = l(e, t.query));
            var s = t.method || "";
            return s && !/get/i.test(s) || !t.data || (e = l(e, t.data), t.data = null), t.url = e, r.req = o(t), n
        }

        var d = n(44), f = n(179), p = n(178), g = n(177), y = {}, h = d.f;
        m.filter = function (e) {
            d.isFunction(e) && (h = e)
        }, m.abort = function (e) {
            var t = y[e];
            t && t.req.abort()
        }, e.exports = m
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            e.onload && t.once("load", e.onload), e.onerror && t.once("error", e.onerror), e.onbeforesend && t.once("beforesend", e.onbeforesend), e.onaftersend && t.once("aftersend", e.onaftersend), e = t.options = o.fetch({
                method: "GET",
                url: "",
                sync: !1,
                data: null,
                headers: {},
                cookie: !1,
                timeout: 6e4,
                type: "text",
                form: null,
                input: null,
                putFileAtEnd: !1,
                proxyUrl: ""
            }, e);
            var n = e.headers, r = "Content-Type";
            o.notexist(n[r]) && (n[r] = "application/x-www-form-urlencoded"), t.send()
        }

        var o = n(44), s = o.f, i = n(199), a = r.prototype = Object.create(i.prototype);
        a.send = function () {
            var e = this, t = e.options;
            setTimeout(function () {
                try {
                    try {
                        e.emit("beforesend", t)
                    } catch (n) {
                        console.error("ignore error ajax beforesend,", n)
                    }
                    e.doSend()
                } catch (n) {
                    console.error("ignore error server error,", n), e.onError("serverError", "请求失败:" + n.message)
                }
            }, 0)
        }, a.doSend = s, a.afterSend = function () {
            var e = this;
            setTimeout(function () {
                e.emit("aftersend", e.options)
            }, 0)
        }, a.onLoad = function (e) {
            var t = this, n = t.options, r = e.status, o = e.result;
            if (0 !== ("" + r).indexOf("2")) return void t.onError("serverError", "服务器返回异常状态", {status: r, result: o});
            if ("json" === n.type) try {
                o = JSON.parse(o)
            } catch (s) {
                return console.error("ignore error parse json,", s), void t.onError("parseError", o)
            }
            t.emit("load", o)
        }, a.onError = function (e, t, n) {
            var r = o.isObject(n) ? n : {};
            r.code = e || "error", r.message = t || "发生错误", this.emit("error", r)
        }, a.onTimeout = function () {
            this.onError("timeout", "请求超时")
        }, a.abort = function () {
            this.onError("abort", "客户端中止")
        }, a.header = function (e) {
            var t = this;
            if (!o.isArray(e)) return t.getResponseHeader(e || "");
            var n = {};
            return e.forEach(function (e) {
                n[e] = t.header(e)
            }), n
        }, a.getResponseHeader = s, a.destroy = s, e.exports = r
    }, , , function (e, t) {
        function n(e, t) {
            for (var n = t.split("."); n.length;) {
                var r = n.shift(), o = !1;
                if ("?" == r[r.length - 1] && (r = r.slice(0, -1), o = !0), e = e[r], !e && o) return e
            }
            return e
        }

        e.exports = n
    }, , function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            return t.subType = "chatroom", e.Protocol = s, e.Message = c, e.constructor = r, e.isAnonymous && (e.account = e.account || "nimanon_" + u.guid(), e.isAnonymous = 1, u.verifyOptions(e, "chatroomNick", "api::Chatroom"), e.chatroomAvatar = e.chatroomAvatar || " "), t.init(e)
        }

        var o = n(48), s = n(105), i = n(4), a = n(160), c = n(245), u = n(1), l = u.verifyOptions,
            m = u.verifyParamType, d = n(97).getInstance("Chatroom");
        r.Protocol = s, r.parser = d, r.use = o.use, r.getInstance = function (e) {
            return e.isAnonymous && (e.account = e.account || "nimanon_" + u.guid(), e.isAnonymous = 1, u.verifyOptions(e, "chatroomNick", "api::Chatroom.getInstance"), e.chatroomAvatar = e.chatroomAvatar || " "), o.getInstance.call(this, e)
        }, r.genInstanceName = function (e) {
            return u.verifyOptions(e, "chatroomId", "api::Chatroom.genInstanceName"), "Chatroom-account-" + e.account + "-chatroomId-" + e.chatroomId
        };
        var f = r.fn = r.prototype = Object.create(o.prototype);
        r.info = f.info = i.info, f.getChatroom = function (e) {
            var t = this;
            t.processCallback(e), t.sendCmd("getChatroom", e)
        }, f.updateChatroom = function (e) {
            l(e, "chatroom needNotify", "api::updateChatroom"), m("needNotify", e.needNotify, "boolean"), this.processCustom(e), this.processCallback(e), e.chatroom = new a(e.chatroom), this.sendCmd("updateChatroom", e)
        }, f.closeChatroom = function (e) {
            var t = this;
            t.processCustom(e), t.processCallback(e), t.sendCmd("closeChatroom", e)
        }, e.exports = r, n(210), n(209), n(211)
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size md5", !0, "file.", "msg::FileMessage"), e.type) {
                case"image":
                    c.verifyFile(e.file, "msg::FileMessage");
                    break;
                case"audio":
                    u.verifyFile(e.file, "msg::FileMessage");
                    break;
                case"video":
                    l.verifyFile(e.file, "msg::FileMessage")
            }
            s.call(this, e), this.attach = JSON.stringify(e.file)
        }

        var o = n(74), s = n(65), i = n(1), a = n(4);
        r.prototype = Object.create(s.prototype), r.reverse = function (e) {
            var t = s.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, t.file.url = (0, o.genPrivateUrl)(t.file.url), "audio" === t.type && (t.file.mp3Url = t.file.url + "?audioTrans&type=mp3"), a.httpsEnabled && (t.file.url = t.file.url.replace("http", "https")), t
        }, e.exports = r;
        var c = n(244), u = n(241), l = n(250)
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size md5", !0, "file.", "msg::FileMessage"), e.type) {
                case"image":
                    c.verifyFile(e.file, "msg::FileMessage");
                    break;
                case"audio":
                    u.verifyFile(e.file, "msg::FileMessage");
                    break;
                case"video":
                    l.verifyFile(e.file, "msg::FileMessage")
            }
            s.call(this, e), this.attach = JSON.stringify(e.file)
        }

        var o = n(74), s = n(66), i = n(1), a = n(4);
        r.prototype = Object.create(s.prototype), r.reverse = function (e) {
            var t = s.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, t.file.url = (0, o.genPrivateUrl)(t.file.url), "audio" === t.type && (t.file.mp3Url = t.file.url + "?audioTrans&type=mp3"), a.httpsEnabled && (t.file.url = t.file.url.replace("http", "https")), t
        }, e.exports = r;
        var c = n(254), u = n(251), l = n(260)
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.merge(this, e), s.notundef(this.gender) && (s.verifyParamValid("gender", this.gender, r.validGenders, "user::User"), this.gender = i[this.gender]), s.notundef(this.email) && "" !== this.email && s.verifyEmail("email", this.email, "user::User"), s.notundef(this.birth) && "" !== this.birth && s.verifyBirth("birth", this.birth, "user::User"), s.notundef(this.tel) && "" !== this.tel && s.verifyTel("tel", this.tel, "user::User")
        }

        var o = n(74), s = n(1), i = {unknown: 0, male: 1, female: 2}, a = {0: "unknown", 1: "male", 2: "female"};
        r.reverse = function (e) {
            var t = s.filterObj(e, "account nick avatar sign gender email birth tel custom createTime updateTime");
            return s.notundef(t.avatar) && (t.avatar = (0, o.genPrivateUrl)(t.avatar)), s.notundef(t.gender) && (t.gender = a[t.gender]), s.notundef(t.createTime) && (t.createTime = +t.createTime), s.notundef(t.updateTime) && (t.updateTime = +t.updateTime), t
        }, r.reverseUsers = function (e) {
            return e.map(function (e) {
                return r.reverse(e)
            })
        }, r.validGenders = Object.keys(i), e.exports = r
    }, , , , , , , , , , , , , , , , , function (e, t, n) {
        "use strict";

        function r(e) {
            o.verifyOptions(e, "type", "image::ImageOp"), o.verifyParamValid("type", e.type, r.validTypes, "image::ImageOp"), o.merge(this, e), this.type = s[e.type]
        }

        var o = n(1), s = {
            stripmeta: 0, blur: 2, quality: 3, crop: 4, rotate: 5, thumbnail: 7,
            interlace: 9
        }, i = {
            0: "stripmeta",
            1: "type",
            2: "blur",
            3: "quality",
            4: "crop",
            5: "rotate",
            6: "pixel",
            7: "thumbnail",
            8: "watermark",
            9: "interlace",
            10: "tmp"
        };
        r.validTypes = Object.keys(s), r.reverse = function (e) {
            var t = o.copy(e);
            return t.type = i[t.type], t
        }, r.reverseImageOps = function (e) {
            return e.map(function (e) {
                return r.reverse(e)
            })
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var n = {
            link: {id: 1, heartbeat: 2},
            misc: {
                id: 6,
                getSimpleNosToken: 1,
                getNosToken: 2,
                notifyUploadLog: 3,
                uploadSdkLogUrl: 4,
                audioToText: 5,
                processImage: 6,
                getClientAntispam: 17,
                getNosTokenTrans: 7,
                notifyTransLog: 8,
                fetchFile: 9,
                fetchFileList: 10,
                removeFile: 11
            }
        }, r = {
            heartbeat: {sid: n.link.id, cid: n.link.heartbeat},
            getSimpleNosToken: {sid: n.misc.id, cid: n.misc.getSimpleNosToken, params: [{type: "int", name: "num"}]},
            getNosToken: {sid: n.misc.id, cid: n.misc.getNosToken, params: [{type: "String", name: "responseBody"}]},
            uploadSdkLogUrl: {sid: n.misc.id, cid: n.misc.uploadSdkLogUrl, params: [{type: "string", name: "url"}]},
            audioToText: {sid: n.misc.id, cid: n.misc.audioToText, params: [{type: "Property", name: "audioToText"}]},
            processImage: {
                sid: n.misc.id,
                cid: n.misc.processImage,
                params: [{type: "String", name: "url"}, {type: "PropertyArray", name: "imageOps", entity: "imageOp"}]
            },
            getClientAntispam: {
                sid: n.misc.id,
                cid: n.misc.getClientAntispam,
                params: [{type: "Property", name: "clientAntispam"}]
            },
            getNosTokenTrans: {
                sid: n.misc.id,
                cid: n.misc.getNosTokenTrans,
                params: [{type: "Property", name: "transToken"}]
            },
            fetchFile: {sid: n.misc.id, cid: n.misc.fetchFile, params: [{type: "String", name: "docId"}]},
            fetchFileList: {
                sid: n.misc.id,
                cid: n.misc.fetchFileList,
                params: [{type: "Property", name: "fileListParam"}]
            },
            removeFile: {sid: n.misc.id, cid: n.misc.removeFile, params: [{type: "String", name: "docId"}]}
        }, o = {
            "1_2": {service: "link", cmd: "heartbeat"},
            "6_1": {
                service: "misc",
                cmd: "getSimpleNosToken",
                response: [{type: "PropertyArray", name: "nosTokens", entity: "nosToken"}]
            },
            "6_2": {service: "misc", cmd: "getNosToken", response: [{type: "Property", name: "nosToken"}]},
            "6_3": {service: "misc", cmd: "notifyUploadLog"},
            "6_5": {service: "misc", cmd: "audioToText", response: [{type: "String", name: "text"}]},
            "6_6": {service: "misc", cmd: "processImage", response: [{type: "String", name: "url"}]},
            "6_17": {service: "misc", cmd: "getClientAntispam", response: [{type: "Property", name: "clientAntispam"}]},
            "6_7": {
                service: "misc",
                cmd: "getNosTokenTrans",
                response: [{type: "Property", name: "nosToken"}, {type: "String", name: "docId"}]
            },
            "6_8": {service: "misc", cmd: "notifyTransLog", response: [{type: "Property", name: "transInfo"}]},
            "6_9": {
                service: "misc",
                cmd: "fetchFile",
                response: [{type: "Property", name: "info", entity: "transInfo"}]
            },
            "6_10": {
                service: "misc",
                cmd: "fetchFileList",
                response: [{type: "PropertyArray", name: "list", entity: "transInfo"}, {
                    type: "Number",
                    name: "totalCount"
                }]
            },
            "6_11": {service: "misc", cmd: "removeFile", response: [{type: "String", name: "res"}]}
        };
        e.exports = {idMap: n, cmdConfig: r, packetConfig: o}
    }, , function (e, t, n) {
        "use strict";
        var r = n(44), o = r.getGlobal(), s = {}, i = o.name || "_parent", a = [], c = "MSG|", u = [];
        s.addMsgListener = function (e) {
            a.push(e)
        };
        var l = function (e) {
            for (var t = 0, n = a.length; t < n; t++) try {
                a[t].call(null, e)
            } catch (r) {
            }
        }, m = function () {
            var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
            return function (t) {
                return t = t || "", e.test(t) ? RegExp.$1 : "*"
            }
        }(), d = function () {
            var e = unescape(o.name || "").trim();
            if (e && 0 === e.indexOf(c)) {
                o.name = "";
                var t = r.string2object(e.replace(c, ""), "|"), n = (t.origin || "").toLowerCase();
                n && "*" !== n && 0 !== location.href.toLowerCase().indexOf(n) || l({
                    data: JSON.parse(t.data || "null"),
                    source: o.frames[t.self] || t.self,
                    origin: m(t.ref || document.referrer)
                })
            }
        }, f = function () {
            var e, t = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return !0;
                return !1
            };
            return function () {
                if (u.length) {
                    e = [];
                    for (var n, r = u.length - 1; r >= 0; r--) n = u[r], t(e, n.w) || (e.push(n.w), u.splice(r, 1), n.w.name = n.d);
                    e = null
                }
            }
        }(), p = s.startTimer = function () {
            var e = !1;
            return function () {
                e || (e = !0, o.postMessage || (setInterval(f, 100), setInterval(d, 20)))
            }
        }();
        s.postMessage = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (r.fillUndef(t, {origin: "*", source: i}), o.postMessage) {
                var n = t.data;
                o.FormData || (n = JSON.stringify(n)), e.postMessage(n, t.origin)
            } else {
                if (p(), r.isObject(t)) {
                    var s = {};
                    s.origin = t.origin || "", s.ref = location.href, s.self = t.source, s.data = JSON.stringify(t.data), t = c + r.object2string(s, "|", !0)
                }
                u.unshift({w: e, d: escape(t)})
            }
        }, e.exports = s
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = {};
        o.fromDataURL = r.blobFromDataURL, e.exports = o
    }, function (e, t) {
        function n(e) {
            var t = r.call(e);
            return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
        }

        e.exports = n;
        var r = Object.prototype.toString
    }, function (e, t) {
        e.exports = function n(e, t) {
            "use strict";
            var r, o, s = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                i = /(^[ ]*|[ ]*$)/g,
                a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                c = /^0x[0-9a-f]+$/i, u = /^0/, l = function (e) {
                    return n.insensitive && ("" + e).toLowerCase() || "" + e
                }, m = l(e).replace(i, "") || "", d = l(t).replace(i, "") || "",
                f = m.replace(s, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                p = d.replace(s, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                g = parseInt(m.match(c), 16) || 1 !== f.length && m.match(a) && Date.parse(m),
                y = parseInt(d.match(c), 16) || g && d.match(a) && Date.parse(d) || null;
            if (y) {
                if (g < y) return -1;
                if (g > y) return 1
            }
            for (var h = 0, v = Math.max(f.length, p.length); h < v; h++) {
                if (r = !(f[h] || "").match(u) && parseFloat(f[h]) || f[h] || 0, o = !(p[h] || "").match(u) && parseFloat(p[h]) || p[h] || 0, isNaN(r) !== isNaN(o)) return isNaN(r) ? 1 : -1;
                if (typeof r != typeof o && (r += "", o += ""), r < o) return -1;
                if (r > o) return 1
            }
            return 0
        }
    }, function (e, t, n) {
        var r;
        (function (o) {
            !function (s, i) {
                "use strict";

                function a() {
                    return "undefined" != typeof s ? s : "undefined" != typeof self ? self : "undefined" != typeof o ? o : {}
                }

                s = a();
                var c, u = s.IDBKeyRange || s.webkitIDBKeyRange, l = {readonly: "readonly", readwrite: "readwrite"},
                    m = Object.prototype.hasOwnProperty, d = function () {
                        if (!c && (c = s.indexedDB || s.webkitIndexedDB || s.mozIndexedDB || s.oIndexedDB || s.msIndexedDB || (null === s.indexedDB && s.shimIndexedDB ? s.shimIndexedDB : i), !c)) throw"IndexedDB required";
                        return c
                    }, f = function (e) {
                        return e
                    }, p = function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
                    }, g = function (e) {
                        return "function" == typeof e
                    }, y = function (e) {
                        return "number" === p(e)
                    }, h = function (e) {
                        return "array" === p(e)
                    }, v = function (e) {
                        return e === i
                    }, b = function (e, t) {
                        var n = this, r = !1;
                        this.name = t, this.getIndexedDB = function () {
                            return e
                        }, this.add = function (t) {
                            if (r) throw"Database has been closed";
                            for (var o = [], s = 0, i = 0; i < arguments.length - 1; i++) if (Array.isArray(arguments[i + 1])) for (var a = 0; a < arguments[i + 1].length; a++) o[s] = arguments[i + 1][a], s++; else o[s] = arguments[i + 1], s++;
                            var c = e.transaction(t, l.readwrite), u = c.objectStore(t);
                            return new Promise(function (e, t) {
                                o.forEach(function (e) {
                                    var t;
                                    if (e.item && e.key) {
                                        var n = e.key;
                                        e = e.item, t = u.add(e, n)
                                    } else t = u.add(e);
                                    t.onsuccess = function (t) {
                                        var n = t.target, r = n.source.keyPath;
                                        null === r && (r = "__id__"), Object.defineProperty(e, r, {
                                            value: n.result,
                                            enumerable: !0
                                        })
                                    }
                                }), c.oncomplete = function () {
                                    e(o, n)
                                }, c.onerror = function (e) {
                                    e.preventDefault(), t(e)
                                }, c.onabort = function (e) {
                                    t(e)
                                }
                            })
                        }, this.updateAndDelete = function (t, n, o) {
                            if (r) throw"Database has been closed";
                            var s = e.transaction(t, l.readwrite), i = s.objectStore(t), a = i.keyPath;
                            return new Promise(function (e, t) {
                                n.forEach(function (e) {
                                    if (e.item && e.key) {
                                        var t = e.key;
                                        e = e.item, i.put(e, t)
                                    } else i.put(e)
                                }), o.forEach(function (e) {
                                    i["delete"](e[a])
                                }), s.oncomplete = function () {
                                    e([n, o])
                                }, s.onerror = function (e) {
                                    t(e)
                                }
                            })
                        }, this.update = function (t) {
                            if (r) throw"Database has been closed";
                            for (var o, s = [], i = 1; i < arguments.length; i++) o = arguments[i], Array.isArray(o) ? s = s.concat(o) : s.push(o);
                            var a = e.transaction(t, l.readwrite), c = a.objectStore(t);
                            c.keyPath;
                            return new Promise(function (e, t) {
                                s.forEach(function (e) {
                                    var t;
                                    if (e.item && e.key) {
                                        var n = e.key;
                                        e = e.item, t = c.put(e, n)
                                    } else t = c.put(e);
                                    t.onsuccess = function (e) {
                                    }, t.onerror = function (e) {
                                    }
                                }), a.oncomplete = function () {
                                    e(s, n)
                                }, a.onerror = function (e) {
                                    t(e)
                                }, a.onabort = function (e) {
                                    t(e)
                                }
                            })
                        }, this.remove = function (t, n) {
                            if (r) throw"Database has been closed";
                            var o = e.transaction(t, l.readwrite), s = o.objectStore(t);
                            return new Promise(function (e, t) {
                                Array.isArray(n) || (n = [n]), n.forEach(function (e) {
                                    s["delete"](e)
                                }), o.oncomplete = function () {
                                    e(n)
                                }, o.onerror = function (e) {
                                    t(e)
                                }, o.onabort = function (e) {
                                    t(e)
                                }
                            })
                        }, this.clear = function (t) {
                            if (r) throw"Database has been closed";
                            var n = e.transaction(t, l.readwrite), o = n.objectStore(t);
                            o.clear();
                            return new Promise(function (e, t) {
                                n.oncomplete = function () {
                                    e()
                                }, n.onerror = function (e) {
                                    t(e)
                                }
                            })
                        }, this.close = function () {
                            r || (e.close(), r = !0, delete S[t])
                        }, this.get = function (t, n) {
                            if (r) throw"Database has been closed";
                            var o = e.transaction(t), s = o.objectStore(t), i = s.get(n);
                            return new Promise(function (e, t) {
                                i.onsuccess = function (t) {
                                    e(t.target.result)
                                }, o.onerror = function (e) {
                                    t(e)
                                }
                            })
                        }, this.query = function (t, n) {
                            if (r) throw"Database has been closed";
                            return new M(t, e, n)
                        }, this.count = function (t, n) {
                            if (r) throw"Database has been closed";
                            var o = e.transaction(t);
                            o.objectStore(t)
                        };
                        for (var o = 0, s = e.objectStoreNames.length; o < s; o++) !function (e) {
                            n[e] = {};
                            for (var t in n) m.call(n, t) && "close" !== t && (n[e][t] = function (t) {
                                return function () {
                                    var r = [e].concat([].slice.call(arguments, 0));
                                    return n[t].apply(n, r)
                                }
                            }(t))
                        }(e.objectStoreNames[o])
                    }, M = function (e, t, n) {
                        var r = this, o = !1, s = !1, a = function (r, a, c, m, d, f, p) {
                            return new Promise(function (y, h) {
                                var v = o || s ? l.readwrite : l.readonly, b = t.transaction(e, v), M = b.objectStore(e),
                                    T = n ? M.index(n) : M, k = r ? u[r].apply(null, a) : null, S = [], w = [k], C = 0;
                                d = d ? d : null, f = f ? f : [], "count" !== c && w.push(m || "next");
                                var O = !!o && Object.keys(o), I = function (e) {
                                    for (var t = 0; t < O.length; t++) {
                                        var n = O[t], r = o[n];
                                        r instanceof Function && (r = r(e)), e[n] = r
                                    }
                                    return e
                                };
                                T[c].apply(T, w).onsuccess = function (e) {
                                    var t = e.target.result;
                                    if ("number" == typeof t) S = t; else if (t) if (null !== d && d[0] > C) C = d[0], t.advance(d[0]); else if (null !== d && C >= d[0] + d[1]) ; else {
                                        var n = !0, r = "value" in t ? t.value : t.key;
                                        f.forEach(function (e) {
                                            e && e.length && (2 === e.length ? n = n && r[e[0]] === e[1] : g(e[0]) && (n = n && e[0].apply(i, [r])))
                                        }), n && (C++, S.push(p(r)), s ? t["delete"]() : o && (r = I(r), t.update(r))), t["continue"]()
                                    }
                                }, b.oncomplete = function () {
                                    y(S)
                                }, b.onerror = function (e) {
                                    h(e)
                                }, b.onabort = function (e) {
                                    h(e)
                                }
                            })
                        }, c = function (e, t) {
                            var n = "next", r = "openCursor", i = [], c = null, u = f, l = !1, m = function () {
                                return a(e, t, r, l ? n + "unique" : n, c, i, u)
                            }, d = function () {
                                return n = null, r = "count", {execute: m}
                            }, p = function () {
                                return c = h(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments, 0, 2), 1 == c.length && c.unshift(0), y(c[1]) || (c = null), {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, b = function (e) {
                                return e = !!v(e) || !!e, e && (r = "openKeyCursor"), {
                                    execute: m,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, M = function () {
                                return i.push(Array.prototype.slice.call(arguments, 0, 2)), {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, T = function (e) {
                                return e = !!v(e) || !!e, n = e ? "next" : "prev", {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, k = function (e) {
                                return e = !!v(e) || !!e, n = e ? "prev" : "next", {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, S = function (e) {
                                return e = !!v(e) || !!e, l = e, {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, w = function (e) {
                                return o = e, {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, C = function (e) {
                                return g(e) && (u = e), {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            }, O = function (e) {
                                return e = !!v(e) || !!e, s = e, {
                                    execute: m,
                                    count: d,
                                    keys: b,
                                    filter: M,
                                    asc: T,
                                    desc: k,
                                    distinct: S,
                                    modify: w,
                                    limit: p,
                                    map: C,
                                    remove: O
                                }
                            };
                            return {
                                execute: m,
                                count: d,
                                keys: b,
                                filter: M,
                                asc: T,
                                desc: k,
                                distinct: S,
                                modify: w,
                                limit: p,
                                map: C,
                                remove: O
                            }
                        };
                        "only bound upperBound lowerBound".split(" ").forEach(function (e) {
                            r[e] = function () {
                                return new c(e, arguments)
                            }
                        }), this.filter = function () {
                            var e = new c(null, null);
                            return e.filter.apply(e, arguments)
                        }, this.all = function () {
                            return this.filter()
                        }
                    }, T = function (e, t, n) {
                        "function" == typeof t && (t = t());
                        for (var r in t) {
                            var o, s = t[r];
                            o = !m.call(t, r) || n.objectStoreNames.contains(r) ? e.currentTarget.transaction.objectStore(r) : n.createObjectStore(r, s.key);
                            for (var i in s.indexes) {
                                var a = s.indexes[i];
                                try {
                                    o.index(i)
                                } catch (e) {
                                    o.createIndex(i, a.key || i, Object.keys(a).length ? a : {unique: !1})
                                }
                            }
                        }
                    }, k = function (e, t, n, r) {
                        var o = e.target.result, s = new b(o, t);
                        return S[t] = o, Promise.resolve(s)
                    }, S = {}, w = {
                        version: "0.10.2", open: function (e) {
                            var t;
                            return new Promise(function (n, r) {
                                if (S[e.server]) k({target: {result: S[e.server]}}, e.server, e.version, e.schema).then(n, r); else {
                                    try {
                                        t = d().open(e.server, e.version)
                                    } catch (o) {
                                        r(o)
                                    }
                                    t.onsuccess = function (t) {
                                        k(t, e.server, e.version, e.schema).then(n, r)
                                    }, t.onupgradeneeded = function (t) {
                                        T(t, e.schema, t.target.result)
                                    }, t.onerror = function (e) {
                                        r(e)
                                    }
                                }
                            })
                        }, remove: function (e) {
                            return new Promise(function (t, n) {
                                if (!e) return t();
                                typeof e === b && (e = e.name);
                                var r;
                                "string" == typeof e && (r = S[e]), r && "function" == typeof r.close && r.close();
                                var o;
                                try {
                                    o = d().deleteDatabase(e)
                                } catch (s) {
                                    n(s)
                                }
                                o.onsuccess = function (n) {
                                    delete S[e], t(e)
                                }, o.onerror = function (e) {
                                    n(e)
                                }, o.onblocked = function (e) {
                                    n(e)
                                }
                            })
                        }
                    };
                "undefined" != typeof e && "undefined" != typeof e.exports ? e.exports = w : (r = function () {
                    return w
                }.call(t, n, t, e), !(r !== i && (e.exports = r)))
            }(window)
        }).call(t, function () {
            return this
        }())
    }, function (e, t, n) {
        "use strict";
        var r = n(46), o = n(201), s = n(100), i = n(139), a = n(111), c = n(140), u = n(1), l = n(148), m = n(137),
            d = n(62), f = n(5).Promise, p = n(183);
        e.exports = function (e) {
            u.merge(e, {
                platform: r,
                xhr: o,
                io: s,
                naturalSort: i,
                deepAccess: a,
                db: c,
                util: u,
                support: l,
                blob: m,
                ajax: d,
                Promise: f,
                LoggerPlugin: p
            })
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            i(e.nick) && (t.nick = "" + e.nick), i(e.avatar) && (t.avatar = "" + e.avatar), i(e.custom) && (t.custom = "" + e.custom)
        }

        var o = n(74), s = n(1), i = s.notundef, a = {"-1": "restricted", 0: "common", 1: "owner", 2: "manager"};
        r.reverse = function (e) {
            var t = s.copy(e);
            return i(t.chatroomId) && (t.chatroomId = "" + t.chatroomId), i(t.avatar) && (t.avatar = (0, o.genPrivateUrl)(t.avatar)), i(t.type) && (t.type = a[t.type]), i(t.level) && (t.level = +t.level), i(t.online) && (t.online = 1 === +t.online), i(t.enterTime) && (t.enterTime = +t.enterTime), i(t.guest) && (t.guest = 1 === +t.guest), i(t.blacked) && (t.blacked = 1 === +t.blacked), i(t.gaged) && (t.gaged = 1 === +t.gaged), i(t.valid) && (t.valid = 1 === +t.valid), i(t.updateTime) && (t.updateTime = +t.updateTime), i(t.tempMuted) ? t.tempMuted = 1 === +t.tempMuted : t.tempMuted = !1, i(t.tempMuteDuration) ? t.tempMuteDuration = +t.tempMuteDuration : t.tempMuteDuration = 0, t.online || delete t.enterTime, t.guest && (t.type = "guest", delete t.valid), "common" !== t.type && delete t.level, delete t.guest, t
        }, r.reverseMembers = function (e) {
            return e.map(function (e) {
                return r.reverse(e)
            })
        }, r.validTypes = Object.keys(a), e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            s(e.shouldPushNotificationWhenPCOnline) && (t.open = e.shouldPushNotificationWhenPCOnline ? 2 : 1)
        }

        var o = n(1), s = o.notundef;
        r.getDefaultConfig = function () {
            return {shouldPushNotificationWhenPCOnline: !0}
        }, r.reverse = function (e) {
            var t = {shouldPushNotificationWhenPCOnline: 1 !== +e.open};
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = n(134), s = r.merge({}, o.idMap, {
            auth: {id: 2, login: 3, kicked: 5, logout: 6, multiPortLogin: 7, kick: 8},
            user: {
                id: 3,
                markInBlacklist: 3,
                getBlacklist: 4,
                markInMutelist: 5,
                getMutelist: 6,
                getRelations: 8,
                getUsers: 7,
                updateMyInfo: 10,
                updateDonnop: 15,
                syncMyInfo: 109,
                syncUpdateMyInfo: 110
            },
            notify: {
                id: 4,
                markRead: 3,
                syncOfflineMsgs: 4,
                batchMarkRead: 5,
                syncOfflineSysMsgs: 6,
                syncRoamingMsgs: 9,
                syncMsgReceipts: 12,
                syncRobots: 15,
                syncBroadcastMsgs: 16
            },
            sync: {id: 5, sync: 1, syncTeamMembers: 2},
            msg: {
                id: 7,
                sendMsg: 1,
                msg: 2,
                sysMsg: 3,
                getHistoryMsgs: 6,
                sendCustomSysMsg: 7,
                searchHistoryMsgs: 8,
                deleteSessions: 9,
                getSessions: 10,
                syncSendMsg: 101,
                sendMsgReceipt: 11,
                msgReceipt: 12,
                deleteMsg: 13,
                msgDeleted: 14,
                markSessionAck: 16,
                broadcastMsg: 17
            },
            team: {
                id: 8,
                createTeam: 1,
                sendTeamMsg: 2,
                teamMsg: 3,
                teamMsgs: 4,
                addTeamMembers: 5,
                removeTeamMembers: 6,
                updateTeam: 7,
                leaveTeam: 8,
                getTeam: 9,
                getTeams: 10,
                getTeamMembers: 11,
                dismissTeam: 12,
                applyTeam: 13,
                passTeamApply: 14,
                rejectTeamApply: 15,
                addTeamManagers: 16,
                removeTeamManagers: 17,
                transferTeam: 18,
                updateInfoInTeam: 19,
                updateNickInTeam: 20,
                acceptTeamInvite: 21,
                rejectTeamInvite: 22,
                getTeamHistoryMsgs: 23,
                searchTeamHistoryMsgs: 24,
                updateMuteStateInTeam: 25,
                getMyTeamMembers: 26,
                getMutedTeamMembers: 27,
                sendTeamMsgReceipt: 28,
                getTeamMsgReads: 29,
                getTeamMsgReadAccounts: 30,
                notifyTeamMsgReads: 31,
                muteTeamAll: 32,
                syncMyTeamMembers: 126,
                syncTeams: 109,
                syncTeamMembers: 111,
                syncCreateTeam: 101,
                syncSendTeamMsg: 102,
                syncUpdateTeamMember: 119
            },
            friend: {
                id: 12,
                friendRequest: 1,
                syncFriendRequest: 101,
                deleteFriend: 2,
                syncDeleteFriend: 102,
                updateFriend: 3,
                syncUpdateFriend: 103,
                getFriends: 4
            },
            chatroom: {id: 13, getChatroomAddress: 1},
            filter: {id: 101, sendFilterMsg: 1, filterMsg: 2, filterSysMsg: 3, sendFilterCustomSysMsg: 7},
            eventService: {
                id: 14,
                publishEvent: 1,
                pushEvent: 2,
                subscribeEvent: 3,
                unSubscribeEventsByAccounts: 4,
                unSubscribeEventsByType: 5,
                querySubscribeEventsByAccounts: 6,
                querySubscribeEventsByType: 7,
                pushEvents: 9
            }
        }), i = r.merge({}, o.cmdConfig, {
            login: {
                sid: s.auth.id,
                cid: s.auth.login,
                params: [{type: "Property", name: "login"}]
            },
            logout: {sid: s.auth.id, cid: s.auth.logout},
            kick: {sid: s.auth.id, cid: s.auth.kick, params: [{type: "StrArray", name: "deviceIds"}]},
            markInBlacklist: {
                sid: s.user.id,
                cid: s.user.markInBlacklist,
                params: [{type: "String", name: "account"}, {type: "bool", name: "isAdd"}]
            },
            getBlacklist: {sid: s.user.id, cid: s.user.getBlacklist, params: [{type: "long", name: "time"}]},
            markInMutelist: {
                sid: s.user.id,
                cid: s.user.markInMutelist,
                params: [{type: "String", name: "account"}, {type: "bool", name: "isAdd"}]
            },
            getMutelist: {sid: s.user.id, cid: s.user.getMutelist, params: [{type: "long", name: "time"}]},
            getRelations: {sid: s.user.id, cid: s.user.getRelations, params: [{type: "long", name: "timetag"}]},
            getUsers: {sid: s.user.id, cid: s.user.getUsers, params: [{type: "StrArray", name: "accounts"}]},
            updateMyInfo: {sid: s.user.id, cid: s.user.updateMyInfo, params: [{type: "Property", name: "user"}]},
            updateDonnop: {sid: s.user.id, cid: s.user.updateDonnop, params: [{type: "Property", name: "donnop"}]},
            markRead: {
                sid: s.notify.id,
                cid: s.notify.markRead,
                params: [{type: "long", name: "id"}, {type: "ph", name: "ph"}]
            },
            batchMarkRead: {
                sid: s.notify.id,
                cid: s.notify.batchMarkRead,
                params: [{type: "byte", name: "sid"}, {type: "byte", name: "cid"}, {type: "LongArray", name: "ids"}]
            },
            sync: {sid: s.sync.id, cid: s.sync.sync, params: [{type: "Property", name: "sync"}]},
            syncTeamMembers: {
                sid: s.sync.id,
                cid: s.sync.syncTeamMembers,
                params: [{type: "LongLongMap", name: "sync"}]
            },
            sendMsg: {sid: s.msg.id, cid: s.msg.sendMsg, params: [{type: "Property", name: "msg"}]},
            getHistoryMsgs: {
                sid: s.msg.id,
                cid: s.msg.getHistoryMsgs,
                params: [{type: "String", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "long", name: "lastMsgId"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            sendCustomSysMsg: {
                sid: s.msg.id,
                cid: s.msg.sendCustomSysMsg,
                params: [{type: "Property", name: "sysMsg"}]
            },
            searchHistoryMsgs: {
                sid: s.msg.id,
                cid: s.msg.searchHistoryMsgs,
                params: [{type: "String", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "String", name: "keyword"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            getSessions: {sid: s.msg.id, cid: s.msg.getSessions, params: [{type: "long", name: "time"}]},
            deleteSessions: {sid: s.msg.id, cid: s.msg.deleteSessions, params: [{type: "StrArray", name: "sessions"}]},
            sendMsgReceipt: {
                sid: s.msg.id,
                cid: s.msg.sendMsgReceipt,
                params: [{type: "Property", name: "msgReceipt"}]
            },
            deleteMsg: {sid: s.msg.id, cid: s.msg.deleteMsg, params: [{type: "Property", name: "sysMsg"}]},
            markSessionAck: {
                sid: s.msg.id,
                cid: s.msg.markSessionAck,
                params: [{type: "byte", name: "scene"}, {type: "String", name: "to"}, {type: "long", name: "timetag"}]
            },
            createTeam: {
                sid: s.team.id,
                cid: s.team.createTeam,
                params: [{type: "Property", name: "team"}, {type: "StrArray", name: "accounts"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            sendTeamMsg: {sid: s.team.id, cid: s.team.sendTeamMsg, params: [{type: "Property", name: "msg"}]},
            addTeamMembers: {
                sid: s.team.id,
                cid: s.team.addTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            removeTeamMembers: {
                sid: s.team.id,
                cid: s.team.removeTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            updateTeam: {sid: s.team.id, cid: s.team.updateTeam, params: [{type: "Property", name: "team"}]},
            leaveTeam: {sid: s.team.id, cid: s.team.leaveTeam, params: [{type: "long", name: "teamId"}]},
            getTeam: {sid: s.team.id, cid: s.team.getTeam, params: [{type: "long", name: "teamId"}]},
            getTeams: {sid: s.team.id, cid: s.team.getTeams, params: [{type: "long", name: "timetag"}]},
            getTeamMembers: {
                sid: s.team.id,
                cid: s.team.getTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "long", name: "timetag"}]
            },
            dismissTeam: {sid: s.team.id, cid: s.team.dismissTeam, params: [{type: "long", name: "teamId"}]},
            applyTeam: {
                sid: s.team.id,
                cid: s.team.applyTeam,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "ps"}]
            },
            passTeamApply: {
                sid: s.team.id,
                cid: s.team.passTeamApply,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}]
            },
            rejectTeamApply: {
                sid: s.team.id,
                cid: s.team.rejectTeamApply,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}, {type: "String", name: "ps"}]
            },
            addTeamManagers: {
                sid: s.team.id,
                cid: s.team.addTeamManagers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            removeTeamManagers: {
                sid: s.team.id,
                cid: s.team.removeTeamManagers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            transferTeam: {
                sid: s.team.id,
                cid: s.team.transferTeam,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "account"}, {
                    type: "bool",
                    name: "leave"
                }]
            },
            updateInfoInTeam: {
                sid: s.team.id,
                cid: s.team.updateInfoInTeam,
                params: [{type: "Property", name: "teamMember"}]
            },
            updateNickInTeam: {
                sid: s.team.id,
                cid: s.team.updateNickInTeam,
                params: [{type: "Property", name: "teamMember"}]
            },
            acceptTeamInvite: {
                sid: s.team.id,
                cid: s.team.acceptTeamInvite,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}]
            },
            rejectTeamInvite: {
                sid: s.team.id,
                cid: s.team.rejectTeamInvite,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}, {type: "String", name: "ps"}]
            },
            getTeamHistoryMsgs: {
                sid: s.team.id,
                cid: s.team.getTeamHistoryMsgs,
                params: [{type: "long", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "long", name: "lastMsgId"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            searchTeamHistoryMsgs: {
                sid: s.team.id,
                cid: s.team.searchTeamHistoryMsgs,
                params: [{type: "long", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "String", name: "keyword"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            updateMuteStateInTeam: {
                sid: s.team.id,
                cid: s.team.updateMuteStateInTeam,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "account"}, {type: "int", name: "mute"}]
            },
            getMyTeamMembers: {
                sid: s.team.id,
                cid: s.team.getMyTeamMembers,
                params: [{type: "LongArray", name: "teamIds"}]
            },
            getMutedTeamMembers: {
                sid: s.team.id,
                cid: s.team.getMutedTeamMembers,
                params: [{type: "long", name: "teamId"}]
            },
            sendTeamMsgReceipt: {
                sid: s.team.id,
                cid: s.team.sendTeamMsgReceipt,
                params: [{type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceipt"}]
            },
            getTeamMsgReads: {
                sid: s.team.id,
                cid: s.team.getTeamMsgReads,
                params: [{type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceipt"}]
            },
            getTeamMsgReadAccounts: {
                sid: s.team.id,
                cid: s.team.getTeamMsgReadAccounts,
                params: [{type: "Property", name: "teamMsgReceipt"}]
            },
            muteTeamAll: {
                sid: s.team.id,
                cid: s.team.muteTeamAll,
                params: [{type: "long", name: "teamId"}, {type: "int", name: "muteType"}]
            },
            friendRequest: {
                sid: s.friend.id,
                cid: s.friend.friendRequest,
                params: [{type: "String", name: "account"}, {type: "byte", name: "type"}, {type: "String", name: "ps"}]
            },
            deleteFriend: {sid: s.friend.id, cid: s.friend.deleteFriend, params: [{type: "String", name: "account"}]},
            updateFriend: {sid: s.friend.id, cid: s.friend.updateFriend, params: [{type: "Property", name: "friend"}]},
            getFriends: {sid: s.friend.id, cid: s.friend.getFriends, params: [{type: "long", name: "timetag"}]},
            getChatroomAddress: {
                sid: s.chatroom.id,
                cid: s.chatroom.getChatroomAddress,
                params: [{type: "long", name: "chatroomId"}]
            },
            sendFilterMsg: {sid: s.filter.id, cid: s.filter.sendFilterMsg, params: [{type: "Property", name: "msg"}]},
            sendFilterCustomSysMsg: {
                sid: s.filter.id,
                cid: s.filter.sendFilterCustomSysMsg,
                params: [{type: "Property", name: "sysMsg"}]
            },
            publishEvent: {
                sid: s.eventService.id,
                cid: s.eventService.publishEvent,
                params: [{type: "Property", name: "msgEvent"}]
            },
            pushEvent: {sid: s.eventService.id, cid: s.eventService.pushEvent},
            subscribeEvent: {
                sid: s.eventService.id,
                cid: s.eventService.subscribeEvent,
                params: [{type: "Property", name: "msgEventSubscribe"}, {type: "StrArray", name: "accounts"}]
            },
            unSubscribeEventsByAccounts: {
                sid: s.eventService.id,
                cid: s.eventService.unSubscribeEventsByAccounts,
                params: [{type: "Property", name: "msgEventSubscribe"}, {type: "StrArray", name: "accounts"}]
            },
            unSubscribeEventsByType: {
                sid: s.eventService.id,
                cid: s.eventService.unSubscribeEventsByType,
                params: [{type: "Property", name: "msgEventSubscribe"}]
            },
            querySubscribeEventsByAccounts: {
                sid: s.eventService.id,
                cid: s.eventService.querySubscribeEventsByAccounts,
                params: [{type: "Property", name: "msgEventSubscribe"}, {type: "StrArray", name: "accounts"}]
            },
            querySubscribeEventsByType: {
                sid: s.eventService.id,
                cid: s.eventService.querySubscribeEventsByType,
                params: [{type: "Property", name: "msgEventSubscribe"}]
            },
            pushEvents: {sid: s.eventService.id, cid: s.eventService.pushEvents}
        }), a = r.merge({}, o.packetConfig, {
            "2_3": {
                service: "auth",
                cmd: "login",
                response: [{type: "Property", name: "loginRes"}, {
                    type: "PropertyArray",
                    name: "loginPorts",
                    entity: "loginPort"
                }]
            },
            "2_5": {
                service: "auth",
                cmd: "kicked",
                response: [{type: "Number", name: "from"}, {type: "Number", name: "reason"}]
            },
            "2_6": {service: "auth", cmd: "logout"},
            "2_7": {
                service: "auth",
                cmd: "multiPortLogin",
                response: [{type: "Number", name: "state"}, {
                    type: "PropertyArray",
                    name: "loginPorts",
                    entity: "loginPort"
                }]
            },
            "2_8": {service: "auth", cmd: "kick", response: [{type: "StrArray", name: "deviceIds"}]},
            "3_3": {service: "user", cmd: "markInBlacklist"},
            "3_103": {
                service: "user",
                cmd: "syncMarkInBlacklist",
                response: [{type: "String", name: "account"}, {type: "Boolean", name: "isAdd"}]
            },
            "3_4": {service: "user", cmd: "getBlacklist", response: [{type: "StrArray", name: "blacklist"}]},
            "3_5": {service: "user", cmd: "markInMutelist"},
            "3_105": {
                service: "user",
                cmd: "syncMarkInMutelist",
                response: [{type: "String", name: "account"}, {type: "Boolean", name: "isAdd"}]
            },
            "3_6": {service: "user", cmd: "getMutelist", response: [{type: "StrArray", name: "mutelist"}]},
            "3_8": {
                service: "user",
                cmd: "getRelations",
                response: [{
                    type: "PropertyArray",
                    name: "specialRelations",
                    entity: "specialRelation"
                }, {type: "Number", name: "timetag"}]
            },
            "3_7": {
                service: "user",
                cmd: "getUsers",
                response: [{type: "PropertyArray", name: "users", entity: "user"}]
            },
            "3_10": {service: "user", cmd: "updateMyInfo", response: [{type: "Number", name: "timetag"}]},
            "3_15": {service: "user", cmd: "updateDonnop", response: [{type: "Number", name: "timetag"}]},
            "3_115": {
                service: "user",
                cmd: "syncUpdateDonnop",
                response: [{type: "Property", name: "donnop"}, {type: "Number", name: "timetag"}]
            },
            "3_109": {
                service: "user",
                cmd: "syncMyInfo",
                response: [{type: "Property", name: "user"}, {type: "Number", name: "timetag"}]
            },
            "3_110": {service: "user", cmd: "syncUpdateMyInfo", response: [{type: "Property", name: "user"}]},
            "4_1": {service: "notify"},
            "4_2": {service: "notify"},
            "4_3": {service: "notify", cmd: "markRead"},
            "4_4": {
                service: "notify",
                cmd: "syncOfflineMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_5": {service: "notify", cmd: "batchMarkRead"},
            "4_6": {
                service: "notify",
                cmd: "syncOfflineSysMsgs",
                response: [{type: "PropertyArray", name: "sysMsgs", entity: "sysMsg"}]
            },
            "4_9": {
                service: "notify",
                cmd: "syncRoamingMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_12": {
                service: "notify",
                cmd: "syncMsgReceipts",
                response: [{type: "PropertyArray", name: "msgReceipts", entity: "msgReceipt"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "4_13": {
                service: "notify",
                cmd: "syncDonnop",
                response: [{type: "Property", name: "donnop"}, {type: "Number", name: "timetag"}]
            },
            "4_14": {
                service: "notify",
                cmd: "syncSessionAck",
                response: [{type: "StrLongMap", name: "p2p"}, {type: "LongLongMap", name: "team"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "4_15": {
                service: "notify",
                cmd: "syncRobots",
                response: [{type: "PropertyArray", name: "robots", entity: "robot"}]
            },
            "4_16": {
                service: "notify",
                cmd: "syncBroadcastMsgs",
                response: [{type: "PropertyArray", name: "broadcastMsgs", entity: "broadcastMsg"}]
            },
            "4_100": {
                service: "notify",
                cmd: "syncOfflineFilterMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_101": {
                service: "notify",
                cmd: "syncOfflineFilterSysMsgs",
                response: [{type: "PropertyArray", name: "sysMsgs", entity: "sysMsg"}]
            },
            "5_1": {service: "sync", cmd: "syncDone", response: [{type: "Number", name: "timetag"}]},
            "5_2": {service: "sync", cmd: "syncTeamMembersDone", response: [{type: "Number", name: "timetag"}]},
            "7_1": {
                service: "msg",
                cmd: "sendMsg",
                response: [{type: "Property", name: "msg"}],
                trivialErrorCodes: [7101]
            },
            "7_2": {service: "msg", cmd: "msg", response: [{type: "Property", name: "msg"}]},
            "7_3": {service: "msg", cmd: "sysMsg", response: [{type: "Property", name: "sysMsg"}]},
            "7_6": {
                service: "msg",
                cmd: "getHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "7_7": {service: "msg", cmd: "sendCustomSysMsg", trivialErrorCodes: [7101]},
            "7_8": {
                service: "msg",
                cmd: "searchHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "7_9": {service: "msg", cmd: "deleteSessions"},
            "7_10": {service: "msg", cmd: "getSessions", response: [{type: "StrArray", name: "sessions"}]},
            "7_101": {service: "msg", cmd: "syncSendMsg", response: [{type: "Property", name: "msg"}]},
            "7_11": {service: "msg", cmd: "sendMsgReceipt", response: [{type: "Property", name: "msgReceipt"}]},
            "7_12": {service: "msg", cmd: "msgReceipt", response: [{type: "Property", name: "msgReceipt"}]},
            "7_13": {service: "msg", cmd: "onDeleteMsg"},
            "7_14": {service: "msg", cmd: "onMsgDeleted", response: [{type: "Property", name: "sysMsg"}]},
            "7_15": {
                service: "msg",
                cmd: "onDeleteMsgOfflineRoaming",
                response: [{type: "PropertyArray", name: "sysMsgs", entity: "sysMsg"}, {
                    type: "Number",
                    name: "timetag"
                }, {type: "Number", name: "type"}]
            },
            "7_16": {service: "msg", cmd: "onMarkSessionAck"},
            "7_17": {service: "msg", cmd: "broadcastMsg", response: [{type: "Property", name: "broadcastMsg"}]},
            "7_116": {
                service: "msg",
                cmd: "syncMarkSessionAck",
                response: [{type: "Number", name: "scene"}, {type: "String", name: "to"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "8_1": {service: "team", cmd: "createTeam", response: [{type: "Property", name: "team"}]},
            "8_2": {service: "team", cmd: "sendTeamMsg", response: [{type: "Property", name: "msg"}]},
            "8_3": {service: "team", cmd: "teamMsg", response: [{type: "Property", name: "msg"}]},
            "8_4": {service: "team", cmd: "teamMsgs", response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]},
            "8_5": {service: "team", cmd: "addTeamMembers"},
            "8_6": {service: "team", cmd: "removeTeamMembers"},
            "8_7": {
                service: "team",
                cmd: "updateTeam",
                response: [{type: "Number", name: "id"}, {type: "Number", name: "time"}]
            },
            "8_8": {service: "team", cmd: "leaveTeam"},
            "8_9": {service: "team", cmd: "getTeam", response: [{type: "Property", name: "team"}]},
            "8_10": {
                service: "team",
                cmd: "getTeams",
                response: [{type: "PropertyArray", name: "teams", entity: "team"}, {type: "Number", name: "timetag"}]
            },
            "8_11": {
                service: "team",
                cmd: "getTeamMembers",
                response: [{type: "Number", name: "teamId"}, {
                    type: "PropertyArray",
                    name: "members",
                    entity: "teamMember"
                }, {type: "Number", name: "timetag"}]
            },
            "8_12": {service: "team", cmd: "dismissTeam"},
            "8_13": {service: "team", cmd: "applyTeam", response: [{type: "Property", name: "team"}]},
            "8_14": {service: "team", cmd: "passTeamApply"},
            "8_15": {service: "team", cmd: "rejectTeamApply"},
            "8_16": {service: "team", cmd: "addTeamManagers"},
            "8_17": {service: "team", cmd: "removeTeamManagers"},
            "8_18": {service: "team", cmd: "transferTeam"},
            "8_19": {service: "team", cmd: "updateInfoInTeam"},
            "8_20": {service: "team", cmd: "updateNickInTeam"},
            "8_21": {service: "team", cmd: "acceptTeamInvite", response: [{type: "Property", name: "team"}]},
            "8_22": {service: "team", cmd: "rejectTeamInvite"},
            "8_23": {
                service: "team",
                cmd: "getTeamHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "8_24": {
                service: "team",
                cmd: "searchTeamHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "8_25": {service: "team", cmd: "updateMuteStateInTeam"},
            "8_26": {
                service: "team",
                cmd: "getMyTeamMembers",
                response: [{type: "PropertyArray", name: "teamMembers", entity: "teamMember"}]
            },
            "8_27": {
                service: "team",
                cmd: "getMutedTeamMembers",
                response: [{type: "Number", name: "teamId"}, {
                    type: "PropertyArray",
                    name: "teamMembers",
                    entity: "teamMember"
                }]
            },
            "8_28": {
                service: "team", cmd: "sendTeamMsgReceipt", response: [{
                    type: "PropertyArray",
                    name: "teamMsgReceipts", entity: "teamMsgReceipt"
                }]
            },
            "8_29": {
                service: "team",
                cmd: "getTeamMsgReads",
                response: [{type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceipt"}]
            },
            "8_30": {
                service: "team",
                cmd: "getTeamMsgReadAccounts",
                response: [{type: "String", name: "idClient"}, {
                    type: "StrArray",
                    name: "readAccounts"
                }, {type: "StrArray", name: "unreadAccounts"}]
            },
            "8_31": {
                service: "team",
                cmd: "notifyTeamMsgReads",
                response: [{type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceipt"}]
            },
            "8_32": {service: "team", cmd: "muteTeamAll", response: []},
            "8_126": {
                service: "team",
                cmd: "syncMyTeamMembers",
                response: [{type: "PropertyArray", name: "teamMembers", entity: "teamMember"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "8_109": {
                service: "team",
                cmd: "syncTeams",
                response: [{type: "Number", name: "timetag"}, {type: "PropertyArray", name: "teams", entity: "team"}]
            },
            "8_111": {
                service: "team",
                cmd: "syncTeamMembers",
                response: [{type: "Number", name: "teamId"}, {
                    type: "PropertyArray",
                    name: "members",
                    entity: "teamMember"
                }, {type: "Number", name: "timetag"}]
            },
            "8_101": {service: "team", cmd: "syncCreateTeam", response: [{type: "Property", name: "team"}]},
            "8_102": {service: "team", cmd: "syncSendTeamMsg", response: [{type: "Property", name: "msg"}]},
            "8_119": {service: "team", cmd: "syncUpdateTeamMember", response: [{type: "Property", name: "teamMember"}]},
            "12_1": {service: "friend", cmd: "friendRequest"},
            "12_101": {
                service: "friend",
                cmd: "syncFriendRequest",
                response: [{type: "String", name: "account"}, {type: "Number", name: "type"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            "12_2": {service: "friend", cmd: "deleteFriend"},
            "12_102": {service: "friend", cmd: "syncDeleteFriend", response: [{type: "String", name: "account"}]},
            "12_3": {service: "friend", cmd: "updateFriend"},
            "12_103": {service: "friend", cmd: "syncUpdateFriend", response: [{type: "Property", name: "friend"}]},
            "12_4": {
                service: "friend",
                cmd: "getFriends",
                response: [{type: "PropertyArray", name: "friends", entity: "friend"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "12_5": {
                service: "friend",
                cmd: "syncFriends",
                response: [{type: "PropertyArray", name: "friends", entity: "friend"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "12_6": {
                service: "friend",
                cmd: "syncFriendUsers",
                response: [{type: "PropertyArray", name: "users", entity: "user"}, {type: "Number", name: "timetag"}]
            },
            "13_1": {service: "chatroom", cmd: "getChatroomAddress", response: [{type: "StrArray", name: "address"}]},
            "14_1": {service: "eventService", cmd: "publishEvent", response: [{type: "Property", name: "msgEvent"}]},
            "14_2": {service: "eventService", cmd: "pushEvent", response: [{type: "Property", name: "msgEvent"}]},
            "14_3": {service: "eventService", cmd: "subscribeEvent", response: [{type: "StrArray", name: "accounts"}]},
            "14_4": {
                service: "eventService",
                cmd: "unSubscribeEventsByAccounts",
                response: [{type: "StrArray", name: "accounts"}]
            },
            "14_5": {service: "eventService", cmd: "unSubscribeEventsByType"},
            "14_6": {
                service: "eventService",
                cmd: "querySubscribeEventsByAccounts",
                response: [{type: "PropertyArray", name: "msgEventSubscribes", entity: "msgEventSubscribe"}]
            },
            "14_7": {
                service: "eventService",
                cmd: "querySubscribeEventsByType",
                response: [{type: "PropertyArray", name: "msgEventSubscribes", entity: "msgEventSubscribe"}]
            },
            "14_9": {
                service: "eventService",
                cmd: "pushEvents",
                response: [{type: "PropertyArray", name: "msgEvents", entity: "msgEvent"}]
            },
            "101_1": {service: "filter", cmd: "sendFilterMsg", response: [{type: "Property", name: "msg"}]},
            "101_2": {service: "filter", cmd: "filterMsg", response: [{type: "Property", name: "msg"}]},
            "101_3": {service: "filter", cmd: "filterSysMsg", response: [{type: "Property", name: "sysMsg"}]},
            "101_7": {service: "filter", cmd: "sendFilterCustomSysMsg"}
        });
        e.exports = {idMap: s, cmdConfig: i, packetConfig: a}
    }, , , , function (e, t) {
        "use strict";
        var n = {};
        n.set = function (e, t, r) {
            n[e] = t, r && (r.support = t)
        }, e.exports = n
    }, function (e, t) {
        function n(e) {
            e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
        }

        e.exports = n, n.prototype.duration = function () {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random(), n = Math.floor(t * this.jitter * e);
                e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
        }, n.prototype.reset = function () {
            this.attempts = 0
        }, n.prototype.setMin = function (e) {
            this.ms = e
        }, n.prototype.setMax = function (e) {
            this.max = e
        }, n.prototype.setJitter = function (e) {
            this.jitter = e
        }
    }, , function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(63);
        r.typeMap = {
            text: 0,
            image: 1,
            audio: 2,
            video: 3,
            geo: 4,
            notification: 5,
            file: 6,
            tip: 10,
            robot: 11,
            custom: 100
        };
        var s = r.typeReverseMap = {
            0: "text",
            1: "image",
            2: "audio",
            3: "video",
            4: "geo",
            5: "notification",
            6: "file",
            10: "tip",
            11: "robot",
            100: "custom"
        };
        r.validTypes = Object.keys(r.typeMap), r.setFlow = function (e, t) {
            var n = t === e.from;
            n && t === e.to && (n = o.deviceId === e.fromDeviceId), e.flow = n ? "out" : "in", "robot" === e.type && e.content && e.content.msgOut && (e.flow = "in")
        }, r.getType = function (e) {
            var t = e.type;
            return s[t] || t
        }, e.exports = r
    }, , function (e, t, n) {
        "use strict";
        n(191), n(95), n(194), n(5).polyfill()
    }, function (e, t, n) {
        "use strict";
        var r = n(48).fn;
        r.isConnected = function () {
            return this.protocol.isConnected()
        }, r.connect = function () {
            this.protocol.appLogin = 0, this.protocol.connect()
        }, r.disconnect = function () {
            this.protocol.disconnect()
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e, t, n, r) {
            var o = !1, s = "";
            if (1 === n ? e.indexOf(t) >= 0 && (o = !0, s = t) : 2 === n && (s = new RegExp(t, "g"), s.test(e) && (o = !0)), o && "" !== s) switch (r) {
                case 1:
                    return e.replace(s, "*");
                case 2:
                    return {code: 2};
                case 3:
                    return {code: 3}
            }
            return e
        }

        function s(e, t) {
            for (var n = this, r = t.match, s = t.operate, i = e, c = 0; c < t.keys.length; c++) {
                var u = t.keys[c], l = u.match || r, m = u.operate || s;
                try {
                    if (i = o(i, u.key, l, m), "object" === ("undefined" == typeof i ? "undefined" : (0, a["default"])(i))) return i
                } catch (d) {
                    n.logger.warn("misc::filterContent: js cannot parse this regexp ", d)
                }
            }
            return i
        }

        var i = n(15), a = r(i), c = n(1), u = n(48).fn;
        u.uploadSdkLogUrl = function (e) {
            return c.verifyOptions(e, "url", "misc::uploadSdkLogUrl"), this.cbAndSendCmd("uploadSdkLogUrl", e)
        }, u.getClientAntispamLexicon = function (e) {
            var t = this;
            e = e || {};
            var n = e.done;
            n instanceof Function || (n = function () {
            }), e = {clientAntispam: {version: 0}};
            var r = this;
            return this.protocol.sendCmd("getClientAntispam", e, function (e, o, s) {
                e ? (r.protocol.logger.error("misc::getClientAntispamLexicon:", e), n.call(t, e, {})) : (n.call(t, null, s), r.antispamLexicon = s.clientAntispam || {})
            })
        }, u.filterClientAntispam = function (e) {
            var t = e.content, n = e.antispamLexicon;
            if (!t) return {code: 404, errmsg: "待反垃圾文本content不存在"};
            n = n || this.antispamLexicon || {};
            var r = this.antispamLexicon && this.antispamLexicon.thesaurus;
            if (!r) return {code: 404, errmsg: "没有反垃圾词库或者词库格式不合法"};
            try {
                r = JSON.parse(r).thesaurus
            } catch (o) {
                return this.protocol.logger.error("misc::filterClientAntispam: parse thesaurus error"), {
                    code: 500,
                    errmsg: "反垃圾词库格式不合法"
                }
            }
            for (var i = t, c = 0; c < r.length; c++) if (i = s.call(this, i, r[c]), "object" === ("undefined" == typeof i ? "undefined" : (0, a["default"])(i))) {
                if (2 === i.code) return {code: 200, type: 2, errmsg: "建议拒绝发送", content: t, result: ""};
                if (3 === i.code) return {
                    code: 200,
                    type: 3,
                    errmsg: "建议服务器处理反垃圾，发消息带上字段clientAntiSpam",
                    content: t,
                    result: t
                }
            }
            return i === t ? {code: 200, type: 0, errmsg: "", content: t, result: i} : {
                code: 200,
                type: 1,
                errmsg: "已对特殊字符做了过滤",
                content: t,
                result: i
            }
        }
    }, function (e, t, n) {
        (function (e) {
            "use strict";
            var t = n(48).fn, r = n(1), o = n(200), s = n(27), i = n(4), a = n(184), c = n(185), u = n(137);
            t.sendText = function (e) {
                var t = this;
                return t.processCallback(e), e.msg = new t.message.TextMessage(e), t.sendMsg(e)
            }, t.previewFile = function (e) {
                if (r.verifyOptions(e, "done", "msg::previewFile"), e.type || (e.type = "file"), r.verifyParamPresentJustOne(e, "dataURL blob fileInput wxFilePath", "msg::previewFile"), e.dataURL) e.blob = u.fromDataURL(e.dataURL); else if (e.blob) ; else if (e.fileInput) {
                    if (e.fileInput = r.verifyFileInput(e.fileInput, "msg::previewFile"), e.fileInput.files) {
                        if (!e.fileInput.files.length) return void e.done(s.newNoFileError("请选择" + e.type + "文件", {
                            callFunc: "msg::previewFile",
                            fileInput: e.fileInput
                        }), e);
                        e.fileSize = e.fileInput.files[0].size
                    }
                    e.fileInputName = r.getFileName(e.fileInput), e.fileInfo = r.getFileInfo(e.fileInput), e.transtype = e.fileInfo.type
                }
                this.processCallback(e);
                var t = JSON.stringify(a.genResponseBody(e.type) || {}).replace(/"/gi, '\\"'), n = null,
                    o = e.transcode ? "getNosTokenTrans" : "getNosToken";
                n = e.transcode ? {
                    transToken: {
                        name: e.fileInfo.name,
                        type: e.fileInfo.transcodeType,
                        transType: "png" === e.transcode ? 11 : 10,
                        size: e.fileInfo.size,
                        body: t
                    }
                } : t, this[o]({
                    responseBody: n, callback: function (t, n) {
                        return t ? void e.done(t, e.callback.options) : (e.transcode ? (e.nosToken = n.nosToken, e.docId = n.docId) : e.nosToken = n, void this._doPreviewFile(e))
                    }.bind(this)
                })
            }, t._doPreviewFile = function (t) {
                function n(n, c) {
                    if (t.uploaddone = s, n) return void t.done(n, t.callback.options);
                    if (c = a.parseResponse(c, o.options.exifOrientation), c.url = i.genDownloadUrl(t.nosToken.bucket, l.Object), r.exist(t.fileInputName)) c.name = t.fileInputName; else if (t.blob) {
                        var u = t.blob.name;
                        if (c.name = u || "blob-" + c.md5, !u) {
                            var m = t.blob.type;
                            c.ext = m.slice(m.lastIndexOf("/") + 1)
                        }
                    }
                    if (e.env.WEIXIN_APP && (c.name = t.wxFilePath), !c.ext) {
                        var d = c.name.lastIndexOf(".");
                        d === -1 ? c.ext = "unknown" : c.ext = c.name.slice(d + 1)
                    }
                    return void t.done(null, r.copy(c))
                }

                console.log("_doPreviewFile", t);
                var o = this, s = t.uploaddone, u = i.genUploadUrl(t.nosToken.bucket),
                    l = this.assembleUploadParams(t.nosToken), m = "file";
                e.env.WEIXIN_APP ? (r.verifyOptions(t, "wxFilePath", "msg::_doPreviewFile"), wx.uploadFile({
                    url: u,
                    filePath: t.wxFilePath,
                    name: m,
                    formData: l,
                    fail: function (e) {
                        console.log(e)
                    },
                    success: function (e) {
                        if (console.log(e), 200 === e.statusCode) try {
                            n(null, JSON.parse(e.data))
                        } catch (t) {
                            console.error("parse wx upload file res error", t), n({
                                code: "PARSE_WX_UPLOAD_FILE_RES_ERROR",
                                str: e.data,
                                msg: e.errMsg
                            })
                        } else n({code: e.statusCode, msg: e.errMsg})
                    }
                })) : (t.uploaddone = n, t.url = u, t.params = l, t.fileName = m, new c(t))
            }, t.sendFile = function (e) {
                var t = this;
                if (e.type || (e.type = "file"), r.verifyParamPresentJustOne(e, "dataURL blob fileInput file wxFilePath", "msg::sendFile"), t.processCallback(e), e.dataURL) t._previewAndSendFile(e); else if (e.blob) t._previewAndSendFile(e); else if (e.fileInput) {
                    if (e.fileInput = r.verifyFileInput(e.fileInput, "msg::sendFile"), e.fileInput.files && !e.fileInput.files.length) return void e.done(s.newNoFileError("请选择" + e.type + "文件", {
                        callFunc: "msg::sendFile",
                        fileInput: e.fileInput
                    }), e.callback.options);
                    t._previewAndSendFile(e)
                } else if (e.wxFilePath) t._previewAndSendFile(e); else if (e.file) return e.msg = new t.message.FileMessage(e), t.sendMsg(e)
            }, t._previewAndSendFile = function (e) {
                var t = this;
                r.verifyCallback(e, "uploaddone beforesend", "msg::_previewAndSendFile");
                var n = e.done;
                e.done = function (o, s) {
                    if (e.done = n, o) e.uploaddone(o, e.callback.options); else {
                        if (/chatroom/.test(e.scene)) return;
                        e.uploaddone(null, r.copy(s)), e.file = s, e.msg = new t.message.FileMessage(e), e.beforesend(t.sendMsg(e))
                    }
                }, t.previewFile(e)
            }, t.assembleUploadParams = function (e) {
                return e ? {
                    Object: decodeURIComponent(e.objectName),
                    "x-nos-token": e.token,
                    "x-nos-entity-type": "json"
                } : null
            }, t.deleteFile = function (e) {
                r.verifyParamPresentJustOne(e, "docId", "msg::deleteFile"), this.removeFile({
                    docId: e.docId,
                    callback: function (t, n) {
                        t ? e.error && e.error(t, n) : e.success && e.success(n)
                    }
                })
            }, t.getFile = function (e) {
                r.verifyParamPresentJustOne(e, "docId", "msg::getFile"), this.fetchFile({
                    docId: e.docId,
                    callback: function (t, n) {
                        t ? e.error && e.error(t, n) : e.success && e.success(n.info)
                    }
                })
            }, t.getFileList = function (e) {
                var t = e.fromDocId, n = void 0 === t ? "" : t, r = e.limit, o = void 0 === r ? 10 : r, s = {limit: o};
                n && (s.fromDocId = n), this.fetchFileList({
                    fileListParam: s, callback: function (t, n) {
                        t ? (o > 30 && (t.message = t.message + "::文档条数超过限制:30"), e.error && e.error(t, n)) : e.success && e.success(n)
                    }
                })
            }, t.sendGeo = function (e) {
                var t = this;
                return t.processCallback(e), e.msg = new t.message.GeoMessage(e), t.sendMsg(e)
            }, t.sendTipMsg = function (e) {
                var t = this;
                return t.processCallback(e), e.msg = new t.message.TipMessage(e), t.sendMsg(e)
            }, t.sendCustomMsg = function (e) {
                var t = this;
                return t.processCallback(e), e.msg = new t.message.CustomMessage(e), t.sendMsg(e)
            }, t.sendRobotMsg = function (e) {
                var t = this;
                return t.processCallback(e), e.msg = new t.message.RobotMessage(e), t.sendMsg(e)
            }, t.sendMsg = function (e) {
                var t = this, n = t.protocol, o = e.msg, s = {}, i = !!e.isLocal;
                if (i && e.time && (o.time = e.time), e.resend && ("out" !== e.flow || "fail" !== e.status)) return r.onError("只能重发发送失败的消息");
                e.callback.options.idClient = o.idClient, t.beforeSendMsg(e, s);
                var a = e.rtnMsg = t.formatReturnMsg(o);
                return i && (a.status = "success", a.isLocal = !0), n.storeSendMsg && (s.promise = n.storeSendMsg(a)), e.cbaop = function (e) {
                    if (e && "server" !== e.from) return a.status = "fail", n.updateSendMsgError && n.updateSendMsgError(a), a
                }, i || (s.msg = o, t.sendCmd(e.cmd, s, e.callback)), t.afterSendMsg(e), i && setTimeout(function () {
                    a = r.simpleClone(a), e.done(null, a)
                }, 0), r.copy(a)
            }, t.beforeSendMsg = function () {
            }, t.afterSendMsg = function () {
            }, t.formatReturnMsg = function (e) {
                var t = this;
                return e = r.copy(e), t.protocol.completeMsg(e), e.status = "sending", e = t.message.reverse(e)
            }, t.resendMsg = function (e) {
                var t = this;
                return r.verifyOptions(e, "msg", "msg::resendMsg"), t.trimMsgFlag(e), e.resend = !0, t._sendMsgByType(e)
            }, t.forwardMsg = function (e) {
                var t = this;
                return r.verifyOptions(e, "msg", "msg::forwardMsg"), t.beforeForwardMsg(e), t.trimMsgFlag(e), e.forward = !0, e.msg.idClient = r.guid(), t._sendMsgByType(e)
            }, t.trimMsgFlag = function (e) {
                e && e.msg && (e.msg = r.copy(e.msg), delete e.msg.resend, delete e.msg.forward)
            }, t.beforeForwardMsg = function () {
            }, t._sendMsgByType = function (e) {
                var t = this;
                switch (r.verifyOptions(e, "msg", "msg::_sendMsgByType"), r.verifyParamValid("msg.type", e.msg.type, t.message.validTypes, "msg::_sendMsgByType"), r.merge(e, e.msg), e.type) {
                    case"text":
                        return t.sendText(e);
                    case"image":
                    case"audio":
                    case"video":
                    case"file":
                        return t.sendFile(e);
                    case"geo":
                        return t.sendGeo(e);
                    case"custom":
                        return t.sendCustomMsg(e);
                    case"tip":
                        return t.sendTipMsg(e);
                    default:
                        throw new s("不能发送类型为 " + e.type + " 的消息")
                }
            }, t.parseRobotTemplate = function (e) {
                function t(e) {
                    if (e.link) {
                        var t = e.link;
                        Array.isArray(t) || (t = [t]), t = t.map(function (e) {
                            return e.image && (e.image = r(e)), e.text && (e.text = n(e)), "url" === e._type ? (e.type = "url", e.style = e._style || "", e.target = e._target, delete e._target, delete e._style) : "block" === e._type && (e.type = "block", e.style = e._style || "", e.params = e._params || "", e.target = e._target, delete e._params, delete e._target, delete e._style), delete e._type, e
                        }), e.link = t
                    }
                    return e.link
                }

                function n(e) {
                    return Array.isArray(e.text) || (e.text = [e.text]), e.text = e.text.map(function (e) {
                        return {type: "text", name: e._name, text: e.__text}
                    }), e.text
                }

                function r(e) {
                    return Array.isArray(e.image) || (e.image = [e.image]), e.image = e.image.map(function (e) {
                        return {type: "image", name: e._name, url: e._url}
                    }), e.image
                }

                if (/<template[^>\/]+\/>/.test(e)) return {raw: e, json: [{type: "text", name: "", text: ""}]};
                if (!/<template[^>\/]+>/.test(e)) return {raw: e, json: [{type: "text", name: "", text: e}]};
                var s = new o({escapeMode: !1});
                e = e.replace(/<template [^>]+>/, "<template>");
                var i = s.xml2js(e);
                i = i.template.LinearLayout, Array.isArray(i) || (i = [i]);
                var a = [];
                return i = i.forEach(function (e) {
                    e.image && (a = a.concat(r(e))), e.text && (a = a.concat(n(e))), e.link && (a = a.concat(t(e)))
                }), {raw: e, json: a}
            }
        }).call(t, n(31))
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = n(48).fn, s = n(133);
        o.getSimpleNosToken = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return e.num = 1, r.verifyOptions(e), this.cbAndSendCmd("getSimpleNosToken", e)
        }, o.getNosToken = function (e) {
            this.sendCmd("getNosToken", {responseBody: e.responseBody}, e.callback)
        }, o.getNosTokenTrans = function (e) {
            this.sendCmd("getNosTokenTrans", e.responseBody, e.callback)
        }, o.packFileDownloadName = function (e) {
            r.verifyOptions(e, "url name", !0, "", "nos::packFileDownloadName");
            var t = e.url;
            return t + r.genUrlSep(t) + "download=" + encodeURIComponent(e.name)
        }, o.audioToMp3 = function (e) {
            r.verifyOptions(e, "url", "nos::audioToMp3");
            var t = e.url;
            return t + r.genUrlSep(t) + "audioTrans&type=mp3"
        }, o.removeFile = function (e) {
            this.sendCmd("removeFile", e, e.callback)
        }, o.fetchFile = function (e) {
            this.sendCmd("fetchFile", e, e.callback)
        }, o.fetchFileList = function (e) {
            this.sendCmd("fetchFileList", e, e.callback)
        }, o.stripImageMeta = function (e) {
            return this.beforeProcessImage(e, "stripmeta")
        }, o.qualityImage = function (e) {
            return this.beforeProcessImage(e, "quality")
        }, o.interlaceImage = function (e) {
            return this.beforeProcessImage(e, "interlace")
        }, o.rotateImage = function (e) {
            return this.beforeProcessImage(e, "rotate")
        }, o.blurImage = function (e) {
            return this.beforeProcessImage(e, "blur")
        }, o.cropImage = function (e) {
            return this.beforeProcessImage(e, "crop")
        }, o.thumbnailImage = function (e) {
            return this.beforeProcessImage(e, "thumbnail")
        }, o.beforeProcessImage = function (e, t) {
            var n = r.copy(e);
            return n.type = t, e.ops = [n], this.processImage(e)
        }, o.processImage = function (e) {
            var t = this;
            r.verifyOptions(e, "url ops", !0, "", "nos::processImage"), r.verifyParamType("ops", e.ops, "array", "nos::processImage");
            var n = e.ops.map(function (e) {
                return r.verifyOptions(e, "type", !0, "", "nos::processImage"), r.verifyParamValid("type", e.type, s.validTypes, "nos::processImage"), t["gen" + e.type.slice(0, 1).toUpperCase() + e.type.slice(1) + "Op"](e)
            });
            t.processCallback(e), t.sendCmd("processImage", {url: e.url, imageOps: n}, e.callback)
        }, o.genStripmetaOp = function (e) {
            return new s({type: e.type, stripmeta: e.strip ? 1 : 0})
        }, o.genQualityOp = function (e) {
            r.verifyOptions(e, "quality", !0, "", "nos::genQualityOp"), r.verifyParamType("quality", e.quality, "number", "nos::genQualityOp"), r.verifyParamMin("quality", e.quality, 0, "nos::genQualityOp"), r.verifyParamMax("quality", e.quality, 100, "nos::genQualityOp");
            var t = Math.round(e.quality);
            return new s({type: e.type, qualityQuality: t})
        }, o.genInterlaceOp = function (e) {
            return new s({type: e.type})
        }, o.genRotateOp = function (e) {
            for (r.verifyOptions(e, "angle", !0, "", "nos::genRotateOp"), r.verifyParamType("angle", e.angle, "number", "nos::genRotateOp"); e.angle < 0;) e.angle = e.angle + 360;
            e.angle = e.angle % 360;
            var t = Math.round(e.angle);
            return new s({type: e.type, rotateAngle: t})
        }, o.genBlurOp = function (e) {
            r.verifyOptions(e, "radius sigma", "nos::genBlurOp"), r.verifyParamType("radius", e.radius, "number", "nos::genBlurOp"), r.verifyParamMin("radius", e.radius, 1, "nos::genBlurOp"), r.verifyParamMax("radius", e.radius, 50, "nos::genBlurOp"), r.verifyParamType("sigma", e.sigma, "number", "nos::genBlurOp"), r.verifyParamMin("sigma", e.sigma, 0, "nos::genBlurOp");
            var t = Math.round(e.radius), n = Math.round(e.sigma);
            return new s({type: e.type, blurRadius: t, blurSigma: n})
        }, o.genCropOp = function (e) {
            r.verifyOptions(e, "x y width height", "nos::genCropOp"), r.verifyParamType("x", e.x, "number", "nos::genCropOp"), r.verifyParamMin("x", e.x, 0, "nos::genCropOp"), r.verifyParamType("y", e.y, "number", "nos::genCropOp"), r.verifyParamMin("y", e.y, 0, "nos::genCropOp"), r.verifyParamType("width", e.width, "number", "nos::genCropOp"), r.verifyParamMin("width", e.width, 0, "nos::genCropOp"), r.verifyParamType("height", e.height, "number", "nos::genCropOp"), r.verifyParamMin("height", e.height, 0, "nos::genCropOp");
            var t = Math.round(e.x), n = Math.round(e.y), o = Math.round(e.width), i = Math.round(e.height);
            return new s({type: e.type, cropX: t, cropY: n, cropWidth: o, cropHeight: i})
        }, o.genThumbnailOp = function () {
            var e = {cover: "z", contain: "x", crop: "y"};
            return function (t) {
                r.verifyOptions(t, "mode", "nos::genThumbnailOp"), r.verifyParamValid("mode", t.mode, Object.keys(e), "nos::genThumbnailOp"), "contain" === t.mode ? r.verifyParamAtLeastPresentOne(t, "width height", "nos::genThumbnailOp") : r.verifyOptions(t, "width height", "nos::genThumbnailOp"), r.undef(t.width) && (t.width = 0), r.undef(t.height) && (t.height = 0), r.verifyParamType("width", t.width, "number", "nos::genThumbnailOp"), r.verifyParamMin("width", t.width, 0, "nos::genThumbnailOp"), r.verifyParamType("height", t.height, "number", "nos::genThumbnailOp"), r.verifyParamMin("height", t.height, 0, "nos::genThumbnailOp");
                var n = Math.round(t.width), o = Math.round(t.height),
                    i = new s({type: t.type, thumbnailMode: e[t.mode], thumbnailWidth: n, thumbnailHeight: o});
                if ("crop" === t.mode && r.notundef(t.axis)) {
                    r.undef(t.axis.x) && (t.axis.x = 5), r.undef(t.axis.y) && (t.axis.y = 5), r.verifyParamMin("axis.x", t.axis.x, 0, "nos::genThumbnailOp"), r.verifyParamMax("axis.x", t.axis.x, 10, "nos::genThumbnailOp"), r.verifyParamMin("axis.y", t.axis.y, 0, "nos::genThumbnailOp"), r.verifyParamMax("axis.y", t.axis.y, 10, "nos::genThumbnailOp");
                    var a = Math.round(t.axis.x), c = Math.round(t.axis.y);
                    i.thumbnailAxisX = a, i.thumbnailAxisY = c
                }
                return r.notundef(t.enlarge) && (r.verifyParamType("enlarge", t.enlarge, "boolean", "nos::genThumbnailOp"), t.enlarge && (i.thumbnailEnlarge = 1)), i
            }
        }()
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        var o = n(15), s = r(o), i = n(74), a = n(1), c = n(48).fn;
        c.viewImageSync = function (e) {
            var t = this.options;
            a.verifyOptions(e, "url", "nos::viewImageSync");
            var n = e.url, r = (0, i.url2object)(n), o = r.protocol, c = r.hostname, u = r.path, l = r.query;
            if ("boolean" == typeof e.strip && (l.stripmeta = e.strip ? 1 : 0), "number" == typeof e.quality && (a.verifyParamMin("quality", e.quality, 0, "nos::viewImageSync"), a.verifyParamMax("quality", e.quality, 100, "nos::viewImageSync"), l.quality = Math.round(e.quality)), "boolean" == typeof e.interlace && (l.interlace = e.interlace ? 1 : 0), "number" == typeof e.rotate && (l.rotate = Math.round(e.rotate)), "object" === (0, s["default"])(e.thumbnail)) {
                var m = e.thumbnail.mode || "crop", d = e.thumbnail.width, f = e.thumbnail.height;
                if (d >= 0 && f >= 0 && d < 4096 && f < 4096 && (d > 0 || f > 0)) {
                    switch (m) {
                        case"crop":
                            m = "y";
                            break;
                        case"contain":
                            m = "x";
                            break;
                        case"cover":
                            m = "z";
                            break;
                        default:
                            m = "x"
                    }
                    l.thumbnail = "" + d + m + f
                }
            }
            if (t.downloadUrl) {
                var p = (0, i.url2object)(e.url), g = t.downloadUrl, y = p.path, h = y.indexOf("/");
                if (h !== -1) {
                    var v = y.substring(0, h), b = y.substring(h + 1);
                    g = g.replace("{bucket}", v).replace("{object}", b)
                }
                var M = (0, i.url2object)(g);
                return (0, i.object2url)({
                    protocol: M.protocol,
                    hostname: M.hostname,
                    path: M.path,
                    query: a.merge(M.query, l)
                })
            }
            return (0, i.object2url)({protocol: o, hostname: c, path: u, query: l})
        }, c.viewImageStripMeta = function (e) {
            a.verifyOptions(e, "url strip", "nos::viewImageStripMeta"), a.verifyParamType("strip", e.strip, "boolean", "nos::viewImageStripMeta");
            var t = "stripmeta=" + (e.strip ? 1 : 0), n = (0, i.genUrlSep)(e.url);
            return e.url + n + t
        }, c.viewImageQuality = function (e) {
            a.verifyOptions(e, "url quality", "nos::viewImageQuality"), a.verifyParamType("quality", e.quality, "number", "nos::viewImageQuality"), a.verifyParamMin("quality", e.quality, 0, "nos::viewImageQuality"), a.verifyParamMax("quality", e.quality, 100, "nos::viewImageQuality");
            var t = Math.round(e.quality), n = "quality=" + t, r = (0, i.genUrlSep)(e.url);
            return e.url + r + n
        }, c.viewImageInterlace = function (e) {
            a.verifyOptions(e, "url", "nos::viewImageInterlace");
            var t = "interlace=1", n = (0, i.genUrlSep)(e.url);
            return e.url + n + t
        }, c.viewImageRotate = function (e) {
            for (a.verifyOptions(e, "url angle", "nos::viewImageRotate"), a.verifyParamType("angle", e.angle, "number", "nos::viewImageRotate"); e.angle < 0;) e.angle = e.angle + 360;
            e.angle = e.angle % 360;
            var t = Math.round(e.angle), n = "rotate=" + t, r = (0, i.genUrlSep)(e.url);
            return e.url + r + n
        }, c.viewImageBlur = function (e) {
            a.verifyOptions(e, "url radius sigma", "nos::viewImageBlur"), a.verifyParamType("radius", e.radius, "number", "nos::viewImageBlur"), a.verifyParamMin("radius", e.radius, 1, "nos::viewImageBlur"), a.verifyParamMax("radius", e.radius, 50, "nos::viewImageBlur"), a.verifyParamType("sigma", e.sigma, "number", "nos::viewImageBlur"), a.verifyParamMin("sigma", e.sigma, 0, "nos::viewImageBlur");
            var t = Math.round(e.radius), n = Math.round(e.sigma), r = "blur=" + t + "x" + n,
                o = (0, i.genUrlSep)(e.url);
            return e.url + o + r
        }, c.viewImageCrop = function (e) {
            a.verifyOptions(e, "url x y width height", "nos::viewImageCrop"), a.verifyParamType("x", e.x, "number", "nos::viewImageCrop"), a.verifyParamMin("x", e.x, 0, "nos::viewImageCrop"), a.verifyParamType("y", e.y, "number", "nos::viewImageCrop"), a.verifyParamMin("y", e.y, 0, "nos::viewImageCrop"), a.verifyParamType("width", e.width, "number", "nos::viewImageCrop"), a.verifyParamMin("width", e.width, 0, "nos::viewImageCrop"), a.verifyParamType("height", e.height, "number", "nos::viewImageCrop"), a.verifyParamMin("height", e.height, 0, "nos::viewImageCrop");
            var t = Math.round(e.x), n = Math.round(e.y), r = Math.round(e.width), o = Math.round(e.height),
                s = "crop=" + t + "_" + n + "_" + r + "_" + o, c = (0, i.genUrlSep)(e.url);
            return e.url + c + s
        }, c.viewImageThumbnail = function () {
            var e = {cover: "z", contain: "x", crop: "y"};
            return function (t) {
                a.verifyOptions(t, "url mode", "nos::viewImageThumbnail"), a.verifyParamValid("mode", t.mode, Object.keys(e), "nos::viewImageThumbnail"), "contain" === t.mode ? a.verifyParamAtLeastPresentOne(t, "width height", "nos::viewImageThumbnail") : a.verifyOptions(t, "width height", "nos::viewImageThumbnail"), a.undef(t.width) && (t.width = 0), a.undef(t.height) && (t.height = 0), a.verifyParamType("width", t.width, "number", "nos::viewImageThumbnail"), a.verifyParamMin("width", t.width, 0, "nos::viewImageThumbnail"), a.verifyParamType("height", t.height, "number", "nos::viewImageThumbnail"), a.verifyParamMin("height", t.height, 0, "nos::viewImageThumbnail");
                var n = Math.round(t.width), r = Math.round(t.height), o = "thumbnail=" + n + e[t.mode] + r;
                if ("crop" === t.mode && a.notundef(t.axis)) {
                    a.undef(t.axis.x) && (t.axis.x = 5), a.undef(t.axis.y) && (t.axis.y = 5), a.verifyParamMin("axis.x", t.axis.x, 0, "nos::viewImageThumbnail"), a.verifyParamMax("axis.x", t.axis.x, 10, "nos::viewImageThumbnail"), a.verifyParamMin("axis.y", t.axis.y, 0, "nos::viewImageThumbnail"), a.verifyParamMax("axis.y", t.axis.y, 10, "nos::viewImageThumbnail");
                    var s = Math.round(t.axis.x), c = Math.round(t.axis.y);
                    o = o + "&axis=" + s + "_" + c
                }
                a.notundef(t.enlarge) && (a.verifyParamType("enlarge", t.enlarge, "boolean", "nos::viewImageThumbnail"), t.enlarge && (o += "&enlarge=1"));
                var u = (0, i.genUrlSep)(t.url);
                return t.url + u + o
            }
        }()
    }, function (e, t, n) {
        "use strict";
        var r = n(48).fn, o = n(4), s = n(1), i = n(62), a = n(4);
        r.reportLogs = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this, n = t.options,
                r = o.info;
            e = s.merge(e, {
                appkey: n.appKey,
                uid: n.account,
                os: "web",
                session: t.protocol.sdkSession || "",
                ver: r.sdkVersion,
                type: t.subType
            });
            var c = a.ntServerAddress;
            if (c) {
                var u = c + s.genUrlSep(c), l = [];
                for (var m in e) l.push(m + "=" + e[m]);
                u += l.join("&"), i(u, {
                    proxyUrl: s.url2origin(u) + "/lbs/res/cors/nej_proxy_frame.html",
                    timeout: o.xhrTimeout,
                    onload: function () {
                    },
                    onerror: function (e) {
                        t.logger.info("report::ajax report error", e)
                    }
                })
            }
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            s(e.name) && (t.name = "" + e.name), s(e.announcement) && (t.announcement = "" + e.announcement), s(e.broadcastUrl) && (t.broadcastUrl = "" + e.broadcastUrl), s(e.custom) && (t.custom = "" + e.custom), s(e.queuelevel) && (t.queuelevel = parseInt(e.queuelevel))
        }

        var o = n(1), s = o.notundef, i = o.undef;
        r.reverse = function (e) {
            var t = o.copy(e);
            return i(t.announcement) && (t.announcement = ""), i(t.broadcastUrl) && (t.broadcastUrl = ""), i(t.custom) && (t.custom = ""), s(t.createTime) && (t.createTime = +t.createTime), s(t.updateTime) && (t.updateTime = +t.updateTime), s(t.onlineMemberNum) && (t.onlineMemberNum = +t.onlineMemberNum), s(t.mute) && (t.mute = "1" === t.mute), t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            o.verifyOptions(e, "account", "friend::Friend"), o.verifyParamAtLeastPresentOne(e, "alias custom", "friend::Friend"), this.account = e.account, s(e.alias) && (this.alias = e.alias), s(e.custom) && (this.custom = e.custom)
        }

        var o = n(1), s = o.notundef, i = {addFriend: 1, applyFriend: 2, passFriendApply: 3, rejectFriendApply: 4},
            a = {1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply"};
        r.reverse = function (e) {
            var t = o.filterObj(e, "account alias custom createTime updateTime");
            return s(e.flag) && (t.valid = "1" === e.flag), s(t.createTime) && (t.createTime = +t.createTime), s(t.updateTime) && (t.updateTime = +t.updateTime), t
        }, r.validTypes = function () {
            return Object.keys(i)
        }, r.getByteFromType = function (e) {
            return i[e]
        }, r.getTypeFromByte = function (e) {
            return a[e]
        }, r.assembleFriend = function (e) {
            var t = +new Date;
            return {account: e, alias: "", createTime: t, custom: "", updateTime: t, valid: !0}
        }, e.exports = r
    }, , function (e, t, n) {
        "use strict";
        var r = n(64).fn, o = n(27), s = n(46), i = n(101), a = n(63), c = n(4), u = n(1), l = u.notundef;
        r.login = function () {
            var e = this;
            e.sendCmd("login", e.assembleLogin(), e.onLogin.bind(e)), e.autoconnect = !1
        }, r.genSessionKey = function () {
            var e = {};
            return function () {
                var t = this, n = t.name, r = e[n] = e[n] || u.guid();
                return r
            }
        }(), r.assembleIMLogin = function () {
            var e = this, t = e.options, n = t.account, r = e.autoconnect ? 0 : 1;
            return e.sdkSession = e.genSessionKey(), {
                appLogin: r,
                appKey: t.appKey,
                account: n,
                token: t.token,
                sdkVersion: c.info.sdkVersion,
                protocolVersion: c.info.protocolVersion,
                os: s.os.toString(),
                browser: s.name + " " + s.version,
                session: e.sdkSession,
                deviceId: a.deviceId
            }
        }, r.onLogin = function (e, t) {
            var n = this;
            n.loginResult = t, e ? n.onAuthError(e, "link::onLogin") : (n.startHeartbeat(), n.afterLogin(t))
        }, r.afterLogin = u.emptyFunc, r.notifyLogin = function () {
            var e = this, t = e.loginResult;
            e.logger.info("link::notifyLogin: on connect", t), e.options.onconnect(t)
        }, r.logout = function () {
            var e = this;
            if (e.isConnected()) {
                var t = new o("主动退出", "logout");
                e.onAuthError(t, "link::logout")
            }
        }, r.onKicked = function (e) {
            var t = this, n = e.content, r = n.from, s = n.reason, a = n.custom,
                c = {reason: t.kickedReasons[s] || "unknown", message: t.kickedMessages[s] || "未知原因"};
            if (l(r) && (c.from = i.reverseType(r)), l(a) && (c.custom = a), t.shouldNotifyKicked(c)) {
                var m = new o("被踢了", "kicked");
                u.merge(m, c), t.onAuthError(m, "link::onKicked")
            } else t.logger.warn("link::onKicked: silentlyKick"), t.shouldReconnect = !0, t.hasNotifyDisconnected = !0, t.disconnectSocket()
        }, r.shouldNotifyKicked = function (e) {
            return "silentlyKick" !== e.reason
        }, r.onAuthError = function (e, t) {
            var n = this;
            n.shouldReconnect = !1, e = e || o.newConnectionError({callFunc: t}), e.callFunc = e.callFunc || t || null, n.markAllCallbackInvalid(e), n.notifyDisconnect(e)
        }
    }, function (e, t, n) {
        (function (e) {
            "use strict";
            var t = n(64).fn, r = n(27), o = n(149), s = n(100), i = n(4), a = n(1);
            t.initConnect = function () {
                var e = this;
                e.socket = null, e.retryCount = 0, e.connecting = !1, e.shouldReconnect = !0, e.hasNotifyDisconnected = !1
            }, t.resetConnect = function () {
                var e = this, t = e.options;
                a.notundef(t.needReconnect) ? (a.verifyParamType("needReconnect", t.needReconnect, "boolean", "link::resetConnect"), e.needReconnect = t.needReconnect) : e.needReconnect = !0, e.logger.log("link::resetConnect: needReconnect " + e.needReconnect), a.notundef(t.reconnectionAttempts) && a.verifyParamType("reconnectionAttempts", t.reconnectionAttempts, "number", "link::resetConnect"), e.reconnectionAttempts = t.reconnectionAttempts || 1 / 0, e.backoff = new o({
                    min: i.reconnectionDelay,
                    max: i.reconnectionDelayMax,
                    jitter: i.reconnectionJitter
                })
            }, t.connect = function () {
                var e = this;
                if (e.isConnected() || e.connecting) return void e.logger.warn("link::connect: already connected or connecting");
                if (e.connecting = !0, e.hasNotifyDisconnected = !1, e.socket) e.logger.info("link::connect: try connecting..."), e.socket.socket.connect(); else {
                    var t = e.getNextSocketUrl();
                    t ? e.connectToUrl(t) : e.refreshSocketUrl()
                }
            }, t.getNextSocketUrl = function () {
                return this.socketUrls.shift()
            }, t.isConnected = function () {
                var e = this;
                return !!e.socket && !!e.socket.socket && e.socket.socket.connected
            }, t.connectToUrl = function (t) {
                var n = this;
                if (n.logger.log("link::connectToUrl: " + t), e.env.WEIXIN_APP) {
                    window.location || (window.location = {});
                    var r = t.split(":");
                    window.location = {
                        protocol: r[0],
                        hostname: r[1].slice(2),
                        port: r[2]
                    }, this.options.transports = ["websocket"]
                }
                var o = this.options.transports || ["websocket", "xhr-polling"];
                n.socket = s.connect(t, {
                    transports: o,
                    reconnect: !1,
                    "force new connection": !0,
                    "connect timeout": i.connectTimeout
                }), n.logger.info("link::connectToUrl: socket url: " + t + ", transports: " + JSON.stringify(o)), n.socket.on("connect", n.onConnect.bind(n)), n.socket.on("handshake_failed", n.onHandshakeFailed.bind(n)), n.socket.on("connect_failed", n.onConnectFailed.bind(n)), n.socket.on("error", n.onError.bind(n)), n.socket.on("message", n.onMessage.bind(n)), n.socket.on("disconnect", function () {
                    n.logger.warn("link::connectToUrl: socket url: " + t + ", disconnected"), n.onDisconnect(!0, "link::socketDisconnect")
                })
            }, t.disconnect = function () {
                var e = this;
                e.isConnected() && (e.logger.log("link::disconnect: start disconnecting"), e.logout())
            }, t.onConnect = function () {
                var e = this;
                e.backoff && e.backoff.reset(), e.reconnectStatus = e.retryCount > 0 ? 1 : 0, e.retryCount = 0, e.connecting = !1, e.shouldReconnect = !0, e.hasNotifyDisconnected = !1, e.logger.log("link::onConnect: socket onconnected, start login"), e.login()
            }, t.onHandshakeFailed = function () {
                this.api.reportLogs({event: "ws_handshake_failed"}), this.onDisconnect(!1, "link::onHandshakeFailed")
            }, t.onConnectFailed = function () {
                this.api.reportLogs({event: "ws_connect_failed"}), this.onDisconnect(!1, "link::onConnectFailed")
            }, t.onError = function () {
                var e = arguments[0];
                e && (this.api.reportLogs({event: "connect_timeout"}), this.onMiscError("连接错误", new r(e, "LINK_ERROR", {callFunc: "link::onError"})))
            }, t.onDisconnect = function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = this;
                n.connected = e, n.connecting = !1, n.markAllCallbackInvalid(r.newNetworkError({
                    callFunc: t
                })), n.stopHeartbeat(), n.reconnect()
            }, t.willReconnect = function () {
                var e = this;
                return e.shouldReconnect && e.needReconnect && e.retryCount < e.reconnectionAttempts
            }, t.reconnect = function () {
                var e = this;
                if (e.willReconnect()) {
                    e.socket = null, e.connected && (e.autoconnect = !0), e.retryCount++, e.appLogin = 1;
                    var t = e.backoff.duration();
                    e.logger.info("link::reconnect: will retry after " + t + "ms, retryCount " + e.retryCount), e.options.onwillreconnect({
                        retryCount: e.retryCount,
                        duration: t
                    }), setTimeout(function () {
                        e.connect()
                    }, t)
                } else e.notifyDisconnect()
            }, t.notifyConnectError = function (e) {
                var t = this, n = r.newConnectError({message: e, callFunc: "link::notifyConnectError"});
                t.logger.error("link::notifyConnectError:", n), t.options.onerror(n)
            }, t.notifyDisconnect = function (e) {
                var t = this;
                t.hasNotifyDisconnected || (t.hasNotifyDisconnected = !0, t.disconnectSocket(), e = e || new r, e.retryCount = t.retryCount, e.willReconnect = t.willReconnect(), t.backoff && t.backoff.reset(), t.retryCount = 0, t.connecting = !1, t.logger.info("link::notifyDisconnect: ondisconnected ", e), t.options.ondisconnect(e))
            }, t.disconnectSocket = function () {
                var e = this;
                if (e.isConnected()) try {
                    e.socket.disconnect(), e.socket = null
                } catch (t) {
                    e.logger.info("link::disconnectSocket: disconnect failed, error ", t)
                }
            }
        }).call(t, n(31))
    }, function (e, t, n) {
        "use strict";
        var r = n(64).fn, o = n(4);
        r.processLink = function (e) {
            switch (e.cmd) {
                case"heartbeat":
            }
        }, r.startHeartbeat = function () {
            var e = this;
            e.stopHeartbeat(), e.heartbeatTimer = setTimeout(function () {
                e.sendCmd("heartbeat", null, e.onHeartbeat.bind(e))
            }, o.heartbeatInterval)
        }, r.stopHeartbeat = function () {
            var e = this;
            e.heartbeatTimer && (clearTimeout(e.heartbeatTimer), e.heartbeatTimer = null)
        }, r.onHeartbeat = function (e, t) {
            var n = this;
            e ? (e.callFunc = "link::onHeartbeat", n.api.reportLogs({event: "ping_timeout"}), n.onCustomError("heartbeat error", "HEARTBEAT_ERROR", e)) : n.startHeartbeat()
        }, r.heartbeat = function () {
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(64).fn, o = n(133);
        r.processMisc = function (e) {
            switch (e.cmd) {
                case"getSimpleNosToken":
                    e.error || (e.obj = e.content.nosTokens[0]);
                    break;
                case"getNosToken":
                    e.error || (e.obj = e.content.nosToken);
                    break;
                case"notifyUploadLog":
                    e.error || this.emitAPI({type: "notifyUploadLog"});
                    break;
                case"audioToText":
                    e.error || (e.obj.text = e.content.text);
                    break;
                case"processImage":
                    e.obj.imageOps = o.reverseImageOps(e.obj.imageOps), e.error || (e.obj = {url: e.content.url});
                    break;
                case"getNosTokenTrans":
                    e.error || (e.obj = {nosToken: e.content.nosToken, docId: e.content.docId});
                    break;
                case"notifyTransLog":
                    e.error || this.emitAPI({type: "notifyTransLog", obj: e.content.transInfo});
                    break;
                case"fetchFile":
                    e.error || (e.obj = e.content);
                    break;
                case"fetchFileList":
                    e.error || (e.obj = e.content);
                    break;
                case"removeFile":
                    e.error || (e.obj = e.content)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = n(134), s = r.merge({}, o.idMap, {
            chatroom: {
                id: 13,
                login: 2,
                kicked: 3,
                logout: 4,
                sendMsg: 6,
                msg: 7,
                getChatroomMembers: 8,
                getHistoryMsgs: 9,
                markChatroomMember: 11,
                closeChatroom: 12,
                getChatroom: 13,
                updateChatroom: 14,
                updateMyChatroomMemberInfo: 15,
                getChatroomMembersInfo: 16,
                kickChatroomMember: 17,
                updateChatroomMemberTempMute: 19,
                queueOffer: 20,
                queuePoll: 21,
                queueList: 22,
                peak: 23,
                queueDrop: 24,
                queueInit: 25
            }, user: {id: 3, syncRobot: 16}
        }), i = r.merge({}, o.cmdConfig, {
            login: {
                sid: s.chatroom.id,
                cid: s.chatroom.login,
                params: [{type: "byte", name: "type"}, {type: "Property", name: "login"}, {
                    type: "Property",
                    name: "imLogin"
                }]
            },
            logout: {sid: s.chatroom.id, cid: s.chatroom.logout},
            sendMsg: {sid: s.chatroom.id, cid: s.chatroom.sendMsg, params: [{type: "Property", name: "msg"}]},
            getChatroomMembers: {
                sid: s.chatroom.id,
                cid: s.chatroom.getChatroomMembers,
                params: [{type: "byte", name: "type"}, {type: "long", name: "time"}, {type: "int", name: "limit"}]
            },
            getHistoryMsgs: {
                sid: s.chatroom.id,
                cid: s.chatroom.getHistoryMsgs,
                params: [{type: "long", name: "timetag"}, {type: "int", name: "limit"}, {
                    type: "bool",
                    name: "reverse"
                }, {type: "LongArray", name: "msgTypes"}]
            },
            markChatroomMember: {
                sid: s.chatroom.id,
                cid: s.chatroom.markChatroomMember,
                params: [{type: "string", name: "account"}, {type: "int", name: "type"}, {
                    type: "bool",
                    name: "isAdd"
                }, {type: "int", name: "level"}, {type: "string", name: "custom"}]
            },
            closeChatroom: {
                sid: s.chatroom.id,
                cid: s.chatroom.closeChatroom,
                params: [{type: "string", name: "custom"}]
            },
            getChatroom: {sid: s.chatroom.id, cid: s.chatroom.getChatroom},
            updateChatroom: {
                sid: s.chatroom.id,
                cid: s.chatroom.updateChatroom,
                params: [{type: "Property", name: "chatroom"}, {type: "bool", name: "needNotify"}, {
                    type: "String",
                    name: "custom"
                }]
            },
            updateMyChatroomMemberInfo: {
                sid: s.chatroom.id,
                cid: s.chatroom.updateMyChatroomMemberInfo,
                params: [{type: "Property", name: "chatroomMember"}, {
                    type: "bool",
                    name: "needNotify"
                }, {type: "String", name: "custom"}, {type: "bool", name: "needSave"}]
            },
            getChatroomMembersInfo: {
                sid: s.chatroom.id,
                cid: s.chatroom.getChatroomMembersInfo,
                params: [{type: "StrArray", name: "accounts"}]
            },
            kickChatroomMember: {
                sid: s.chatroom.id,
                cid: s.chatroom.kickChatroomMember,
                params: [{type: "string", name: "account"}, {type: "string", name: "custom"}]
            },
            updateChatroomMemberTempMute: {
                sid: s.chatroom.id,
                cid: s.chatroom.updateChatroomMemberTempMute,
                params: [{type: "String", name: "account"}, {type: "long", name: "duration"}, {
                    type: "bool",
                    name: "needNotify"
                }, {type: "String", name: "custom"}]
            },
            queueOffer: {
                sid: s.chatroom.id,
                cid: s.chatroom.queueOffer,
                params: [{type: "string", name: "elementKey"}, {type: "string", name: "elementValue"}, {
                    type: "bool",
                    name: "transient"
                }]
            },
            queuePoll: {sid: s.chatroom.id, cid: s.chatroom.queuePoll, params: [{type: "string", name: "elementKey"}]},
            queueList: {sid: s.chatroom.id, cid: s.chatroom.queueList},
            peak: {sid: s.chatroom.id, cid: s.chatroom.peak},
            queueDrop: {sid: s.chatroom.id, cid: s.chatroom.queueDrop},
            queueInit: {sid: s.chatroom.id, cid: s.chatroom.queueInit, params: [{type: "int", name: "limit"}]},
            syncRobot: {sid: s.user.id, cid: s.user.syncRobot, params: [{type: "long", name: "timetag"}]}
        }), a = "chatroom", c = r.merge({}, o.packetConfig, {
            "4_10": {service: "notify"},
            "4_11": {service: "notify"},
            "3_16": {
                service: a,
                cmd: "syncRobot",
                response: [{type: "PropertyArray", name: "robots", entity: "robot"}]
            },
            "13_2": {
                service: a,
                cmd: "login",
                response: [{type: "Property", name: "chatroom"}, {type: "Property", name: "chatroomMember"}]
            },
            "13_3": {
                service: a,
                cmd: "kicked",
                response: [{type: "Number", name: "reason"}, {type: "String", name: "custom"}]
            },
            "13_4": {service: a, cmd: "logout"},
            "13_6": {service: a, cmd: "sendMsg", response: [{type: "Property", name: "msg"}]},
            "13_7": {service: a, cmd: "msg", response: [{type: "Property", name: "msg"}]},
            "13_8": {
                service: a,
                cmd: "getChatroomMembers",
                response: [{type: "PropertyArray", name: "members", entity: "chatroomMember"}]
            },
            "13_9": {
                service: a,
                cmd: "getHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "13_11": {service: a, cmd: "markChatroomMember", response: [{type: "Property", name: "chatroomMember"}]},
            "13_12": {service: a, cmd: "closeChatroom"},
            "13_13": {service: a, cmd: "getChatroom", response: [{type: "Property", name: "chatroom"}]},
            "13_14": {service: a, cmd: "updateChatroom"},
            "13_15": {service: a, cmd: "updateMyChatroomMemberInfo"},
            "13_16": {
                service: a,
                cmd: "getChatroomMembersInfo",
                response: [{type: "PropertyArray", name: "members", entity: "chatroomMember"}]
            },
            "13_17": {service: a, cmd: "kickChatroomMember"},
            "13_19": {service: a, cmd: "updateChatroomMemberTempMute"},
            "13_20": {service: a, cmd: "queueOffer"},
            "13_21": {
                service: a,
                cmd: "queuePoll",
                response: [{type: "String", name: "elementKey"}, {type: "String", name: "elementValue"}]
            },
            "13_22": {service: a, cmd: "queueList", response: [{type: "KVArray", name: "queueList"}]},
            "13_23": {
                service: a,
                cmd: "peak",
                response: [{type: "String", name: "elementKey"}, {type: "String", name: "elementValue"}]
            },
            "13_24": {service: a, cmd: "queueDrop"},
            "13_25": {service: a, cmd: "queueInit"}
        });
        e.exports = {idMap: s, cmdConfig: i, packetConfig: c}
    }, function (e, t) {
        "use strict";
        e.exports = {
            imLogin: {
                os: 4,
                sdkVersion: 6,
                appLogin: 8,
                protocolVersion: 9,
                deviceId: 13,
                appKey: 18,
                account: 19,
                browser: 24,
                session: 26,
                token: 1e3
            },
            nosToken: {objectName: 1, token: 2, bucket: 3, expireTime: 4},
            audioToText: {url: 2},
            imageOp: {
                type: 0,
                stripmeta: 1,
                typeType: 2,
                blurRadius: 3,
                blurSigma: 4,
                qualityQuality: 5,
                cropX: 6,
                cropY: 7,
                cropWidth: 8,
                cropHeight: 9,
                rotateAngle: 10,
                pixelPixel: 11,
                thumbnailMode: 12,
                thumbnailWidth: 13,
                thumbnailHeight: 14,
                thumbnailAxisX: 15,
                thumbnailAxisY: 16,
                thumbnailCenterX: 17,
                thumbnailCenterY: 18,
                thumbnailEnlarge: 19,
                thumbnailToStatic: 20,
                watermarkType: 21,
                watermarkGravity: 22,
                watermarkDissolve: 23,
                watermarkDx: 24,
                watermarkDy: 25,
                watermarkImage: 26,
                watermarkText: 27,
                watermarkFont: 28,
                watermarkFontSize: 29,
                watermarkFontColor: 30,
                interlace: 31
            },
            robot: {
                account: 4,
                nick: 5,
                avatar: 6,
                intro: 7,
                config: 8,
                valid: 9,
                createTime: 10,
                updateTime: 11,
                custid: 12,
                botid: 13,
                bindTime: 14
            },
            clientAntispam: {version: 1, md5: 2, nosurl: 3, thesaurus: 4},
            transToken: {name: 1, type: 2, transType: 3, size: 4, extra: 5, body: 6},
            transInfo: {
                docId: 1,
                name: 2,
                prefix: 3,
                size: 4,
                type: 5,
                state: 6,
                transType: 7,
                transSize: 8,
                pageCount: 9,
                picInfo: 10,
                extra: 11,
                flag: 12
            },
            fileListParam: {fromDocId: 1, limit: 2},
            login: {
                appKey: 1,
                account: 2,
                deviceId: 3,
                chatroomId: 5,
                appLogin: 8,
                chatroomNick: 20,
                chatroomAvatar: 21,
                chatroomCustom: 22,
                chatroomEnterCustom: 23,
                session: 26,
                isAnonymous: 38
            },
            chatroom: {
                id: 1,
                name: 3,
                announcement: 4,
                broadcastUrl: 5,
                custom: 12,
                createTime: 14,
                updateTime: 15,
                queuelevel: 16,
                creator: 100,
                onlineMemberNum: 101,
                mute: 102
            },
            msg: {
                idClient: 1,
                type: 2,
                attach: 3,
                custom: 4,
                resend: 5,
                userUpdateTime: 6,
                fromNick: 7,
                fromAvatar: 8,
                fromCustom: 9,
                yidunEnable: 10,
                antiSpamContent: 11,
                skipHistory: 12,
                body: 13,
                antiSpamBusinessId: 14,
                clientAntiSpam: 15,
                antiSpamUsingYidun: 16,
                time: 20,
                from: 21,
                chatroomId: 22,
                fromClientType: 23,
                highPriority: 25
            },
            chatroomMember: {
                chatroomId: 1,
                account: 2,
                type: 3,
                level: 4,
                nick: 5,
                avatar: 6,
                custom: 7,
                online: 8,
                guest: 9,
                enterTime: 10,
                blacked: 12,
                gaged: 13,
                valid: 14,
                updateTime: 15,
                tempMuted: 16,
                tempMuteDuration: 17
            }
        }
    }, function (e, t) {
        "use strict";
        e.exports = {
            nosToken: {objectName: 1, token: 2, bucket: 3, expireTime: 4},
            audioToText: {url: 2},
            imageOp: {
                type: 0,
                stripmeta: 1,
                typeType: 2,
                blurRadius: 3,
                blurSigma: 4,
                qualityQuality: 5,
                cropX: 6,
                cropY: 7,
                cropWidth: 8,
                cropHeight: 9,
                rotateAngle: 10,
                pixelPixel: 11,
                thumbnailMode: 12,
                thumbnailWidth: 13,
                thumbnailHeight: 14,
                thumbnailAxisX: 15,
                thumbnailAxisY: 16,
                thumbnailCenterX: 17,
                thumbnailCenterY: 18,
                thumbnailEnlarge: 19,
                thumbnailToStatic: 20,
                watermarkType: 21,
                watermarkGravity: 22,
                watermarkDissolve: 23,
                watermarkDx: 24,
                watermarkDy: 25,
                watermarkImage: 26,
                watermarkText: 27,
                watermarkFont: 28,
                watermarkFontSize: 29,
                watermarkFontColor: 30,
                interlace: 31
            },
            robot: {
                account: 4,
                nick: 5,
                avatar: 6,
                intro: 7,
                config: 8,
                valid: 9,
                createTime: 10,
                updateTime: 11,
                custid: 12,
                botid: 13,
                bindTime: 14
            },
            clientAntispam: {version: 1, md5: 2, nosurl: 3, thesaurus: 4},
            transToken: {name: 1, type: 2, transType: 3, size: 4, extra: 5, body: 6},
            transInfo: {
                docId: 1,
                name: 2,
                prefix: 3,
                size: 4,
                type: 5,
                state: 6,
                transType: 7,
                transSize: 8,
                pageCount: 9,
                picInfo: 10,
                extra: 11,
                flag: 12
            },
            fileListParam: {fromDocId: 1, limit: 2},
            login: {
                os: 4,
                sdkVersion: 6,
                appLogin: 8,
                protocolVersion: 9,
                deviceId: 13,
                appKey: 18,
                account: 19,
                browser: 24,
                session: 26,
                token: 1e3
            },
            loginRes: {lastLoginDeviceId: 17, connectionId: 102, ip: 103, port: 104, country: 106},
            loginPort: {type: 3, os: 4, mac: 5, deviceId: 13, account: 19, connectionId: 102, ip: 103, time: 109},
            sync: {
                myInfo: 1,
                offlineMsgs: 2,
                teams: 3,
                netcallMsgs: 6,
                roamingMsgs: 7,
                relations: 9,
                friends: 11,
                sessions: 12,
                friendUsers: 13,
                msgReceipts: 14,
                myTeamMembers: 15,
                donnop: 16,
                deleteMsg: 17,
                sessionAck: 18,
                robots: 19,
                broadcastMsgs: 20,
                filterMsgs: 100
            },
            donnop: {open: 1},
            team: {
                teamId: 1,
                name: 3,
                type: 4,
                owner: 5,
                level: 6,
                selfCustom: 7,
                valid: 8,
                memberNum: 9,
                memberUpdateTime: 10,
                createTime: 11,
                updateTime: 12,
                validToCurrentUser: 13,
                intro: 14,
                announcement: 15,
                joinMode: 16,
                bits: 17,
                custom: 18,
                serverCustom: 19,
                avatar: 20,
                beInviteMode: 21,
                inviteMode: 22,
                updateTeamMode: 23,
                updateCustomMode: 24,
                mute: 100,
                muteType: 101
            },
            teamMember: {
                teamId: 1,
                account: 3,
                type: 4,
                nickInTeam: 5,
                bits: 7,
                active: 8,
                valid: 9,
                joinTime: 10,
                updateTime: 11,
                custom: 12,
                mute: 13
            },
            msg: {
                scene: 0,
                to: 1,
                from: 2,
                fromClientType: 4,
                fromDeviceId: 5,
                fromNick: 6,
                time: 7,
                type: 8,
                body: 9,
                attach: 10,
                idClient: 11,
                idServer: 12,
                resend: 13,
                userUpdateTime: 14,
                custom: 15,
                pushPayload: 16,
                pushContent: 17,
                apnsAccounts: 18,
                apnsContent: 19,
                apnsForcePush: 20,
                yidunEnable: 21,
                antiSpamContent: 22,
                antiSpamBusinessId: 23,
                clientAntiSpam: 24,
                antiSpamUsingYidun: 25,
                needMsgReceipt: 26,
                isHistoryable: 100,
                isRoamingable: 101,
                isSyncable: 102,
                isMuted: 104,
                cc: 105,
                isPushable: 107,
                isOfflinable: 108,
                isUnreadable: 109,
                needPushNick: 110,
                isReplyMsg: 111,
                tempTeamMemberCount: 112
            },
            msgReceipt: {to: 1, from: 2, time: 7, idClient: 11},
            teamMsgReceipt: {teamId: 0, idServer: 1, read: 100, unread: 101, idClient: 102, account: 103},
            sysMsg: {
                time: 0,
                type: 1,
                to: 2,
                from: 3,
                ps: 4,
                attach: 5,
                idServer: 6,
                sendToOnlineUsersOnly: 7,
                apnsText: 8,
                pushPayload: 9,
                deletedIdClient: 10,
                deletedIdServer: 11,
                yidunEnable: 12,
                antiSpamContent: 13,
                deletedMsgTime: 14,
                deletedMsgFromNick: 15,
                opeAccount: 16,
                cc: 105,
                isPushable: 107,
                isUnreadable: 109,
                needPushNick: 110
            },
            broadcastMsg: {broadcastId: 1, fromAccid: 2, fromUid: 3, timestamp: 4, body: 5},
            friend: {
                account: 4,
                flag: 5,
                beflag: 6,
                source: 7,
                alias: 8,
                bits: 9,
                custom: 10,
                createTime: 11,
                updateTime: 12
            },
            user: {
                account: 1,
                nick: 3,
                avatar: 4,
                sign: 5,
                gender: 6,
                email: 7,
                birth: 8,
                tel: 9,
                custom: 10,
                createTime: 12,
                updateTime: 13
            },
            specialRelation: {account: 0, isMuted: 1, isBlacked: 2, createTime: 3, updateTime: 4},
            msgType: {
                text: 0,
                picture: 1,
                audio: 2,
                video: 3,
                location: 4,
                notification: 5,
                file: 6,
                netcall_audio: 7,
                netcall_vedio: 8,
                datatunnel_new: 9,
                tips: 10,
                robot: 11,
                custom: 100
            },
            msgEvent: {
                type: 1,
                value: 2,
                idClient: 3,
                custom: 4,
                validTime: 5,
                broadcastType: 6,
                sync: 7,
                validTimeType: 8,
                durable: 9,
                time: 10,
                idServer: 11,
                clientType: 12,
                serverConfig: 13,
                serverCustom: 14,
                appid: 101,
                account: 103,
                enableMultiClient: 104,
                consid: 106
            },
            msgEventSubscribe: {type: 1, subscribeTime: 2, sync: 3, to: 102, from: 104, time: 105}
        }
    }, function (e, t) {
        "use strict";
        e.exports = {
            imLogin: {
                4: "os",
                6: "sdkVersion",
                8: "appLogin",
                9: "protocolVersion",
                13: "deviceId",
                18: "appKey",
                19: "account",
                24: "browser",
                26: "session",
                1000: "token"
            },
            nosToken: {1: "objectName", 2: "token", 3: "bucket", 4: "expireTime"},
            audioToText: {2: "url"},
            imageOp: {
                0: "type",
                1: "stripmeta",
                2: "typeType",
                3: "blurRadius",
                4: "blurSigma",
                5: "qualityQuality",
                6: "cropX",
                7: "cropY",
                8: "cropWidth",
                9: "cropHeight",
                10: "rotateAngle",
                11: "pixelPixel",
                12: "thumbnailMode",
                13: "thumbnailWidth",
                14: "thumbnailHeight",
                15: "thumbnailAxisX",
                16: "thumbnailAxisY",
                17: "thumbnailCenterX",
                18: "thumbnailCenterY",
                19: "thumbnailEnlarge",
                20: "thumbnailToStatic",
                21: "watermarkType",
                22: "watermarkGravity",
                23: "watermarkDissolve",
                24: "watermarkDx",
                25: "watermarkDy",
                26: "watermarkImage",
                27: "watermarkText",
                28: "watermarkFont",
                29: "watermarkFontSize",
                30: "watermarkFontColor",
                31: "interlace"
            },
            robot: {
                4: "account",
                5: "nick",
                6: "avatar",
                7: "intro",
                8: "config",
                9: "valid",
                10: "createTime",
                11: "updateTime",
                12: "custid",
                13: "botid",
                14: "bindTime"
            },
            clientAntispam: {1: "version", 2: "md5", 3: "nosurl", 4: "thesaurus"},
            transToken: {1: "name", 2: "type", 3: "transType", 4: "size", 5: "extra", 6: "body"},
            transInfo: {
                1: "docId",
                2: "name",
                3: "prefix",
                4: "size",
                5: "type",
                6: "state",
                7: "transType",
                8: "transSize",
                9: "pageCount",
                10: "picInfo",
                11: "extra",
                12: "flag"
            },
            fileListParam: {1: "fromDocId", 2: "limit"},
            login: {
                1: "appKey",
                2: "account",
                3: "deviceId",
                5: "chatroomId",
                8: "appLogin",
                20: "chatroomNick",
                21: "chatroomAvatar",
                22: "chatroomCustom",
                23: "chatroomEnterCustom",
                26: "session",
                38: "isAnonymous"
            },
            chatroom: {
                1: "id",
                3: "name",
                4: "announcement",
                5: "broadcastUrl",
                12: "custom",
                14: "createTime",
                15: "updateTime",
                16: "queuelevel",
                100: "creator",
                101: "onlineMemberNum",
                102: "mute"
            },
            msg: {
                1: "idClient",
                2: "type",
                3: "attach",
                4: "custom",
                5: "resend",
                6: "userUpdateTime",
                7: "fromNick",
                8: "fromAvatar",
                9: "fromCustom",
                10: "yidunEnable",
                11: "antiSpamContent",
                12: "skipHistory",
                13: "body",
                14: "antiSpamBusinessId",
                15: "clientAntiSpam",
                16: "antiSpamUsingYidun",
                20: "time",
                21: "from",
                22: "chatroomId",
                23: "fromClientType",
                25: "highPriority"
            },
            chatroomMember: {
                1: "chatroomId",
                2: "account",
                3: "type",
                4: "level",
                5: "nick",
                6: "avatar",
                7: "custom",
                8: "online",
                9: "guest",
                10: "enterTime",
                12: "blacked",
                13: "gaged",
                14: "valid",
                15: "updateTime",
                16: "tempMuted",
                17: "tempMuteDuration"
            }
        }
    }, function (e, t) {
        "use strict";
        e.exports = {
            nosToken: {1: "objectName", 2: "token", 3: "bucket", 4: "expireTime"},
            audioToText: {2: "url"},
            imageOp: {
                0: "type",
                1: "stripmeta",
                2: "typeType",
                3: "blurRadius",
                4: "blurSigma",
                5: "qualityQuality",
                6: "cropX",
                7: "cropY",
                8: "cropWidth",
                9: "cropHeight",
                10: "rotateAngle",
                11: "pixelPixel",
                12: "thumbnailMode",
                13: "thumbnailWidth",
                14: "thumbnailHeight",
                15: "thumbnailAxisX",
                16: "thumbnailAxisY",
                17: "thumbnailCenterX",
                18: "thumbnailCenterY",
                19: "thumbnailEnlarge",
                20: "thumbnailToStatic",
                21: "watermarkType",
                22: "watermarkGravity",
                23: "watermarkDissolve",
                24: "watermarkDx",
                25: "watermarkDy",
                26: "watermarkImage",
                27: "watermarkText",
                28: "watermarkFont",
                29: "watermarkFontSize",
                30: "watermarkFontColor",
                31: "interlace"
            },
            robot: {
                4: "account",
                5: "nick",
                6: "avatar",
                7: "intro",
                8: "config",
                9: "valid",
                10: "createTime",
                11: "updateTime",
                12: "custid",
                13: "botid",
                14: "bindTime"
            },
            clientAntispam: {1: "version", 2: "md5", 3: "nosurl", 4: "thesaurus"},
            transToken: {1: "name", 2: "type", 3: "transType", 4: "size", 5: "extra", 6: "body"},
            transInfo: {
                1: "docId",
                2: "name",
                3: "prefix",
                4: "size",
                5: "type",
                6: "state",
                7: "transType",
                8: "transSize",
                9: "pageCount",
                10: "picInfo",
                11: "extra",
                12: "flag"
            },
            fileListParam: {1: "fromDocId", 2: "limit"},
            login: {
                4: "os",
                6: "sdkVersion",
                8: "appLogin",
                9: "protocolVersion",
                13: "deviceId",
                18: "appKey",
                19: "account",
                24: "browser",
                26: "session",
                1000: "token"
            },
            loginRes: {17: "lastLoginDeviceId", 102: "connectionId", 103: "ip", 104: "port", 106: "country"},
            loginPort: {
                3: "type",
                4: "os",
                5: "mac",
                13: "deviceId",
                19: "account",
                102: "connectionId",
                103: "ip",
                109: "time"
            },
            sync: {
                1: "myInfo",
                2: "offlineMsgs",
                3: "teams",
                6: "netcallMsgs",
                7: "roamingMsgs",
                9: "relations",
                11: "friends",
                12: "sessions",
                13: "friendUsers",
                14: "msgReceipts",
                15: "myTeamMembers",
                16: "donnop",
                17: "deleteMsg",
                18: "sessionAck",
                19: "robots",
                20: "broadcastMsgs",
                100: "filterMsgs"
            },
            donnop: {1: "open"},
            team: {
                1: "teamId",
                3: "name",
                4: "type",
                5: "owner",
                6: "level",
                7: "selfCustom",
                8: "valid",
                9: "memberNum",
                10: "memberUpdateTime",
                11: "createTime",
                12: "updateTime",
                13: "validToCurrentUser",
                14: "intro",
                15: "announcement",
                16: "joinMode",
                17: "bits",
                18: "custom",
                19: "serverCustom",
                20: "avatar",
                21: "beInviteMode",
                22: "inviteMode",
                23: "updateTeamMode",
                24: "updateCustomMode",
                100: "mute",
                101: "muteType"
            },
            teamMember: {
                1: "teamId",
                3: "account",
                4: "type",
                5: "nickInTeam",
                7: "bits",
                8: "active",
                9: "valid",
                10: "joinTime",
                11: "updateTime",
                12: "custom",
                13: "mute"
            },
            msg: {
                0: "scene",
                1: "to",
                2: "from",
                4: "fromClientType",
                5: "fromDeviceId",
                6: "fromNick",
                7: "time",
                8: "type",
                9: "body",
                10: "attach",
                11: "idClient",
                12: "idServer",
                13: "resend",
                14: "userUpdateTime",
                15: "custom",
                16: "pushPayload",
                17: "pushContent",
                18: "apnsAccounts",
                19: "apnsContent",
                20: "apnsForcePush",
                21: "yidunEnable",
                22: "antiSpamContent",
                23: "antiSpamBusinessId",
                24: "clientAntiSpam",
                25: "antiSpamUsingYidun",
                26: "needMsgReceipt",
                100: "isHistoryable",
                101: "isRoamingable",
                102: "isSyncable",
                104: "isMuted",
                105: "cc",
                107: "isPushable",
                108: "isOfflinable",
                109: "isUnreadable",
                110: "needPushNick",
                111: "isReplyMsg",
                112: "tempTeamMemberCount"
            },
            msgReceipt: {1: "to", 2: "from", 7: "time", 11: "idClient"},
            teamMsgReceipt: {0: "teamId", 1: "idServer", 100: "read", 101: "unread", 102: "idClient", 103: "account"},
            sysMsg: {
                0: "time",
                1: "type",
                2: "to",
                3: "from",
                4: "ps",
                5: "attach",
                6: "idServer",
                7: "sendToOnlineUsersOnly",
                8: "apnsText",
                9: "pushPayload",
                10: "deletedIdClient",
                11: "deletedIdServer",
                12: "yidunEnable",
                13: "antiSpamContent",
                14: "deletedMsgTime",
                15: "deletedMsgFromNick",
                16: "opeAccount",
                105: "cc",
                107: "isPushable",
                109: "isUnreadable",
                110: "needPushNick"
            },
            broadcastMsg: {1: "broadcastId", 2: "fromAccid", 3: "fromUid", 4: "timestamp", 5: "body"},
            friend: {
                4: "account",
                5: "flag",
                6: "beflag",
                7: "source",
                8: "alias",
                9: "bits",
                10: "custom",
                11: "createTime",
                12: "updateTime"
            },
            user: {
                1: "account",
                3: "nick",
                4: "avatar",
                5: "sign",
                6: "gender",
                7: "email",
                8: "birth",
                9: "tel",
                10: "custom",
                12: "createTime",
                13: "updateTime"
            },
            specialRelation: {0: "account", 1: "isMuted", 2: "isBlacked", 3: "createTime", 4: "updateTime"},
            msgType: {
                0: "text",
                1: "picture",
                2: "audio",
                3: "video",
                4: "location",
                5: "notification",
                6: "file",
                7: "netcall_audio",
                8: "netcall_vedio",
                9: "datatunnel_new",
                10: "tips",
                11: "robot",
                100: "custom"
            },
            msgEvent: {
                1: "type",
                2: "value",
                3: "idClient",
                4: "custom",
                5: "validTime",
                6: "broadcastType",
                7: "sync",
                8: "validTimeType",
                9: "durable",
                10: "time",
                11: "idServer",
                12: "clientType",
                13: "serverConfig",
                14: "serverCustom",
                101: "appid",
                103: "account",
                104: "enableMultiClient",
                106: "consid"
            },
            msgEventSubscribe: {1: "type", 2: "subscribeTime", 3: "sync", 102: "to", 104: "from", 105: "time"}
        }
    }, , , , , function (e, t, n) {
        "use strict";
        var r = n(44), o = n(107), s = function () {
            var e = /json/i, t = /post/i;
            return function (n, s) {
                s = s || {};
                var i = s.data = s.data || {}, a = s.headers = s.headers || {},
                    c = r.checkWithDefault(a, "Accept", "application/json"),
                    u = r.checkWithDefault(a, "Content-Type", "application/json");
                return e.test(c) && (s.type = "json"), t.test(s.method) && e.test(u) && (s.data = JSON.stringify(i)), o(n, s)
            }
        }();
        e.exports = s
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            t.init(), i.call(t, e)
        }

        var o = n(44), s = n(136), i = n(108), a = {}, c = i.prototype, u = r.prototype = Object.create(c);
        u.init = function () {
            function e(e) {
                var t = e.data;
                if (0 === t.indexOf(n)) {
                    t = JSON.parse(t.replace(n, ""));
                    var r = t.key, o = a[r];
                    o && (delete a[r], t.result = decodeURIComponent(t.result || ""), o.onLoad(t))
                }
            }

            function t() {
                if (!r) {
                    r = !0;
                    var t = o.getGlobal();
                    t.postMessage ? o.on(t, "message", e) : s.addMsgListener(e)
                }
            }

            var n = "NEJ-AJAX-DATA:", r = !1;
            return function () {
                t()
            }
        }(), u.doSend = function () {
            var e = this, t = e.options, n = o.url2origin(t.url), r = t.proxyUrl || n + "/res/nej_proxy_frame.html",
                i = a[r];
            if (o.isArray(i)) return void i.push(e.doSend.bind(e, t));
            if (!i) return a[r] = [e.doSend.bind(e, t)], void o.createIframe({
                src: r, onload: function (e) {
                    var t = a[r];
                    a[r] = o.target(e).contentWindow, t.forEach(function (e) {
                        try {
                            e()
                        } catch (t) {
                            console.error(t)
                        }
                    })
                }
            });
            if (!e.aborted) {
                var c = e.key = o.uniqueID();
                a[c] = e;
                var u = o.fetch({method: "GET", url: "", data: null, headers: {}, timeout: 0}, t);
                u.key = c, s.postMessage(i, {data: u}), e.afterSend()
            }
        }, u.abort = function () {
            var e = this;
            e.aborted = !0, delete a[e.key], c.abort.call(e)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            t.init(), s.call(t, e)
        }

        var o = n(44), s = n(108), i = n(136), a = "NEJ-UPLOAD-RESULT:", c = {}, u = s.prototype,
            l = r.prototype = Object.create(u);
        l.init = function () {
            function e(e) {
                var t = e.data;
                if (0 === t.indexOf(a)) {
                    t = JSON.parse(t.replace(a, ""));
                    var n = t.key, r = c[n];
                    r && (delete c[n], t.result = decodeURIComponent(t.result || ""), r.onLoad(t.result))
                }
            }

            function t() {
                if (!n) {
                    n = !0;
                    var t = o.getGlobal();
                    t.postMessage ? o.on(t, "message", e) : (i.addMsgListener(e), i.startTimer())
                }
            }

            var n = !1;
            return function () {
                t()
            }
        }(), l.doSend = function () {
            function e() {
                l.forEach(function (e, t) {
                    var n = m[t];
                    n.parentNode && (e.name = n.name, o.isFunction(e.setAttribute) && e.setAttribute("form", n.getAttribute("form")), n.parentNode.replaceChild(e, n))
                })
            }

            var t = this, n = t.options, r = t.key = "zoro-ajax-upload-iframe-" + o.uniqueID();
            c[r] = t;
            var s = t.form = o.html2node('<form style="display:none;"></form>');
            document.body.appendChild(s), s.target = r, s.method = "POST", s.enctype = "multipart/form-data", s.encoding = "multipart/form-data";
            var i = n.url, a = o.genUrlSep(i);
            s.action = i + a + "_proxy_=form";
            var u = n.data, l = [], m = [];
            u && o.getKeys(u, n.putFileAtEnd).forEach(function (e) {
                var t = u[e];
                if (t.tagName && "INPUT" === t.tagName.toUpperCase()) {
                    if ("file" === t.type) {
                        var n = t, r = n.cloneNode(!0);
                        n.parentNode.insertBefore(r, n);
                        var i = o.dataset(n, "name");
                        i && (n.name = i), s.appendChild(n), o.isFunction(n.setAttribute) && (n.setAttribute("form", ""), n.removeAttribute("form")), l.push(t), m.push(r)
                    }
                } else {
                    var a = o.html2node('<input type="hidden"/>');
                    a.name = e, a.value = t, s.appendChild(a)
                }
            });
            var d = t.iframe = o.createIframe({
                name: r, onload: function () {
                    return t.aborted ? void e() : (o.on(d, "load", t.checkResult.bind(t)), s.submit(), e(), void t.afterSend())
                }
            })
        }, l.checkResult = function () {
            var e, t, n = this;
            try {
                if (e = n.iframe.contentWindow.document.body, t = (e.innerText || e.textContent || "").trim(), t.indexOf(a) >= 0 || e.innerHTML.indexOf(a) >= 0) return
            } catch (r) {
                return void console.error("ignore error if not same domain,", r)
            }
            n.onLoad(t)
        }, l.onLoad = function (e) {
            var t = this;
            u.onLoad.call(t, {status: 200, result: e}), o.remove(t.form), o.remove(t.iframe), u.destroy.call(t)
        }, l.destroy = function () {
            o.remove(this.iframe), o.remove(this.form)
        }, l.abort = function () {
            var e = this;
            e.aborted = !0, delete c[e.key], u.abort.call(e)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            e.onuploading && t.on("uploading", e.onuploading), s.call(t, e)
        }

        var o = n(44), s = n(108), i = s.prototype, a = r.prototype = Object.create(i);
        a.doSend = function () {
            var e = this, t = e.options, n = t.headers, r = e.xhr = new XMLHttpRequest;
            if ("multipart/form-data" === n["Content-Type"]) {
                delete n["Content-Type"], r.upload.onprogress = e.onProgress.bind(e), r.upload.onload = e.onProgress.bind(e);
                var s = t.data;
                t.data = new window.FormData, s && o.getKeys(s, t.putFileAtEnd).forEach(function (e) {
                    var n = s[e];
                    n.tagName && "INPUT" === n.tagName.toUpperCase() ? "file" === n.type && [].forEach.call(n.files, function (e) {
                        t.data.append(o.dataset(n, "name") || n.name || e.name || "file-" + o.uniqueID(), e)
                    }) : t.data.append(e, n)
                })
            }
            r.onreadystatechange = e.onStateChange.bind(e), 0 !== t.timeout && (e.timer = setTimeout(e.onTimeout.bind(e), t.timeout)), r.open(t.method, t.url, !t.sync), Object.keys(n).forEach(function (e) {
                r.setRequestHeader(e, n[e])
            }), t.cookie && "withCredentials" in r && (r.withCredentials = !0), r.send(t.data), e.afterSend()
        }, a.onProgress = function (e) {
            e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
        }, a.onStateChange = function () {
            var e = this, t = e.xhr;
            4 === t.readyState && e.onLoad({status: t.status, result: t.responseText || ""})
        }, a.getResponseHeader = function (e) {
            var t = this.xhr;
            return t ? t.getResponseHeader(e) : ""
        }, a.destroy = function () {
            var e = this;
            clearTimeout(e.timer);
            try {
                e.xhr.onreadystatechange = o.f, e.xhr.abort()
            } catch (t) {
                console.error("ignore error ajax destroy,", t)
            }
            i.destroy.call(e)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(107), o = function (e, t) {
            return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] = "multipart/form-data", t.timeout = 0, t.type = t.type || "json", r(e, t)
        };
        e.exports = o
    }, function (e, t, n) {
        (function (e) {
            "use strict";
            "undefined" != typeof window && (window.console || e.env.WEIXIN_APP || (window.console = {
                log: function () {
                }, info: function () {
                }, warn: function () {
                }, error: function () {
                }
            }))
        }).call(t, n(31))
    }, function (e, t, n) {
        "use strict";

        function r() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            s.merge(this, {
                options: e,
                debug: !1,
                api: "log",
                style: "color:blue;",
                log: s.emptyFunc,
                info: s.emptyFunc,
                warn: s.emptyFunc,
                error: s.emptyFunc
            }), this.prefix = e.prefix || "", this.setDebug(e.debug)
        }

        var o = n(46), s = n(1), i = (n(62), r.prototype), a = ["Chrome", "Safari", "Firefox"];
        i.setDebug = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this;
            if (t.debug = e, e.style && (t.style = e.style), t.debug && s.exist(console)) {
                var n = console;
                t.debug = function () {
                    var e = t.formatArgs(arguments);
                    a.indexOf(o.name) !== -1 && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("debug", e)
                }, t.log = function () {
                    var e = t.formatArgs(arguments);
                    a.indexOf(o.name) !== -1 && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("log", e)
                }, t.info = function () {
                    var e = t.formatArgs(arguments);
                    a.indexOf(o.name) !== -1 && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("info", e)
                }, t.warn = function () {
                    var e = t.formatArgs(arguments);
                    a.indexOf(o.name) !== -1 && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("warn", e)
                }, t.error = function () {
                    var e = t.formatArgs(arguments);
                    a.indexOf(o.name) !== -1 && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("error", e)
                }, t._log = function (e, r) {
                    var o = !1, i = t.options.logFunc, a = null;
                    if (i && !o && (i[e] && (a = i[e]), s.isFunction(a))) return void a.apply(i, r);
                    if (n[e]) try {
                        n[e].apply ? t.chrome(e, r) : t.ie(e, r)
                    } catch (c) {
                    }
                }, t.chrome = function (e, r) {
                    a.indexOf(o.name) !== -1 ? n[e].apply(n, r) : t.ie(e, r)
                }, t.ie = function (e, t) {
                    t.forEach(function (t) {
                        n[e](JSON.stringify(t, null, 4))
                    })
                }
            }
        }, i.formatArgs = function (e) {
            var t = this;
            e = [].slice.call(e, 0);
            var n = new Date,
                r = c(n.getMonth() + 1) + "-" + c(n.getDate()) + " " + c(n.getHours()) + ":" + c(n.getMinutes()) + ":" + c(n.getSeconds()) + ":" + c(n.getMilliseconds(), 3),
                o = "[NIM LOG " + r + " " + t.prefix.toUpperCase() + "]  ";
            return s.isString(e[0]) ? e[0] = o + e[0] : e.splice(0, 0, o), e.forEach(function (t, n) {
                (s.isArray(t) || s.isObject(t)) && (e[n] = s.simpleClone(t))
            }), e
        };
        var c = function (e, t) {
            t = t || 2;
            for (var n = "" + e; n.length < t;) n = "0" + n;
            return n
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            var t = {debug: 0, log: 1, info: 2, warn: 3, error: 4}, n = this, r = e.url || null;
            n.level = t[e.level] || 0, n.logCache = [], n.logNum = 1, n.timeInterval = 5e3, window.onerror = function (e, t, r, o, s) {
                n.error.call(n, s)
            }, setInterval(function () {
                n.logCache.length > 0 && r && n.postLogs(r, n.logCache)
            }, n.timeInterval)
        }

        var s = n(15), i = r(s);
        o.prototype.debug = function () {
            this.level > 0 || (console.debug.apply(this, arguments), this.cacheLogs.apply(this, ["[degbug]"].concat(arguments)))
        }, o.prototype.log = function () {
            this.level > 1 || (console.log.apply(this, arguments), this.cacheLogs.apply(this, ["[log]"].concat(arguments)))
        }, o.prototype.info = function () {
            this.level > 2 || (console.info.apply(this, arguments), this.cacheLogs.apply(this, ["[info]"].concat(arguments)))
        }, o.prototype.warn = function () {
            this.level > 3 || (console.warn.apply(this, arguments), this.cacheLogs.apply(this, ["[warn]"].concat(arguments)))
        }, o.prototype.error = function () {
            this.level > 4 || (console.error.apply(this, arguments), this.cacheLogs.apply(this, ["[error]"].concat(arguments)))
        }, o.prototype.cacheLogs = function (e, t) {
            for (var n = [], r = 0; r < t.length; r++) {
                var o = t[r];
                "object" === ("undefined" == typeof o ? "undefined" : (0, i["default"])(o)) ? n.push(JSON.stringify(o)) : n.push(o)
            }
            var s = this.logNum++ + " " + e + " " + n.join("; ");
            this.logCache.push(s.replace("%c", ""))
        }, o.prototype.postLogs = function (e, t) {
            var n = this, r = new XMLHttpRequest;
            r.onreadystatechange = function () {
                4 === r.readyState && (200 === r.status ? (console.info("LoggerPlugin::日志上报完成"), n.logCache = [], n.timeInterval = 5e3) : n.timeInterval += 5e3)
            }, r.open("POST", e), r.setRequestHeader("Content-Type", "plain/text;charset=utf-8"), r.timeout = 360, r.send(t.join("\n"))
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = {
            file: {md5: "$(Etag)", size: "$(ObjectSize)"},
            image: {
                md5: "$(Etag)",
                size: "$(ObjectSize)",
                w: "$(ImageInfo.Width)",
                h: "$(ImageInfo.Height)",
                orientation: "$(ImageInfo.Orientation)"
            },
            audio: {md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Audio.Duration)"},
            video: {
                md5: "$(Etag)",
                size: "$(ObjectSize)",
                dur: "$(AVinfo.Video.Duration)",
                w: "$(AVinfo.Video.Width)",
                h: "$(AVinfo.Video.Height)"
            }
        }, s = {};
        s.genResponseBody = function (e) {
            return e = e || "file", o[e]
        }, s.parseResponse = function (e, t) {
            r.notundef(e.size) && (e.size = +e.size), r.notundef(e.w) && (e.w = +e.w), r.notundef(e.h) && (e.h = +e.h), r.notundef(e.dur) && (e.dur = +e.dur);
            var n = e.orientation;
            if (r.notundef(n) && (delete e.orientation, t && ("right, top" === n || "left, bottom" === n))) {
                var o = e.w;
                e.w = e.h, e.h = o
            }
            return e
        }, e.exports = s
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var t = this;
            t.options = o.copy(e), o.verifyOptions(e, "url fileName"), o.verifyParamPresentJustOne(e, "blob fileInput"), o.verifyCallback(e, "beginupload uploadprogress uploaddone"), e.fileInput && (e.fileInput = o.verifyFileInput(e.fileInput)), e.type && o.verifyFileType(e.type), e.timeout ? o.verifyParamType("timeout", e.timeout, "number") : e.timeout = 6e5, o.verifyFileUploadCallback(e), e.data = {};
            var n = e.fileName, r = e.fileInput;
            if (c) if (r) {
                var a = e.type ? o.filterFiles(r.files, e.type) : [].slice.call(r.files, 0);
                if (!a || !a.length) return void e.uploaddone(s.newWrongFileTypeError("未读取到" + e.type + "类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了" + e.type + "类型的文件"));
                var l = r.files[0].size;
                if (l > u) return void e.uploaddone(s.newFileTooLargeError("文件大小超过100M"));
                e.data[n] = a[0]
            } else e.blob && (e.data[n] = e.blob); else o.dataset(r, "name", n), e.data.input = r;
            e.params && o.merge(e.data, e.params);
            var m = {
                data: e.data, onaftersend: function () {
                    e.beginupload(t)
                }, onuploading: function (t) {
                    var n = Math.floor(1e4 * t.loaded / t.total) / 100,
                        r = {docId: e.docId, total: t.total, loaded: t.loaded, percentage: n, percentageText: n + "%"};
                    e.fileInput && (r.fileInput = e.fileInput), e.blob && (r.blob = e.blob), e.uploadprogress(r)
                }, onload: function (n) {
                    n.docId = e.docId, n.Error ? t.onError(n) : e.uploaddone(null, n)
                }, onerror: function (n) {
                    try {
                        if (n.result) var r = JSON.parse(n.result); else r = n;
                        t.onError(r)
                    } catch (o) {
                        console.error("ignore error if could not parse obj.result", o), e.uploaddone(new s(n.message, n.code), t.options)
                    }
                }
            };
            c || (m.mode = "iframe"), m.putFileAtEnd = !0, t.sn = i(e.url, m)
        }

        var o = n(1), s = n(27), i = n(62).upload, a = n(62).abort, c = o.supportFormData, u = 104857600;
        r.prototype.onError = function (e) {
            var t, n, r, o = this, i = o.options;
            e = e || {}, t = e.Error || e || {}, n = t.Code || t.code || "unknown", r = t.Message || t.message || "未知错误", i.uploaddone(new s(n + "(" + r + ")", n))
        }, r.prototype.abort = function () {
            a(this.sn)
        }, e.exports = r
    }, , , , , , function (e, t, n) {
        var r, o;
        !function (s, i) {
            "use strict";
            r = i, o = "function" == typeof r ? r.call(t, n, t, e) : r, !(void 0 !== o && (e.exports = o))
        }(this, function () {
            var e, t, n = Array, r = n.prototype, o = Object, s = o.prototype, i = Function, a = i.prototype,
                c = String, u = c.prototype, l = Number, m = l.prototype, d = r.slice, f = r.splice, p = r.push,
                g = r.unshift, y = r.concat, h = r.join, v = a.call, b = a.apply, M = Math.max, T = Math.min,
                k = s.toString, S = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
                w = Function.prototype.toString, C = /^\s*class /, O = function (e) {
                    try {
                        var t = w.call(e), n = t.replace(/\/\/.*\n/g, ""), r = n.replace(/\/\*[.\s\S]*\*\//g, ""),
                            o = r.replace(/\n/gm, " ").replace(/ {2}/g, " ");
                        return C.test(o)
                    } catch (s) {
                        return !1
                    }
                }, I = function (e) {
                    try {
                        return !O(e) && (w.call(e), !0)
                    } catch (t) {
                        return !1
                    }
                }, x = "[object Function]", _ = "[object GeneratorFunction]", e = function (e) {
                    if (!e) return !1;
                    if ("function" != typeof e && "object" != typeof e) return !1;
                    if (S) return I(e);
                    if (O(e)) return !1;
                    var t = k.call(e);
                    return t === x || t === _
                }, P = RegExp.prototype.exec, E = function (e) {
                    try {
                        return P.call(e), !0
                    } catch (t) {
                        return !1
                    }
                }, A = "[object RegExp]";
            t = function (e) {
                return "object" == typeof e && (S ? E(e) : k.call(e) === A)
            };
            var j, R = String.prototype.valueOf, F = function (e) {
                try {
                    return R.call(e), !0
                } catch (t) {
                    return !1
                }
            }, N = "[object String]";
            j = function (e) {
                return "string" == typeof e || "object" == typeof e && (S ? F(e) : k.call(e) === N)
            };
            var U = o.defineProperty && function () {
                try {
                    var e = {};
                    o.defineProperty(e, "x", {enumerable: !1, value: e});
                    for (var t in e) return !1;
                    return e.x === e
                } catch (n) {
                    return !1
                }
            }(), D = function (e) {
                var t;
                return t = U ? function (e, t, n, r) {
                    !r && t in e || o.defineProperty(e, t, {configurable: !0, enumerable: !1, writable: !0, value: n})
                } : function (e, t, n, r) {
                    !r && t in e || (e[t] = n)
                }, function (n, r, o) {
                    for (var s in r) e.call(r, s) && t(n, s, r[s], o)
                }
            }(s.hasOwnProperty), L = function (e) {
                var t = typeof e;
                return null === e || "object" !== t && "function" !== t
            }, B = l.isNaN || function (e) {
                return e !== e
            }, q = {
                ToInteger: function (e) {
                    var t = +e;
                    return B(t) ? t = 0 : 0 !== t && t !== 1 / 0 && t !== -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))), t
                }, ToPrimitive: function (t) {
                    var n, r, o;
                    if (L(t)) return t;
                    if (r = t.valueOf, e(r) && (n = r.call(t), L(n))) return n;
                    if (o = t.toString, e(o) && (n = o.call(t), L(n))) return n;
                    throw new TypeError
                }, ToObject: function (e) {
                    if (null == e) throw new TypeError("can't convert " + e + " to object");
                    return o(e)
                }, ToUint32: function (e) {
                    return e >>> 0
                }
            }, W = function () {
            };
            D(a, {
                bind: function (t) {
                    var n = this;
                    if (!e(n)) throw new TypeError("Function.prototype.bind called on incompatible " + n);
                    for (var r, s = d.call(arguments, 1), a = function () {
                        if (this instanceof r) {
                            var e = b.call(n, this, y.call(s, d.call(arguments)));
                            return o(e) === e ? e : this
                        }
                        return b.call(n, t, y.call(s, d.call(arguments)))
                    }, c = M(0, n.length - s.length), u = [], l = 0; l < c; l++) p.call(u, "$" + l);
                    return r = i("binder", "return function (" + h.call(u, ",") + "){ return binder.apply(this, arguments); }")(a), n.prototype && (W.prototype = n.prototype, r.prototype = new W, W.prototype = null), r
                }
            });
            var H = v.bind(s.hasOwnProperty), J = v.bind(s.toString), $ = v.bind(d), X = b.bind(d);
            if ("object" == typeof document && document && document.documentElement) try {
                $(document.documentElement.childNodes)
            } catch (V) {
                var z = $, K = X;
                $ = function (e) {
                    for (var t = [], n = e.length; n-- > 0;) t[n] = e[n];
                    return K(t, z(arguments, 1))
                }, X = function (e, t) {
                    return K($(e), t)
                }
            }
            var G = v.bind(u.slice), Y = v.bind(u.split), Q = v.bind(u.indexOf), Z = v.bind(p),
                ee = v.bind(s.propertyIsEnumerable), te = v.bind(r.sort), ne = n.isArray || function (e) {
                    return "[object Array]" === J(e)
                }, re = 1 !== [].unshift(0);
            D(r, {
                unshift: function () {
                    return g.apply(this, arguments), this.length
                }
            }, re), D(n, {isArray: ne});
            var oe = o("a"), se = "a" !== oe[0] || !(0 in oe), ie = function (e) {
                var t = !0, n = !0, r = !1;
                if (e) try {
                    e.call("foo", function (e, n, r) {
                        "object" != typeof r && (t = !1)
                    }), e.call([1], function () {
                        "use strict";
                        n = "string" == typeof this
                    }, "x")
                } catch (o) {
                    r = !0
                }
                return !!e && !r && t && n
            };
            D(r, {
                forEach: function (t) {
                    var n, r = q.ToObject(this), o = se && j(this) ? Y(this, "") : r, s = -1, i = q.ToUint32(o.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t)) throw new TypeError("Array.prototype.forEach callback must be a function");
                    for (; ++s < i;) s in o && ("undefined" == typeof n ? t(o[s], s, r) : t.call(n, o[s], s, r))
                }
            }, !ie(r.forEach)), D(r, {
                map: function (t) {
                    var r, o = q.ToObject(this), s = se && j(this) ? Y(this, "") : o, i = q.ToUint32(s.length),
                        a = n(i);
                    if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.map callback must be a function");
                    for (var c = 0; c < i; c++) c in s && ("undefined" == typeof r ? a[c] = t(s[c], c, o) : a[c] = t.call(r, s[c], c, o));
                    return a
                }
            }, !ie(r.map)), D(r, {
                filter: function (t) {
                    var n, r, o = q.ToObject(this), s = se && j(this) ? Y(this, "") : o, i = q.ToUint32(s.length),
                        a = [];
                    if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.filter callback must be a function");
                    for (var c = 0; c < i; c++) c in s && (n = s[c], ("undefined" == typeof r ? t(n, c, o) : t.call(r, n, c, o)) && Z(a, n));
                    return a
                }
            }, !ie(r.filter)), D(r, {
                every: function (t) {
                    var n, r = q.ToObject(this), o = se && j(this) ? Y(this, "") : r, s = q.ToUint32(o.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t)) throw new TypeError("Array.prototype.every callback must be a function");
                    for (var i = 0; i < s; i++) if (i in o && !("undefined" == typeof n ? t(o[i], i, r) : t.call(n, o[i], i, r))) return !1;
                    return !0
                }
            }, !ie(r.every)), D(r, {
                some: function (t) {
                    var n, r = q.ToObject(this), o = se && j(this) ? Y(this, "") : r, s = q.ToUint32(o.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t)) throw new TypeError("Array.prototype.some callback must be a function");
                    for (var i = 0; i < s; i++) if (i in o && ("undefined" == typeof n ? t(o[i], i, r) : t.call(n, o[i], i, r))) return !0;
                    return !1
                }
            }, !ie(r.some));
            var ae = !1;
            r.reduce && (ae = "object" == typeof r.reduce.call("es5", function (e, t, n, r) {
                return r
            })), D(r, {
                reduce: function (t) {
                    var n = q.ToObject(this), r = se && j(this) ? Y(this, "") : n, o = q.ToUint32(r.length);
                    if (!e(t)) throw new TypeError("Array.prototype.reduce callback must be a function");
                    if (0 === o && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
                    var s, i = 0;
                    if (arguments.length >= 2) s = arguments[1]; else for (; ;) {
                        if (i in r) {
                            s = r[i++];
                            break
                        }
                        if (++i >= o) throw new TypeError("reduce of empty array with no initial value")
                    }
                    for (; i < o; i++) i in r && (s = t(s, r[i], i, n));
                    return s
                }
            }, !ae);
            var ce = !1;
            r.reduceRight && (ce = "object" == typeof r.reduceRight.call("es5", function (e, t, n, r) {
                return r
            })), D(r, {
                reduceRight: function (t) {
                    var n = q.ToObject(this), r = se && j(this) ? Y(this, "") : n, o = q.ToUint32(r.length);
                    if (!e(t)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
                    if (0 === o && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                    var s, i = o - 1;
                    if (arguments.length >= 2) s = arguments[1]; else for (; ;) {
                        if (i in r) {
                            s = r[i--];
                            break
                        }
                        if (--i < 0) throw new TypeError("reduceRight of empty array with no initial value")
                    }
                    if (i < 0) return s;
                    do i in r && (s = t(s, r[i], i, n)); while (i--);
                    return s
                }
            }, !ce);
            var ue = r.indexOf && [0, 1].indexOf(1, 2) !== -1;
            D(r, {
                indexOf: function (e) {
                    var t = se && j(this) ? Y(this, "") : q.ToObject(this), n = q.ToUint32(t.length);
                    if (0 === n) return -1;
                    var r = 0;
                    for (arguments.length > 1 && (r = q.ToInteger(arguments[1])), r = r >= 0 ? r : M(0, n + r); r < n; r++) if (r in t && t[r] === e) return r;
                    return -1
                }
            }, ue);
            var le = r.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
            D(r, {
                lastIndexOf: function (e) {
                    var t = se && j(this) ? Y(this, "") : q.ToObject(this), n = q.ToUint32(t.length);
                    if (0 === n) return -1;
                    var r = n - 1;
                    for (arguments.length > 1 && (r = T(r, q.ToInteger(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r); r >= 0; r--) if (r in t && e === t[r]) return r;
                    return -1
                }
            }, le);
            var me = function () {
                var e = [1, 2], t = e.splice();
                return 2 === e.length && ne(t) && 0 === t.length
            }();
            D(r, {
                splice: function (e, t) {
                    return 0 === arguments.length ? [] : f.apply(this, arguments)
                }
            }, !me);
            var de = function () {
                var e = {};
                return r.splice.call(e, 0, 0, 1), 1 === e.length
            }();
            D(r, {
                splice: function (e, t) {
                    if (0 === arguments.length) return [];
                    var n = arguments;
                    return this.length = M(q.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof t && (n = $(arguments), n.length < 2 ? Z(n, this.length - e) : n[1] = q.ToInteger(t)), f.apply(this, n)
                }
            }, !de);
            var fe = function () {
                var e = new n(1e5);
                return e[8] = "x", e.splice(1, 1), 7 === e.indexOf("x")
            }(), pe = function () {
                var e = 256, t = [];
                return t[e] = "a", t.splice(e + 1, 0, "b"), "a" === t[e]
            }();
            D(r, {
                splice: function (e, t) {
                    for (var n, r = q.ToObject(this), o = [], s = q.ToUint32(r.length), i = q.ToInteger(e), a = i < 0 ? M(s + i, 0) : T(i, s), u = T(M(q.ToInteger(t), 0), s - a), l = 0; l < u;) n = c(a + l), H(r, n) && (o[l] = r[n]), l += 1;
                    var m, d = $(arguments, 2), f = d.length;
                    if (f < u) {
                        l = a;
                        for (var p = s - u; l < p;) n = c(l + u), m = c(l + f), H(r, n) ? r[m] = r[n] : delete r[m], l += 1;
                        l = s;
                        for (var g = s - u + f; l > g;) delete r[l - 1], l -= 1
                    } else if (f > u) for (l = s - u; l > a;) n = c(l + u - 1), m = c(l + f - 1), H(r, n) ? r[m] = r[n] : delete r[m], l -= 1;
                    l = a;
                    for (var y = 0; y < d.length; ++y) r[l] = d[y], l += 1;
                    return r.length = s - u + f, o
                }
            }, !fe || !pe);
            var ge, ye = r.join;
            try {
                ge = "1,2,3" !== Array.prototype.join.call("123", ",")
            } catch (V) {
                ge = !0
            }
            ge && D(r, {
                join: function (e) {
                    var t = "undefined" == typeof e ? "," : e;
                    return ye.call(j(this) ? Y(this, "") : this, t)
                }
            }, ge);
            var he = "1,2" !== [1, 2].join(void 0);
            he && D(r, {
                join: function (e) {
                    var t = "undefined" == typeof e ? "," : e;
                    return ye.call(this, t)
                }
            }, he);
            var ve = function (e) {
                for (var t = q.ToObject(this), n = q.ToUint32(t.length), r = 0; r < arguments.length;) t[n + r] = arguments[r], r += 1;
                return t.length = n + r, n + r
            }, be = function () {
                var e = {}, t = Array.prototype.push.call(e, void 0);
                return 1 !== t || 1 !== e.length || "undefined" != typeof e[0] || !H(e, 0)
            }();
            D(r, {
                push: function (e) {
                    return ne(this) ? p.apply(this, arguments) : ve.apply(this, arguments)
                }
            }, be);
            var Me = function () {
                var e = [], t = e.push(void 0);
                return 1 !== t || 1 !== e.length || "undefined" != typeof e[0] || !H(e, 0)
            }();
            D(r, {push: ve}, Me), D(r, {
                slice: function (e, t) {
                    var n = j(this) ? Y(this, "") : this;
                    return X(n, arguments)
                }
            }, se);
            var Te = function () {
                try {
                    [1, 2].sort(null)
                } catch (e) {
                    try {
                        [1, 2].sort({})
                    } catch (t) {
                        return !1
                    }
                }
                return !0
            }(), ke = function () {
                try {
                    return [1, 2].sort(/a/), !1
                } catch (e) {
                }
                return !0
            }(), Se = function () {
                try {
                    return [1, 2].sort(void 0), !0
                } catch (e) {
                }
                return !1
            }();
            D(r, {
                sort: function (t) {
                    if ("undefined" == typeof t) return te(this);
                    if (!e(t)) throw new TypeError("Array.prototype.sort callback must be a function");
                    return te(this, t)
                }
            }, Te || !Se || !ke);
            var we = !ee({toString: null}, "toString"), Ce = ee(function () {
                }, "prototype"), Oe = !H("x", "0"), Ie = function (e) {
                    var t = e.constructor;
                    return t && t.prototype === e
                }, xe = {
                    $window: !0,
                    $console: !0,
                    $parent: !0,
                    $self: !0,
                    $frame: !0,
                    $frames: !0,
                    $frameElement: !0,
                    $webkitIndexedDB: !0,
                    $webkitStorageInfo: !0,
                    $external: !0,
                    $width: !0,
                    $height: !0,
                    $top: !0,
                    $localStorage: !0
                }, _e = function () {
                    if ("undefined" == typeof window) return !1;
                    for (var e in window) try {
                        !xe["$" + e] && H(window, e) && null !== window[e] && "object" == typeof window[e] && Ie(window[e])
                    } catch (t) {
                        return !0
                    }
                    return !1
                }(), Pe = function (e) {
                    if ("undefined" == typeof window || !_e) return Ie(e);
                    try {
                        return Ie(e)
                    } catch (t) {
                        return !1
                    }
                },
                Ee = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                Ae = Ee.length, je = function (e) {
                    return "[object Arguments]" === J(e)
                }, Re = function (t) {
                    return null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && !ne(t) && e(t.callee)
                }, Fe = je(arguments) ? je : Re;
            D(o, {
                keys: function (t) {
                    var n = e(t), r = Fe(t), o = null !== t && "object" == typeof t, s = o && j(t);
                    if (!o && !n && !r) throw new TypeError("Object.keys called on a non-object");
                    var i = [], a = Ce && n;
                    if (s && Oe || r) for (var u = 0; u < t.length; ++u) Z(i, c(u));
                    if (!r) for (var l in t) a && "prototype" === l || !H(t, l) || Z(i, c(l));
                    if (we) for (var m = Pe(t), d = 0; d < Ae; d++) {
                        var f = Ee[d];
                        m && "constructor" === f || !H(t, f) || Z(i, f)
                    }
                    return i
                }
            });
            var Ne = o.keys && function () {
                return 2 === o.keys(arguments).length
            }(1, 2), Ue = o.keys && function () {
                var e = o.keys(arguments);
                return 1 !== arguments.length || 1 !== e.length || 1 !== e[0]
            }(1), De = o.keys;
            D(o, {
                keys: function (e) {
                    return De(Fe(e) ? $(e) : e)
                }
            }, !Ne || Ue);
            var Le, Be, qe = 0 !== new Date(-0xc782b5b342b24).getUTCMonth(), We = new Date(-0x55d318d56a724),
                He = new Date(14496624e5), Je = "Mon, 01 Jan -45875 11:59:59 GMT" !== We.toUTCString(),
                $e = We.getTimezoneOffset();
            $e < -720 ? (Le = "Tue Jan 02 -45875" !== We.toDateString(), Be = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(He))) : (Le = "Mon Jan 01 -45875" !== We.toDateString(), Be = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(He)));
            var Xe = v.bind(Date.prototype.getFullYear), Ve = v.bind(Date.prototype.getMonth),
                ze = v.bind(Date.prototype.getDate), Ke = v.bind(Date.prototype.getUTCFullYear),
                Ge = v.bind(Date.prototype.getUTCMonth), Ye = v.bind(Date.prototype.getUTCDate),
                Qe = v.bind(Date.prototype.getUTCDay), Ze = v.bind(Date.prototype.getUTCHours),
                et = v.bind(Date.prototype.getUTCMinutes), tt = v.bind(Date.prototype.getUTCSeconds),
                nt = v.bind(Date.prototype.getUTCMilliseconds), rt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                ot = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                st = function (e, t) {
                    return ze(new Date(t, e, 0))
                };
            D(Date.prototype, {
                getFullYear: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Xe(this);
                    return e < 0 && Ve(this) > 11 ? e + 1 : e
                }, getMonth: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Xe(this), t = Ve(this);
                    return e < 0 && t > 11 ? 0 : t
                }, getDate: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Xe(this), t = Ve(this), n = ze(this);
                    if (e < 0 && t > 11) {
                        if (12 === t) return n;
                        var r = st(0, e + 1);
                        return r - n + 1
                    }
                    return n
                }, getUTCFullYear: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Ke(this);
                    return e < 0 && Ge(this) > 11 ? e + 1 : e
                }, getUTCMonth: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Ke(this), t = Ge(this);
                    return e < 0 && t > 11 ? 0 : t
                }, getUTCDate: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Ke(this), t = Ge(this), n = Ye(this);
                    if (e < 0 && t > 11) {
                        if (12 === t) return n;
                        var r = st(0, e + 1);
                        return r - n + 1
                    }
                    return n
                }
            }, qe), D(Date.prototype, {
                toUTCString: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = Qe(this), t = Ye(this), n = Ge(this), r = Ke(this), o = Ze(this), s = et(this),
                        i = tt(this);
                    return rt[e] + ", " + (t < 10 ? "0" + t : t) + " " + ot[n] + " " + r + " " + (o < 10 ? "0" + o : o) + ":" + (s < 10 ? "0" + s : s) + ":" + (i < 10 ? "0" + i : i) + " GMT"
                }
            }, qe || Je), D(Date.prototype, {
                toDateString: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var e = this.getDay(), t = this.getDate(), n = this.getMonth(), r = this.getFullYear();
                    return rt[e] + " " + ot[n] + " " + (t < 10 ? "0" + t : t) + " " + r
                }
            }, qe || Le), (qe || Be) && (Date.prototype.toString = function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var e = this.getDay(), t = this.getDate(), n = this.getMonth(), r = this.getFullYear(),
                    o = this.getHours(), s = this.getMinutes(), i = this.getSeconds(), a = this.getTimezoneOffset(),
                    c = Math.floor(Math.abs(a) / 60), u = Math.floor(Math.abs(a) % 60);
                return rt[e] + " " + ot[n] + " " + (t < 10 ? "0" + t : t) + " " + r + " " + (o < 10 ? "0" + o : o) + ":" + (s < 10 ? "0" + s : s) + ":" + (i < 10 ? "0" + i : i) + " GMT" + (a > 0 ? "-" : "+") + (c < 10 ? "0" + c : c) + (u < 10 ? "0" + u : u)
            }, U && o.defineProperty(Date.prototype, "toString", {configurable: !0, enumerable: !1, writable: !0}));
            var it = -621987552e5, at = "-000001",
                ct = Date.prototype.toISOString && new Date(it).toISOString().indexOf(at) === -1,
                ut = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString(),
                lt = v.bind(Date.prototype.getTime);
            D(Date.prototype, {
                toISOString: function () {
                    if (!isFinite(this) || !isFinite(lt(this))) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                    var e = Ke(this), t = Ge(this);
                    e += Math.floor(t / 12), t = (t % 12 + 12) % 12;
                    var n = [t + 1, Ye(this), Ze(this), et(this), tt(this)];
                    e = (e < 0 ? "-" : e > 9999 ? "+" : "") + G("00000" + Math.abs(e), 0 <= e && e <= 9999 ? -4 : -6);
                    for (var r = 0; r < n.length; ++r) n[r] = G("00" + n[r], -2);
                    return e + "-" + $(n, 0, 2).join("-") + "T" + $(n, 2).join(":") + "." + G("000" + nt(this), -3) + "Z"
                }
            }, ct || ut);
            var mt = function () {
                try {
                    return Date.prototype.toJSON && null === new Date(NaN).toJSON() && new Date(it).toJSON().indexOf(at) !== -1 && Date.prototype.toJSON.call({
                        toISOString: function () {
                            return !0
                        }
                    })
                } catch (e) {
                    return !1
                }
            }();
            mt || (Date.prototype.toJSON = function (t) {
                var n = o(this), r = q.ToPrimitive(n);
                if ("number" == typeof r && !isFinite(r)) return null;
                var s = n.toISOString;
                if (!e(s)) throw new TypeError("toISOString property is not callable");
                return s.call(n)
            });
            var dt = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
                ft = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
                pt = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
            if (pt || ft || !dt) {
                var gt = Math.pow(2, 31) - 1, yt = B(new Date(1970, 0, 1, 0, 0, 0, gt + 1).getTime());
                Date = function (e) {
                    var t = function (n, r, o, s, i, a, u) {
                            var l, m = arguments.length;
                            if (this instanceof e) {
                                var d = a, f = u;
                                if (yt && m >= 7 && u > gt) {
                                    var p = Math.floor(u / gt) * gt, g = Math.floor(p / 1e3);
                                    d += g, f -= 1e3 * g
                                }
                                l = 1 === m && c(n) === n ? new e(t.parse(n)) : m >= 7 ? new e(n, r, o, s, i, d, f) : m >= 6 ? new e(n, r, o, s, i, d) : m >= 5 ? new e(n, r, o, s, i) : m >= 4 ? new e(n, r, o, s) : m >= 3 ? new e(n, r, o) : m >= 2 ? new e(n, r) : m >= 1 ? new e(n instanceof e ? +n : n) : new e
                            } else l = e.apply(this, arguments);
                            return L(l) || D(l, {constructor: t}, !0), l
                        },
                        n = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
                        r = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], o = function (e, t) {
                            var n = t > 1 ? 1 : 0;
                            return r[t] + Math.floor((e - 1969 + n) / 4) - Math.floor((e - 1901 + n) / 100) + Math.floor((e - 1601 + n) / 400) + 365 * (e - 1970)
                        }, s = function (t) {
                            var n = 0, r = t;
                            if (yt && r > gt) {
                                var o = Math.floor(r / gt) * gt, s = Math.floor(o / 1e3);
                                n += s, r -= 1e3 * s
                            }
                            return l(new e(1970, 0, 1, 0, 0, n, r))
                        };
                    for (var i in e) H(e, i) && (t[i] = e[i]);
                    D(t, {now: e.now, UTC: e.UTC}, !0), t.prototype = e.prototype, D(t.prototype, {constructor: t}, !0);
                    var a = function (t) {
                        var r = n.exec(t);
                        if (r) {
                            var i, a = l(r[1]), c = l(r[2] || 1) - 1, u = l(r[3] || 1) - 1, m = l(r[4] || 0),
                                d = l(r[5] || 0), f = l(r[6] || 0), p = Math.floor(1e3 * l(r[7] || 0)),
                                g = Boolean(r[4] && !r[8]), y = "-" === r[9] ? 1 : -1, h = l(r[10] || 0),
                                v = l(r[11] || 0), b = d > 0 || f > 0 || p > 0;
                            return m < (b ? 24 : 25) && d < 60 && f < 60 && p < 1e3 && c > -1 && c < 12 && h < 24 && v < 60 && u > -1 && u < o(a, c + 1) - o(a, c) && (i = 60 * (24 * (o(a, c) + u) + m + h * y), i = 1e3 * (60 * (i + d + v * y) + f) + p, g && (i = s(i)), -864e13 <= i && i <= 864e13) ? i : NaN
                        }
                        return e.parse.apply(this, arguments)
                    };
                    return D(t, {parse: a}), t
                }(Date)
            }
            Date.now || (Date.now = function () {
                return (new Date).getTime()
            });
            var ht = m.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)),
                vt = {
                    base: 1e7, size: 6, data: [0, 0, 0, 0, 0, 0], multiply: function (e, t) {
                        for (var n = -1, r = t; ++n < vt.size;) r += e * vt.data[n], vt.data[n] = r % vt.base, r = Math.floor(r / vt.base)
                    }, divide: function (e) {
                        for (var t = vt.size, n = 0; --t >= 0;) n += vt.data[t], vt.data[t] = Math.floor(n / e), n = n % e * vt.base
                    }, numToString: function () {
                        for (var e = vt.size, t = ""; --e >= 0;) if ("" !== t || 0 === e || 0 !== vt.data[e]) {
                            var n = c(vt.data[e]);
                            "" === t ? t = n : t += G("0000000", 0, 7 - n.length) + n
                        }
                        return t
                    }, pow: function Dt(e, t, n) {
                        return 0 === t ? n : t % 2 === 1 ? Dt(e, t - 1, n * e) : Dt(e * e, t / 2, n)
                    }, log: function (e) {
                        for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
                        for (; n >= 2;) t += 1, n /= 2;
                        return t
                    }
                }, bt = function (e) {
                    var t, n, r, o, s, i, a, u;
                    if (t = l(e), t = B(t) ? 0 : Math.floor(t), t < 0 || t > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
                    if (n = l(this), B(n)) return "NaN";
                    if (n <= -1e21 || n >= 1e21) return c(n);
                    if (r = "", n < 0 && (r = "-", n = -n), o = "0", n > 1e-21) if (s = vt.log(n * vt.pow(2, 69, 1)) - 69, i = s < 0 ? n * vt.pow(2, -s, 1) : n / vt.pow(2, s, 1), i *= 4503599627370496, s = 52 - s, s > 0) {
                        for (vt.multiply(0, i), a = t; a >= 7;) vt.multiply(1e7, 0), a -= 7;
                        for (vt.multiply(vt.pow(10, a, 1), 0), a = s - 1; a >= 23;) vt.divide(1 << 23), a -= 23;
                        vt.divide(1 << a), vt.multiply(1, 1), vt.divide(2), o = vt.numToString()
                    } else vt.multiply(0, i), vt.multiply(1 << -s, 0), o = vt.numToString() + G("0.00000000000000000000", 2, 2 + t);
                    return t > 0 ? (u = o.length, o = u <= t ? r + G("0.0000000000000000000", 0, t - u + 2) + o : r + G(o, 0, u - t) + "." + G(o, u - t)) : o = r + o, o
                };
            D(m, {toFixed: bt}, ht);
            var Mt = function () {
                try {
                    return "1" === 1..toPrecision(void 0)
                } catch (e) {
                    return !0
                }
            }(), Tt = m.toPrecision;
            D(m, {
                toPrecision: function (e) {
                    return "undefined" == typeof e ? Tt.call(this) : Tt.call(this, e)
                }
            }, Mt), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
                var e = "undefined" == typeof/()??/.exec("")[1], n = Math.pow(2, 32) - 1;
                u.split = function (r, o) {
                    var s = String(this);
                    if ("undefined" == typeof r && 0 === o) return [];
                    if (!t(r)) return Y(this, r, o);
                    var i, a, c, u, l = [],
                        m = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.unicode ? "u" : "") + (r.sticky ? "y" : ""),
                        d = 0, f = new RegExp(r.source, m + "g");
                    e || (i = new RegExp("^" + f.source + "$(?!\\s)", m));
                    var g = "undefined" == typeof o ? n : q.ToUint32(o);
                    for (a = f.exec(s); a && (c = a.index + a[0].length, !(c > d && (Z(l, G(s, d, a.index)), !e && a.length > 1 && a[0].replace(i, function () {
                        for (var e = 1; e < arguments.length - 2; e++) "undefined" == typeof arguments[e] && (a[e] = void 0)
                    }), a.length > 1 && a.index < s.length && p.apply(l, $(a, 1)), u = a[0].length, d = c, l.length >= g)));) f.lastIndex === a.index && f.lastIndex++, a = f.exec(s);
                    return d === s.length ? !u && f.test("") || Z(l, "") : Z(l, G(s, d)), l.length > g ? $(l, 0, g) : l
                }
            }() : "0".split(void 0, 0).length && (u.split = function (e, t) {
                return "undefined" == typeof e && 0 === t ? [] : Y(this, e, t)
            });
            var kt = u.replace, St = function () {
                var e = [];
                return "x".replace(/x(.)?/g, function (t, n) {
                    Z(e, n)
                }), 1 === e.length && "undefined" == typeof e[0]
            }();
            St || (u.replace = function (n, r) {
                var o = e(r), s = t(n) && /\)[*?]/.test(n.source);
                if (o && s) {
                    var i = function (e) {
                        var t = arguments.length, o = n.lastIndex;
                        n.lastIndex = 0;
                        var s = n.exec(e) || [];
                        return n.lastIndex = o, Z(s, arguments[t - 2], arguments[t - 1]), r.apply(this, s)
                    };
                    return kt.call(this, n, i)
                }
                return kt.call(this, n, r)
            });
            var wt = u.substr, Ct = "".substr && "b" !== "0b".substr(-1);
            D(u, {
                substr: function (e, t) {
                    var n = e;
                    return e < 0 && (n = M(this.length + e, 0)), wt.call(this, n, t)
                }
            }, Ct);
            var Ot = "\t\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff", It = "​", xt = "[" + Ot + "]",
                _t = new RegExp("^" + xt + xt + "*"), Pt = new RegExp(xt + xt + "*$"),
                Et = u.trim && (Ot.trim() || !It.trim());
            D(u, {
                trim: function () {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    return c(this).replace(_t, "").replace(Pt, "")
                }
            }, Et);
            var At = v.bind(String.prototype.trim), jt = u.lastIndexOf && "abcあい".lastIndexOf("あい", 2) !== -1;
            D(u, {
                lastIndexOf: function (e) {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    for (var t = c(this), n = c(e), r = arguments.length > 1 ? l(arguments[1]) : NaN, o = B(r) ? 1 / 0 : q.ToInteger(r), s = T(M(o, 0), t.length), i = n.length, a = s + i; a > 0;) {
                        a = M(0, a - i);
                        var u = Q(G(t, a, s + i), n);
                        if (u !== -1) return a + u
                    }
                    return -1
                }
            }, jt);
            var Rt = u.lastIndexOf;
            if (D(u, {
                    lastIndexOf: function (e) {
                        return Rt.apply(this, arguments)
                    }
                }, 1 !== u.lastIndexOf.length), 8 === parseInt(Ot + "08") && 22 === parseInt(Ot + "0x16") || (parseInt = function (e) {
                    var t = /^[-+]?0[xX]/;
                    return function (n, r) {
                        var o = At(String(n)), s = l(r) || (t.test(o) ? 16 : 10);
                        return e(o, s)
                    }
                }(parseInt)), 1 / parseFloat("-0") !== -(1 / 0) && (parseFloat = function (e) {
                    return function (t) {
                        var n = At(String(t)), r = e(n);
                        return 0 === r && "-" === G(n, 0, 1) ? -0 : r
                    }
                }(parseFloat)), "RangeError: test" !== String(new RangeError("test"))) {
                var Ft = function () {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    var e = this.name;
                    "undefined" == typeof e ? e = "Error" : "string" != typeof e && (e = c(e));
                    var t = this.message;
                    return "undefined" == typeof t ? t = "" : "string" != typeof t && (t = c(t)), e ? t ? e + ": " + t : e : t
                };
                Error.prototype.toString = Ft
            }
            if (U) {
                var Nt = function (e, t) {
                    if (ee(e, t)) {
                        var n = Object.getOwnPropertyDescriptor(e, t);
                        n.configurable && (n.enumerable = !1, Object.defineProperty(e, t, n))
                    }
                };
                Nt(Error.prototype, "message"), "" !== Error.prototype.message && (Error.prototype.message = ""), Nt(Error.prototype, "name")
            }
            if ("/a/gim" !== String(/a/gim)) {
                var Ut = function () {
                    var e = "/" + this.source + "/";
                    return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), e
                };
                RegExp.prototype.toString = Ut
            }
        })
    }, function (e, t, n) {
        function r(e, t, n) {
            if (!a(t)) throw new TypeError("iterator must be a function");
            arguments.length < 3 && (n = this), "[object Array]" === c.call(e) ? o(e, t, n) : "string" == typeof e ? s(e, t, n) : i(e, t, n)
        }

        function o(e, t, n) {
            for (var r = 0, o = e.length; r < o; r++) u.call(e, r) && t.call(n, e[r], r, e)
        }

        function s(e, t, n) {
            for (var r = 0, o = e.length; r < o; r++) t.call(n, e.charAt(r), r, e)
        }

        function i(e, t, n) {
            for (var r in e) u.call(e, r) && t.call(n, e[r], r, e)
        }

        var a = n(138);
        e.exports = r;
        var c = Object.prototype.toString, u = Object.prototype.hasOwnProperty
    }, function (e, t) {
        (function (t) {
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : {}, e.exports = n
        }).call(t, function () {
            return this
        }())
    }, function (e, t, n) {
        var r;
        (function (e, o) {
            (function () {
                function s(e, t) {
                    function n(e) {
                        if (n[e] !== y) return n[e];
                        var s;
                        if ("bug-string-char-index" == e) s = "a" != "a"[0]; else if ("json" == e) s = n("json-stringify") && n("json-parse"); else {
                            var i, a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if ("json-stringify" == e) {
                                var u = t.stringify, l = "function" == typeof u && b;
                                if (l) {
                                    (i = function () {
                                        return 1
                                    }).toJSON = i;
                                    try {
                                        l = "0" === u(0) && "0" === u(new r) && '""' == u(new o) && u(v) === y && u(y) === y && u() === y && "1" === u(i) && "[1]" == u([i]) && "[null]" == u([y]) && "null" == u(null) && "[null,null,null]" == u([y, v, null]) && u({a: [i, !0, !1, null, "\0\b\n\f\r\t"]}) == a && "1" === u(null, i) && "[\n 1,\n 2\n]" == u([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == u(new c(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == u(new c(864e13)) && '"-000001-01-01T00:00:00.000Z"' == u(new c(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == u(new c(-1))
                                    } catch (m) {
                                        l = !1
                                    }
                                }
                                s = l
                            }
                            if ("json-parse" == e) {
                                var d = t.parse;
                                if ("function" == typeof d) try {
                                    if (0 === d("0") && !d(!1)) {
                                        i = d(a);
                                        var f = 5 == i.a.length && 1 === i.a[0];
                                        if (f) {
                                            try {
                                                f = !d('"\t"')
                                            } catch (m) {
                                            }
                                            if (f) try {
                                                f = 1 !== d("01")
                                            } catch (m) {
                                            }
                                            if (f) try {
                                                f = 1 !== d("1.")
                                            } catch (m) {
                                            }
                                        }
                                    }
                                } catch (m) {
                                    f = !1
                                }
                                s = f
                            }
                        }
                        return n[e] = !!s
                    }

                    e || (e = u.Object()), t || (t = u.Object());
                    var r = e.Number || u.Number, o = e.String || u.String, i = e.Object || u.Object,
                        c = e.Date || u.Date, l = e.SyntaxError || u.SyntaxError, m = e.TypeError || u.TypeError,
                        d = e.Math || u.Math, f = e.JSON || u.JSON;
                    "object" == typeof f && f && (t.stringify = f.stringify, t.parse = f.parse);
                    var p, g, y, h = i.prototype, v = h.toString, b = new c(-0xc782b5b800cec);
                    try {
                        b = b.getUTCFullYear() == -109252 && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds()
                    } catch (M) {
                    }
                    if (!n("json")) {
                        var T = "[object Function]", k = "[object Date]", S = "[object Number]", w = "[object String]",
                            C = "[object Array]", O = "[object Boolean]", I = n("bug-string-char-index");
                        if (!b) var x = d.floor, _ = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                            P = function (e, t) {
                                return _[t] + 365 * (e - 1970) + x((e - 1969 + (t = +(t > 1))) / 4) - x((e - 1901 + t) / 100) + x((e - 1601 + t) / 400)
                            };
                        if ((p = h.hasOwnProperty) || (p = function (e) {
                                var t, n = {};
                                return (n.__proto__ = null, n.__proto__ = {toString: 1}, n).toString != v ? p = function (e) {
                                    var t = this.__proto__, n = e in (this.__proto__ = null, this);
                                    return this.__proto__ = t, n
                                } : (t = n.constructor, p = function (e) {
                                    var n = (this.constructor || t).prototype;
                                    return e in this && !(e in n && this[e] === n[e])
                                }), n = null, p.call(this, e)
                            }), g = function (e, t) {
                                var n, r, o, s = 0;
                                (n = function () {
                                    this.valueOf = 0
                                }).prototype.valueOf = 0, r = new n;
                                for (o in r) p.call(r, o) && s++;
                                return n = r = null, s ? g = 2 == s ? function (e, t) {
                                    var n, r = {}, o = v.call(e) == T;
                                    for (n in e) o && "prototype" == n || p.call(r, n) || !(r[n] = 1) || !p.call(e, n) || t(n)
                                } : function (e, t) {
                                    var n, r, o = v.call(e) == T;
                                    for (n in e) o && "prototype" == n || !p.call(e, n) || (r = "constructor" === n) || t(n);
                                    (r || p.call(e, n = "constructor")) && t(n)
                                } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], g = function (e, t) {
                                    var n, o, s = v.call(e) == T,
                                        i = !s && "function" != typeof e.constructor && a[typeof e.hasOwnProperty] && e.hasOwnProperty || p;
                                    for (n in e) s && "prototype" == n || !i.call(e, n) || t(n);
                                    for (o = r.length; n = r[--o]; i.call(e, n) && t(n)) ;
                                }), g(e, t)
                            }, !n("json-stringify")) {
                            var E = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"},
                                A = "000000", j = function (e, t) {
                                    return (A + (t || 0)).slice(-e)
                                }, R = "\\u00", F = function (e) {
                                    for (var t = '"', n = 0, r = e.length, o = !I || r > 10, s = o && (I ? e.split("") : e); n < r; n++) {
                                        var i = e.charCodeAt(n);
                                        switch (i) {
                                            case 8:
                                            case 9:
                                            case 10:
                                            case 12:
                                            case 13:
                                            case 34:
                                            case 92:
                                                t += E[i];
                                                break;
                                            default:
                                                if (i < 32) {
                                                    t += R + j(2, i.toString(16));
                                                    break
                                                }
                                                t += o ? s[n] : e.charAt(n)
                                        }
                                    }
                                    return t + '"'
                                }, N = function (e, t, n, r, o, s, i) {
                                    var a, c, u, l, d, f, h, b, M, T, I, _, E, A, R, U;
                                    try {
                                        a = t[e]
                                    } catch (D) {
                                    }
                                    if ("object" == typeof a && a) if (c = v.call(a), c != k || p.call(a, "toJSON")) "function" == typeof a.toJSON && (c != S && c != w && c != C || p.call(a, "toJSON")) && (a = a.toJSON(e)); else if (a > -1 / 0 && a < 1 / 0) {
                                        if (P) {
                                            for (d = x(a / 864e5), u = x(d / 365.2425) + 1970 - 1; P(u + 1, 0) <= d; u++) ;
                                            for (l = x((d - P(u, 0)) / 30.42); P(u, l + 1) <= d; l++) ;
                                            d = 1 + d - P(u, l), f = (a % 864e5 + 864e5) % 864e5, h = x(f / 36e5) % 24, b = x(f / 6e4) % 60, M = x(f / 1e3) % 60, T = f % 1e3
                                        } else u = a.getUTCFullYear(), l = a.getUTCMonth(), d = a.getUTCDate(), h = a.getUTCHours(), b = a.getUTCMinutes(), M = a.getUTCSeconds(), T = a.getUTCMilliseconds();
                                        a = (u <= 0 || u >= 1e4 ? (u < 0 ? "-" : "+") + j(6, u < 0 ? -u : u) : j(4, u)) + "-" + j(2, l + 1) + "-" + j(2, d) + "T" + j(2, h) + ":" + j(2, b) + ":" + j(2, M) + "." + j(3, T) + "Z"
                                    } else a = null;
                                    if (n && (a = n.call(t, e, a)), null === a) return "null";
                                    if (c = v.call(a), c == O) return "" + a;
                                    if (c == S) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
                                    if (c == w) return F("" + a);
                                    if ("object" == typeof a) {
                                        for (A = i.length; A--;) if (i[A] === a) throw m();
                                        if (i.push(a), I = [], R = s, s += o, c == C) {
                                            for (E = 0, A = a.length; E < A; E++) _ = N(E, a, n, r, o, s, i), I.push(_ === y ? "null" : _);
                                            U = I.length ? o ? "[\n" + s + I.join(",\n" + s) + "\n" + R + "]" : "[" + I.join(",") + "]" : "[]"
                                        } else g(r || a, function (e) {
                                            var t = N(e, a, n, r, o, s, i);
                                            t !== y && I.push(F(e) + ":" + (o ? " " : "") + t)
                                        }), U = I.length ? o ? "{\n" + s + I.join(",\n" + s) + "\n" + R + "}" : "{" + I.join(",") + "}" : "{}";
                                        return i.pop(), U
                                    }
                                };
                            t.stringify = function (e, t, n) {
                                var r, o, s, i;
                                if (a[typeof t] && t) if ((i = v.call(t)) == T) o = t; else if (i == C) {
                                    s = {};
                                    for (var c, u = 0, l = t.length; u < l; c = t[u++], i = v.call(c), (i == w || i == S) && (s[c] = 1)) ;
                                }
                                if (n) if ((i = v.call(n)) == S) {
                                    if ((n -= n % 1) > 0) for (r = "", n > 10 && (n = 10); r.length < n; r += " ") ;
                                } else i == w && (r = n.length <= 10 ? n : n.slice(0, 10));
                                return N("", (c = {}, c[""] = e, c), o, s, r, "", [])
                            }
                        }
                        if (!n("json-parse")) {
                            var U, D, L = o.fromCharCode,
                                B = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"},
                                q = function () {
                                    throw U = D = null, l()
                                }, W = function () {
                                    for (var e, t, n, r, o, s = D, i = s.length; U < i;) switch (o = s.charCodeAt(U)) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            U++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            return e = I ? s.charAt(U) : s[U], U++, e;
                                        case 34:
                                            for (e = "@", U++; U < i;) if (o = s.charCodeAt(U), o < 32) q(); else if (92 == o) switch (o = s.charCodeAt(++U)) {
                                                case 92:
                                                case 34:
                                                case 47:
                                                case 98:
                                                case 116:
                                                case 110:
                                                case 102:
                                                case 114:
                                                    e += B[o], U++;
                                                    break;
                                                case 117:
                                                    for (t = ++U, n = U + 4; U < n; U++) o = s.charCodeAt(U), o >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || q();
                                                    e += L("0x" + s.slice(t, U));
                                                    break;
                                                default:
                                                    q()
                                            } else {
                                                if (34 == o) break;
                                                for (o = s.charCodeAt(U), t = U; o >= 32 && 92 != o && 34 != o;) o = s.charCodeAt(++U);
                                                e += s.slice(t, U)
                                            }
                                            if (34 == s.charCodeAt(U)) return U++, e;
                                            q();
                                        default:
                                            if (t = U, 45 == o && (r = !0, o = s.charCodeAt(++U)), o >= 48 && o <= 57) {
                                                for (48 == o && (o = s.charCodeAt(U + 1), o >= 48 && o <= 57) && q(), r = !1; U < i && (o = s.charCodeAt(U), o >= 48 && o <= 57); U++) ;
                                                if (46 == s.charCodeAt(U)) {
                                                    for (n = ++U; n < i && (o = s.charCodeAt(n), o >= 48 && o <= 57); n++) ;
                                                    n == U && q(), U = n
                                                }
                                                if (o = s.charCodeAt(U), 101 == o || 69 == o) {
                                                    for (o = s.charCodeAt(++U), 43 != o && 45 != o || U++, n = U; n < i && (o = s.charCodeAt(n), o >= 48 && o <= 57); n++) ;
                                                    n == U && q(), U = n
                                                }
                                                return +s.slice(t, U)
                                            }
                                            if (r && q(), "true" == s.slice(U, U + 4)) return U += 4, !0;
                                            if ("false" == s.slice(U, U + 5)) return U += 5, !1;
                                            if ("null" == s.slice(U, U + 4)) return U += 4, null;
                                            q()
                                    }
                                    return "$"
                                }, H = function (e) {
                                    var t, n;
                                    if ("$" == e && q(), "string" == typeof e) {
                                        if ("@" == (I ? e.charAt(0) : e[0])) return e.slice(1);
                                        if ("[" == e) {
                                            for (t = []; e = W(), "]" != e; n || (n = !0)) n && ("," == e ? (e = W(), "]" == e && q()) : q()), "," == e && q(), t.push(H(e));
                                            return t
                                        }
                                        if ("{" == e) {
                                            for (t = {}; e = W(), "}" != e; n || (n = !0)) n && ("," == e ? (e = W(), "}" == e && q()) : q()), "," != e && "string" == typeof e && "@" == (I ? e.charAt(0) : e[0]) && ":" == W() || q(), t[e.slice(1)] = H(W());
                                            return t
                                        }
                                        q()
                                    }
                                    return e
                                }, J = function (e, t, n) {
                                    var r = $(e, t, n);
                                    r === y ? delete e[t] : e[t] = r
                                }, $ = function (e, t, n) {
                                    var r, o = e[t];
                                    if ("object" == typeof o && o) if (v.call(o) == C) for (r = o.length; r--;) J(o, r, n); else g(o, function (e) {
                                        J(o, e, n)
                                    });
                                    return n.call(e, t, o)
                                };
                            t.parse = function (e, t) {
                                var n, r;
                                return U = 0, D = "" + e, n = H(W()), "$" != W() && q(), U = D = null, t && v.call(t) == T ? $((r = {}, r[""] = n, r), "", t) : n
                            }
                        }
                    }
                    return t.runInContext = s, t
                }

                var i = n(203), a = {"function": !0, object: !0}, c = a[typeof t] && t && !t.nodeType && t,
                    u = a[typeof window] && window || this,
                    l = c && a[typeof e] && e && !e.nodeType && "object" == typeof o && o;
                if (!l || l.global !== l && l.window !== l && l.self !== l || (u = l), c && !i) s(u, c); else {
                    var m = u.JSON, d = u.JSON3, f = !1, p = s(u, u.JSON3 = {
                        noConflict: function () {
                            return f || (f = !0, u.JSON = m, u.JSON3 = d, m = d = null), p
                        }
                    });
                    u.JSON = {parse: p.parse, stringify: p.stringify}
                }
                i && (r = function () {
                    return p
                }.call(t, n, t, e), !(void 0 !== r && (e.exports = r)))
            }).call(this)
        }).call(t, n(57)(e), function () {
            return this
        }())
    }, function (e, t, n) {
        var r = n(198), o = n(192), s = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        };
        e.exports = function (e) {
            if (!e) return {};
            var t = {};
            return o(r(e).split("\n"), function (e) {
                var n = e.indexOf(":"), o = r(e.slice(0, n)).toLowerCase(), i = r(e.slice(n + 1));
                "undefined" == typeof t[o] ? t[o] = i : s(t[o]) ? t[o].push(i) : t[o] = [t[o], i]
            }), t
        }
    }, , , function (e, t) {
        function n(e) {
            return e.replace(/^\s*|\s*$/g, "")
        }

        t = e.exports = n, t.left = function (e) {
            return e.replace(/^\s*/, "")
        }, t.right = function (e) {
            return e.replace(/\s*$/, "")
        }
    }, function (e, t, n) {
        var r;
        !function (t) {
            "use strict";

            function o() {
            }

            function s(e, t) {
                for (var n = e.length; n--;) if (e[n].listener === t) return n;
                return -1
            }

            function i(e) {
                return function () {
                    return this[e].apply(this, arguments)
                }
            }

            function a(e) {
                return "function" == typeof e || e instanceof RegExp || !(!e || "object" != typeof e) && a(e.listener)
            }

            var c = o.prototype, u = t.EventEmitter;
            c.getListeners = function (e) {
                var t, n, r = this._getEvents();
                if (e instanceof RegExp) {
                    t = {};
                    for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
                } else t = r[e] || (r[e] = []);
                return t
            }, c.flattenListeners = function (e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
                return n
            }, c.getListenersAsObject = function (e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && (t = {}, t[e] = n), t || n
            }, c.addListener = function (e, t) {
                if (!a(t)) throw new TypeError("listener must be a function");
                var n, r = this.getListenersAsObject(e), o = "object" == typeof t;
                for (n in r) r.hasOwnProperty(n) && s(r[n], t) === -1 && r[n].push(o ? t : {listener: t, once: !1});
                return this
            }, c.on = i("addListener"), c.addOnceListener = function (e, t) {
                return this.addListener(e, {listener: t, once: !0})
            }, c.once = i("addOnceListener"), c.defineEvent = function (e) {
                return this.getListeners(e), this
            }, c.defineEvents = function (e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, c.removeListener = function (e, t) {
                var n, r, o = this.getListenersAsObject(e);
                for (r in o) o.hasOwnProperty(r) && (n = s(o[r], t), n !== -1 && o[r].splice(n, 1));
                return this
            }, c.off = i("removeListener"), c.addListeners = function (e, t) {
                return this.manipulateListeners(!1, e, t)
            }, c.removeListeners = function (e, t) {
                return this.manipulateListeners(!0, e, t)
            }, c.manipulateListeners = function (e, t, n) {
                var r, o, s = e ? this.removeListener : this.addListener,
                    i = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp) for (r = n.length; r--;) s.call(this, t, n[r]); else for (r in t) t.hasOwnProperty(r) && (o = t[r]) && ("function" == typeof o ? s.call(this, r, o) : i.call(this, r, o));
                return this
            }, c.removeEvent = function (e) {
                var t, n = typeof e, r = this._getEvents();
                if ("string" === n) delete r[e]; else if (e instanceof RegExp) for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t]; else delete this._events;
                return this
            }, c.removeAllListeners = i("removeEvent"), c.emitEvent = function (e, t) {
                var n, r, o, s, i, a = this.getListenersAsObject(e);
                for (s in a) if (a.hasOwnProperty(s)) for (n = a[s].slice(0), o = 0; o < n.length; o++) r = n[o], r.once === !0 && this.removeListener(e, r.listener), i = r.listener.apply(this, t || []), i === this._getOnceReturnValue() && this.removeListener(e, r.listener);
                return this
            }, c.trigger = i("emitEvent"), c.emit = function (e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }, c.setOnceReturnValue = function (e) {
                return this._onceReturnValue = e, this
            }, c._getOnceReturnValue = function () {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            }, c._getEvents = function () {
                return this._events || (this._events = {})
            }, o.noConflict = function () {
                return t.EventEmitter = u, o
            }, r = function () {
                return o
            }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
        }(this || {})
    }, function (e, t, n) {
        var r, o, s;
        !function (n, i) {
            "use strict";
            o = [], r = i, s = "function" == typeof r ? r.apply(t, o) : r, !(void 0 !== s && (e.exports = s))
        }(this, function (e) {
            "use strict";
            return function (t) {
                function n() {
                    t.arrayAccessForm = t.arrayAccessForm || "none", t.emptyNodeForm = t.emptyNodeForm || "text", t.attributeConverters = t.attributeConverters || [], t.datetimeAccessFormPaths = t.datetimeAccessFormPaths || [], t.arrayAccessFormPaths = t.arrayAccessFormPaths || [], void 0 === t.enableToStringFunc && (t.enableToStringFunc = !0), void 0 === t.skipEmptyTextNodesForObj && (t.skipEmptyTextNodesForObj = !0), void 0 === t.stripWhitespaces && (t.stripWhitespaces = !0), void 0 === t.useDoubleQuotes && (t.useDoubleQuotes = !0), void 0 === t.ignoreRoot && (t.ignoreRoot = !1), void 0 === t.escapeMode && (t.escapeMode = !0), void 0 === t.attributePrefix && (t.attributePrefix = "_"), void 0 === t.selfClosingElements && (t.selfClosingElements = !0), void 0 === t.keepCData && (t.keepCData = !1)
                }

                function r() {
                    function e(e) {
                        var t = String(e);
                        return 1 === t.length && (t = "0" + t), t
                    }

                    "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
                        return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "")
                    }), "function" != typeof Date.prototype.toISOString && (Date.prototype.toISOString = function () {
                        var t = 1e3;
                        return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / t).toFixed(3)).slice(2, 5) + "Z"
                    })
                }

                function o(e) {
                    var t = e.localName;
                    return null == t && (t = e.baseName), null != t && "" !== t || (t = e.nodeName), t
                }

                function s(e) {
                    return e.prefix
                }

                function i(e) {
                    return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : e
                }

                function a(e) {
                    return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&")
                }

                function c(e, n, r) {
                    switch (t.arrayAccessForm) {
                        case"property":
                            e[n] instanceof Array ? e[n + "_asArray"] = e[n] : e[n + "_asArray"] = [e[n]]
                    }
                    if (!(e[n] instanceof Array) && t.arrayAccessFormPaths.length > 0) {
                        for (var o = !1, s = 0; s < t.arrayAccessFormPaths.length; s++) {
                            var i = t.arrayAccessFormPaths[s];
                            if ("string" == typeof i) {
                                if (i === r) {
                                    o = !0;
                                    break
                                }
                            } else if (i instanceof RegExp) {
                                if (i.test(r)) {
                                    o = !0;
                                    break
                                }
                            } else if ("function" == typeof i && i(n, r)) {
                                o = !0;
                                break
                            }
                        }
                        o && (e[n] = [e[n]])
                    }
                }

                function u(e) {
                    var t = 60, n = e.split(/[-T:+Z]/g), r = new Date(n[0], n[1] - 1, n[2]), o = n[5].split(".");
                    if (r.setHours(n[3], n[4], o[0]), o.length > 1 && r.setMilliseconds(o[1]), n[6] && n[7]) {
                        var s = n[6] * t + Number(n[7]), i = /\d\d-\d\d:\d\d$/.test(e) ? "-" : "+";
                        s = 0 + ("-" === i ? -1 * s : s), r.setMinutes(r.getMinutes() - s - r.getTimezoneOffset())
                    } else e.indexOf("Z", e.length - 1) !== -1 && (r = new Date(Date.UTC(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds(), r.getMilliseconds())));
                    return r
                }

                function l(e, n, r) {
                    if (t.datetimeAccessFormPaths.length > 0) for (var o = r.split(".#")[0], s = 0; s < t.datetimeAccessFormPaths.length; s++) {
                        var i = t.datetimeAccessFormPaths[s];
                        if ("string" == typeof i) {
                            if (i === o) return u(e)
                        } else if (i instanceof RegExp) {
                            if (i.test(o)) return u(e)
                        } else if ("function" == typeof i && i(o)) return u(e)
                    }
                    return e
                }

                function m(e) {
                    for (var n = {}, r = e.childNodes, s = 0; s < r.length; s++) {
                        var i = r.item(s);
                        if (i.nodeType === I.ELEMENT_NODE) {
                            var a = o(i);
                            t.ignoreRoot ? n = f(i, a) : n[a] = f(i, a)
                        }
                    }
                    return n
                }

                function d(e, n) {
                    var r = {};
                    r.__cnt = 0;
                    for (var i = e.childNodes, u = 0; u < i.length; u++) {
                        var m = i.item(u), d = o(m);
                        m.nodeType !== I.COMMENT_NODE && (r.__cnt++, null == r[d] ? (r[d] = f(m, n + "." + d), c(r, d, n + "." + d)) : (r[d] instanceof Array || (r[d] = [r[d]], c(r, d, n + "." + d)), r[d][r[d].length] = f(m, n + "." + d)))
                    }
                    for (var p = 0; p < e.attributes.length; p++) {
                        var g = e.attributes.item(p);
                        r.__cnt++;
                        for (var y = g.value, h = 0; h < t.attributeConverters.length; h++) {
                            var v = t.attributeConverters[h];
                            v.test.call(null, g.name, g.value) && (y = v.convert.call(null, g.name, g.value))
                        }
                        r[t.attributePrefix + g.name] = y
                    }
                    var b = s(e);
                    return b && (r.__cnt++, r.__prefix = b), r["#text"] && (r.__text = r["#text"], r.__text instanceof Array && (r.__text = r.__text.join("\n")), t.escapeMode && (r.__text = a(r.__text)), t.stripWhitespaces && (r.__text = r.__text.trim()), delete r["#text"], "property" === t.arrayAccessForm && delete r["#text_asArray"], r.__text = l(r.__text, "#text", n + ".#text")), r.hasOwnProperty("#cdata-section") && (r.__cdata = r["#cdata-section"], delete r["#cdata-section"], "property" === t.arrayAccessForm && delete r["#cdata-section_asArray"]), 1 === r.__cnt && r.__text ? r = r.__text : 0 === r.__cnt && "text" === t.emptyNodeForm ? r = "" : r.__cnt > 1 && void 0 !== r.__text && t.skipEmptyTextNodesForObj && (t.stripWhitespaces && "" === r.__text || "" === r.__text.trim()) && delete r.__text, delete r.__cnt, t.keepCData || r.hasOwnProperty("__text") || !r.hasOwnProperty("__cdata") ? (t.enableToStringFunc && (r.__text || r.__cdata) && (r.toString = function () {
                        return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "")
                    }), r) : r.__cdata ? r.__cdata : ""
                }

                function f(e, t) {
                    return e.nodeType === I.DOCUMENT_NODE ? m(e) : e.nodeType === I.ELEMENT_NODE ? d(e, t) : e.nodeType === I.TEXT_NODE || e.nodeType === I.CDATA_SECTION_NODE ? e.nodeValue : null
                }

                function p(e, n, r, o) {
                    var s = "<" + (e && e.__prefix ? e.__prefix + ":" : "") + n;
                    if (r) for (var a = 0; a < r.length; a++) {
                        var c = r[a], u = e[c];
                        t.escapeMode && (u = i(u)), s += " " + c.substr(t.attributePrefix.length) + "=", s += t.useDoubleQuotes ? '"' + u + '"' : "'" + u + "'"
                    }
                    return s += o ? " />" : ">"
                }

                function g(e, t) {
                    return "</" + (e && e.__prefix ? e.__prefix + ":" : "") + t + ">"
                }

                function y(e, t) {
                    return e.indexOf(t, e.length - t.length) !== -1
                }

                function h(e, n) {
                    return !!("property" === t.arrayAccessForm && y(n.toString(), "_asArray") || 0 === n.toString().indexOf(t.attributePrefix) || 0 === n.toString().indexOf("__") || e[n] instanceof Function)
                }

                function v(e) {
                    var t = 0;
                    if (e instanceof Object) for (var n in e) h(e, n) || t++;
                    return t
                }

                function b(e) {
                    var n = [];
                    if (e instanceof Object) for (var r in e) r.toString().indexOf("__") === -1 && 0 === r.toString().indexOf(t.attributePrefix) && n.push(r);
                    return n
                }

                function M(e) {
                    var n = "";
                    return e.__cdata && (n += "<![CDATA[" + e.__cdata + "]]>"), e.__text && (n += t.escapeMode ? i(e.__text) : e.__text), n
                }

                function T(e) {
                    var n = "";
                    return e instanceof Object ? n += M(e) : null !== e && (n += t.escapeMode ? i(e) : e), n
                }

                function k(e, t, n) {
                    var r = "";
                    if (0 === e.length) r += p(e, t, n, !0); else for (var o = 0; o < e.length; o++) r += S(e[o], t, b(e[o]));
                    return r
                }

                function S(e, n, r) {
                    var o = "";
                    if (void 0 !== e && null !== e && "" !== e || !t.selfClosingElements) if ("object" == typeof e) if ("[object Array]" === Object.prototype.toString.call(e)) o += k(e, n, r); else if (e instanceof Date) o += p(e, n, r, !1), o += e.toISOString(), o += g(e, n); else {
                        var s = v(e);
                        s > 0 || e.__text || e.__cdata ? (o += p(e, n, r, !1), o += w(e), o += g(e, n)) : t.selfClosingElements ? o += p(e, n, r, !0) : (o += p(e, n, r, !1), o += g(e, n))
                    } else o += p(e, n, r, !1), o += T(e), o += g(e, n); else o += p(e, n, r, !0);
                    return o
                }

                function w(e) {
                    var t = "", n = v(e);
                    if (n > 0) for (var r in e) if (!h(e, r)) {
                        var o = e[r], s = b(o);
                        t += S(o, r, s)
                    }
                    return t += T(e)
                }

                function C(t) {
                    if (void 0 === t) return null;
                    if ("string" != typeof t) return null;
                    var n = null, r = null;
                    if (e) n = new e, r = n.parseFromString(t, "text/xml"); else if (window && window.DOMParser) {
                        n = new window.DOMParser;
                        var o = null, s = window.ActiveXObject || "ActiveXObject" in window;
                        if (!s) try {
                            o = n.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI
                        } catch (i) {
                            o = null
                        }
                        try {
                            r = n.parseFromString(t, "text/xml"), null !== o && r.getElementsByTagNameNS(o, "parsererror").length > 0 && (r = null)
                        } catch (i) {
                            r = null
                        }
                    } else 0 === t.indexOf("<?") && (t = t.substr(t.indexOf("?>") + 2)), r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(t);
                    return r
                }

                var O = "3.1.1";
                t = t || {}, n(), r();
                var I = {ELEMENT_NODE: 1, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, COMMENT_NODE: 8, DOCUMENT_NODE: 9};
                this.asArray = function (e) {
                    return void 0 === e || null === e ? [] : e instanceof Array ? e : [e]
                }, this.toXmlDateTime = function (e) {
                    return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null
                }, this.asDateTime = function (e) {
                    return "string" == typeof e ? u(e) : e
                }, this.xml2dom = function (e) {
                    return C(e)
                }, this.dom2js = function (e) {
                    return f(e, null)
                }, this.js2dom = function (e) {
                    var t = this.js2xml(e);
                    return C(t)
                }, this.xml2js = function (e) {
                    var t = C(e);
                    return null != t ? this.dom2js(t) : null
                }, this.js2xml = function (e) {
                    return w(e)
                }, this.getVersion = function () {
                    return O
                }
            }
        })
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < e.length; n++) t(e[n])
        }

        function o(e) {
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function s(e, t, n) {
            var r = e;
            return m(t) ? (n = t, "string" == typeof e && (r = {uri: e})) : r = f(t, {uri: e}), r.callback = n, r
        }

        function i(e, t, n) {
            return t = s(e, t, n), a(t)
        }

        function a(e) {
            function t() {
                4 === l.readyState && setTimeout(s, 0)
            }

            function n() {
                var e = void 0;
                if (e = l.response ? l.response : l.responseText || c(l), M) try {
                    e = JSON.parse(e)
                } catch (t) {
                }
                return e
            }

            function r(e) {
                return clearTimeout(p), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))), e.statusCode = 0, u(e, T)
            }

            function s() {
                if (!f) {
                    var t;
                    clearTimeout(p), t = e.useXDR && void 0 === l.status ? 200 : 1223 === l.status ? 204 : l.status;
                    var r = T, o = null;
                    return 0 !== t ? (r = {
                        body: n(),
                        statusCode: t,
                        method: y,
                        headers: {},
                        url: g,
                        rawRequest: l
                    }, l.getAllResponseHeaders && (r.headers = d(l.getAllResponseHeaders()))) : o = new Error("Internal XMLHttpRequest Error"), u(o, r, r.body)
                }
            }

            if ("undefined" == typeof e.callback) throw new Error("callback argument missing");
            var a = !1, u = function (t, n, r) {
                a || (a = !0, e.callback(t, n, r))
            }, l = e.xhr || null;
            l || (l = e.cors || e.useXDR ? new i.XDomainRequest : new i.XMLHttpRequest);
            var m, f, p, g = l.url = e.uri || e.url, y = l.method = e.method || "GET", h = e.body || e.data,
                v = l.headers = e.headers || {}, b = !!e.sync, M = !1,
                T = {body: void 0, headers: {}, statusCode: 0, method: y, url: g, rawRequest: l};
            if ("json" in e && e.json !== !1 && (M = !0, v.accept || v.Accept || (v.Accept = "application/json"), "GET" !== y && "HEAD" !== y && (v["content-type"] || v["Content-Type"] || (v["Content-Type"] = "application/json"), h = JSON.stringify(e.json === !0 ? h : e.json))), l.onreadystatechange = t, l.onload = s, l.onerror = r, l.onprogress = function () {
                }, l.onabort = function () {
                    f = !0
                }, l.ontimeout = r, l.open(y, g, !b, e.username, e.password), b || (l.withCredentials = !!e.withCredentials), !b && e.timeout > 0 && (p = setTimeout(function () {
                    if (!f) {
                        f = !0, l.abort("timeout");
                        var e = new Error("XMLHttpRequest timeout");
                        e.code = "ETIMEDOUT", r(e)
                    }
                }, e.timeout)), l.setRequestHeader) for (m in v) v.hasOwnProperty(m) && l.setRequestHeader(m, v[m]); else if (e.headers && !o(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
            return "responseType" in e && (l.responseType = e.responseType), "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(l), l.send(h || null), l
        }

        function c(e) {
            try {
                if ("document" === e.responseType) return e.responseXML;
                var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
                if ("" === e.responseType && !t) return e.responseXML
            } catch (n) {
            }
            return null
        }

        function u() {
        }

        var l = n(193), m = n(138), d = n(195), f = n(202);
        e.exports = i, i.XMLHttpRequest = l.XMLHttpRequest || u, i.XDomainRequest = "withCredentials" in new i.XMLHttpRequest ? i.XMLHttpRequest : l.XDomainRequest, r(["get", "put", "post", "patch", "head", "delete"], function (e) {
            i["delete" === e ? "del" : e] = function (t, n, r) {
                return n = s(t, n, r), n.method = e.toUpperCase(), a(n)
            }
        })
    }, function (e, t) {
        function n() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) r.call(n, o) && (e[o] = n[o])
            }
            return e
        }

        e.exports = n;
        var r = Object.prototype.hasOwnProperty
    }, function (e, t) {
        (function (t) {
            e.exports = t
        }).call(t, {})
    }, , , , function (e, t, n) {
        "use strict";
        var r = n(113), o = n(141);
        o(r), e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(28), o = n(141);
        o(r), e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = r.undef, s = r.verifyOptions, i = r.verifyParamType, a = n(142), c = n(113).fn;
        c.updateMyChatroomMemberInfo = function (e) {
            s(e, "member needNotify", "member::updateMyChatroomMemberInfo"), i("needNotify", e.needNotify, "boolean", "member::updateMyChatroomMemberInfo"), e.needSave = e.needSave || !1, i("needSave", e.needSave, "boolean", "member::updateMyChatroomMemberInfo"), this.processCustom(e), this.processCallback(e), e.chatroomMember = new a(e.member), this.sendCmd("updateMyChatroomMemberInfo", e)
        }, c.getChatroomMembers = function (e) {
            var t = this;
            s(e, "guest", "member::getChatroomMembers"), i("guest", e.guest, "boolean", "member::getChatroomMembers"), o(e.time) ? e.time = 0 : i("time", e.time, "number", "member::getChatroomMembers"), o(e.limit) ? e.limit = 100 : i("limit", e.limit, "number", "member::getChatroomMembers"), t.processCallback(e), e.type = e.guest ? 1 : 0, !e.guest && e.onlyOnline && (e.type = 2), t.sendCmd("getChatroomMembers", e)
        }, c.getChatroomMembersInfo = function (e) {
            var t = this;
            s(e, "accounts", "member::getChatroomMembersInfo"), i("accounts", e.accounts, "array", "member::getChatroomMembersInfo"), t.processCallback(e), t.sendCmd("getChatroomMembersInfo", e)
        }, c.markChatroomManager = function (e) {
            e.type = 1, this.markChatroomMember(e)
        }, c.markChatroomCommonMember = function (e) {
            e.type = 2, this.markChatroomMember(e)
        }, c.markChatroomBlacklist = function (e) {
            e.type = -1, this.markChatroomMember(e)
        }, c.markChatroomGaglist = function (e) {
            e.type = -2, this.markChatroomMember(e)
        }, c.markChatroomMember = function (e) {
            s(e, "account type isAdd", "member::markChatroomMember"), i("isAdd", e.isAdd, "boolean", "member::markChatroomMember"), o(e.level) ? e.level = 0 : i("level", e.level, "number", "member::markChatroomMember");
            var t = this;
            t.processCustom(e), t.processCallback(e), t.sendCmd("markChatroomMember", e)
        }, c.kickChatroomMember = function (e) {
            var t = this;
            s(e, "account", "member::kickChatroomMember"), t.processCustom(e), t.processCallback(e), t.sendCmd("kickChatroomMember", e)
        }, c.updateChatroomMemberTempMute = function (e) {
            var t = this;
            s(e, "account duration needNotify", "member::updateChatroomMemberTempMute"), i("duration", e.duration, "number", "member::updateChatroomMemberTempMute"), i("needNotify", e.needNotify, "boolean", "member::updateChatroomMemberTempMute"), t.processCustom(e), t.processCallback(e), t.sendCmd("updateChatroomMemberTempMute", e)
        }, c.getRobotList = function (e) {
            var t = this;
            o(e.timetag) && (e.timetag = 0), t.processCallback(e), t.sendCmd("syncRobot", e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = r.undef, s = n(113).fn;
        s.beforeSendMsg = function (e) {
            e.cmd = "sendMsg"
        };
        var i = {
            text: 0,
            image: 1,
            audio: 2,
            video: 3,
            geo: 4,
            notification: 5,
            file: 6,
            tip: 10,
            robot: 11,
            custom: 100
        };
        s.getHistoryMsgs = function (e) {
            r.verifyOptions(e), o(e.timetag) ? e.timetag = 0 : r.verifyParamType("timetag", e.timetag, "number", "msg::getHistoryMsgs"), o(e.limit) ? e.limit = 100 : r.verifyParamType("limit", e.limit, "number", "msg::getHistoryMsgs"), o(e.reverse) ? e.reverse = !1 : r.verifyParamType("reverse", e.reverse, "boolean", "msg::getHistoryMsgs"), o(e.msgTypes) ? e.msgTypes = [] : Array.isArray(e.msgTypes) ? (e.msgTypes = e.msgTypes.map(function (e) {
                return i[e]
            }), e.msgTypes = e.msgTypes.filter(function (e) {
                return "number" == typeof e
            })) : "number" == typeof i[e.msgTypes] ? e.msgTypes = [i[e.msgTypes]] : e.msgTypes = [];
            var t = this;
            t.processCallback(e), t.sendCmd("getHistoryMsgs", e, function (t, n, r) {
                Array.isArray(r) && (r = r.map(function (e) {
                    return i[e.type] && (e.type = i[e.type]), e
                })), e.callback(t, n, r)
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(113).fn, o = n(1);
        r.queueOffer = function (e) {
            o.verifyOptions(e, "elementKey elementValue", "msg::queueOffer"), e["transient"] ? e["transient"] = !0 : e["transient"] = !1, this.processCallback(e), this.sendCmd("queueOffer", e, e.callback)
        }, r.queuePoll = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.elementKey = e.elementKey || "", this.processCallback(e), this.sendCmd("queuePoll", e, e.callback)
        }, r.queueList = function (e) {
            this.processCallback(e), this.sendCmd("queueList", e, e.callback)
        }, r.peak = function (e) {
            this.processCallback(e), this.sendCmd("peak", e, e.callback)
        }, r.queueDrop = function (e) {
            this.processCallback(e), this.sendCmd("queueDrop", e, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1);
        r.audioToText = function (e) {
            o.verifyOptions(e, "url", "audio::audioToText"), e.audioToText = o.filterObj(e, "url");
            var t = this;
            t.processCallback(e), t.sendCmd("audioToText", e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1);
        r.getChatroomAddress = function (e) {
            o.verifyOptions(e, "chatroomId", "chatroom::getChatroomAddress");
            var t = this;
            t.processCallback(e), t.sendCmd("getChatroomAddress", e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1);
        r.kick = function (e) {
            o.verifyOptions(e, "deviceIds", "link::kick"), this.processCallback(e), this.sendCmd("kick", {deviceIds: e.deviceIds.slice(0)}, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn;
        r.clearDB = function (e) {
            var t = this, n = t.db;
            t.processCallback(e);
            var r = e.done;
            n.enable ? n.clear().then(r, r) : r()
        }, r.removeDB = function (e) {
            var t = this, n = t.db;
            t.processCallback(e);
            var r = e.done;
            n.enable ? n.destroy().then(r, r) : r()
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            return "object" === ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) && (e.msgEventSubscribes ? e = e.msgEventSubscribes : e.msgEventSubscribe ? e = e.msgEventSubscribe : e.accounts ? e = e.accounts : e.msgEvent && (e = e.msgEvent, e.time && (e.time = +e.time)), 1 === e.sync ? e.sync = !0 : 0 === e.sync && (e.sync = !1)), e
        }

        var s = n(15), i = r(s), a = n(5).Promise, c = n(28).fn, u = n(1), l = n(261), m = n(262);
        c.batchSendEventsCmds = function (e, t, n) {
            var r = this, s = 100, i = u.dropArrayDuplicates(t.accounts);
            i = u.reshape2d(i, s);
            var c = [];
            i.forEach(function (n) {
                c.push(new a(function (s, i) {
                    var a = u.simpleClone(t);
                    a.accounts = n, r.sendCmdWithResp(e, a, function (e, t) {
                        e ? i(e) : s(o(t))
                    })
                }))
            }), a.all(c).then(function (e) {
                var t = null;
                if (e.length > 0) if (e[0].msgEventSubscribe) {
                    var r = e[0].msgEventSubscribe;
                    r = o(r);
                    var s = [];
                    e.forEach(function (e) {
                        s = s.concat(e.accounts)
                    }), t = {accounts: s, msgEventSubscribe: r}
                } else t = [], e.forEach(function (e) {
                    t = t.concat(e)
                });
                n(null, t)
            }, function (e) {
                n(e, null)
            })
        }, c.publishEvent = function (e) {
            var t = this, n = new l(e);
            n = n.assembleEvent(), t.processCallback(e), this.sendCmdWithResp("publishEvent", {msgEvent: n}, function (t, n) {
                t || (n = o(n)), e.callback(t, n)
            })
        }, c.subscribeEvent = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::subscribeEvent");
            var n = new m(e);
            u.verifyParamType("accounts", e.accounts, "array", "event::subscribeEvent"), t.processCallback(e), n = n.assembleEvent(), this.batchSendEventsCmds("subscribeEvent", {
                msgEventSubscribe: n,
                accounts: e.accounts
            }, function (t, n) {
                !t && n && (n = {failedAccounts: n}), e.callback(t, n)
            })
        }, c.unSubscribeEventsByAccounts = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::unSubscribeEventsByAccounts"), u.verifyParamType("accounts", e.accounts, "array", "event::unSubscribeEventsByAccounts");
            var n = new m(e);
            n = n.assembleEvent(), t.processCallback(e), this.batchSendEventsCmds("unSubscribeEventsByAccounts", {
                msgEventSubscribe: n,
                accounts: e.accounts
            }, function (t, n) {
                !t && n && (n = {failedAccounts: n}), e.callback(t, n)
            })
        }, c.unSubscribeEventsByType = function (e) {
            var t = this, n = new m(e);
            n = n.assembleEvent(), t.processCallback(e), this.sendCmdWithResp("unSubscribeEventsByType", {msgEventSubscribe: n}, function (t, n) {
                e.callback(t)
            })
        }, c.querySubscribeEventsByAccounts = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::querySubscribeEventsByAccounts"), u.verifyParamType("accounts", e.accounts, "array", "event::querySubscribeEventsByAccounts");
            var n = new m(e);
            n = n.assembleEvent(), t.processCallback(e), this.batchSendEventsCmds("querySubscribeEventsByAccounts", {
                msgEventSubscribe: n,
                accounts: e.accounts
            }, function (t, n) {
                !t && n && (n = {msgEventSubscribes: n}), e.callback(t, n)
            })
        }, c.querySubscribeEventsByType = function (e) {
            var t = this, n = new m(e);
            n = n.assembleEvent(), t.processCallback(e), this.sendCmdWithResp("querySubscribeEventsByType", {msgEventSubscribe: n}, function (t, n) {
                t || (n = {msgEventSubscribes: o(n)}), e.callback(t, n)
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.notundef, i = n(161);
        r.friendRequest = function (e) {
            o.verifyOptions(e, "type account", "friend::friendRequest"), o.verifyParamValid("type", e.type, i.validTypes(), "friend::friendRequest"), this.processPs(e), this.processCallback(e);
            var t = {account: e.account, type: i.getByteFromType(e.type), ps: e.ps};
            s(e.idServer) && (t.idServer = e.idServer), this.sendCmd("friendRequest", t, e.callback)
        }, r.addFriend = function (e) {
            e.type = "addFriend", this.friendRequest(e)
        }, r.applyFriend = function (e) {
            e.type = "applyFriend", this.friendRequest(e)
        }, r.passFriendApply = function (e) {
            o.verifyOptions(e, "idServer", "friend::passFriendApply"), e.type = "passFriendApply", this.friendRequest(e)
        }, r.rejectFriendApply = function (e) {
            o.verifyOptions(e, "idServer", "friend::rejectFriendApply"), e.type = "rejectFriendApply", this.friendRequest(e)
        }, r.deleteFriend = function (e) {
            o.verifyOptions(e, "account", "friend::deleteFriend"), this.processCallback(e), this.sendCmd("deleteFriend", {account: e.account}, e.callback)
        }, r.updateFriend = function (e) {
            this.processCallback(e);
            var t = new i(e);
            this.sendCmd("updateFriend", {friend: t, single: !0}, e.callback)
        }, r.getFriends = function (e) {
            function t() {
                n.sendCmd("getFriends", {timetag: s, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = n.db, s = 0;
            o.verifyOptions(e), n.processCallback(e), r.enable ? r.getFriendsTimetag().then(function (e) {
                s = e, t()
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.isArray, i = n(98);
        r.mergeObjArray = function (e, t, n) {
            return e || (e = []), t ? (s(t) || (t = [t]), t.length ? (n = n || {}, o.mergeObjArray(e, t, n)) : e) : e
        }, r.cutObjArray = function (e, t, n) {
            return e && t ? (s(t) || (t = [t]), t.length ? (n = n || {}, o.cutObjArray(e, t, n)) : e) : e
        }, r.mergeLoginPorts = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "deviceId"})
        }, r.cutLoginPorts = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "deviceId", sortPath: "type"})
        }, r.mergeRelations = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.cutRelations = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "account"})
        }, r.findRelation = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeFriends = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.cutFriends = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "account"})
        }, r.cutFriendsByAccounts = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {account: e}
            });
            return this.cutFriends(e, n)
        }, r.findFriend = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeUsers = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.findUser = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeTeams = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "teamId"})
        }, r.cutTeams = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "teamId"})
        }, r.findTeam = function (e, t) {
            return o.findObjInArray(e, {keyPath: "teamId", value: t})
        }, r.assembleTeamOwner = i.assembleOwner, r.assembleTeamMembers = i.assembleMembers, r.genTeamMemberId = i.genId, r.mergeTeamMembers = function (e, t) {
            return this.mergeObjArray(e, t)
        }, r.cutTeamMembers = function (e, t) {
            return this.cutObjArray(e, t)
        }, r.cutTeamMembersByAccounts = function (e, t, n) {
            s(n) || (n = [n]);
            var r = i.assembleMembers({teamId: t}, n);
            return this.cutTeamMembers(e, r)
        }, r.findTeamMember = function (e, t) {
            return o.findObjInArray(e, {keyPath: "id", value: t})
        }, r.mergeSessions = function (e, t) {
            return this.mergeObjArray(e, t, {sortPath: "updateTime", desc: !0})
        }, r.cutSessions = function (e, t) {
            return this.cutObjArray(e, t)
        }, r.cutSessionsByIds = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {id: e}
            });
            return this.cutSessions(e, n)
        }, r.findSession = function (e, t) {
            return o.findObjInArray(e, {keyPath: "id", value: t})
        }, r.mergeMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "idClient", sortPath: "time"})
        }, r.cutMsgs = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "idClient"})
        }, r.cutMsgsByIdClients = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {idClient: e}
            });
            return this.cutMsgs(e, n)
        }, r.findMsg = function (e, t) {
            return o.findObjInArray(e, {keyPath: "idClient", value: t})
        }, r.mergeSysMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "idServer", desc: !0})
        }, r.cutSysMsgs = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "idServer"})
        }, r.cutSysMsgsByIdServers = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {idServer: e}
            });
            return this.cutSysMsgs(e, n)
        }, r.findSysMsg = function (e, t) {
            return o.findObjInArray(e, {keyPath: "idServer", value: t})
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.undef, i = o.notundef, a = n(63), c = n(102), u = n(103), l = n(27);
        r.beforeSendMsg = function (e) {
            var t = this, n = t.protocol, r = e.msg;
            r.to === t.account && (r.fromDeviceId = a.deviceId), r.userUpdateTime = n.myInfo && n.myInfo.updateTime;
            var o;
            switch (r.getScene()) {
                case"p2p":
                    o = "sendMsg";
                    break;
                case"team":
                    o = "sendTeamMsg"
            }
            e.filter && (o = "sendFilterMsg", r.filter = !0), e.cmd = o
        }, r.afterSendMsg = function (e) {
            var t = e.rtnMsg, n = c.genSessionByMsg(t);
            this.protocol.onUpdateSession(n)
        }, r.beforeForwardMsg = function (e) {
            o.verifyOptions(e, "msg scene to", "msg::beforeForwardMsg"), e.msg.scene = e.scene, e.msg.to = e.to
        }, r.markMsgRead = function (e) {
            var t = this, n = t.protocol;
            return !e || t.db.enable || n.options.autoMarkRead ? void t.logger.warn("api::markMsgRead: 不需要标记消息为已收到 (没有消息, 或者启用了数据库, 或者启用了自动标记已收到)") : void n.markMsgRead(e, !0)
        }, r.sendMsgReceipt = function (e) {
            var t = this;
            if (o.verifyOptions(e), t.processCallback(e), !e.msg) return void e.done();
            var n = "target idClient time";
            o.verifyOptions(e, "msg", "msg::sendMsgReceipt");
            var r = e.msg;
            o.verifyOptions(r, n, !0, "msg.", "msg::sendMsgReceipt"), t.protocol.shouldSendMsgReceipt(r) ? t.sendCmd("sendMsgReceipt", {
                msgReceipt: {
                    to: r.target,
                    idClient: r.idClient,
                    time: r.time
                }
            }, e.callback) : e.done()
        }, r.isMsgRemoteRead = function (e) {
            return this.protocol.isMsgRemoteRead(e)
        }, r.deleteMsg = function (e) {
            var t = this;
            o.verifyOptions(e, "msg", "msg::deleteMsg");
            var n = e.msg;
            if ("team" !== n.scene && "out" !== n.flow || "success" !== n.status || n.from === n.to || n.isLocal) return e.done(l.newParamError("只能删除自己发送给别人的, 并且发送成功的非本地消息", {callFunc: "msg::deleteMsg"}), e);
            o.verifyOptions(n, ["scene", "to", "from", "time", "idClient", "idServer"], !0, "msg.", "msg::deleteMsg"), o.verifyParamValid("msg.scene", n.scene, t.message.validScenes, "msg::deleteMsg");
            var r = o.simpleClone(n);
            this.processPs(r), this.processCallback(e), i(e.opeAccount) ? r.opeAccount = e.opeAccount : s(r.opeAccount) && (r.opeAccount = r.from), "p2p" === r.scene ? r.type = "deleteMsgP2p" : r.type = "deleteMsgTeam", r.deletedIdClient = r.idClient, r.deletedIdServer = r.idServer, r = new u(r), t.sendCmd("deleteMsg", {
                sysMsg: r,
                msg: n
            }, e.callback)
        }, r.getHistoryMsgs = function (e) {
            var t = this;
            o.verifyOptions(e, "scene to", "msg::getHistoryMsgs"), o.verifyParamValid("scene", e.scene, t.message.validScenes, "msg::getHistoryMsgs"), "undefined" == typeof e.beginTime && (e.beginTime = 0), o.verifyParamType("beginTime", e.beginTime, "number", "msg::getHistoryMsgs"), "undefined" == typeof e.endTime && (e.endTime = 0), o.verifyParamType("endTime", e.endTime, "number", "msg::getHistoryMsgs"), "undefined" != typeof e.lastMsgId && null !== e.lastMsgId || (e.lastMsgId = "0"), "undefined" == typeof e.limit && (e.limit = 100), o.verifyParamType("limit", e.limit, "number", "msg::getHistoryMsgs"), o.verifyParamMax("limit", e.limit, 100, "msg::getHistoryMsgs"), i(e.reverse) ? o.verifyParamType("reverse", e.reverse, "boolean", "msg::getHistoryMsgs") : e.reverse = !1, i(e.asc) ? o.verifyParamType("asc", e.asc, "boolean", "msg::getHistoryMsgs") : e.asc = !1, t.processCallback(e), e.asc && (e.cbaop = function (e, t) {
                e || (t.msgs = t.msgs.reverse())
            });
            var n;
            switch (e.scene) {
                case"p2p":
                    n = "getHistoryMsgs";
                    break;
                case"team":
                    n = "getTeamHistoryMsgs"
            }
            var r = {
                scene: e.scene,
                to: e.to,
                beginTime: e.beginTime,
                endTime: e.endTime,
                lastMsgId: e.lastMsgId,
                limit: e.limit,
                reverse: e.reverse
            };
            t.sendCmd(n, r, e.callback)
        }, r.searchHistoryMsgs = function (e) {
            var t = this;
            o.verifyOptions(e, "scene to keyword", "msg::searchHistoryMsgs"), o.verifyParamValid("scene", e.scene, t.message.validScenes, "msg::searchHistoryMsgs"), "undefined" == typeof e.beginTime && (e.beginTime = 0), o.verifyParamType("beginTime", e.beginTime, "number", "msg::searchHistoryMsgs"), "undefined" == typeof e.endTime && (e.endTime = 0), o.verifyParamType("endTime", e.endTime, "number", "msg::searchHistoryMsgs"), "undefined" == typeof e.limit && (e.limit = 100), o.verifyParamType("limit", e.limit, "number", "msg::searchHistoryMsgs"), o.verifyParamMax("limit", e.limit, 100, "msg::searchHistoryMsgs"), i(e.reverse) ? o.verifyParamType("reverse", e.reverse, "boolean", "msg::searchHistoryMsgs") : e.reverse = !1, i(e.asc) ? o.verifyParamType("asc", e.asc, "boolean", "msg::searchHistoryMsgs") : e.asc = !1, t.processCallback(e), e.asc && (e.cbaop = function (e, t) {
                e || (t.msgs = t.msgs.reverse())
            });
            var n;
            switch (e.scene) {
                case"p2p":
                    n = "searchHistoryMsgs";
                    break;
                case"team":
                    n = "searchTeamHistoryMsgs"
            }
            var r = o.filterObj(e, "scene to beginTime endTime keyword limit reverse");
            t.sendCmd(n, r, e.callback)
        }, r.getLocalMsgs = function (e) {
            function t() {
                e.msgs = c, e.done(n, e)
            }

            var n, r = this, a = r.db, c = [];
            o.verifyOptions(e);
            var u = !1;
            i(e.start) && (u = !0, o.verifyParamType("start", e.start, "number", "msg::getLocalMsgs"));
            var l = !1;
            i(e.end) && (l = !0, o.verifyParamType("end", e.end, "number", "msg::getLocalMsgs")), u && l && e.end <= e.start && o.onParamError("参数 end 必须晚于 start"), s(e.limit) && (e.limit = 100), o.verifyParamType("limit", e.limit, "number", "msg::getLocalMsgs"), o.verifyParamMin("limit", e.limit, 1, "msg::getLocalMsgs"), r.processCallback(e), a.enable ? a.getMsgs(e).then(function (e) {
                c = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.getLocalMsgByIdClient = function (e) {
            function t() {
                e.msg = i, e.done(n, e)
            }

            var n, r = this, s = r.db, i = null;
            o.verifyOptions(e, "idClient", "msg::getLocalMsgByIdClient"), r.processCallback(e), s.enable ? s.getMsgByIdClient(e.idClient).then(function (e) {
                e && (i = e), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.getLocalMsgsByIdClients = function (e) {
            function t() {
                e.msgs = i, e.done(n, e)
            }

            var n, r = this, s = r.db, i = [];
            o.verifyOptions(e, "idClients", "msg::getLocalMsgByIdClient"), o.verifyParamType("idClients", e.idClients, "array", "msg::getLocalMsgByIdClient"), r.processCallback(e), s.enable ? s.getMsgsByIdClients(e.idClients).then(function (e) {
                i = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.updateLocalMsg = function (e) {
            function t() {
                e.msg = i, e.done(n, e)
            }

            var n, r = this, s = r.db, i = null;
            if (o.verifyOptions(e, "idClient", "msg::updateLocalMsg"), r.processCallback(e), s.enable) {
                var a = o.filterObj(e, "idClient localCustom");
                s.updateMsg(a).then(function (e) {
                    i = e, t()
                }, function (e) {
                    n = e, t()
                })
            } else t()
        }, r.deleteLocalMsg = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this;
            o.verifyOptions(e, "msg", "msg::deleteLocalMsg");
            var s = e.msg;
            o.verifyOptions(s, "idClient sessionId", !0, "msg.", "msg::deleteLocalMsg"), r.processCallback(e), r.protocol.deleteLocalMsg(s).then(t, function (e) {
                n = e, t()
            })
        }, r.deleteLocalMsgsBySession = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "scene to", "msg::deleteLocalMsgsBySession"), o.verifyParamValid("scene", e.scene, r.message.validScenes, "msg::deleteLocalMsgsBySession"), e.sessionId = e.scene + "-" + e.to,
                r.processCallback(e), s.enable ? s.deleteMsgsBySessionId(e.sessionId).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteAllLocalMsgs = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, o = r.db;
            r.processCallback(e), o.enable && o.deleteAllMsgs().then(function () {
                t()
            }, function (e) {
                n = e, t()
            })
        }
    }, , function (e, t) {
        "use strict"
    }, function (e, t) {
        "use strict"
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(143), s = n(1), i = s.undef;
        r.getPushNotificationMultiportConfig = function () {
            return this.protocol.getPushNotificationMultiportConfig()
        }, r.updatePushNotificationMultiportConfig = function (e) {
            s.verifyOptions(e), i(e.shouldPushNotificationWhenPCOnline) && (e.shouldPushNotificationWhenPCOnline = !0), e.donnop = new o(e), this.processCallback(e), this.sendCmd("updateDonnop", e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1);
        r.markInBlacklist = function (e) {
            o.verifyOptions(e, "account isAdd", "relation::markInBlacklist"), o.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInBlacklist"), this.processCallback(e), this.sendCmd("markInBlacklist", {
                account: e.account,
                isAdd: e.isAdd
            }, e.callback)
        }, r.addToBlacklist = function (e) {
            return e.isAdd = !0, this.markInBlacklist(e)
        }, r.removeFromBlacklist = function (e) {
            return e.isAdd = !1, this.markInBlacklist(e)
        }, r.markInMutelist = function (e) {
            o.verifyOptions(e, "account", "relation::markInMutelist"), o.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInMutelist"), this.processCallback(e), this.sendCmd("markInMutelist", {
                account: e.account,
                isAdd: e.isAdd
            }, e.callback)
        }, r.addToMutelist = function (e) {
            return e.isAdd = !0, this.markInMutelist(e)
        }, r.removeFromMutelist = function (e) {
            return e.isAdd = !1, this.markInMutelist(e)
        }, r.getRelations = function (e) {
            function t() {
                n.sendCmd("getRelations", {timetag: s, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = n.db, s = 0;
            e = o.verifyOptions(e), n.processCallback(e), r.enable ? r.getRelationsTimetag().then(function (e) {
                s = e, t()
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn;
        r.getRobots = function (e) {
            e = e || {}, e.type = "getRobots", this.processCallback(e), this.sendCmd("sync", {sync: {robots: 0}}, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.undef, i = o.notundef;
        r.setCurrSession = function (e) {
            var t = this;
            t.resetSessionUnread(e), t.protocol.setCurrSession(e)
        }, r.resetAllSessionUnread = function () {
            var e = this;
            for (var t in e.protocol.sessionSet) e.protocol.sessionSet[t].unread > 0 && e.resetSessionUnread(t)
        }, r.resetSessionUnread = function (e) {
            var t = this;
            if (t.protocol.resetSessionUnread(e), t.options.syncSessionUnread) {
                var n = t.protocol.findSession(e);
                if (!n) return void t.logger.warn("api::resetSessionUnread: session undefined " + e);
                if (!n.lastMsg) return void t.logger.warn("api::resetSessionUnread: session.lastMsg undefined " + e);
                if (!n.scene || !n.to) return void t.logger.warn("api::resetSessionUnread: session.scene|to undefined " + e);
                var r = n.lastMsg.time;
                if (n && n.ack && n.ack >= r) return void t.logger.warn("api::resetSessionUnread: session ack not needs " + e);
                var o = {scene: "p2p" === n.scene ? 0 : 1, to: n.to, timetag: r};
                t.sendCmd("markSessionAck", o)
            }
        }, r.resetCurrSession = function () {
            this.protocol.setCurrSession("")
        }, r.insertLocalSession = function (e) {
            function t() {
                e.session = r, e.done(n, e)
            }

            var n, r, s = this;
            o.verifyOptions(e, "scene to", "scene::insertLocalSession"), o.verifyParamValid("scene", e.scene, s.message.validScenes, "scene::insertLocalSession"), s.processCallback(e), s.protocol.insertLocalSession(e).then(function (e) {
                r = e, t()
            }, function (e) {
                n = e, t()
            })
        }, r.getLocalSessions = function (e) {
            function t() {
                e.sessions = c, e.done(n, e)
            }

            var n, r = this, a = r.db, c = [];
            o.verifyOptions(e), s(e.limit) && (e.limit = 100), o.verifyParamType("limit", e.limit, "number", "scene::getLocalSessions"), o.verifyParamMax("limit", e.limit, 100, "scene::getLocalSessions"), i(e.reverse) ? o.verifyParamType("reverse", e.reverse, "boolean", "scene::getLocalSessions") : e.reverse = !1, r.processCallback(e), a.enable ? a.getSessions(e).then(function (e) {
                c = e, r.protocol.mergeSessions(c), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.updateLocalSession = function (e) {
            function t() {
                r.protocol.onUpdateSession(i), e.session = i, e.done(n, e)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "id", "scene::updateLocalSession"), r.processCallback(e);
            var i = o.filterObj(e, "id localCustom");
            s.enable ? s.updateSession(i).then(function (e) {
                i = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteLocalSession = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "id", "session::deleteLocalSession"), r.processCallback(e), s.enable ? s.deleteSession(e.id).then(function () {
                r.protocol.deleteLocalSession(e.id), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteSession = function (e) {
            o.verifyOptions(e, "scene to", "session::deleteSession"), this.processCallback(e), e.sessions = [{
                scene: e.scene,
                to: e.to
            }], this.deleteSessions(e)
        }, r.deleteSessions = function (e) {
            o.verifyOptions(e, "sessions", "session::deleteSessions"), o.verifyParamType("sessions", e.sessions, "array", "session::deleteSessions"), e.sessions.forEach(function (e, t) {
                o.verifyOptions(e, "scene to", !0, "sessions[" + t + "].", "session::deleteSessions")
            }), this.processCallback(e), this.sendCmd("deleteSessions", {
                sessions: e.sessions.map(function (e) {
                    return e.scene + "|" + e.to
                })
            }, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(28).fn, s = n(1), i = s.undef, a = s.notundef, c = n(103);
        o.markSysMsgRead = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, o = this, i = o.db, a = r.resolve(), c = o.protocol;
            s.verifyOptions(e, "sysMsgs", "sysmsg::markSysMsgRead");
            var u = e.sysMsgs;
            s.isArray(u) || (u = [u]), i.enable ? a = i.markSysMsgRead(u).then(function (e) {
                u = e, c.onUpdateSysMsg(e)
            }) : (u = u.filter(function (e) {
                return !e.read
            }), u.length && (c.options.autoMarkRead || c.markSysMsgRead(u, !0), u.forEach(function (e) {
                e.read = !0
            }), c.onUpdateSysMsg(u))), a.then(function () {
                return c.reduceSysMsgUnread(u)
            }).then(t, function (e) {
                n = e, t()
            })
        }, o.sendCustomSysMsg = function (e) {
            var t = this;
            s.verifyOptions(e, "scene to content", "sysmsg::sendCustomSysMsg"), s.verifyParamValid("scene", e.scene, t.message.validScenes, "sysmsg::sendCustomSysMsg"), t.processCallback(e), "p2p" === e.scene ? e.type = "customP2p" : e.type = "customTeam", e.sysMsg = new c(e);
            var n = "sendCustomSysMsg";
            return e.filter && (n = "sendFilterCustomSysMsg"), t.sendCmd(n, {
                sysMsg: e.sysMsg,
                single: !0
            }, e.callback), t.formatReturnSysMsg(e.sysMsg)
        }, o.formatReturnSysMsg = function (e) {
            var t = this;
            return e = s.copy(e), t.protocol.completeSysMsg(e), e.status = "sending", e = c.reverse(e)
        }, o.getLocalSysMsgs = function (e) {
            function t() {
                e.sysMsgs = u, e.done(n, e)
            }

            var n, r = this, o = r.db, u = [];
            s.verifyOptions(e), e.category && s.verifyParamValid("category", e.category, c.validCategories, "sysmsg::getLocalSysMsgs"), e.type && s.verifyParamValid("type", e.type, c.validTypes, "sysmsg::getLocalSysMsgs"), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "sysmsg::getLocalSysMsgs"), s.verifyParamMax("limit", e.limit, 100, "sysmsg::getLocalSysMsgs"), a(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "sysmsg::getLocalSysMsgs") : e.reverse = !1, r.processCallback(e), o.enable ? o.getSysMsgs(e).then(function (e) {
                u = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, o.updateLocalSysMsg = function (e) {
            function t() {
                e.sysMsg = i, e.done(n, e)
            }

            var n, r = this, o = r.db, i = null;
            if (s.verifyOptions(e, "idServer", "sysmsg::updateLocalSysMsg"), r.processCallback(e), o.enable) {
                var a = s.filterObj(e, "idServer state localCustom");
                o.updateSysMsg(a).then(function (e) {
                    i = e, t()
                }, function (e) {
                    n = e, t()
                })
            } else t()
        }, o.deleteLocalSysMsg = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, o = r.db;
            s.verifyOptions(e, "idServer", "sysmsg::deleteLocalSysMsg"), r.processCallback(e), o.enable ? o.deleteSysMsg(e.idServer).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, o.deleteAllLocalSysMsgs = function (e) {
            function t() {
                r.protocol.onUpdateSysMsgUnread({}), e.done(n, e)
            }

            var n, r = this, o = r.db;
            r.processCallback(e), o.enable && o.deleteAllSysMsgs().then(function () {
                t()
            }, function (e) {
                n = e, t()
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.undef, i = n(104), a = n(98);
        r.createTeam = function (e) {
            o.verifyOptions(e, "type name", "team::createTeam"), s(e.accounts) ? e.accounts = [] : o.verifyParamType("accounts", e.accounts, "array", "team::createTeam"), e.action = "create", this.processPs(e), this.processCallback(e), e.team = new i(e);
            var t = {team: e.team, accounts: e.accounts.slice(0), ps: e.ps};
            this.sendCmd("createTeam", t, e.callback)
        }, r.updateTeam = function (e) {
            o.verifyOptions(e, "teamId", "team::updateTeam"), e.action = "update", this.processCallback(e), e.team = new i(e), this.sendCmd("updateTeam", {
                team: e.team,
                single: !0
            }, e.callback)
        }, r.addTeamMembers = function (e) {
            o.verifyOptions(e, "teamId accounts", "team::addTeamMembers"), o.verifyParamType("accounts", e.accounts, "array", "team::addTeamMembers"), this.processPs(e), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0), ps: e.ps};
            this.sendCmd("addTeamMembers", t, e.callback)
        }, r.removeTeamMembers = function (e) {
            o.verifyOptions(e, "teamId accounts", "team::removeTeamMembers"), o.verifyParamType("accounts", e.accounts, "array", "team::removeTeamMembers"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("removeTeamMembers", t, e.callback)
        }, r.acceptTeamInvite = function (e) {
            o.verifyOptions(e, "idServer teamId from", "team::acceptTeamInvite"), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from};
            this.sendCmd("acceptTeamInvite", t, e.callback)
        }, r.rejectTeamInvite = function (e) {
            o.verifyOptions(e, "idServer teamId from", "team::rejectTeamInvite"), this.processPs(e), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from, ps: e.ps};
            this.sendCmd("rejectTeamInvite", t, e.callback)
        }, r.applyTeam = function (e) {
            o.verifyOptions(e, "teamId", "team::applyTeam"), this.processPs(e), this.processCallback(e);
            var t = {teamId: e.teamId, ps: e.ps};
            this.sendCmd("applyTeam", t, e.callback)
        }, r.passTeamApply = function (e) {
            o.verifyOptions(e, "idServer teamId from", "team::passTeamApply"), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from};
            this.sendCmd("passTeamApply", t, e.callback)
        }, r.rejectTeamApply = function (e) {
            o.verifyOptions(e, "idServer teamId from", "team::rejectTeamApply"), this.processPs(e), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from, ps: e.ps};
            this.sendCmd("rejectTeamApply", t, e.callback)
        }, r.addTeamManagers = function (e) {
            o.verifyOptions(e, "teamId accounts", "team::addTeamManagers"), o.verifyParamType("accounts", e.accounts, "array", "team::addTeamManagers"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("addTeamManagers", t, e.callback)
        }, r.removeTeamManagers = function (e) {
            o.verifyOptions(e, "teamId accounts", "team::removeTeamManagers"), o.verifyParamType("accounts", e.accounts, "array", "team::removeTeamManagers"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("removeTeamManagers", t, e.callback)
        }, r.updateInfoInTeam = function (e) {
            o.verifyOptions(e, "teamId", "team::updateInfoInTeam"), this.processCallback(e), this.sendCmd("updateInfoInTeam", {
                teamMember: new a(e),
                single: !0
            }, e.callback)
        }, r.updateNickInTeam = function (e) {
            o.verifyOptions(e, "teamId account", "team::updateNickInTeam"), this.processCallback(e), this.sendCmd("updateNickInTeam", {
                teamMember: new a(e),
                single: !0
            }, e.callback)
        }, r.updateMuteStateInTeam = function (e) {
            var t = this;
            o.verifyOptions(e, "teamId account mute", "team::updateMuteStateInTeam"), t.processCallback(e), e.mute = e.mute ? 1 : 0, t.sendCmd("updateMuteStateInTeam", e)
        }, r.getMutedTeamMembers = function (e) {
            var t = this;
            o.verifyOptions(e, "teamId", "team::getMutedTeamMembers"), t.processCallback(e), t.sendCmd("getMutedTeamMembers", e)
        }, r.leaveTeam = function (e) {
            o.verifyOptions(e, "teamId", "team::leaveTeam"), this.processCallback(e);
            var t = {teamId: e.teamId};
            this.sendCmd("leaveTeam", t, e.callback)
        }, r.transferTeam = function (e) {
            o.verifyOptions(e, "teamId account leave", "team::transferTeam"), o.verifyParamType("leave", e.leave, "boolean", "team::transferTeam"), this.processCallback(e);
            var t = {teamId: e.teamId, account: e.account, leave: e.leave};
            this.sendCmd("transferTeam", t, e.callback)
        }, r.dismissTeam = function (e) {
            o.verifyOptions(e, "teamId", "team::dismissTeam"), this.processCallback(e);
            var t = {teamId: e.teamId};
            this.sendCmd("dismissTeam", t, e.callback)
        }, r.getTeam = function (e) {
            function t() {
                r.sendCmd("getTeam", {teamId: e.teamId}, e.callback)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "teamId", "team::getTeam"), r.processCallback(e), e.cbaop = function (e, t) {
                e || r.logger.log("api::getTeam: cbaop " + n, t)
            }, n = e.teamId, s.enable && !e.sync ? s.getTeam(n).then(function (o) {
                o ? (r.logger.log("api::getTeam: db.getTeam " + n, o), e.done(null, o)) : t()
            }, t) : t()
        }, r.getTeams = function (e) {
            function t() {
                n.sendCmd("getTeams", {timetag: s, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = n.db, s = 0;
            o.verifyOptions(e), n.processCallback(e), r.enable ? r.getTeamsTimetag().then(function (e) {
                s = e, t()
            }, t) : t()
        }, r.getTeamMembers = function (e) {
            function t() {
                n.sendCmd("getTeamMembers", {teamId: e.teamId, timetag: r, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = 0;
            o.verifyOptions(e, "teamId", "team::getTeamMembers"), n.processCallback(e), t()
        }, r.notifyForNewTeamMsg = function (e) {
            var t = this;
            o.verifyOptions(e, "teamIds", "team::notifyForNewTeamMsg");
            var n = t.protocol.notifyForNewTeamMsg(e.teamIds);
            n.then(function (t) {
                e.done(null, t)
            }, function (t) {
                e.done(t)
            })
        }, r.getMyTeamMembers = function (e) {
            var t = this;
            o.verifyOptions(e, "teamIds", "team::getMyTeamMembers");
            var n = t.processCallbackPromise(e);
            return t.sendCmd("getMyTeamMembers", e), n
        }, r.getLocalTeams = function (e) {
            function t() {
                e.teams = i, e.done(n, e)
            }

            var n, r = this, s = r.db, i = [];
            o.verifyOptions(e, "teamIds", "team::getLocalTeams"), o.verifyParamType("teamIds", e.teamIds, "array", "team::getLocalTeams"), r.processCallback(e), s.enable ? s.getTeamsByTeamIds(e.teamIds).then(function (e) {
                i = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.getLocalTeamMembers = function (e) {
            function t() {
                e.members = i, e.done(n, e)
            }

            var n, r = this, s = r.db, i = [];
            o.verifyOptions(e, "teamId accounts", "team::getLocalTeamMembers"), o.verifyParamType("accounts", e.accounts, "array", "team::getLocalTeamMembers"), r.processCallback(e), s.enable ? s.getInvalidTeamMembers(e.teamId, e.accounts).then(function (e) {
                i = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteLocalTeam = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "teamId", "team::deleteLocalTeam"), r.processCallback(e), s.enable ? s.deleteTeam(e.teamId).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.muteTeamAll = function (e) {
            var t = this;
            switch (o.verifyOptions(e, "teamId type", "team::muteTeamAll"), e.type) {
                case"none":
                    e.muteType = 0;
                    break;
                case"normal":
                    e.muteType = 1;
                    break;
                case"all":
                    e.muteType = 2;
                    break;
                default:
                    e.muteType = 1
            }
            t.processCallback(e), t.sendCmd("muteTeamAll", e)
        }, r.sendTeamMsgReceipt = function (e) {
            var t = this;
            o.verifyOptions(e, "teamMsgReceipts", "team::sendTeamMsgReceipt"), t.processCallback(e), t.sendCmd("sendTeamMsgReceipt", e)
        }, r.getTeamMsgReads = function (e) {
            var t = this;
            o.verifyOptions(e, "teamMsgReceipts", "team::getTeamMsgReads"), t.processCallback(e), t.sendCmd("getTeamMsgReads", e)
        }, r.getTeamMsgReadAccounts = function (e) {
            var t = this;
            o.verifyOptions(e, "teamMsgReceipt", "team::getTeamMsgReadAccounts"), t.processCallback(e), t.sendCmd("getTeamMsgReadAccounts", e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(28).fn, o = n(1), s = o.objs2accounts, i = n(116);
        r.updateMyInfo = function (e) {
            o.verifyOptions(e), this.processCallback(e), e.user = new i(e), delete e.user.account, this.sendCmd("updateMyInfo", {
                user: e.user,
                single: !0
            }, e.callback)
        }, r.getMyInfo = function (e) {
            var t = this;
            return e = e || {}, e.account = t.account, t.getUser(e)
        }, r.getUser = function (e) {
            function t() {
                r.sendCmd("getUsers", {accounts: [n], single: !0}, e.callback)
            }

            var n, r = this, s = r.db;
            o.verifyOptions(e, "account", "user::getUser"), r.processCallback(e), e.cbaop = function (e, t) {
                if (!e) return t = t[0] || null, r.logger.log("api::getUser: cbaop " + n, t), t
            }, n = e.account, e.sync ? t() : s.enable ? s.getUser(n).then(function (o) {
                o ? (r.logger.log("api::getUser: db.getUser " + n, o), e.done(null, o)) : t()
            }, t) : t()
        }, r.getUsers = function (e) {
            function t() {
                r.sendCmd("getUsers", {accounts: n, single: !0}, e.callback)
            }

            var n, r = this, i = r.db, a = [];
            o.verifyOptions(e, "accounts", "user::getUsers"), o.verifyParamType("accounts", e.accounts, "array", "user::getUsers"), r.processCallback(e), e.cbaop = function (e, t) {
                if (!e) return t = t.concat(a), r.logger.log("api::getUsers: cbaop " + n, t), t
            }, n = o.deduplicate(e.accounts), o.verifyArrayMax("accounts", e.accounts, 150, "user::getUsers"), e.sync ? t() : i.enable ? i.getUsers(n).then(function (o) {
                if (o && o.length === n.length) r.logger.log("api::getUsers: db.getUsers", o), e.done(null, o); else {
                    a = o;
                    var i = s(o), c = [];
                    n.forEach(function (e) {
                        i.indexOf(e) === -1 && c.push(e)
                    }), n = c, t()
                }
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = (s.notundef, "broadcastMsg");
        o.putBroadcastMsg = function (e) {
            var t = this;
            return new r(function (n) {
                function r() {
                    a--, 0 === a && n(o)
                }

                s.isArray(e) || (e = [e]);
                var o = [], a = e.length;
                e.forEach(function (e) {
                    e = s.copy(e), t.put(i, e).then(function (e) {
                        o.push(e[0]), r()
                    }, r)
                })
            })
        }, o.getBroadcastMsgs = function (e) {
            var t = this;
            return e = e || {}, t.getAll(i, e)
        }
    }, function (e, t) {
        "use strict";
        var n = {version: 8}, r = {
            kv: {key: {keyPath: "key"}},
            timetag: {key: {keyPath: "name"}},
            blacklist: {key: {keyPath: "account"}},
            mutelist: {key: {keyPath: "account"}},
            friend: {key: {keyPath: "account"}},
            user: {key: {keyPath: "account"}},
            team: {key: {keyPath: "teamId"}},
            teamMember: {key: {keyPath: "id"}, indexes: {teamId: {unique: !1}, account: {unique: !1}}},
            msg: {
                key: {autoIncrement: !0},
                indexes: {
                    idClient: {unique: !0},
                    sessionId: {unique: !1},
                    time: {unique: !1},
                    type: {unique: !1},
                    sessionType: {unique: !1},
                    status: {unique: !1},
                    sessionTime: {key: ["sessionId", "time"], unique: !1}
                }
            },
            msg1: {
                key: {keyPath: "idClient"},
                indexes: {
                    sessionId: {unique: !1},
                    time: {unique: !1},
                    status: {unique: !1},
                    sessionTime: {key: ["sessionId", "time"], unique: !1}
                }
            },
            broadcastMsg: {key: {keyPath: "broadcastId"}, indexes: {time: {unique: !1}}},
            sysMsg: {
                key: {autoIncrement: !0},
                indexes: {idServer: {unique: !0}, category: {unique: !1}, type: {unique: !1}}
            },
            sysMsgUnread: {key: {keyPath: "type"}},
            session: {key: {keyPath: "id"}, indexes: {updateTime: {unique: !1}}}
        };
        n.keyPath = function (e) {
            return r[e].key.keyPath
        }, n.schema = function () {
            return window._nimForceSyncIM = !0, r
        }, e.exports = n
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = "friend";
        o.mergeFriends = function (e, t, n) {
            var r = this;
            return r.updateAndDelete(i, e, t).then(function () {
                return r.logger.log("db::mergeFriends: updateAndDelete done", e), n && r.updateFriendTimetag(n), [e, t, n]
            })
        }, o.putFriend = function (e) {
            return this.put(i, e)
        }, o.updateFriend = function (e) {
            var t = this;
            e = s.copy(e);
            var n = e.account;
            return this.getOne(i, null, n, {modifyObj: e}).then(function (r) {
                return r ? t.logger.log("db::updateFriend: " + n, e) : t.logger.warn("db::updateFriend: no record " + n), r
            })
        }, o.deleteFriend = function (e) {
            var t = this, n = t.remove(i, e), o = t.deleteUser(e);
            return r.all([n, o])
        }, o.getFriends = function () {
            var e = function (e) {
                return e.valid
            };
            return this.getAll(i, {filter: e})
        }, o.getFriend = function (e) {
            return this.getOne(i, null, e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(50).fn, o = "kv";
        r.setKey = function (e, t) {
            return this.put(o, {key: e, value: t})
        }, r.getKey = function (e) {
            return this.get(o, e).then(function (e) {
                return e && e.value
            })
        }, r.setDonnop = function (e) {
            return this.setKey("donnop", e)
        }, r.getDonnop = function () {
            return this.getKey("donnop")
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = "session", a = "msg1", c = "sessionId", u = "time",
            l = "status", m = "sessionTime";
        o.putMsg = function (e) {
            var t = this;
            return s.isArray(e) || (e = [e]), !e.length || e[0].filter ? r.resolve() : (e = e.filter(function (e) {
                return !e.ignore
            }), t.put(a, e))
        }, o.updateMsg = function (e) {
            var t = this;
            if (!e.filter) {
                var n = e.idClient, r = s.filterObj(e, "resend status idServer time localCustom");
                return t.getOne(a, null, n, {modifyObj: r}).then(function (e) {
                    return e ? t.logger.log("db::updateMsg: " + n, r) : t.logger.warn("db::updateMsg: no record " + n), e
                })
            }
        }, o.getMsgs = function (e) {
            var t = this;
            t.checkDB(), e = e || {};
            var n = u, r = !1, o = !1, i = e.sessionId, c = e.sessionIds;
            s.exist(i) ? (r = !0, n = m) : s.exist(c) && (r = !0, s.isString(c) ? (n = m, i = c) : Array.isArray(c) && (1 === c.length ? (n = m, i = c[0]) : o = !0));
            var l = e.start || 0, d = e.end || 1 / 0, f = l, p = d;
            r && !o && (f = [i, l], p = [i, d]);
            var g = e.desc !== !1, y = e.limit || 100, h = !1, v = !1, b = e.type, M = e.types;
            s.exist(b) ? h = !0 : s.exist(M) && (h = !0, s.isString(M) ? b = M : Array.isArray(M) && (1 === M.length ? b = M[0] : v = !0));
            var T = e.keyword || "", k = e.filterFunc, S = void 0;
            return (o || h || T || s.isFunction(k)) && (S = function (e) {
                if (o && c.indexOf(e.sessionId) === -1) return !1;
                if (h) if (v) {
                    if (M.indexOf(e.type) === -1) return !1
                } else if (b !== e.type) return !1;
                if (T) {
                    var t = e.text || e.tip || "";
                    if (t.indexOf(T) === -1) return !1
                }
                return !k || k(e)
            }), t.server.query(a, n).bound(f, p, !0, !0).desc(g).limit(y).filter(S).execute()
        }, o.getMsgCountAfterAck = function (e) {
            var t = this;
            e = e || {};
            var n = e, o = n.sessionId;
            return t.checkDB(), t.server.query(a, m).bound([o, e.ack], [o, 1 / 0], !0, !0).execute().then(function (t) {
                var n = t.filter(function (t) {
                    return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t))
                });
                return r.resolve(n.length)
            })
        }, o.amendMsg = function (e) {
            return e ? (s.notexist(e.text) && (e.text = ""), e) : null
        }, o.getMsgByIdClient = function (e) {
            var t = this;
            return t.getOne(a, null, e).then(function (e) {
                return t.amendMsg(e)
            })
        }, o.getMsgsByIdClients = function (e) {
            var t, n = this, o = [];
            return e.forEach(function (e) {
                t = n.getMsgByIdClient(e), o.push(t)
            }), r.all(o)
        }, o.clearSendingMsgs = function () {
            var e = this;
            return e.getOnly(a, l, "sending", {modifyObj: {status: "fail"}}).then(function (t) {
                e.logger.log("db::clearSendingMsgs: msgs send failed", t)
            })
        }, o.deleteMsg = function (e) {
            var t, n = this, o = [];
            return s.isArray(e) || (e = [e]), e.forEach(function (e) {
                t = n.getOne(a, null, e, {remove: !0}).then(function (e) {
                    return n.logger.log("db::deleteMsg:", e), e
                }), o.push(t)
            }), 1 === o.length ? o[0] : r.all(o)
        }, o.deleteMsgsBySessionId = function (e) {
            var t = this;
            return t.getOnly(a, c, e, {remove: !0})
        }, o.deleteAllMsgs = function () {
            var e = this, t = e.clearTable(a), n = e.clearTable(i);
            return r.all([t, n])
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = "blacklist", a = "mutelist";
        o.mergeRelations = function (e, t, n, o, s) {
            var c = this, u = c.updateAndDelete(i, e, t), l = c.updateAndDelete(a, n, o);
            return r.all([u, l]).then(function () {
                return c.logger.log("db::mergeRelations: timetag " + s), c.updateRelationTimetag(s), [e, t, n, o, s]
            })
        }, o.getRelations = function () {
            var e = this, t = e.getAll(i), n = e.getAll(a);
            return r.all([t, n])
        }, o.markInBlacklist = function (e) {
            var t = this;
            if (e = s.copy(e), e.isAdd) {
                var n = e.record;
                return t.put(i, n)
            }
            var r = e.account;
            return t.remove(i, r)
        }, o.markInMutelist = function (e) {
            var t = this;
            if (e = s.copy(e), e.isAdd) {
                var n = e.record;
                return t.put(a, n)
            }
            var r = e.account;
            return t.remove(a, r)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(50).fn, o = n(1), s = o.notundef, i = "session", a = "updateTime";
        r.putSession = function (e) {
            return e = o.merge({}, e), delete e.unread, this.modifyOrPut({
                table: i,
                obj: e,
                key: "id",
                modifyObjWhenPut: {unread: 0}
            })
        }, r.getSessions = function (e) {
            e = e || {};
            var t, n = !e.reverse, r = e.limit || 100, o = e.lastSessionId, c = e.sessionId, u = !1;
            if (s(o)) t = function (e) {
                return !!u || (e.id === o && (u = !0), !1)
            }; else if (s(c)) return this.get(i, c);
            return this.getAll(i, {index: a, desc: n, limit: r, filter: t})
        }, r.getSession = function (e) {
            return this.get(i, e)
        }, r.updateSession = function (e) {
            var t = this, n = e.id,
                r = o.filterObj(e, "ack unread lastMsg localCustom msgReceiptTime msgReceiptServerTime");
            return Object.keys(e).forEach(function (t) {
                0 === t.indexOf("last") && (r[t] = e[t])
            }), this.getOne(i, null, n, {modifyObj: r}).then(function (e) {
                return e ? t.logger.log("db::updateSession: " + n, r) : t.logger.warn("db::updateSession: no record " + n), e
            })
        }, r.resetSessionUnread = function (e) {
            return this.updateSession({id: e, unread: 0})
        }, r.deleteSession = function (e) {
            return this.remove(i, e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = s.notundef, a = "sysMsg", c = "idServer", u = "type",
            l = "category", m = "sysMsgUnread";
        o.putSysMsg = function (e) {
            var t = this;
            return new r(function (n) {
                function r() {
                    i--, 0 === i && n(o)
                }

                if (s.isArray(e) || (e = [e]), !e[0].filter) {
                    var o = [], i = e.length;
                    e.forEach(function (e) {
                        e = s.copy(e), t.put(a, e).then(function (e) {
                            o.push(e[0]), r()
                        }, r)
                    })
                }
            })
        }, o.getSysMsgs = function (e) {
            var t = this;
            e = e || {};
            var n = !e.reverse, r = e.limit || 100, o = null, s = null;
            e.category && (o = l, s = e.category), e.type && (o = u, s = e.type);
            var c, m = e.lastIdServer, d = !1, f = e.read;
            return (i(m) || i(f)) && (c = function (e) {
                function t() {
                    return !i(f) || e.read === f
                }

                return i(m) ? (m = "" + m, d ? t() : (e.idServer === m && (d = !0), !1)) : t()
            }), e = {filter: c, desc: n, limit: r}, o ? t.getOnly(a, o, s, e) : t.getAll(a, e)
        }, o.getSysMsgByIdServer = function (e) {
            return this.getOne(a, c, e)
        }, o.updateSysMsg = function (e) {
            var t = this;
            if (!e.filter) {
                var n = "" + e.idServer, r = s.filterObj(e, "read state error localCustom");
                return this.getOne(a, c, n, {modifyObj: r}).then(function (e) {
                    return e ? t.logger.log("db::updateSysMsg: " + n, r) : t.logger.warn("db::updateSession: " + n), e
                })
            }
        }, o.markSysMsgRead = function (e) {
            var t = this;
            return new r(function (n, o) {
                s.isArray(e) || (e = [e]);
                var i, a, c = [], u = [];
                e.forEach(function (e) {
                    i = t.getSysMsgByIdServer(e.idServer).then(function (e) {
                        e && !e.read && (a = t.updateSysMsg({idServer: e.idServer, read: !0}), u.push(a))
                    }, o), c.push(i)
                }), r.all(c).then(function () {
                    r.all(u).then(function (e) {
                        n(e)
                    }, o)
                }, o)
            })
        }, o.deleteSysMsg = function (e) {
            var t, n = this, o = [];
            return s.isArray(e) || (e = [e]), e.forEach(function (e) {
                e = "" + e, t = n.getOne(a, c, e, {remove: !0}), o.push(t)
            }), 1 === o.length ? o[0] : r.all(o)
        }, o.deleteAllSysMsgs = function () {
            var e = this, t = e.clearTable(a), n = e.clearTable(m);
            return r.all([t, n])
        }, o.getSysMsgUnread = function () {
            return this.getAll(m).then(function (e) {
                var t = {};
                return e.forEach(function (e) {
                    t[e.type] = e.num
                }), t
            })
        }, o.updateSysMsgUnread = function (e) {
            var t = this;
            e = s.copy(e);
            var n = [];
            return Object.keys(e).forEach(function (t) {
                n.push({type: t, num: e[t]})
            }), this.put(m, n).then(function () {
                return t.logger.log("db::updateSysMsgUnread: ", e), e
            })
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e.valid && e.validToCurrentUser
        }

        function o(e) {
            return e && e.valid
        }

        function s(e) {
            return e && c.fillUndef(e, {mute: !1, custom: ""}), e
        }

        var i = n(5).Promise, a = n(50).fn, c = n(1), u = n(27), l = n(104), m = n(98), d = "team", f = "teamId",
            p = "account", g = "teamMember";
        a.mergeTeams = function (e, t, n) {
            var r = this, o = r.put(d, e), s = r.leaveTeams(t, n);
            return i.all([o, s]).then(function () {
                return r.logger.log("db::mergeTeams:"), r.updateTeamTimetag(n), [e, t, n]
            })
        }, a.putTeam = function (e) {
            if (e) return c.isArray(e) || (e = [e]), e.forEach(function (e) {
                e.validToCurrentUser = !0
            }), this.put(d, e)
        }, a.updateTeam = function (e) {
            var t = this;
            e = c.copy(e);
            var n = e.teamId;
            return t.getOne(d, null, n, {modifyObj: e}).then(function (r) {
                return r ? (t.logger.log("db::updateTeam: " + n, e), r) : (t.logger.warn("db::updateTeam: no record " + n), t.putTeam(e))
            })
        }, a.transferTeam = function (e, t, n) {
            var r = this, o = e.teamId, s = e.memberUpdateTime,
                i = {teamId: o, account: t, type: "normal", updateTime: s},
                a = {teamId: o, account: n, type: "owner", updateTime: s};
            return r.updateTeamMembers([i, a]).then(function () {
                return r.putTeam(e).then(function () {
                    return r.logger.log("db::transferTeam: " + e.teamId + " " + t + " -> " + n), [e, t, n]
                })
            })
        }, a.leaveTeam = function (e) {
            var t = this;
            return t.updateTeam({teamId: e, validToCurrentUser: !1}).then(function () {
                return t.removeAllTeamMembers(e)
            })
        }, a.dismissTeam = function (e, t) {
            var n = this, r = {teamId: e, valid: !1, validToCurrentUser: !1, updateTime: t};
            return n.updateTeam(r).then(function () {
                return n.removeAllTeamMembers(e)
            })
        }, a.leaveTeams = function (e, t) {
            var n, r = this, o = [];
            return e.forEach(function (e) {
                n = r.leaveTeam(e.teamId, t), o.push(n)
            }), i.all(o)
        }, a.getTeamsByTeamIds = function (e) {
            var t, n = this, r = [];
            return e.forEach(function (e) {
                t = n.getTeam(e), r.push(t)
            }), i.all(r)
        }, a.getTeam = function (e) {
            e = "" + e;
            var t = this;
            return t.getOne(d, null, e).then(function (e) {
                return t.updateTeamProperties([e]), e
            })
        }, a.getTeams = function () {
            var e = this;
            return e.getAll(d, {filter: r}).then(function (t) {
                return e.updateTeamProperties(t), t
            })
        }, a.updateTeamProperties = function (e) {
            e.forEach(function (e) {
                l.fillProperties(e)
            })
        }, a.mergeTeamMembers = function (e, t, n, r) {
            var o = this, s = o.putTeamMembers(t), a = o.updateTeamMembers(n);
            return i.all([s, a]).then(function () {
                return o.logger.log("db::mergeTeamMembers: " + e), o.updateTeamMemberTimetag(e, r)
            })
        }, a.putTeamMembers = function (e) {
            return this.put(g, e)
        }, a.getTeamMembersByAccount = function (e) {
            var t = this;
            return t.getOnly(g, p, e, {filter: o, mapper: s}).then()
        }, a.getTeamMembers = function (e) {
            var t = this;
            e = "" + e;
            var n = function (e) {
                return e.valid
            };
            return t.getOnly(g, f, e, {filter: n, mapper: s}).then(function (e) {
                return t.updateTeamMemberProperties(e).then(function () {
                    return e
                })
            })
        }, a.updateTeamMemberProperties = function (e) {
            var t, n = this, r = [];
            return e.forEach(function (e) {
                m.fillProperties(e) && (t = n.updateTeamMember(e), r.push(t))
            }), i.all(r)
        }, a.getInvalidTeamMembers = function (e, t) {
            var n = this;
            e = "" + e;
            var r, o = [];
            return t.forEach(function (t) {
                r = n.getOne(g, null, m.genId(e, t)).then(function (e) {
                    return s(e)
                }), o.push(r)
            }), i.all(o)
        }, a.updateTeamMember = function (e) {
            var t = this, n = e.teamId, r = e.account, o = m.genId(n, r),
                i = c.filterObj(e, "nickInTeam muteTeam mute custom updateTime type valid");
            return this.getOne(g, null, o, {modifyObj: i, mapper: s}).then(function (e) {
                return e ? t.logger.log("db::updateTeamMember: " + n + " " + r, i) : t.logger.warn("db::updateTeam: no record " + n + " " + r), e
            })
        }, a.updateTeamMembers = function (e) {
            var t = this;
            if (!e.length) return i.resolve();
            var n, r = [];
            return e.forEach(function (e) {
                n = t.updateTeamMember(e), r.push(n)
            }), i.all(r)
        }, a.updateTeamManagers = function (e, t, n, r) {
            var o = t.map(function (t) {
                return {teamId: e, account: t, type: n ? "manager" : "normal", updateTime: r}
            });
            return this.updateTeamMembers(o)
        }, a.removeTeamMembersByAccounts = function (e, t) {
            var n = t.map(function (t) {
                return {teamId: e, account: t, valid: !1}
            });
            return this.updateTeamMembers(n)
        }, a.removeAllTeamMembers = function (e) {
            var t = this, n = {valid: !1};
            return t.getOnly(g, f, e, {modifyObj: n}).then(function () {
                return t.logger.warn("db::removeAllTeamMembers: " + e), t.deleteTeamMemberTimetag(e)
            })
        }, a.deleteTeamMembers = function (e) {
            var t = this;
            return t.getOnly(g, f, e, {remove: !0}).then(function () {
                t.logger.warn("db::deleteTeamMembers: " + e), t.deleteTeamMemberTimetag(e)
            })
        }, a.deleteTeam = function (e) {
            var t, n = this, o = [];
            return c.isArray(e) || (e = [e]), e.forEach(function (e) {
                e = "" + e, t = n.get(d, e).then(function (t) {
                    if (t && r(t)) throw u.stillInTeamError({callFunc: "team::deleteTeam", team: t});
                    var o = n.remove(d, e), s = n.deleteTeamMembers(e);
                    return i.all([o, s])
                }), o.push(t)
            }), 1 === o.length ? o[0] : i.all(o)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(50).fn;
        r.getTimetags = function (e) {
            var t = {}, n = function (e) {
                return e.name.indexOf("team-") !== -1 ? t[e.name] = 0 : t[e.name] = e.value, e
            };
            return this.getAll("timetag", {filter: e, mapper: n}).then(function () {
                return t
            })
        }, r.getTeamMemberTimetags = function () {
            return this.getTimetags(function (e) {
                return e.name.indexOf("team-") !== -1
            })
        }, r.getTimetag = function (e) {
            return this.getOne("timetag", null, e).then(function (e) {
                return e = e || {value: 0}, e.value
            })
        }, r.getTeamMemberTimetag = function (e) {
            return 0
        }, r.updateTimetag = function (e, t) {
            var n = {name: e, value: t};
            return this.put("timetag", n)
        }, r.updateMyInfoTimetag = function (e) {
            return this.updateTimetag("myInfo", e)
        }, r.updateRelationTimetag = function (e) {
            return this.updateTimetag("relations", e)
        }, r.getRelationsTimetag = function () {
            return this.getTimetag("relations")
        }, r.updateFriendTimetag = function (e) {
            return this.updateTimetag("friends", e)
        }, r.getFriendsTimetag = function () {
            return this.getTimetag("friends")
        }, r.updateFriendUserTimetag = function (e) {
            return this.updateTimetag("friendUsers", e)
        }, r.updateTeamTimetag = function (e) {
            return this.updateTimetag("teams", e)
        }, r.getTeamsTimetag = function () {
            return this.getTimetag("teams")
        }, r.updateTeamMemberTimetag = function (e, t) {
            return this.updateTimetag("team-" + e, t)
        }, r.getTeamMembersTimetag = function (e) {
            return this.getTimetag("team-" + e)
        }, r.updateMyTeamMembersTimetag = function (e) {
            return this.updateTimetag("myTeamMembers", e)
        }, r.getBroadcastMsgTimetag = function (e) {
            return this.getTimetag("broadcastMsg")
        }, r.updateBroadcastMsgTimetag = function (e) {
            return this.updateTimetag("broadcastMsg", parseInt(e))
        }, r.updateRoamingMsgTimetag = function (e) {
            return this.updateTimetag("roamingMsgs", e)
        }, r.updateMsgReceiptsTimetag = function (e) {
            return this.updateTimetag("msgReceipts", e)
        }, r.updateDonnopTimetag = function (e) {
            return this.updateTimetag("donnop", e)
        }, r.updateDeleteMsgTimetag = function (e) {
            return this.updateTimetag("deleteMsg", e)
        }, r.updateSessionAck = function (e) {
            return this.updateTimetag("sessionAck", e)
        }, r.deleteTimetag = function (e) {
            return this.remove("timetag", e)
        }, r.deleteTeamMemberTimetag = function (e) {
            return this.deleteTimetag("team-" + e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(50).fn, s = n(1), i = "user";
        o.mergeMyInfo = function (e, t) {
            var n = this;
            return n.put(i, e).then(function () {
                return t ? n.updateMyInfoTimetag(e.updateTime) : e
            })
        }, o.mergeFriendUsers = function (e, t) {
            var n = this;
            return n.putUsers(e).then(function () {
                n.updateFriendUserTimetag(t)
            })
        }, o.putUsers = function (e) {
            return this.put(i, e)
        },
            o.putUser = function (e) {
                return this.put(i, e)
            }, o.updateUser = function (e) {
            var t = this;
            e = s.copy(e);
            var n = e.account;
            return this.getOne(i, null, n, {modifyObj: e}).then(function (r) {
                return r ? t.logger.log("db::updateUser: " + n, e) : t.logger.warn("db::updateUser: no record " + n), r
            })
        }, o.putUsersIfIsFriend = function (e) {
            var t, n = this, o = [], s = [];
            return e.forEach(function (e) {
                t = n.getFriend(e.account).then(function (r) {
                    return r && (t = n.putUser(e), s.push(t)), r
                }), o.push(t)
            }), r.all(o).then(function () {
                return r.all(s).then(function (e) {
                    return e
                })
            })
        }, o.deleteUser = function (e) {
            return this.remove(i, e)
        }, o.getUser = function (e) {
            return this.getOne(i, null, e)
        }, o.getUsers = function (e) {
            function t(t) {
                return e.indexOf(t.account) !== -1
            }

            return this.getAll(i, {filter: t})
        }, o.getAllUsers = function () {
            return this.getAll(i)
        }
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(114), s = n(1);
        r.prototype = Object.create(o.prototype), r.verifyFile = function (e, t) {
            s.verifyOptions(e, "dur", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "content", "msg::CustomMessage"), e.type = "custom", o.call(this, e), "string" != typeof e.content && (e.content = JSON.stringify(e.content)), this.attach = e.content
        }

        var o = n(65), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t.content = e.attach, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            e.type = "geo", s.verifyOptions(e, "geo", "msg::GeoMessage"), s.verifyOptions(e.geo, "lng lat title", !0, "geo.", "msg::GeoMessage"), s.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"), s.verifyParamType("geo.lat", e.geo.lat, "number", "msg::GeoMessage"), s.verifyParamType("geo.title", e.geo.title, "string", "msg::GeoMessage"), o.call(this, e), this.attach = JSON.stringify(e.geo)
        }

        var o = n(65), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1), s = n(114);
        r.prototype = Object.create(s.prototype), r.verifyFile = function (e, t) {
            o.verifyOptions(e, "w h", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = function (e) {
                this.account = e.account
            }, s = o.prototype, i = s.Message = n(65), a = s.TextMessage = n(248), c = s.FileMessage = n(114),
            u = s.GeoMessage = n(243), l = s.NotificationMessage = n(246), m = s.CustomMessage = n(242),
            d = s.TipMessage = n(249), f = s.RobotMessage = n(247);
        s.validTypes = i.validTypes, s.reverse = function (e) {
            var t, n = i.getType(e);
            switch (n) {
                case"text":
                    t = a.reverse(e);
                    break;
                case"image":
                case"audio":
                case"video":
                case"file":
                    t = c.reverse(e);
                    break;
                case"geo":
                    t = u.reverse(e);
                    break;
                case"notification":
                    t = l.reverse(e);
                    break;
                case"custom":
                    t = m.reverse(e);
                    break;
                case"tip":
                    t = d.reverse(e);
                    break;
                case"robot":
                    t = f.reverse(e);
                    break;
                default:
                    t = i.reverse(e)
            }
            return i.setExtra(t, this.account), t
        }, s.reverseMsgs = function (e, t) {
            var n, o, s = this;
            return e.map(function (e) {
                return e = s.reverse(e), t && (n = t.modifyObj, n && (e = r.merge(e, n)), o = t.mapper, r.isFunction(o) && (e = o(e))), e
            })
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1), s = o.notundef, i = n(65), a = {
            301: "memberEnter",
            302: "memberExit",
            303: "blackMember",
            304: "unblackMember",
            305: "gagMember",
            306: "ungagMember",
            307: "addManager",
            308: "removeManager",
            309: "addCommon",
            310: "removeCommon",
            311: "closeChatroom",
            312: "updateChatroom",
            313: "kickMember",
            314: "addTempMute",
            315: "removeTempMute",
            316: "updateMemberInfo",
            317: "updateQueue",
            318: "muteRoom",
            319: "unmuteRoom",
            320: "batchUpdateQueue"
        };
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
                var n = JSON.parse(e.attach);
                if (t.attach = {type: a[n.id]}, s(n.data)) {
                    var r = n.data;
                    if (s(r.operator) && (t.attach.from = r.operator), s(r.opeNick) && (t.attach.fromNick = r.opeNick), s(r.target) && (t.attach.to = r.target), s(r.tarNick) && (t.attach.toNick = r.tarNick), s(r.muteDuration) && (t.attach.duration = parseInt(r.muteDuration, 10)), "memberEnter" === t.attach.type && (s(r.muted) ? t.attach.gaged = 1 === +r.muted : t.attach.gaged = !1, s(r.tempMuted) ? t.attach.tempMuted = 1 === +r.tempMuted : t.attach.tempMuted = !1, s(r.muteTtl) ? t.attach.tempMuteDuration = +r.muteTtl : t.attach.tempMuteDuration = 0), s(r.ext) && (t.attach.custom = r.ext), s(r.queueChange)) {
                        var o = JSON.parse(r.queueChange);
                        switch (o._e) {
                            case"OFFER":
                                t.attach.queueChange = {type: "OFFER", elementKey: o.key, elementValue: o.content};
                                break;
                            case"POLL":
                                t.attach.queueChange = {type: "POLL", elementKey: o.key, elementValue: o.content};
                                break;
                            case"DROP":
                                t.attach.queueChange = {type: "DROP"};
                                break;
                            case"PARTCLEAR":
                                t.attach.queueChange = {type: "PARTCLEAR", elementKv: o.kvObject}
                        }
                    }
                }
            } else t.attach = {};
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "content", "msg::RobotMessage");
            var t = e.content;
            switch (t.type) {
                case"welcome":
                    s.undef(e.body) && (this.body = "欢迎消息");
                    break;
                case"text":
                    s.verifyOptions(t, "content", "msg::RobotMessage"), s.undef(e.body) && (this.body = t.content);
                    break;
                case"link":
                    s.verifyOptions(t, "target", "msg::RobotMessage")
            }
            t.type && (t.type = i[t.type]), t = {
                param: t,
                robotAccid: e.robotAccid
            }, this.attach = JSON.stringify(t), e.type = "robot", o.call(this, e)
        }

        var o = n(65), s = n(1), i = {welcome: "00", text: "01", link: "03"},
            a = {"01": "text", "02": "image", "03": "answer", 11: "template"};
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            if ("robot" === t.type) {
                var n = JSON.parse(e.attach);
                if (n.param && (n.param.type = a[n.param.type] || "unknown"), n.robotMsg) {
                    n = s.merge(n, n.robotMsg);
                    var r = n.message;
                    "bot" === n.flag ? n.message = r.map(function (e) {
                        return e.type = a[e.type] || "unknown", e
                    }) : "faq" === n.flag, delete n.robotMsg
                }
                t.content = n
            }
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "text", "msg::TextMessage"), e.type = "text", o.call(this, e), this.attach = e.text
        }

        var o = n(65), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t.text = e.attach, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "tip", "msg::TipMessage"), e.type = "tip", o.call(this, e), this.attach = e.tip
        }

        var o = n(65), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t.tip = e.attach, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(114), s = n(1);
        r.prototype = Object.create(o.prototype), r.verifyFile = function (e, t) {
            s.verifyOptions(e, "dur w h", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(115), s = n(1);
        r.prototype = Object.create(o.prototype), r.verifyFile = function (e, t) {
            s.verifyOptions(e, "dur", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "content", "msg::CustomMessage"), e.type = "custom", o.call(this, e), this.attach = e.content
        }

        var o = n(66), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t.content = e.attach, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            e.type = "geo", s.verifyOptions(e, "geo", "msg::GeoMessage"), s.verifyOptions(e.geo, "lng lat title", !0, "geo.", "msg::GeoMessage"), s.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"), s.verifyParamType("geo.lat", e.geo.lat, "number", "msg::GeoMessage"), s.verifyParamType("geo.title", e.geo.title, "string", "msg::GeoMessage"), o.call(this, e), this.attach = JSON.stringify(e.geo)
        }

        var o = n(66), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1), s = n(115);
        r.prototype = Object.create(s.prototype), r.verifyFile = function (e, t) {
            o.verifyOptions(e, "w h", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(1), o = function (e) {
                this.account = e.account
            }, s = o.prototype, i = s.Message = n(66), a = s.TextMessage = n(258), c = s.FileMessage = n(115),
            u = s.GeoMessage = n(253), l = s.NotificationMessage = n(256), m = s.CustomMessage = n(252),
            d = s.TipMessage = n(259), f = s.RobotMessage = n(257);
        s.validScenes = i.validScenes, s.validTypes = i.validTypes, s.reverse = function (e) {
            var t, n = i.getType(e);
            switch (n) {
                case"text":
                    t = a.reverse(e);
                    break;
                case"image":
                case"audio":
                case"video":
                case"file":
                    t = c.reverse(e);
                    break;
                case"geo":
                    t = u.reverse(e);
                    break;
                case"notification":
                    t = l.reverse(e);
                    break;
                case"custom":
                    t = m.reverse(e);
                    break;
                case"tip":
                    t = d.reverse(e);
                    break;
                case"robot":
                    t = f.reverse(e);
                    break;
                default:
                    t = i.reverse(e)
            }
            return i.setExtra(t, this.account), t
        }, s.reverseMsgs = function (e, t) {
            var n, o, s = this;
            return e.map(function (e) {
                return e = s.reverse(e), t && (n = t.modifyObj, n && (e = r.merge(e, n)), o = t.mapper, r.isFunction(o) && (e = o(e))), e
            })
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1), s = o.notundef, i = n(66), a = n(97).getInstance("IM"), c = n(104), u = n(116), l = {
            0: "addTeamMembers",
            1: "removeTeamMembers",
            2: "leaveTeam",
            3: "updateTeam",
            4: "dismissTeam",
            5: "passTeamApply",
            6: "transferTeam",
            7: "addTeamManagers",
            8: "removeTeamManagers",
            9: "acceptTeamInvite",
            10: "updateTeamMute",
            101: "netcallMiss",
            102: "netcallBill"
        };
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
                var n = JSON.parse(e.attach);
                if (t.attach = {type: l[n.id] || n.id}, s(n.data)) {
                    var r = n.data;
                    s(r.tinfo) && (t.attach.team = c.reverse(a.unserialize(r.tinfo, "team"), !0)), s(r.ids) && (t.attach.accounts = r.ids), s(r.id) && (t.attach.account = r.id), s(r.uinfos) && (t.attach.users = r.uinfos.map(function (e) {
                        return u.reverse(a.unserialize(e, "user"))
                    })), s(r.mute) && (t.attach.mute = 1 === +r.mute), s(r.attach) && (t.attach.custom = r.attach), s(r.channel) && (t.attach.channelId = r.channel), s(r.calltype) && (t.attach.netcallType = r.calltype), s(r.duration) && (t.attach.duration = r.duration), s(r.time) && (t.attach.time = r.time), t.attach.accounts && t.attach.accounts.length <= 2 && t.from === t.to && t.attach.accounts.some(function (e) {
                        if (e !== t.to) return t.to = e, !0
                    })
                }
            } else t.attach = {};
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "content", "msg::RobotMessage"), s.undef(e.robotAccid) && (e.robotAccid = e.to);
            var t = e.content;
            switch (t.type) {
                case"welcome":
                    s.undef(e.body) && (this.body = "欢迎消息");
                    break;
                case"text":
                    s.verifyOptions(t, "content", "msg::RobotMessage"), s.undef(e.body) && (this.body = t.content);
                    break;
                case"link":
                    s.verifyOptions(t, "target", "msg::RobotMessage")
            }
            t.type && (t.type = i[t.type]), t = {
                param: t,
                robotAccid: e.robotAccid
            }, this.attach = JSON.stringify(t), e.type = "robot", o.call(this, e)
        }

        var o = n(66), s = n(1), i = {welcome: "00", text: "01", link: "03"},
            a = {"01": "text", "02": "image", "03": "answer", 11: "template"};
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            if ("robot" === t.type) {
                var n = JSON.parse(e.attach);
                if (n.param && (n.param.type = a[n.param.type] || "unknown"), n.robotMsg) {
                    n = s.merge(n, n.robotMsg);
                    var r = n.message;
                    "bot" === n.flag ? n.message = r.map(function (e) {
                        return e.type = a[e.type] || "unknown", e
                    }) : "faq" === n.flag, delete n.robotMsg
                }
                t.content = n
            }
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "text", "msg::TextMessage"), e.type = "text", o.call(this, e)
        }

        var o = n(66), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            s.verifyOptions(e, "tip", "msg::TipMessage"), e.type = "tip", o.call(this, e), this.body = e.tip
        }

        var o = n(66), s = n(1);
        r.prototype = Object.create(o.prototype), r.reverse = function (e) {
            var t = o.reverse(e);
            return t.text = "", t.tip = e.body, e.attach && (t.attach = e.attach), t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(115), s = n(1);
        r.prototype = Object.create(o.prototype), r.verifyFile = function (e, t) {
            s.verifyOptions(e, "dur w h", !0, "file.", t)
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            if (o.verifyOptions(e, "type value", "event::MsgEvent"), o.verifyParamType("type", e.type, "number", "event::MsgEvent"), o.verifyParamMin("type", e.type, 1e5, "event::MsgEvent"), o.verifyParamType("value", e.value, "number", "event::MsgEvent"), this.type = e.type, this.value = e.value, this.idClient = o.guid(), s(e.custom) && (this.custom = "" + e.custom), this.validTime = e.validTime || 604800, o.verifyParamType("validTime", this.validTime, "number", "event::MsgEvent"), o.verifyParamMin("validTime", this.validTime, 60, "event::MsgEvent"), o.verifyParamMax("validTime", this.validTime, 604800, "event::MsgEvent"), s(e.broadcastType)) {
                if (o.verifyParamType("broadcastType", e.broadcastType, "number", "event::MsgEvent"), [1, 2].indexOf(e.broadcastType) < 0) throw new i('参数错误"broadcastType":只能为1或2');
                this.broadcastType = e.broadcastType
            } else this.broadcastType = 2;
            s(e.sync) ? (o.verifyParamType("sync", e.sync, "boolean", "event::MsgEvent"), this.sync = e.sync) : this.sync = !1
        }

        var o = n(1), s = o.notundef, i = n(27);
        r.prototype.assembleEvent = function () {
            return {
                type: this.type,
                value: this.value,
                idClient: this.idClient,
                custom: this.custom || "",
                validTime: this.validTime,
                broadcastType: this.broadcastType,
                sync: this.sync === !0 ? 1 : 0
            }
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            o.verifyOptions(e, "type", "event::MsgEventSubscribe"), o.verifyParamType("type", e.type, "number", "event::MsgEventSubscribe"), o.findObjIndexInArray([1, 2, 3], e.type) < 0 && o.verifyParamMin("type", e.type, 1e5, "event::MsgEventSubscribe"), this.type = e.type, s(e.subscribeTime) ? (o.verifyParamType("subscribeTime", e.subscribeTime, "number", "event::MsgEventSubscribe"), o.verifyParamMin("subscribeTime", e.subscribeTime, 60, "event::MsgEventSubscribe"), o.verifyParamMax("subscribeTime", e.subscribeTime, 2592e3, "event::MsgEventSubscribe"), this.subscribeTime = e.subscribeTime) : this.subscribeTime = 2592e3, s(e.sync) ? (o.verifyParamType("sync", e.sync, "boolean", "event::MsgEventSubscribe"), this.sync = e.sync) : this.sync = !0
        }

        var o = n(1), s = o.notundef;
        r.prototype.assembleEvent = function (e) {
            return {type: this.type, subscribeTime: this.subscribeTime, sync: this.sync === !0 ? 1 : 0}
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";

        function r() {
        }

        var o = n(1);
        r.parse = function (e) {
            var t = o.copy(e);
            return t.isBlacked = "1" === t.isBlacked, t.isMuted = "1" === t.isMuted, t.createTime = +t.createTime, t.updateTime = +t.updateTime, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(105).fn, o = n(63), s = n(1);
        r.assembleLogin = function () {
            var e = this, t = e.options;
            e.sdkSession = e.genSessionKey();
            var n = {
                appKey: t.appKey,
                account: t.account,
                deviceId: o.deviceId,
                chatroomId: t.chatroomId,
                session: e.sdkSession,
                appLogin: e.appLogin || 0
            };
            return n = s.merge(n, s.filterObj(t, "chatroomNick chatroomAvatar chatroomCustom chatroomEnterCustom isAnonymous")), {
                type: 1,
                login: n,
                imLogin: e.assembleIMLogin()
            }
        }, r.afterLogin = function (e) {
            var t = this, n = e.chatroom;
            t.chatroom = n, t.notifyLogin()
        }, r.kickedReasons = ["", "chatroomClosed", "managerKick", "samePlatformKick", "silentlyKick", "blacked"], r.kickedMessages = ["", "聊天室关闭了", "被房主或者管理员踢出", "不允许同一个帐号在多个地方同时登录", "悄悄被踢", "被拉黑了"]
    }, function (e, t, n) {
        "use strict";
        var r = n(105).fn;
        r.refreshSocketUrl = function () {
            var e = this;
            e.socketUrls = e.socketUrlsBackup.slice(0), e.logger.info("link::refreshSocketUrl"), e.connectToUrl(e.getNextSocketUrl())
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(105).fn, o = n(142);
        r.onChatroomMembersInfo = r.onChatroomMembers = function (e) {
            e.error || (e.obj.members = o.reverseMembers(e.content.members))
        }, r.onMarkChatroomMember = function (e) {
            e.error || (e.obj.member = o.reverse(e.content.chatroomMember))
        }, r.onSyncRobot = function (e) {
            !e.error && this.options.onrobots ? this.options.onrobots(null, e.content) : this.ontions.onrobots(e.error, {})
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(105).fn, o = n(1);
        r.completeMsg = function (e) {
            var t = this;
            e.chatroomId = t.chatroom.id, e.from = t.options.account, e.fromClientType = "Web", e.time || (e.time = +new Date)
        }, r.onMsg = function (e) {
            var t = this, n = t.message.reverse(e.content.msg);
            t.checkMsgUnique(n) && (t.msgBuffer.push(n), t.msgFlushTimer || t.startMsgFlushTimer())
        }, r.startMsgFlushTimer = function () {
            var e = this, t = e.options;
            e.msgFlushTimer = setTimeout(function () {
                var n = e.msgBuffer.splice(0, t.msgBufferSize);
                e.options.onmsgs(n), e.msgBuffer.length ? e.startMsgFlushTimer() : delete e.msgFlushTimer
            }, t.msgBufferInterval)
        }, r.checkMsgUnique = o.genCheckUniqueFunc("idClient"), r.onSendMsg = function (e) {
            var t = e.obj.msg;
            e.error ? t.status = "fail" : (t = e.content.msg, t.status = "success"), t = this.message.reverse(t), e.obj = t
        }, r.onHistoryMsgs = function (e) {
            e.error || (e.obj.msgs = this.message.reverseMsgs(e.content.msgs))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(23).fn, o = n(101);
        r.assembleLogin = function () {
            return {login: this.assembleIMLogin()}
        }, r.afterLogin = function () {
            var e = this, t = e.db;
            if (t.enable) {
                var n = e.account;
                e.options.appendAppKeyForDBName && (n += "-" + e.options.appKey), e.db.init(n).then(function () {
                    e.syncData()
                }, function (n) {
                    e.logger.warn("link::afterLogin: no db", n), t.reset(!1), e.syncData()
                })
            } else e.logger.info("link::afterLogin: no db"), e.syncData()
        }, r.processAuth = function (e) {
            var t = this;
            switch (e.cmd) {
                case"login":
                    e.error || (e.obj = e.content.loginRes, t.connectionId = e.content.loginRes.connectionId, t.onLoginPortsChange(e, 2));
                    break;
                case"kicked":
                    return void t.onKicked(e);
                case"multiPortLogin":
                    t.onLoginPortsChange(e, e.content.state);
                    break;
                case"kick":
                    e.error || (e.obj.deviceIds = e.content.deviceIds)
            }
        }, r.onLoginPortsChange = function (e, t) {
            var n = this, r = e.content.loginPorts;
            if (r && r.length) {
                var s = !0;
                switch (t) {
                    case 2:
                        s = !0;
                        break;
                    case 3:
                        s = !1
                }
                r.forEach(function (e) {
                    e.type = o.reverseType(e.type), e.time = +e.time, e.online = s
                }), r = r.filter(function (e) {
                    return e.connectionId !== n.connectionId
                }), r.length && (n.logger.info("link::onLoginPortsChange:", r), n.options.onloginportschange(r))
            }
        }, r.kickedReasons = ["", "samePlatformKick", "serverKick", "otherPlatformKick", "silentlyKick"], r.kickedMessages = ["", "不允许同一个帐号在多个地方同时登录", "被服务器踢了", "被其它端踢了", "悄悄被踢"]
    }, function (e, t, n) {
        "use strict";
        var r = n(23).fn;
        r.processChatroom = function (e) {
            var t = this;
            switch (e.cmd) {
                case"getChatroomAddress":
                    t.onChatroomAddress(e)
            }
        }, r.onChatroomAddress = function (e) {
            e.error || (e.obj.address = e.content.address)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(23).fn, o = n(4), s = n(1), i = n(62);
        r.refreshSocketUrl = function () {
            function e(e) {
                n.socketUrls = [], e = JSON.parse(e), e.common.link.forEach(function (e) {
                    n.socketUrls.push(o.formatSocketUrl({url: e, secure: n.options.secure}))
                }), e.common["link.default"].forEach(function (e) {
                    e = o.formatSocketUrl({
                        url: e,
                        secure: n.options.secure
                    }), n.socketUrls.indexOf(e) === -1 && n.socketUrls.push(e)
                });
                try {
                    o.uploadUrl = e.nosup[0]
                } catch (t) {
                }
                n.logger.info("link::refreshSocketUrl: ajax load, got socket urls ", n.socketUrls), n.connectToUrl(n.getNextSocketUrl())
            }

            function t(e) {
                n.api.reportLogs({
                    event: "nimlb",
                    code: 3001
                }), n.logger.error("link::refreshSocketUrl: ajax lbs error", e), n.onDisconnect(!1, "link::refreshSocketUrl")
            }

            var n = this, r = n.options, a = o.info, c = r.lbsUrl;
            c = c + s.genUrlSep(c) + "k=" + r.appKey + "&id=" + r.account + "&sv=" + a.sdkVersion + "&pv=" + a.protocolVersion, n.logger.info("link::refreshSocketUrl: ajax " + c), i(c, {
                proxyUrl: s.url2origin(c) + "/lbs/res/cors/nej_proxy_frame.html",
                timeout: o.xhrTimeout,
                onload: e,
                onerror: t
            })
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            e = e || {};
            var t = c.copy(e);
            return t.clientType && (t.clientType = u[t.clientType] || ""), t.serverCustom && (t.custom = JSON.parse(t.serverCustom), "string" == typeof t.custom[0] && (t.custom = t.custom[0]), delete t.serverCustom), t
        }

        var s = n(63), i = r(s), a = n(23).fn, c = n(1), u = i["default"].clientTypeMap;
        a.processEventService = function (e) {
            var t = this, n = e.content, r = e.error, s = t.options || {};
            switch (r && (r.callFunc = "events::processEventService", t.onCustomError("事件服务解包失败", "EVENT_SERVICE_ERROR", r)), e.cmd) {
                case"pushEvent":
                    if (c.isFunction(s.onpushevents)) {
                        var i = {msgEvents: [o(n.msgEvent)]};
                        s.onpushevents(i)
                    }
                    break;
                case"pushEvents":
                    if (c.isFunction(s.onpushevents)) {
                        var a = n.msgEvents, u = a.map(function (e) {
                            return o(e)
                        });
                        a = {msgEvents: u}, s.onpushevents(a)
                    }
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(23).fn;
        r.processFilter = function (e) {
            var t = this;
            switch (e.cmd) {
                case"sendFilterMsg":
                    t.onSendMsg(e, !0);
                    break;
                case"filterMsg":
                    t.onMsg(e, !0);
                    break;
                case"filterSysMsg":
                    t.onSysMsg(e, !0);
                    break;
                case"sendFilterCustomSysMsg":
                    t.onSendSysMsg(e, !0)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = s.objs2accounts, a = n(161), c = n(116);
        o.processFriend = function (e) {
            var t = this, n = e.obj, r = e.content, o = e.error;
            switch (e.cmd) {
                case"friendRequest":
                    t.updateFriendSysMsg(e), o || t.onFriendRequest(n);
                    break;
                case"syncFriendRequest":
                    t.onFriendRequest(r, !0);
                    break;
                case"deleteFriend":
                    o || t.onDeleteFriend(n);
                    break;
                case"syncDeleteFriend":
                    t.onDeleteFriend(r, !0);
                    break;
                case"updateFriend":
                    o || t.onUpdateFriend(n);
                    break;
                case"syncUpdateFriend":
                    t.onUpdateFriend(r.friend, !0);
                    break;
                case"getFriends":
                    t.onFriends(e);
                    break;
                case"syncFriends":
                    t.onFriends(e);
                    break;
                case"syncFriendUsers":
                    t.onFriendUsers(e)
            }
        }, o.onFriends = function (e) {
            function t() {
                f && d.forEach(function (e) {
                    e = a.reverse(e), e.valid ? p.push(e) : g.push(e)
                }), c.logger.info("friend::onFriends: parse friends", i(p), p, "delete", i(g), g), d.length ? (f = !0, s = e.content.timetag) : f = !1
            }

            function n(t, n) {
                e.promise = new r(function (e, r) {
                    function i() {
                        m ? (o(), e(), t()) : u.getFriends().then(function (n) {
                            p = n, o(), e(), t()
                        }).then(void 0, function (e) {
                            e._msg = "get friends error", r(e), n(e)
                        })
                    }

                    f ? u.mergeFriends(p, g, s).then(function () {
                        i()
                    }).then(void 0, function (e) {
                        e._msg = "merge friends error", r(e), n(e)
                    }) : (c.logger.info("friend::onFriends: no merge friends"), i())
                }).then(void 0, function (e) {
                    throw e._msg = "merge friends data error", n(e), e
                })
            }

            function o() {
                c.timetags.friends = s, p.invalid = g, m ? (c.syncResult.friends = p, c.syncResult.invalidFriends = g) : (c.logger.info("friend::onFriends: get friends bingo", i(p), p), e.obj = p)
            }

            var s, c = this, u = c.db, l = e.error, m = c.packetFromSync(e), d = e.content.friends, f = !0, p = [],
                g = [], y = new r(function (e, r) {
                    l ? m && r(l) : (t(), u.enable ? n(e, r) : (o(), e()))
                });
            m && (y.cmd = "friends", c.syncPromiseArray.push(y))
        }, o.onFriendRequest = function (e, t) {
            var n = r.resolve(), o = this, s = o.db, i = e.type;
            i = e.type = a.getTypeFromByte(i) || i;
            var c = "addFriend" === i || "passFriendApply" === i;
            if (c) {
                var u = e.friend = a.assembleFriend(e.account);
                s.enable && (n = s.putFriend(u))
            }
            return t && o.onSyncFriendAction(e), n
        }, o.onSyncFriendAction = function (e) {
            var t = this;
            t.logger.info("friend::onSyncFriendActionon:", e), t.options.onsyncfriendaction(e)
        }, o.onDeleteFriend = function (e, t) {
            var n = r.resolve(), o = this, s = o.db;
            return s.enable && (n = s.deleteFriend(e.account)), t && (e.type = "deleteFriend", o.onSyncFriendAction(e)), n
        }, o.onUpdateFriend = function (e, t) {
            var n = this, r = n.db, o = a.reverse(e);
            r.enable && r.updateFriend(o), t && n.onSyncFriendAction({type: "updateFriend", friend: o})
        }, o.onFriendUsers = function (e) {
            var t = this, n = t.db, o = e.content, s = o.users.map(function (e) {
                return c.reverse(e)
            });
            t.logger.warn("friend::onFriendUsers: parse users", i(s), s);
            var a = o.timetag, u = r.resolve();
            n.enable && (u = n.mergeFriendUsers(s, a)), t.timetags.friendUsers = a, u.cmd = "friendUsers", t.syncPromiseArray.push(u), t.syncResult.users = s
        }, o.updateFriendSysMsg = function (e) {
            var t, n, r = e.obj, o = e.error;
            if (e.obj.idServer) {
                if (o) t = "error", o = s.filterObj(o, "code message"); else {
                    var i = r.type;
                    switch (i = a.getTypeFromByte(i) || i) {
                        case"passFriendApply":
                            t = "passed";
                            break;
                        case"rejectFriendApply":
                            t = "rejected"
                    }
                }
                n = {idServer: r.idServer, state: t}, o && (n.error = o), this.updateSysMsg(n)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = s.undef, a = n(63), c = n(98), u = n(102), l = n(144);
        o.processMsg = function (e) {
            var t = this;
            switch (e.cmd) {
                case"sendMsg":
                    t.onSendMsg(e);
                    break;
                case"msg":
                    t.onMsg(e);
                    break;
                case"sysMsg":
                    t.onSysMsg(e);
                    break;
                case"broadcastMsg":
                    t.onBroadcastMsg(e);
                    break;
                case"sendCustomSysMsg":
                    t.onSendSysMsg(e);
                    break;
                case"getHistoryMsgs":
                case"searchHistoryMsgs":
                    t.onHistoryMsgs(e);
                    break;
                case"syncSendMsg":
                    t.onMsg(e);
                    break;
                case"deleteSessions":
                    t.onDeleteSessions(e);
                    break;
                case"sendMsgReceipt":
                    t.onSendMsgReceipt(e);
                    break;
                case"msgReceipt":
                    t.onMsgReceipt(e);
                    break;
                case"onDeleteMsg":
                    t.onDeleteMsg(e);
                    break;
                case"onMsgDeleted":
                    t.onMsgDeleted(e);
                    break;
                case"onDeleteMsgOfflineRoaming":
                    t.onDeleteMsgOfflineRoaming(e);
                    break;
                case"onMarkSessionAck":
                    t.onMarkSessionAck(e);
                    break;
                case"syncMarkSessionAck":
                    t.syncMarkSessionAck(e)
            }
        }, o.checkIgnore = function (e) {
            var t = this;
            e.forEach(function (e) {
                "notification" === e.type && !e.ignore && t.options.shouldIgnoreNotification(e) && (e.ignore = !0)
            })
        }, o.filterIgnore = function (e) {
            return e.filter(function (e) {
                return !e.ignore
            })
        }, o.genSessionByMsgs = function (e) {
            var t = this;
            return t.checkIgnore(e), u.genSessionByMsgs(t.message.Message, e)
        }, o.onRoamingMsgs = function (e) {
            var t = this, n = t.message, r = n.Message, o = r.getMaxTimetag, s = n.reverseMsgs(e.content.msgs),
                i = o(s);
            s = r.sortMsgs(s), s = r.deduplication(s);
            var a = s[0], c = a.sessionId, u = t.genSessionByMsgs(s);
            t.cacheSyncedSession(u);
            var l = t.putMsg(s, "roamingMsgs").then(function (e) {
                s = e, s = t.filterIgnore(s), s.length && (t.logger.info("msg::onRoamingMsgs: putRoamingMsgs", c, s.length, s), t.syncResult.roamingMsgs = t.syncResult.roamingMsgs || [], t.syncResult.roamingMsgs.push({
                    sessionId: c,
                    scene: a.scene,
                    to: a.target,
                    msgs: s,
                    timetag: i
                }))
            });
            l.cmd = "roamingMsgs-" + c, t.syncPromiseArray.push(l)
        }, o.onOfflineMsgs = function (e, t) {
            function n(e) {
                if (l.length) {
                    var t = s.getMaxTimetag(l), n = l[0].scene, o = l[0].target;
                    r.markMsgRead(l), l = s.sortMsgs(l), l = s.deduplication(l);
                    var i = r.genSessionByMsgs(l);
                    r.cacheSyncedSession(i), c = r.putMsg(l, "offlineMsgs").then(function (s) {
                        l = s, l = r.filterIgnore(l), l.length && (r.logger.info("msg::onOfflineMsgs： toreLastSession", d, e, l.length, l), r.syncResult[d] = r.syncResult[d] || [], r.syncResult[d].push({
                            sessionId: e,
                            scene: n,
                            to: o,
                            msgs: l,
                            timetag: t
                        }))
                    }), c.cmd = "offlineMsgs-" + e, r.syncPromiseArray.push(c)
                }
            }

            var r = this, o = r.message, s = o.Message, i = null;
            t && (i = {filter: !0});
            var a, c, u = o.reverseMsgs(e.content.msgs, {modifyObj: i}), l = [], m = "",
                d = t ? "offlineFilterMsgs" : "offlineMsgs";
            u.forEach(function (e) {
                a = e.sessionId, a !== m ? (n(m), l = [], l.push(e), m = a) : l.push(e)
            }), n(m)
        }, o.markUnreadByMsgsPromise = function (e) {
            var t = this, n = t.db;
            n.enable && n.getSession(e).then(function (n) {
                n.ack && t.markUnreadBySessionAck({sessionId: e, ack: n.ack})
            })
        }, o.completeMsg = function (e) {
            var t = this;
            return e.from = t.account, e.fromNick = t.myInfo && t.myInfo.nick, e.fromClientType = "Web", e.fromDeviceId = a.deviceId, e.time || (e.time = +new Date), e
        }, o.onMsgs = function (e) {
            var t = this;
            t.message.reverseMsgs(e.content.msgs, {
                mapper: function (e) {
                    t.handleMsg(e)
                }
            })
        }, o.onMsg = function (e, t) {
            var n = this, r = n.message.reverse(e.content.msg);
            t && (r.filter = !0), n.syncing ? n.unhandledMsgs.push({type: "onMsg", msg: r}) : n.handleMsg(r)
        }, o.onBroadcastMsgs = function (e) {
            var t = this, n = e.content.broadcastMsgs;
            n = n.sort(function (e, t) {
                return e.broadcastId - t.broadcastId
            }), t.putBroadcastMsgs(n)
        }, o.onBroadcastMsg = function (e) {
            var t = this, n = e.content.broadcastMsg;
            n.time = n.timestamp, t.syncing ? t.unhandledMsgs.push({
                type: "onBroadcastMsg",
                msg: n
            }) : n && t.putBroadcastMsg(n)
        }, o.pushMsgTask = function (e) {
            var t = this;
            t.msgPromise = t.msgPromise.then(function () {
                return e()
            })
        }, o.handleMsg = function (e) {
            var t = this, n = e.time;
            t.markMsgRead(e), t.msgPromise = t.msgPromise.then(function () {
                return t.putMsg(e, "onMsg")
            }).then(function (r) {
                return e = r[0], t.updateRoamingMsgTimetag(n)
            }).then(function () {
                if (e) return t.checkUserUpdate(e)
            }).then(function () {
                if (e) {
                    var n = e.type;
                    switch (t.logger.log("msg::handleMsg:checkUserUpdate: " + e.scene + " " + n + " msg" + ("notification" === n ? " " + e.attach.type : ""), e), n) {
                        case"notification":
                            return t.onTeamNotificationMsg(e)
                    }
                }
            }).then(function () {
                e && !e.ignore && (t.logger.info("msg::handleMsg:onmsg: ", e), setTimeout(function () {
                    t.options.onmsg(s.copy(e))
                }, 0))
            }).then(void 0, function (e) {
                e.callFunc = "msg::handleMsg", t.onCustomError("消息处理错误", e)
            })
        }, o.putMsg = function (e, t) {
            function n(e) {
                "roamingMsgs" !== t && "offlineMsgs" !== t || o.cacheSyncedSession(e)
            }

            if (s.isArray(e) || (e = [e]), e[0].filter) return r.resolve(e);
            var o = this, a = o.db, c = a.enable, u = r.resolve(), l = o.message.Message, m = l.getLastMsg(e),
                d = m.flow, f = m.sessionId !== o.currSessionId, p = o.genSessionByMsgs(e);
            n(p);
            var g = !1, y = [];
            return o.checkIgnore(e), u = u.then(function () {
                return c || o.options.autoMarkRead || "roamingMsgs" === t || !p || (o.sessionUnreadMsgs = o.sessionUnreadMsgs || {}, o.sessionUnreadMsgs[p.id] = o.sessionUnreadMsgs[p.id] || [], o.sessionUnreadMsgs[p.id] = o.sessionUnreadMsgs[p.id].concat(e.filter(function (e) {
                    var t = o.options.shouldCountNotifyUnread(e);
                    return t
                }))), c && "roamingMsgs" !== t && "offlineMsgs" !== t ? (o.logger.log("msg::putMsg:db.putMsg: ", p), a.putMsg(e)) : e
            }).then(function (t) {
                var n = [];
                return e.forEach(function (e) {
                    o.checkMsgUnique(e) && n.push(e)
                }), e = n, y = c ? t : e, r.resolve(e)
            }), u = u.then(function (e) {
                return e.length && (p = o.genSessionByMsgs(e), n(p), c && p) ? new r(function (t, n) {
                    a.getSessions({sessionId: p.id}).then(function (n) {
                        if (n && n.lastMsg) {
                            var r = n.lastMsg;
                            p.lastMsg && p.lastMsg.time < r.time && (p.lastMsg = r)
                        }
                        o.logger.log("msg::putMsg:db.getSessions: ", p), y.length ? p ? a.putSession(p).then(function (e) {
                            t(e)
                        }) : t(n) : (g = !0, y = e, t(n))
                    })
                }) : r.resolve(p)
            }), u = u.then(function (e) {
                if (p && y.length) {
                    var r = "roamingMsgs" === t, s = o.options.syncSessionUnread, u = p.id, l = o.findSession(u) || {},
                        m = l.ack || 0, h = "offlineMsgs" === t || r && s || "onMsg" === t && "in" === d && f;
                    if (h) {
                        c && e ? (p = e, m = m || p.ack || 0) : (e = l, e && (p.unread = e.unread || 0)), n(p), p.unread = p.unread || 0;
                        var v = 0;
                        if (y.forEach(function (e) {
                                var t = o.options.shouldCountNotifyUnread(e),
                                    n = ("notification" !== e.type || "notification" === e.type && t) && (i(e.isUnreadable) || e.isUnreadable);
                                if (n && s && (n = e.time > m && "out" !== e.flow), n && (v++, s && !c)) {
                                    var r = l.unreadMsgs || [];
                                    r.push(e), p.unreadMsgs = r
                                }
                            }), p.unread += v, o.logger.log("msg::putMsg:updateSession: ", p), n(p), c && !g) return a.updateSession({
                            id: p.id,
                            unread: p.unread
                        })
                    }
                }
            }), "onMsg" === t ? u = u.then(function () {
                e.length && p && (o.onUpdateSession(p), o.options.syncSessionUnread && !f && o.api.resetSessionUnread(o.currSessionId))
            }) : "sendMsg" === t && !f && p && p.lastMsg && p.lastMsg.isLocal && (o.onUpdateSession(p), o.api.resetSessionUnread(o.currSessionId)), u.then(function () {
                return r.resolve(e)
            })
        }, o.putBroadcastMsgs = function (e) {
            var t = this, n = t.db, o = e.length;
            if (o > 0) {
                if (t.doMarkBroadcastMsgsRead(e), n.enable) {
                    var i = e[o - 1].broadcastId;
                    return n.updateBroadcastMsgTimetag(i), n.putBroadcastMsg(e).then(function () {
                        return setTimeout(function () {
                            t.doMarkMsgsRead(), t.options.onbroadcastmsgs(s.copy(e))
                        }, 0), r.resolve(e)
                    })
                }
                setTimeout(function () {
                    t.options.onbroadcastmsgs(s.copy(e))
                }, 0)
            }
            return e
        }, o.putBroadcastMsg = function (e) {
            var t = this, n = t.db;
            return t.doMarkBroadcastMsgsRead([e]), n.enable ? (e.broadcastId && n.updateBroadcastMsgTimetag(e.broadcastId), n.putBroadcastMsg(e).then(function () {
                return setTimeout(function () {
                    t.options.onbroadcastmsg(s.copy(e))
                }, 0), r.resolve(e)
            })) : (setTimeout(function () {
                t.options.onbroadcastmsg(s.copy(e))
            }, 0), e)
        }, o.doMarkBroadcastMsgsRead = function (e) {
            var t = 7, n = 17;
            e = e.map(function (e) {
                return e.broadcastId
            }), this.sendCmd("batchMarkRead", {sid: t, cid: n, ids: e})
        },

       o.cacheSyncedSession = function (e) {
            var t = this;
            if (e && t.syncResult) {
                e = s.merge({}, e), t.syncResult.sessions = t.syncResult.sessions || {};
                var n = e.id;
                t.syncResult.sessions[n] = s.merge(t.syncResult.sessions[n], e), i(t.syncResult.sessions[n].unread) && (t.syncResult.sessions[n].unread = 0), t.mergeSession(t.syncResult.sessions[n])
            }
        },

        o.checkMsgUnique = s.genCheckUniqueFunc("idClient"), o.storeSendMsg = function (e) {
            var t = this;
            if (!t.syncing) {
                var n = t.putMsg(e, "sendMsg");
                return t.msgPromise = t.msgPromise.then(function () {
                    return n
                }), n
            }
            t.unhandledMsgs.push({type: "sendMsg", msg: e})
        },

        o.updateSendMsgError = function (e) {
            var t = this;
            if (!t.syncing) {
                var n = t.updateMsg(e);
                return t.msgPromise = t.msgPromise.then(function () {
                    return n
                }), n
            }
            t.unupdatedMsgs.push(e)
        }, o.onSendMsg = function (e, t) {
            var n = this, o = e.obj && e.obj.msg || e.content.msg;
            n.completeMsg(o);
            var s = e.error && 7101 === e.error.code;
            e.error && !s || (o.idServer = e.content.msg.idServer, o.time = +e.content.msg.time), e.error ? o.status = "fail" : o.status = "success", o = n.message.reverse(o), t && (o.filter = !0), e.obj = o, n.syncing ? n.unupdatedMsgs.push(o) : n.msgPromise = r.all([n.msgPromise, e.obj.promise]).then(function (e) {
                return e.length || (o.resend = !0), n.updateMsg(o).then(function () {
                    return n.options.syncSessionUnread && n.currSessionId === o.sessionId && n.api.resetSessionUnread(n.currSessionId), n.resolveMsgReceiptTask(o), o
                })
            })
        }, o.updateLocalMsg = function (e) {
            var t = this, n = t.updateMsg(e);
            return t.msgPromise = t.msgPromise.then(function () {
                return n
            }), n
        }, o.updateMsg = function (e) {
            if (e.filter) return r.resolve(e);
            var t = this, n = t.db, o = "success" === e.status, s = u.genSessionByMsg(e), i = !!e.isLocal;
            return t.onUpdateSession(s), n.enable ? n.updateMsg(e).then(function (e) {
                var t = n.updateSession(s), a = r.resolve();
                return o && e && !i && (a = n.updateRoamingMsgTimetag(e.time)), r.all([t, a])
            }) : (o && !i && (t.timetags.roamingMsgs = e.time), r.resolve(e))
        }, o.updateRoamingMsgTimetag = function (e) {
            var t = this, n = t.db;
            return n.enable ? n.updateRoamingMsgTimetag(e) : (t.timetags.roamingMsgs = e, r.resolve(e))
        }, o.checkUserUpdate = function (e) {
            var t = this, n = e.from;
            return n === t.account ? r.resolve() : new r(function (r) {
                function o() {
                    t.api.getUser({
                        account: n, sync: !0, done: function (e, n) {
                            e || setTimeout(function () {
                                t.logger.log("user::checkUserUpdate: onupdateuser", n.account, n), t.options.onupdateuser(n);
                            }, 0), r()
                        }
                    })
                }

                var i = t.userSet[n];
                if (i) {
                    var a = +i.updateTime, c = +e.userUpdateTime;
                    !isNaN(a) && !isNaN(c) && s.isNumber(a) && s.isNumber(c) && a < c ? o() : r()
                } else o()
            })
        }, o.processUnsettledMsgs = function () {
            var e = this;
            e.unhandledMsgs.forEach(function (t) {
                var n = t.msg;
                switch (t.type) {
                    case"onMsg":
                        e.handleMsg(n);
                        break;
                    case"sendMsg":
                        e.msgPromise = e.msgPromise.then(function () {
                            return e.putMsg(n)
                        });
                        break;
                    case"onBroadcastMsg":
                        e.msgPromise = e.msgPromise.then(function () {
                            return e.putBroadcastMsg(n)
                        })
                }
            }), e.unupdatedMsgs.forEach(function (t) {
                e.msgPromise = e.msgPromise.then(function () {
                    return e.updateMsg(t)
                })
            }), e.resetUnsettledMsgs()
        }, o.onTeamNotificationMsg = function (e) {
            var t = this, n = t.db, r = e.attach, o = r.type, s = e.from, i = e.to, a = e.time, c = r.team,
                u = r.account, l = r.accounts;
            switch (o) {
                case"updateTeam":
                    if (!n.enable) return;
                    return c.updateTime = a, t.onUpdateTeam(c), n.updateTeam(c);
                case"addTeamMembers":
                    return t.onAddTeamMembers(e, c, l);
                case"removeTeamMembers":
                    return t.onRemoveTeamMembers(c, i, l);
                case"acceptTeamInvite":
                    return t.onAddTeamMembers(e, c, [s]);
                case"passTeamApply":
                    return t.onAddTeamMembers(e, c, [u]);
                case"addTeamManagers":
                    return t.updateTeamManagers(e, i, l, !0, a);
                case"removeTeamManagers":
                    return t.updateTeamManagers(e, i, l, !1, a);
                case"leaveTeam":
                    return t.onRemoveTeamMembers(c, i, [s]);
                case"dismissTeam":
                    return t.onDismissTeam(i, a);
                case"transferTeam":
                    return t.transferTeam(e, c, s, u);
                case"updateTeamMute":
                    return t.onUpdateTeamMembersMute(e, c, [u], r.mute)
            }
        }, o.onAddTeamMembers = function (e, t, n) {
            var o = this, i = o.db, a = t.teamId, u = c.assembleMembers(t, n);
            e.attach.members = u;
            var l = {team: t, accounts: n, members: u};
            if (o.logger.info("team::onAddTeamMembers: ", l), o.options.onAddTeamMembers(s.simpleClone(l)), i.enable) {
                var m, d = i.putTeam(t), f = n.indexOf(o.account) === -1;
                return f ? m = i.putTeamMembers(u) : (o.logger.warn("team::onAddTeamMembers: user join team", a), d = new r(function (e) {
                    o.api.getTeamMembers({
                        teamId: a, sync: !0, done: function () {
                            e()
                        }
                    })
                })), r.all([m, d])
            }
        }, o.onRemoveTeamMembers = function (e, t, n) {
            var o = this, i = o.db, a = {team: e, accounts: n};
            if (o.logger.info("team::onRemoveTeamMembers:", a), o.options.onRemoveTeamMembers(s.simpleClone(a)), i.enable) {
                if (n.indexOf(o.account) === -1) {
                    var c = i.removeTeamMembersByAccounts(t, n), u = r.resolve();
                    return e && (u = i.putTeam(e)), r.all([c, u])
                }
                return i.leaveTeam(t)
            }
        }, o.updateTeamManagers = function (e, t, n, o, i) {
            var a = this, u = a.db, l = e.attach.members = n.map(function (e) {
                return {id: c.genId(t, e), type: o ? "manager" : "normal", updateTime: i}
            }), m = {teamId: "" + t, memberUpdateTime: i};
            e.attach.team = m;
            var d = {team: m, accounts: n, isManager: o, members: l};
            if (a.logger.info("team::updateTeamManagers:", d), a.options.onUpdateTeamManagers(s.simpleClone(d)), u.enable) {
                var f = u.updateTeam(m), p = u.updateTeamManagers(t, n, o, i);
                return r.all([f, p])
            }
        }, o.onDismissTeam = function (e, t) {
            var n = this, r = n.db, o = {teamId: e};
            if (n.logger.info("team::onDismissTeam:", o), n.options.onDismissTeam(o), r.enable) return r.dismissTeam(e, t)
        }, o.transferTeam = function (e, t, n, r) {
            var o = this, i = o.db, a = t.teamId, u = t.memberUpdateTime,
                l = {id: c.genId(a, n), type: "normal", updateTime: u},
                m = {id: c.genId(a, r), type: "owner", updateTime: u};
            e.attach.members = [l, m];
            var d = {team: t, from: l, to: m};
            if (o.logger.info("team::transferTeam:", d), o.options.onTransferTeam(s.simpleClone(d)), i.enable) return i.transferTeam(t, n, r)
        }, o.onUpdateTeamMembersMute = function (e, t, n, o) {
            var i = this, a = i.db, u = n.map(function (e) {
                return {id: c.genId(t.teamId, e), account: e, teamId: t.teamId, mute: o, updateTime: t.memberUpdateTime}
            });
            e.attach.members = u;
            var l = {team: t, accounts: n, members: u, mute: o};
            if (i.logger.info("team::onUpdateTeamMembersMute:", l), i.options.onUpdateTeamMembersMute(s.simpleClone(l)), a.enable) {
                var m = a.updateTeamMembers(u), d = a.putTeam(t);
                return r.all([m, d])
            }
        }, o.onHistoryMsgs = function (e) {
            e.error || (e.obj.msgs = this.message.reverseMsgs(e.content.msgs))
        }, o.isFilterMsgs = function (e) {
            return !!e[0].filter
        }, o.splitMsgs = function (e, t, n, r) {
            e.forEach(function (e) {
                if (e.filter) r.push(e); else switch (e.scene) {
                    case"p2p":
                        t.push(e);
                        break;
                    case"team":
                        n.push(e)
                }
            })
        }, o.markMsgRead = function (e, t) {
            s.isArray(e) || (e = [e]);
            var n = this, r = n.db;
            if (r.enable || n.options.autoMarkRead || t) {
                var o = [], i = [], a = [];
                n.splitMsgs(e, o, i, a), n.markP2pMsgsRead(o), n.markTeamMsgsRead(i), n.markFilterMsgsRead(a)
            }
        }, o.markP2pMsgsRead = function (e) {
            if (e.length) {
                var t = l.idMap.msg.id, n = l.idMap.msg.msg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, o.markTeamMsgsRead = function (e) {
            if (e.length) {
                var t = l.idMap.team.id, n = l.idMap.team.teamMsg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, o.markFilterMsgsRead = function (e) {
            if (e.length) {
                var t = l.idMap.filter.id, n = l.idMap.filter.filterMsg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, o.markSysMsgRead = function (e, t) {
            s.isArray(e) || (e = [e]);
            var n = this, r = n.db;
            if (r.enable || n.options.autoMarkRead || t) {
                var o, i;
                n.isFilterMsgs(e) ? (o = l.idMap.filter.id, i = l.idMap.filter.filterSysMsg) : (o = l.idMap.msg.id, i = l.idMap.msg.sysMsg), n.doMarkMsgsRead(o, i, e)
            }
        }, o.doMarkMsgsRead = function (e, t, n) {
            n && n.length && this.sendCmd("batchMarkRead", {
                sid: e, cid: t, ids: n.map(function (e) {
                    return e.idServer
                })
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(103), i = n(102), a = n(1);
        o.onDeleteMsg = function (e) {
            delete e.obj.sysMsg, e.error || (e.promise = this.deleteLocalMsg(e.obj.msg))
        }, o.onMsgDeleted = function (e) {
            if (!e.error) {
                var t = this, n = t.db, r = s.reverse(e.content.sysMsg);
                r = t.processDeleteMsgSysMsg(r), t.markSysMsgRead(r), t.deleteLocalMsg(r.msg).then(function () {
                    n.enable && n.updateDeleteMsgTimetag(r.time + 1), t.handleSysMsg(r)
                })
            }
        }, o.processDeleteMsgSysMsg = function (e) {
            var t = this;
            return e.msg = {}, ["scene", "from", "to"].forEach(function (t) {
                e.msg[t] = e[t]
            }), e.msg.idClient = e.deletedIdClient, e.msg.idServer = e.deletedIdServer, e.msg.time = e.deletedMsgTime, e.msg.fromNick = e.deletedMsgFromNick, e.opeAccount = e.opeAccount || e.from, e.msg.opeAccount = e.opeAccount, t.message.Message.setExtra(e.msg, t.account), e
        }, o.onDeleteMsgOfflineRoaming = function (e) {
            if (!e.error) {
                var t = this, n = 1 === +e.content.type ? "offline" : "roaming",
                    r = s.reverseSysMsgs(e.content.sysMsgs, {
                        mapper: function (e) {
                            return t.processDeleteMsgSysMsg(e)
                        }
                    });
                t.logger.info("msg::onDeleteMsgOfflineRoaming: on delete " + n, r), "offline" === n && t.markSysMsgRead(r);
                var o = e.content.timetag;
                t.timetags.deleteMsg = o, t.syncResult.deleteMsgTimetag = o;
                var i = t.putSysMsg(r, "offlineSysMsgs");
                i.cmd = "deleteMsgSysMsgs " + n, t.syncPromiseArray.push(i), t.syncResult.deleteMsgSysMsgs = t.syncResult.deleteMsgSysMsgs || [], t.syncResult.deleteMsgSysMsgs.push({
                    type: n,
                    sysMsgs: r
                })
            }
        }, o.deleteMsgOfflineRoaming = function (e, t) {
            if (!e) return r.resolve();
            var n = this;
            n.logger.info("msg::deleteMsgOfflineRoaming: ", e, t);
            var o = n.db, s = [];
            return e.forEach(function (e) {
                e.sysMsgs.forEach(function (e) {
                    var r = n.deleteLocalMsg(e.msg, {
                        cbUpdateSession: function (e) {
                            e = n.mergeSession(e), e = a.simpleClone(e), i.trim(e);
                            var r = a.findObjIndexInArray(t, {value: e.id});
                            if (r !== -1 && (t[r] = a.merge({}, t[r], e)), o.enable) return o.updateSession(e)
                        }
                    });
                    s.push(r)
                })
            }), r.all(s).then(function () {
                if (o.enable) return o.updateDeleteMsgTimetag(n.syncResult.deleteMsgTimetag)
            })
        }, o.deleteLocalMsg = function (e, t) {
            var n = this, o = n.db;
            t = t || {};
            var s = t.cbUpdateSession || n.updateLocalSession.bind(n);
            if (o.enable && e) {
                var i = !1, a = null, c = e.sessionId;
                return o.getMsgs({sessionId: c, limit: 1}).then(function (t) {
                    t && t[0] && t[0].idClient === e.idClient && (i = !0)
                }).then(function () {
                    return o.deleteMsg(e.idClient)
                }).then(function () {
                    if (i) return o.getMsgs({sessionId: c, limit: 1})
                }).then(function (e) {
                    if (i) return e && e[0] && (a = e[0]), s({id: c, lastMsg: a})
                })
            }
            return r.resolve()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1);
        o.onOfflineMsgReceipts = function (e) {
            var t, n = this, o = n.db, s = e.content.msgReceipts, i = n.syncResult.msgReceipts = [], a = [],
                c = "msgReceipts", u = n.syncResult.sessions || {};
            s.forEach(function (e) {
                e.time = +e.time;
                var s = e.sessionId = "p2p-" + e.from;
                c += "-" + s, t = r.resolve();
                var l = u[s];
                o.enable ? t = o.getSession(s).then(function (t) {
                    if (t = t || l, t && n.shouldUpdateSessionFromMsgReceipt(t, e)) {
                        var r = n.genSessionFromMsgReceipt(t, e), i = n.syncResult.sessions;
                        return i && i[s] && (i = i[s], i.lastMsg && r.lastMsg && i.lastMsg.time > r.lastMsg.time && (r.lastMsg = i.lastMsg)), o.putSession(r).then(function (e) {
                            e && n.cacheSyncedSession(e)
                        })
                    }
                }) : l && i.push(e), a.push(t)
            }), t = r.all(a).then(function () {
                if (o.enable) return o.updateMsgReceiptsTimetag(e.content.timetag)
            }), t.cmd = c, n.syncPromiseArray.push(t)
        }, o.mergeSessionAndMsgReceipts = function (e, t) {
            var n = this, r = {};
            return e = e || [], t = t || [], e.forEach(function (e) {
                r[e.id] = e
            }), t.forEach(function (t) {
                var o = r[t.sessionId];
                if (n.shouldUpdateSessionFromMsgReceipt(o, t)) {
                    var s = n.genSessionFromMsgReceipt(o, t);
                    e = n.api.mergeSessions(e, s)
                }
            }), e
        }, o.shouldUpdateSessionFromMsgReceipt = function (e, t) {
            return !e || !e.msgReceiptServerTime || t.time > e.msgReceiptServerTime
        }, o.genSessionFromMsgReceipt = function (e, t) {
            var n = t.time, r = {id: t.sessionId, msgReceiptTime: n, msgReceiptServerTime: n};
            return e && e.id === t.sessionId && (r = s.merge({}, e, r)), e && e.updateTime || (r.updateTime = n), r
        }, o.onMsgReceipt = function (e) {
            var t = this, n = t.db, o = e.content.msgReceipt;
            o.time = +o.time;
            var s = o.idClient, i = r.resolve();
            n.enable && s && (i = n.getMsgByIdClient(s)), i.then(function (e) {
                var n;
                if (e) {
                    if (!e.idServer) return void(t.msgReceiptTasks[s] = o);
                    n = e.time
                } else n = o.time;
                o.msgReceiptTime = n, t.updateSessionMsgReceiptTime(o)
            })
        }, o.resolveMsgReceiptTask = function (e) {
            var t = this, n = t.msgReceiptTasks[e.idClient];
            n && (n.msgReceiptTime = e.time, this.updateSessionMsgReceiptTime(n))
        }, o.updateSessionMsgReceiptTime = function (e) {
            var t = this, n = t.db,
                r = {id: "p2p-" + e.from, msgReceiptTime: e.msgReceiptTime, msgReceiptServerTime: e.time};
            n.enable && n.putSession(r), t.onUpdateSession(r)
        }, o.onSendMsgReceipt = function (e) {
            var t = this;
            if (!e.error) {
                var n = e.obj.msgReceipt, r = +n.time, o = +e.content.msgReceipt.time, s = t.sessionSet["p2p-" + n.to];
                s.msgReceiptSendTime = Math.min(r, o)
            }
        }, o.shouldSendMsgReceipt = function (e) {
            if (e && "p2p" === e.scene && "success" === e.status) {
                var t = this.sessionSet[e.sessionId];
                if (t) {
                    var n = t.msgReceiptSendTime;
                    return !n || n < e.time
                }
            }
            return !1
        }, o.isMsgRemoteRead = function (e) {
            var t = this;
            if (e && "p2p" === e.scene && "out" === e.flow && "success" === e.status) {
                var n = t.sessionSet[e.sessionId];
                if (n && n.msgReceiptTime) return e.time <= n.msgReceiptTime
            }
            return !1
        }
    }, , function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = n(143);
        o.processNotify = function (e) {
            var t = this;
            switch (e.cmd) {
                case"syncOfflineMsgs":
                    t.onOfflineMsgs(e);
                    break;
                case"batchMarkRead":
                    break;
                case"syncOfflineSysMsgs":
                    t.onOfflineSysMsgs(e);
                    break;
                case"syncRoamingMsgs":
                    t.onRoamingMsgs(e);
                    break;
                case"syncOfflineFilterMsgs":
                    t.onOfflineMsgs(e, !0);
                    break;
                case"syncOfflineFilterSysMsgs":
                    t.onOfflineSysMsgs(e, !0);
                    break;
                case"syncMsgReceipts":
                    t.onOfflineMsgReceipts(e);
                    break;
                case"syncDonnop":
                    t.onDonnop(e, !0);
                    break;
                case"syncSessionAck":
                    t.syncSessionAck(e);
                    break;
                case"syncRobots":
                    t.onRobots(e);
                    break;
                case"syncBroadcastMsgs":
                    t.onBroadcastMsgs(e)
            }
        }, o.onDonnop = function (e, t) {
            if (!e.error) {
                var n = this, r = n.db, o = i.reverse(e.content.donnop);
                n.mergeDonnop(o);
                var s = n.dbDonnop();
                if (t) {
                    var a = e.content.timetag;
                    n.timetags.donnop = a, r.enable && (s = s.then(function () {
                        return n.db.updateDonnopTimetag(a)
                    })), s.cmd = "donnop", n.syncPromiseArray.push(s)
                } else n.onPushNotificationMultiportConfigUpdate()
            }
        }, o.onUpdateDonnop = function (e) {
            var t = this;
            if (!e.error) {
                var n = e.obj;
                n && (t.mergeDonnop(s.filterObj(n, ["shouldPushNotificationWhenPCOnline"])), t.dbDonnop(), t.onPushNotificationMultiportConfigUpdate())
            }
        }, o.getPushNotificationMultiportConfig = function () {
            var e = this;
            return s.merge({}, e.pushNotificationMultiportConfig)
        }, o.mergeDonnop = function (e) {
            var t = this;
            t.pushNotificationMultiportConfig = s.merge({}, t.pushNotificationMultiportConfig, e)
        }, o.dbDonnop = function () {
            var e = this, t = e.db;
            return t.enable ? e.db.setDonnop(e.pushNotificationMultiportConfig) : r.resolve()
        }, o.onPushNotificationMultiportConfigUpdate = function () {
            var e = this;
            setTimeout(function () {
                var t = e.getPushNotificationMultiportConfig();
                e.logger.info("link::onPushNotificationMultiportConfigUpdate:", t), e.options.onPushNotificationMultiportConfigUpdate(t)
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(23).fn, o = n(1);
        r.onRobots = function (e) {
            var t = this, n = e.content;
            if (o.isFunction(t.options.onrobots) && Array.isArray(n.robots)) {
                var r = n.robots.filter(function (e) {
                    return !!e.botid
                });
                r.length > 0 && t.options.onrobots(r || [])
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = n(102), a = n(27);
        o.mergeSession = function (e) {
            e = s.copyWithNull(e);
            var t = this.sessionSet, n = e.id, r = t[n];
            if (r && r.lastMsg && e && e.lastMsg && e.lastMsg.isLocal) {
                var o = r.lastMsg.time || 0, i = e.lastMsg.time || 0;
                if (i < o) return r
            }
            return t[n] = s.merge(r, e), e = t[n], s.undef(e.unread) && (e.unread = 0), e
        }, o.mergeSessions = function (e) {
            var t = this;
            e.forEach(function (e) {
                t.mergeSession(e)
            })
        }, o.deleteLocalSession = function (e) {
            var t = this;
            s.isArray(e) || (e = [e]), e.forEach(function (e) {
                delete t.sessionSet[e]
            })
        }, o.onDeleteSessions = function (e) {
            e.obj = e.obj.sessions.map(function (e) {
                return i.parse(e)
            })
        }, o.onUpdateSession = function (e) {
            var t = this;
            return new r(function (n) {
                e ? (e = t.mergeSession(e), e = s.simpleClone(e), i.trim(e), i.isComplete(e) && setTimeout(function () {
                    t.logger.info("session::onUpdateSession:", e.id, s.simpleClone(e)), t.options.onupdatesession(e), n(e)
                }, 0)) : n(e)
            })
        }, o.setCurrSession = function (e) {
            var t = this;
            e = "" + e, t.currSessionId = e, t.logger.info("session::setCurrSession:", e)
        }, o.findSession = function (e) {
            return this.sessionSet[e]
        }, o.resetSessionUnread = function (e) {
            function t() {
                n = {id: e, unread: 0}, r.onUpdateSession(n)
            }

            e = "" + e;
            var n, r = this, o = r.db;
            if (!r.findSession(e)) return void r.logger.warn("session::resetSessionUnread: no session " + e);
            if (o.enable && o.resetSessionUnread(e), !r.options.autoMarkRead && r.sessionUnreadMsgs && r.sessionUnreadMsgs[e]) {
                var s = r.sessionUnreadMsgs[e];
                r.markMsgRead(s, !0), r.sessionUnreadMsgs[e] = []
            }
            t()
        }, o.insertLocalSession = function (e) {
            var t = this, n = t.db, o = t.sessionSet;
            return new r(function (c, u) {
                var l = e.scene, m = e.to, d = l + "-" + m, f = t.findSession(d);
                if (f) u(a.sessionExist({callFunc: "session::insertLocalSession", session: f})); else {
                    var p;
                    if (s.isNumber(e.updateTime)) p = e.updateTime; else {
                        var g, y = [];
                        for (var h in o) o.hasOwnProperty(h) && (g = o[h], s.isNumber(g.updateTime) && y.push(g.updateTime));
                        p = Math.max.apply(Math, y) + 1, p = Math.max(p, +new Date)
                    }
                    var v = r.resolve();
                    n.enable && (v = n.getMsgs({sessionId: d, limit: 1})), v.then(function (e) {
                        if (s.isArray(e) && 1 === e.length) {
                            var r = e[0];
                            f = i.genSessionByMsg(r), f.updateTime = p
                        } else f = {id: d, scene: l, to: m, updateTime: p, lastMsg: null};
                        n.enable ? n.putSession(f).then(c, u) : c(f), t.onUpdateSession(f)
                    })
                }
            })
        }, o.updateLocalSession = function (e, t) {
            var n = this;
            return new r(function (o, i) {
                var c = n.db, u = n.findSession(e.id);
                if (u) {
                    var l = r.resolve(), m = s.filterObj(e, "id lastMsg localCustom");
                    c.enable && (l = c.updateSession(m)), l.then(function (e) {
                        return n.onUpdateSession(e, t)
                    }).then(o, function (e) {
                        i({callFunc: "session::updateLocalSession", event: e})
                    })
                } else i(a.sessionNotExist({sessionId: e.id, callFunc: "session::updateLocalSession"}))
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn;
        o.syncSessionAck = function (e) {
            var t = this, n = t.db, o = r.resolve();
            [[e.content.p2p, "p2p"], [e.content.team.m_map, "team"]].forEach(function (e) {
                var r = e[0], s = e[1];
                Object.keys(r).forEach(function (e) {
                    var i = s + "-" + e, a = {id: i, ack: r[e]};
                    n.enable && (o = o.then(function () {
                        return n.putSession(a)
                    }).then(function () {
                        t.markUnreadBySessionAck({sessionId: i, ack: r[e]})
                    })), t.mergeSession(a)
                })
            }), t.logger.warn("session::syncSessionAck: parse offline session ack", t.sessionSet);
            var s = e.content.timetag;
            n.enable && (o = o.then(function () {
                return t.db.updateSessionAck(s)
            })), o.cmd = "sessionAck", t.syncPromiseArray.push(o)
        }, o.onMarkSessionAck = function (e) {
            e.error || this.storeSessionAck(e.obj)
        }, o.syncMarkSessionAck = function (e) {
            this.storeSessionAck(e.content)
        }, o.storeSessionAck = function (e) {
            var t = this, n = t.options.syncSessionUnread;
            if (n) {
                var r = t.db, o = 0 === e.scene ? "p2p" : "team", s = o + "-" + e.to, i = e.timetag,
                    a = t.findSession(s) || {}, c = a.ack || 0;
                if (i <= c) return void t.logger.warn("session::storeSessionAck: ack <= ackInMemory", i);
                var u = {id: s, ack: i};
                t.mergeSession(u), r.enable && r.updateSession(u), t.logger.info("session::storeSessionAck:", u), t.markUnreadBySessionAck({
                    sessionId: s,
                    ack: u.ack
                })
            }
        }, o.markUnreadBySessionAck = function (e) {
            var t = e.sessionId, n = e.ack, r = this, o = r.db;
            if (o.enable) r.pushMsgTask(function () {
                return o.getMsgCountAfterAck({
                    shouldCountNotifyUnread: r.options.shouldCountNotifyUnread,
                    sessionId: t,
                    ack: n
                }).then(function (e) {
                    var n = {id: t, unread: e};
                    return r.logger.log("session::markUnreadBySessionAck: db.getMsgCountAfterAck done"), r.syncing && r.cacheSyncedSession(n), r.onUpdateSession(n), o.updateSession(n)
                })
            }); else {
                var s = r.findSession(t);
                if (s) {
                    var i = s.unreadMsgs;
                    if (i && i.length) {
                        for (var a = 0, c = [], u = i.length - 1; u >= 0; u--) {
                            var l = i[u];
                            if (!(l.time > n)) break;
                            a++, c.push(l)
                        }
                        s.unreadMsgs = c, s.unread = a, r.logger.info("session::markUnreadBySessionAck: unread " + a), r.onUpdateSession(s)
                    }
                }
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = n(27), a = s.undef, c = s.objs2ids, u = s.objs2accounts,
            l = s.teams2ids, m = n(102);
        o.beforeSync = function () {
            var e = this, t = e.db;
            return t.enable ? t.clearSendingMsgs() : r.resolve()
        },


        o.syncData = function () {
            function e(e) {
                t.syncPromiseArray = [], t.syncResult = {}, t.syncTeamMembersPromiseArray = [], t.syncTeamMembersResult = {}, s.verifyBooleanWithDefault(r, "syncRelations syncFriends syncFriendUsers syncTeams syncRoamingMsgs syncMsgReceipts syncExtraTeamInfo", !0, "", "sync::syncData"), s.verifyBooleanWithDefault(r, "syncFilter syncTeamMembers", !1, "", "sync::syncData");
                var n = {};
                e = e || {}, window._nimForceSyncIM && (t.logger.warn("sync::syncData: nimForceSyncIM"), delete e.teams, window._nimForceSyncIM = !1), n.myInfo = e.myInfo || 0, n.offlineMsgs = 0, r.syncRelations && (n.relations = e.relations || 0), r.syncFriends && (n.friends = e.friends || 0), r.syncFriendUsers && (n.friendUsers = e.friendUsers || 0), r.syncRobots && (n.robots = e.robots || 0), r.syncTeams && (n.teams = e.teams || 0), r.syncRoamingMsgs && (n.roamingMsgs = e.roamingMsgs || 0), r.syncMsgReceipts && (n.msgReceipts = e.msgReceipts || 0), r.syncExtraTeamInfo && (n.myTeamMembers = e.myTeamMembers || 0), r.syncSessionUnread && (n.sessionAck = e.sessionAck || 0), r.syncBroadcastMsgs && (n.broadcastMsgs = e.broadcastMsg || 0), n.donnop = e.donnop || 0, n.deleteMsg = e.deleteMsg || 0, r.syncFilter && (n.filterMsgs = 0), t.sendCmd("sync", {sync: n}, t.onSyncData.bind(t))
            }

            var t = this, n = t.db, r = t.options, o = n.enable;
            t.notifyLogin(), t.syncing = !0, o ? t.beforeSync().then(function () {
                return t.db.getTimetags()
            }).then(function (t) {
                e(t)
            }, function () {
                e()
            }) : e(t.timetags)
        },

        o.onSyncData = function (e, t) {
            e && this.syncRetryTimes > 3 && (this.syncRetryTimes = 0, e.callFunc = "sync::onSyncData", this.onCustomError("SYNC_DATA_ERROR", e))
        },

        o.processSync = function (e) {
            var t = this;
            switch (t.syncRetryTimes = t.syncRetryTimes || 0, t.syncRetryTimes++, e.cmd) {
                case"syncDone":
                    e.error ? t.syncRetryTimes > 3 || t.syncData() : (t.timetags.sync = e.content.timetag, t.onSyncDone());
                    break;
                case"syncTeamMembersDone":
                    t.onSyncTeamMembersDone()
            }
        },

        o.onSyncDone = function (e) {

              function t() {

                  B.logger.info("sync::notifyDataAsync: current session" , $.sessions);

                  if (!J) return void B.logger.warn("sync::onSyncDone: after sync --no promiseArray");
                if (B.logger.info("sync::onSyncDone: after sync", s.promises2cmds(J)), J = [], v = $.blacklist || [], b = $.invalidBlacklist || [], M = $.mutelist || [], T = $.invalidMutelist || [], k = $.friends, S = $.invalidFriends || [], w = $.myInfo, C = $.users, O = $.teams, I = $.invalidTeams || [], x = $.sessions, _ = $.msgReceipts, P = $.roamingMsgs, E = $.offlineMsgs, A = $.offlineFilterMsgs, R = $.offlineSysMsgs, F = $.offlineCustomSysMsgs, N = $.offlineFilterSysMsgs, U = $.offlineFilterCustomSysMsgs, D = $.broadcastMsgs, L = $.sysMsgUnread, x) {
                    var e = [];
                    Object.keys(x).forEach(function (t) {
                        e.push(x[t])
                    }),

                    x = e.sort(function (e, t) {
                        return t.updateTime - e.updateTime
                    })

                    B.logger.info("sync::notifyDataAsync: true" , x);

                }else {
                    B.logger.info("sync::notifyDataAsync: start false");
                }

                var t = r.resolve();
                W && (t = n().then(function (e) {
                    var t = {};
                    e.forEach(function (e) {
                        var n = e.sessionId;
                        t[n] || (t[n] = !0, B.markUnreadByMsgsPromise(n))
                    })
                })), t.then(function () {
                    W && !B.hasSynced && (B.hasSynced = !0, o());
                    var e = J.filter(function (e) {
                        return "sessionAck" === e.cmd
                    });
                    0 === e.length && e.push(r.resolve());
                    var t = J.filter(function (e) {
                        return "sessionAck" !== e.cmd
                    });
                    0 === t.length && t.push(r.resolve()), r.all(t).then(function () {
                        return r.all(e)
                    }).then(d).then(p, function (e) {
                        e.callFunc = "sync::onSyncDone", e.message = "taskAfterSync syncSessionAckPromise 出错", B.onCustomError("SYNC_SESSION_ACK_ERROR", e)
                    })
                })
            }

            function n() {
                var e, t = [], n = [];
                return P && P.forEach(function (e) {
                    n = [].concat(n, e.msgs)
                }), E && E.forEach(function (e) {
                    n = [].concat(n, e.msgs)
                }), e = q.putMsg(n), t.push(e), r.all(t).then(function () {
                    return n
                })
            }

            function o() {
                H.syncRelations && (h = q.getRelations().then(function (e) {
                    v = e[0], M = e[1], v.invalid = b, M.invalid = T
                }, function (e) {
                    return e._msg = "on relations error", e
                }), J.push(h)), H.syncFriends && (h = q.getFriends().then(function (e) {
                    k = e, k.invalid = S
                }, function (e) {
                    return e._msg = "on friends error", e
                }), J.push(h)), a(w) && (h = q.getUser(B.account).then(function (e) {
                    w = e
                }, function (e) {
                    return e._msg = "on myInfo error", e
                }), J.push(h)), H.syncFriendUsers && (h = q.getFriends().then(function (e) {
                    return e.map(function (e) {
                        return e.account
                    })
                }).then(function (e) {
                    return q.getUsers(e)
                }).then(function (e) {
                    C = e
                }, function (e) {
                    return e._msg = "on users error", e
                }), J.push(h)), H.syncTeams && (h = q.getTeams().then(function (e) {
                    O = e, O.invalid = I
                }, function (e) {
                    return e._msg = "on teams error", e
                }), J.push(h)), h = q.getTeamMembersByAccount(B.account).then(function (e) {
                    B.mergeMyTeamMembers(e)
                }), J.push(h), h = q.getDonnop().then(function (e) {
                    B.mergeDonnop(e)
                }), J.push(h), h = q.getSessions().then(function (e) {
                    x = e
                }, function (e) {
                    return e._msg = "on sessions error", e
                }), J.push(h), h = q.getSysMsgUnread().then(function (e) {
                    L = e
                }, function (e) {
                    return e._msg = "on sysMsgUnread error", e
                }), J.push(h)
            }

            function d() {
                B.logger.info("sync::onSyncDone: taskAfterSync"), f();
                var e = [];
                return e.push(B.deleteMsgOfflineRoaming($.deleteMsgSysMsgs, x)), r.all(e)
            }

            function f() {
                if ($.deleteMsgSysMsgs) {
                    var e = {};
                    P && P.forEach(function (t) {
                        e[t.sessionId] = t
                    });
                    var t = {};
                    E && E.forEach(function (e) {
                        t[e.sessionId] = e
                    });
                    var n = B.api;
                    $.deleteMsgSysMsgs.forEach(function (r) {
                        r.sysMsgs.forEach(function (r) {
                            var o = r.msg, s = o.sessionId;
                            [e, t].forEach(function (e) {
                                e[s] && (e[s].msgs = n.cutMsgs(e[s].msgs, o))
                            })
                        })
                    }), q.enable || [P, E].forEach(function (e) {
                        e && e.forEach(function (e) {
                            if (e.msgs.length) {
                                var t = B.genSessionByMsgs(e.msgs);
                                B.cacheSyncedSession(t), x = n.mergeSessions(x, t)
                            } else x = n.cutSessions(x, {id: e.sessionId})
                        })
                    })
                }
            }

            function p() {
                setTimeout(g, 0)
            }

            function g() {
                var e, t, n = [];
                v && (B.logger.info("sync::notifyDataAsync: on blacklist", u(v), v), H.onblacklist(v)), M && (B.logger.info("sync::notifyDataAsync: on mutelist", u(M), M), H.onmutelist(M)), k && (B.logger.info("sync::notifyDataAsync: on friends", u(k), k), H.onfriends(k)), w && (B.logger.info("sync::notifyDataAsync: on myInfo", w), B.myInfo = w, H.onmyinfo(s.copy(w))), C && (C.forEach(function (e) {
                    B.mergeUser(e)
                }), B.logger.info("sync::notifyDataAsync: on users", u(C), C), H.onusers(C)), O && (B.logger.info("sync::notifyDataAsync: on teams", l(O), O), H.onteams(O)),

                    B.logger.info("sync::notifyDataAsync: on users end", x),

                _ && (!B.hasSynced && x && x.length || B.hasSynced) && (x = B.mergeSessionAndMsgReceipts(x, _)),

                x && x.length &&
                (x.forEach(function (e) {
                    B.syncResult.sessions &&
                    B.syncResult.sessions[e.id] &&
                    "number" == typeof B.syncResult.sessions[e.id].unread &&
                    (e.unread = B.syncResult.sessions[e.id].unread), B.mergeSession(e), m.trim(e)
                }),
                    B.logger.info("sync::notifyDataAsync: start"),
                    B.logger.info("sync::notifyDataAsync: on sessions", c(x), x),
                    H.onsessions(x)),

                P && P.forEach(function (e) {
                        n.push(e.timetag), t = e.msgs, t.length
                        && (B.logger.info("sync::notifyDataAsync: on roaming msgs", e.sessionId, t.length, t),
                            H.onroamingmsgs(e))
                    }),

                E && E.forEach(function (e) {
                    n.push(e.timetag),
                        t = e.msgs, t.length &&
                        (B.logger.info("sync::notifyDataAsync: on offline msgs", e.sessionId, t.length, t), H.onofflinemsgs(e))
                }),

                A && A.forEach(function (e) {
                    n.push(e.timetag), t = e.msgs,
                    t.length &&
                    (B.logger.info("sync::notifyDataAsync: on offline filter msgs", e.sessionId, t.length, t),
                        H.onofflinefiltermsgs(t))
                });
                var r = [], o = [];
                $.deleteMsgSysMsgs && $.deleteMsgSysMsgs.forEach(function (e) {
                    "roaming" === e.type ? r = r.concat(e.sysMsgs) : o = o.concat(e.sysMsgs)
                }), r.length && (j = j || [], j = j.concat(r)), o.length && (R = R || [], R = R.concat(o)), j && (B.logger.info("sync::notifyDataAsync: on roaming sys msgs", j.length, j), H.onroamingsysmsgs(j)), R && (B.logger.info("sync::notifyDataAsync: on offline sys msgs", R.length, R), H.onofflinesysmsgs(R)), N && (B.logger.info("sync::notifyDataAsync: on offline filter sys msgs", N.length, N), H.onofflinefiltersysmsgs(N)), F && (B.logger.info("sync::notifyDataAsync: on offline custom sys msgs", F.length, F), H.onofflinecustomsysmsgs(F)), U && (B.logger.info("sync::notifyDataAsync: on offline filter custom sys msgs", U.length, U), H.onofflinefiltercustomsysmsgs(U)), L && (L = s.merge({}, B.sysMsgUnread, L), B.sysMsgUnread = s.merge({}, L), B.logger.info("sync::notifyDataAsync: on sysMsgUnread", L), H.onsysmsgunread(L));
                var i = B.getPushNotificationMultiportConfig();
                B.logger.info("sync::notifyDataAsync: on pushNotificationMultiportConfig", i), H.onPushNotificationMultiportConfig(i), n.length ? (e = Math.max.apply(Math, n), B.updateRoamingMsgTimetag(e).then(y, y)) : y(), B.syncPromiseArray = null, B.syncResult = null
            }

            function y() {
                if (B.processUnsettledMsgs(), B.processUnsettledSysMsgs(), B.syncing = !1, H.onsyncdone(), H.syncTeamMembers && O && O.length) throw new i("sync team members api deprecated!")
            }

            var h, v, b, M, T, k, S, w, C, O, I, x, _, P, E, A, j, R, F, N, U, D, L, B = this, q = B.db, W = q.enable,
                H = B.options, J = B.syncPromiseArray, $ = B.syncResult;
            if (J && J.length) {
                var X = J.filter(function (e) {
                    return "sessionAck" === e.cmd
                });
                0 === X.length && X.push(r.resolve());
                var V = J.filter(function (e) {
                    return "sessionAck" !== e.cmd
                });
                0 === V.length && V.push(r.resolve()), r.all(V).then(function () {
                    return r.all(X)
                }).then(t, function (e) {
                    e.callFunc = "sync::onSyncDone", e.message = "afterSync syncSessionAckPromise 出错", B.onCustomError("SYNC_SESSION_ACK_ERROR", e)
                })["catch"](function (e) {
                    B.syncData()
                })
            } else t()
        }, o.syncTeamMembers = function (e) {
            function t(t) {
                var r = {};
                t = t || {}, e.forEach(function (e) {
                    r[e.teamId] = 0
                }, n), n.sendCmd("syncTeamMembers", {sync: r}, n.onSyncTeamMembers.bind(n))
            }

            var n = this;
            t(n.timetags)
        }, o.onSyncTeamMembers = function (e, t) {
            e.callFunc = "sync::onSyncTeamMembers", e.message = "同步群成员错误", this.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
        }, o.onSyncTeamMembersDone = function () {
            function e() {
                l.logger.log("sync::onSyncTeamMembersDone: afterSync", s.promises2cmds(p)), p = [], m.enable && !l.hasSyncedTeamMembers ? (l.hasSyncedTeamMembers = !0, t()) : n()
            }

            function t() {
                return d.syncTeams && d.syncTeamMembers ? void m.getTeams().then(function (e) {
                    e.forEach(function (e) {
                        var t = e.teamId;
                        c = new r(function (e, n) {
                            l.api.getTeamMembers({
                                teamId: t, done: function (r, o) {
                                    r && n({
                                        callFunc: "sync::getTeamMembers: teamId-" + t,
                                        message: "sync team members error"
                                    }), f[t] = o.members || [], e()
                                }
                            })
                        }), p.push(c)
                    }), p.length ? r.all(p).then(n, function (e) {
                        e.callFunc = "sync::onSyncTeamMembersDone", e.message = "pullFullData promiseArray notifyData 错误", l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
                    }) : n()
                }, function (e) {
                    e.callFunc = "sync::onSyncTeamMembersDone", e.message = "pullFullData getTeams 错误", l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
                }) : a()
            }

            function n() {
                setTimeout(o, 0)
            }

            function o() {
                var e, t;
                Object.keys(f).forEach(function (n) {
                    n.indexOf("invalid") === -1 && (e = f[n], t = f[n + "-invalid"] || [], e.invalid = t, i(n, e))
                }), a()
            }

            function i(e, t) {
                l.logger.info("sync::onSyncTeamMembersDone: onTeamMembers", e, u(t), t), d.onteammembers({
                    teamId: e,
                    members: t
                })
            }

            function a() {
                l.logger.info("sync::onSyncTeamMembersDone: bingo"), d.onsyncteammembersdone(), l.syncTeamMembersResult = null, l.syncTeamMembersPromiseArray = null
            }

            var c, l = this, m = l.db, d = l.options, f = l.syncTeamMembersResult, p = l.syncTeamMembersPromiseArray;
            p.length ? r.all(p).then(e, function (e) {
                e.callFunc = "sync::onSyncTeamMembersDone", e.message = "同步群成员 syncTeamMembersPromiseArray 错误", l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
            })["catch"](function (t) {
                l.logger.log("sync::onSyncTeamMembersDone: syncTeamMembersPromiseArray promise ", t), e()
            }) : e()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = n(103);
        o.splitSysMsgs = function (e, t) {
            for (var n, r = e.length - 1; r >= 0; r--) n = e[r], i.isCustom(n) && (e.splice(r, 1), t.push(n))
        }, o.onOfflineSysMsgs = function (e, t) {
            var n = this, r = e.content.sysMsgs.map(function (e) {
                return e = i.reverse(e), t && (e.filter = !0), e
            });
            r = r.reverse(), n.markSysMsgRead(r);
            var o = [];
            n.splitSysMsgs(r, o);
            var s = t ? "offlineFilterSysMsgs" : "offlineSysMsgs",
                a = t ? "offlineFilterCustomSysMsgs" : "offlineCustomSysMsgs";
            if (r.length) {
                var c = n.putSysMsg(r, "offlineSysMsgs").then(function (e) {
                    r = e, r.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", s, r.length, r), n.syncResult[s] = n.syncResult[s] || [], n.syncResult[s] = n.syncResult[s].concat(r))
                });
                c.cmd = "sysMsgs", n.syncPromiseArray.push(c)
            }
            o.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", a, o), n.syncResult[a] = n.syncResult[a] || [], n.syncResult[a] = n.syncResult[a].concat(o))
        }, o.onSendSysMsg = function (e, t) {
            var n = this, r = e.obj;
            n.completeSysMsg(r), e.error ? r.status = "fail" : r.status = "success", r = i.reverse(r), t && (e.obj.filter = !0), e.obj = r
        }, o.completeSysMsg = function (e) {
            return e.from = this.account, e
        }, o.onSysMsg = function (e, t) {
            var n = this, r = i.reverse(e.content.sysMsg);
            n.markSysMsgRead(r), t && (r.filter = !0), i.isCustom(r) ? (n.logger.info("sysmsg::onSysMsg: on customSysMsg", r), n.options.oncustomsysmsg(r)) : n.syncing ? n.unhandledSysMsgs.push(r) : n.handleSysMsg(r)
        }, o.handleSysMsg = function (e) {
            var t = this, n = e.type, o = e.from;
            t.sysMsgPromise = t.sysMsgPromise.then(function () {
                return t.putSysMsg(e, "onSysMsg")
            }).then(function (t) {
                e = t[0]
            }).then(function () {
                if (e) {
                    var s, i = r.resolve();
                    switch (n) {
                        case"addFriend":
                            s = {type: "addFriend", account: o}, i = t.onFriendRequest(s);
                            break;
                        case"passFriendApply":
                            s = {type: "passFriendApply", account: o}, i = t.onFriendRequest(s);
                            break;
                        case"deleteFriend":
                            i = t.onDeleteFriend({account: o})
                    }
                    return s && s.friend && (e.friend = s.friend), i
                }
            }).then(function () {
                e && (t.logger.info("sysmsg::handleSysMsg: ", n, e), setTimeout(function () {
                    t.options.onsysmsg(e)
                }, 0))
            })
        }, o.putSysMsg = function (e, t) {
            if (s.isArray(e) || (e = [e]), e[0].filter) return r.resolve(e);
            var n = this, o = n.db, i = o.enable, a = r.resolve(), c = [];
            return a = a.then(function () {
                return i ? o.putSysMsg(e) : e
            }).then(function (t) {
                var r = [];
                e.forEach(function (e) {
                    n.checkSysMsgUnique(e) && r.push(e)
                }), e = r, c = i ? t : e
            }), a = a.then(function () {
                return n.getSysMsgUnread().then(function (r) {
                    return c.length || (c = e, c.backward = !0), n.updateSysMsgUnread(c, r, 1).then(function (e) {
                        "offlineSysMsgs" === t && (n.syncResult.sysMsgUnread = e), "onSysMsg" === t && n.onUpdateSysMsgUnread(e)
                    })
                })
            }), a.then(function () {
                return e
            })
        }, o.checkSysMsgUnique = s.genCheckUniqueFunc("idServer"), o.getSysMsgUnread = function () {
            var e = this, t = e.db;
            return new r(function (n) {
                t.enable ? t.getSysMsgUnread().then(function (e) {
                    n(e)
                }, function () {
                    n(e.sysMsgUnread)
                }) : n(e.sysMsgUnread)
            })
        }, o.updateSysMsgUnread = function (e, t, n) {
            if (s.isArray(e) || (e = [e]), !e.length) return r.resolve(t);
            t = t || {};
            var o, a = this, c = a.db;
            return e.forEach(function (e) {
                (n > 0 && !e.read || n < 0 && e.read) && (o = e.type, t[o] = (t[o] || 0) + n)
            }), t = i.completeUnread(t), a.sysMsgUnread = t, c.enable && !e.backward ? c.updateSysMsgUnread(t) : r.resolve(t)
        }, o.reduceSysMsgUnread = function (e) {
            var t = this;
            return t.getSysMsgUnread().then(function (n) {
                return t.updateSysMsgUnread(e, n, -1)
            }).then(function (e) {
                t.onUpdateSysMsgUnread(e)
            })
        }, o.onUpdateSysMsgUnread = function (e) {
            var t = this;
            setTimeout(function () {
                t.logger.info("sysmsg::onUpdateSysMsgUnread:", e), t.options.onupdatesysmsgunread(e)
            }, 0)
        }, o.updateSysMsg = function (e) {
            var t, n = this, o = n.db;
            t = o.enable ? o.updateSysMsg(e) : r.resolve(e), t.then(function (e) {
                n.onUpdateSysMsg(e)
            })
        }, o.onUpdateSysMsg = function (e) {
            var t = this;
            setTimeout(function () {
                s.isArray(e) || (e = [e]), e.forEach(function (e) {
                    t.logger.info("sysmsg::onUpdateSysMsg:", e), t.options.onupdatesysmsg(e)
                })
            }, 0)
        }, o.processUnsettledSysMsgs = function () {
            var e = this;
            e.unhandledSysMsgs.forEach(function (t) {
                e.handleSysMsg(t)
            }), e.resetUnsettledSysMsgs()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = s.objs2accounts, a = s.teams2ids, c = n(104), u = n(98);
        o.processTeam = function (e) {
            var t = this, n = e.error, r = void 0, o = void 0, s = void 0;
            switch (e.cmd) {
                case"createTeam":
                    if (r = e.obj.team, n || (r = e.content.team), r = c.reverse(r), e.obj.team = r, s = u.assembleOwner(r), e.obj.owner = s, !n) {
                        var i = {team: r, owner: s};
                        t.logger.info("team::processTeam: create team", i), t.options.onCreateTeam(i), t.onCreateTeam(r, s)
                    }
                    break;
                case"syncCreateTeam":
                    r = c.reverse(e.content.team), s = u.assembleOwner(r), t.logger.info("team::processTeam: sync createTeam", r, s), t.options.onsynccreateteam(r, s), t.onCreateTeam(r, s);
                    break;
                case"sendTeamMsg":
                    t.onSendMsg(e);
                    break;
                case"teamMsg":
                    t.onMsg(e);
                    break;
                case"teamMsgs":
                    t.onMsgs(e);
                    break;
                case"addTeamMembers":
                case"removeTeamMembers":
                case"leaveTeam":
                case"dismissTeam":
                case"addTeamManagers":
                case"removeTeamManagers":
                case"transferTeam":
                    break;
                case"updateInfoInTeam":
                    n || (o = e.obj, o.account = t.account, o.id = u.genId(o.teamId, o.account), o = u.reverse(o), e.obj = o, t.mergeMyTeamMembers(o), t.onUpdateTeamMember(o));
                    break;
                case"updateNickInTeam":
                    e.obj = u.reverse(e.obj);
                    break;
                case"updateTeam":
                    e.obj = c.reverse(e.obj, !0);
                    break;
                case"applyTeam":
                    e.error || (e.obj = c.reverse(e.content.team));
                    break;
                case"passTeamApply":
                    t.updateTeamSysMsgState(e, "passed");
                    break;
                case"rejectTeamApply":
                    t.updateTeamSysMsgState(e, "rejected");
                    break;
                case"acceptTeamInvite":
                    t.updateTeamSysMsgState(e, "passed"), e.error || (e.obj = c.reverse(e.content.team));
                    break;
                case"rejectTeamInvite":
                    t.updateTeamSysMsgState(e, "rejected");
                    break;
                case"getTeam":
                    e.error || (e.obj = c.reverse(e.content.team));
                    break;
                case"getTeams":
                    t.onTeams(e);
                    break;
                case"getTeamMembers":
                    t.onTeamMembers(e);
                    break;
                case"syncTeams":
                    t.onTeams(e);
                    break;
                case"syncTeamMembers":
                    t.onTeamMembers(e);
                    break;
                case"getTeamHistoryMsgs":
                case"searchTeamHistoryMsgs":
                    t.onHistoryMsgs(e);
                    break;
                case"syncSendTeamMsg":
                    t.onMsg(e);
                    break;
                case"notifyTeamMsgReads":
                    t.onTeamMsgReceipt(e);
                    break;
                case"syncUpdateTeamMember":
                    o = u.reverse(e.content.teamMember), t.onUpdateTeamMember(o), o.account === t.account && t.mergeMyTeamMembers(o);
                    break;
                case"updateMuteStateInTeam":
                    break;
                case"getMyTeamMembers":
                    e.error || (e.obj = u.reverseMembers(e.content.teamMembers));
                    break;
                case"getMutedTeamMembers":
                    e.error || (e.obj = {teamId: e.obj.teamId, members: u.reverseMembers(e.content.teamMembers)});
                    break;
                case"syncMyTeamMembers":
                    t.onSyncMyTeamMembers(e)
            }
        }, o.onCreateTeam = function (e, t) {
            var n = this.db;
            n.enable && (n.putTeam(e), n.putTeamMembers(t))
        }, o.onTeams = function (e) {
            function t() {
                d && m.forEach(function (e) {
                    e = c.reverse(e), e.validToCurrentUser ? f.push(e) : p.push(e)
                }), i.logger.info("team::onTeams: parseData", a(f), f, "invalid", a(p), p), m.length ? (d = !0, s = e.content.timetag) : d = !1
            }

            function n(t, n) {
                e.promise = new r(function (e, r) {
                    function a() {
                        l ? (o(), e(), t()) : u.getTeams().then(function (n) {
                            f = n, o(), e(), t()
                        }).then(void 0, function (e) {
                            e.message = "db.getTeams error", e.callFunc = "team::afterMergeData", r(e), n(e)
                        })
                    }

                    d ? u.mergeTeams(f, p, s).then(function () {
                        a()
                    }).then(void 0, function (e) {
                        var t = {callFunc: "team::onTeams:mergeData", message: "db.mergeTeams error", event: e};
                        r(t), n(t)
                    }) : (i.logger.warn("team::onTeams:mergeData: no teams need merge"), a())
                }).then(void 0, function (e) {
                    throw e.message = "merge teams data error", e.callFunc = "team::mergeData", n(e), e
                })
            }

            function o() {
                i.timetags.teams = s, f.invalid = p, l ? (i.syncResult.teams = f, i.syncResult.invalidTeams = p) : (i.logger.info("team::onTeams: not in syncing, get teams", a(f), f), e.obj = f)
            }

            e.content = e.content || {};
            var s, i = this, u = i.db, l = i.packetFromSync(e), m = e.content.teams || [], d = !0, f = [], p = [];
            if (e.error) switch (e.error.code) {
                case 803:
                    e.error = null, d = !1
            }
            var g = new r(function (r, s) {
                e.error ? l && s(e.error) : (t(), u.enable ? n(r, s) : (o(), r()))
            });
            l && (g.cmd = "teams", i.syncPromiseArray.push(g))
        }, o.onTeamMembers = function (e) {
            function t() {
                m && l.forEach(function (e) {
                    e = u.reverse(e), e.valid ? d.push(e) : f.push(e)
                }), a.logger.warn("team::onTeamMembers: parseData", s, i(d), d, "invalid", i(f), f), l.length ? (m = !0, o = e.content.timetag) : m = !1
            }

            function n() {
                d.invalid = f, c ? (a.syncTeamMembersResult[s] = d, a.syncTeamMembersResult[s + "-invalid"] = f, a.timetags["team-" + s] = o) : (a.logger.info("team::onTeamMembers: not syncing, get members", s, i(d), d), e.obj = {
                    teamId: s,
                    members: d
                })
            }

            e.content = e.content || {};
            var o, s, a = this, c = (a.db, a.packetFromSync(e)), l = e.content.members || [], m = !0, d = [], f = [];
            if (e.obj && (s = e.obj.teamId), s || (s = e.content.teamId), s = "" + s, e.error) switch (e.error.code) {
                case 406:
                    e.error = null, m = !1
            }
            var p = new r(function (r, o) {
                e.error ? c && o({
                    callFunc: "team::onTeamMembers",
                    event: e.error,
                    message: "teamId-" + s + " 获取群成员错误"
                }) : (t(), n(), r())
            });
            c && (p.cmd = s, a.syncTeamMembersPromiseArray.push(p))
        }, o.onUpdateTeamMember = function (e) {
            var t = this;
            e.updateTime || (e.updateTime = +new Date), t.logger.info("team::onUpdateTeamMember: ", e), t.options.onupdateteammember(s.simpleClone(e));
            var n = {teamId: e.teamId, memberUpdateTime: e.updateTime};
            t.onUpdateTeam(n);
            var r = this.db;
            r.enable && r.updateTeamMember(e)
        }, o.onUpdateTeam = function (e) {
            var t = this;
            t.logger.info("team::onUpdateTeam:", e), t.options.onUpdateTeam(s.simpleClone(e));
            var n = t.db;
            n.enable && n.updateTeam(e)
        }, o.onSyncMyTeamMembers = function (e) {
            var t = this, n = t.db, r = u.reverseMembers(e.content.teamMembers);
            if (t.logger.info("team::onSyncMyTeamMembers:", r), n.enable) {
                var o = n.putTeamMembers(r).then(function () {
                    return n.updateMyTeamMembersTimetag(e.content.timetag)
                });
                o.cmd = "myTeamMembers", t.syncTeamMembersPromiseArray.push(o)
            }
            t.mergeMyTeamMembers(r)
        }, o.mergeMyTeamMembers = function (e) {
            s.isArray(e) || (e = [e]);
            var t = this, n = t.myTeamMembersMap = t.myTeamMembersMap || {};
            e.forEach(function (e) {
                var t = e.teamId;
                n[t] = s.merge(n[t], e)
            }), t.logger.info("team::mergeMyTeamMembers:", n)
        }, o.notifyForNewTeamMsg = function (e) {
            s.isArray(e) || (e = [e]);
            var t = this, n = this.myTeamMembersMap || {}, o = {}, i = [];
            e.forEach(function (e) {
                s.exist(n[e]) ? o[e] = !n[e].muteTeam : i.push(e)
            });
            var a = r.resolve(o);
            return i.length && (a = t.api.getMyTeamMembers({teamIds: i, promise: !0}).then(function (e) {
                return t.mergeMyTeamMembers(e), e.forEach(function (e) {
                    o[e.teamId] = !e.muteTeam
                }), o
            })), a
        }, o.updateTeamSysMsgState = function (e, t) {
            var n, r = e.error;
            r && (t = "error", r = s.filterObj(r, "code message")), n = {
                idServer: e.obj.idServer,
                state: t
            }, r && (n.error = r), this.updateSysMsg(n)
        }, o.onTeamMsgReceipt = function (e) {
            var t = e.content, n = e.error;
            n && this.logger.error("team::onTeamMsgReceipt:", n), t && t.teamMsgReceipts && this.options.onTeamMsgReceipt(t)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(5).Promise, o = n(23).fn, s = n(1), i = s.objs2accounts, a = n(263), c = n(116);
        o.processUser = function (e) {
            var t, n = this, r = n.db, o = e.obj, s = e.error, i = e.content;
            switch (e.cmd) {
                case"markInBlacklist":
                    s || n.markInBlacklist(o);
                    break;
                case"syncMarkInBlacklist":
                    n.markInBlacklist(i, !0);
                    break;
                case"markInMutelist":
                    s || n.markInMutelist(o);
                    break;
                case"syncMarkInMutelist":
                    n.markInMutelist(i, !0);
                    break;
                case"getRelations":
                    s || n.onRelations(e);
                    break;
                case"syncMyInfo":
                    n.onMyInfo(e, !0);
                    break;
                case"updateMyInfo":
                    s || (o.updateTime = i.timetag, n.onUpdateMyInfo(e, o));
                    break;
                case"syncUpdateMyInfo":
                    n.onUpdateMyInfo(e, i.user, !0);
                    break;
                case"getUsers":
                    s || (t = i.users.map(function (e) {
                        return e = c.reverse(e), n.mergeUser(e), e
                    }), e.obj = t, r.enable && r.putUsers(t));
                    break;
                case"updateDonnop":
                    n.onUpdateDonnop(e);
                    break;
                case"syncUpdateDonnop":
                    n.onDonnop(e, !1)
            }
        }, o.onMyInfo = function (e) {
            function t() {
                m = c.reverse(u.user), s.logger.info("user::onMyInfo: parseData", m)
            }

            function n(e, t) {
                i.mergeMyInfo(m, l).then(function () {
                    o(), e()
                }).then(void 0, function (e) {
                    e.message = "db.mergeMyInfo error", e.callFunc = "user::onMyInfo", t(e)
                })
            }

            function o() {
                s.timetags.myInfo = m.updateTime, l && (s.syncResult.myInfo = m)
            }

            var s = this, i = s.db, a = e.error, u = e.content, l = !0, m = void 0, d = new r(function (e, r) {
                a ? l && (a && (a.callFunc = "user::onMyInfo"), e(a), s.syncData()) : (t(), i.enable ? n(e, r) : (o(), e()))
            });
            l && (d.cmd = "myInfo", s.syncPromiseArray.push(d))
        }, o.onUpdateMyInfo = function (e, t, n) {
            var r = this, o = r.db, i = c.reverse(t), a = s.merge(r.myInfo, i);
            r.myInfo = a, n ? (r.logger.info("user::onUpdateMyInfo:", a), r.options.onupdatemyinfo(a)) : e.obj = a, o.enable && (i.account = r.account, o.updateUser(i))
        }, o.onRelations = function (e) {
            function t() {
                m.forEach(function (e) {
                    e = a.parse(e);
                    var t = {account: e.account, createTime: e.createTime, updateTime: e.updateTime};
                    e.isBlacked ? p.push(t) : g.push(t), e.isMuted ? y.push(t) : h.push(t)
                }), s.logger.info("user::onRelations: parse blacklist", i(p), p, "delete", i(g), g), s.logger.info("user::onRelations: parse mutelist", i(y), y, "delete", i(h), h), m.length ? (d = !0, f = e.content.timetag) : d = !1
            }

            function n(t, n) {
                e.promise = new r(function (e, r) {
                    function i() {
                        l ? (o(), e(), t()) : c.getRelations().then(function (n) {
                            p = n[0], y = n[1], o(), e(), t()
                        }).then(void 0, function (e) {
                            e.message = "db.getRelations error", e.callFunc = "user::onRelations", r(e), n(e)
                        })
                    }

                    d ? c.mergeRelations(p, g, y, h, f).then(function () {
                        i()
                    }).then(void 0, function (e) {
                        e.message = "db.mergeRelations error", e.callFunc = "user::onRelations", r(e), n(e)
                    }) : (s.logger.warn("user::onRelations: no relations need merge"), i())
                }).then(void 0, function (e) {
                    throw e.message = "merge relations data error", e.callFunc = "user::onRelations", n(e), e
                })
            }

            function o() {
                s.timetags.relations = f, p.invalid = g, y.invalid = h, l ? (s.syncResult.blacklist = p, s.syncResult.mutelist = y, s.syncResult.invalidBlacklist = g, s.syncResult.invalidMutelist = h) : (s.logger.info("user::onRelations: get relations", p, y), e.obj.blacklist = p, e.obj.mutelist = y)
            }

            var s = this, c = s.db, u = e.error, l = s.packetFromSync(e), m = e.content.specialRelations, d = !0,
                f = void 0, p = [], g = [], y = [], h = [], v = new r(function (e, r) {
                    u ? l && (e(u), s.syncData()) : (t(), c.enable ? n(e, r) : (o(), e()))
                });
            l && (v.cmd = "relations", s.syncPromiseArray.push(v))
        }, o.markInBlacklist = function (e, t) {
            var n = this, r = n.db;
            e.record = {
                account: e.account,
                updateTime: +new Date
            }, r.enable && r.markInBlacklist(e), t && (n.logger.info("user::markInBlacklist:", e), n.options.onsyncmarkinblacklist(e))
        }, o.markInMutelist = function (e, t) {
            var n = this, r = n.db;
            e.record = {
                account: e.account,
                updateTime: +new Date
            }, r.enable && r.markInMutelist(e), t && (n.logger.info("user::markInMutelist:", e), n.options.onsyncmarkinmutelist(e))
        }, o.mergeUser = function (e) {
            this.userSet[e.account] = e
        }
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (e, t, n) {
        "use strict";
        var r = {NIM: n(208), Chatroom: n(207)}, o = n(141);
        o(r), e.exports = r
    }])
});