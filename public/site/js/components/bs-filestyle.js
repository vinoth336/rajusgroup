/*!
 * bootstrap-fileinput v5.1.1
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2020, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
! function(e) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery) }(function(e) {
    "use strict";
    e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {}, String.prototype.setTokens = function(e) { var t, i, a = this.toString(); for (t in e) e.hasOwnProperty(t) && (i = new RegExp("{" + t + "}", "g"), a = a.replace(i, e[t])); return a }, Array.prototype.flatMap || (Array.prototype.flatMap = function(e) { return [].concat(this.map(e)) });
    var t, i;
    t = {
        FRAMES: ".kv-preview-thumb",
        SORT_CSS: "file-sortable",
        INIT_FLAG: "init-",
        OBJECT_PARAMS: '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',
        MODAL_ID: "kvFileinputModal",
        MODAL_EVENTS: ["show", "shown", "hide", "hidden", "loaded"],
        logMessages: { ajaxError: "{status}: {error}. Error Details: {text}.", badDroppedFiles: "Error scanning dropped files!", badExifParser: "Error loading the piexif.js library. {details}", badInputType: 'The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.', exifWarning: 'To avoid this warning, either set "autoOrientImage" to "false" OR ensure you have loaded the "piexif.js" library correctly on your page before the "fileinput.js" script.', invalidChunkSize: 'Invalid upload chunk size: "{chunkSize}". Resumable uploads are disabled.', invalidThumb: 'Invalid thumb frame with id: "{id}".', noResumableSupport: "The browser does not support resumable or chunk uploads.", noUploadUrl: 'The "uploadUrl" is not set. Ajax uploads and resumable uploads have been disabled.', retryStatus: "Retrying upload for chunk # {chunk} for {filename}... retry # {retry}." },
        objUrl: window.URL || window.webkitURL,
        now: function() { return new Date },
        round: function(e) { return e = parseFloat(e), isNaN(e) ? 0 : Math.floor(Math.round(e)) },
        getFileRelativePath: function(e) { return String(e.newPath || e.relativePath || e.webkitRelativePath || t.getFileName(e) || null) },
        getFileId: function(e, i) { var a = t.getFileRelativePath(e); return "function" == typeof i ? i(e) : e && a ? e.size + "_" + a.replace(/\s/gim, "_") : null },
        getFrameSelector: function(e, t) { return t = t || "", '[id="' + e + '"]' + t },
        getZoomSelector: function(e, t) { return t = t || "", '[id="zoom-' + e + '"]' + t },
        getFrameElement: function(e, i, a) { return e.find(t.getFrameSelector(i, a)) },
        getZoomElement: function(e, i, a) { return e.find(t.getZoomSelector(i, a)) },
        getElapsed: function(i) {
            var a = i,
                r = "",
                n = {},
                o = { year: 31536e3, month: 2592e3, week: 604800, day: 86400, hour: 3600, minute: 60, second: 1 };
            return t.getObjectKeys(o).forEach(function(e) { n[e] = Math.floor(a / o[e]), a -= n[e] * o[e] }), e.each(n, function(e, t) { t > 0 && (r += (r ? " " : "") + t + e.substring(0, 1)) }), r
        },
        debounce: function(e, t) {
            var i;
            return function() {
                var a = arguments,
                    r = this;
                clearTimeout(i), i = setTimeout(function() { e.apply(r, a) }, t)
            }
        },
        stopEvent: function(e) { e.stopPropagation(), e.preventDefault() },
        getFileName: function(e) { return e ? e.fileName || e.name || "" : "" },
        createObjectURL: function(e) { return t.objUrl && t.objUrl.createObjectURL && e ? t.objUrl.createObjectURL(e) : "" },
        revokeObjectURL: function(e) { t.objUrl && t.objUrl.revokeObjectURL && e && t.objUrl.revokeObjectURL(e) },
        compare: function(e, t, i) { return void 0 !== e && (i ? e === t : e.match(t)) },
        isIE: function(e) { var t, i; return "Microsoft Internet Explorer" !== navigator.appName ? !1 : 10 === e ? new RegExp("msie\\s" + e, "i").test(navigator.userAgent) : (t = document.createElement("div"), t.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", i = t.getElementsByTagName("i").length, document.body.appendChild(t), t.parentNode.removeChild(t), i) },
        canOrientImage: function(t) {
            var i = e(document.createElement("img")).css({ width: "1px", height: "1px" }).insertAfter(t),
                a = i.css("image-orientation");
            return i.remove(), !!a
        },
        canAssignFilesToInput: function() { var e = document.createElement("input"); try { return e.type = "file", e.files = null, !0 } catch (t) { return !1 } },
        getDragDropFolders: function(e) {
            var t, i, a = e ? e.length : 0,
                r = 0;
            if (a > 0 && e[0].webkitGetAsEntry())
                for (t = 0; a > t; t++) i = e[t].webkitGetAsEntry(), i && i.isDirectory && r++;
            return r
        },
        initModal: function(t) {
            var i = e("body");
            i.length && t.appendTo(i)
        },
        isFunction: function(e) { return "function" == typeof e },
        isEmpty: function(i, a) { return void 0 === i || null === i || !t.isFunction(i) && (0 === i.length || a && "" === e.trim(i)) },
        isArray: function(e) { return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e) },
        ifSet: function(e, t, i) { return i = i || "", t && "object" == typeof t && e in t ? t[e] : i },
        cleanArray: function(e) { return e instanceof Array || (e = []), e.filter(function(e) { return void 0 !== e && null !== e }) },
        spliceArray: function(t, i, a) {
            var r, n, o = 0,
                l = [];
            if (!(t instanceof Array)) return [];
            for (n = e.extend(!0, [], t), a && n.reverse(), r = 0; r < n.length; r++) r !== i && (l[o] = n[r], o++);
            return a && l.reverse(), l
        },
        getNum: function(e, t) { return t = t || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? t : e) },
        hasFileAPISupport: function() { return !(!window.File || !window.FileReader) },
        hasDragDropSupport: function() { var e = document.createElement("div"); return !t.isIE(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop) },
        hasFileUploadSupport: function() { return t.hasFileAPISupport() && window.FormData },
        hasBlobSupport: function() { try { return !!window.Blob && Boolean(new Blob) } catch (e) { return !1 } },
        hasArrayBufferViewSupport: function() { try { return 100 === new Blob([new Uint8Array(100)]).size } catch (e) { return !1 } },
        hasResumableUploadSupport: function() { return t.hasFileUploadSupport() && t.hasBlobSupport() && t.hasArrayBufferViewSupport() && (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || !1) },
        dataURI2Blob: function(e) {
            var i, a, r, n, o, l, s = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                d = t.hasBlobSupport(),
                c = (d || s) && window.atob && window.ArrayBuffer && window.Uint8Array;
            if (!c) return null;
            for (i = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), a = new ArrayBuffer(i.length), r = new Uint8Array(a), n = 0; n < i.length; n += 1) r[n] = i.charCodeAt(n);
            return o = e.split(",")[0].split(":")[1].split(";")[0], d ? new Blob([t.hasArrayBufferViewSupport() ? r : a], { type: o }) : (l = new s, l.append(a), l.getBlob(o))
        },
        arrayBuffer2String: function(e) {
            if (window.TextDecoder) return new TextDecoder("utf-8").decode(e);
            var t, i, a, r, n = Array.prototype.slice.apply(new Uint8Array(e)),
                o = "",
                l = 0;
            for (t = n.length; t > l;) switch (i = n[l++], i >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o += String.fromCharCode(i);
                    break;
                case 12:
                case 13:
                    a = n[l++], o += String.fromCharCode((31 & i) << 6 | 63 & a);
                    break;
                case 14:
                    a = n[l++], r = n[l++], o += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | (63 & r) << 0)
            }
            return o
        },
        isHtml: function(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            for (var i = t.childNodes, a = i.length; a--;)
                if (1 === i[a].nodeType) return !0;
            return !1
        },
        isSvg: function(e) { return e.match(/^\s*<\?xml/i) && (e.match(/<!DOCTYPE svg/i) || e.match(/<svg/i)) },
        getMimeType: function(e, t, i) {
            switch (e) {
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                    return "image/jpeg";
                case "89504e47":
                    return "image/png";
                case "47494638":
                    return "image/gif";
                case "49492a00":
                    return "image/tiff";
                case "52494646":
                    return "image/webp";
                case "66747970":
                    return "video/3gp";
                case "4f676753":
                    return "video/ogg";
                case "1a45dfa3":
                    return "video/mkv";
                case "000001ba":
                case "000001b3":
                    return "video/mpeg";
                case "3026b275":
                    return "video/wmv";
                case "25504446":
                    return "application/pdf";
                case "25215053":
                    return "application/ps";
                case "504b0304":
                case "504b0506":
                case "504b0508":
                    return "application/zip";
                case "377abcaf":
                    return "application/7z";
                case "75737461":
                    return "application/tar";
                case "7801730d":
                    return "application/dmg";
                default:
                    switch (e.substring(0, 6)) {
                        case "435753":
                            return "application/x-shockwave-flash";
                        case "494433":
                            return "audio/mp3";
                        case "425a68":
                            return "application/bzip";
                        default:
                            switch (e.substring(0, 4)) {
                                case "424d":
                                    return "image/bmp";
                                case "fffb":
                                    return "audio/mp3";
                                case "4d5a":
                                    return "application/exe";
                                case "1f9d":
                                case "1fa0":
                                    return "application/zip";
                                case "1f8b":
                                    return "application/gzip";
                                default:
                                    return t && !t.match(/[^\u0000-\u007f]/) ? "application/text-plain" : i
                            }
                    }
            }
        },
        addCss: function(e, t) { e.removeClass(t).addClass(t) },
        getElement: function(i, a, r) { return t.isEmpty(i) || t.isEmpty(i[a]) ? r : e(i[a]) },
        createElement: function(t, i) { return i = i || "div", e(e.parseHTML("<" + i + ">" + t + "</" + i + ">")) },
        uniqId: function() { return ((new Date).getTime() + Math.floor(Math.random() * Math.pow(10, 15))).toString(36) },
        parseEventCallback: function(e) { return Function("'use strict'; return (function() { " + e + " });")() },
        cspBuffer: {
            CSP_ATTRIB: "data-csp-01928735",
            domEventsList: ["mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mousewheel", "mouseout", "contextmenu", "touchstart", "touchmove", "touchend", "touchcancel", "keydown", "keypress", "keyup", "focus", "blur", "change", "submit", "scroll", "resize", "hashchange", "load", "unload", "cut", "copy", "paste"],
            domElementEvents: {},
            domElementsStyles: {},
            stash: function(i) {
                var a = this,
                    r = e.parseHTML("<div>" + i + "</div>"),
                    n = e(r);
                n.find("[style]").each(function(i, r) {
                    var n = e(r),
                        o = n.attr("style"),
                        l = t.uniqId(),
                        s = {};
                    o && o.length && (-1 === o.indexOf(";") && (o += ";"), o.slice(0, o.length - 1).split(";").map(function(e) { e = e.split(":"), e[0] && (s[e[0]] = e[1] ? e[1] : "") }), a.domElementsStyles[l] = s, n.removeAttr("style").attr(a.CSP_ATTRIB, l))
                }), n.filter("*").removeAttr("style"), e.each(a.domEventsList, function(e, i) {
                    var r, o, l = "on" + i,
                        s = n.find("[" + l + "]");
                    s.length && (o = t.parseEventCallback(s.attr(l)), s.attr(a.CSP_ATTRIB) ? r = s.attr(a.CSP_ATTRIB) : (r = t.uniqId(), a.domElementEvents[r] = []), a.domElementEvents[r].push({ name: i + ".csp", handler: o }), s.removeAttr(l).attr(a.CSP_ATTRIB, r))
                });
                var o = Object.values ? Object.values(r) : Object.keys(r).map(function(e) { return r[e] });
                return o.flatMap(function(e) { return e.innerHTML }).join("")
            },
            apply: function(t) {
                var i = this,
                    a = e(t);
                a.find("[" + i.CSP_ATTRIB + "]").each(function(t, a) {
                    var r = e(a),
                        n = r.attr(i.CSP_ATTRIB),
                        o = i.domElementsStyles[n],
                        l = i.domElementEvents[n];
                    o && r.css(o), l && e.each(l, function(e, t) { t && t.name && r.off(t.name).on(t.name, t.handler) }), r.removeAttr(i.CSP_ATTRIB)
                }), i.domElementsStyles = {}, i.domElementEvents = {}
            }
        },
        setHtml: function(e, i) { var a = t.cspBuffer; return e.html(a.stash(i)), a.apply(e), e },
        htmlEncode: function(e, t) { return void 0 === e ? t || null : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") },
        replaceTags: function(t, i) { var a = t; return i ? (e.each(i, function(e, t) { "function" == typeof t && (t = t()), a = a.split(e).join(t) }), a) : a },
        cleanMemory: function(e) {
            var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            t.revokeObjectURL(i)
        },
        findFileName: function(e) { var t = e.lastIndexOf("/"); return -1 === t && (t = e.lastIndexOf("\\")), e.split(e.substring(t, t + 1)).pop() },
        checkFullScreen: function() { return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement },
        toggleFullScreen: function(e) {
            var i = document,
                a = i.documentElement,
                r = t.checkFullScreen();
            a && e && !r ? a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : r && (i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen())
        },
        moveArray: function(t, i, a, r) {
            var n = e.extend(!0, [], t);
            if (r && n.reverse(), a >= n.length)
                for (var o = a - n.length; o-- + 1;) n.push(void 0);
            return n.splice(a, 0, n.splice(i, 1)[0]), r && n.reverse(), n
        },
        closeButton: function(e) { return e = e ? "close " + e : "close", '<button type="button" class="' + e + '" aria-label="Close">\n  <span aria-hidden="true">&times;</span>\n</button>' },
        getRotation: function(e) {
            switch (e) {
                case 2:
                    return "rotateY(180deg)";
                case 3:
                    return "rotate(180deg)";
                case 4:
                    return "rotate(180deg) rotateY(180deg)";
                case 5:
                    return "rotate(270deg) rotateY(180deg)";
                case 6:
                    return "rotate(90deg)";
                case 7:
                    return "rotate(90deg) rotateY(180deg)";
                case 8:
                    return "rotate(270deg)";
                default:
                    return ""
            }
        },
        setTransform: function(e, t) { e && (e.style.transform = t, e.style.webkitTransform = t, e.style["-moz-transform"] = t, e.style["-ms-transform"] = t, e.style["-o-transform"] = t) },
        getObjectKeys: function(t) { var i = []; return t && e.each(t, function(e) { i.push(e) }), i },
        getObjectSize: function(e) { return t.getObjectKeys(e).length },
        whenAll: function(i) {
            var a, r, n, o, l, s, d = [].slice,
                c = 1 === arguments.length && t.isArray(i) ? i : d.call(arguments),
                u = e.Deferred(),
                p = 0,
                f = c.length,
                g = f;
            for (n = o = l = Array(f), s = function(e, t, i) { return function() { i !== c && p++, u.notifyWith(t[e] = this, i[e] = d.call(arguments)), --g || u[(p ? "reject" : "resolve") + "With"](t, i) } }, a = 0; f > a; a++)(r = c[a]) && e.isFunction(r.promise) ? r.promise().done(s(a, l, c)).fail(s(a, n, o)) : (u.notifyWith(this, r), --g);
            return g || u.resolveWith(l, c), u.promise()
        }
    }, i = function(i, a) {
        var r = this;
        r.$element = e(i), r.$parent = r.$element.parent(), r._validate() && (r.isPreviewable = t.hasFileAPISupport(), r.isIE9 = t.isIE(9), r.isIE10 = t.isIE(10), (r.isPreviewable || r.isIE9) && (r._init(a), r._listen()), r.$element.removeClass("file-loading"))
    }, i.prototype = {
        constructor: i,
        _cleanup: function() {
            var e = this;
            e.reader = null, e.clearFileStack(), e.fileBatchCompleted = !0, e.isError = !1, e.isPersistentError = !1, e.cancelling = !1, e.paused = !1, e.lastProgress = 0, e._initAjax()
        },
        _isAborted: function() { var e = this; return e.cancelling || e.paused },
        _initAjax: function() {
            var i = this,
                a = i.taskManager = {
                    pool: {},
                    addPool: function(e) { return a.pool[e] = new a.TasksPool(e) },
                    getPool: function(e) { return a.pool[e] },
                    addTask: function(e, t) { return new a.Task(e, t) },
                    TasksPool: function(i) {
                        var r = this;
                        r.id = i, r.cancelled = !1, r.cancelledDeferrer = e.Deferred(), r.tasks = {}, r.addTask = function(e, t) { return r.tasks[e] = new a.Task(e, t) }, r.size = function() { return t.getObjectSize(r.tasks) }, r.run = function(i) {
                            var a, n, o, l = 0,
                                s = !1,
                                d = t.getObjectKeys(r.tasks).map(function(e) { return r.tasks[e] }),
                                c = [],
                                u = e.Deferred();
                            if (r.cancelled) return r.cancelledDeferrer.resolve(), u.reject();
                            if (!i) {
                                var p = t.getObjectKeys(r.tasks).map(function(e) { return r.tasks[e].deferred });
                                return t.whenAll(p).done(function() {
                                    var e = Array.from(arguments);
                                    r.cancelled ? (u.reject.apply(null, e), r.cancelledDeferrer.resolve()) : (u.resolve.apply(null, e), r.cancelledDeferrer.reject())
                                }).fail(function() {
                                    var e = Array.from(arguments);
                                    u.reject.apply(null, e), r.cancelled ? r.cancelledDeferrer.resolve() : r.cancelledDeferrer.reject()
                                }), e.each(r.tasks, function(e) { a = r.tasks[e], a.run() }), u
                            }
                            for (n = function(t) { e.when(t.deferred).fail(function() { s = !0, o.apply(null, arguments) }).always(o) }, o = function() { var e = Array.from(arguments); return u.notify(e), c.push(e), r.cancelled ? (u.reject.apply(null, c), void r.cancelledDeferrer.resolve()) : (c.length === r.size() && (s ? u.reject.apply(null, c) : u.resolve.apply(null, c)), void(d.length && (a = d.shift(), n(a), a.run()))) }; d.length && l++ < i;) a = d.shift(), n(a), a.run();
                            return u
                        }, r.cancel = function() { return r.cancelled = !0, r.cancelledDeferrer }
                    },
                    Task: function(t, i) {
                        var a = this;
                        a.id = t, a.deferred = e.Deferred(), a.logic = i, a.context = null, a.run = function() { var e = Array.from(arguments); return e.unshift(a.deferred), i.apply(a.context, e), a.deferred }, a.runWithContext = function(e) { return a.context = e, a.run() }
                    }
                };
            i.ajaxQueue = [], i.ajaxRequests = [], i.ajaxAborted = !1
        },
        _init: function(i, a) {
            var r, n, o, l, s = this,
                d = s.$element;
            s.options = i, s.canOrientImage = t.canOrientImage(d), e.each(i, function(e, i) {
                switch (e) {
                    case "minFileCount":
                    case "maxFileCount":
                    case "maxTotalFileCount":
                    case "minFileSize":
                    case "maxFileSize":
                    case "maxFilePreviewSize":
                    case "resizeImageQuality":
                    case "resizeIfSizeMoreThan":
                    case "progressUploadThreshold":
                    case "initialPreviewCount":
                    case "zoomModalHeight":
                    case "minImageHeight":
                    case "maxImageHeight":
                    case "minImageWidth":
                    case "maxImageWidth":
                        s[e] = t.getNum(i);
                        break;
                    default:
                        s[e] = i
                }
            }), s.maxTotalFileCount > 0 && s.maxTotalFileCount < s.maxFileCount && (s.maxTotalFileCount = s.maxFileCount), s.rtl && (l = s.previewZoomButtonIcons.prev, s.previewZoomButtonIcons.prev = s.previewZoomButtonIcons.next, s.previewZoomButtonIcons.next = l), !isNaN(s.maxAjaxThreads) && s.maxAjaxThreads < s.resumableUploadOptions.maxThreads && (s.resumableUploadOptions.maxThreads = s.maxAjaxThreads), s._initFileManager(), "function" == typeof s.autoOrientImage && (s.autoOrientImage = s.autoOrientImage()), "function" == typeof s.autoOrientImageInitial && (s.autoOrientImageInitial = s.autoOrientImageInitial()), a || s._cleanup(), s.duplicateErrors = [], s.$form = d.closest("form"), s._initTemplateDefaults(), s.uploadFileAttr = t.isEmpty(d.attr("name")) ? "file_data" : d.attr("name"), o = s._getLayoutTemplate("progress"), s.progressTemplate = o.replace("{class}", s.progressClass), s.progressInfoTemplate = o.replace("{class}", s.progressInfoClass), s.progressPauseTemplate = o.replace("{class}", s.progressPauseClass), s.progressCompleteTemplate = o.replace("{class}", s.progressCompleteClass), s.progressErrorTemplate = o.replace("{class}", s.progressErrorClass), s.isDisabled = d.attr("disabled") || d.attr("readonly"), s.isDisabled && d.attr("disabled", !0), s.isClickable = s.browseOnZoneClick && s.showPreview && (s.dropZoneEnabled || !t.isEmpty(s.defaultPreviewContent)), s.isAjaxUpload = t.hasFileUploadSupport() && !t.isEmpty(s.uploadUrl), s.dropZoneEnabled = t.hasDragDropSupport() && s.dropZoneEnabled, s.isAjaxUpload || (s.dropZoneEnabled = s.dropZoneEnabled && t.canAssignFilesToInput()), s.slug = "function" == typeof i.slugCallback ? i.slugCallback : s._slugDefault, s.mainTemplate = s.showCaption ? s._getLayoutTemplate("main1") : s._getLayoutTemplate("main2"), s.captionTemplate = s._getLayoutTemplate("caption"), s.previewGenericTemplate = s._getPreviewTemplate("generic"), !s.imageCanvas && s.resizeImage && (s.maxImageWidth || s.maxImageHeight) && (s.imageCanvas = document.createElement("canvas"), s.imageCanvasContext = s.imageCanvas.getContext("2d")), t.isEmpty(d.attr("id")) && d.attr("id", t.uniqId()), s.namespace = ".fileinput_" + d.attr("id").replace(/-/g, "_"), void 0 === s.$container ? s.$container = s._createContainer() : s._refreshContainer(), n = s.$container, s.$dropZone = n.find(".file-drop-zone"), s.$progress = n.find(".kv-upload-progress"), s.$btnUpload = n.find(".fileinput-upload"), s.$captionContainer = t.getElement(i, "elCaptionContainer", n.find(".file-caption")), s.$caption = t.getElement(i, "elCaptionText", n.find(".file-caption-name")), t.isEmpty(s.msgPlaceholder) || (r = d.attr("multiple") ? s.filePlural : s.fileSingle, s.$caption.attr("placeholder", s.msgPlaceholder.replace("{files}", r))), s.$captionIcon = s.$captionContainer.find(".file-caption-icon"), s.$previewContainer = t.getElement(i, "elPreviewContainer", n.find(".file-preview")), s.$preview = t.getElement(i, "elPreviewImage", n.find(".file-preview-thumbnails")), s.$previewStatus = t.getElement(i, "elPreviewStatus", n.find(".file-preview-status")), s.$errorContainer = t.getElement(i, "elErrorContainer", s.$previewContainer.find(".kv-fileinput-error")), s._validateDisabled(), t.isEmpty(s.msgErrorClass) || t.addCss(s.$errorContainer, s.msgErrorClass), a ? s._errorsExist() || s.$errorContainer.hide() : (s._resetErrors(), s.$errorContainer.hide(), s.previewInitId = "thumb-" + d.attr("id"), s._initPreviewCache(), s._initPreview(!0), s._initPreviewActions(), s.$parent.hasClass("file-loading") && (s.$container.insertBefore(s.$parent), s.$parent.remove())), s._setFileDropZoneTitle(), d.attr("disabled") && s.disable(), s._initZoom(), s.hideThumbnailContent && t.addCss(s.$preview, "hide-content")
        },
        _initFileManager: function() {
            var i = this;
            i.fileManager = {
                stack: {},
                filesProcessed: [],
                errors: [],
                loadedImages: {},
                totalImages: 0,
                totalFiles: null,
                totalSize: null,
                uploadedSize: 0,
                stats: {},
                initStats: function(e) {
                    var a = { started: t.now().getTime() };
                    e ? i.fileManager.stats[e] = a : i.fileManager.stats = a
                },
                getUploadStats: function(e, a, r) {
                    var n = i.fileManager,
                        o = e ? n.stats[e] && n.stats[e].started || null : null;
                    o || (o = t.now().getTime());
                    var l = (t.now().getTime() - o) / 1e3,
                        s = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s", "EB/s", "ZB/s", "YB/s"],
                        d = l ? a / l : 0,
                        c = i._getSize(d, s),
                        u = r - a,
                        p = { fileId: e, started: o, elapsed: l, loaded: a, total: r, bps: d, bitrate: c, pendingBytes: u };
                    return e ? n.stats[e] = p : n.stats = p, p
                },
                exists: function(t) { return -1 !== e.inArray(t, i.fileManager.getIdList()) },
                count: function() { return i.fileManager.getIdList().length },
                total: function() { var e = i.fileManager; return e.totalFiles || (e.totalFiles = e.count()), e.totalFiles },
                getTotalSize: function() {
                    var t = i.fileManager;
                    return t.totalSize ? t.totalSize : (t.totalSize = 0, e.each(i.fileManager.stack, function(e, i) {
                        var a = parseFloat(i.size);
                        t.totalSize += isNaN(a) ? 0 : a
                    }), t.totalSize)
                },
                add: function(e, a) { a || (a = i.fileManager.getId(e)), a && (i.fileManager.stack[a] = { file: e, name: t.getFileName(e), relativePath: t.getFileRelativePath(e), size: e.size, nameFmt: i._getFileName(e, ""), sizeFmt: i._getSize(e.size) }) },
                remove: function(e) {
                    var t = e.attr("data-fileid");
                    t && i.fileManager.removeFile(t)
                },
                removeFile: function(e) { delete i.fileManager.stack[e], delete i.fileManager.loadedImages[e] },
                move: function(t, a) {
                    var r = {},
                        n = i.fileManager.stack;
                    (t || a) && t !== a && (e.each(n, function(e, i) { e !== t && (r[e] = i), e === a && (r[t] = n[t]) }), i.fileManager.stack = r)
                },
                list: function() { var t = []; return e.each(i.fileManager.stack, function(e, i) { i && i.file && t.push(i.file) }), t },
                isPending: function(t) { return -1 === e.inArray(t, i.fileManager.filesProcessed) && i.fileManager.exists(t) },
                isProcessed: function() {
                    var t = !0,
                        a = i.fileManager;
                    return e.each(a.stack, function(e) { a.isPending(e) && (t = !1) }), t
                },
                clear: function() {
                    var e = i.fileManager;
                    i.isPersistentError = !1, e.totalFiles = null, e.totalSize = null, e.uploadedSize = 0, e.stack = {}, e.errors = [], e.filesProcessed = [], e.stats = {}, e.clearImages()
                },
                clearImages: function() { i.fileManager.loadedImages = {}, i.fileManager.totalImages = 0 },
                addImage: function(e, t) { i.fileManager.loadedImages[e] = t },
                removeImage: function(e) { delete i.fileManager.loadedImages[e] },
                getImageIdList: function() { return t.getObjectKeys(i.fileManager.loadedImages) },
                getImageCount: function() { return i.fileManager.getImageIdList().length },
                getId: function(e) { return i._getFileId(e) },
                getIndex: function(e) { return i.fileManager.getIdList().indexOf(e) },
                getThumb: function(t) {
                    var a = null;
                    return i._getThumbs().each(function() {
                        var i = e(this);
                        i.attr("data-fileid") === t && (a = i)
                    }), a
                },
                getThumbIndex: function(e) { var t = e.attr("data-fileid"); return i.fileManager.getIndex(t) },
                getIdList: function() { return t.getObjectKeys(i.fileManager.stack) },
                getFile: function(e) { return i.fileManager.stack[e] || null },
                getFileName: function(e, t) { var a = i.fileManager.getFile(e); return a ? t ? a.nameFmt || "" : a.name || "" : "" },
                getFirstFile: function() {
                    var e = i.fileManager.getIdList(),
                        t = e && e.length ? e[0] : null;
                    return i.fileManager.getFile(t)
                },
                setFile: function(e, t) { i.fileManager.getFile(e) ? i.fileManager.stack[e].file = t : i.fileManager.add(t, e) },
                setProcessed: function(e) { i.fileManager.filesProcessed.push(e) },
                getProgress: function() {
                    var e = i.fileManager.total(),
                        t = i.fileManager.filesProcessed.length;
                    return e ? Math.ceil(t / e * 100) : 0
                },
                setProgress: function(e, t) { var a = i.fileManager.getFile(e);!isNaN(t) && a && (a.progress = t) }
            }
        },
        _setUploadData: function(i, a) {
            var r = this;
            e.each(a, function(e, a) {
                var n = r.uploadParamNames[e] || e;
                t.isArray(a) ? i.append(n, a[0], a[1]) : i.append(n, a)
            })
        },
        _initResumableUpload: function() {
            var i = this,
                a = i.resumableUploadOptions,
                r = t.logMessages;
            if (i.enableResumableUpload) {
                if (a.fallback !== !1 && "function" != typeof a.fallback && (a.fallback = function(e) { e._log(r.noResumableSupport), e.enableResumableUpload = !1 }), !t.hasResumableUploadSupport() && a.fallback !== !1) return void a.fallback(i);
                if (!i.uploadUrl && i.enableResumableUpload) return i._log(r.noUploadUrl), void(i.enableResumableUpload = !1);
                if (a.chunkSize = parseFloat(a.chunkSize), a.chunkSize <= 0 || isNaN(a.chunkSize)) return i._log(r.invalidChunkSize, { chunkSize: a.chunkSize }), void(i.enableResumableUpload = !1);
                i.resumableManager = {
                    init: function(e, t, a) {
                        var r = i.resumableManager,
                            n = i.fileManager;
                        r.logs = [], r.stack = [], r.error = "", r.id = e, r.file = t.file, r.fileName = t.name, r.fileIndex = a, r.completed = !1, r.testing = !1, r.lastProgress = 0, i.showPreview && (r.$thumb = n.getThumb(e) || null, r.$progress = r.$btnDelete = null, r.$thumb && r.$thumb.length && (r.$progress = r.$thumb.find(".file-thumb-progress"), r.$btnDelete = r.$thumb.find(".kv-file-remove"))), r.chunkSize = 1024 * i.resumableUploadOptions.chunkSize, r.chunkCount = r.getTotalChunks()
                    },
                    logAjaxError: function(e, t, a) { i.resumableUploadOptions.showErrorLog && i._log(r.ajaxError, { status: e.status, error: a, text: e.responseText || "" }) },
                    reset: function() {
                        var e = i.resumableManager;
                        e.stack = [], e.chunksProcessed = {}
                    },
                    setProcessed: function(e) {
                        var t, a = i.resumableManager,
                            r = i.fileManager,
                            n = a.id,
                            o = a.$thumb,
                            l = a.$progress,
                            s = o && o.length,
                            d = { id: s ? o.attr("id") : "", index: r.getIndex(n), fileId: n };
                        a.completed = !0, a.lastProgress = 0, s && o.removeClass("file-uploading"), "success" === e ? (r.uploadedSize += a.file.size, i.showPreview && (i._setProgress(101, l), i._setThumbStatus(o, "Success"), i._initUploadSuccess(a.chunksProcessed[n].data, o)), i.fileManager.removeFile(n), delete a.chunksProcessed[n], i._raise("fileuploaded", [d.id, d.index, d.fileId]), r.isProcessed() && i._setProgress(101)) : "cancel" !== e && (i.showPreview && (i._setThumbStatus(o, "Error"), i._setPreviewError(o, !0), i._setProgress(101, l, i.msgProgressError), i._setProgress(101, i.$progress, i.msgProgressError), i.cancelling = !0), i.$errorContainer.find('li[data-file-id="' + d.fileId + '"]').length || (t = i.msgResumableUploadRetriesExceeded.setTokens({ file: a.fileName, max: i.resumableUploadOptions.maxRetries, error: a.error }), i._showFileError(t, d))), r.isProcessed() && a.reset()
                    },
                    check: function() {
                        var t = i.resumableManager,
                            a = !0;
                        e.each(t.logs, function(e, t) { return t ? void 0 : (a = !1, !1) })
                    },
                    processedResumables: function() {
                        var e, t = i.resumableManager.logs,
                            a = 0;
                        if (!t || !t.length) return 0;
                        for (e = 0; e < t.length; e++) t[e] === !0 && a++;
                        return a
                    },
                    getUploadedSize: function() {
                        var e = i.resumableManager,
                            t = e.processedResumables() * e.chunkSize;
                        return t > e.file.size ? e.file.size : t
                    },
                    getTotalChunks: function() {
                        var e = i.resumableManager,
                            t = parseFloat(e.chunkSize);
                        return !isNaN(t) && t > 0 ? Math.ceil(e.file.size / t) : 0
                    },
                    getProgress: function() {
                        var e = i.resumableManager,
                            t = e.processedResumables(),
                            a = e.chunkCount;
                        return 0 === a ? 0 : Math.ceil(t / a * 100)
                    },
                    checkAborted: function(e) { i._isAborted() && (clearInterval(e), i.unlock()) },
                    upload: function() {
                        var e, a = i.resumableManager,
                            r = i.fileManager,
                            n = r.getIdList(),
                            o = "new";
                        e = setInterval(function() {
                            var l;
                            if (a.checkAborted(e), "new" === o && (i.lock(), o = "processing", l = n.shift(), r.initStats(l), r.stack[l] && (a.init(l, r.stack[l], r.getIndex(l)), a.testUpload(), a.uploadResumable())), !r.isPending(l) && a.completed && (o = "new"), r.isProcessed()) {
                                var s = i.$preview.find(".file-preview-initial");
                                s.length && (t.addCss(s, t.SORT_CSS), i._initSortable()), clearInterval(e), i._clearFileInput(), i.unlock(), setTimeout(function() {
                                    var e = i.previewCache.data;
                                    e && (i.initialPreview = e.content, i.initialPreviewConfig = e.config, i.initialPreviewThumbTags = e.tags), i._raise("filebatchuploadcomplete", [i.initialPreview, i.initialPreviewConfig, i.initialPreviewThumbTags, i._getExtraData()])
                                }, i.processDelay)
                            }
                        }, i.processDelay)
                    },
                    uploadResumable: function() {
                        var e, t, a = i.taskManager,
                            r = i.resumableManager,
                            n = r.chunkCount;
                        for (t = a.addPool(r.id), e = 0; n > e; e++) r.logs[e] = !(!r.chunksProcessed[r.id] || !r.chunksProcessed[r.id][e]), r.logs[e] || r.pushAjax(e, 0);
                        r.testing || t.run(i.resumableUploadOptions.maxThreads).done(function() { r.setProcessed("success") }).fail(function() { t.cancelled ? r.setProcessed("cancel") : r.setProcessed("error") })
                    },
                    testUpload: function() {
                        var a, r, n, o, l, s, d, c = i.resumableManager,
                            u = i.resumableUploadOptions,
                            p = i.fileManager,
                            f = c.id;
                        return u.testUrl ? (c.testing = !0, a = new FormData, r = p.stack[f], i._setUploadData(a, { fileId: f, fileName: r.fileName, fileSize: r.size, fileRelativePath: r.relativePath, chunkSize: c.chunkSize, chunkCount: c.chunkCount }), n = function(e) { d = i._getOutData(a, e), i._raise("filetestbeforesend", [f, p, c, d]) }, o = function(r, n, o) {
                            d = i._getOutData(a, o, r);
                            var l = i.uploadParamNames,
                                s = l.chunksUploaded || "chunksUploaded",
                                u = [f, p, c, d];
                            r[s] && t.isArray(r[s]) ? (c.chunksProcessed[f] || (c.chunksProcessed[f] = {}), e.each(r[s], function(e, t) { c.logs[t] = !0, c.chunksProcessed[f][t] = !0 }), c.chunksProcessed[f].data = r, i._raise("filetestsuccess", u)) : i._raise("filetesterror", u), c.testing = !1
                        }, l = function(e, t, r) { d = i._getOutData(a, e), i._raise("filetestajaxerror", [f, p, c, d]), c.logAjaxError(e, t, r), c.testing = !1 }, s = function() { i._raise("filetestcomplete", [f, p, c, i._getOutData(a)]), c.testing = !1 }, void i._ajaxSubmit(n, o, s, l, a, f, c.fileIndex, u.testUrl)) : void(c.testing = !1)
                    },
                    pushAjax: function(e, t) {
                        var a = i.taskManager,
                            r = i.resumableManager,
                            n = a.getPool(r.id);
                        n.addTask(n.size() + 1, function(e) {
                            var t, a = r.stack.shift();
                            t = a[0], r.chunksProcessed[r.id] && r.chunksProcessed[r.id][t] ? i._log("Could not push task to ajax pool for chunk index # " + t) : r.sendAjax(t, a[1], e)
                        }), r.stack.push([e, t])
                    },
                    sendAjax: function(e, a, n) {
                        var o, l = i.fileManager,
                            s = i.resumableManager,
                            d = i.resumableUploadOptions,
                            c = s.chunkSize,
                            u = s.id,
                            p = s.file,
                            f = s.$thumb,
                            g = s.$btnDelete;
                        if (!s.chunksProcessed[u] || !s.chunksProcessed[u][e]) {
                            if (a > d.maxRetries) return n.reject("max try reached"), void s.setProcessed("error");
                            var m, h, v, w, b, _, C = p.slice ? "slice" : p.mozSlice ? "mozSlice" : p.webkitSlice ? "webkitSlice" : "slice",
                                y = p[C](c * e, c * (e + 1));
                            m = new FormData, o = l.stack[u], i._setUploadData(m, { chunkCount: s.chunkCount, chunkIndex: e, chunkSize: c, chunkSizeStart: c * e, fileBlob: [y, s.fileName], fileId: u, fileName: s.fileName, fileRelativePath: o.relativePath, fileSize: p.size, retryCount: a }), s.$progress && s.$progress.length && s.$progress.show(), v = function(r) { h = i._getOutData(m, r), i.showPreview && (f.hasClass("file-preview-success") || (i._setThumbStatus(f, "Loading"), t.addCss(f, "file-uploading")), g.attr("disabled", !0)), i._raise("filechunkbeforesend", [u, e, a, l, s, h]) }, w = function(t, o, d) {
                                if (i._isAborted()) return void n.reject("cancelling");
                                h = i._getOutData(m, d, t);
                                var c = i.uploadParamNames,
                                    p = c.chunkIndex || "chunkIndex",
                                    f = i.resumableUploadOptions,
                                    g = [u, e, a, l, s, h];
                                t.error ? (f.showErrorLog && i._log(r.retryStatus, { retry: a + 1, filename: s.fileName, chunk: e }), s.pushAjax(e, a + 1), s.error = t.error, i._raise("filechunkerror", g)) : (s.logs[t[p]] = !0, s.chunksProcessed[u] || (s.chunksProcessed[u] = {}), s.chunksProcessed[u][t[p]] = !0, s.chunksProcessed[u].data = t, n.resolve.call(null, t), i._raise("filechunksuccess", g), s.check())
                            }, b = function(t, r, o) { return i._isAborted() ? void n.reject("cancelling") : (h = i._getOutData(m, t), s.error = o, s.logAjaxError(t, r, o), i._raise("filechunkajaxerror", [u, e, a, l, s, h]), s.pushAjax(e, a + 1), void n.reject("try failed")) }, _ = function() { i._isAborted() || i._raise("filechunkcomplete", [u, e, a, l, s, i._getOutData(m)]) }, i._ajaxSubmit(v, w, _, b, m, u, s.fileIndex)
                        }
                    }
                }, i.resumableManager.reset()
            }
        },
        _initTemplateDefaults: function() {
            var i, a, r, n, o, l, s, d, c, u, p, f, g, m, h, v, w, b, _, C, y, x, T, P, k, F, E, S, I, A, D, z, M, j, U, $, R, O, B, L, N, Z = this;
            i = '{preview}\n<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n<div class="input-group {class}">\n  {caption}\n<div class="input-group-btn input-group-append">\n      {remove}\n      {cancel}\n      {pause}\n      {upload}\n      {browse}\n    </div>\n</div>', a = '{preview}\n<div class="kv-upload-progress kv-hidden"></div>\n<div class="clearfix"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n', r = '<div class="file-preview {class}">\n  {close}  <div class="{dropClass} clearfix">\n    <div class="file-preview-thumbnails clearfix">\n    </div>\n    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n  </div>\n</div>', o = t.closeButton("fileinput-remove"), n = '<i class="icon-file"></i>', l = '<div class="file-caption form-control {class}" tabindex="500">\n  <span class="file-caption-icon"></span>\n  <input class="file-caption-name" onkeydown="return false;" onpaste="return false;">\n</div>', s = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</button>', d = '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</a>', c = '<div tabindex="500" class="{css}" {status}>{icon} {label}</div>', u = '<div id="' + t.MODAL_ID + '" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="' + t.MODAL_ID + 'Label"></div>', p = '<div class="modal-dialog modal-lg{rtl}" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <h5 class="modal-title">{heading}</h5>\n      <span class="kv-zoom-title"></span>\n      <div class="kv-zoom-actions">{toggleheader}{fullscreen}{borderless}{close}</div>\n    </div>\n    <div class="modal-body">\n      <div class="floating-buttons"></div>\n      <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n{prev} {next}\n    </div>\n  </div>\n</div>\n', f = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {status}\n     </div>\n</div>{stats}', N = '<div class="text-info file-upload-stats"><span class="pending-time">{pendingTime}</span> <span class="upload-speed">{uploadSpeed}</span></div>', g = " <samp>({sizeText})</samp>", m = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">\n        <div class="file-caption-info">{caption}</div>\n        <div class="file-size-info">{size}</div>\n    </div>\n    {progress}\n{indicator}\n{actions}\n</div>', h = '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {download} {upload} {delete} {zoom} {other}    </div>\n</div>\n{drag}\n<div class="clearfix"></div>', v = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n', w = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>', b = '<a class="kv-file-download {downloadClass}" title="{downloadTitle}" href="{downloadUrl}" download="{caption}" target="_blank">{downloadIcon}</a>', _ = '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>', C = '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>', y = '<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>', x = '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-fileid="{fileid}" data-template="{template}"', T = x + '><div class="kv-file-content">\n', P = x + ' title="{caption}"><div class="kv-file-content">\n', k = "</div>{footer}\n{zoomCache}</div>\n", F = "{content}\n", O = " {style}", E = '<div class="kv-preview-data file-preview-html" title="{caption}"' + O + ">{data}</div>\n", S = '<img src="{data}" class="file-preview-image kv-preview-data" title="{title}" alt="{alt}"' + O + ">\n", I = '<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly' + O + ">{data}</textarea>\n", A = '<iframe class="kv-preview-data file-preview-office" src="https://view.officeapps.live.com/op/embed.aspx?src={data}"' + O + "></iframe>", D = '<iframe class="kv-preview-data file-preview-gdocs" src="https://docs.google.com/gview?url={data}&embedded=true"' + O + "></iframe>", z = '<video class="kv-preview-data file-preview-video" controls' + O + '>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</video>\n", M = '<!--suppress ALL --><audio class="kv-preview-data file-preview-audio" controls' + O + '>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</audio>\n", j = '<embed class="kv-preview-data file-preview-flash" src="{data}" type="application/x-shockwave-flash"' + O + ">\n", $ = '<embed class="kv-preview-data file-preview-pdf" src="{data}" type="application/pdf"' + O + ">\n", U = '<object class="kv-preview-data file-preview-object file-object {typeCss}" data="{data}" type="{type}"' + O + '>\n<param name="movie" value="{caption}" />\n' + t.OBJECT_PARAMS + " " + t.DEFAULT_PREVIEW + "\n</object>\n", R = '<div class="kv-preview-data file-preview-other-frame"' + O + ">\n" + t.DEFAULT_PREVIEW + "\n</div>\n", B = '<div class="kv-zoom-cache" style="display:none">{zoomContent}</div>', L = { width: "100%", height: "100%", "min-height": "480px" }, Z._isPdfRendered() && ($ = Z.pdfRendererTemplate.replace("{renderer}", Z._encodeURI(Z.pdfRendererUrl))), Z.defaults = { layoutTemplates: { main1: i, main2: a, preview: r, close: o, fileIcon: n, caption: l, modalMain: u, modal: p, progress: f, stats: N, size: g, footer: m, indicator: y, actions: h, actionDelete: v, actionUpload: w, actionDownload: b, actionZoom: _, actionDrag: C, btnDefault: s, btnLink: d, btnBrowse: c, zoomCache: B }, previewMarkupTags: { tagBefore1: T, tagBefore2: P, tagAfter: k }, previewContentTemplates: { generic: F, html: E, image: S, text: I, office: A, gdocs: D, video: z, audio: M, flash: j, object: U, pdf: $, other: R }, allowedPreviewTypes: ["image", "html", "text", "video", "audio", "flash", "pdf", "object"], previewTemplates: {}, previewSettings: { image: { width: "auto", height: "auto", "max-width": "100%", "max-height": "100%" }, html: { width: "213px", height: "160px" }, text: { width: "213px", height: "160px" }, office: { width: "213px", height: "160px" }, gdocs: { width: "213px", height: "160px" }, video: { width: "213px", height: "160px" }, audio: { width: "100%", height: "30px" }, flash: { width: "213px", height: "160px" }, object: { width: "213px", height: "160px" }, pdf: { width: "100%", height: "160px", position: "relative" }, other: { width: "213px", height: "160px" } }, previewSettingsSmall: { image: { width: "auto", height: "auto", "max-width": "100%", "max-height": "100%" }, html: { width: "100%", height: "160px" }, text: { width: "100%", height: "160px" }, office: { width: "100%", height: "160px" }, gdocs: { width: "100%", height: "160px" }, video: { width: "100%", height: "auto" }, audio: { width: "100%", height: "30px" }, flash: { width: "100%", height: "auto" }, object: { width: "100%", height: "auto" }, pdf: { width: "100%", height: "160px" }, other: { width: "100%", height: "160px" } }, previewZoomSettings: { image: { width: "auto", height: "auto", "max-width": "100%", "max-height": "100%" }, html: L, text: L, office: { width: "100%", height: "100%", "max-width": "100%", "min-height": "480px" }, gdocs: { width: "100%", height: "100%", "max-width": "100%", "min-height": "480px" }, video: { width: "auto", height: "100%", "max-width": "100%" }, audio: { width: "100%", height: "30px" }, flash: { width: "auto", height: "480px" }, object: { width: "auto", height: "100%", "max-width": "100%", "min-height": "480px" }, pdf: L, other: { width: "auto", height: "100%", "min-height": "480px" } }, mimeTypeAliases: { "video/quicktime": "video/mp4" }, fileTypeSettings: { image: function(e, i) { return t.compare(e, "image.*") && !t.compare(e, /(tiff?|wmf)$/i) || t.compare(i, /\.(gif|png|jpe?g)$/i) }, html: function(e, i) { return t.compare(e, "text/html") || t.compare(i, /\.(htm|html)$/i) }, office: function(e, i) { return t.compare(e, /(word|excel|powerpoint|office)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?)$/i) }, gdocs: function(e, i) { return t.compare(e, /(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?|rtf|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i) }, text: function(e, i) { return t.compare(e, "text.*") || t.compare(i, /\.(xml|javascript)$/i) || t.compare(i, /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i) }, video: function(e, i) { return t.compare(e, "video.*") && (t.compare(e, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) || t.compare(i, /\.(og?|mp4|webm|mp?g|mov|3gp)$/i)) }, audio: function(e, i) { return t.compare(e, "audio.*") && (t.compare(i, /(ogg|mp3|mp?g|wav)$/i) || t.compare(i, /\.(og?|mp3|mp?g|wav)$/i)) }, flash: function(e, i) { return t.compare(e, "application/x-shockwave-flash", !0) || t.compare(i, /\.(swf)$/i) }, pdf: function(e, i) { return t.compare(e, "application/pdf", !0) || t.compare(i, /\.(pdf)$/i) }, object: function() { return !0 }, other: function() { return !0 } }, fileActionSettings: { showRemove: !0, showUpload: !0, showDownload: !0, showZoom: !0, showDrag: !0, removeIcon: '<i class="icon-trash"></i>', removeClass: "btn btn-sm btn-kv btn-default btn-outline-secondary", removeErrorClass: "btn btn-sm btn-kv btn-danger", removeTitle: "Remove file", uploadIcon: '<i class="icon-upload"></i>', uploadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary", uploadTitle: "Upload file", uploadRetryIcon: '<i class="icon-repeat"></i>', uploadRetryTitle: "Retry upload", downloadIcon: '<i class="icon-download"></i>', downloadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary", downloadTitle: "Download file", zoomIcon: '<i class="icon-zoom-in"></i>', zoomClass: "btn btn-sm btn-kv btn-default btn-outline-secondary", zoomTitle: "View Details", dragIcon: '<i class="icon-move"></i>', dragClass: "text-info", dragTitle: "Move / Rearrange", dragSettings: {}, indicatorNew: '<i class="icon-plus-sign text-warning"></i>', indicatorSuccess: '<i class="icon-ok-sign text-success"></i>', indicatorError: '<i class="icon-exclamation-sign text-danger"></i>', indicatorLoading: '<i class="icon-hourglass text-muted"></i>', indicatorPaused: '<i class="icon-pause text-primary"></i>', indicatorNewTitle: "Not uploaded yet", indicatorSuccessTitle: "Uploaded", indicatorErrorTitle: "Upload Error", indicatorLoadingTitle: "Uploading &hellip;", indicatorPausedTitle: "Upload Paused" } }, e.each(Z.defaults, function(t, i) { return "allowedPreviewTypes" === t ? void(void 0 === Z.allowedPreviewTypes && (Z.allowedPreviewTypes = i)) : void(Z[t] = e.extend(!0, {}, i, Z[t])) }), Z._initPreviewTemplates()
        },
        _initPreviewTemplates: function() {
            var i, a = this,
                r = a.previewMarkupTags,
                n = r.tagAfter;
            e.each(a.previewContentTemplates, function(e, o) { t.isEmpty(a.previewTemplates[e]) && (i = r.tagBefore2, "generic" !== e && "image" !== e && "html" !== e && "text" !== e || (i = r.tagBefore1), a._isPdfRendered() && "pdf" === e && (i = i.replace("kv-file-content", "kv-file-content kv-pdf-rendered")), a.previewTemplates[e] = i + o + n) })
        },
        _initPreviewCache: function() {
            var i = this;
            i.previewCache = {
                data: {},
                init: function() {
                    var e = i.initialPreview;
                    e.length > 0 && !t.isArray(e) && (e = e.split(i.initialPreviewDelimiter)), i.previewCache.data = { content: e, config: i.initialPreviewConfig, tags: i.initialPreviewThumbTags }
                },
                count: function(e) { if (!i.previewCache.data || !i.previewCache.data.content) return 0; if (e) { var t = i.previewCache.data.content.filter(function(e) { return null !== e }); return t.length } return i.previewCache.data.content.length },
                get: function(e, a) {
                    var r, n, o, l, s, d, c, u = t.INIT_FLAG + e,
                        p = i.previewCache.data,
                        f = p.config[e],
                        g = p.content[e],
                        m = t.ifSet("previewAsData", f, i.initialPreviewAsData),
                        h = f ? { title: f.title || null, alt: f.alt || null } : { title: null, alt: null },
                        v = function(e, a, r, n, o, l, s, d) {
                            var c = " file-preview-initial " + t.SORT_CSS + (s ? " " + s : ""),
                                u = i.previewInitId + "-" + l,
                                p = f && f.fileId || u;
                            return i._generatePreviewTemplate(e, a, r, n, u, p, !1, null, c, o, l, d, h, f && f.zoomData || a)
                        };
                    return g && g.length ? (a = void 0 === a ? !0 : a, o = t.ifSet("type", f, i.initialPreviewFileType || "generic"), s = t.ifSet("filename", f, t.ifSet("caption", f)), d = t.ifSet("filetype", f, o), l = i.previewCache.footer(e, a, f && f.size || null), c = t.ifSet("frameClass", f), r = m ? v(o, g, s, d, l, u, c) : v("generic", g, s, d, l, u, c, o).setTokens({ content: p.content[e] }), p.tags.length && p.tags[e] && (r = t.replaceTags(r, p.tags[e])), t.isEmpty(f) || t.isEmpty(f.frameAttr) || (n = t.createElement(r), n.find(".file-preview-initial").attr(f.frameAttr), r = n.html(), n.remove()), r) : ""
                },
                clean: function(e) { e.content = t.cleanArray(e.content), e.config = t.cleanArray(e.config), e.tags = t.cleanArray(e.tags), i.previewCache.data = e },
                add: function(e, a, r, n) { var o, l = i.previewCache.data; return e && e.length ? (o = e.length - 1, t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), n && l.content ? (o = l.content.push(e[0]) - 1, l.config[o] = a, l.tags[o] = r) : (l.content = e, l.config = a, l.tags = r), i.previewCache.clean(l), o) : 0 },
                set: function(e, a, r, n) {
                    var o, l, s = i.previewCache.data;
                    if (e && e.length && (t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), l = e.filter(function(e) { return null !== e }), l.length)) {
                        if (void 0 === s.content && (s.content = []), void 0 === s.config && (s.config = []), void 0 === s.tags && (s.tags = []), n) { for (o = 0; o < e.length; o++) e[o] && s.content.push(e[o]); for (o = 0; o < a.length; o++) a[o] && s.config.push(a[o]); for (o = 0; o < r.length; o++) r[o] && s.tags.push(r[o]) } else s.content = e, s.config = a, s.tags = r;
                        i.previewCache.clean(s)
                    }
                },
                unset: function(a) {
                    var r = i.previewCache.count(),
                        n = i.reversePreviewOrder;
                    if (r) {
                        if (1 === r) return i.previewCache.data.content = [], i.previewCache.data.config = [], i.previewCache.data.tags = [], i.initialPreview = [], i.initialPreviewConfig = [], void(i.initialPreviewThumbTags = []);
                        i.previewCache.data.content = t.spliceArray(i.previewCache.data.content, a, n), i.previewCache.data.config = t.spliceArray(i.previewCache.data.config, a, n), i.previewCache.data.tags = t.spliceArray(i.previewCache.data.tags, a, n);
                        var o = e.extend(!0, {}, i.previewCache.data);
                        i.previewCache.clean(o)
                    }
                },
                out: function() {
                    var e, t, a, r = "",
                        n = i.previewCache.count();
                    if (0 === n) return { content: "", caption: "" };
                    for (t = 0; n > t; t++) a = i.previewCache.get(t), r = i.reversePreviewOrder ? a + r : r + a;
                    return e = i._getMsgSelected(n), { content: r, caption: e }
                },
                footer: function(e, a, r) {
                    var n = i.previewCache.data || {};
                    if (t.isEmpty(n.content)) return "";
                    (t.isEmpty(n.config) || t.isEmpty(n.config[e])) && (n.config[e] = {}), a = void 0 === a ? !0 : a;
                    var o, l = n.config[e],
                        s = t.ifSet("caption", l),
                        d = t.ifSet("width", l, "auto"),
                        c = t.ifSet("url", l, !1),
                        u = t.ifSet("key", l, null),
                        p = t.ifSet("fileId", l, null),
                        f = i.fileActionSettings,
                        g = i.initialPreviewShowDelete || !1,
                        m = i.initialPreviewDownloadUrl ? i.initialPreviewDownloadUrl + "?key=" + u + (p ? "&fileId=" + p : "") : "",
                        h = l.downloadUrl || m,
                        v = l.filename || l.caption || "",
                        w = !!h,
                        b = t.ifSet("showRemove", l, g),
                        _ = t.ifSet("showDownload", l, t.ifSet("showDownload", f, w)),
                        C = t.ifSet("showZoom", l, t.ifSet("showZoom", f, !0)),
                        y = t.ifSet("showDrag", l, t.ifSet("showDrag", f, !0)),
                        x = c === !1 && a;
                    return _ = _ && l.downloadUrl !== !1 && !!h, o = i._renderFileActions(l, !1, _, b, C, y, x, c, u, !0, h, v), i._getLayoutTemplate("footer").setTokens({ progress: i._renderThumbProgress(), actions: o, caption: s, size: i._getSize(r), width: d, indicator: "" })
                }
            }, i.previewCache.init()
        },
        _isPdfRendered: function() {
            var e = this,
                t = e.usePdfRenderer,
                i = "function" == typeof t ? t() : !!t;
            return i && e.pdfRendererUrl
        },
        _handler: function(e, t, i) {
            var a = this,
                r = a.namespace,
                n = t.split(" ").join(r + " ") + r;
            e && e.length && e.off(n).on(n, i)
        },
        _encodeURI: function(e) { var t = this; return t.encodeUrl ? encodeURI(e) : e },
        _log: function(e, t) {
            var i = this,
                a = i.$element.attr("id");
            i.showConsoleLogs && (a && (e = '"' + a + '": ' + e), e = "bootstrap-fileinput: " + e, "object" == typeof t && (e = e.setTokens(t)), window.console && "undefined" != typeof window.console.log ? window.console.log(e) : window.alert(e))
        },
        _validate: function() {
            var e = this,
                i = "file" === e.$element.attr("type");
            return i || e._log(t.logMessages.badInputType), i
        },
        _errorsExist: function() {
            var i, a = this,
                r = a.$errorContainer.find("li");
            return r.length ? !0 : (i = t.createElement(a.$errorContainer.html()), i.find(".kv-error-close").remove(), i.find("ul").remove(), !!e.trim(i.text()).length)
        },
        _errorHandler: function(e, t) {
            var i = this,
                a = e.target.error,
                r = function(e) { i._showError(e.replace("{name}", t)) };
            r(a.code === a.NOT_FOUND_ERR ? i.msgFileNotFound : a.code === a.SECURITY_ERR ? i.msgFileSecured : a.code === a.NOT_READABLE_ERR ? i.msgFileNotReadable : a.code === a.ABORT_ERR ? i.msgFilePreviewAborted : i.msgFilePreviewError)
        },
        _addError: function(e) {
            var i = this,
                a = i.$errorContainer;
            e && a.length && (t.setHtml(a, i.errorCloseButton + e), i._handler(a.find(".kv-error-close"), "click", function() { setTimeout(function() { i.showPreview && !i.getFrames().length && i.clear(), a.fadeOut("slow") }, i.processDelay) }))
        },
        _setValidationError: function(e) {
            var i = this;
            e = (e ? e + " " : "") + "has-error", i.$container.removeClass(e).addClass("has-error"), t.addCss(i.$captionContainer, "is-invalid")
        },
        _resetErrors: function(e) {
            var t = this,
                i = t.$errorContainer;
            t.isPersistentError || (t.isError = !1, t.$container.removeClass("has-error"), t.$captionContainer.removeClass("is-invalid"), i.html(""), e ? i.fadeOut("slow") : i.hide())
        },
        _showFolderError: function(e) {
            var t, i = this,
                a = i.$errorContainer;
            e && (i.isAjaxUpload || i._clearFileInput(), t = i.msgFoldersNotAllowed.replace("{n}", e), i._addError(t), i._setValidationError(), a.fadeIn(i.fadeDelay), i._raise("filefoldererror", [e, t]))
        },
        _showFileError: function(e, t, i) {
            var a = this,
                r = a.$errorContainer,
                n = i || "fileuploaderror",
                o = t && t.fileId || "",
                l = t && t.id ? '<li data-thumb-id="' + t.id + '" data-file-id="' + o + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === r.find("ul").length ? a._addError("<ul>" + l + "</ul>") : r.find("ul").append(l), r.fadeIn(a.fadeDelay), a._raise(n, [t, e]), a._setValidationError("file-input-new"), !0
        },
        _showError: function(e, t, i) {
            var a = this,
                r = a.$errorContainer,
                n = i || "fileerror";
            return t = t || {}, t.reader = a.reader, a._addError(e), r.fadeIn(a.fadeDelay), a._raise(n, [t, e]), a.isAjaxUpload || a._clearFileInput(), a._setValidationError("file-input-new"), a.$btnUpload.attr("disabled", !0), !0
        },
        _noFilesError: function(e) {
            var t = this,
                i = t.minFileCount > 1 ? t.filePlural : t.fileSingle,
                a = t.msgFilesTooLess.replace("{n}", t.minFileCount).replace("{files}", i),
                r = t.$errorContainer;
            a = "<li>" + a + "</li>", 0 === r.find("ul").length ? t._addError("<ul>" + a + "</ul>") : r.find("ul").append(a), t.isError = !0, t._updateFileDetails(0), r.fadeIn(t.fadeDelay), t._raise("fileerror", [e, a]), t._clearFileInput(), t._setValidationError()
        },
        _parseError: function(t, i, a, r) {
            var n, o = this,
                l = e.trim(a + ""),
                s = void 0 !== i.responseJSON && void 0 !== i.responseJSON.error ? i.responseJSON.error.toString() : i.responseText;
            return o.cancelling && o.msgUploadAborted && (l = o.msgUploadAborted), o.showAjaxErrorDetails && s && (s = e.trim(s.replace(/\n\s*\n/g, "\n")), n = s.length ? "<pre>" + s + "</pre>" : "", l += l ? n : s), l || (l = o.msgAjaxError.replace("{operation}", t)), o.cancelling = !1, r ? "<b>" + r + ": </b>" + l : l
        },
        _parseFileType: function(e, i) {
            var a, r, n, o, l = this,
                s = l.allowedPreviewTypes || [];
            if ("application/text-plain" === e) return "text";
            for (o = 0; o < s.length; o++)
                if (n = s[o], a = l.fileTypeSettings[n], r = a(e, i) ? n : "", !t.isEmpty(r)) return r;
            return "other"
        },
        _getPreviewIcon: function(t) {
            var i, a = this,
                r = null;
            return t && t.indexOf(".") > -1 && (i = t.split(".").pop(), a.previewFileIconSettings && (r = a.previewFileIconSettings[i] || a.previewFileIconSettings[i.toLowerCase()] || null), a.previewFileExtSettings && e.each(a.previewFileExtSettings, function(e, t) { return a.previewFileIconSettings[e] && t(i) ? void(r = a.previewFileIconSettings[e]) : void 0 })), r || a.previewFileIcon
        },
        _parseFilePreviewIcon: function(e, t) {
            var i = this,
                a = i._getPreviewIcon(t),
                r = e;
            return r.indexOf("{previewFileIcon}") > -1 && (r = r.setTokens({ previewFileIconClass: i.previewFileIconClass, previewFileIcon: a })), r
        },
        _raise: function(t, i) {
            var a = this,
                r = e.Event(t);
            if (void 0 !== i ? a.$element.trigger(r, i) : a.$element.trigger(r), r.isDefaultPrevented() || r.result === !1) return !1;
            switch (t) {
                case "filebatchuploadcomplete":
                case "filebatchuploadsuccess":
                case "fileuploaded":
                case "fileclear":
                case "filecleared":
                case "filereset":
                case "fileerror":
                case "filefoldererror":
                case "fileuploaderror":
                case "filebatchuploaderror":
                case "filedeleteerror":
                case "filecustomerror":
                case "filesuccessremove":
                    break;
                default:
                    a.ajaxAborted || (a.ajaxAborted = r.result)
            }
            return !0
        },
        _listenFullScreen: function(e) {
            var t, i, a = this,
                r = a.$modal;
            r && r.length && (t = r && r.find(".btn-fullscreen"), i = r && r.find(".btn-borderless"), t.length && i.length && (t.removeClass("active").attr("aria-pressed", "false"), i.removeClass("active").attr("aria-pressed", "false"), e ? t.addClass("active").attr("aria-pressed", "true") : i.addClass("active").attr("aria-pressed", "true"), r.hasClass("file-zoom-fullscreen") ? a._maximizeZoomDialog() : e ? a._maximizeZoomDialog() : i.removeClass("active").attr("aria-pressed", "false")))
        },
        _listen: function() {
            var i, a = this,
                r = a.$element,
                n = a.$form,
                o = a.$container;
            a._handler(r, "click", function(e) { r.hasClass("file-no-browse") && (r.data("zoneClicked") ? r.data("zoneClicked", !1) : e.preventDefault()) }), a._handler(r, "change", e.proxy(a._change, a)), a.showBrowse && a._handler(a.$btnFile, "click", e.proxy(a._browse, a)), a._handler(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(a.clear, a)), a._handler(o.find(".fileinput-cancel"), "click", e.proxy(a.cancel, a)), a._handler(o.find(".fileinput-pause"), "click", e.proxy(a.pause, a)), a._initDragDrop(), a._handler(n, "reset", e.proxy(a.clear, a)), a.isAjaxUpload || a._handler(n, "submit", e.proxy(a._submitForm, a)), a._handler(a.$container.find(".fileinput-upload"), "click", e.proxy(a._uploadClick, a)), a._handler(e(window), "resize", function() { a._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight) }), i = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", a._handler(e(document), i, function() { a._listenFullScreen(t.checkFullScreen()) }), a._autoFitContent(), a._initClickable(), a._refreshPreview()
        },
        _autoFitContent: function() {
            var t, i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                a = this,
                r = 400 > i ? a.previewSettingsSmall || a.defaults.previewSettingsSmall : a.previewSettings || a.defaults.previewSettings;
            e.each(r, function(e, i) { t = ".file-preview-frame .file-preview-" + e, a.$preview.find(t + ".kv-preview-data," + t + " .kv-preview-data").css(i) })
        },
        _scanDroppedItems: function(e, i, a) {
            a = a || "";
            var r, n, o, l = this,
                s = function(e) { l._log(t.logMessages.badDroppedFiles), l._log(e) };
            e.isFile ? e.file(function(e) { a && (e.newPath = a + e.name), i.push(e) }, s) : e.isDirectory && (n = e.createReader(), (o = function() {
                n.readEntries(function(t) {
                    if (t && t.length > 0) {
                        for (r = 0; r < t.length; r++) l._scanDroppedItems(t[r], i, a + e.name + "/");
                        o()
                    }
                    return null
                }, s)
            })())
        },
        _initDragDrop: function() {
            var t = this,
                i = t.$dropZone;
            t.dropZoneEnabled && t.showPreview && (t._handler(i, "dragenter dragover", e.proxy(t._zoneDragEnter, t)), t._handler(i, "dragleave", e.proxy(t._zoneDragLeave, t)), t._handler(i, "drop", e.proxy(t._zoneDrop, t)), t._handler(e(document), "dragenter dragover drop", t._zoneDragDropInit))
        },
        _zoneDragDropInit: function(e) { e.stopPropagation(), e.preventDefault() },
        _zoneDragEnter: function(i) {
            var a = this,
                r = i.originalEvent.dataTransfer,
                n = e.inArray("Files", r.types) > -1;
            return a._zoneDragDropInit(i), a.isDisabled || !n ? (i.originalEvent.dataTransfer.effectAllowed = "none", void(i.originalEvent.dataTransfer.dropEffect = "none")) : void(a._raise("fileDragEnter", { sourceEvent: i, files: r.types.Files }) && t.addCss(a.$dropZone, "file-highlighted"))
        },
        _zoneDragLeave: function(e) {
            var t = this;
            t._zoneDragDropInit(e), t.isDisabled || t._raise("fileDragLeave", { sourceEvent: e }) && t.$dropZone.removeClass("file-highlighted")
        },
        _zoneDrop: function(e) {
            var i, a = this,
                r = a.$element,
                n = e.originalEvent.dataTransfer,
                o = n.files,
                l = n.items,
                s = t.getDragDropFolders(l),
                d = function() { a.isAjaxUpload ? a._change(e, o) : (a.changeTriggered = !0, r.get(0).files = o, setTimeout(function() { a.changeTriggered = !1, r.trigger("change" + a.namespace) }, a.processDelay)), a.$dropZone.removeClass("file-highlighted") };
            if (e.preventDefault(), !a.isDisabled && !t.isEmpty(o) && a._raise("fileDragDrop", { sourceEvent: e, files: o }))
                if (s > 0) {
                    if (!a.isAjaxUpload) return void a._showFolderError(s);
                    for (o = [], i = 0; i < l.length; i++) {
                        var c = l[i].webkitGetAsEntry();
                        c && a._scanDroppedItems(c, o)
                    }
                    setTimeout(function() { d() }, 500)
                } else d()
        },
        _uploadClick: function(e) {
            var i, a = this,
                r = a.$container.find(".fileinput-upload"),
                n = !r.hasClass("disabled") && t.isEmpty(r.attr("disabled"));
            if (!e || !e.isDefaultPrevented()) {
                if (!a.isAjaxUpload) return void(n && "submit" !== r.attr("type") && (i = r.closest("form"), i.length && i.trigger("submit"), e.preventDefault()));
                e.preventDefault(), n && a.upload()
            }
        },
        _submitForm: function() { var e = this; return e._isFileSelectionValid() && !e._abort({}) },
        _clearPreview: function() {
            var t = this,
                i = t.showUploadedThumbs ? t.getFrames(":not(.file-preview-success)") : t.getFrames();
            i.each(function() {
                var t = e(this);
                t.remove()
            }), t.getFrames().length && t.showPreview || t._resetUpload(), t._validateDefaultPreview()
        },
        _initSortable: function() {
            var i, a, r, n, o = this,
                l = o.$preview,
                s = "." + t.SORT_CSS,
                d = e("body"),
                c = e("html"),
                u = o.reversePreviewOrder,
                p = window.Sortable;
            p && 0 !== l.find(s).length && (a = d.length ? d : c.length ? c : o.$container, r = function() { a.addClass("file-grabbing") }, n = function() { a.removeClass("file-grabbing") }, i = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-fileid",
                animation: 600,
                draggable: s,
                scroll: !1,
                forceFallback: !0,
                onChoose: r,
                onStart: r,
                onUnchoose: n,
                onEnd: n,
                onSort: function(i) {
                    var a, r = i.oldIndex,
                        n = i.newIndex,
                        l = 0,
                        s = o.initialPreviewConfig.length,
                        d = s > 0 && n >= s,
                        c = e(i.item);
                    d && (n = s - 1), o.initialPreview = t.moveArray(o.initialPreview, r, n, u), o.initialPreviewConfig = t.moveArray(o.initialPreviewConfig, r, n, u), o.previewCache.init(), o.getFrames(".file-preview-initial").each(function() { e(this).attr("data-fileindex", t.INIT_FLAG + l), l++ }), d && (a = o.getFrames(":not(.file-preview-initial):first"), a.length && c.slideUp(function() { c.insertBefore(a).slideDown() })), o._raise("filesorted", { previewId: c.attr("id"), oldIndex: r, newIndex: n, stack: o.initialPreviewConfig })
                }
            }, e.extend(!0, i, o.fileActionSettings.dragSettings), o.sortable && o.sortable.destroy(), o.sortable = p.create(l[0], i))
        },
        _setPreviewContent: function(e) {
            var i = this;
            t.setHtml(i.$preview, e), i._autoFitContent()
        },
        _initPreviewImageOrientations: function() {
            var t = this,
                i = 0,
                a = t.canOrientImage;
            (t.autoOrientImageInitial || a) && t.getFrames(".file-preview-initial").each(function() {
                var r, n, o, l = e(this),
                    s = t.initialPreviewConfig[i];
                s && s.exif && s.exif.Orientation && (o = l.attr("id"), r = l.find(">.kv-file-content img"), n = t._getZoom(o, " >.kv-file-content img"), a ? r.css("image-orientation", t.autoOrientImageInitial ? "from-image" : "none") : t.setImageOrientation(r, n, s.exif.Orientation, l)), i++
            })
        },
        _initPreview: function(e) {
            var i, a = this,
                r = a.initialCaption || "";
            return a.previewCache.count(!0) ? (i = a.previewCache.out(), r = e && a.initialCaption ? a.initialCaption : i.caption, a._setPreviewContent(i.content), a._setInitThumbAttr(), a._setCaption(r), a._initSortable(), t.isEmpty(i.content) || a.$container.removeClass("file-input-new"), void a._initPreviewImageOrientations()) : (a._clearPreview(), void(e ? a._setCaption(r) : a._initCaption()))
        },
        _getZoomButton: function(e) {
            var t = this,
                i = t.previewZoomButtonIcons[e],
                a = t.previewZoomButtonClasses[e],
                r = ' title="' + (t.previewZoomButtonTitles[e] || "") + '" ',
                n = r + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (n += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + a + " btn-" + e + '"' + n + ">" + i + "</button>"
        },
        _getModalContent: function() { var e = this; return e._getLayoutTemplate("modal").setTokens({ rtl: e.rtl ? " kv-rtl" : "", zoomFrameClass: e.frameClass, heading: e.msgZoomModalHeading, prev: e._getZoomButton("prev"), next: e._getZoomButton("next"), toggleheader: e._getZoomButton("toggleheader"), fullscreen: e._getZoomButton("fullscreen"), borderless: e._getZoomButton("borderless"), close: e._getZoomButton("close") }) },
        _listenModalEvent: function(e) {
            var i = this,
                a = i.$modal,
                r = function(e) { return { sourceEvent: e, previewId: a.data("previewId"), modal: a } };
            a.on(e + ".bs.modal", function(n) {
                var o = a.find(".btn-fullscreen"),
                    l = a.find(".btn-borderless");
                a.data("fileinputPluginId") === i.$element.attr("id") && i._raise("filezoom" + e, r(n)), "shown" === e && (l.removeClass("active").attr("aria-pressed", "false"), o.removeClass("active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (i._maximizeZoomDialog(), t.checkFullScreen() ? o.addClass("active").attr("aria-pressed", "true") : l.addClass("active").attr("aria-pressed", "true")))
            })
        },
        _initZoom: function() {
            var i, a = this,
                r = a._getLayoutTemplate("modalMain"),
                n = "#" + t.MODAL_ID;
            a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (i = t.createElement(t.cspBuffer.stash(r)).insertAfter(a.$container), a.$modal = e(n).insertBefore(i), t.cspBuffer.apply(a.$modal), i.remove()), t.initModal(a.$modal), a.$modal.html(t.cspBuffer.stash(a._getModalContent())), t.cspBuffer.apply(a.$modal), e.each(t.MODAL_EVENTS, function(e, t) { a._listenModalEvent(t) }))
        },
        _initZoomButtons: function() {
            var t, i, a = this,
                r = a.$modal.data("previewId") || "",
                n = a.getFrames().toArray(),
                o = n.length,
                l = a.$modal.find(".btn-prev"),
                s = a.$modal.find(".btn-next");
            return n.length < 2 ? (l.hide(), void s.hide()) : (l.show(), s.show(), void(o && (t = e(n[0]), i = e(n[o - 1]), l.removeAttr("disabled"), s.removeAttr("disabled"), t.length && t.attr("id") === r && l.attr("disabled", !0), i.length && i.attr("id") === r && s.attr("disabled", !0))))
        },
        _maximizeZoomDialog: function() {
            var t = this,
                i = t.$modal,
                a = i.find(".modal-header:visible"),
                r = i.find(".modal-footer:visible"),
                n = i.find(".modal-body"),
                o = e(window).height(),
                l = 0;
            i.addClass("file-zoom-fullscreen"), a && a.length && (o -= a.outerHeight(!0)), r && r.length && (o -= r.outerHeight(!0)), n && n.length && (l = n.outerHeight(!0) - n.height(), o -= l), i.find(".kv-zoom-body").height(o)
        },
        _resizeZoomDialog: function(e) {
            var i = this,
                a = i.$modal,
                r = a.find(".btn-fullscreen"),
                n = a.find(".btn-borderless");
            if (a.hasClass("file-zoom-fullscreen")) t.toggleFullScreen(!1), e ? r.hasClass("active") || (a.removeClass("file-zoom-fullscreen"), i._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr("aria-pressed", "false")) : r.hasClass("active") ? r.removeClass("active").attr("aria-pressed", "false") : (a.removeClass("file-zoom-fullscreen"), i.$modal.find(".kv-zoom-body").css("height", i.zoomModalHeight));
            else {
                if (!e) return void i._maximizeZoomDialog();
                t.toggleFullScreen(!0)
            }
            a.focus()
        },
        _setZoomContent: function(i, a) {
            var r, n, o, l, s, d, c, u, p, f, g = this,
                m = i.attr("id"),
                h = g._getZoom(m),
                v = g.$modal,
                w = v.find(".btn-fullscreen"),
                b = v.find(".btn-borderless"),
                _ = v.find(".btn-toggleheader");
            n = h.attr("data-template") || "generic", r = h.find(".kv-file-content"), o = r.length ? r.html() : "", p = i.data("caption") || "", f = i.data("size") || "", l = p + " " + f, v.find(".kv-zoom-title").attr("title", e("<div/>").html(l).text()).html(l), s = v.find(".kv-zoom-body"), v.removeClass("kv-single-content"), a ? (u = s.addClass("file-thumb-loading").clone().insertAfter(s), t.setHtml(s, o).hide(), u.fadeOut("fast", function() { s.fadeIn("fast", function() { s.removeClass("file-thumb-loading") }), u.remove() })) : t.setHtml(s, o), c = g.previewZoomSettings[n], c && (d = s.find(".kv-preview-data"), t.addCss(d, "file-zoom-detail"), e.each(c, function(e, t) { d.css(e, t), (d.attr("width") && "width" === e || d.attr("height") && "height" === e) && d.removeAttr(e) })), v.data("previewId", m), g._handler(v.find(".btn-prev"), "click", function() { g._zoomSlideShow("prev", m) }), g._handler(v.find(".btn-next"), "click", function() { g._zoomSlideShow("next", m) }), g._handler(w, "click", function() { g._resizeZoomDialog(!0) }), g._handler(b, "click", function() { g._resizeZoomDialog(!1) }), g._handler(_, "click", function() {
                var e, t = v.find(".modal-header"),
                    i = v.find(".modal-body .floating-buttons"),
                    a = t.find(".kv-zoom-actions"),
                    r = function(e) {
                        var i = g.$modal.find(".kv-zoom-body"),
                            a = g.zoomModalHeight;
                        v.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height", e ? a + e : a)
                    };
                t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function() { a.find(".btn").appendTo(i), r(e) })) : (i.find(".btn").appendTo(a), t.slideDown("slow", function() { r() })), v.focus()
            }), g._handler(v, "keydown", function(t) {
                var i = t.which || t.keyCode,
                    a = e(this).find(".btn-prev"),
                    r = e(this).find(".btn-next"),
                    n = e(this).data("previewId"),
                    o = g.rtl ? 39 : 37,
                    l = g.rtl ? 37 : 39;
                i === o && a.length && !a.attr("disabled") && g._zoomSlideShow("prev", n), i === l && r.length && !r.attr("disabled") && g._zoomSlideShow("next", n)
            })
        },
        _showModal: function(e) {
            var i = this,
                a = i.$modal;
            e && e.length && (t.initModal(a), t.setHtml(a, i._getModalContent()), i._setZoomContent(e), a.data("fileinputPluginId", i.$element.attr("id")), a.modal("show"), i._initZoomButtons())
        },
        _zoomPreview: function(e) {
            var i, a = this;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            i = e.closest(t.FRAMES), a._showModal(i)
        },
        _zoomSlideShow: function(t, i) {
            var a, r, n, o, l = this,
                s = l.$modal.find(".kv-zoom-actions .btn-" + t),
                d = l.getFrames().toArray(),
                c = [],
                u = d.length;
            if (!s.attr("disabled")) {
                for (r = 0; u > r; r++) n = e(d[r]), n && n.length && n.find(".kv-file-zoom:visible").length && c.push(d[r]);
                for (u = c.length, r = 0; u > r; r++)
                    if (e(c[r]).attr("id") === i) { o = "prev" === t ? r - 1 : r + 1; break }
                0 > o || o >= u || !c[o] || (a = e(c[o]), a.length && l._setZoomContent(a, !0), l._initZoomButtons(), l._raise("filezoom" + t, { previewId: i, modal: l.$modal }))
            }
        },
        _initZoomButton: function() {
            var t = this;
            t.$preview.find(".kv-file-zoom").each(function() {
                var i = e(this);
                t._handler(i, "click", function() { t._zoomPreview(i) })
            })
        },
        _inputFileCount: function() { return this.$element[0].files.length },
        _refreshPreview: function() {
            var t, i = this;
            (i._inputFileCount() || i.isAjaxUpload) && i.showPreview && i.isPreviewable && (i.isAjaxUpload && i.fileManager.count() > 0 ? (t = e.extend(!0, {}, i.fileManager.stack), i.fileManager.clear(), i._clearFileInput()) : t = i.$element[0].files, t && t.length && (i.readFiles(t), i._setFileDropZoneTitle()))
        },
        _clearObjects: function(t) { t.find("video audio").each(function() { this.pause(), e(this).remove() }), t.find("img object div").each(function() { e(this).remove() }) },
        _clearFileInput: function() {
            var t, i, a, r = this,
                n = r.$element;
            r._inputFileCount() && (t = n.closest("form"), i = e(document.createElement("form")), a = e(document.createElement("div")), n.before(a), t.length ? t.after(i) : a.after(i), i.append(n).trigger("reset"), a.before(n).remove(), i.remove())
        },
        _resetUpload: function() {
            var e = this;
            e.uploadCache = [], e.$btnUpload.removeAttr("disabled"), e._setProgress(0), e._hideProgress(), e._resetErrors(!1), e._initAjax(), e.fileManager.clearImages(), e._resetCanvas(), e.overwriteInitial && (e.initialPreview = [], e.initialPreviewConfig = [], e.initialPreviewThumbTags = [], e.previewCache.data = { content: [], config: [], tags: [] })
        },
        _resetCanvas: function() {
            var e = this;
            e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height)
        },
        _hasInitialPreview: function() { var e = this; return !e.overwriteInitial && e.previewCache.count(!0) },
        _resetPreview: function() {
            var e, t, i = this;
            i.previewCache.count(!0) ? (e = i.previewCache.out(), i._setPreviewContent(e.content), i._setInitThumbAttr(), t = i.initialCaption ? i.initialCaption : e.caption, i._setCaption(t)) : (i._clearPreview(), i._initCaption()), i.showPreview && (i._initZoom(), i._initSortable())
        },
        _clearDefaultPreview: function() {
            var e = this;
            e.$preview.find(".file-default-preview").remove();
        },
        _validateDefaultPreview: function() {
            var e = this;
            e.showPreview && !t.isEmpty(e.defaultPreviewContent) && (e._setPreviewContent('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass("file-input-new"), e._initClickable())
        },
        _resetPreviewThumbs: function(e) { var t, i = this; return e ? (i._clearPreview(), void i.clearFileStack()) : void(i._hasInitialPreview() ? (t = i.previewCache.out(), i._setPreviewContent(t.content), i._setInitThumbAttr(), i._setCaption(t.caption), i._initPreviewActions()) : i._clearPreview()) },
        _getLayoutTemplate: function(e) {
            var i = this,
                a = i.layoutTemplates[e];
            return t.isEmpty(i.customLayoutTags) ? a : t.replaceTags(a, i.customLayoutTags)
        },
        _getPreviewTemplate: function(e) {
            var i = this,
                a = i.previewTemplates,
                r = a[e] || a.other;
            return t.isEmpty(i.customPreviewTags) ? r : t.replaceTags(r, i.customPreviewTags)
        },
        _getOutData: function(e, t, i, a) { var r = this; return t = t || {}, i = i || {}, a = a || r.fileManager.list(), { formdata: e, files: a, filenames: r.filenames, filescount: r.getFilesCount(), extra: r._getExtraData(), response: i, reader: r.reader, jqXHR: t } },
        _getMsgSelected: function(e) {
            var t = this,
                i = 1 === e ? t.fileSingle : t.filePlural;
            return e > 0 ? t.msgSelected.replace("{n}", e).replace("{files}", i) : t.msgNoFilesSelected
        },
        _getFrame: function(e, i) {
            var a = this,
                r = t.getFrameElement(a.$preview, e);
            return !a.showPreview || i || r.length || a._log(t.logMessages.invalidThumb, { id: e }), r
        },
        _getZoom: function(e, i) {
            var a = this,
                r = t.getZoomElement(a.$preview, e, i);
            return a.showPreview && !r.length && a._log(t.logMessages.invalidThumb, { id: e }), r
        },
        _getThumbs: function(e) { return e = e || "", this.getFrames(":not(.file-preview-initial)" + e) },
        _getThumbId: function(e) { var t = this; return t.previewInitId + "-" + e },
        _getExtraData: function(e, t) {
            var i = this,
                a = i.uploadExtraData;
            return "function" == typeof i.uploadExtraData && (a = i.uploadExtraData(e, t)), a
        },
        _initXhr: function(e, i, a) {
            var r = this,
                n = r.fileManager,
                o = function(e) {
                    var o = 0,
                        l = e.total,
                        s = e.loaded || e.position,
                        d = n.getUploadStats(i, s, l);
                    e.lengthComputable && !r.enableResumableUpload && (o = t.round(s / l * 100)), i ? r._setFileUploadStats(i, o, a, d) : r._setProgress(o, null, null, r._getStats(d)), r._raise("fileajaxprogress", [d])
                };
            return e.upload && (r.progressDelay && (o = t.debounce(o, r.progressDelay)), e.upload.addEventListener("progress", o, !1)), e
        },
        _initAjaxSettings: function() {
            var t = this;
            t._ajaxSettings = e.extend(!0, {}, t.ajaxSettings), t._ajaxDeleteSettings = e.extend(!0, {}, t.ajaxDeleteSettings)
        },
        _mergeAjaxCallback: function(e, t, i) {
            var a, r = this,
                n = r._ajaxSettings,
                o = r.mergeAjaxCallbacks;
            "delete" === i && (n = r._ajaxDeleteSettings, o = r.mergeAjaxDeleteCallbacks), a = n[e], o && "function" == typeof a ? "before" === o ? n[e] = function() { a.apply(this, arguments), t.apply(this, arguments) } : n[e] = function() { t.apply(this, arguments), a.apply(this, arguments) } : n[e] = t
        },
        _ajaxSubmit: function(t, i, a, r, n, o, l, s) {
            var d, c, u, p, f = this;
            f._raise("filepreajax", [n, o, l]) && (n.append("initialPreview", JSON.stringify(f.initialPreview)), n.append("initialPreviewConfig", JSON.stringify(f.initialPreviewConfig)), n.append("initialPreviewThumbTags", JSON.stringify(f.initialPreviewThumbTags)), f._initAjaxSettings(), f._mergeAjaxCallback("beforeSend", t), f._mergeAjaxCallback("success", i), f._mergeAjaxCallback("complete", a), f._mergeAjaxCallback("error", r), s = s || f.uploadUrlThumb || f.uploadUrl, "function" == typeof s && (s = s()), u = f._getExtraData(o, l) || {}, "object" == typeof u && e.each(u, function(e, t) { n.append(e, t) }), c = { xhr: function() { var t = e.ajaxSettings.xhr(); return f._initXhr(t, o, f.fileManager.count()) }, url: f._encodeURI(s), type: "POST", dataType: "json", data: n, cache: !1, processData: !1, contentType: !1 }, d = e.extend(!0, {}, c, f._ajaxSettings), p = f.taskManager.addTask(o + "-" + l, function() {
                var t, i, a = this.self;
                t = a.ajaxQueue.shift(), i = e.ajax(t), a.ajaxRequests.push(i)
            }), f.ajaxQueue.push(d), p.runWithContext({ self: f }))
        },
        _mergeArray: function(e, i) {
            var a = this,
                r = t.cleanArray(a[e]),
                n = t.cleanArray(i);
            a[e] = r.concat(n)
        },
        _initUploadSuccess: function(i, a, r) {
            var n, o, l, s, d, c, u, p, f, g, m = this;
            return !m.showPreview || "object" != typeof i || e.isEmptyObject(i) ? void m._resetCaption() : (void 0 !== i.initialPreview && i.initialPreview.length > 0 && (m.hasInitData = !0, c = i.initialPreview || [], u = i.initialPreviewConfig || [], p = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append, c.length > 0 && !t.isArray(c) && (c = c.split(m.initialPreviewDelimiter)), c.length && (m._mergeArray("initialPreview", c), m._mergeArray("initialPreviewConfig", u), m._mergeArray("initialPreviewThumbTags", p)), void 0 !== a ? r ? (f = a.attr("id"), g = m._getUploadCacheIndex(f), null !== g && (m.uploadCache[g] = { id: f, content: c[0], config: u[0] || [], tags: p[0] || [], append: n })) : (l = m.previewCache.add(c[0], u[0], p[0], n), o = m.previewCache.get(l, !1), s = t.createElement(o).hide().appendTo(a), d = s.find(".kv-zoom-cache"), d && d.length && d.appendTo(a), a.fadeOut("slow", function() {
                var e = s.find(".file-preview-frame");
                e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), m._initPreviewActions(), m._clearFileInput(), a.remove(), s.remove(), m._initSortable()
            })) : (m.previewCache.set(c, u, p, n), m._initPreview(), m._initPreviewActions())), void m._resetCaption())
        },
        _getUploadCacheIndex: function(e) {
            var t, i, a = this,
                r = a.uploadCache.length;
            for (t = 0; r > t; t++)
                if (i = a.uploadCache[t], i.id === e) return t;
            return null
        },
        _initSuccessThumbs: function() {
            var i = this;
            i.showPreview && i._getThumbs(t.FRAMES + ".file-preview-success").each(function() {
                var a = e(this),
                    r = a.find(".kv-file-remove");
                r.removeAttr("disabled"), i._handler(r, "click", function() {
                    var e = a.attr("id"),
                        r = i._raise("filesuccessremove", [e, a.attr("data-fileindex")]);
                    t.cleanMemory(a), r !== !1 && a.fadeOut("slow", function() { a.remove(), i.getFrames().length || i.reset() })
                })
            })
        },
        _updateInitialPreview: function() {
            var t = this,
                i = t.uploadCache;
            t.showPreview && (e.each(i, function(e, i) { t.previewCache.add(i.content, i.config, i.tags, i.append) }), t.hasInitData && (t._initPreview(), t._initPreviewActions()))
        },
        _uploadSingle: function(i, a, r) {
            var n, o, l, s, d, c, u, p, f, g, m, h, v, w = this,
                b = w.fileManager,
                _ = b.count(),
                C = new FormData,
                y = w._getThumbId(a),
                x = _ > 0 || !e.isEmptyObject(w.uploadExtraData),
                T = w.ajaxOperations.uploadThumb,
                P = b.getFile(a),
                k = { id: y, index: i, fileId: a },
                F = w.fileManager.getFileName(a, !0);
            w.enableResumableUpload || (w.showPreview && (o = w.fileManager.getThumb(a), u = o.find(".file-thumb-progress"), s = o.find(".kv-file-upload"), d = o.find(".kv-file-remove"), u.show()), 0 === _ || !x || w.showPreview && s && s.hasClass("disabled") || w._abort(k) || (v = function() { c ? b.errors.push(a) : b.removeFile(a), b.setProcessed(a), b.isProcessed() && (w.fileBatchCompleted = !0, l()) }, l = function() {
                var e;
                w.fileBatchCompleted && setTimeout(function() {
                    var i = 0 === b.count(),
                        a = b.errors.length;
                    w._updateInitialPreview(), w.unlock(i), i && w._clearFileInput(), e = w.$preview.find(".file-preview-initial"), w.uploadAsync && e.length && (t.addCss(e, t.SORT_CSS), w._initSortable()), w._raise("filebatchuploadcomplete", [b.stack, w._getExtraData()]), w.retryErrorUploads && 0 !== a || b.clear(), w._setProgress(101), w.ajaxAborted = !1
                }, w.processDelay)
            }, p = function(l) { n = w._getOutData(C, l), b.initStats(a), w.fileBatchCompleted = !1, r || (w.ajaxAborted = !1), w.showPreview && (o.hasClass("file-preview-success") || (w._setThumbStatus(o, "Loading"), t.addCss(o, "file-uploading")), s.attr("disabled", !0), d.attr("disabled", !0)), r || w.lock(), -1 !== b.errors.indexOf(a) && delete b.errors[a], w._raise("filepreupload", [n, y, i]), e.extend(!0, k, n), w._abort(k) && (l.abort(), r || (w._setThumbStatus(o, "New"), o.removeClass("file-uploading"), s.removeAttr("disabled"), d.removeAttr("disabled"), w.unlock()), w._setProgressCancelled()) }, g = function(l, d, p) {
                var g = w.showPreview && o.attr("id") ? o.attr("id") : y;
                n = w._getOutData(C, p, l), e.extend(!0, k, n), setTimeout(function() { t.isEmpty(l) || t.isEmpty(l.error) ? (w.showPreview && (w._setThumbStatus(o, "Success"), s.hide(), w._initUploadSuccess(l, o, r), w._setProgress(101, u)), w._raise("fileuploaded", [n, g, i]), r ? v() : w.fileManager.remove(o)) : (c = !0, f = w._parseError(T, p, w.msgUploadError, w.fileManager.getFileName(a)), w._showFileError(f, k), w._setPreviewError(o, !0), w.retryErrorUploads || s.hide(), r && v(), w._setProgress(101, w._getFrame(g).find(".file-thumb-progress"), w.msgUploadError)) }, w.processDelay)
            }, m = function() { w.showPreview && (s.removeAttr("disabled"), d.removeAttr("disabled"), o.removeClass("file-uploading")), r ? l() : (w.unlock(!1), w._clearFileInput()), w._initSuccessThumbs() }, h = function(t, i, n) {
                f = w._parseError(T, t, n, w.fileManager.getFileName(a)), c = !0, setTimeout(function() {
                    var i;
                    r && v(), w.fileManager.setProgress(a, 100), w._setPreviewError(o, !0), w.retryErrorUploads || s.hide(), e.extend(!0, k, w._getOutData(C, t)), w._setProgress(101, w.$progress, w.msgAjaxProgressError.replace("{operation}", T)), i = w.showPreview && o ? o.find(".file-thumb-progress") : "", w._setProgress(101, i, w.msgUploadError), w._showFileError(f, k)
                }, w.processDelay)
            }, C.append(w.uploadFileAttr, P.file, F), w._setUploadData(C, { fileId: a }), w._ajaxSubmit(p, g, m, h, C, a, i)))
        },
        _uploadBatch: function() {
            var i, a, r, n, o, l, s = this,
                d = s.fileManager,
                c = d.total(),
                u = {},
                p = c > 0 || !e.isEmptyObject(s.uploadExtraData),
                f = new FormData,
                g = s.ajaxOperations.uploadBatch;
            if (0 !== c && p && !s._abort(u)) {
                l = function() { s.fileManager.clear(), s._clearFileInput() }, i = function(i) {
                    s.lock(), d.initStats();
                    var a = s._getOutData(f, i);
                    s.ajaxAborted = !1, s.showPreview && s._getThumbs().each(function() {
                        var i = e(this),
                            a = i.find(".kv-file-upload"),
                            r = i.find(".kv-file-remove");
                        i.hasClass("file-preview-success") || (s._setThumbStatus(i, "Loading"), t.addCss(i, "file-uploading")), a.attr("disabled", !0), r.attr("disabled", !0)
                    }), s._raise("filebatchpreupload", [a]), s._abort(a) && (i.abort(), s._getThumbs().each(function() {
                        var t = e(this),
                            i = t.find(".kv-file-upload"),
                            a = t.find(".kv-file-remove");
                        t.hasClass("file-preview-loading") && (s._setThumbStatus(t, "New"), t.removeClass("file-uploading")), i.removeAttr("disabled"), a.removeAttr("disabled")
                    }), s._setProgressCancelled())
                }, a = function(i, a, r) {
                    var n = s._getOutData(f, r, i),
                        d = 0,
                        c = s._getThumbs(":not(.file-preview-success)"),
                        u = t.isEmpty(i) || t.isEmpty(i.errorkeys) ? [] : i.errorkeys;
                    t.isEmpty(i) || t.isEmpty(i.error) ? (s._raise("filebatchuploadsuccess", [n]), l(), s.showPreview ? (c.each(function() {
                        var t = e(this);
                        s._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), t.find(".kv-file-upload").hide().removeAttr("disabled")
                    }), s._initUploadSuccess(i)) : s.reset(), s._setProgress(101)) : (s.showPreview && (c.each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), t.find(".kv-file-upload").removeAttr("disabled"), t.find(".kv-file-remove").removeAttr("disabled"), 0 === u.length || -1 !== e.inArray(d, u) ? (s._setPreviewError(t, !0), s.retryErrorUploads || (t.find(".kv-file-upload").hide(), s.fileManager.remove(t))) : (t.find(".kv-file-upload").hide(), s._setThumbStatus(t, "Success"), s.fileManager.remove(t)), t.hasClass("file-preview-error") && !s.retryErrorUploads || d++
                    }), s._initUploadSuccess(i)), o = s._parseError(g, r, s.msgUploadError), s._showFileError(o, n, "filebatchuploaderror"), s._setProgress(101, s.$progress, s.msgUploadError))
                }, n = function() { s.unlock(), s._initSuccessThumbs(), s._clearFileInput(), s._raise("filebatchuploadcomplete", [s.fileManager.stack, s._getExtraData()]) }, r = function(t, i, a) {
                    var r = s._getOutData(f, t);
                    o = s._parseError(g, t, a), s._showFileError(o, r, "filebatchuploaderror"), s.uploadFileCount = c - 1, s.showPreview && (s._getThumbs().each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), s.fileManager.getFile(t.attr("data-fileid")) && s._setPreviewError(t)
                    }), s._getThumbs().removeClass("file-uploading"), s._getThumbs(" .kv-file-upload").removeAttr("disabled"), s._getThumbs(" .kv-file-delete").removeAttr("disabled"), s._setProgress(101, s.$progress, s.msgAjaxProgressError.replace("{operation}", g)))
                };
                var m = 0;
                e.each(s.fileManager.stack, function(e, i) { t.isEmpty(i.file) || f.append(s.uploadFileAttr, i.file, i.nameFmt || "untitled_" + m), m++ }), s._ajaxSubmit(i, a, n, r, f)
            }
        },
        _uploadExtraOnly: function() {
            var e, i, a, r, n, o = this,
                l = {},
                s = new FormData,
                d = o.ajaxOperations.uploadExtra;
            o._abort(l) || (e = function(e) {
                o.lock();
                var t = o._getOutData(s, e);
                o._raise("filebatchpreupload", [t]), o._setProgress(50), l.data = t, l.xhr = e, o._abort(l) && (e.abort(), o._setProgressCancelled())
            }, i = function(e, i, a) {
                var r = o._getOutData(s, a, e);
                t.isEmpty(e) || t.isEmpty(e.error) ? (o._raise("filebatchuploadsuccess", [r]), o._clearFileInput(), o._initUploadSuccess(e), o._setProgress(101)) : (n = o._parseError(d, a, o.msgUploadError), o._showFileError(n, r, "filebatchuploaderror"))
            }, a = function() { o.unlock(), o._clearFileInput(), o._raise("filebatchuploadcomplete", [o.fileManager.stack, o._getExtraData()]) }, r = function(e, t, i) {
                var a = o._getOutData(s, e);
                n = o._parseError(d, e, i), l.data = a, o._showFileError(n, a, "filebatchuploaderror"), o._setProgress(101, o.$progress, o.msgAjaxProgressError.replace("{operation}", d))
            }, o._ajaxSubmit(e, i, a, r, s))
        },
        _deleteFileIndex: function(i) {
            var a = this,
                r = i.attr("data-fileindex"),
                n = a.reversePreviewOrder;
            r.substring(0, 5) === t.INIT_FLAG && (r = parseInt(r.replace(t.INIT_FLAG, "")), a.initialPreview = t.spliceArray(a.initialPreview, r, n), a.initialPreviewConfig = t.spliceArray(a.initialPreviewConfig, r, n), a.initialPreviewThumbTags = t.spliceArray(a.initialPreviewThumbTags, r, n), a.getFrames().each(function() {
                var i = e(this),
                    a = i.attr("data-fileindex");
                a.substring(0, 5) === t.INIT_FLAG && (a = parseInt(a.replace(t.INIT_FLAG, "")), a > r && (a--, i.attr("data-fileindex", t.INIT_FLAG + a)))
            }))
        },
        _resetCaption: function() {
            var e = this;
            setTimeout(function() {
                var t, i, a, r = e.previewCache.count(!0),
                    n = e.fileManager.count(),
                    o = ":not(.file-preview-success):not(.file-preview-error)",
                    l = e.showPreview && e.getFrames(o).length;
                0 !== n || 0 !== r || l ? (i = r + n, i > 1 ? t = e._getMsgSelected(i) : (a = e.fileManager.getFirstFile(), t = a ? a.nameFmt : "_"), e._setCaption(t)) : e.reset()
            }, e.processDelay)
        },
        _initFileActions: function() {
            var i = this;
            i.showPreview && (i._initZoomButton(), i.getFrames(" .kv-file-remove").each(function() {
                var a, r, n = e(this),
                    o = n.closest(t.FRAMES),
                    l = o.attr("id"),
                    s = o.attr("data-fileindex");
                i._handler(n, "click", function() { return r = i._raise("filepreremove", [l, s]), r !== !1 && i._validateMinCount() ? (a = o.hasClass("file-preview-error"), t.cleanMemory(o), void o.fadeOut("slow", function() { i.fileManager.remove(o), i._clearObjects(o), o.remove(), l && a && i.$errorContainer.find('li[data-thumb-id="' + l + '"]').fadeOut("fast", function() { e(this).remove(), i._errorsExist() || i._resetErrors() }), i._clearFileInput(), i._resetCaption(), i._raise("fileremoved", [l, s]) })) : !1 })
            }), i.getFrames(" .kv-file-upload").each(function() {
                var a = e(this);
                i._handler(a, "click", function() {
                    var e = a.closest(t.FRAMES),
                        r = e.attr("data-fileid");
                    i._hideProgress(), e.hasClass("file-preview-error") && !i.retryErrorUploads || i._uploadSingle(i.fileManager.getIndex(r), r, !1)
                })
            }))
        },
        _initPreviewActions: function() {
            var i = this,
                a = i.$preview,
                r = i.deleteExtraData || {},
                n = t.FRAMES + " .kv-file-remove",
                o = i.fileActionSettings,
                l = o.removeClass,
                s = o.removeErrorClass,
                d = function() {
                    var e = i.isAjaxUpload ? i.previewCache.count(!0) : i._inputFileCount();
                    i.getFrames().length || e || (i._setCaption(""), i.reset(), i.initialCaption = "")
                };
            i._initZoomButton(), a.find(n).each(function() {
                var a, n, o, c, u = e(this),
                    p = u.data("url") || i.deleteUrl,
                    f = u.data("key"),
                    g = i.ajaxOperations.deleteThumb;
                if (!t.isEmpty(p) && void 0 !== f) {
                    "function" == typeof p && (p = p());
                    var m, h, v, w, b, _ = u.closest(t.FRAMES),
                        C = i.previewCache.data,
                        y = _.attr("data-fileindex");
                    y = parseInt(y.replace(t.INIT_FLAG, "")), v = t.isEmpty(C.config) && t.isEmpty(C.config[y]) ? null : C.config[y], b = t.isEmpty(v) || t.isEmpty(v.extra) ? r : v.extra, w = v && (v.filename || v.caption) || "", "function" == typeof b && (b = b()), h = { id: u.attr("id"), key: f, extra: b }, n = function(e) { i.ajaxAborted = !1, i._raise("filepredelete", [f, e, b]), i._abort() ? e.abort() : (u.removeClass(s), t.addCss(_, "file-uploading"), t.addCss(u, "disabled " + l)) }, o = function(e, r, n) { var o, c; return t.isEmpty(e) || t.isEmpty(e.error) ? (_.removeClass("file-uploading").addClass("file-deleted"), void _.fadeOut("slow", function() { y = parseInt(_.attr("data-fileindex").replace(t.INIT_FLAG, "")), i.previewCache.unset(y), i._deleteFileIndex(_), o = i.previewCache.count(!0), c = o > 0 ? i._getMsgSelected(o) : "", i._setCaption(c), i._raise("filedeleted", [f, n, b]), i._clearObjects(_), _.remove(), d() })) : (h.jqXHR = n, h.response = e, a = i._parseError(g, n, i.msgDeleteError, w), i._showFileError(a, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + l).addClass(s), void d()) }, c = function(e, t, a) {
                        var r = i._parseError(g, e, a, w);
                        h.jqXHR = e, h.response = {}, i._showFileError(r, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + l).addClass(s), d()
                    }, i._initAjaxSettings(), i._mergeAjaxCallback("beforeSend", n, "delete"), i._mergeAjaxCallback("success", o, "delete"), i._mergeAjaxCallback("error", c, "delete"), m = e.extend(!0, {}, { url: i._encodeURI(p), type: "POST", dataType: "json", data: e.extend(!0, {}, { key: f }, b) }, i._ajaxDeleteSettings), i._handler(u, "click", function() { return i._validateMinCount() ? (i.ajaxAborted = !1, i._raise("filebeforedelete", [f, b]), void(i.ajaxAborted instanceof Promise ? i.ajaxAborted.then(function(t) { t || e.ajax(m) }) : i.ajaxAborted || e.ajax(m))) : !1 })
                }
            })
        },
        _hideFileIcon: function() {
            var e = this;
            e.overwriteInitial && e.$captionContainer.removeClass("icon-visible")
        },
        _showFileIcon: function() {
            var e = this;
            t.addCss(e.$captionContainer, "icon-visible")
        },
        _getSize: function(t, i) {
            var a, r, n = this,
                o = parseFloat(t),
                l = n.fileSizeGetter;
            return e.isNumeric(t) && e.isNumeric(o) ? ("function" == typeof l ? r = l(o) : 0 === o ? r = "0.00 B" : (a = Math.floor(Math.log(o) / Math.log(1024)), i || (i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]), r = 1 * (o / Math.pow(1024, a)).toFixed(2) + " " + i[a]), n._getLayoutTemplate("size").replace("{sizeText}", r)) : ""
        },
        _getFileType: function(e) { var t = this; return t.mimeTypeAliases[e] || e },
        _generatePreviewTemplate: function(i, a, r, n, o, l, s, d, c, u, p, f, g, m) {
            var h, v, w, b = this,
                _ = b.slug(r),
                C = "",
                y = "",
                x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                T = _,
                P = _,
                k = "type-default",
                F = u || b._renderFileFooter(i, _, d, "auto", s),
                E = b.preferIconicPreview,
                S = b.preferIconicZoomPreview,
                I = E ? "other" : i;
            return v = 400 > x ? b.previewSettingsSmall[I] || b.defaults.previewSettingsSmall[I] : b.previewSettings[I] || b.defaults.previewSettings[I], v && e.each(v, function(e, t) { y += e + ":" + t + ";" }), w = function(a, s, d, u) {
                var m = d ? "zoom-" + o : o,
                    h = b._getPreviewTemplate(a),
                    v = (c || "") + " " + u;
                return b.frameClass && (v = b.frameClass + " " + v), d && (v = v.replace(" " + t.SORT_CSS, "")), h = b._parseFilePreviewIcon(h, r), "text" === a && (s = t.htmlEncode(s)), "object" !== i || n || e.each(b.defaults.fileTypeSettings, function(e, t) { "object" !== e && "other" !== e && t(r, n) && (k = "type-" + e) }), t.isEmpty(g) || (void 0 !== g.title && null !== g.title && (T = g.title), void 0 !== g.alt && null !== g.alt && (T = g.alt)), h.setTokens({ previewId: m, caption: _, title: T, alt: P, frameClass: v, type: b._getFileType(n), fileindex: p, fileid: l || "", typeCss: k, footer: F, data: s, template: f || i, style: y ? 'style="' + y + '"' : "" })
            }, p = p || o.slice(o.lastIndexOf("-") + 1), b.fileActionSettings.showZoom && (C = w(S ? "other" : i, m ? m : a, !0, "kv-zoom-thumb")), C = "\n" + b._getLayoutTemplate("zoomCache").replace("{zoomContent}", C), "function" == typeof b.sanitizeZoomCache && (C = b.sanitizeZoomCache(C)), h = w(E ? "other" : i, a, !1, "kv-preview-thumb"), h.setTokens({ zoomCache: C })
        },
        _addToPreview: function(e, i) { var a, r = this; return i = t.cspBuffer.stash(i), a = r.reversePreviewOrder ? e.prepend(i) : e.append(i), t.cspBuffer.apply(e), a },
        _previewDefault: function(e, i) {
            var a = this,
                r = a.$preview;
            if (a.showPreview) {
                var n, o = t.getFileName(e),
                    l = e ? e.type : "",
                    s = e.size || 0,
                    d = a._getFileName(e, ""),
                    c = i === !0 && !a.isAjaxUpload,
                    u = t.createObjectURL(e),
                    p = a.fileManager.getId(e),
                    f = a._getThumbId(p);
                a._clearDefaultPreview(), n = a._generatePreviewTemplate("other", u, o, l, f, p, c, s), a._addToPreview(r, n), a._setThumbAttr(f, d, s), i === !0 && a.isAjaxUpload && a._setThumbStatus(a._getFrame(f), "Error")
            }
        },
        _previewFile: function(e, i, a, r, n) {
            if (this.showPreview) {
                var o, l = this,
                    s = t.getFileName(i),
                    d = n.type,
                    c = n.name,
                    u = l._parseFileType(d, s),
                    p = l.$preview,
                    f = i.size || 0,
                    g = "text" === u || "html" === u || "image" === u ? a.target.result : r,
                    m = l.fileManager.getId(i),
                    h = l._getThumbId(m);
                "html" === u && l.purifyHtml && window.DOMPurify && (g = window.DOMPurify.sanitize(g)), o = l._generatePreviewTemplate(u, g, s, d, h, m, !1, f), l._clearDefaultPreview(), l._addToPreview(p, o);
                var v = l._getFrame(h);
                l._validateImageOrientation(v.find("img"), i, h, m, c, d, f, g), l._setThumbAttr(h, c, f), l._initSortable()
            }
        },
        _setThumbAttr: function(e, t, i) {
            var a = this,
                r = a._getFrame(e);
            r.length && (i = i && i > 0 ? a._getSize(i) : "", r.data({ caption: t, size: i }))
        },
        _setInitThumbAttr: function() {
            var e, i, a, r, n = this,
                o = n.previewCache.data,
                l = n.previewCache.count(!0);
            if (0 !== l)
                for (var s = 0; l > s; s++) e = o.config[s], r = n.previewInitId + "-" + t.INIT_FLAG + s, i = t.ifSet("caption", e, t.ifSet("filename", e)), a = t.ifSet("size", e), n._setThumbAttr(r, i, a)
        },
        _slugDefault: function(e) { return t.isEmpty(e, !0) ? "" : String(e).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_") },
        _updateFileDetails: function(e, i) {
            var a, r, n, o, l, s = this,
                d = s.$element,
                c = t.isIE(9) && t.findFileName(d.val()) || d[0].files[0] && d[0].files[0].name;
            !c && s.fileManager.count() > 0 ? (l = s.fileManager.getFirstFile(), a = l.nameFmt) : a = c ? s.slug(c) : "_", r = s.isAjaxUpload ? s.fileManager.count() : e, o = s.previewCache.count(!0) + r, n = 1 === r ? a : s._getMsgSelected(o), s.isError ? (s.$previewContainer.removeClass("file-thumb-loading"), s.$previewStatus.html(""), s.$captionContainer.removeClass("icon-visible")) : s._showFileIcon(), s._setCaption(n, s.isError), s.$container.removeClass("file-input-new file-input-ajax-new"), i || s._raise("fileselect", [e, a]), s.previewCache.count(!0) && s._initPreviewActions()
        },
        _setThumbStatus: function(e, i) {
            var a = this;
            if (a.showPreview) {
                var r = "indicator" + i,
                    n = r + "Title",
                    o = "file-preview-" + i.toLowerCase(),
                    l = e.find(".file-upload-indicator"),
                    s = a.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-paused file-preview-loading"), "Success" === i && e.find(".file-drag-handle").remove(), t.setHtml(l, s[r]), l.attr("title", s[n]), e.addClass(o), "Error" !== i || a.retryErrorUploads || e.find(".kv-file-upload").attr("disabled", !0)
            }
        },
        _setProgressCancelled: function() {
            var e = this;
            e._setProgress(101, e.$progress, e.msgCancelled)
        },
        _setProgress: function(e, i, a, r) {
            var n = this;
            if (i = i || n.$progress, i.length) {
                var o, l = Math.min(e, 100),
                    s = n.progressUploadThreshold,
                    d = 100 >= e ? n.progressTemplate : n.progressCompleteTemplate,
                    c = 100 > l ? n.progressTemplate : a ? n.paused ? n.progressPauseTemplate : n.progressErrorTemplate : d;
                e >= 100 && (r = ""), t.isEmpty(c) || (o = s && l > s && 100 >= e ? c.setTokens({ percent: s, status: n.msgUploadThreshold }) : c.setTokens({ percent: l, status: e > 100 ? n.msgUploadEnd : l + "%" }), r = r || "", o = o.setTokens({ stats: r }), t.setHtml(i, o), a && t.setHtml(i.find('[role="progressbar"]'), a))
            }
        },
        _hasFiles: function() { var e = this.$element[0]; return !!(e && e.files && e.files.length) },
        _setFileDropZoneTitle: function() {
            var e, i = this,
                a = i.$container.find(".file-drop-zone"),
                r = i.dropZoneTitle;
            i.isClickable && (e = t.isEmpty(i.$element.attr("multiple")) ? i.fileSingle : i.filePlural, r += i.dropZoneClickTitle.replace("{files}", e)), a.find("." + i.dropZoneTitleClass).remove(), !i.showPreview || 0 === a.length || i.fileManager.count() > 0 || !i.dropZoneEnabled || i.previewCache.count() > 0 || !i.isAjaxUpload && i._hasFiles() || (0 === a.find(t.FRAMES).length && t.isEmpty(i.defaultPreviewContent) && a.prepend('<div class="' + i.dropZoneTitleClass + '">' + r + "</div>"), i.$container.removeClass("file-input-new"), t.addCss(i.$container, "file-input-ajax-new"))
        },
        _getStats: function(e) { var i, a, r = this; return r.showUploadStats && e && e.bitrate ? (a = r._getLayoutTemplate("stats"), i = e.elapsed && e.bps ? r.msgPendingTime.setTokens({ time: t.getElapsed(Math.ceil(e.pendingBytes / e.bps)) }) : r.msgCalculatingTime, a.setTokens({ uploadSpeed: e.bitrate, pendingTime: i })) : "" },
        _setResumableProgress: function(e, t, i) {
            var a = this,
                r = a.resumableManager,
                n = i ? r : a,
                o = i ? i.find(".file-thumb-progress") : null;
            0 === n.lastProgress && (n.lastProgress = e), e < n.lastProgress && (e = n.lastProgress), a._setProgress(e, o, null, a._getStats(t)), n.lastProgress = e
        },
        _toggleResumableProgress: function(e, i) {
            var a = this,
                r = a.$progress;
            r && r.length && t.setHtml(r, e.setTokens({ percent: 101, status: i, stats: "" }))
        },
        _setFileUploadStats: function(i, a, r, n) {
            var o = this,
                l = o.$progress;
            if (o.showPreview || l && l.length) {
                var s, d = o.fileManager,
                    c = d.getThumb(i),
                    u = o.resumableManager,
                    p = 0,
                    f = d.getTotalSize(),
                    g = e.extend(!0, {}, n);
                if (o.enableResumableUpload) {
                    var m, h = n.loaded,
                        v = u.getUploadedSize(),
                        w = u.file.size;
                    h += v, m = d.uploadedSize + h, a = t.round(100 * h / w), n.pendingBytes = w - v, o._setResumableProgress(a, n, c), s = Math.floor(100 * m / f), g.pendingBytes = f - m, o._setResumableProgress(s, g)
                } else d.setProgress(i, a), l = c && c.length ? c.find(".file-thumb-progress") : null, o._setProgress(a, l, null, o._getStats(n)), e.each(d.stats, function(e, t) { p += t.loaded }), g.pendingBytes = f - p, s = t.round(p / f * 100), o._setProgress(s, null, null, o._getStats(g))
            }
        },
        _validateMinCount: function() {
            var e = this,
                t = e.isAjaxUpload ? e.fileManager.count() : e._inputFileCount();
            return e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(t - 1) < e.minFileCount ? (e._noFilesError({}), !1) : !0
        },
        _getFileCount: function(e, t) {
            var i = this,
                a = 0;
            return void 0 === t && (t = i.validateInitialCount && !i.overwriteInitial), t && (a = i.previewCache.count(!0), e += a), e
        },
        _getFileId: function(e) { return t.getFileId(e, this.generateFileId) },
        _getFileName: function(e, i) {
            var a = this,
                r = t.getFileName(e);
            return r ? a.slug(r) : i
        },
        _getFileNames: function(e) { var t = this; return t.filenames.filter(function(t) { return e ? void 0 !== t : void 0 !== t && null !== t }) },
        _setPreviewError: function(e, t) {
            var i = this,
                a = i.removeFromPreviewOnError && !i.retryErrorUploads;
            if (t && !a || i.fileManager.remove(e), i.showPreview) {
                if (a) return void e.remove();
                i._setThumbStatus(e, "Error"), i._refreshUploadButton(e)
            }
        },
        _refreshUploadButton: function(e) {
            var i = this,
                a = e.find(".kv-file-upload"),
                r = i.fileActionSettings,
                n = r.uploadIcon,
                o = r.uploadTitle;
            a.length && (i.retryErrorUploads && (n = r.uploadRetryIcon, o = r.uploadRetryTitle), a.attr("title", o), t.setHtml(a, n))
        },
        _checkDimensions: function(e, i, a, r, n, o, l) {
            var s, d, c, u, p = this,
                f = "Small" === i ? "min" : "max",
                g = p[f + "Image" + o];
            !t.isEmpty(g) && a.length && (c = a[0], d = "Width" === o ? c.naturalWidth || c.width : c.naturalHeight || c.height, u = "Small" === i ? d >= g : g >= d, u || (s = p["msgImage" + o + i].setTokens({ name: n, size: g }), p._showFileError(s, l), p._setPreviewError(r)))
        },
        _getExifObj: function(e) {
            var i, a = this,
                r = t.logMessages.exifWarning;
            if ("data:image/jpeg;base64," !== e.slice(0, 23) && "data:image/jpg;base64," !== e.slice(0, 22)) return void(i = null);
            try { i = window.piexif ? window.piexif.load(e) : null } catch (n) { i = null, r = n && n.message || "" }
            return i || a._log(t.logMessages.badExifParser, { details: r }), i
        },
        setImageOrientation: function(i, a, r, n) {
            var o, l, s, d = this,
                c = !i || !i.length,
                u = !a || !a.length,
                p = !1,
                f = c && n && "image" === n.attr("data-template");
            c && u || (s = "load.fileinputimageorient", f ? (i = a, a = null, i.css(d.previewSettings.image), l = e(document.createElement("div")).appendTo(n.find(".kv-file-content")), o = e(document.createElement("span")).insertBefore(i), i.css("visibility", "hidden").removeClass("file-zoom-detail").appendTo(l)) : p = !i.is(":visible"), i.off(s).on(s, function() {
                p && (d.$preview.removeClass("hide-content"), n.find(".kv-file-content").css("visibility", "hidden"));
                var e = i[0],
                    s = a && a.length ? a[0] : null,
                    c = e.offsetHeight,
                    u = e.offsetWidth,
                    g = t.getRotation(r);
                if (p && (n.find(".kv-file-content").css("visibility", "visible"), d.$preview.addClass("hide-content")), i.data("orientation", r), s && a.data("orientation", r), 5 > r) return t.setTransform(e, g), void t.setTransform(s, g);
                var m = Math.atan(u / c),
                    h = Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)),
                    v = h ? c / Math.cos(Math.PI / 2 + m) / h : 1,
                    w = " scale(" + Math.abs(v) + ")";
                t.setTransform(e, g + w), t.setTransform(s, g + w), f && (i.css("visibility", "visible").insertAfter(o).addClass("file-zoom-detail"), o.remove(), l.remove())
            }))
        },
        _validateImageOrientation: function(i, a, r, n, o, l, s, d) {
            var c, u, p, f = this,
                g = f.autoOrientImage;
            return f.canOrientImage ? void i.css("image-orientation", g ? "from-image" : "none") : (p = t.getZoomSelector(r, " img"), c = g ? f._getExifObj(d) : null, (u = c ? c["0th"][piexif.ImageIFD.Orientation] : null) ? (f.setImageOrientation(i, e(p), u, f._getFrame(r)), f._raise("fileimageoriented", { $img: i, file: a }), void f._validateImage(r, n, o, l, s, d, c)) : void f._validateImage(r, n, o, l, s, d, c))
        },
        _validateImage: function(t, i, a, r, n, o, l) {
            var s, d, c, u = this,
                p = u.$preview,
                f = u._getFrame(t),
                g = f.attr("data-fileindex"),
                m = f.find("img");
            a = a || "Untitled", m.one("load", function() { d = f.width(), c = p.width(), d > c && m.css("width", "100%"), s = { ind: g, id: t, fileId: i }, u._checkDimensions(g, "Small", m, f, a, "Width", s), u._checkDimensions(g, "Small", m, f, a, "Height", s), u.resizeImage || (u._checkDimensions(g, "Large", m, f, a, "Width", s), u._checkDimensions(g, "Large", m, f, a, "Height", s)), u._raise("fileimageloaded", [t]), u.fileManager.addImage(i, { ind: g, img: m, thumb: f, pid: t, typ: r, siz: n, validated: !1, imgData: o, exifObj: l }), f.data("exif", l), u._validateAllImages() }).one("error", function() { u._raise("fileimageloaderror", [t]) }).each(function() { this.complete ? e(this).trigger("load") : this.error && e(this).trigger("error") })
        },
        _validateAllImages: function() {
            var t, i = this,
                a = { val: 0 },
                r = i.fileManager.getImageCount(),
                n = i.resizeIfSizeMoreThan;
            r === i.fileManager.totalImages && (i._raise("fileimagesloaded"), i.resizeImage && e.each(i.fileManager.loadedImages, function(e, o) { o.validated || (t = o.siz, t && t > 1e3 * n && i._getResizedImage(e, o, a, r), o.validated = !0) }))
        },
        _getResizedImage: function(i, a, r, n) {
            var o, l, s, d, c, u, p, f, g, m, h = this,
                v = e(a.img)[0],
                w = v.naturalWidth,
                b = v.naturalHeight,
                _ = 1,
                C = h.maxImageWidth || w,
                y = h.maxImageHeight || b,
                x = !(!w || !b),
                T = h.imageCanvas,
                P = h.imageCanvasContext,
                k = a.typ,
                F = a.pid,
                E = a.ind,
                S = a.thumb,
                I = a.exifObj;
            if (c = function(e, t, i) { h.isAjaxUpload ? h._showFileError(e, t, i) : h._showError(e, t, i), h._setPreviewError(S) }, f = h.fileManager.getFile(i), g = { id: F, index: E, fileId: i }, m = [i, F, E], (!f || !x || C >= w && y >= b) && (x && f && h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized"), !x)) return void c(h.msgImageResizeError, g, "fileimageresizeerror");
            k = k || h.resizeDefaultImageType, l = w > C, s = b > y, _ = "width" === h.resizePreference ? l ? C / w : s ? y / b : 1 : s ? y / b : l ? C / w : 1, h._resetCanvas(), w *= _, b *= _, T.width = w, T.height = b;
            try { P.drawImage(v, 0, 0, w, b), d = T.toDataURL(k, h.resizeQuality), I && (p = window.piexif.dump(I), d = window.piexif.insert(p, d)), o = t.dataURI2Blob(d), h.fileManager.setFile(i, o), h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), o instanceof Blob || c(h.msgImageResizeError, g, "fileimageresizeerror") } catch (A) { r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), u = h.msgImageResizeException.replace("{errors}", A.message), c(u, g, "fileimageresizeexception") }
        },
        _showProgress: function() {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.show()
        },
        _hideProgress: function() {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.hide()
        },
        _initBrowse: function(e) {
            var i = this,
                a = i.$element;
            i.showBrowse ? i.$btnFile = e.find(".btn-file").append(a) : (a.appendTo(e).attr("tabindex", -1), t.addCss(a, "file-no-browse"))
        },
        _initClickable: function() {
            var i, a, r = this;
            r.isClickable && (i = r.$dropZone, r.isAjaxUpload || (a = r.$preview.find(".file-default-preview"), a.length && (i = a)), t.addCss(i, "clickable"), i.attr("tabindex", -1), r._handler(i, "click", function(t) {
                var a = e(t.target);
                e(r.elErrorContainer + ":visible").length || a.parents(".file-preview-thumbnails").length && !a.parents(".file-default-preview").length || (r.$element.data("zoneClicked", !0).trigger("click"), i.blur())
            }))
        },
        _initCaption: function() {
            var e = this,
                i = e.initialCaption || "";
            return e.overwriteInitial || t.isEmpty(i) ? (e.$caption.val(""), !1) : (e._setCaption(i), !0)
        },
        _setCaption: function(i, a) {
            var r, n, o, l, s, d, c = this;
            if (c.$caption.length) {
                if (c.$captionContainer.removeClass("icon-visible"), a) r = e("<div>" + c.msgValidationError + "</div>").text(), l = c.fileManager.count(), l ? (d = c.fileManager.getFirstFile(), s = 1 === l && d ? d.nameFmt : c._getMsgSelected(l)) : s = c._getMsgSelected(c.msgNo), n = t.isEmpty(i) ? s : i, o = '<span class="' + c.msgValidationErrorClass + '">' + c.msgValidationErrorIcon + "</span>";
                else {
                    if (t.isEmpty(i)) return;
                    r = e("<div>" + i + "</div>").text(), n = r, o = c._getLayoutTemplate("fileIcon")
                }
                c.$captionContainer.addClass("icon-visible"), c.$caption.attr("title", r).val(n), t.setHtml(c.$captionIcon, o)
            }
        },
        _createContainer: function() {
            var e = this,
                i = { "class": "file-input file-input-new" + (e.rtl ? " kv-rtl" : "") },
                a = t.createElement(t.cspBuffer.stash(e._renderMain()));
            return t.cspBuffer.apply(a), a.insertBefore(e.$element).attr(i), e._initBrowse(a), e.theme && a.addClass("theme-" + e.theme), a
        },
        _refreshContainer: function() {
            var e = this,
                i = e.$container,
                a = e.$element;
            a.insertAfter(i), t.setHtml(i, e._renderMain()), e._initBrowse(i), e._validateDisabled()
        },
        _validateDisabled: function() {
            var e = this;
            e.$caption.attr({ readonly: e.isDisabled })
        },
        _renderMain: function() {
            var e = this,
                t = e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                i = e.showClose ? e._getLayoutTemplate("close") : "",
                a = e.showPreview ? e._getLayoutTemplate("preview").setTokens({ "class": e.previewClass, dropClass: t }) : "",
                r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                n = e.captionTemplate.setTokens({ "class": r + " kv-fileinput-caption" });
            return e.mainTemplate.setTokens({ "class": e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : ""), preview: a, close: i, caption: n, upload: e._renderButton("upload"), remove: e._renderButton("remove"), cancel: e._renderButton("cancel"), pause: e._renderButton("pause"), browse: e._renderButton("browse") })
        },
        _renderButton: function(e) {
            var i = this,
                a = i._getLayoutTemplate("btnDefault"),
                r = i[e + "Class"],
                n = i[e + "Title"],
                o = i[e + "Icon"],
                l = i[e + "Label"],
                s = i.isDisabled ? " disabled" : "",
                d = "button";
            switch (e) {
                case "remove":
                    if (!i.showRemove) return "";
                    break;
                case "cancel":
                    if (!i.showCancel) return "";
                    r += " kv-hidden";
                    break;
                case "pause":
                    if (!i.showPause) return "";
                    r += " kv-hidden";
                    break;
                case "upload":
                    if (!i.showUpload) return "";
                    i.isAjaxUpload && !i.isDisabled ? a = i._getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : d = "submit";
                    break;
                case "browse":
                    if (!i.showBrowse) return "";
                    a = i._getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return r += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.isEmpty(l) || (l = ' <span class="' + i.buttonLabelClass + '">' + l + "</span>"), a.setTokens({ type: d, css: r, title: n, status: s, icon: o, label: l })
        },
        _renderThumbProgress: function() { var e = this; return '<div class="file-thumb-progress kv-hidden">' + e.progressInfoTemplate.setTokens({ percent: 101, status: e.msgUploadBegin, stats: "" }) + "</div>" },
        _renderFileFooter: function(e, i, a, r, n) {
            var o, l, s = this,
                d = s.fileActionSettings,
                c = d.showRemove,
                u = d.showDrag,
                p = d.showUpload,
                f = d.showZoom,
                g = s._getLayoutTemplate("footer"),
                m = s._getLayoutTemplate("indicator"),
                h = n ? d.indicatorError : d.indicatorNew,
                v = n ? d.indicatorErrorTitle : d.indicatorNewTitle,
                w = m.setTokens({ indicator: h, indicatorTitle: v });
            return a = s._getSize(a), l = { type: e, caption: i, size: a, width: r, progress: "", indicator: w }, s.isAjaxUpload ? (l.progress = s._renderThumbProgress(), l.actions = s._renderFileActions(l, p, !1, c, f, u, !1, !1, !1)) : l.actions = s._renderFileActions(l, !1, !1, !1, f, u, !1, !1, !1), o = g.setTokens(l), o = t.replaceTags(o, s.previewThumbTags)
        },
        _renderFileActions: function(e, t, i, a, r, n, o, l, s, d, c, u) {
            var p = this;
            if (!e.type && d && (e.type = "image"), p.enableResumableUpload ? t = !1 : "function" == typeof t && (t = t(e)), "function" == typeof i && (i = i(e)), "function" == typeof a && (a = a(e)), "function" == typeof r && (r = r(e)), "function" == typeof n && (n = n(e)), !(t || i || a || r || n)) return "";
            var f, g = l === !1 ? "" : ' data-url="' + l + '"',
                m = "",
                h = "",
                v = s === !1 ? "" : ' data-key="' + s + '"',
                w = "",
                b = "",
                _ = "",
                C = p._getLayoutTemplate("actions"),
                y = p.fileActionSettings,
                x = p.otherActionButtons.setTokens({ dataKey: v, key: s }),
                T = o ? y.removeClass + " disabled" : y.removeClass;
            return a && (w = p._getLayoutTemplate("actionDelete").setTokens({ removeClass: T, removeIcon: y.removeIcon, removeTitle: y.removeTitle, dataUrl: g, dataKey: v, key: s })), t && (b = p._getLayoutTemplate("actionUpload").setTokens({ uploadClass: y.uploadClass, uploadIcon: y.uploadIcon, uploadTitle: y.uploadTitle })), i && (_ = p._getLayoutTemplate("actionDownload").setTokens({ downloadClass: y.downloadClass, downloadIcon: y.downloadIcon, downloadTitle: y.downloadTitle, downloadUrl: c || p.initialPreviewDownloadUrl }), _ = _.setTokens({ filename: u, key: s })), r && (m = p._getLayoutTemplate("actionZoom").setTokens({ zoomClass: y.zoomClass, zoomIcon: y.zoomIcon, zoomTitle: y.zoomTitle })), n && d && (f = "drag-handle-init " + y.dragClass, h = p._getLayoutTemplate("actionDrag").setTokens({ dragClass: f, dragTitle: y.dragTitle, dragIcon: y.dragIcon })), C.setTokens({ "delete": w, upload: b, download: _, zoom: m, drag: h, other: x })
        },
        _browse: function(e) {
            var t = this;
            e && e.isDefaultPrevented() || !t._raise("filebrowse") || (t.isError && !t.isAjaxUpload && t.clear(), t.focusCaptionOnBrowse && t.$captionContainer.focus())
        },
        _change: function(i) {
            var a = this;
            if (!a.changeTriggered) {
                var r, n, o, l, s = a.$element,
                    d = arguments.length > 1,
                    c = a.isAjaxUpload,
                    u = d ? arguments[1] : s[0].files,
                    p = a.fileManager.count(),
                    f = t.isEmpty(s.attr("multiple")),
                    g = !c && f ? 1 : a.maxFileCount,
                    m = a.maxTotalFileCount,
                    h = m > 0 && m > g,
                    v = f && p > 0,
                    w = function(t, i, r, n) {
                        var o = e.extend(!0, {}, a._getOutData(null, {}, {}, u), { id: r, index: n }),
                            l = { id: r, index: n, file: i, files: u };
                        return a.isPersistentError = !0, c ? a._showFileError(t, o) : a._showError(t, l)
                    },
                    b = function(e, t, i) {
                        var r = i ? a.msgTotalFilesTooMany : a.msgFilesTooMany;
                        r = r.replace("{m}", t).replace("{n}", e), a.isError = w(r, null, null, null), a.$captionContainer.removeClass("icon-visible"), a._setCaption("", !0), a.$container.removeClass("file-input-new file-input-ajax-new")
                    };
                if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.dropZoneEnabled && a.$container.find(".file-drop-zone ." + a.dropZoneTitleClass).remove(), c || (u = i.target && void 0 === i.target.files ? i.target.value ? [{ name: i.target.value.replace(/^.+\\/, "") }] : [] : i.target.files || {}), r = u, t.isEmpty(r) || 0 === r.length) return c || a.clear(), void a._raise("fileselectnone");
                if (a._resetErrors(), l = r.length, o = c ? a.fileManager.count() + l : l, n = a._getFileCount(o, h ? !1 : void 0), g > 0 && n > g) {
                    if (!a.autoReplace || l > g) return void b(a.autoReplace && l > g ? l : n, g);
                    n > g && a._resetPreviewThumbs(c)
                } else {
                    if (h && (n = a._getFileCount(o, !0), m > 0 && n > m)) {
                        if (!a.autoReplace || l > g) return void b(a.autoReplace && l > m ? l : n, m, !0);
                        n > g && a._resetPreviewThumbs(c)
                    }!c || v ? (a._resetPreviewThumbs(!1), v && a.clearFileStack()) : !c || 0 !== p || a.previewCache.count(!0) && !a.overwriteInitial || a._resetPreviewThumbs(!0)
                }
                a.readFiles(r)
            }
        },
        _abort: function(t) { var i, a = this; return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (i = e.extend(!0, {}, a._getOutData(null), t), i.abortData = a.ajaxAborted.data || {}, i.abortMessage = a.ajaxAborted.message, a._setProgress(101, a.$progress, a.msgCancelled), a._showFileError(a.ajaxAborted.message, i, "filecustomerror"), a.cancel(), !0) : !!a.ajaxAborted },
        _resetFileStack: function() {
            var t = this,
                i = 0;
            t._getThumbs().each(function() {
                var a = e(this),
                    r = a.attr("data-fileindex"),
                    n = a.attr("id");
                "-1" !== r && -1 !== r && (t.fileManager.getFile(a.attr("data-fileid")) ? a.attr({ "data-fileindex": "-1" }) : (a.attr({ "data-fileindex": i }), i++), t._getZoom(n).attr({ "data-fileindex": a.attr("data-fileindex") }))
            })
        },
        _isFileSelectionValid: function(e) { var t = this; return e = e || 0, t.required && !t.getFilesCount() ? (t.$errorContainer.html(""), t._showFileError(t.msgFileRequired), !1) : t.minFileCount > 0 && t._getFileCount(e) < t.minFileCount ? (t._noFilesError({}), !1) : !0 },
        _canPreview: function(e) {
            var i = this;
            if (!(e && i.showPreview && i.$preview && i.$preview.length)) return !1;
            var a, r, n, o, l = e.name || "",
                s = e.type || "",
                d = (e.size || 0) / 1e3,
                c = i._parseFileType(s, l),
                u = i.allowedPreviewTypes,
                p = i.allowedPreviewMimeTypes,
                f = i.allowedPreviewExtensions || [],
                g = i.disabledPreviewTypes,
                m = i.disabledPreviewMimeTypes,
                h = i.disabledPreviewExtensions || [],
                v = i.maxFilePreviewSize && parseFloat(i.maxFilePreviewSize) || 0,
                w = new RegExp("\\.(" + f.join("|") + ")$", "i"),
                b = new RegExp("\\.(" + h.join("|") + ")$", "i");
            return a = !u || -1 !== u.indexOf(c), r = !p || -1 !== p.indexOf(s), n = !f.length || t.compare(l, w), o = g && -1 !== g.indexOf(c) || m && -1 !== m.indexOf(s) || h.length && t.compare(l, b) || v && !isNaN(v) && d > v, !o && (a || r || n)
        },
        addToStack: function(e, t) { this.fileManager.add(e, t) },
        clearFileStack: function() { var e = this; return e.fileManager.clear(), e._initResumableUpload(), e.enableResumableUpload ? (null === e.showPause && (e.showPause = !0), null === e.showCancel && (e.showCancel = !1)) : (e.showPause = !1, null === e.showCancel && (e.showCancel = !0)), e.$element },
        getFileStack: function() { return this.fileManager.stack },
        getFileList: function() { return this.fileManager.list() },
        getFilesCount: function(e) {
            var t = this,
                i = t.isAjaxUpload ? t.fileManager.count() : t._inputFileCount();
            return e && (i += t.previewCache.count(!0)), t._getFileCount(i)
        },
        readFiles: function(i) {
            this.reader = new FileReader;
            var a, r = this,
                n = r.reader,
                o = r.$previewContainer,
                l = r.$previewStatus,
                s = r.msgLoading,
                d = r.msgProgress,
                c = r.previewInitId,
                u = i.length,
                p = r.fileTypeSettings,
                f = r.allowedFileTypes,
                g = f ? f.length : 0,
                m = r.allowedFileExtensions,
                h = t.isEmpty(m) ? "" : m.join(", "),
                v = function(t, n, o, l, s, d) {
                    var c, p = e.extend(!0, {}, r._getOutData(null, {}, {}, i), { id: o, index: l, fileId: s }),
                        f = { id: o, index: l, fileId: s, file: n, files: i };
                    d = d || r.removeFromPreviewOnError, d || r._previewDefault(n, !0), c = r._getFrame(o, !0), r.isAjaxUpload ? setTimeout(function() { a(l + 1) }, r.processDelay) : (r.unlock(), u = 0), d && c.length ? c.remove() : (r._initFileActions(), c.find(".kv-file-upload").remove()), r.isPersistentError = !0, r.isError = r.isAjaxUpload ? r._showFileError(t, p) : r._showError(t, f), r._updateFileDetails(u)
                };
            r.fileManager.clearImages(), e.each(i, function(e, t) {
                var i = r.fileTypeSettings.image;
                i && i(t.type) && r.fileManager.totalImages++
            }), a = function(w) {
                var b, _ = r.$errorContainer,
                    C = r.fileManager;
                if (w >= u) return r.unlock(), r.duplicateErrors.length && (b = "<li>" + r.duplicateErrors.join("</li><li>") + "</li>", 0 === _.find("ul").length ? t.setHtml(_, r.errorCloseButton + "<ul>" + b + "</ul>") : _.find("ul").append(b), _.fadeIn(r.fadeDelay), r._handler(_.find(".kv-error-close"), "click", function() { _.fadeOut(r.fadeDelay) }), r.duplicateErrors = []), r.isAjaxUpload ? (r._raise("filebatchselected", [C.stack]), 0 !== C.count() || r.isError || r.reset()) : r._raise("filebatchselected", [i]), o.removeClass("file-thumb-loading"), void l.html("");
                r.lock(!0);
                var y, x, T, P, k, F, E, S, I, A, D, z, M, j, U = i[w],
                    $ = c + "-" + r._getFileId(U),
                    R = p.text,
                    O = p.image,
                    B = p.html,
                    L = r._getFileName(U, ""),
                    N = (U && U.size || 0) / 1e3,
                    Z = "",
                    H = t.createObjectURL(U),
                    W = 0,
                    q = "",
                    V = !1,
                    K = 0,
                    G = function() {
                        var e = d.setTokens({ index: w + 1, files: u, percent: 50, name: L });
                        setTimeout(function() { l.html(e), r._updateFileDetails(u), a(w + 1) }, r.processDelay), r._raise("fileloaded", [U, $, w, n]) && r.isAjaxUpload && C.add(U)
                    };
                if (U) {
                    if (S = C.getId(U), g > 0)
                        for (x = 0; g > x; x++) F = f[x], E = r.msgFileTypes[F] || F, q += 0 === x ? E : ", " + E;
                    if (L === !1) return void a(w + 1);
                    if (0 === L.length) return T = r.msgInvalidFileName.replace("{name}", t.htmlEncode(t.getFileName(U), "[unknown]")), void v(T, U, $, w, S);
                    if (t.isEmpty(m) || (Z = new RegExp("\\.(" + m.join("|") + ")$", "i")), y = N.toFixed(2), r.isAjaxUpload && C.exists(S) || r._getFrame($, !0).length) { var Y = { id: $, index: w, fileId: S, file: U, files: i }; return T = r.msgDuplicateFile.setTokens({ name: L, size: y }), void(r.isAjaxUpload ? setTimeout(function() { r.duplicateErrors.push(T), r._raise("fileduplicateerror", [U, S, L, y, $, w]), a(w + 1), r._updateFileDetails(u) }, r.processDelay) : (r._showError(T, Y), r.unlock(), u = 0, r._clearFileInput(), r.reset(), r._updateFileDetails(u))) }
                    if (r.maxFileSize > 0 && N > r.maxFileSize) return T = r.msgSizeTooLarge.setTokens({ name: L, size: y, maxSize: r.maxFileSize }), void v(T, U, $, w, S);
                    if (null !== r.minFileSize && N <= t.getNum(r.minFileSize)) return T = r.msgSizeTooSmall.setTokens({ name: L, size: y, minSize: r.minFileSize }), void v(T, U, $, w, S);
                    if (!t.isEmpty(f) && t.isArray(f)) { for (x = 0; x < f.length; x += 1) P = f[x], A = p[P], W += A && "function" == typeof A && A(U.type, t.getFileName(U)) ? 1 : 0; if (0 === W) return T = r.msgInvalidFileType.setTokens({ name: L, types: q }), void v(T, U, $, w, S) }
                    if (0 === W && !t.isEmpty(m) && t.isArray(m) && !t.isEmpty(Z) && (k = t.compare(L, Z), W += t.isEmpty(k) ? 0 : k.length, 0 === W)) return T = r.msgInvalidFileExtension.setTokens({ name: L, extensions: h }), void v(T, U, $, w, S);
                    if (!r._canPreview(U)) return I = r.isAjaxUpload && r._raise("filebeforeload", [U, w, n]), r.isAjaxUpload && I && C.add(U), r.showPreview && I && (o.addClass("file-thumb-loading"), r._previewDefault(U), r._initFileActions()), void setTimeout(function() { I && r._updateFileDetails(u), a(w + 1), r._raise("fileloaded", [U, $, w]) }, 10);
                    D = R(U.type, L), z = B(U.type, L), M = O(U.type, L), l.html(s.replace("{index}", w + 1).replace("{files}", u)), o.addClass("file-thumb-loading"), n.onerror = function(e) { r._errorHandler(e, L) }, n.onload = function(i) {
                        var a, s, d, c, u, f, g = [],
                            m = function(e) {
                                var t = new FileReader;
                                t.onerror = function(e) { r._errorHandler(e, L) }, t.onload = function(e) { return r.isAjaxUpload && !r._raise("filebeforeload", [U, w, n]) ? (V = !0, r._resetCaption(), n.abort(), l.html(""), o.removeClass("file-thumb-loading"), void r.enable()) : (r._previewFile(w, U, e, H, s), r._initFileActions(), void G()) }, e ? t.readAsText(U, r.textEncoding) : t.readAsDataURL(U)
                            };
                        if (s = { name: L, type: U.type }, e.each(p, function(e, t) { "object" !== e && "other" !== e && "function" == typeof t && t(U.type, L) && K++ }), 0 === K) { for (d = new Uint8Array(i.target.result), x = 0; x < d.length; x++) c = d[x].toString(16), g.push(c); if (a = g.join("").toLowerCase().substring(0, 8), f = t.getMimeType(a, "", ""), t.isEmpty(f) && (u = t.arrayBuffer2String(n.result), f = t.isSvg(u) ? "image/svg+xml" : t.getMimeType(a, u, U.type)), s = { name: L, type: f }, D = R(f, ""), z = B(f, ""), M = O(f, ""), j = D || z, j || M) return void m(j) }
                        return r.isAjaxUpload && !r._raise("filebeforeload", [U, w, n]) ? (V = !0, r._resetCaption(), n.abort(), l.html(""), o.removeClass("file-thumb-loading"), void r.enable()) : (r._previewFile(w, U, i, H, s), r._initFileActions(), void G())
                    }, n.onprogress = function(e) {
                        if (e.lengthComputable) {
                            var t = e.loaded / e.total * 100,
                                i = Math.ceil(t);
                            T = d.setTokens({ index: w + 1, files: u, percent: i, name: L }), setTimeout(function() { V || l.html(T) }, r.processDelay)
                        }
                    }, D || z ? n.readAsText(U, r.textEncoding) : M ? n.readAsDataURL(U) : n.readAsArrayBuffer(U)
                }
            }, a(0), r._updateFileDetails(u, !0)
        },
        lock: function(e) {
            var t = this,
                i = t.$container;
            return t._resetErrors(), t.disable(), !e && t.showCancel && i.find(".fileinput-cancel").show(), !e && t.showPause && i.find(".fileinput-pause").show(), t._raise("filelock", [t.fileManager.stack, t._getExtraData()]), t.$element
        },
        unlock: function(e) {
            var t = this,
                i = t.$container;
            return void 0 === e && (e = !0), t.enable(), i.removeClass("is-locked"), t.showCancel && i.find(".fileinput-cancel").hide(), t.showPause && i.find(".fileinput-pause").hide(), e && t._resetFileStack(), t._raise("fileunlock", [t.fileManager.stack, t._getExtraData()]), t.$element
        },
        resume: function() {
            var e = this,
                t = !1,
                i = e.resumableManager;
            return e.enableResumableUpload ? (e.paused ? e._toggleResumableProgress(e.progressPauseTemplate, e.msgUploadResume) : t = !0, e.paused = !1, t && e._toggleResumableProgress(e.progressInfoTemplate, e.msgUploadBegin), setTimeout(function() { i.upload() }, e.processDelay), e.$element) : e.$element
        },
        pause: function() {
            var t, i = this,
                a = i.resumableManager,
                r = i.ajaxRequests,
                n = r.length,
                o = a.getProgress(),
                l = i.fileActionSettings,
                s = i.taskManager,
                d = s.getPool(a.id);
            if (!i.enableResumableUpload) return i.$element;
            if (d && d.cancel(), i._raise("fileuploadpaused", [i.fileManager, a]), n > 0)
                for (t = 0; n > t; t += 1) i.paused = !0, r[t].abort();
            return i.showPreview && i._getThumbs().each(function() {
                var t, a = e(this),
                    r = a.attr("data-fileid"),
                    n = i._getLayoutTemplate("stats"),
                    s = a.find(".file-upload-indicator");
                a.removeClass("file-uploading"), s.attr("title") === l.indicatorLoadingTitle && (i._setThumbStatus(a, "Paused"), t = n.setTokens({ pendingTime: i.msgPaused, uploadSpeed: "" }), i.paused = !0, i._setProgress(o, a.find(".file-thumb-progress"), o + "%", t)), i.fileManager.getFile(r) || a.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")
            }), i._setProgress(101, i.$progress, i.msgPaused), i.$element
        },
        cancel: function() {
            var t, i = this,
                a = i.ajaxRequests,
                r = i.resumableManager,
                n = i.taskManager,
                o = r ? n.getPool(r.id) : void 0,
                l = a.length;
            if (i.enableResumableUpload && o ? (o.cancel().done(function() { i._setProgressCancelled() }), r.reset(), i._raise("fileuploadcancelled", [i.fileManager, r])) : i._raise("fileuploadcancelled", [i.fileManager]), i._initAjax(), l > 0)
                for (t = 0; l > t; t += 1) i.cancelling = !0, a[t].abort();
            return i._getThumbs().each(function() {
                var t = e(this),
                    a = t.attr("data-fileid"),
                    r = t.find(".file-thumb-progress");
                t.removeClass("file-uploading"), i._setProgress(0, r), r.hide(), i.fileManager.getFile(a) || (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), i.unlock()
            }), setTimeout(function() { i._setProgressCancelled() }, i.processDelay), i.$element
        },
        clear: function() { var i, a = this; if (a._raise("fileclear")) return a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(function() { t.cleanMemory(e(this)) }), a._clearFileInput(), a._resetUpload(), a.clearFileStack(), a.isPersistentError = !1, a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(), a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(function() { a._clearObjects(e(this)) }), a.isAjaxUpload && (a.previewCache.data = {}), a.$preview.html(""), i = !a.overwriteInitial && a.initialCaption.length > 0 ? a.initialCaption : "", a.$caption.attr("title", "").val(i), t.addCss(a.$container, "file-input-new"), a._validateDefaultPreview()), 0 === a.$container.find(t.FRAMES).length && (a._initCaption() || a.$captionContainer.removeClass("icon-visible")), a._hideFileIcon(), a.focusCaptionOnClear && a.$captionContainer.focus(), a._setFileDropZoneTitle(), a._raise("filecleared"), a.$element },
        reset: function() { var e = this; if (e._raise("filereset")) return e.lastProgress = 0, e._resetPreview(), e.$container.find(".fileinput-filename").text(""), t.addCss(e.$container, "file-input-new"), e.getFrames().length && e.$container.removeClass("file-input-new"), e.clearFileStack(), e._setFileDropZoneTitle(), e.$element },
        disable: function() {
            var e = this,
                i = e.$container;
            return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), i.addClass("is-locked"), t.addCss(i.find(".btn-file"), "disabled"), i.find(".kv-fileinput-caption").addClass("file-caption-disabled"), i.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e._initDragDrop(), e.$element
        },
        enable: function() {
            var e = this,
                t = e.$container;
            return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), t.removeClass("is-locked"), t.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), t.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), t.find(".btn-file").removeClass("disabled"), e._initDragDrop(), e.$element
        },
        upload: function() {
            var i, a, r = this,
                n = r.fileManager,
                o = n.count(),
                l = !e.isEmptyObject(r._getExtraData());
            if (r.isAjaxUpload && !r.isDisabled && r._isFileSelectionValid(o)) return r.lastProgress = 0, r._resetUpload(), 0 !== o || l ? (r.cancelling = !1, r._showProgress(), r.lock(), 0 === o && l ? (r._setProgress(2), void r._uploadExtraOnly()) : r.enableResumableUpload ? r.resume() : ((r.uploadAsync || r.enableResumableUpload) && (a = r._getOutData(null), r._raise("filebatchpreupload", [a]), r.fileBatchCompleted = !1, r.uploadCache = [], e.each(r.getFileStack(), function(e) {
                var t = r._getThumbId(e);
                r.uploadCache.push({ id: t, content: null, config: null, tags: null, append: !0 })
            }), r.$preview.find(".file-preview-initial").removeClass(t.SORT_CSS), r._initSortable()), r._setProgress(2), r.hasInitData = !1, r.uploadAsync ? (i = 0, void e.each(n.stack, function(e) { r._uploadSingle(i, e, !0), i++ })) : (r._uploadBatch(), r.$element))) : void r._showFileError(r.msgUploadEmpty)
        },
        destroy: function() {
            var t = this,
                i = t.$form,
                a = t.$container,
                r = t.$element,
                n = t.namespace;
            return e(document).off(n), e(window).off(n), i && i.length && i.off(n), t.isAjaxUpload && t._clearFileInput(), t._cleanup(), t._initPreviewCache(), r.insertBefore(a).off(n).removeData(), a.off().remove(), r
        },
        refresh: function(i) {
            var a = this,
                r = a.$element;
            return i = "object" != typeof i || t.isEmpty(i) ? a.options : e.extend(!0, {}, a.options, i), a._init(i, !0), a._listen(), r
        },
        zoom: function(e) {
            var t = this,
                i = t._getFrame(e);
            t._showModal(i)
        },
        getExif: function(e) {
            var t = this,
                i = t._getFrame(e);
            return i && i.data("exif") || null
        },
        getFrames: function(i) { var a, r = this; return i = i || "", a = r.$preview.find(t.FRAMES + i), r.reversePreviewOrder && (a = e(a.get().reverse())), a },
        getPreview: function() { var e = this; return { content: e.initialPreview, config: e.initialPreviewConfig, tags: e.initialPreviewThumbTags } }
    }, e.fn.fileinput = function(a) {
        if (t.hasFileAPISupport() || t.isIE(9)) {
            var r = Array.apply(null, arguments),
                n = [];
            switch (r.shift(), this.each(function() {
                var o, l = e(this),
                    s = l.data("fileinput"),
                    d = "object" == typeof a && a,
                    c = d.theme || l.data("theme"),
                    u = {},
                    p = {},
                    f = d.language || l.data("language") || e.fn.fileinput.defaults.language || "en";
                s || (c && (p = e.fn.fileinputThemes[c] || {}), "en" === f || t.isEmpty(e.fn.fileinputLocales[f]) || (u = e.fn.fileinputLocales[f] || {}), o = e.extend(!0, {}, e.fn.fileinput.defaults, p, e.fn.fileinputLocales.en, u, d, l.data()), s = new i(this, o), l.data("fileinput", s)), "string" == typeof a && n.push(s[a].apply(s, r))
            }), n.length) {
                case 0:
                    return this;
                case 1:
                    return n[0];
                default:
                    return n
            }
        }
    };
    var a = 'class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}';
    e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showUploadStats: !0,
        showCancel: null,
        showPause: null,
        showClose: !0,
        showUploadedThumbs: !0,
        showConsoleLogs: !1,
        browseOnZoneClick: !1,
        autoReplace: !1,
        autoOrientImage: function() {
            var e = window.navigator.userAgent,
                t = !!e.match(/WebKit/i),
                i = !!e.match(/iP(od|ad|hone)/i),
                a = i && t && !e.match(/CriOS/i);
            return !a
        },
        autoOrientImageInitial: !0,
        required: !1,
        rtl: !1,
        hideThumbnailContent: !1,
        encodeUrl: !0,
        focusCaptionOnBrowse: !0,
        focusCaptionOnClear: !0,
        generateFileId: null,
        previewClass: "",
        captionClass: "",
        frameClass: "krajee-default",
        mainClass: "file-caption-main",
        mainTemplate: null,
        purifyHtml: !0,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        initialPreviewDownloadUrl: "",
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        sanitizeZoomCache: function(e) { var i = t.createElement(e); return i.find("input,select,.file-thumbnail-footer").remove(), i.html() },
        previewZoomButtonIcons: { prev: '<i class="icon-triangle-left"></i>', next: '<i class="icon-triangle-right"></i>', toggleheader: '<i class="icon-resize-vertical"></i>', fullscreen: '<i class="icon-fullscreen"></i>', borderless: '<i class="icon-resize-full"></i>', close: '<i class="icon-remove"></i>' },
        previewZoomButtonClasses: { prev: "btn btn-navigate", next: "btn btn-navigate", toggleheader: "btn btn-sm btn-kv btn-default btn-outline-secondary", fullscreen: "btn btn-sm btn-kv btn-default btn-outline-secondary", borderless: "btn btn-sm btn-kv btn-default btn-outline-secondary", close: "btn btn-sm btn-kv btn-default btn-outline-secondary" },
        previewTemplates: {},
        previewContentTemplates: {},
        preferIconicPreview: !1,
        preferIconicZoomPreview: !1,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        allowedPreviewTypes: void 0,
        allowedPreviewMimeTypes: null,
        allowedPreviewExtensions: null,
        disabledPreviewTypes: void 0,
        disabledPreviewExtensions: ["msi", "exe", "com", "zip", "rar", "app", "vb", "scr"],
        disabledPreviewMimeTypes: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="icon-file"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="icon-folder-open"></i>&nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="icon-trash"></i>',
        removeClass: "btn btn-default btn-secondary",
        cancelIcon: '<i class="icon-ban-circle"></i>',
        cancelClass: "btn btn-default btn-secondary",
        pauseIcon: '<i class="icon-pause"></i>',
        pauseClass: "btn btn-default btn-secondary",
        uploadIcon: '<i class="icon-upload"></i>',
        uploadClass: "btn btn-default btn-secondary",
        uploadUrl: null,
        uploadUrlThumb: null,
        uploadAsync: !0,
        uploadParamNames: { chunkCount: "chunkCount", chunkIndex: "chunkIndex", chunkSize: "chunkSize", chunkSizeStart: "chunkSizeStart", chunksUploaded: "chunksUploaded", fileBlob: "fileBlob", fileId: "fileId", fileName: "fileName", fileRelativePath: "fileRelativePath", fileSize: "fileSize", retryCount: "retryCount" },
        maxAjaxThreads: 5,
        fadeDelay: 800,
        processDelay: 100,
        queueDelay: 10,
        progressDelay: 0,
        enableResumableUpload: !1,
        resumableUploadOptions: { fallback: null, testUrl: null, chunkSize: 2048, maxThreads: 4, maxRetries: 3, showErrorLog: !0 },
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        resizeIfSizeMoreThan: 0,
        minFileSize: 0,
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        maxTotalFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="icon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-striped active",
        progressClass: "progress-bar bg-success progress-bar-success progress-bar-striped active",
        progressInfoClass: "progress-bar bg-info progress-bar-info progress-bar-striped active",
        progressCompleteClass: "progress-bar bg-success progress-bar-success",
        progressPauseClass: "progress-bar bg-primary progress-bar-primary progress-bar-striped active",
        progressErrorClass: "progress-bar bg-danger progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: t.closeButton("kv-error-close"),
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0,
        mergeAjaxCallbacks: !1,
        mergeAjaxDeleteCallbacks: !1,
        retryErrorUploads: !0,
        reversePreviewOrder: !1,
        usePdfRenderer: function() { var e = !!window.MSInputMethodContext && !!document.documentMode; return !!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/i) || e },
        pdfRendererUrl: "",
        pdfRendererTemplate: "<iframe " + a + "></iframe>"
    }, e.fn.fileinputLocales.en = { fileSingle: "file", filePlural: "files", browseLabel: "Browse &hellip;", removeLabel: "Remove", removeTitle: "Clear all unprocessed files", cancelLabel: "Cancel", cancelTitle: "Abort ongoing upload", pauseLabel: "Pause", pauseTitle: "Pause ongoing upload", uploadLabel: "Upload", uploadTitle: "Upload selected files", msgNo: "No", msgNoFilesSelected: "No files selected", msgCancelled: "Cancelled", msgPaused: "Paused", msgPlaceholder: "Select {files} ...", msgZoomModalHeading: "Detailed Preview", msgFileRequired: "You must select a file to upload.", msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.', msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.', msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.", msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.", msgTotalFilesTooMany: "You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).", msgFileNotFound: 'File "{name}" not found!', msgFileSecured: 'Security restrictions prevent reading the file "{name}".', msgFileNotReadable: 'File "{name}" is not readable.', msgFilePreviewAborted: 'File preview aborted for "{name}".', msgFilePreviewError: 'An error occurred while reading the file "{name}".', msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".', msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.', msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.', msgFileTypes: { image: "image", html: "HTML", text: "text", video: "video", audio: "audio", flash: "flash", pdf: "PDF", object: "object" }, msgUploadAborted: "The file upload was aborted", msgUploadThreshold: "Processing &hellip;", msgUploadBegin: "Initializing &hellip;", msgUploadEnd: "Done", msgUploadResume: "Resuming upload &hellip;", msgUploadEmpty: "No valid data available for upload.", msgUploadError: "Upload Error", msgDeleteError: "Delete Error", msgProgressError: "Error", msgValidationError: "Validation Error", msgLoading: "Loading file {index} of {files} &hellip;", msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.", msgSelected: "{n} {files} selected", msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.", msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.', msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.', msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.', msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.', msgImageResizeError: "Could not get the image dimensions to resize.", msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>", msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!", msgAjaxProgressError: "{operation} failed", msgDuplicateFile: 'File "{name}" of same size "{size} KB" has already been selected earlier. Skipping duplicate selection.', msgResumableUploadRetriesExceeded: "Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>", msgPendingTime: "{time} remaining", msgCalculatingTime: "calculating time remaining", ajaxOperations: { deleteThumb: "file delete", uploadThumb: "file upload", uploadBatch: "batch file upload", uploadExtra: "form data upload" }, dropZoneTitle: "Drag & drop files here &hellip;", dropZoneClickTitle: "<br>(or click to select {files})", previewZoomButtonTitles: { prev: "View previous file", next: "View next file", toggleheader: "Toggle header", fullscreen: "Toggle full screen", borderless: "Toggle borderless mode", close: "Close detailed preview" } }, e.fn.fileinput.Constructor = i, e(document).ready(function() {
        var t = e("input.file[type=file]");
        t.length && t.fileinput()
    })
});            var i, a, r, n, o = this,
                l = o.$preview,
                s = "." + t.SORT_CSS,
                d = e("body"),
                c = e("html"),
                u = o.reversePreviewOrder,
                p = window.Sortable;
            p && 0 !== l.find(s).length && (a = d.length ? d : c.length ? c : o.$container, r = function() { a.addClass("file-grabbing") }, n = function() { a.removeClass("file-grabbing") }, i = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-fileid",
                animation: 600,
                draggable: s,
                scroll: !1,
                forceFallback: !0,
                onChoose: r,
                onStart: r,
                onUnchoose: n,
                onEnd: n,
                onSort: function(i) {
                    var a, r = i.oldIndex,
                        n = i.newIndex,
                        l = 0,
                        s = o.initialPreviewConfig.length,
                        d = s > 0 && n >= s,
                        c = e(i.item);
                    d && (n = s - 1), o.initialPreview = t.moveArray(o.initialPreview, r, n, u), o.initialPreviewConfig = t.moveArray(o.initialPreviewConfig, r, n, u), o.previewCache.init(), o.getFrames(".file-preview-initial").each(function() { e(this).attr("data-fileindex", t.INIT_FLAG + l), l++ }), d && (a = o.getFrames(":not(.file-preview-initial):first"), a.length && c.slideUp(function() { c.insertBefore(a).slideDown() })), o._raise("filesorted", { previewId: c.attr("id"), oldIndex: r, newIndex: n, stack: o.initialPreviewConfig })
                }
            }, e.extend(!0, i, o.fileActionSettings.dragSettings), o.sortable && o.sortable.destroy(), o.sortable = p.create(l[0], i))
        },
        _setPreviewContent: function(e) {
            var i = this;
            t.setHtml(i.$preview, e), i._autoFitContent()
        },
        _initPreviewImageOrientations: function() {
            var t = this,
                i = 0,
                a = t.canOrientImage;
            (t.autoOrientImageInitial || a) && t.getFrames(".file-preview-initial").each(function() {
                var r, n, o, l = e(this),
                    s = t.initialPreviewConfig[i];
                s && s.exif && s.exif.Orientation && (o = l.attr("id"), r = l.find(">.kv-file-content img"), n = t._getZoom(o, " >.kv-file-content img"), a ? r.css("image-orientation", t.autoOrientImageInitial ? "from-image" : "none") : t.setImageOrientation(r, n, s.exif.Orientation, l)), i++
            })
        },
        _initPreview: function(e) {
            var i, a = this,
                r = a.initialCaption || "";
            return a.previewCache.count(!0) ? (i = a.previewCache.out(), r = e && a.initialCaption ? a.initialCaption : i.caption, a._setPreviewContent(i.content), a._setInitThumbAttr(), a._setCaption(r), a._initSortable(), t.isEmpty(i.content) || a.$container.removeClass("file-input-new"), void a._initPreviewImageOrientations()) : (a._clearPreview(), void(e ? a._setCaption(r) : a._initCaption()))
        },
        _getZoomButton: function(e) {
            var t = this,
                i = t.previewZoomButtonIcons[e],
                a = t.previewZoomButtonClasses[e],
                r = ' title="' + (t.previewZoomButtonTitles[e] || "") + '" ',
                n = r + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (n += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + a + " btn-" + e + '"' + n + ">" + i + "</button>"
        },
        _getModalContent: function() { var e = this; return e._getLayoutTemplate("modal").setTokens({ rtl: e.rtl ? " kv-rtl" : "", zoomFrameClass: e.frameClass, heading: e.msgZoomModalHeading, prev: e._getZoomButton("prev"), next: e._getZoomButton("next"), toggleheader: e._getZoomButton("toggleheader"), fullscreen: e._getZoomButton("fullscreen"), borderless: e._getZoomButton("borderless"), close: e._getZoomButton("close") }) },
        _listenModalEvent: function(e) {
            var i = this,
                a = i.$modal,
                r = function(e) { return { sourceEvent: e, previewId: a.data("previewId"), modal: a } };
            a.on(e + ".bs.modal", function(n) {
                var o = a.find(".btn-fullscreen"),
                    l = a.find(".btn-borderless");
                a.data("fileinputPluginId") === i.$element.attr("id") && i._raise("filezoom" + e, r(n)), "shown" === e && (l.removeClass("active").attr("aria-pressed", "false"), o.removeClass("active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (i._maximizeZoomDialog(), t.checkFullScreen() ? o.addClass("active").attr("aria-pressed", "true") : l.addClass("active").attr("aria-pressed", "true")))
            })
        },
        _initZoom: function() {
            var i, a = this,
                r = a._getLayoutTemplate("modalMain"),
                n = "#" + t.MODAL_ID;
            a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (i = t.createElement(t.cspBuffer.stash(r)).insertAfter(a.$container), a.$modal = e(n).insertBefore(i), t.cspBuffer.apply(a.$modal), i.remove()), t.initModal(a.$modal), a.$modal.html(t.cspBuffer.stash(a._getModalContent())), t.cspBuffer.apply(a.$modal), e.each(t.MODAL_EVENTS, function(e, t) { a._listenModalEvent(t) }))
        },
        _initZoomButtons: function() {
            var t, i, a = this,
                r = a.$modal.data("previewId") || "",
                n = a.getFrames().toArray(),
                o = n.length,
                l = a.$modal.find(".btn-prev"),
                s = a.$modal.find(".btn-next");
            return n.length < 2 ? (l.hide(), void s.hide()) : (l.show(), s.show(), void(o && (t = e(n[0]), i = e(n[o - 1]), l.removeAttr("disabled"), s.removeAttr("disabled"), t.length && t.attr("id") === r && l.attr("disabled", !0), i.length && i.attr("id") === r && s.attr("disabled", !0))))
        },
        _maximizeZoomDialog: function() {
            var t = this,
                i = t.$modal,
                a = i.find(".modal-header:visible"),
                r = i.find(".modal-footer:visible"),
                n = i.find(".modal-body"),
                o = e(window).height(),
                l = 0;
            i.addClass("file-zoom-fullscreen"), a && a.length && (o -= a.outerHeight(!0)), r && r.length && (o -= r.outerHeight(!0)), n && n.length && (l = n.outerHeight(!0) - n.height(), o -= l), i.find(".kv-zoom-body").height(o)
        },
        _resizeZoomDialog: function(e) {
            var i = this,
                a = i.$modal,
                r = a.find(".btn-fullscreen"),
                n = a.find(".btn-borderless");
            if (a.hasClass("file-zoom-fullscreen")) t.toggleFullScreen(!1), e ? r.hasClass("active") || (a.removeClass("file-zoom-fullscreen"), i._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr("aria-pressed", "false")) : r.hasClass("active") ? r.removeClass("active").attr("aria-pressed", "false") : (a.removeClass("file-zoom-fullscreen"), i.$modal.find(".kv-zoom-body").css("height", i.zoomModalHeight));
            else {
                if (!e) return void i._maximizeZoomDialog();
                t.toggleFullScreen(!0)
            }
            a.focus()
        },
        _setZoomContent: function(i, a) {
            var r, n, o, l, s, d, c, u, p, f, g = this,
                m = i.attr("id"),
                h = g._getZoom(m),
                v = g.$modal,
                w = v.find(".btn-fullscreen"),
                b = v.find(".btn-borderless"),
                _ = v.find(".btn-toggleheader");
            n = h.attr("data-template") || "generic", r = h.find(".kv-file-content"), o = r.length ? r.html() : "", p = i.data("caption") || "", f = i.data("size") || "", l = p + " " + f, v.find(".kv-zoom-title").attr("title", e("<div/>").html(l).text()).html(l), s = v.find(".kv-zoom-body"), v.removeClass("kv-single-content"), a ? (u = s.addClass("file-thumb-loading").clone().insertAfter(s), t.setHtml(s, o).hide(), u.fadeOut("fast", function() { s.fadeIn("fast", function() { s.removeClass("file-thumb-loading") }), u.remove() })) : t.setHtml(s, o), c = g.previewZoomSettings[n], c && (d = s.find(".kv-preview-data"), t.addCss(d, "file-zoom-detail"), e.each(c, function(e, t) { d.css(e, t), (d.attr("width") && "width" === e || d.attr("height") && "height" === e) && d.removeAttr(e) })), v.data("previewId", m), g._handler(v.find(".btn-prev"), "click", function() { g._zoomSlideShow("prev", m) }), g._handler(v.find(".btn-next"), "click", function() { g._zoomSlideShow("next", m) }), g._handler(w, "click", function() { g._resizeZoomDialog(!0) }), g._handler(b, "click", function() { g._resizeZoomDialog(!1) }), g._handler(_, "click", function() {
                var e, t = v.find(".modal-header"),
                    i = v.find(".modal-body .floating-buttons"),
                    a = t.find(".kv-zoom-actions"),
                    r = function(e) {
                        var i = g.$modal.find(".kv-zoom-body"),
                            a = g.zoomModalHeight;
                        v.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height", e ? a + e : a)
                    };
                t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function() { a.find(".btn").appendTo(i), r(e) })) : (i.find(".btn").appendTo(a), t.slideDown("slow", function() { r() })), v.focus()
            }), g._handler(v, "keydown", function(t) {
                var i = t.which || t.keyCode,
                    a = e(this).find(".btn-prev"),
                    r = e(this).find(".btn-next"),
                    n = e(this).data("previewId"),
                    o = g.rtl ? 39 : 37,
                    l = g.rtl ? 37 : 39;
                i === o && a.length && !a.attr("disabled") && g._zoomSlideShow("prev", n), i === l && r.length && !r.attr("disabled") && g._zoomSlideShow("next", n)
            })
        },
        _showModal: function(e) {
            var i = this,
                a = i.$modal;
            e && e.length && (t.initModal(a), t.setHtml(a, i._getModalContent()), i._setZoomContent(e), a.data("fileinputPluginId", i.$element.attr("id")), a.modal("show"), i._initZoomButtons())
        },
        _zoomPreview: function(e) {
            var i, a = this;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            i = e.closest(t.FRAMES), a._showModal(i)
        },
        _zoomSlideShow: function(t, i) {
            var a, r, n, o, l = this,
                s = l.$modal.find(".kv-zoom-actions .btn-" + t),
                d = l.getFrames().toArray(),
                c = [],
                u = d.length;
            if (!s.attr("disabled")) {
                for (r = 0; u > r; r++) n = e(d[r]), n && n.length && n.find(".kv-file-zoom:visible").length && c.push(d[r]);
                for (u = c.length, r = 0; u > r; r++)
                    if (e(c[r]).attr("id") === i) { o = "prev" === t ? r - 1 : r + 1; break }
                0 > o || o >= u || !c[o] || (a = e(c[o]), a.length && l._setZoomContent(a, !0), l._initZoomButtons(), l._raise("filezoom" + t, { previewId: i, modal: l.$modal }))
            }
        },
        _initZoomButton: function() {
            var t = this;
            t.$preview.find(".kv-file-zoom").each(function() {
                var i = e(this);
                t._handler(i, "click", function() { t._zoomPreview(i) })
            })
        },
        _inputFileCount: function() { return this.$element[0].files.length },
        _refreshPreview: function() {
            var t, i = this;
            (i._inputFileCount() || i.isAjaxUpload) && i.showPreview && i.isPreviewable && (i.isAjaxUpload && i.fileManager.count() > 0 ? (t = e.extend(!0, {}, i.fileManager.stack), i.fileManager.clear(), i._clearFileInput()) : t = i.$element[0].files, t && t.length && (i.readFiles(t), i._setFileDropZoneTitle()))
        },
        _clearObjects: function(t) { t.find("video audio").each(function() { this.pause(), e(this).remove() }), t.find("img object div").each(function() { e(this).remove() }) },
        _clearFileInput: function() {
            var t, i, a, r = this,
                n = r.$element;
            r._inputFileCount() && (t = n.closest("form"), i = e(document.createElement("form")), a = e(document.createElement("div")), n.before(a), t.length ? t.after(i) : a.after(i), i.append(n).trigger("reset"), a.before(n).remove(), i.remove())
        },
        _resetUpload: function() {
            var e = this;
            e.uploadCache = [], e.$btnUpload.removeAttr("disabled"), e._setProgress(0), e._hideProgress(), e._resetErrors(!1), e._initAjax(), e.fileManager.clearImages(), e._resetCanvas(), e.overwriteInitial && (e.initialPreview = [], e.initialPreviewConfig = [], e.initialPreviewThumbTags = [], e.previewCache.data = { content: [], config: [], tags: [] })
        },
        _resetCanvas: function() {
            var e = this;
            e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height)
        },
        _hasInitialPreview: function() { var e = this; return !e.overwriteInitial && e.previewCache.count(!0) },
        _resetPreview: function() {
            var e, t, i = this;
            i.previewCache.count(!0) ? (e = i.previewCache.out(), i._setPreviewContent(e.content), i._setInitThumbAttr(), t = i.initialCaption ? i.initialCaption : e.caption, i._setCaption(t)) : (i._clearPreview(), i._initCaption()), i.showPreview && (i._initZoom(), i._initSortable())
        },
        _clearDefaultPreview: function() {
            var e = this;
            e.$preview.find(".file-default-preview").remove();
        },
        _validateDefaultPreview: function() {
            var e = this;
            e.showPreview && !t.isEmpty(e.defaultPreviewContent) && (e._setPreviewContent('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass("file-input-new"), e._initClickable())
        },
        _resetPreviewThumbs: function(e) { var t, i = this; return e ? (i._clearPreview(), void i.clearFileStack()) : void(i._hasInitialPreview() ? (t = i.previewCache.out(), i._setPreviewContent(t.content), i._setInitThumbAttr(), i._setCaption(t.caption), i._initPreviewActions()) : i._clearPreview()) },
        _getLayoutTemplate: function(e) {
            var i = this,
                a = i.layoutTemplates[e];
            return t.isEmpty(i.customLayoutTags) ? a : t.replaceTags(a, i.customLayoutTags)
        },
        _getPreviewTemplate: function(e) {
            var i = this,
                a = i.previewTemplates,
                r = a[e] || a.other;
            return t.isEmpty(i.customPreviewTags) ? r : t.replaceTags(r, i.customPreviewTags)
        },
        _getOutData: function(e, t, i, a) { var r = this; return t = t || {}, i = i || {}, a = a || r.fileManager.list(), { formdata: e, files: a, filenames: r.filenames, filescount: r.getFilesCount(), extra: r._getExtraData(), response: i, reader: r.reader, jqXHR: t } },
        _getMsgSelected: function(e) {
            var t = this,
                i = 1 === e ? t.fileSingle : t.filePlural;
            return e > 0 ? t.msgSelected.replace("{n}", e).replace("{files}", i) : t.msgNoFilesSelected
        },
        _getFrame: function(e, i) {
            var a = this,
                r = t.getFrameElement(a.$preview, e);
            return !a.showPreview || i || r.length || a._log(t.logMessages.invalidThumb, { id: e }), r
        },
        _getZoom: function(e, i) {
            var a = this,
                r = t.getZoomElement(a.$preview, e, i);
            return a.showPreview && !r.length && a._log(t.logMessages.invalidThumb, { id: e }), r
        },
        _getThumbs: function(e) { return e = e || "", this.getFrames(":not(.file-preview-initial)" + e) },
        _getThumbId: function(e) { var t = this; return t.previewInitId + "-" + e },
        _getExtraData: function(e, t) {
            var i = this,
                a = i.uploadExtraData;
            return "function" == typeof i.uploadExtraData && (a = i.uploadExtraData(e, t)), a
        },
        _initXhr: function(e, i, a) {
            var r = this,
                n = r.fileManager,
                o = function(e) {
                    var o = 0,
                        l = e.total,
                        s = e.loaded || e.position,
                        d = n.getUploadStats(i, s, l);
                    e.lengthComputable && !r.enableResumableUpload && (o = t.round(s / l * 100)), i ? r._setFileUploadStats(i, o, a, d) : r._setProgress(o, null, null, r._getStats(d)), r._raise("fileajaxprogress", [d])
                };
            return e.upload && (r.progressDelay && (o = t.debounce(o, r.progressDelay)), e.upload.addEventListener("progress", o, !1)), e
        },
        _initAjaxSettings: function() {
            var t = this;
            t._ajaxSettings = e.extend(!0, {}, t.ajaxSettings), t._ajaxDeleteSettings = e.extend(!0, {}, t.ajaxDeleteSettings)
        },
        _mergeAjaxCallback: function(e, t, i) {
            var a, r = this,
                n = r._ajaxSettings,
                o = r.mergeAjaxCallbacks;
            "delete" === i && (n = r._ajaxDeleteSettings, o = r.mergeAjaxDeleteCallbacks), a = n[e], o && "function" == typeof a ? "before" === o ? n[e] = function() { a.apply(this, arguments), t.apply(this, arguments) } : n[e] = function() { t.apply(this, arguments), a.apply(this, arguments) } : n[e] = t
        },
        _ajaxSubmit: function(t, i, a, r, n, o, l, s) {
            var d, c, u, p, f = this;
            f._raise("filepreajax", [n, o, l]) && (n.append("initialPreview", JSON.stringify(f.initialPreview)), n.append("initialPreviewConfig", JSON.stringify(f.initialPreviewConfig)), n.append("initialPreviewThumbTags", JSON.stringify(f.initialPreviewThumbTags)), f._initAjaxSettings(), f._mergeAjaxCallback("beforeSend", t), f._mergeAjaxCallback("success", i), f._mergeAjaxCallback("complete", a), f._mergeAjaxCallback("error", r), s = s || f.uploadUrlThumb || f.uploadUrl, "function" == typeof s && (s = s()), u = f._getExtraData(o, l) || {}, "object" == typeof u && e.each(u, function(e, t) { n.append(e, t) }), c = { xhr: function() { var t = e.ajaxSettings.xhr(); return f._initXhr(t, o, f.fileManager.count()) }, url: f._encodeURI(s), type: "POST", dataType: "json", data: n, cache: !1, processData: !1, contentType: !1 }, d = e.extend(!0, {}, c, f._ajaxSettings), p = f.taskManager.addTask(o + "-" + l, function() {
                var t, i, a = this.self;
                t = a.ajaxQueue.shift(), i = e.ajax(t), a.ajaxRequests.push(i)
            }), f.ajaxQueue.push(d), p.runWithContext({ self: f }))
        },
        _mergeArray: function(e, i) {
            var a = this,
                r = t.cleanArray(a[e]),
                n = t.cleanArray(i);
            a[e] = r.concat(n)
        },
        _initUploadSuccess: function(i, a, r) {
            var n, o, l, s, d, c, u, p, f, g, m = this;
            return !m.showPreview || "object" != typeof i || e.isEmptyObject(i) ? void m._resetCaption() : (void 0 !== i.initialPreview && i.initialPreview.length > 0 && (m.hasInitData = !0, c = i.initialPreview || [], u = i.initialPreviewConfig || [], p = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append, c.length > 0 && !t.isArray(c) && (c = c.split(m.initialPreviewDelimiter)), c.length && (m._mergeArray("initialPreview", c), m._mergeArray("initialPreviewConfig", u), m._mergeArray("initialPreviewThumbTags", p)), void 0 !== a ? r ? (f = a.attr("id"), g = m._getUploadCacheIndex(f), null !== g && (m.uploadCache[g] = { id: f, content: c[0], config: u[0] || [], tags: p[0] || [], append: n })) : (l = m.previewCache.add(c[0], u[0], p[0], n), o = m.previewCache.get(l, !1), s = t.createElement(o).hide().appendTo(a), d = s.find(".kv-zoom-cache"), d && d.length && d.appendTo(a), a.fadeOut("slow", function() {
                var e = s.find(".file-preview-frame");
                e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), m._initPreviewActions(), m._clearFileInput(), a.remove(), s.remove(), m._initSortable()
            })) : (m.previewCache.set(c, u, p, n), m._initPreview(), m._initPreviewActions())), void m._resetCaption())
        },
        _getUploadCacheIndex: function(e) {
            var t, i, a = this,
                r = a.uploadCache.length;
            for (t = 0; r > t; t++)
                if (i = a.uploadCache[t], i.id === e) return t;
            return null
        },
        _initSuccessThumbs: function() {
            var i = this;
            i.showPreview && i._getThumbs(t.FRAMES + ".file-preview-success").each(function() {
                var a = e(this),
                    r = a.find(".kv-file-remove");
                r.removeAttr("disabled"), i._handler(r, "click", function() {
                    var e = a.attr("id"),
                        r = i._raise("filesuccessremove", [e, a.attr("data-fileindex")]);
                    t.cleanMemory(a), r !== !1 && a.fadeOut("slow", function() { a.remove(), i.getFrames().length || i.reset() })
                })
            })
        },
        _updateInitialPreview: function() {
            var t = this,
                i = t.uploadCache;
            t.showPreview && (e.each(i, function(e, i) { t.previewCache.add(i.content, i.config, i.tags, i.append) }), t.hasInitData && (t._initPreview(), t._initPreviewActions()))
        },
        _uploadSingle: function(i, a, r) {
            var n, o, l, s, d, c, u, p, f, g, m, h, v, w = this,
                b = w.fileManager,
                _ = b.count(),
                C = new FormData,
                y = w._getThumbId(a),
                x = _ > 0 || !e.isEmptyObject(w.uploadExtraData),
                T = w.ajaxOperations.uploadThumb,
                P = b.getFile(a),
                k = { id: y, index: i, fileId: a },
                F = w.fileManager.getFileName(a, !0);
            w.enableResumableUpload || (w.showPreview && (o = w.fileManager.getThumb(a), u = o.find(".file-thumb-progress"), s = o.find(".kv-file-upload"), d = o.find(".kv-file-remove"), u.show()), 0 === _ || !x || w.showPreview && s && s.hasClass("disabled") || w._abort(k) || (v = function() { c ? b.errors.push(a) : b.removeFile(a), b.setProcessed(a), b.isProcessed() && (w.fileBatchCompleted = !0, l()) }, l = function() {
                var e;
                w.fileBatchCompleted && setTimeout(function() {
                    var i = 0 === b.count(),
                        a = b.errors.length;
                    w._updateInitialPreview(), w.unlock(i), i && w._clearFileInput(), e = w.$preview.find(".file-preview-initial"), w.uploadAsync && e.length && (t.addCss(e, t.SORT_CSS), w._initSortable()), w._raise("filebatchuploadcomplete", [b.stack, w._getExtraData()]), w.retryErrorUploads && 0 !== a || b.clear(), w._setProgress(101), w.ajaxAborted = !1
                }, w.processDelay)
            }, p = function(l) { n = w._getOutData(C, l), b.initStats(a), w.fileBatchCompleted = !1, r || (w.ajaxAborted = !1), w.showPreview && (o.hasClass("file-preview-success") || (w._setThumbStatus(o, "Loading"), t.addCss(o, "file-uploading")), s.attr("disabled", !0), d.attr("disabled", !0)), r || w.lock(), -1 !== b.errors.indexOf(a) && delete b.errors[a], w._raise("filepreupload", [n, y, i]), e.extend(!0, k, n), w._abort(k) && (l.abort(), r || (w._setThumbStatus(o, "New"), o.removeClass("file-uploading"), s.removeAttr("disabled"), d.removeAttr("disabled"), w.unlock()), w._setProgressCancelled()) }, g = function(l, d, p) {
                var g = w.showPreview && o.attr("id") ? o.attr("id") : y;
                n = w._getOutData(C, p, l), e.extend(!0, k, n), setTimeout(function() { t.isEmpty(l) || t.isEmpty(l.error) ? (w.showPreview && (w._setThumbStatus(o, "Success"), s.hide(), w._initUploadSuccess(l, o, r), w._setProgress(101, u)), w._raise("fileuploaded", [n, g, i]), r ? v() : w.fileManager.remove(o)) : (c = !0, f = w._parseError(T, p, w.msgUploadError, w.fileManager.getFileName(a)), w._showFileError(f, k), w._setPreviewError(o, !0), w.retryErrorUploads || s.hide(), r && v(), w._setProgress(101, w._getFrame(g).find(".file-thumb-progress"), w.msgUploadError)) }, w.processDelay)
            }, m = function() { w.showPreview && (s.removeAttr("disabled"), d.removeAttr("disabled"), o.removeClass("file-uploading")), r ? l() : (w.unlock(!1), w._clearFileInput()), w._initSuccessThumbs() }, h = function(t, i, n) {
                f = w._parseError(T, t, n, w.fileManager.getFileName(a)), c = !0, setTimeout(function() {
                    var i;
                    r && v(), w.fileManager.setProgress(a, 100), w._setPreviewError(o, !0), w.retryErrorUploads || s.hide(), e.extend(!0, k, w._getOutData(C, t)), w._setProgress(101, w.$progress, w.msgAjaxProgressError.replace("{operation}", T)), i = w.showPreview && o ? o.find(".file-thumb-progress") : "", w._setProgress(101, i, w.msgUploadError), w._showFileError(f, k)
                }, w.processDelay)
            }, C.append(w.uploadFileAttr, P.file, F), w._setUploadData(C, { fileId: a }), w._ajaxSubmit(p, g, m, h, C, a, i)))
        },
        _uploadBatch: function() {
            var i, a, r, n, o, l, s = this,
                d = s.fileManager,
                c = d.total(),
                u = {},
                p = c > 0 || !e.isEmptyObject(s.uploadExtraData),
                f = new FormData,
                g = s.ajaxOperations.uploadBatch;
            if (0 !== c && p && !s._abort(u)) {
                l = function() { s.fileManager.clear(), s._clearFileInput() }, i = function(i) {
                    s.lock(), d.initStats();
                    var a = s._getOutData(f, i);
                    s.ajaxAborted = !1, s.showPreview && s._getThumbs().each(function() {
                        var i = e(this),
                            a = i.find(".kv-file-upload"),
                            r = i.find(".kv-file-remove");
                        i.hasClass("file-preview-success") || (s._setThumbStatus(i, "Loading"), t.addCss(i, "file-uploading")), a.attr("disabled", !0), r.attr("disabled", !0)
                    }), s._raise("filebatchpreupload", [a]), s._abort(a) && (i.abort(), s._getThumbs().each(function() {
                        var t = e(this),
                            i = t.find(".kv-file-upload"),
                            a = t.find(".kv-file-remove");
                        t.hasClass("file-preview-loading") && (s._setThumbStatus(t, "New"), t.removeClass("file-uploading")), i.removeAttr("disabled"), a.removeAttr("disabled")
                    }), s._setProgressCancelled())
                }, a = function(i, a, r) {
                    var n = s._getOutData(f, r, i),
                        d = 0,
                        c = s._getThumbs(":not(.file-preview-success)"),
                        u = t.isEmpty(i) || t.isEmpty(i.errorkeys) ? [] : i.errorkeys;
                    t.isEmpty(i) || t.isEmpty(i.error) ? (s._raise("filebatchuploadsuccess", [n]), l(), s.showPreview ? (c.each(function() {
                        var t = e(this);
                        s._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), t.find(".kv-file-upload").hide().removeAttr("disabled")
                    }), s._initUploadSuccess(i)) : s.reset(), s._setProgress(101)) : (s.showPreview && (c.each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), t.find(".kv-file-upload").removeAttr("disabled"), t.find(".kv-file-remove").removeAttr("disabled"), 0 === u.length || -1 !== e.inArray(d, u) ? (s._setPreviewError(t, !0), s.retryErrorUploads || (t.find(".kv-file-upload").hide(), s.fileManager.remove(t))) : (t.find(".kv-file-upload").hide(), s._setThumbStatus(t, "Success"), s.fileManager.remove(t)), t.hasClass("file-preview-error") && !s.retryErrorUploads || d++
                    }), s._initUploadSuccess(i)), o = s._parseError(g, r, s.msgUploadError), s._showFileError(o, n, "filebatchuploaderror"), s._setProgress(101, s.$progress, s.msgUploadError))
                }, n = function() { s.unlock(), s._initSuccessThumbs(), s._clearFileInput(), s._raise("filebatchuploadcomplete", [s.fileManager.stack, s._getExtraData()]) }, r = function(t, i, a) {
                    var r = s._getOutData(f, t);
                    o = s._parseError(g, t, a), s._showFileError(o, r, "filebatchuploaderror"), s.uploadFileCount = c - 1, s.showPreview && (s._getThumbs().each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), s.fileManager.getFile(t.attr("data-fileid")) && s._setPreviewError(t)
                    }), s._getThumbs().removeClass("file-uploading"), s._getThumbs(" .kv-file-upload").removeAttr("disabled"), s._getThumbs(" .kv-file-delete").removeAttr("disabled"), s._setProgress(101, s.$progress, s.msgAjaxProgressError.replace("{operation}", g)))
                };
                var m = 0;
                e.each(s.fileManager.stack, function(e, i) { t.isEmpty(i.file) || f.append(s.uploadFileAttr, i.file, i.nameFmt || "untitled_" + m), m++ }), s._ajaxSubmit(i, a, n, r, f)
            }
        },
        _uploadExtraOnly: function() {
            var e, i, a, r, n, o = this,
                l = {},
                s = new FormData,
                d = o.ajaxOperations.uploadExtra;
            o._abort(l) || (e = function(e) {
                o.lock();
                var t = o._getOutData(s, e);
                o._raise("filebatchpreupload", [t]), o._setProgress(50), l.data = t, l.xhr = e, o._abort(l) && (e.abort(), o._setProgressCancelled())
            }, i = function(e, i, a) {
                var r = o._getOutData(s, a, e);
                t.isEmpty(e) || t.isEmpty(e.error) ? (o._raise("filebatchuploadsuccess", [r]), o._clearFileInput(), o._initUploadSuccess(e), o._setProgress(101)) : (n = o._parseError(d, a, o.msgUploadError), o._showFileError(n, r, "filebatchuploaderror"))
            }, a = function() { o.unlock(), o._clearFileInput(), o._raise("filebatchuploadcomplete", [o.fileManager.stack, o._getExtraData()]) }, r = function(e, t, i) {
                var a = o._getOutData(s, e);
                n = o._parseError(d, e, i), l.data = a, o._showFileError(n, a, "filebatchuploaderror"), o._setProgress(101, o.$progress, o.msgAjaxProgressError.replace("{operation}", d))
            }, o._ajaxSubmit(e, i, a, r, s))
        },
        _deleteFileIndex: function(i) {
            var a = this,
                r = i.attr("data-fileindex"),
                n = a.reversePreviewOrder;
            r.substring(0, 5) === t.INIT_FLAG && (r = parseInt(r.replace(t.INIT_FLAG, "")), a.initialPreview = t.spliceArray(a.initialPreview, r, n), a.initialPreviewConfig = t.spliceArray(a.initialPreviewConfig, r, n), a.initialPreviewThumbTags = t.spliceArray(a.initialPreviewThumbTags, r, n), a.getFrames().each(function() {
                var i = e(this),
                    a = i.attr("data-fileindex");
                a.substring(0, 5) === t.INIT_FLAG && (a = parseInt(a.replace(t.INIT_FLAG, "")), a > r && (a--, i.attr("data-fileindex", t.INIT_FLAG + a)))
            }))
        },
        _resetCaption: function() {
            var e = this;
            setTimeout(function() {
                var t, i, a, r = e.previewCache.count(!0),
                    n = e.fileManager.count(),
                    o = ":not(.file-preview-success):not(.file-preview-error)",
                    l = e.showPreview && e.getFrames(o).length;
                0 !== n || 0 !== r || l ? (i = r + n, i > 1 ? t = e._getMsgSelected(i) : (a = e.fileManager.getFirstFile(), t = a ? a.nameFmt : "_"), e._setCaption(t)) : e.reset()
            }, e.processDelay)
        },
        _initFileActions: function() {
            var i = this;
            i.showPreview && (i._initZoomButton(), i.getFrames(" .kv-file-remove").each(function() {
                var a, r, n = e(this),
                    o = n.closest(t.FRAMES),
                    l = o.attr("id"),
                    s = o.attr("data-fileindex");
                i._handler(n, "click", function() { return r = i._raise("filepreremove", [l, s]), r !== !1 && i._validateMinCount() ? (a = o.hasClass("file-preview-error"), t.cleanMemory(o), void o.fadeOut("slow", function() { i.fileManager.remove(o), i._clearObjects(o), o.remove(), l && a && i.$errorContainer.find('li[data-thumb-id="' + l + '"]').fadeOut("fast", function() { e(this).remove(), i._errorsExist() || i._resetErrors() }), i._clearFileInput(), i._resetCaption(), i._raise("fileremoved", [l, s]) })) : !1 })
            }), i.getFrames(" .kv-file-upload").each(function() {
                var a = e(this);
                i._handler(a, "click", function() {
                    var e = a.closest(t.FRAMES),
                        r = e.attr("data-fileid");
                    i._hideProgress(), e.hasClass("file-preview-error") && !i.retryErrorUploads || i._uploadSingle(i.fileManager.getIndex(r), r, !1)
                })
            }))
        },
        _initPreviewActions: function() {
            var i = this,
                a = i.$preview,
                r = i.deleteExtraData || {},
                n = t.FRAMES + " .kv-file-remove",
                o = i.fileActionSettings,
                l = o.removeClass,
                s = o.removeErrorClass,
                d = function() {
                    var e = i.isAjaxUpload ? i.previewCache.count(!0) : i._inputFileCount();
                    i.getFrames().length || e || (i._setCaption(""), i.reset(), i.initialCaption = "")
                };
            i._initZoomButton(), a.find(n).each(function() {
                var a, n, o, c, u = e(this),
                    p = u.data("url") || i.deleteUrl,
                    f = u.data("key"),
                    g = i.ajaxOperations.deleteThumb;
                if (!t.isEmpty(p) && void 0 !== f) {
                    "function" == typeof p && (p = p());
                    var m, h, v, w, b, _ = u.closest(t.FRAMES),
                        C = i.previewCache.data,
                        y = _.attr("data-fileindex");
                    y = parseInt(y.replace(t.INIT_FLAG, "")), v = t.isEmpty(C.config) && t.isEmpty(C.config[y]) ? null : C.config[y], b = t.isEmpty(v) || t.isEmpty(v.extra) ? r : v.extra, w = v && (v.filename || v.caption) || "", "function" == typeof b && (b = b()), h = { id: u.attr("id"), key: f, extra: b }, n = function(e) { i.ajaxAborted = !1, i._raise("filepredelete", [f, e, b]), i._abort() ? e.abort() : (u.removeClass(s), t.addCss(_, "file-uploading"), t.addCss(u, "disabled " + l)) }, o = function(e, r, n) { var o, c; return t.isEmpty(e) || t.isEmpty(e.error) ? (_.removeClass("file-uploading").addClass("file-deleted"), void _.fadeOut("slow", function() { y = parseInt(_.attr("data-fileindex").replace(t.INIT_FLAG, "")), i.previewCache.unset(y), i._deleteFileIndex(_), o = i.previewCache.count(!0), c = o > 0 ? i._getMsgSelected(o) : "", i._setCaption(c), i._raise("filedeleted", [f, n, b]), i._clearObjects(_), _.remove(), d() })) : (h.jqXHR = n, h.response = e, a = i._parseError(g, n, i.msgDeleteError, w), i._showFileError(a, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + l).addClass(s), void d()) }, c = function(e, t, a) {
                        var r = i._parseError(g, e, a, w);
                        h.jqXHR = e, h.response = {}, i._showFileError(r, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + l).addClass(s), d()
                    }, i._initAjaxSettings(), i._mergeAjaxCallback("beforeSend", n, "delete"), i._mergeAjaxCallback("success", o, "delete"), i._mergeAjaxCallback("error", c, "delete"), m = e.extend(!0, {}, { url: i._encodeURI(p), type: "POST", dataType: "json", data: e.extend(!0, {}, { key: f }, b) }, i._ajaxDeleteSettings), i._handler(u, "click", function() { return i._validateMinCount() ? (i.ajaxAborted = !1, i._raise("filebeforedelete", [f, b]), void(i.ajaxAborted instanceof Promise ? i.ajaxAborted.then(function(t) { t || e.ajax(m) }) : i.ajaxAborted || e.ajax(m))) : !1 })
                }
            })
        },
        _hideFileIcon: function() {
            var e = this;
            e.overwriteInitial && e.$captionContainer.removeClass("icon-visible")
        },
        _showFileIcon: function() {
            var e = this;
            t.addCss(e.$captionContainer, "icon-visible")
        },
        _getSize: function(t, i) {
            var a, r, n = this,
                o = parseFloat(t),
                l = n.fileSizeGetter;
            return e.isNumeric(t) && e.isNumeric(o) ? ("function" == typeof l ? r = l(o) : 0 === o ? r = "0.00 B" : (a = Math.floor(Math.log(o) / Math.log(1024)), i || (i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]), r = 1 * (o / Math.pow(1024, a)).toFixed(2) + " " + i[a]), n._getLayoutTemplate("size").replace("{sizeText}", r)) : ""
        },
        _getFileType: function(e) { var t = this; return t.mimeTypeAliases[e] || e },
        _generatePreviewTemplate: function(i, a, r, n, o, l, s, d, c, u, p, f, g, m) {
            var h, v, w, b = this,
                _ = b.slug(r),
                C = "",
                y = "",
                x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                T = _,
                P = _,
                k = "type-default",
                F = u || b._renderFileFooter(i, _, d, "auto", s),
                E = b.preferIconicPreview,
                S = b.preferIconicZoomPreview,
                I = E ? "other" : i;
            return v = 400 > x ? b.previewSettingsSmall[I] || b.defaults.previewSettingsSmall[I] : b.previewSettings[I] || b.defaults.previewSettings[I], v && e.each(v, function(e, t) { y += e + ":" + t + ";" }), w = function(a, s, d, u) {
                var m = d ? "zoom-" + o : o,
                    h = b._getPreviewTemplate(a),
                    v = (c || "") + " " + u;
                return b.frameClass && (v = b.frameClass + " " + v), d && (v = v.replace(" " + t.SORT_CSS, "")), h = b._parseFilePreviewIcon(h, r), "text" === a && (s = t.htmlEncode(s)), "object" !== i || n || e.each(b.defaults.fileTypeSettings, function(e, t) { "object" !== e && "other" !== e && t(r, n) && (k = "type-" + e) }), t.isEmpty(g) || (void 0 !== g.title && null !== g.title && (T = g.title), void 0 !== g.alt && null !== g.alt && (T = g.alt)), h.setTokens({ previewId: m, caption: _, title: T, alt: P, frameClass: v, type: b._getFileType(n), fileindex: p, fileid: l || "", typeCss: k, footer: F, data: s, template: f || i, style: y ? 'style="' + y + '"' : "" })
            }, p = p || o.slice(o.lastIndexOf("-") + 1), b.fileActionSettings.showZoom && (C = w(S ? "other" : i, m ? m : a, !0, "kv-zoom-thumb")), C = "\n" + b._getLayoutTemplate("zoomCache").replace("{zoomContent}", C), "function" == typeof b.sanitizeZoomCache && (C = b.sanitizeZoomCache(C)), h = w(E ? "other" : i, a, !1, "kv-preview-thumb"), h.setTokens({ zoomCache: C })
        },
        _addToPreview: function(e, i) { var a, r = this; return i = t.cspBuffer.stash(i), a = r.reversePreviewOrder ? e.prepend(i) : e.append(i), t.cspBuffer.apply(e), a },
        _previewDefault: function(e, i) {
            var a = this,
                r = a.$preview;
            if (a.showPreview) {
                var n, o = t.getFileName(e),
                    l = e ? e.type : "",
                    s = e.size || 0,
                    d = a._getFileName(e, ""),
                    c = i === !0 && !a.isAjaxUpload,
                    u = t.createObjectURL(e),
                    p = a.fileManager.getId(e),
                    f = a._getThumbId(p);
                a._clearDefaultPreview(), n = a._generatePreviewTemplate("other", u, o, l, f, p, c, s), a._addToPreview(r, n), a._setThumbAttr(f, d, s), i === !0 && a.isAjaxUpload && a._setThumbStatus(a._getFrame(f), "Error")
            }
        },
        _previewFile: function(e, i, a, r, n) {
            if (this.showPreview) {
                var o, l = this,
                    s = t.getFileName(i),
                    d = n.type,
                    c = n.name,
                    u = l._parseFileType(d, s),
                    p = l.$preview,
                    f = i.size || 0,
                    g = "text" === u || "html" === u || "image" === u ? a.target.result : r,
                    m = l.fileManager.getId(i),
                    h = l._getThumbId(m);
                "html" === u && l.purifyHtml && window.DOMPurify && (g = window.DOMPurify.sanitize(g)), o = l._generatePreviewTemplate(u, g, s, d, h, m, !1, f), l._clearDefaultPreview(), l._addToPreview(p, o);
                var v = l._getFrame(h);
                l._validateImageOrientation(v.find("img"), i, h, m, c, d, f, g), l._setThumbAttr(h, c, f), l._initSortable()
            }
        },
        _setThumbAttr: function(e, t, i) {
            var a = this,
                r = a._getFrame(e);
            r.length && (i = i && i > 0 ? a._getSize(i) : "", r.data({ caption: t, size: i }))
        },
        _setInitThumbAttr: function() {
            var e, i, a, r, n = this,
                o = n.previewCache.data,
                l = n.previewCache.count(!0);
            if (0 !== l)
                for (var s = 0; l > s; s++) e = o.config[s], r = n.previewInitId + "-" + t.INIT_FLAG + s, i = t.ifSet("caption", e, t.ifSet("filename", e)), a = t.ifSet("size", e), n._setThumbAttr(r, i, a)
        },
        _slugDefault: function(e) { return t.isEmpty(e, !0) ? "" : String(e).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_") },
        _updateFileDetails: function(e, i) {
            var a, r, n, o, l, s = this,
                d = s.$element,
                c = t.isIE(9) && t.findFileName(d.val()) || d[0].files[0] && d[0].files[0].name;
            !c && s.fileManager.count() > 0 ? (l = s.fileManager.getFirstFile(), a = l.nameFmt) : a = c ? s.slug(c) : "_", r = s.isAjaxUpload ? s.fileManager.count() : e, o = s.previewCache.count(!0) + r, n = 1 === r ? a : s._getMsgSelected(o), s.isError ? (s.$previewContainer.removeClass("file-thumb-loading"), s.$previewStatus.html(""), s.$captionContainer.removeClass("icon-visible")) : s._showFileIcon(), s._setCaption(n, s.isError), s.$container.removeClass("file-input-new file-input-ajax-new"), i || s._raise("fileselect", [e, a]), s.previewCache.count(!0) && s._initPreviewActions()
        },
        _setThumbStatus: function(e, i) {
            var a = this;
            if (a.showPreview) {
                var r = "indicator" + i,
                    n = r + "Title",
                    o = "file-preview-" + i.toLowerCase(),
                    l = e.find(".file-upload-indicator"),
                    s = a.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-paused file-preview-loading"), "Success" === i && e.find(".file-drag-handle").remove(), t.setHtml(l, s[r]), l.attr("title", s[n]), e.addClass(o), "Error" !== i || a.retryErrorUploads || e.find(".kv-file-upload").attr("disabled", !0)
            }
        },
        _setProgressCancelled: function() {
            var e = this;
            e._setProgress(101, e.$progress, e.msgCancelled)
        },
        _setProgress: function(e, i, a, r) {
            var n = this;
            if (i = i || n.$progress, i.length) {
                var o, l = Math.min(e, 100),
                    s = n.progressUploadThreshold,
                    d = 100 >= e ? n.progressTemplate : n.progressCompleteTemplate,
                    c = 100 > l ? n.progressTemplate : a ? n.paused ? n.progressPauseTemplate : n.progressErrorTemplate : d;
                e >= 100 && (r = ""), t.isEmpty(c) || (o = s && l > s && 100 >= e ? c.setTokens({ percent: s, status: n.msgUploadThreshold }) : c.setTokens({ percent: l, status: e > 100 ? n.msgUploadEnd : l + "%" }), r = r || "", o = o.setTokens({ stats: r }), t.setHtml(i, o), a && t.setHtml(i.find('[role="progressbar"]'), a))
            }
        },
        _hasFiles: function() { var e = this.$element[0]; return !!(e && e.files && e.files.length) },
        _setFileDropZoneTitle: function() {
            var e, i = this,
                a = i.$container.find(".file-drop-zone"),
                r = i.dropZoneTitle;
            i.isClickable && (e = t.isEmpty(i.$element.attr("multiple")) ? i.fileSingle : i.filePlural, r += i.dropZoneClickTitle.replace("{files}", e)), a.find("." + i.dropZoneTitleClass).remove(), !i.showPreview || 0 === a.length || i.fileManager.count() > 0 || !i.dropZoneEnabled || i.previewCache.count() > 0 || !i.isAjaxUpload && i._hasFiles() || (0 === a.find(t.FRAMES).length && t.isEmpty(i.defaultPreviewContent) && a.prepend('<div class="' + i.dropZoneTitleClass + '">' + r + "</div>"), i.$container.removeClass("file-input-new"), t.addCss(i.$container, "file-input-ajax-new"))
        },
        _getStats: function(e) { var i, a, r = this; return r.showUploadStats && e && e.bitrate ? (a = r._getLayoutTemplate("stats"), i = e.elapsed && e.bps ? r.msgPendingTime.setTokens({ time: t.getElapsed(Math.ceil(e.pendingBytes / e.bps)) }) : r.msgCalculatingTime, a.setTokens({ uploadSpeed: e.bitrate, pendingTime: i })) : "" },
        _setResumableProgress: function(e, t, i) {
            var a = this,
                r = a.resumableManager,
                n = i ? r : a,
                o = i ? i.find(".file-thumb-progress") : null;
            0 === n.lastProgress && (n.lastProgress = e), e < n.lastProgress && (e = n.lastProgress), a._setProgress(e, o, null, a._getStats(t)), n.lastProgress = e
        },
        _toggleResumableProgress: function(e, i) {
            var a = this,
                r = a.$progress;
            r && r.length && t.setHtml(r, e.setTokens({ percent: 101, status: i, stats: "" }))
        },
        _setFileUploadStats: function(i, a, r, n) {
            var o = this,
                l = o.$progress;
            if (o.showPreview || l && l.length) {
                var s, d = o.fileManager,
                    c = d.getThumb(i),
                    u = o.resumableManager,
                    p = 0,
                    f = d.getTotalSize(),
                    g = e.extend(!0, {}, n);
                if (o.enableResumableUpload) {
                    var m, h = n.loaded,
                        v = u.getUploadedSize(),
                        w = u.file.size;
                    h += v, m = d.uploadedSize + h, a = t.round(100 * h / w), n.pendingBytes = w - v, o._setResumableProgress(a, n, c), s = Math.floor(100 * m / f), g.pendingBytes = f - m, o._setResumableProgress(s, g)
                } else d.setProgress(i, a), l = c && c.length ? c.find(".file-thumb-progress") : null, o._setProgress(a, l, null, o._getStats(n)), e.each(d.stats, function(e, t) { p += t.loaded }), g.pendingBytes = f - p, s = t.round(p / f * 100), o._setProgress(s, null, null, o._getStats(g))
            }
        },
        _validateMinCount: function() {
            var e = this,
                t = e.isAjaxUpload ? e.fileManager.count() : e._inputFileCount();
            return e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(t - 1) < e.minFileCount ? (e._noFilesError({}), !1) : !0
        },
        _getFileCount: function(e, t) {
            var i = this,
                a = 0;
            return void 0 === t && (t = i.validateInitialCount && !i.overwriteInitial), t && (a = i.previewCache.count(!0), e += a), e
        },
        _getFileId: function(e) { return t.getFileId(e, this.generateFileId) },
        _getFileName: function(e, i) {
            var a = this,
                r = t.getFileName(e);
            return r ? a.slug(r) : i
        },
        _getFileNames: function(e) { var t = this; return t.filenames.filter(function(t) { return e ? void 0 !== t : void 0 !== t && null !== t }) },
        _setPreviewError: function(e, t) {
            var i = this,
                a = i.removeFromPreviewOnError && !i.retryErrorUploads;
            if (t && !a || i.fileManager.remove(e), i.showPreview) {
                if (a) return void e.remove();
                i._setThumbStatus(e, "Error"), i._refreshUploadButton(e)
            }
        },
        _refreshUploadButton: function(e) {
            var i = this,
                a = e.find(".kv-file-upload"),
                r = i.fileActionSettings,
                n = r.uploadIcon,
                o = r.uploadTitle;
            a.length && (i.retryErrorUploads && (n = r.uploadRetryIcon, o = r.uploadRetryTitle), a.attr("title", o), t.setHtml(a, n))
        },
        _checkDimensions: function(e, i, a, r, n, o, l) {
            var s, d, c, u, p = this,
                f = "Small" === i ? "min" : "max",
                g = p[f + "Image" + o];
            !t.isEmpty(g) && a.length && (c = a[0], d = "Width" === o ? c.naturalWidth || c.width : c.naturalHeight || c.height, u = "Small" === i ? d >= g : g >= d, u || (s = p["msgImage" + o + i].setTokens({ name: n, size: g }), p._showFileError(s, l), p._setPreviewError(r)))
        },
        _getExifObj: function(e) {
            var i, a = this,
                r = t.logMessages.exifWarning;
            if ("data:image/jpeg;base64," !== e.slice(0, 23) && "data:image/jpg;base64," !== e.slice(0, 22)) return void(i = null);
            try { i = window.piexif ? window.piexif.load(e) : null } catch (n) { i = null, r = n && n.message || "" }
            return i || a._log(t.logMessages.badExifParser, { details: r }), i
        },
        setImageOrientation: function(i, a, r, n) {
            var o, l, s, d = this,
                c = !i || !i.length,
                u = !a || !a.length,
                p = !1,
                f = c && n && "image" === n.attr("data-template");
            c && u || (s = "load.fileinputimageorient", f ? (i = a, a = null, i.css(d.previewSettings.image), l = e(document.createElement("div")).appendTo(n.find(".kv-file-content")), o = e(document.createElement("span")).insertBefore(i), i.css("visibility", "hidden").removeClass("file-zoom-detail").appendTo(l)) : p = !i.is(":visible"), i.off(s).on(s, function() {
                p && (d.$preview.removeClass("hide-content"), n.find(".kv-file-content").css("visibility", "hidden"));
                var e = i[0],
                    s = a && a.length ? a[0] : null,
                    c = e.offsetHeight,
                    u = e.offsetWidth,
                    g = t.getRotation(r);
                if (p && (n.find(".kv-file-content").css("visibility", "visible"), d.$preview.addClass("hide-content")), i.data("orientation", r), s && a.data("orientation", r), 5 > r) return t.setTransform(e, g), void t.setTransform(s, g);
                var m = Math.atan(u / c),
                    h = Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)),
                    v = h ? c / Math.cos(Math.PI / 2 + m) / h : 1,
                    w = " scale(" + Math.abs(v) + ")";
                t.setTransform(e, g + w), t.setTransform(s, g + w), f && (i.css("visibility", "visible").insertAfter(o).addClass("file-zoom-detail"), o.remove(), l.remove())
            }))
        },
        _validateImageOrientation: function(i, a, r, n, o, l, s, d) {
            var c, u, p, f = this,
                g = f.autoOrientImage;
            return f.canOrientImage ? void i.css("image-orientation", g ? "from-image" : "none") : (p = t.getZoomSelector(r, " img"), c = g ? f._getExifObj(d) : null, (u = c ? c["0th"][piexif.ImageIFD.Orientation] : null) ? (f.setImageOrientation(i, e(p), u, f._getFrame(r)), f._raise("fileimageoriented", { $img: i, file: a }), void f._validateImage(r, n, o, l, s, d, c)) : void f._validateImage(r, n, o, l, s, d, c))
        },
        _validateImage: function(t, i, a, r, n, o, l) {
            var s, d, c, u = this,
                p = u.$preview,
                f = u._getFrame(t),
                g = f.attr("data-fileindex"),
                m = f.find("img");
            a = a || "Untitled", m.one("load", function() { d = f.width(), c = p.width(), d > c && m.css("width", "100%"), s = { ind: g, id: t, fileId: i }, u._checkDimensions(g, "Small", m, f, a, "Width", s), u._checkDimensions(g, "Small", m, f, a, "Height", s), u.resizeImage || (u._checkDimensions(g, "Large", m, f, a, "Width", s), u._checkDimensions(g, "Large", m, f, a, "Height", s)), u._raise("fileimageloaded", [t]), u.fileManager.addImage(i, { ind: g, img: m, thumb: f, pid: t, typ: r, siz: n, validated: !1, imgData: o, exifObj: l }), f.data("exif", l), u._validateAllImages() }).one("error", function() { u._raise("fileimageloaderror", [t]) }).each(function() { this.complete ? e(this).trigger("load") : this.error && e(this).trigger("error") })
        },
        _validateAllImages: function() {
            var t, i = this,
                a = { val: 0 },
                r = i.fileManager.getImageCount(),
                n = i.resizeIfSizeMoreThan;
            r === i.fileManager.totalImages && (i._raise("fileimagesloaded"), i.resizeImage && e.each(i.fileManager.loadedImages, function(e, o) { o.validated || (t = o.siz, t && t > 1e3 * n && i._getResizedImage(e, o, a, r), o.validated = !0) }))
        },
        _getResizedImage: function(i, a, r, n) {
            var o, l, s, d, c, u, p, f, g, m, h = this,
                v = e(a.img)[0],
                w = v.naturalWidth,
                b = v.naturalHeight,
                _ = 1,
                C = h.maxImageWidth || w,
                y = h.maxImageHeight || b,
                x = !(!w || !b),
                T = h.imageCanvas,
                P = h.imageCanvasContext,
                k = a.typ,
                F = a.pid,
                E = a.ind,
                S = a.thumb,
                I = a.exifObj;
            if (c = function(e, t, i) { h.isAjaxUpload ? h._showFileError(e, t, i) : h._showError(e, t, i), h._setPreviewError(S) }, f = h.fileManager.getFile(i), g = { id: F, index: E, fileId: i }, m = [i, F, E], (!f || !x || C >= w && y >= b) && (x && f && h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized"), !x)) return void c(h.msgImageResizeError, g, "fileimageresizeerror");
            k = k || h.resizeDefaultImageType, l = w > C, s = b > y, _ = "width" === h.resizePreference ? l ? C / w : s ? y / b : 1 : s ? y / b : l ? C / w : 1, h._resetCanvas(), w *= _, b *= _, T.width = w, T.height = b;
            try { P.drawImage(v, 0, 0, w, b), d = T.toDataURL(k, h.resizeQuality), I && (p = window.piexif.dump(I), d = window.piexif.insert(p, d)), o = t.dataURI2Blob(d), h.fileManager.setFile(i, o), h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), o instanceof Blob || c(h.msgImageResizeError, g, "fileimageresizeerror") } catch (A) { r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), u = h.msgImageResizeException.replace("{errors}", A.message), c(u, g, "fileimageresizeexception") }
        },
        _showProgress: function() {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.show()
        },
        _hideProgress: function() {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.hide()
        },
        _initBrowse: function(e) {
            var i = this,
                a = i.$element;
            i.showBrowse ? i.$btnFile = e.find(".btn-file").append(a) : (a.appendTo(e).attr("tabindex", -1), t.addCss(a, "file-no-browse"))
        },
        _initClickable: function() {
            var i, a, r = this;
            r.isClickable && (i = r.$dropZone, r.isAjaxUpload || (a = r.$preview.find(".file-default-preview"), a.length && (i = a)), t.addCss(i, "clickable"), i.attr("tabindex", -1), r._handler(i, "click", function(t) {
                var a = e(t.target);
                e(r.elErrorContainer + ":visible").length || a.parents(".file-preview-thumbnails").length && !a.parents(".file-default-preview").length || (r.$element.data("zoneClicked", !0).trigger("click"), i.blur())
            }))
        },
        _initCaption: function() {
            var e = this,
                i = e.initialCaption || "";
            return e.overwriteInitial || t.isEmpty(i) ? (e.$caption.val(""), !1) : (e._setCaption(i), !0)
        },
        _setCaption: function(i, a) {
            var r, n, o, l, s, d, c = this;
            if (c.$caption.length) {
                if (c.$captionContainer.removeClass("icon-visible"), a) r = e("<div>" + c.msgValidationError + "</div>").text(), l = c.fileManager.count(), l ? (d = c.fileManager.getFirstFile(), s = 1 === l && d ? d.nameFmt : c._getMsgSelected(l)) : s = c._getMsgSelected(c.msgNo), n = t.isEmpty(i) ? s : i, o = '<span class="' + c.msgValidationErrorClass + '">' + c.msgValidationErrorIcon + "</span>";
                else {
                    if (t.isEmpty(i)) return;
                    r = e("<div>" + i + "</div>").text(), n = r, o = c._getLayoutTemplate("fileIcon")
                }
                c.$captionContainer.addClass("icon-visible"), c.$caption.attr("title", r).val(n), t.setHtml(c.$captionIcon, o)
            }
        },
        _createContainer: function() {
            var e = this,
                i = { "class": "file-input file-input-new" + (e.rtl ? " kv-rtl" : "") },
                a = t.createElement(t.cspBuffer.stash(e._renderMain()));
            return t.cspBuffer.apply(a), a.insertBefore(e.$element).attr(i), e._initBrowse(a), e.theme && a.addClass("theme-" + e.theme), a
        },
        _refreshContainer: function() {
            var e = this,
                i = e.$container,
                a = e.$element;
            a.insertAfter(i), t.setHtml(i, e._renderMain()), e._initBrowse(i), e._validateDisabled()
        },
        _validateDisabled: function() {
            var e = this;
            e.$caption.attr({ readonly: e.isDisabled })
        },
        _renderMain: function() {
            var e = this,
                t = e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                i = e.showClose ? e._getLayoutTemplate("close") : "",
                a = e.showPreview ? e._getLayoutTemplate("preview").setTokens({ "class": e.previewClass, dropClass: t }) : "",
                r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                n = e.captionTemplate.setTokens({ "class": r + " kv-fileinput-caption" });
            return e.mainTemplate.setTokens({ "class": e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : ""), preview: a, close: i, caption: n, upload: e._renderButton("upload"), remove: e._renderButton("remove"), cancel: e._renderButton("cancel"), pause: e._renderButton("pause"), browse: e._renderButton("browse") })
        },
        _renderButton: function(e) {
            var i = this,
                a = i._getLayoutTemplate("btnDefault"),
                r = i[e + "Class"],
                n = i[e + "Title"],
                o = i[e + "Icon"],
                l = i[e + "Label"],
                s = i.isDisabled ? " disabled" : "",
                d = "button";
            switch (e) {
                case "remove":
                    if (!i.showRemove) return "";
                    break;
                case "cancel":
                    if (!i.showCancel) return "";
                    r += " kv-hidden";
                    break;
                case "pause":
                    if (!i.showPause) return "";
                    r += " kv-hidden";
                    break;
                case "upload":
                    if (!i.showUpload) return "";
                    i.isAjaxUpload && !i.isDisabled ? a = i._getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : d = "submit";
                    break;
                case "browse":
                    if (!i.showBrowse) return "";
                    a = i._getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return r += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.isEmpty(l) || (l = ' <span class="' + i.buttonLabelClass + '">' + l + "</span>"), a.setTokens({ type: d, css: r, title: n, status: s, icon: o, label: l })
        },
        _renderThumbProgress: function() { var e = this; return '<div class="file-thumb-progress kv-hidden">' + e.progressInfoTemplate.setTokens({ percent: 101, status: e.msgUploadBegin, stats: "" }) + "</div>" },
        _renderFileFooter: function(e, i, a, r, n) {
            var o, l, s = this,
                d = s.fileActionSettings,
                c = d.showRemove,
                u = d.showDrag,
                p = d.showUpload,
                f = d.showZoom,
                g = s._getLayoutTemplate("footer"),
                m = s._getLayoutTemplate("indicator"),
                h = n ? d.indicatorError : d.indicatorNew,
                v = n ? d.indicatorErrorTitle : d.indicatorNewTitle,
                w = m.setTokens({ indicator: h, indicatorTitle: v });
            return a = s._getSize(a), l = { type: e, caption: i, size: a, width: r, progress: "", indicator: w }, s.isAjaxUpload ? (l.progress = s._renderThumbProgress(), l.actions = s._renderFileActions(l, p, !1, c, f, u, !1, !1, !1)) : l.actions = s._renderFileActions(l, !1, !1, !1, f, u, !1, !1, !1), o = g.setTokens(l), o = t.replaceTags(o, s.previewThumbTags)
        },
        _renderFileActions: function(e, t, i, a, r, n, o, l, s, d, c, u) {
            var p = this;
            if (!e.type && d && (e.type = "image"), p.enableResumableUpload ? t = !1 : "function" == typeof t && (t = t(e)), "function" == typeof i && (i = i(e)), "function" == typeof a && (a = a(e)), "function" == typeof r && (r = r(e)), "function" == typeof n && (n = n(e)), !(t || i || a || r || n)) return "";
            var f, g = l === !1 ? "" : ' data-url="' + l + '"',
                m = "",
                h = "",
                v = s === !1 ? "" : ' data-key="' + s + '"',
                w = "",
                b = "",
                _ = "",
                C = p._getLayoutTemplate("actions"),
                y = p.fileActionSettings,
                x = p.otherActionButtons.setTokens({ dataKey: v, key: s }),
                T = o ? y.removeClass + " disabled" : y.removeClass;
            return a && (w = p._getLayoutTemplate("actionDelete").setTokens({ removeClass: T, removeIcon: y.removeIcon, removeTitle: y.removeTitle, dataUrl: g, dataKey: v, key: s })), t && (b = p._getLayoutTemplate("actionUpload").setTokens({ uploadClass: y.uploadClass, uploadIcon: y.uploadIcon, uploadTitle: y.uploadTitle })), i && (_ = p._getLayoutTemplate("actionDownload").setTokens({ downloadClass: y.downloadClass, downloadIcon: y.downloadIcon, downloadTitle: y.downloadTitle, downloadUrl: c || p.initialPreviewDownloadUrl }), _ = _.setTokens({ filename: u, key: s })), r && (m = p._getLayoutTemplate("actionZoom").setTokens({ zoomClass: y.zoomClass, zoomIcon: y.zoomIcon, zoomTitle: y.zoomTitle })), n && d && (f = "drag-handle-init " + y.dragClass, h = p._getLayoutTemplate("actionDrag").setTokens({ dragClass: f, dragTitle: y.dragTitle, dragIcon: y.dragIcon })), C.setTokens({ "delete": w, upload: b, download: _, zoom: m, drag: h, other: x })
        },
        _browse: function(e) {
            var t = this;
            e && e.isDefaultPrevented() || !t._raise("filebrowse") || (t.isError && !t.isAjaxUpload && t.clear(), t.focusCaptionOnBrowse && t.$captionContainer.focus())
        },
        _change: function(i) {
            var a = this;
            if (!a.changeTriggered) {
                var r, n, o, l, s = a.$element,
                    d = arguments.length > 1,
                    c = a.isAjaxUpload,
                    u = d ? arguments[1] : s[0].files,
                    p = a.fileManager.count(),
                    f = t.isEmpty(s.attr("multiple")),
                    g = !c && f ? 1 : a.maxFileCount,
                    m = a.maxTotalFileCount,
                    h = m > 0 && m > g,
                    v = f && p > 0,
                    w = function(t, i, r, n) {
                        var o = e.extend(!0, {}, a._getOutData(null, {}, {}, u), { id: r, index: n }),
                            l = { id: r, index: n, file: i, files: u };
                        return a.isPersistentError = !0, c ? a._showFileError(t, o) : a._showError(t, l)
                    },
                    b = function(e, t, i) {
                        var r = i ? a.msgTotalFilesTooMany : a.msgFilesTooMany;
                        r = r.replace("{m}", t).replace("{n}", e), a.isError = w(r, null, null, null), a.$captionContainer.removeClass("icon-visible"), a._setCaption("", !0), a.$container.removeClass("file-input-new file-input-ajax-new")
                    };
                if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.dropZoneEnabled && a.$container.find(".file-drop-zone ." + a.dropZoneTitleClass).remove(), c || (u = i.target && void 0 === i.target.files ? i.target.value ? [{ name: i.target.value.replace(/^.+\\/, "") }] : [] : i.target.files || {}), r = u, t.isEmpty(r) || 0 === r.length) return c || a.clear(), void a._raise("fileselectnone");
                if (a._resetErrors(), l = r.length, o = c ? a.fileManager.count() + l : l, n = a._getFileCount(o, h ? !1 : void 0), g > 0 && n > g) {
                    if (!a.autoReplace || l > g) return void b(a.autoReplace && l > g ? l : n, g);
                    n > g && a._resetPreviewThumbs(c)
                } else {
                    if (h && (n = a._getFileCount(o, !0), m > 0 && n > m)) {
                        if (!a.autoReplace || l > g) return void b(a.autoReplace && l > m ? l : n, m, !0);
                        n > g && a._resetPreviewThumbs(c)
                    }!c || v ? (a._resetPreviewThumbs(!1), v && a.clearFileStack()) : !c || 0 !== p || a.previewCache.count(!0) && !a.overwriteInitial || a._resetPreviewThumbs(!0)
                }
                a.readFiles(r)
            }
        },
        _abort: function(t) { var i, a = this; return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (i = e.extend(!0, {}, a._getOutData(null), t), i.abortData = a.ajaxAborted.data || {}, i.abortMessage = a.ajaxAborted.message, a._setProgress(101, a.$progress, a.msgCancelled), a._showFileError(a.ajaxAborted.message, i, "filecustomerror"), a.cancel(), !0) : !!a.ajaxAborted },
        _resetFileStack: function() {
            var t = this,
                i = 0;
            t._getThumbs().each(function() {
                var a = e(this),
                    r = a.attr("data-fileindex"),
                    n = a.attr("id");
                "-1" !== r && -1 !== r && (t.fileManager.getFile(a.attr("data-fileid")) ? a.attr({ "data-fileindex": "-1" }) : (a.attr({ "data-fileindex": i }), i++), t._getZoom(n).attr({ "data-fileindex": a.attr("data-fileindex") }))
            })
        },
        _isFileSelectionValid: function(e) { var t = this; return e = e || 0, t.required && !t.getFilesCount() ? (t.$errorContainer.html(""), t._showFileError(t.msgFileRequired), !1) : t.minFileCount > 0 && t._getFileCount(e) < t.minFileCount ? (t._noFilesError({}), !1) : !0 },
        _canPreview: function(e) {
            var i = this;
            if (!(e && i.showPreview && i.$preview && i.$preview.length)) return !1;
            var a, r, n, o, l = e.name || "",
                s = e.type || "",
                d = (e.size || 0) / 1e3,
                c = i._parseFileType(s, l),
                u = i.allowedPreviewTypes,
                p = i.allowedPreviewMimeTypes,
                f = i.allowedPreviewExtensions || [],
                g = i.disabledPreviewTypes,
                m = i.disabledPreviewMimeTypes,
                h = i.disabledPreviewExtensions || [],
                v = i.maxFilePreviewSize && parseFloat(i.maxFilePreviewSize) || 0,
                w = new RegExp("\\.(" + f.join("|") + ")$", "i"),
                b = new RegExp("\\.(" + h.join("|") + ")$", "i");
            return a = !u || -1 !== u.indexOf(c), r = !p || -1 !== p.indexOf(s), n = !f.length || t.compare(l, w), o = g && -1 !== g.indexOf(c) || m && -1 !== m.indexOf(s) || h.length && t.compare(l, b) || v && !isNaN(v) && d > v, !o && (a || r || n)
        },
        addToStack: function(e, t) { this.fileManager.add(e, t) },
        clearFileStack: function() { var e = this; return e.fileManager.clear(), e._initResumableUpload(), e.enableResumableUpload ? (null === e.showPause && (e.showPause = !0), null === e.showCancel && (e.showCancel = !1)) : (e.showPause = !1, null === e.showCancel && (e.showCancel = !0)), e.$element },
        getFileStack: function() { return this.fileManager.stack },
        getFileList: function() { return this.fileManager.list() },
        getFilesCount: function(e) {
            var t = this,
                i = t.isAjaxUpload ? t.fileManager.count() : t._inputFileCount();
            return e && (i += t.previewCache.count(!0)), t._getFileCount(i)
        },
        readFiles: function(i) {
            this.reader = new FileReader;
            var a, r = this,
                n = r.reader,
                o = r.$previewContainer,
                l = r.$previewStatus,
                s = r.msgLoading,
                d = r.msgProgress,
                c = r.previewInitId,
                u = i.length,
                p = r.fileTypeSettings,
                f = r.allowedFileTypes,
                g = f ? f.length : 0,
                m = r.allowedFileExtensions,
                h = t.isEmpty(m) ? "" : m.join(", "),
                v = function(t, n, o, l, s, d) {
                    var c, p = e.extend(!0, {}, r._getOutData(null, {}, {}, i), { id: o, index: l, fileId: s }),
                        f = { id: o, index: l, fileId: s, file: n, files: i };
                    d = d || r.removeFromPreviewOnError, d || r._previewDefault(n, !0), c = r._getFrame(o, !0), r.isAjaxUpload ? setTimeout(function() { a(l + 1) }, r.processDelay) : (r.unlock(), u = 0), d && c.length ? c.remove() : (r._initFileActions(), c.find(".kv-file-upload").remove()), r.isPersistentError = !0, r.isError = r.isAjaxUpload ? r._showFileError(t, p) : r._showError(t, f), r._updateFileDetails(u)
                };
            r.fileManager.clearImages(), e.each(i, function(e, t) {
                var i = r.fileTypeSettings.image;
                i && i(t.type) && r.fileManager.totalImages++
            }), a = function(w) {
                var b, _ = r.$errorContainer,
                    C = r.fileManager;
                if (w >= u) return r.unlock(), r.duplicateErrors.length && (b = "<li>" + r.duplicateErrors.join("</li><li>") + "</li>", 0 === _.find("ul").length ? t.setHtml(_, r.errorCloseButton + "<ul>" + b + "</ul>") : _.find("ul").append(b), _.fadeIn(r.fadeDelay), r._handler(_.find(".kv-error-close"), "click", function() { _.fadeOut(r.fadeDelay) }), r.duplicateErrors = []), r.isAjaxUpload ? (r._raise("filebatchselected", [C.stack]), 0 !== C.count() || r.isError || r.reset()) : r._raise("filebatchselected", [i]), o.removeClass("file-thumb-loading"), void l.html("");
                r.lock(!0);
                var y, x, T, P, k, F, E, S, I, A, D, z, M, j, U = i[w],
                    $ = c + "-" + r._getFileId(U),
                    R = p.text,
                    O = p.image,
                    B = p.html,
                    L = r._getFileName(U, ""),
                    N = (U && U.size || 0) / 1e3,
                    Z = "",
                    H = t.createObjectURL(U),
                    W = 0,
                    q = "",
                    V = !1,
                    K = 0,
                    G = function() {
                        var e = d.setTokens({ index: w + 1, files: u, percent: 50, name: L });
                        setTimeout(function() { l.html(e), r._updateFileDetails(u), a(w + 1) }, r.processDelay), r._raise("fileloaded", [U, $, w, n]) && r.isAjaxUpload && C.add(U)
                    };
                if (U) {
                    if (S = C.getId(U), g > 0)
                        for (x = 0; g > x; x++) F = f[x], E = r.msgFileTypes[F] || F, q += 0 === x ? E : ", " + E;
                    if (L === !1) return void a(w + 1);
                    if (0 === L.length) return T = r.msgInvalidFileName.replace("{name}", t.htmlEncode(t.getFileName(U), "[unknown]")), void v(T, U, $, w, S);
                    if (t.isEmpty(m) || (Z = new RegExp("\\.(" + m.join("|") + ")$", "i")), y = N.toFixed(2), r.isAjaxUpload && C.exists(S) || r._getFrame($, !0).length) { var Y = { id: $, index: w, fileId: S, file: U, files: i }; return T = r.msgDuplicateFile.setTokens({ name: L, size: y }), void(r.isAjaxUpload ? setTimeout(function() { r.duplicateErrors.push(T), r._raise("fileduplicateerror", [U, S, L, y, $, w]), a(w + 1), r._updateFileDetails(u) }, r.processDelay) : (r._showError(T, Y), r.unlock(), u = 0, r._clearFileInput(), r.reset(), r._updateFileDetails(u))) }
                    if (r.maxFileSize > 0 && N > r.maxFileSize) return T = r.msgSizeTooLarge.setTokens({ name: L, size: y, maxSize: r.maxFileSize }), void v(T, U, $, w, S);
                    if (null !== r.minFileSize && N <= t.getNum(r.minFileSize)) return T = r.msgSizeTooSmall.setTokens({ name: L, size: y, minSize: r.minFileSize }), void v(T, U, $, w, S);
                    if (!t.isEmpty(f) && t.isArray(f)) { for (x = 0; x < f.length; x += 1) P = f[x], A = p[P], W += A && "function" == typeof A && A(U.type, t.getFileName(U)) ? 1 : 0; if (0 === W) return T = r.msgInvalidFileType.setTokens({ name: L, types: q }), void v(T, U, $, w, S) }
                    if (0 === W && !t.isEmpty(m) && t.isArray(m) && !t.isEmpty(Z) && (k = t.compare(L, Z), W += t.isEmpty(k) ? 0 : k.length, 0 === W)) return T = r.msgInvalidFileExtension.setTokens({ name: L, extensions: h }), void v(T, U, $, w, S);
                    if (!r._canPreview(U)) return I = r.isAjaxUpload && r._raise("filebeforeload", [U, w, n]), r.isAjaxUpload && I && C.add(U), r.showPreview && I && (o.addClass("file-thumb-loading"), r._previewDefault(U), r._initFileActions()), void setTimeout(function() { I && r._updateFileDetails(u), a(w + 1), r._raise("fileloaded", [U, $, w]) }, 10);
                    D = R(U.type, L), z = B(U.type, L), M = O(U.type, L), l.html(s.replace("{index}", w + 1).replace("{files}", u)), o.addClass("file-thumb-loading"), n.onerror = function(e) { r._errorHandler(e, L) }, n.onload = function(i) {
                        var a, s, d, c, u, f, g = [],
                            m = function(e) {
                                var t = new FileReader;
                                t.onerror = function(e) { r._errorHandler(e, L) }, t.onload = function(e) { return r.isAjaxUpload && !r._raise("filebeforeload", [U, w, n]) ? (V = !0, r._resetCaption(), n.abort(), l.html(""), o.removeClass("file-thumb-loading"), void r.enable()) : (r._previewFile(w, U, e, H, s), r._initFileActions(), void G()) }, e ? t.readAsText(U, r.textEncoding) : t.readAsDataURL(U)
                            };
                        if (s = { name: L, type: U.type }, e.each(p, function(e, t) { "object" !== e && "other" !== e && "function" == typeof t && t(U.type, L) && K++ }), 0 === K) { for (d = new Uint8Array(i.target.result), x = 0; x < d.length; x++) c = d[x].toString(16), g.push(c); if (a = g.join("").toLowerCase().substring(0, 8), f = t.getMimeType(a, "", ""), t.isEmpty(f) && (u = t.arrayBuffer2String(n.result), f = t.isSvg(u) ? "image/svg+xml" : t.getMimeType(a, u, U.type)), s = { name: L, type: f }, D = R(f, ""), z = B(f, ""), M = O(f, ""), j = D || z, j || M) return void m(j) }
                        return r.isAjaxUpload && !r._raise("filebeforeload", [U, w, n]) ? (V = !0, r._resetCaption(), n.abort(), l.html(""), o.removeClass("file-thumb-loading"), void r.enable()) : (r._previewFile(w, U, i, H, s), r._initFileActions(), void G())
                    }, n.onprogress = function(e) {
                        if (e.lengthComputable) {
                            var t = e.loaded / e.total * 100,
                                i = Math.ceil(t);
                            T = d.setTokens({ index: w + 1, files: u, percent: i, name: L }), setTimeout(function() { V || l.html(T) }, r.processDelay)
                        }
                    }, D || z ? n.readAsText(U, r.textEncoding) : M ? n.readAsDataURL(U) : n.readAsArrayBuffer(U)
                }
            }, a(0), r._updateFileDetails(u, !0)
        },
        lock: function(e) {
            var t = this,
                i = t.$container;
            return t._resetErrors(), t.disable(), !e && t.showCancel && i.find(".fileinput-cancel").show(), !e && t.showPause && i.find(".fileinput-pause").show(), t._raise("filelock", [t.fileManager.stack, t._getExtraData()]), t.$element
        },
        unlock: function(e) {
            var t = this,
                i = t.$container;
            return void 0 === e && (e = !0), t.enable(), i.removeClass("is-locked"), t.showCancel && i.find(".fileinput-cancel").hide(), t.showPause && i.find(".fileinput-pause").hide(), e && t._resetFileStack(), t._raise("fileunlock", [t.fileManager.stack, t._getExtraData()]), t.$element
        },
        resume: function() {
            var e = this,
                t = !1,
                i = e.resumableManager;
            return e.enableResumableUpload ? (e.paused ? e._toggleResumableProgress(e.progressPauseTemplate, e.msgUploadResume) : t = !0, e.paused = !1, t && e._toggleResumableProgress(e.progressInfoTemplate, e.msgUploadBegin), setTimeout(function() { i.upload() }, e.processDelay), e.$element) : e.$element
        },
        pause: function() {
            var t, i = this,
                a = i.resumableManager,
                r = i.ajaxRequests,
                n = r.length,
                o = a.getProgress(),
                l = i.fileActionSettings,
                s = i.taskManager,
                d = s.getPool(a.id);
            if (!i.enableResumableUpload) return i.$element;
            if (d && d.cancel(), i._raise("fileuploadpaused", [i.fileManager, a]), n > 0)
                for (t = 0; n > t; t += 1) i.paused = !0, r[t].abort();
            return i.showPreview && i._getThumbs().each(function() {
                var t, a = e(this),
                    r = a.attr("data-fileid"),
                    n = i._getLayoutTemplate("stats"),
                    s = a.find(".file-upload-indicator");
                a.removeClass("file-uploading"), s.attr("title") === l.indicatorLoadingTitle && (i._setThumbStatus(a, "Paused"), t = n.setTokens({ pendingTime: i.msgPaused, uploadSpeed: "" }), i.paused = !0, i._setProgress(o, a.find(".file-thumb-progress"), o + "%", t)), i.fileManager.getFile(r) || a.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")
            }), i._setProgress(101, i.$progress, i.msgPaused), i.$element
        },
        cancel: function() {
            var t, i = this,
                a = i.ajaxRequests,
                r = i.resumableManager,
                n = i.taskManager,
                o = r ? n.getPool(r.id) : void 0,
                l = a.length;
            if (i.enableResumableUpload && o ? (o.cancel().done(function() { i._setProgressCancelled() }), r.reset(), i._raise("fileuploadcancelled", [i.fileManager, r])) : i._raise("fileuploadcancelled", [i.fileManager]), i._initAjax(), l > 0)
                for (t = 0; l > t; t += 1) i.cancelling = !0, a[t].abort();
            return i._getThumbs().each(function() {
                var t = e(this),
                    a = t.attr("data-fileid"),
                    r = t.find(".file-thumb-progress");
                t.removeClass("file-uploading"), i._setProgress(0, r), r.hide(), i.fileManager.getFile(a) || (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), i.unlock()
            }), setTimeout(function() { i._setProgressCancelled() }, i.processDelay), i.$element
        },
        clear: function() { var i, a = this; if (a._raise("fileclear")) return a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(function() { t.cleanMemory(e(this)) }), a._clearFileInput(), a._resetUpload(), a.clearFileStack(), a.isPersistentError = !1, a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(), a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(function() { a._clearObjects(e(this)) }), a.isAjaxUpload && (a.previewCache.data = {}), a.$preview.html(""), i = !a.overwriteInitial && a.initialCaption.length > 0 ? a.initialCaption : "", a.$caption.attr("title", "").val(i), t.addCss(a.$container, "file-input-new"), a._validateDefaultPreview()), 0 === a.$container.find(t.FRAMES).length && (a._initCaption() || a.$captionContainer.removeClass("icon-visible")), a._hideFileIcon(), a.focusCaptionOnClear && a.$captionContainer.focus(), a._setFileDropZoneTitle(), a._raise("filecleared"), a.$element },
        reset: function() { var e = this; if (e._raise("filereset")) return e.lastProgress = 0, e._resetPreview(), e.$container.find(".fileinput-filename").text(""), t.addCss(e.$container, "file-input-new"), e.getFrames().length && e.$container.removeClass("file-input-new"), e.clearFileStack(), e._setFileDropZoneTitle(), e.$element },
        disable: function() {
            var e = this,
                i = e.$container;
            return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), i.addClass("is-locked"), t.addCss(i.find(".btn-file"), "disabled"), i.find(".kv-fileinput-caption").addClass("file-caption-disabled"), i.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e._initDragDrop(), e.$element
        },
        enable: function() {
            var e = this,
                t = e.$container;
            return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), t.removeClass("is-locked"), t.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), t.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), t.find(".btn-file").removeClass("disabled"), e._initDragDrop(), e.$element
        },
        upload: function() {
            var i, a, r = this,
                n = r.fileManager,
                o = n.count(),
                l = !e.isEmptyObject(r._getExtraData());
            if (r.isAjaxUpload && !r.isDisabled && r._isFileSelectionValid(o)) return r.lastProgress = 0, r._resetUpload(), 0 !== o || l ? (r.cancelling = !1, r._showProgress(), r.lock(), 0 === o && l ? (r._setProgress(2), void r._uploadExtraOnly()) : r.enableResumableUpload ? r.resume() : ((r.uploadAsync || r.enableResumableUpload) && (a = r._getOutData(null), r._raise("filebatchpreupload", [a]), r.fileBatchCompleted = !1, r.uploadCache = [], e.each(r.getFileStack(), function(e) {
                var t = r._getThumbId(e);
                r.uploadCache.push({ id: t, content: null, config: null, tags: null, append: !0 })
            }), r.$preview.find(".file-preview-initial").removeClass(t.SORT_CSS), r._initSortable()), r._setProgress(2), r.hasInitData = !1, r.uploadAsync ? (i = 0, void e.each(n.stack, function(e) { r._uploadSingle(i, e, !0), i++ })) : (r._uploadBatch(), r.$element))) : void r._showFileError(r.msgUploadEmpty)
        },
        destroy: function() {
            var t = this,
                i = t.$form,
                a = t.$container,
                r = t.$element,
                n = t.namespace;
            return e(document).off(n), e(window).off(n), i && i.length && i.off(n), t.isAjaxUpload && t._clearFileInput(), t._cleanup(), t._initPreviewCache(), r.insertBefore(a).off(n).removeData(), a.off().remove(), r
        },
        refresh: function(i) {
            var a = this,
                r = a.$element;
            return i = "object" != typeof i || t.isEmpty(i) ? a.options : e.extend(!0, {}, a.options, i), a._init(i, !0), a._listen(), r
        },
        zoom: function(e) {
            var t = this,
                i = t._getFrame(e);
            t._showModal(i)
        },
        getExif: function(e) {
            var t = this,
                i = t._getFrame(e);
            return i && i.data("exif") || null
        },
        getFrames: function(i) { var a, r = this; return i = i || "", a = r.$preview.find(t.FRAMES + i), r.reversePreviewOrder && (a = e(a.get().reverse())), a },
        getPreview: function() { var e = this; return { content: e.initialPreview, config: e.initialPreviewConfig, tags: e.initialPreviewThumbTags } }
    }, e.fn.fileinput = function(a) {
        if (t.hasFileAPISupport() || t.isIE(9)) {
            var r = Array.apply(null, arguments),
                n = [];
            switch (r.shift(), this.each(function() {
                var o, l = e(this),
                    s = l.data("fileinput"),
                    d = "object" == typeof a && a,
                    c = d.theme || l.data("theme"),
                    u = {},
                    p = {},
                    f = d.language || l.data("language") || e.fn.fileinput.defaults.language || "en";
                s || (c && (p = e.fn.fileinputThemes[c] || {}), "en" === f || t.isEmpty(e.fn.fileinputLocales[f]) || (u = e.fn.fileinputLocales[f] || {}), o = e.extend(!0, {}, e.fn.fileinput.defaults, p, e.fn.fileinputLocales.en, u, d, l.data()), s = new i(this, o), l.data("fileinput", s)), "string" == typeof a && n.push(s[a].apply(s, r))
            }), n.length) {
                case 0:
                    return this;
                case 1:
                    return n[0];
                default:
                    return n
            }
        }
    };
    var a = 'class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}';
    e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showUploadStats: !0,
        showCancel: null,
        showPause: null,
        showClose: !0,
        showUploadedThumbs: !0,
        showConsoleLogs: !1,
        browseOnZoneClick: !1,
        autoReplace: !1,
        autoOrientImage: function() {
            var e = window.navigator.userAgent,
                t = !!e.match(/WebKit/i),
                i = !!e.match(/iP(od|ad|hone)/i),
                a = i && t && !e.match(/CriOS/i);
            return !a
        },
        autoOrientImageInitial: !0,
        required: !1,
        rtl: !1,
        hideThumbnailContent: !1,
        encodeUrl: !0,
        focusCaptionOnBrowse: !0,
        focusCaptionOnClear: !0,
        generateFileId: null,
        previewClass: "",
        captionClass: "",
        frameClass: "krajee-default",
        mainClass: "file-caption-main",
        mainTemplate: null,
        purifyHtml: !0,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        initialPreviewDownloadUrl: "",
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        sanitizeZoomCache: function(e) { var i = t.createElement(e); return i.find("input,select,.file-thumbnail-footer").remove(), i.html() },
        previewZoomButtonIcons: { prev: '<i class="icon-triangle-left"></i>', next: '<i class="icon-triangle-right"></i>', toggleheader: '<i class="icon-resize-vertical"></i>', fullscreen: '<i class="icon-fullscreen"></i>', borderless: '<i class="icon-resize-full"></i>', close: '<i class="icon-remove"></i>' },
        previewZoomButtonClasses: { prev: "btn btn-navigate", next: "btn btn-navigate", toggleheader: "btn btn-sm btn-kv btn-default btn-outline-secondary", fullscreen: "btn btn-sm btn-kv btn-default btn-outline-secondary", borderless: "btn btn-sm btn-kv btn-default btn-outline-secondary", close: "btn btn-sm btn-kv btn-default btn-outline-secondary" },
        previewTemplates: {},
        previewContentTemplates: {},
        preferIconicPreview: !1,
        preferIconicZoomPreview: !1,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        allowedPreviewTypes: void 0,
        allowedPreviewMimeTypes: null,
        allowedPreviewExtensions: null,
        disabledPreviewTypes: void 0,
        disabledPreviewExtensions: ["msi", "exe", "com", "zip", "rar", "app", "vb", "scr"],
        disabledPreviewMimeTypes: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="icon-file"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="icon-folder-open"></i>&nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="icon-trash"></i>',
        removeClass: "btn btn-default btn-secondary",
        cancelIcon: '<i class="icon-ban-circle"></i>',
        cancelClass: "btn btn-default btn-secondary",
        pauseIcon: '<i class="icon-pause"></i>',
        pauseClass: "btn btn-default btn-secondary",
        uploadIcon: '<i class="icon-upload"></i>',
        uploadClass: "btn btn-default btn-secondary",
        uploadUrl: null,
        uploadUrlThumb: null,
        uploadAsync: !0,
        uploadParamNames: { chunkCount: "chunkCount", chunkIndex: "chunkIndex", chunkSize: "chunkSize", chunkSizeStart: "chunkSizeStart", chunksUploaded: "chunksUploaded", fileBlob: "fileBlob", fileId: "fileId", fileName: "fileName", fileRelativePath: "fileRelativePath", fileSize: "fileSize", retryCount: "retryCount" },
        maxAjaxThreads: 5,
        fadeDelay: 800,
        processDelay: 100,
        queueDelay: 10,
        progressDelay: 0,
        enableResumableUpload: !1,
        resumableUploadOptions: { fallback: null, testUrl: null, chunkSize: 2048, maxThreads: 4, maxRetries: 3, showErrorLog: !0 },
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        resizeIfSizeMoreThan: 0,
        minFileSize: 0,
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        maxTotalFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="icon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-striped active",
        progressClass: "progress-bar bg-success progress-bar-success progress-bar-striped active",
        progressInfoClass: "progress-bar bg-info progress-bar-info progress-bar-striped active",
        progressCompleteClass: "progress-bar bg-success progress-bar-success",
        progressPauseClass: "progress-bar bg-primary progress-bar-primary progress-bar-striped active",
        progressErrorClass: "progress-bar bg-danger progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: t.closeButton("kv-error-close"),
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0,
        mergeAjaxCallbacks: !1,
        mergeAjaxDeleteCallbacks: !1,
        retryErrorUploads: !0,
        reversePreviewOrder: !1,
        usePdfRenderer: function() { var e = !!window.MSInputMethodContext && !!document.documentMode; return !!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/i) || e },
        pdfRendererUrl: "",
        pdfRendererTemplate: "<iframe " + a + "></iframe>"
    }, e.fn.fileinputLocales.en = { fileSingle: "file", filePlural: "files", browseLabel: "Browse &hellip;", removeLabel: "Remove", removeTitle: "Clear all unprocessed files", cancelLabel: "Cancel", cancelTitle: "Abort ongoing upload", pauseLabel: "Pause", pauseTitle: "Pause ongoing upload", uploadLabel: "Upload", uploadTitle: "Upload selected files", msgNo: "No", msgNoFilesSelected: "No files selected", msgCancelled: "Cancelled", msgPaused: "Paused", msgPlaceholder: "Select {files} ...", msgZoomModalHeading: "Detailed Preview", msgFileRequired: "You must select a file to upload.", msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.', msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.', msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.", msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.", msgTotalFilesTooMany: "You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).", msgFileNotFound: 'File "{name}" not found!', msgFileSecured: 'Security restrictions prevent reading the file "{name}".', msgFileNotReadable: 'File "{name}" is not readable.', msgFilePreviewAborted: 'File preview aborted for "{name}".', msgFilePreviewError: 'An error occurred while reading the file "{name}".', msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".', msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.', msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.', msgFileTypes: { image: "image", html: "HTML", text: "text", video: "video", audio: "audio", flash: "flash", pdf: "PDF", object: "object" }, msgUploadAborted: "The file upload was aborted", msgUploadThreshold: "Processing &hellip;", msgUploadBegin: "Initializing &hellip;", msgUploadEnd: "Done", msgUploadResume: "Resuming upload &hellip;", msgUploadEmpty: "No valid data available for upload.", msgUploadError: "Upload Error", msgDeleteError: "Delete Error", msgProgressError: "Error", msgValidationError: "Validation Error", msgLoading: "Loading file {index} of {files} &hellip;", msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.", msgSelected: "{n} {files} selected", msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.", msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.', msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.', msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.', msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.', msgImageResizeError: "Could not get the image dimensions to resize.", msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>", msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!", msgAjaxProgressError: "{operation} failed", msgDuplicateFile: 'File "{name}" of same size "{size} KB" has already been selected earlier. Skipping duplicate selection.', msgResumableUploadRetriesExceeded: "Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>", msgPendingTime: "{time} remaining", msgCalculatingTime: "calculating time remaining", ajaxOperations: { deleteThumb: "file delete", uploadThumb: "file upload", uploadBatch: "batch file upload", uploadExtra: "form data upload" }, dropZoneTitle: "Drag & drop files here &hellip;", dropZoneClickTitle: "<br>(or click to select {files})", previewZoomButtonTitles: { prev: "View previous file", next: "View next file", toggleheader: "Toggle header", fullscreen: "Toggle full screen", borderless: "Toggle borderless mode", close: "Close detailed preview" } }, e.fn.fileinput.Constructor = i, e(document).ready(function() {
        var t = e("input.file[type=file]");
        t.length && t.fileinput()
    })
});