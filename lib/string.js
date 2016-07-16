

function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

/**
 * @param {string} s
 * @return {boolean}
 */
var is_number = function(s) {
    return !isNaN(Number(s)) && s !== ' ';
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var get_sum = function(a, b) {
    var c;
    while (b !== 0) {
        c = a & b;
        a ^= b;
        b = c << 1;
    }
    return a;
};