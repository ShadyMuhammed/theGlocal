(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

var _functions = require('./modules/functions');

var _functions2 = _interopRequireDefault(_functions);

var _helper = require('./modules/helper');

var _helper2 = _interopRequireDefault(_helper);

var _loadmore_media = require('./modules/loadmore_media');

var _loadmore_media2 = _interopRequireDefault(_loadmore_media);

var _floatSidebar = require('./libs/float-sidebar.min');

var _floatSidebar2 = _interopRequireDefault(_floatSidebar);

var _notificationCard = require('./components/notification-card');

var _notificationCard2 = _interopRequireDefault(_notificationCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {

  _functions2.default.expand_and_collapse('.header__burger', '.header__nav', 'active', 'active');
  openSearchWindow();
  // functions.header_cover();
  // functions.header_nav();
  // notify.hide();
  // if (helper.page_type() == "single") {
  //   functions.social_sharing();
  //   if (screen.width > 1024){
  //       floatIcons();
  //       floatSide();      
  //   }
  //   else{
  //     functions.fixed_icon();
  //   }
  // }

  _functions2.default.scroll_to_top();
};

var openSearchWindow = function openSearchWindow() {
  var open = document.querySelector('.header__cornerBtn .open'),
      close = document.querySelector('.header__cornerBtn .close'),
      searchWindow = document.getElementById('search-full-section'),
      menu = document.querySelector('.header'),
      searchInput = document.querySelector('.search-full-section__searchInput');
  if (open) {
    open.onclick = function () {
      this.classList.remove('active');
      close.classList.add('active');
      searchWindow.classList.add('active');
      searchInput.focus();
      menu.classList.remove('active');

      //html.classList.add('no-scroll')
    };
  }if (close) {
    close.onclick = function () {
      this.classList.remove('active');
      open.classList.add('active');
      searchWindow.classList.remove('active');
      //html.classList.remove('no-scroll')
    };
  }
};
var floatSide = function floatSide() {

  var sidebar = document.querySelector("aside");
  var content = document.querySelector(".layout-wrap");
  var floatSidebar = new _floatSidebar2.default({
    sidebar: sidebar,
    relative: content,
    topSpacing: 110,
    bottomSpacing: 70
  });
};
var floatIcons = function floatIcons() {

  var socialBox = document.querySelector(".social-box");
  var textContent = document.querySelector(".single-wrapper__content");
  var floatSidebar2 = new _floatSidebar2.default({
    sidebar: socialBox,
    relative: textContent,
    topSpacing: 300,
    bottomSpacing: 20
  });
};

},{"./components/notification-card":3,"./libs/float-sidebar.min":5,"./modules/functions":6,"./modules/helper":7,"./modules/loadmore_media":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var notify = {};

var hidden = document.querySelectorAll(".hide-notification");

notify.hide = function () {

    // setTimeout(()=>{
    //     let _notify = document.querySelector('.notify')
    //     if(_notify){
    //         document.querySelector(".notify").classList.add("active")
    //     }

    // },1000)
    for (var i = 0; i < hidden.length; ++i) {
        hidden[i].addEventListener("click", function () {
            var _notify = document.querySelector('.notify');
            if (_notify) {
                document.querySelector(".notify").classList.remove("active");
            }
        });
    }
};

exports.default = notify;

},{}],4:[function(require,module,exports){
(function (process){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function (e, t) {
	"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.axios = t() : e.axios = t();
}(undefined, function () {
	return function (e) {
		function t(r) {
			if (n[r]) return n[r].exports;var o = n[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
		}var n = {};return t.m = e, t.c = n, t.p = "", t(0);
	}([function (e, t, n) {
		e.exports = n(1);
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			var t = new s(e),
			    n = i(s.prototype.request, t);return o.extend(n, s.prototype, t), o.extend(n, t), n;
		}var o = n(2),
		    i = n(3),
		    s = n(5),
		    u = n(6),
		    a = r(u);a.Axios = s, a.create = function (e) {
			return r(o.merge(u, e));
		}, a.Cancel = n(23), a.CancelToken = n(24), a.isCancel = n(20), a.all = function (e) {
			return Promise.all(e);
		}, a.spread = n(25), e.exports = a, e.exports.default = a;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			return "[object Array]" === R.call(e);
		}function o(e) {
			return "[object ArrayBuffer]" === R.call(e);
		}function i(e) {
			return "undefined" != typeof FormData && e instanceof FormData;
		}function s(e) {
			var t;return t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
		}function u(e) {
			return "string" == typeof e;
		}function a(e) {
			return "number" == typeof e;
		}function c(e) {
			return "undefined" == typeof e;
		}function f(e) {
			return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
		}function p(e) {
			return "[object Date]" === R.call(e);
		}function d(e) {
			return "[object File]" === R.call(e);
		}function l(e) {
			return "[object Blob]" === R.call(e);
		}function h(e) {
			return "[object Function]" === R.call(e);
		}function m(e) {
			return f(e) && h(e.pipe);
		}function y(e) {
			return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
		}function w(e) {
			return e.replace(/^\s*/, "").replace(/\s*$/, "");
		}function g() {
			return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
		}function v(e, t) {
			if (null !== e && "undefined" != typeof e) if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && (e = [e]), r(e)) for (var n = 0, o = e.length; n < o; n++) {
				t.call(null, e[n], n, e);
			} else for (var i in e) {
				Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
			}
		}function x() {
			function e(e, n) {
				"object" == _typeof(t[n]) && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? t[n] = x(t[n], e) : t[n] = e;
			}for (var t = {}, n = 0, r = arguments.length; n < r; n++) {
				v(arguments[n], e);
			}return t;
		}function b(e, t, n) {
			return v(t, function (t, r) {
				n && "function" == typeof t ? e[r] = E(t, n) : e[r] = t;
			}), e;
		}var E = n(3),
		    C = n(4),
		    R = Object.prototype.toString;e.exports = { isArray: r, isArrayBuffer: o, isBuffer: C, isFormData: i, isArrayBufferView: s, isString: u, isNumber: a, isObject: f, isUndefined: c, isDate: p, isFile: d, isBlob: l, isFunction: h, isStream: m, isURLSearchParams: y, isStandardBrowserEnv: g, forEach: v, merge: x, extend: b, trim: w };
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t) {
			return function () {
				for (var n = new Array(arguments.length), r = 0; r < n.length; r++) {
					n[r] = arguments[r];
				}return e.apply(t, n);
			};
		};
	}, function (e, t) {
		function n(e) {
			return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
		}function r(e) {
			return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0));
		} /*!
    * Determine if an object is a Buffer
    *
    * @author   Feross Aboukhadijeh <https://feross.org>
    * @license  MIT
    */
		e.exports = function (e) {
			return null != e && (n(e) || r(e) || !!e._isBuffer);
		};
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			this.defaults = e, this.interceptors = { request: new s(), response: new s() };
		}var o = n(6),
		    i = n(2),
		    s = n(17),
		    u = n(18);r.prototype.request = function (e) {
			"string" == typeof e && (e = i.merge({ url: arguments[0] }, arguments[1])), e = i.merge(o, { method: "get" }, this.defaults, e), e.method = e.method.toLowerCase();var t = [u, void 0],
			    n = Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {
				t.unshift(e.fulfilled, e.rejected);
			}), this.interceptors.response.forEach(function (e) {
				t.push(e.fulfilled, e.rejected);
			}); t.length;) {
				n = n.then(t.shift(), t.shift());
			}return n;
		}, i.forEach(["delete", "get", "head", "options"], function (e) {
			r.prototype[e] = function (t, n) {
				return this.request(i.merge(n || {}, { method: e, url: t }));
			};
		}), i.forEach(["post", "put", "patch"], function (e) {
			r.prototype[e] = function (t, n, r) {
				return this.request(i.merge(r || {}, { method: e, url: t, data: n }));
			};
		}), e.exports = r;
	}, function (e, t, n) {
		"use strict";
		function r(e, t) {
			!i.isUndefined(e) && i.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
		}function o() {
			var e;return "undefined" != typeof XMLHttpRequest ? e = n(8) : "undefined" != typeof process && (e = n(8)), e;
		}var i = n(2),
		    s = n(7),
		    u = { "Content-Type": "application/x-www-form-urlencoded" },
		    a = { adapter: o(), transformRequest: [function (e, t) {
				return s(t, "Content-Type"), i.isFormData(e) || i.isArrayBuffer(e) || i.isBuffer(e) || i.isStream(e) || i.isFile(e) || i.isBlob(e) ? e : i.isArrayBufferView(e) ? e.buffer : i.isURLSearchParams(e) ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : i.isObject(e) ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;
			}], transformResponse: [function (e) {
				if ("string" == typeof e) try {
					e = JSON.parse(e);
				} catch (e) {}return e;
			}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {
				return e >= 200 && e < 300;
			} };a.headers = { common: { Accept: "application/json, text/plain, */*" } }, i.forEach(["delete", "get", "head"], function (e) {
			a.headers[e] = {};
		}), i.forEach(["post", "put", "patch"], function (e) {
			a.headers[e] = i.merge(u);
		}), e.exports = a;
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = function (e, t) {
			r.forEach(e, function (n, r) {
				r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2),
		    o = n(9),
		    i = n(12),
		    s = n(13),
		    u = n(14),
		    a = n(10),
		    c = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(15);e.exports = function (e) {
			return new Promise(function (t, f) {
				var p = e.data,
				    d = e.headers;r.isFormData(p) && delete d["Content-Type"];var l = new XMLHttpRequest(),
				    h = "onreadystatechange",
				    m = !1;if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in l || u(e.url) || (l = new window.XDomainRequest(), h = "onload", m = !0, l.onprogress = function () {}, l.ontimeout = function () {}), e.auth) {
					var y = e.auth.username || "",
					    w = e.auth.password || "";d.Authorization = "Basic " + c(y + ":" + w);
				}if (l.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l[h] = function () {
					if (l && (4 === l.readyState || m) && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:"))) {
						var n = "getAllResponseHeaders" in l ? s(l.getAllResponseHeaders()) : null,
						    r = e.responseType && "text" !== e.responseType ? l.response : l.responseText,
						    i = { data: r, status: 1223 === l.status ? 204 : l.status, statusText: 1223 === l.status ? "No Content" : l.statusText, headers: n, config: e, request: l };o(t, f, i), l = null;
					}
				}, l.onerror = function () {
					f(a("Network Error", e, null, l)), l = null;
				}, l.ontimeout = function () {
					f(a("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", l)), l = null;
				}, r.isStandardBrowserEnv()) {
					var g = n(16),
					    v = (e.withCredentials || u(e.url)) && e.xsrfCookieName ? g.read(e.xsrfCookieName) : void 0;v && (d[e.xsrfHeaderName] = v);
				}if ("setRequestHeader" in l && r.forEach(d, function (e, t) {
					"undefined" == typeof p && "content-type" === t.toLowerCase() ? delete d[t] : l.setRequestHeader(t, e);
				}), e.withCredentials && (l.withCredentials = !0), e.responseType) try {
					l.responseType = e.responseType;
				} catch (t) {
					if ("json" !== e.responseType) throw t;
				}"function" == typeof e.onDownloadProgress && l.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && l.upload && l.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
					l && (l.abort(), f(e), l = null);
				}), void 0 === p && (p = null), l.send(p);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(10);e.exports = function (e, t, n) {
			var o = n.config.validateStatus;n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n);
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(11);e.exports = function (e, t, n, o, i) {
			var s = new Error(e);return r(s, t, n, o, i);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t, n, r, o) {
			return e.config = t, n && (e.code = n), e.request = r, e.response = o, e;
		};
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		}var o = n(2);e.exports = function (e, t, n) {
			if (!t) return e;var i;if (n) i = n(t);else if (o.isURLSearchParams(t)) i = t.toString();else {
				var s = [];o.forEach(t, function (e, t) {
					null !== e && "undefined" != typeof e && (o.isArray(e) ? t += "[]" : e = [e], o.forEach(e, function (e) {
						o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), s.push(r(t) + "=" + r(e));
					}));
				}), i = s.join("&");
			}return i && (e += (e.indexOf("?") === -1 ? "?" : "&") + i), e;
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2),
		    o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];e.exports = function (e) {
			var t,
			    n,
			    i,
			    s = {};return e ? (r.forEach(e.split("\n"), function (e) {
				if (i = e.indexOf(":"), t = r.trim(e.substr(0, i)).toLowerCase(), n = r.trim(e.substr(i + 1)), t) {
					if (s[t] && o.indexOf(t) >= 0) return;"set-cookie" === t ? s[t] = (s[t] ? s[t] : []).concat([n]) : s[t] = s[t] ? s[t] + ", " + n : n;
				}
			}), s) : s;
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = r.isStandardBrowserEnv() ? function () {
			function e(e) {
				var t = e;return n && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname };
			}var t,
			    n = /(msie|trident)/i.test(navigator.userAgent),
			    o = document.createElement("a");return t = e(window.location.href), function (n) {
				var o = r.isString(n) ? e(n) : n;return o.protocol === t.protocol && o.host === t.host;
			};
		}() : function () {
			return function () {
				return !0;
			};
		}();
	}, function (e, t) {
		"use strict";
		function n() {
			this.message = "String contains an invalid character";
		}function r(e) {
			for (var t, r, i = String(e), s = "", u = 0, a = o; i.charAt(0 | u) || (a = "=", u % 1); s += a.charAt(63 & t >> 8 - u % 1 * 8)) {
				if (r = i.charCodeAt(u += .75), r > 255) throw new n();t = t << 8 | r;
			}return s;
		}var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype = new Error(), n.prototype.code = 5, n.prototype.name = "InvalidCharacterError", e.exports = r;
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = r.isStandardBrowserEnv() ? function () {
			return { write: function write(e, t, n, o, i, s) {
					var u = [];u.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), r.isString(o) && u.push("path=" + o), r.isString(i) && u.push("domain=" + i), s === !0 && u.push("secure"), document.cookie = u.join("; ");
				}, read: function read(e) {
					var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;
				}, remove: function remove(e) {
					this.write(e, "", Date.now() - 864e5);
				} };
		}() : function () {
			return { write: function write() {}, read: function read() {
					return null;
				}, remove: function remove() {} };
		}();
	}, function (e, t, n) {
		"use strict";
		function r() {
			this.handlers = [];
		}var o = n(2);r.prototype.use = function (e, t) {
			return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
		}, r.prototype.eject = function (e) {
			this.handlers[e] && (this.handlers[e] = null);
		}, r.prototype.forEach = function (e) {
			o.forEach(this.handlers, function (t) {
				null !== t && e(t);
			});
		}, e.exports = r;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			e.cancelToken && e.cancelToken.throwIfRequested();
		}var o = n(2),
		    i = n(19),
		    s = n(20),
		    u = n(6),
		    a = n(21),
		    c = n(22);e.exports = function (e) {
			r(e), e.baseURL && !a(e.url) && (e.url = c(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
				delete e.headers[t];
			});var t = e.adapter || u.adapter;return t(e).then(function (t) {
				return r(e), t.data = i(t.data, t.headers, e.transformResponse), t;
			}, function (t) {
				return s(t) || (r(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = function (e, t, n) {
			return r.forEach(n, function (n) {
				e = n(e, t);
			}), e;
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return !(!e || !e.__CANCEL__);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
			);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t) {
			return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
		};
	}, function (e, t) {
		"use strict";
		function n(e) {
			this.message = e;
		}n.prototype.toString = function () {
			return "Cancel" + (this.message ? ": " + this.message : "");
		}, n.prototype.__CANCEL__ = !0, e.exports = n;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new Promise(function (e) {
				t = e;
			});var n = this;e(function (e) {
				n.reason || (n.reason = new o(e), t(n.reason));
			});
		}var o = n(23);r.prototype.throwIfRequested = function () {
			if (this.reason) throw this.reason;
		}, r.source = function () {
			var e,
			    t = new r(function (t) {
				e = t;
			});return { token: t, cancel: e };
		}, e.exports = r;
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return function (t) {
				return e.apply(null, t);
			};
		};
	}]);
});


}).call(this,require('_process'))
},{"_process":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * float-sidebar - Lightweight, vanilla javascript library for making smart float sidebars
 * @version v1.1.0
 * @link https://github.com/vursen/FloatSidebar.js
 * @author Sergey Vinogradov
 * @license The MIT License (MIT)
 */
var sticky = {};

!function (t, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.FloatSidebar = n() : t.FloatSidebar = n();
}(window, function () {
  return function (t) {
    var n = {};function e(i) {
      if (n[i]) return n[i].exports;var o = n[i] = { i: i, l: !1, exports: {} };return t[i].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }return e.m = t, e.c = n, e.d = function (t, n, i) {
      e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: i });
    }, e.r = function (t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "", e(e.s = 0);
  }([function (t, n, e) {
    "use strict";
    e.r(n);var i,
        o = "START",
        r = "TOP_FIXED",
        s = "UNFIXED",
        u = "BOTTOM_FIXED",
        a = "FINISH";function p(t, n, e) {
      return n in t ? Object.defineProperty(t, n, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = e, t;
    }var c,
        f = (p(i = {}, o, [{ to: a, when: function when(t) {
        return [!0 === t.isSideInnerFitsPath, t.viewportTop + t.sideInnerHeight >= t.finishPoint];
      } }, { to: u, when: function when(t) {
        return [!0 === t.isSideInnerFitsPath, !1 === t.isSideInnerFitsViewport, t.viewportBottom >= t.sideInnerBottom + t.bottomSpacing];
      } }, { to: r, when: function when(t) {
        return [!0 === t.isSideInnerFitsPath, !0 === t.isSideInnerFitsViewport, t.viewportTop >= t.startPoint - t.topSpacing];
      } }]), p(i, r, [{ to: o, when: function when(t) {
        return [!1 === t.isSideInnerFitsPath];
      } }, { to: o, when: function when(t) {
        return [t.viewportTop <= t.startPoint - t.topSpacing];
      } }, { to: a, when: function when(t) {
        return [t.sideInnerBottom >= t.finishPoint];
      } }, { to: s, when: function when(t) {
        return ["down" === t.scrollDirection, !1 === t.isSideInnerFitsViewport];
      } }]), p(i, s, [{ to: o, when: function when(t) {
        return [!1 === t.isSideInnerFitsPath];
      } }, { to: r, when: function when(t) {
        return [t.viewportTop <= t.sideInnerTop - t.topSpacing];
      } }, { to: r, when: function when(t) {
        return [!0 === t.isSideInnerFitsViewport, t.viewportBottom >= t.sideInnerBottom + t.bottomSpacing];
      } }, { to: u, when: function when(t) {
        return [!1 === t.isSideInnerFitsViewport, t.viewportBottom >= t.sideInnerBottom + t.bottomSpacing];
      } }]), p(i, u, [{ to: o, when: function when(t) {
        return [!1 === t.isSideInnerFitsPath];
      } }, { to: s, when: function when(t) {
        return ["up" === t.scrollDirection];
      } }, { to: r, when: function when(t) {
        return [!0 === t.isSideInnerFitsViewport];
      } }, { to: a, when: function when(t) {
        return [t.sideInnerBottom >= t.finishPoint];
      } }]), p(i, a, [{ to: o, when: function when(t) {
        return [!1 === t.isSideInnerFitsPath];
      } }, { to: u, when: function when(t) {
        return [t.sideInnerBottom + t.bottomSpacing <= t.finishPoint, t.viewportBottom <= t.finishPoint];
      } }, { to: r, when: function when(t) {
        return [t.viewportTop <= t.sideInnerTop - t.topSpacing];
      } }]), i);function d(t, n, e) {
      return n in t ? Object.defineProperty(t, n, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = e, t;
    }var l = (d(c = {}, o, function (t, n) {
      var e = n.$sideInner;e.style.position = "absolute", e.style.top = "0", e.style.bottom = "auto";
    }), d(c, r, function (t, n) {
      var e = n.$sideInner;e.style.position = "fixed", e.style.top = t.topSpacing + "px", e.style.bottom = "auto";
    }), d(c, s, function (t, n) {
      var e = n.$sideInner;e.style.position = "absolute", e.style.top = t.sideInnerTop - t.startPoint + "px", e.style.bottom = "auto";
    }), d(c, u, function (t, n) {
      var e = n.$sideInner;e.style.position = "fixed", e.style.top = "auto", e.style.bottom = t.bottomSpacing + "px";
    }), d(c, a, function (t, n) {
      var e = n.$sideInner;e.style.position = "absolute", e.style.top = "auto", e.style.bottom = "0";
    }), c);var h = function h(t) {
      var n = t.actions,
          e = t.transitions,
          i = t.initialState;return { findTransitionFor: function findTransitionFor() {
          for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) {
            n[o] = arguments[o];
          }return e[i].find(function (t) {
            return t.when.apply(void 0, n).every(function (t) {
              return t;
            });
          });
        }, performTransition: function performTransition(t) {
          var e = t.to;return function () {
            i = e, n[e].apply(n, arguments);
          };
        } };
    };var v = function v(t) {
      var n = void 0;return function () {
        n || (n = requestAnimationFrame(function () {
          n = null, t();
        }));
      };
    },
        w = function w(t) {
      var n = t.clientHeight || t.innerHeight,
          e = t.scrollTop || t.pageYOffset;return { top: e, bottom: e + n, height: n };
    },
        m = function m(t, n) {
      var e = t.getBoundingClientRect();return { top: e.top + n, bottom: e.bottom + n, height: e.height };
    };var g = function g(t, n) {
      var e = n.$viewport,
          i = n.$relative,
          o = n.$sideInner,
          r = n.$sideOuter,
          s = n.topSpacing,
          u = n.bottomSpacing,
          a = {},
          p = function p() {
        var t,
            n = w(e),
            p = m(o, n.top),
            c = m(r, n.top),
            f = m(i, n.top),
            d = (t = n.top, a.viewportTop < t ? "down" : a.viewportTop > t ? "up" : "notChanged"),
            l = c.top,
            h = f.bottom,
            v = h - l,
            g = p.height + s + u < n.height,
            b = p.height < v,
            I = Math.max(p.height, v);return { startPoint: l, finishPoint: h, topSpacing: s, bottomSpacing: u, scrollDirection: d, isSideInnerFitsPath: b, isSideInnerFitsViewport: g, sideOuterHeight: I, viewportTop: n.top, viewportBottom: n.bottom, sideInnerTop: p.top, sideInnerBottom: p.bottom, sideInnerHeight: p.height };
      },
          c = v(function () {
        var n = p();t(a, n), a = n;
      });return { start: function start() {
          e.addEventListener("scroll", c), e.addEventListener("resize", c), c();
        }, stop: function stop() {
          e.removeEventListener("scroll", c), e.removeEventListener("resize", c);
        }, tick: c };
    };n.default = function (t) {
      var n = t.viewport || window,
          e = t.sidebar,
          i = t.sidebarInner || e.firstElementChild,
          r = t.relative,
          s = t.topSpacing || 0,
          u = t.bottomSpacing || 0,
          a = h({ actions: l, transitions: f, initialState: o }),
          p = g(function (t, n) {
        var o = a.findTransitionFor(n);o && a.performTransition(o)(n, { $sideInner: i, $sideOuter: e, $relative: r }), c(t, n);
      }, { $viewport: n, $sideOuter: e, $sideInner: i, $relative: r, topSpacing: s, bottomSpacing: u }),
          c = function c(t, n) {
        Math.abs((t.sideOuterHeight || 0) - n.sideOuterHeight) >= 1 && (e.style.height = n.sideOuterHeight + "px");
      };return requestAnimationFrame(function () {
        e.style.willChange = "height", i.style.width = "inherit", i.style.transform = "translateZ(0)", i.style.willChange = "transform", p.start();
      }), { forceUpdate: function forceUpdate() {
          p.tick();
        }, destroy: function destroy() {
          p.stop();
        } };
    };
  }]).default;
});

exports.default = sticky;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _helper = require("./helper");

var _helper2 = _interopRequireDefault(_helper);

var _loadmore_media = require("./loadmore_media");

var _loadmore_media2 = _interopRequireDefault(_loadmore_media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functions = {};

functions.expand_and_collapse = function (el_1, el_2, class_1, class_2) {
	el_1 = document.querySelector(el_1);
	if (el_1) {
		el_1.onclick = function () {
			el_1.classList.toggle(class_1);
			document.querySelector(el_2).classList.toggle(class_2);
		};
	}
};

functions.header_nav = function () {
	var header_links = document.querySelectorAll(".header__main-list-item a");
	if (_helper2.default.page_type() == "home") {
		header_links[0].classList.add("active");
	}
	if (_helper2.default.page_type() == "section") {
		switch (_helper2.default.selector_id('app-box').getAttribute("section-name")) {
			case "اخر الاخبار":
				header_links[1].classList.add("active");
				break;
			case "عرب":
				header_links[2].classList.add("active");
				break;
			case "تركى":
				header_links[3].classList.add("active");
				break;
			case "بوليود":
				header_links[4].classList.add("active");
				break;
			case "منوعات":
				header_links[5].classList.add("active");
				break;
			case "عالمي":
				header_links[6].classList.add("active");
				break;
			case "زمان":
				header_links[7].classList.add("active");
				break;
			case "رياضة":
				header_links[8].classList.add("active");
				break;
			default:

		}
	}
};
functions.header_cover = function () {
	var cover = _helper2.default.selector_query(".header__cover"),
	    _app = _helper2.default.selector_id("app"),
	    cover_cards = _helper2.default.selector_query_all(".top-cover"),
	    side_banner = _helper2.default.selector_query(".side-banner"),
	    _event = true,
	    mainSection = _helper2.default.selector_query(".main-section"),
	    main_header = _helper2.default.selector_query(".header");
	setTimeout(function () {
		if (screen.width >= 1024) {
			_app.style.marginTop = "305px";
		} else {
			for (var i = 0; i < cover_cards.length; i++) {
				cover_cards[i].classList.add("news-card--switch");
			}
			_app.style.marginTop = "464px";
		}

		// cover.classList.add("active");
		// main_header.style.position = "relative";
	}, 1000);
	window.onscroll = function () {
		if (window.innerHeight + window.scrollY >= mainSection.offsetHeight - 100 && _event == true && _helper2.default.page_type() == "single") {
			console.log("end of the page");
			_loadmore_media2.default.loadNews();
			_event = false;
		}
		if (screen.width >= 1024) {
			if (window.pageYOffset > 300 && window.pageYOffset < 350) {
				main_header.style.top = "-50px";
				main_header.style.position = "relative";
			} else if (window.pageYOffset >= 350) {
				side_banner.style.position = "fixed";
				side_banner.style.top = "80px";
				main_header.style.position = "fixed";
				main_header.style.top = "0px";
			} else {
				side_banner.style.top = "80px";
				side_banner.style.position = "absolute";
				main_header.style.position = "relative";
				main_header.style.top = "0px";
			}
		} else {
			if (window.pageYOffset >= 464) {
				main_header.style.position = "fixed";
				main_header.style.top = "0px";
				_helper2.default.selector_query(".header__nav").style.top = "59px";
			} else {
				main_header.style.position = "relative";
				main_header.style.top = "0px";
				_helper2.default.selector_query(".header__nav").style.top = "0px";
			}
		}
	};
};

functions.scroll_to_top = function () {
	var btn = document.querySelector(".footer__goup");
	btn.addEventListener('click', function () {
		scrollTo(document.body, document.body.offsetTop, 400);
	});
};
functions.fixed_icon = function () {

	var lastScrollTop = 0;
	var _content = _helper2.default.selector_id("single-wrapper");
	window.addEventListener("scroll", function () {
		// or window.addEventListener("scroll"....
		var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
		if (st > lastScrollTop) {
			// downscroll code
			_helper2.default.selector_query(".mob-icons").style.bottom = "-1px";
		} else {
			// upscroll code

			_helper2.default.selector_query(".mob-icons").style.bottom = "-50px";
		}
		lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	}, false);
};

// functions.lazy_load = () => {

// 	document.addEventListener("DOMContentLoaded", function () {
// 		var lazyloadImages;

// 		if ("IntersectionObserver" in window) {
// 			lazyloadImages = document.querySelectorAll("[data-src]");
// 			var imageObserver = new IntersectionObserver(function (entries, observer) {
// 				entries.forEach(function (entry) {
// 					if (entry.isIntersecting) {
// 						var image = entry.target;
// 						image.src = image.dataset.src;
// 						// image.classList.remove("lazy");
// 						imageObserver.unobserve(image);
// 					}
// 				});
// 			});

// 			lazyloadImages.forEach(function (image) {
// 				imageObserver.observe(image);
// 			});
// 		} else {
// 			var lazyloadThrottleTimeout;
// 			lazyloadImages = document.querySelectorAll(".news-card__img img");

// 			function lazyload() {
// 				if (lazyloadThrottleTimeout) {
// 					clearTimeout(lazyloadThrottleTimeout);
// 				}

// 				lazyloadThrottleTimeout = setTimeout(function () {
// 					var scrollTop = window.pageYOffset;
// 					lazyloadImages.forEach(function (img) {
// 						if (img.offsetTop < (window.innerHeight + scrollTop)) {
// 							img.src = img.dataset.src;
// 							// img.classList.remove('lazy');
// 						}
// 					});
// 					if (lazyloadImages.length == 0) {
// 						document.removeEventListener("scroll", lazyload);
// 						window.removeEventListener("resize", lazyload);
// 						window.removeEventListener("orientationChange", lazyload);
// 					}
// 				}, 20);
// 			}

// 			document.addEventListener("scroll", lazyload);
// 			window.addEventListener("resize", lazyload);
// 			window.addEventListener("orientationChange", lazyload);
// 		}
// 	})


// }
functions.social_sharing = function () {

	var fb_share = document.querySelectorAll(".fb"),
	    twtr_share = document.querySelectorAll(".twtr"),
	    wts_share = document.querySelectorAll(".wts");

	for (var i = 0; i < fb_share.length; ++i) {
		fb_share[i].addEventListener("click", function (e) {
			e.preventDefault();
			window.open("http://www.facebook.com/sharer/sharer.php?u=" + window.location.href, "_blank", "width=600,height=600");
		});
	}

	for (var _i = 0; _i < twtr_share.length; ++_i) {
		twtr_share[_i].addEventListener("click", function (e) {
			e.preventDefault();
			window.open("https://twitter.com/intent/tweet?text=" + window.location.href, "_blank", "width=400,height=400");
		});
	}

	for (var _i2 = 0; _i2 < wts_share.length; ++_i2) {
		wts_share[_i2].addEventListener("click", function (e) {
			e.preventDefault();
			window.open("whatsapp://send?text=" + window.location.href + "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600", "_blank", "width=400,height=400");
		});
	}
};

functions.navExplandAndCollapse = function (el_arrow, el_dropdown) {
	var arrow = document.querySelectorAll(el_arrow);
	var dropDown = document.querySelectorAll(el_dropdown);

	var _loop = function _loop(i) {
		arrow[i].addEventListener('click', function (e) {
			e.preventDefault();
			arrow[i].classList.toggle('active');
			dropDown[i].classList.toggle('active');
		});
	};

	for (var i = 0; i < arrow.length; i++) {
		_loop(i);
	}
};

functions.remove_empty_tags = function () {
	var all = document.querySelectorAll('.single-wrapper__article p');
	for (var i = 0; i < all.length; i++) {
		if (all[i].textContent == '' || all[i].textContent == null) {
			all[i].style.display = 'none';
		}
	}
};

exports.default = functions;

},{"./helper":7,"./loadmore_media":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _floatSidebar = require('../libs/float-sidebar.min');

var _floatSidebar2 = _interopRequireDefault(_floatSidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helper = {};

var d = document;

helper.selector_id = function (id) {
    return d.getElementById(id);
};

helper.selector_query = function (selector) {
    return d.querySelector(selector);
};

helper.selector_query_all = function (selector) {
    return d.querySelectorAll(selector);
};

//-- Sticky
// helper.stickySide = (o_aside,o_box) => {
// 	let sidebar = document.querySelector(o_aside);
// 	let content = document.querySelector(o_box);
// 	let floatSidebar = new sticky({
// 		sidebar: sidebar,
// 		relative: content,
// 		topSpacing: 140,
// 		bottomSpacing: 20
// 	});
// }

helper.page_type = function () {
    var app = document.getElementById('app-box');
    var type = app.getAttribute('data-src');
    return type;
};

var _baseUrl = location.origin;
// const _baseUrl = window.location.href


helper.add_loader = function (parent) {
    // parent = document.querySelector(parent)
    parent.innerHTML += '<div class="loader"></div>';
};

helper.remove_loader = function (parent, target) {

    if (target) {
        parent.removeChild(target);
    }
};

helper.no_data = function () {
    return '<div class="no-data">\n        <span class="icon">\n            \n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\nviewBox="0 0 492.308 492.308" style="enable-background:new 0 0 492.308 492.308;" xml:space="preserve">\n<g>\n<g>\n   <path d="M242.173,63.721L181.452,0H0v492.308h492.308V63.721H242.173z M472.615,472.615H19.692V19.692H173.01l60.721,63.721\n       h238.885V472.615z"/>\n</g>\n</g>\n<g>\n<g>\n   <polygon points="324,213.846 309.558,200.462 246.159,268.841 182.76,200.462 168.317,213.846 232.733,283.322 168.317,352.798 \n       182.76,366.183 246.159,297.803 309.558,366.183 324,352.798 259.585,283.322 \t\t"/>\n</g>\n</g>\n\n</svg>\n\n        </span>\n        <p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>\n    </div>';
};

exports.default = helper;

},{"../libs/float-sidebar.min":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require("./helper");

var _helper2 = _interopRequireDefault(_helper);

var _axios = require("../libs/axios.min");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadmore = {};
var _category = '';

var active_event = '';
var base_url = location.origin;
// let base_url = "https://new.gololy.com";
// let base_url = "https://cors-anywhere.herokuapp.com/https://new.gololy.com";


loadmore.loadNews = function () {
  var _wrapper = _helper2.default.selector_id("requested"),
      _id = _helper2.default.selector_id("single-wrapper").getAttribute("article-id"),
      _content = "";
  _helper2.default.add_loader(_wrapper);
  _axios2.default.get(base_url + "/api/scrollarticles/" + _id).then(function (res) {
    _helper2.default.remove_loader(_wrapper, _helper2.default.selector_query(".loader"));
    // console.log(res.data)
    for (var i = 0; i < res.data.length; i++) {
      _content += "\n                <div class=\"breadCrumb mt50\">\n              <div class=\"breadCrumb__list\"><span class=\"icon breadCrumb__home\">\n                  <svg id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                    <g>\n                      <g>\n                        <polygon points=\"256,152.96 79.894,288.469 79.894,470.018 221.401,470.018 221.401,336.973 296.576,336.973 296.576,470.018     432.107,470.018 432.107,288.469   \"></polygon>\n                      </g>\n                    </g>\n                    <g>\n                      <g>\n                        <polygon points=\"439.482,183.132 439.482,90.307 365.316,90.307 365.316,126.077 256,41.982 0,238.919 35.339,284.855     256,115.062 476.662,284.856 512,238.92   \"></polygon>\n                      </g>\n                    </g>\n                  </svg></span>\n                <li class=\"breadCrumb__item\"><a href=\"" + base_url + "\" class=\"breadCrumb__link\">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a></li><span class=\"icon\">\n                  <svg id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 492 492\" style=\"enable-background:new 0 0 492 492;\" xml:space=\"preserve\">\n                    <g>\n                      <g>\n                        <path d=\"M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z\"></path>\n                      </g>\n                    </g>\n                  </svg></span>\n                <li class=\"breadCrumb__item\"><a href=\"" + (base_url + "/" + res.data[i].section_data[0].url) + "\" class=\"breadCrumb__link\">" + res.data[i].section_data[0].name + "</a></li><span class=\"icon\">\n                  <svg id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 492 492\" style=\"enable-background:new 0 0 492 492;\" xml:space=\"preserve\">\n                    <g>\n                      <g>\n                        <path d=\"M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z\"></path>\n                      </g>\n                    </g>\n                  </svg></span>\n                <li class=\"breadCrumb__item\"><span class=\"breadCrumb__link\">" + res.data[i].title + "</span></li>\n              </div>\n            </div>\n                <div class=\"single-wrapper\" article-id='" + res.data[i].news_id + "'>\n                <div class=\"single-wrapper__title\">\n                  <h1>" + res.data[i].title + "</h1>\n                </div>\n                <div class=\"single-wrapper__status\">\n                <div class=\"status-cell\">\n                  <div class=\"status-cell__icon icon\">\n                    <svg id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                      <path d=\"M437.02,74.98C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.98C26.629,123.333,0,187.62,0,256    s26.629,132.667,74.98,181.02C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.98    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.98z M256,472c-119.103,0-216-96.897-216-216S136.897,40,256,40    s216,96.897,216,216S375.103,472,256,472z\"></path>\n                      <polygon points=\"276,236 276,76 236,76 236,276 388,276 388,236   \"></polygon>\n                    </svg>\n                  </div>\n                  <div class=\"status-cell__text\">" + res.data[i].publication_date + " </div>\n                </div>\n                <div class=\"status-cell\">\n                  <div class=\"status-cell__icon icon\">\n                    <svg id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 383.947 383.947\" style=\"enable-background:new 0 0 383.947 383.947;\" xml:space=\"preserve\">\n                      <polygon points=\"0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893    \"></polygon>\n                      <path d=\"M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04     C386.027,77.92,386.027,64.373,377.707,56.053z\"></path>\n                    </svg>\n                  </div>\n                  <div class=\"status-cell__text\">" + res.data[i].written + " </div>\n                </div>\n                <div class=\"status-cell\">\n                  <div class=\"status-cell__icon icon\">\n                    <svg id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 511.999 511.999\" style=\"enable-background:new 0 0 511.999 511.999;\" xml:space=\"preserve\">\n                      <g>\n                        <g>\n                          <path d=\"M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035    c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201    C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418    c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418    C447.361,287.923,358.746,385.406,255.997,385.406z\"></path>\n                        </g>\n                      </g>\n                      <g>\n                        <g>\n                          <path d=\"M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275    s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516    s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z\"></path>\n                        </g>\n                      </g>\n                    </svg>\n                  </div>\n                  <div class=\"status-cell__text\">" + res.data[i].hits_data.hits + "</div>\n                </div>\n              </div>\n                <div class=\"single-wrapper__img-holder mb25\"><img src=\"" + (base_url + "/images/800x500/" + res.data[i].main_img) + "\" alt=\"\"></div>\n                <div class=\"single-wrapper__article covered\">";
      for (var x = 0; x < res.data[i].content.length; x++) {
        _content += "<p> " + res.data[i].content[x] + "</p>";
      }
      _content += "<div class=\"single-wrapper__full-text\"><a href=\"" + (base_url + "/" + res.data[i].url) + "\">\u0627\u0644\u0645\u0642\u0627\u0644 \u0643\u0627\u0645\u0644</a></div>\n                </div>\n              </div>";
    }
    _wrapper.innerHTML = _content;
  });
};

// loadmore.init = () =>{


// }


exports.default = loadmore;

},{"../libs/axios.min":4,"./helper":7}]},{},[2]);
