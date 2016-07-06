/**
 * jquery.queued.js
 * A jQuery plugin to allow any function to be queued (default 'fx' queue only)
 * https://gist.github.com/raybellis/3816885
 */
(function($) {
    $.fn.queued = function() {
        var self = this;
        var func = arguments[0];
        var args = [].slice.call(arguments, 1);
        return this.queue(function() {
            $.fn[func].apply(self, args).dequeue();
        });
    };
}($));