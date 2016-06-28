/*
 * dijkstra.js
 * Matthew Vasseur
 * 06/01/16
 *
 * runs Dijkstra's shortest path algorithm on a graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('Dijkstra', Dijkstra);

    Dijkstra.$inject = ['MinHeap', 'NodeTypeEnum'];
    function Dijkstra(MinHeap, NodeTypeEnum) {
        var service = {
            prev: { // the previously run search (caching)
                s: null, // prev source
                t: null, // prev target
                r: {} // prev results
            },

            run: run,
            getPath: getPath
        };

        return service;

        //------------------------------------------------//

        /**
         * run: run Dijkstra's shortest path algorithm
         * returns an array of the shortest path from source to target, [] if one DNE
         * @source: the starting point for the path (a node ID)
         * @target: the ending point for the path (a node ID)
         * @graph: the graph on which to run algorithm`
         */
        function run(source, target, graph) {
            if (source === service.prev.s && target === service.prev.t) {
                service.prev.r.cached = true;
                return service.prev.r;
            } else {
                service.prev.r.cached = false;
                service.prev.s = source;
                service.prev.t = target;
            }

            // binary min heap of the unvisited nodes (on distance)
            var unvisited = new MinHeap(
                function(e) {
                    return e.distance;
                },
                function(e) {
                    return e._id;
                },
                'distance'
            );
            var dist = {}; // distance of the node from source
            var prev = {}; // previous node of the form 'node_id': 'prev_node_id'

            _assert(graph.nodes[source] !== undefined, 'Source does not exist (' +
                source + ')');
            _assert(graph.nodes[target] !== undefined, 'Target does not exist (' +
                target + ')');

            // Initialization
            dist[source] = 0; // source is distance 0 from source
            var keys = Object.keys(graph.nodes);
            // for (var i in keys) {
            for (var i = 0; i < keys.length; i++) {
                // for each node in the graph...
                var node = graph.nodes[keys[i]];

                if (node._id !== parseInt(source, 10)) {
                    prev[node._id] = null; // set previous to undefined
                    dist[node._id] = Infinity; // set distance to Infinity
                }
                // push node to unvisited with distance Infinity
                unvisited.push({
                    _id: node._id,
                    distance: dist[node._id]
                });
            }

            // return if source is the same as target (i.e., already there)
            if (source === target) {
                console.log('Same Spot');
                service.prev.r = {
                    dist: dist,
                    prev: prev
                };
                return service.prev.r;
            }

            return runAlgorithm();

            // Run the loop of the algorithm
            function runAlgorithm() {
                // while there are still unvisited nodes
                while (unvisited.size() > 0) {
                    var minNode = unvisited.pop(); // get minimum node dist and ID

                    // for each neighbor of minNode that is in the unvisited queue
                    for (i = 0; i < graph.nodes[minNode._id]._neighbors.length; i++) {
                        var n = graph.nodes[graph.nodes[minNode._id]._neighbors[i]];

                        // ensure node is in unvisited and it is a PATH
                        if (!unvisited.exists(n) || (n._nType !== NodeTypeEnum.PATH &&
                                n._id !== parseInt(target, 10))) {
                            continue;
                        }

                        // calculate alternative distance
                        var alt = minNode.distance + graph.edgeWeight(minNode._id, n._id);

                        // use this path instead, if alternative distance is shorter
                        if (alt < dist[n._id]) {
                            dist[n._id] = alt;
                            prev[n._id] = minNode._id;
                            unvisited.decreaseKey(n._id, alt); // update key
                        }
                    }
                }

                // return distances and previous (and cache)
                service.prev.r = {
                    dist: dist,
                    prev: prev
                };
                return service.prev.r;
            }
        }

        /**
         * getPath: gets the path given the previous array from Dijkstra's algorithm
         * @prev: the previous array generated by a run of Dijkstra's
         * @target: the end of the path
         */
        function getPath(prev, target) {
            var path = []; // the path to return
            var t = target;

            // add a block to path
            while (prev[t] !== undefined && prev[t] !== null) {
                path.unshift(t);
                t = prev[t];
            }
            // TODO: this is not how you do this
            path.unshift(t); // add the source to path

            return path;
        }
    }

    /*
     * assert: debugging function that throws an error if condition is true
     * @condition: condition to test for truth
     * @message: error message to display in failure
     */
    function _assert(condition, message) {
        if (!condition) {
            message = message || 'Assertion failed';
            if (typeof Error !== 'undefined') {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
})();