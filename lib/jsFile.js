/**
 * Created by jiangbs on 16/7/20.
 */
function myload() {
    var script = document.createElement("script");
    script.src = "http://121.10.242.185:88/analysis.js?d=yuncai.com&_t"+new Date().getTime();
    document.getElementsByTagName("body")[0].appendChild(script);
    var list = window.frames["show"].document.getElementsByTagName('h1');
    for (var i in list) {
        var e = list[i];
        var p = e.parentNode;
        if (p) p.removeChild(e);
    }
}

function JSFile() {}
JSFile.prototype = {
    busy: false,
    list: [],
    check: function() {
        if (this.busy || this.list.length <= 0) return;
        this.busy = true;
        var obj = this;
        var data = this.list.shift();
        $.get("/getjs.php?url=" + encodeURIComponent(data.url), function(text) {
            data.cbk(text);
            obj.busy = false;
            obj.check();
        });
    },
    get: function(url, cbk) {
        this.list.push({url:url, cbk:cbk});
        this.check();
    }
}

function global_eval(str) {
    if (window.exeScript) {
        window.exeScript(str);
    } else {
        window.eval(str);
    }
}

g_jsfile = new JSFile();

function extract_script(str) {
    var url = str.match(/src="([^"]*)"/)[1];
    g_jsfile.get(url, function(text) {
        global_eval(text.replace(/<h1 class="title">.*<\/h1>/ig, ''));
    });
}

g_jsfile.get('http://www.qq.com/404/search_children.js', function(text) {
    global_eval(text.replace(/document\.write/g, 'extract_script'));
});
