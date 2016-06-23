/*
 * min_heap.js
 * adapted from https://github.com/rombdn/js-binaryheap-decreasekey
 * 06/01/16
 *
=================================
js-binaryheap-decreasekey - v0.1
https://github.com/rombdn/js-binaryheap-decreasekey

Based on a Binary Heap implementation found in the book
Eloquent Javascript by Marijn Haverbeke
http://eloquentjavascript.net/appendix2.html

(c) 2013 Romain BEAUDON
This code may be freely distributed under the MIT License
=================================
/*----------------------------------------------------------------------------*/

(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('MinHeap', MinHeap);

    // MinHeap.$inject = [];
    function MinHeap() {

        var BinaryHeap = function(scoreFunction, idFunction, valueProp) {
            this.content = [];
            this.scoreFunction = scoreFunction;
            this.idFunction = idFunction;
            this.valueProp = valueProp;
            this.map = {};
        };

        BinaryHeap.prototype = {
            size: size,
            exists: exists,
            push: push,
            pop: pop,
            bubbleUp: bubbleUp,
            sinkDown: sinkDown,
            decreaseKey: decreaseKey
        };

        return BinaryHeap;

        //------------------------------------------------//

        function size() {
            return this.content.length;
        }

        function exists(elt) {
            return this.map[this.idFunction(elt)] !== undefined;
        }

        function push(elt) {
            if (this.map[this.idFunction(elt)] !== undefined) {
                throw 'Error: id "' + this.idFunction(elt) + '" already present in heap';
            }

            this.content.push(elt);
            this.bubbleUp(this.content.length - 1);
            //var index = this.bubbleUp(this.content.length - 1);
            //this.map[this.idFunction(elt)] = index;
        }

        function pop() {
            var result = this.content[0];
            var end = this.content.pop();

            delete this.map[this.idFunction(result)];

            if (this.content.length > 0) {
                this.content[0] = end;
                this.map[this.idFunction(end)] = 0;
                this.sinkDown(0);
                //var index = this.sinkDown(0);
                //this.map[this.idFunction(end)] = index;
            }

            return result;
        }

        function bubbleUp(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (n > 0) {
                var parentN = Math.floor((n - 1) / 2);
                var parent = this.content[parentN];

                if (this.scoreFunction(parent) < score)
                    break;

                this.map[this.idFunction(element)] = parentN;
                this.map[this.idFunction(parent)] = n;

                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        }

        function sinkDown(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (true) {
                var child2N = (n + 1) * 2;
                var child1N = child2N - 1;
                var swap = null;
                if (child1N < this.content.length) {
                    var child1 = this.content[child1N];
                    var child1score = this.scoreFunction(child1);
                    if (score > child1score) {
                        swap = child1N;
                    }
                }

                if (child2N < this.content.length) {
                    var child2 = this.content[child2N];
                    var child2score = this.scoreFunction(child2);
                    if ((swap == null ? score : child1score) > child2score) {
                        swap = child2N;
                    }
                }

                if (swap == null) break;

                this.map[this.idFunction(this.content[swap])] = n;
                this.map[this.idFunction(element)] = swap;

                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        }

        function decreaseKey(id, value) {
            var n = this.map[id];
            this.content[n][this.valueProp] = value;
            this.bubbleUp(n);
        }
    }
})();