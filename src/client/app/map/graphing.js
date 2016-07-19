// graphing.js
(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('Graphing', Graphing);

    /**
     * Graphing: angular service for the Graph and Dijkstra's algorithm
     * @graph stores a created graph (enables use between controllers)
     * @cache stores the results of the previous call to runDijkstra
     * @createGraph creates a new graph given the url to a json
     * @runDijkstra runs dijkstra's algorithm
     * @getShortestPath finds the shortest path for the previous run of dijkstra's
     * @clearCache clears the cache
     */
    /* @ngInject */
    function Graphing($http) {
        var service = {
            graph: null,
            // the previously run search (for caching)
            cache: {
                cached: false
            },

            createGraph: createGraph,
            runDijkstra: runDijkstra,
            getShortestPath: getShortestPath,
            clearCache: clearCache
        };

        return service;

        //------------------------------------------------//

        /* global Graph, Dijkstra */
        function createGraph(url) {
            // use http to get the graph json
            return $http.get(url)
                .success(function(data) {
                    // create the new graph
                    service.graph = new Graph(data);

                    return service.graph;
                })
                .error(function(error) {
                    console.error(error || 'Request failed');
                });
        }

        function runDijkstra(pathType, source, target) {
            // caching should be done by the wrapper
            if (source === service.cache.source && target === service.cache.target) {
                service.cache.cached = true;
                return service.cache;
            } else {
                service.cache.source = source;
                service.cache.target = target;
            }

            var results = Dijkstra.run(service.graph, pathType, source, target);

            // cache results (cache.cached is implicitly false)
            service.cache = results;
            return results;
        }

        function getShortestPath() {
            return Dijkstra.getPath(service.cache.prev, service.cache.target);
        }

        function clearCache() {
            service.cache = {
                cached: false
            };
        }
    }
})();