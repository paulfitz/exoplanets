Editor = function(jbox, result_callback, incomplete_callback) {
    box = jbox[0];
    this.pattern = 'YYYY.MM.DD';
    this.last_input = this.pattern;
    this.box = box;
    this.jbox = jbox;
    this.result_callback = result_callback;
    this.incomplete_callback = incomplete_callback;
    this.box.value = this.pattern;
    this.box.setSelectionRange(0, 0);
    var self = this;
    this.jbox.on('keydown', function(e) { return self.handle_keypress(e); });
    //this.jbox.on('input', function(e) { return self.handle_input(e); });
}

Editor.prototype.check = function (txt) {
    if (txt.indexOf('Y') + txt.indexOf('M') + txt.indexOf('D') == -3) {
        var date = txt.split('.');
        this.result_callback(date);
        this.box.blur();
    } else {
        this.incomplete_callback();
    }
}

Editor.prototype.handle_keypress = function (e) {
    var key = e.key;
    if (key.length == 1 || key == "Backspace" || key == "ArrowRight" || key == "Tab" || key == "Enter") {
        var x = this.box.selectionStart;
        var prev = this.box.value;
        var next = prev;
        if (key == 'Backspace') {
            x--;
            if (x<0) x = 0;
            if (prev[x] == '.') {
                x--;
            }
            next = prev.slice(0, x) + this.pattern.slice(x);
        } else {
            if (key == '.' || key == ' ' || key == '/' || key == "ArrowRight" || key == "Tab" || key == "Enter") {
                var end = prev.indexOf('.', x);
                var start = prev.lastIndexOf('.', x);
                if (end<0) end = prev.length;
                var txt = "";
                var prefix = prev.slice(0, start + 1);
                var zeros = Array(end - x + 1).join('0');
                var entered = prev.slice(start + 1, x);
                if (start == -1) {
                    var year = parseInt(zeros + entered);
                    if (year < 1000) {
                        if (year > 30) {
                            year += 1900;
                        } else {
                            year += 2000;
                        }
                    }
                    zeros = "";
                    entered = "" + year;
                }
                var remainder = prev.slice(end);
                prev = prefix + zeros + entered + remainder;
                key = '';
                next = prev;
                x = end;
            } else {
                if (key < '0' || key > '9') {
                    return false;
                }
            }
            if (x >= this.pattern.length) {
                // out of range
            } else {
                if (prev[x] == '.') {
                    x++;
                }
                if (key != '') {
                    next = prev.slice(0, x) + key + prev.slice(x + 1);
                    x++;
                }
                if (prev[x] == '.') {
                    x++;
                }
            }
        }
        this.box.value = next;
        this.box.setSelectionRange(x, x);
        this.check(next);
        return false;
    }
    return true;
}

Editor.prototype.handle_input = function (e) {
    var val = this.box.value;
    var things = val.split('.');
    things[0] = things[0].slice(0, 4);
    things[1] = things[1].slice(0, 2);
    things[2] = things[2].slice(0, 2);
    var result = things[0] + '.' + things[1] + '.' + things[2];
    if (result != val) {
        this.box.value = result;
    }
    var x = this.box.selectionStart;
    if (result.slice(x, x + 1) == '.') {
        x++;
        this.box.setSelectionRange(x, x);
    }
    return true;
}

Editor.prototype.setDate = function(y, m, d) {
    var txt = (('0000' + y).slice(-4) + '.' +
               ('00' + m).slice(-2) + '.' +
               ('00' + d).slice(-2));
    this.box.value = txt;
    this.check(txt);
}
