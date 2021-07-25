var PAGE_STATE = {}
  , FIT_PADDING = 20;
function fitConstraints(a, b, c, d) {
    var e = Math.min
      , f = c / a
      , g = d / b;
    return a = e(a * f, a * g, a),
    b = e(b * f, b * g, b),
    {
        width: a,
        height: b,
        left: parseInt((c - a) / 2),
        top: parseInt((d - b) / 2)
    }
}
function formatBytes(a, b) {
    var c = Math.log;
    if (0 === a)
        return "0";
    var d = Math.floor(c(a) / c(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(b + 1 || 3)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}
function loadImage(a, b, c) {
    var d = new Image
      , e = !1
      , f = setTimeout(function() {
        e || (e = !0,
        c("Timed out trying to load image."))
    }, 1e4);
    d.onerror = function() {
        e || (e = !0,
        c("File no longer exists\u2014perhaps it has been cleared from your browser \uD83D\uDE10"))
    }
    ,
    d.onload = function() {
        window.clearTimeout(f),
        e || b(a, d.width, d.height)
    }
    ,
    d.src = a
}
function setImage(a, b, c) {
    function d() {
        var a = 2 * FIT_PADDING
          , d = window.innerWidth - a
          , e = window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - a
          , f = fitConstraints(b, c, d, e);
        g.style.height = f.height + "px",
        g.style.width = f.width + "px",
        g.parentNode.style.padding = f.top + a / 2 + "px 0"
    }
    function e() {
        g.style.height = "auto",
        g.style.width = "auto",
        g.parentNode.style.padding = 0
    }
    function f(a) {
        var f = "object" == typeof a
          , h = document.getElementsByTagName("header")[0].offsetHeight
          , i = b > window.innerWidth || c + 2 * FIT_PADDING > window.innerHeight - h
          , j = g.width
          , k = g.height
          , l = f ? Util.$.offsets(g) : null
          , m = Util.$("image")
          , n = Util.$.hasClass(m, "can-zoom-out");
        !0 == (!0 === a) && (n = !n);
        var o = "";
        if (i && (n ? (d(),
        o = "can-zoom-in") : (e(),
        o = "can-zoom-out")),
        m.setAttribute("class", o),
        f && !n) {
            var p = a.clientX - l.left
              , q = a.clientY - l.top
              , r = p / j * b - window.innerWidth / 2
              , s = q / k * c - window.innerHeight / 2;
            window.scrollTo(r, s)
        }
    }
    var g = document.createElement("IMG");
    g.src = a,
    g.title = "Captured screenshot";
    var h = Util.$("image");
    h.innerHTML = "",
    h.appendChild(g);
    var i = Util.$("btn-download");
    i.href = a,
    i.download = a.split("/").pop();
    var j = Util.$("btn-expand");
    j.href = a,
    PAGE_STATE.imgSrc = a,
    PAGE_STATE.fsPath = i.download,
    f(!0),
    showImgButtons(),
    Util.$.on(g, "click", f),
    Util.$.on(window, "resize", function() {
        f(!0)
    })
}
function showError(a, b, c, d) {
    Util.$("error-title").innerText = a,
    Util.$("error-body").innerText = b;
    var e = Util.$("error");
    c ? Util.$.removeClass(e, "warning") : Util.$.addClass(e, "warning"),
    Util.$.findClass("close", e).forEach(function(a) {
        a.style.display = d ? "" : "none"
    }),
    Util.$("error-wrap").style.display = "block"
}
function hideError() {
    Util.$("error-wrap").style.display = "none"
}
Util.$.findClass("close", Util.$("error")).forEach(function(a) {
    Util.$.on(a, "click", function() {
        hideError()
    })
});
function showHistory(a) {
    hideError(),
    Util.$("image").style.display = "none",
    window.scrollTo(0, 0);
    var b = document.createElement("ul");
    b.className = "dropdown-items",
    b.appendChild(_createHistoryHeader()),
    a.sort(function(a, b) {
        var c = a.metadata ? a.metadata.modificationTime.getTime() : null
          , d = b.metadata ? b.metadata.modificationTime.getTime() : null;
        return c ? d ? d - c : -1 : d ? 1 : 0
    }),
    a.forEach(function(a) {
        b.appendChild(_createHistoryRow(a))
    }),
    1 < a.length ? b.appendChild(_createClearAllRow()) : !a.length && b.appendChild(_createEmptyRow());
    var c = Util.$("history");
    c.innerHTML = "",
    c.appendChild(b),
    c.style.display = "block",
    hideImgButtons()
}
function _createHistoryHeader() {
    var a = document.createElement("li");
    a.className = "dropdown-header";
    var b = document.createElement("div");
    b.className = "container",
    a.appendChild(b);
    var c = document.createElement("a");
    c.className = "right close abs-close",
    c.href = "#",
    c.innerHTML = "<span class=\"pe-7s-close\"></span><span class=\"sr-only\">Close</span>",
    Util.$.on(c, "click", function(a) {
        a.preventDefault(),
        hideHistory()
    }),
    b.appendChild(c);
    var d = document.createElement("h3");
    return d.innerText = "History",
    b.appendChild(d),
    a
}
function _createHistoryRow(b) {
    var c = b.name
      , d = b.metadata ? b.metadata.modificationTime.toLocaleDateString() : "??"
      , e = b.metadata ? formatBytes(b.metadata.size, 1) : ""
      , f = "index.html?src=" + encodeURIComponent(c)
      , g = document.createElement("li");
    g.className = "dropdown-item";
    var h = document.createElement("div");
    h.className = "container",
    g.appendChild(h);
    var i = document.createElement("a");
    i.innerText = c,
    i.href = f,
    h.appendChild(i);
    var a = document.createElement("span");
    return a.innerText = e,
    a.className = "size right",
    i.insertBefore(a, i.firstChild),
    a = document.createElement("span"),
    a.innerText = d,
    a.className = "date right",
    i.insertBefore(a, i.firstChild),
    g
}
function _createClearAllRow() {
    var a = document.createElement("li");
    a.className = "dropdown-item clear-all";
    var b = document.createElement("div");
    b.className = "container",
    a.appendChild(b);
    var c = document.createElement("a");
    return c.href = "#",
    c.innerHTML = "\uD83D\uDDD1 <em>Clear all screen captures</em> \uD83D\uDDD1",
    Util.$.on(c, "click", function(a) {
        if (a.preventDefault(),
        confirm("Are you sure you want to delete all screen captures? (This action cannot be undone)")) {
            FSAPI.clearTempFiles(function(a, b) {
                var c = a.length + " file" + (1 === a.length ? "" : "s") + " successfully removed \uD83D\uDDD1";
                b.length && (c = c + "\n\n" + b.length + " file" + (1 === b.length ? "" : "s") + " could not be removed."),
                Util.$("btn-history").click(),
                setTimeout(function() {
                    showError("Clear all images", c)
                }, 50)
            }, function() {
                showError("Clear all images", "Error handling files.")
            }, function(a, b, c) {
                showError("Clear all images (" + b + " of " + c + ")")
            })
        }
    }),
    b.appendChild(c),
    a
}
function _createEmptyRow() {
    var a = document.createElement("li");
    return a.className = "dropdown-item info",
    a.innerHTML = "<div class=\"container\">\uD83D\uDE26 <em>No screen captures found.</em> \uD83D\uDE26</div>",
    a
}
function hideHistory() {
    Util.$("history").style.display = "none",
    Util.$("image").style.display = "",
    showImgButtons()
}
function showDeletedImg() {
    hideImgButtons();
    var a = Util.$("image");
    a.innerHTML = "",
    showHistoryPage()
}
function showImgButtons() {
    return PAGE_STATE.imgSrc ? void Util.$.findClass("img-btn").forEach(function(a) {
        a.style.display = "block"
    }) : void hideImgButtons()
}
function hideImgButtons() {
    Util.$.findClass("img-btn").forEach(function(a) {
        a.style.display = "none"
    })
}
function showHistoryPage() {
    FSAPI.withFs(function() {
        showError("Unable to access filesystem", "Something went wrong accessing the filesystem. Check your browser settings.", !0, !0)
    }, FSAPI.lookupFiles, function(a) {
        a = a.filter(function(a) {
            return a.isFile
        }),
        FSAPI.loadMetadata(a, function(a) {
            showHistory(a)
        })
    }, function() {
        showError("Error reading files", "Something went wrong reading your screen shots. Check your browser settings.", !0, !0)
    })
}
Util.$.on(Util.$("btn-trash"), "click", function(a) {
    function b() {
        showError("Error reading file", "Something went wrong reading your screen shot. Check your browser settings.", !0, !0)
    }
    a.preventDefault();
    var c = PAGE_STATE.fsPath;
    FSAPI.withFs(function() {
        showError("Unable to access filesystem", "Something went wrong accessing the filesystem. Check your browser settings.", !0, !0)
    }, function(a) {
        a.root.getFile(c, {
            create: !1
        }, function(a) {
            a.remove(function() {
                showDeletedImg()
            }, b)
        }, b)
    })
}),
Util.$.on(Util.$("btn-history"), "click", function(a) {
    a.preventDefault(),
    showHistoryPage()
}),
Util.$.on(document, "keydown", function(a) {
    if (83 === a.keyCode && (navigator.platform.match("Mac") ? a.metaKey : a.ctrlKey)) {
        var b = Util.$("btn-download")
          , c = window.getComputedStyle(b);
        "none" !== c.display && (a.preventDefault(),
        b.click())
    }
});
var qs = Util.getQueryString();
qs.src ? loadImage(FSAPI.imgPathBase + qs.src, setImage, function(a) {
    showError("Unable to load image", a)
}) : showHistoryPage();
