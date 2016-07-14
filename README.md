
[//]: # (ReadMe.md)

# Lincoln Employee Locator

A hybrid mobile application that serves as an Employee Locator for Lincoln
Investment employees.

Built on the Cloud9 IDE in the Ionic/Cordova Framework

Current Release: **1.1.0**

## Database Structure

There is one main table: **Locations** (_**Users** table removed commit [[master b5c6de1]](https://github.com/LincolnTechOpenSource/lincoln-gps/commit/b5c6de161b5de50991142f6dfa0ea39b120f368b)_)

**Locations:** The locations table describes every *START* or *END* location on
the map (e.g., an employee's desk, or a conference room).

For each of these locations the following properties must be defined: **id**, **nType**,
and **name**

   * **id:** the id of the location (this should be the same as in the graph and SVG element)
   * **nType:** an enumeration describing the type of location (e.g., 5 = Desk, or 6 = Conference Room)
   * **name:** a descriptive name for the location (e.g., "West Wing Team Room", or "Matthew Vasseur")

   In addition to the above properties, employee locations (i.e., desks and offices)
must also define **division**, **title**, **email**, and **ext**

   * **depCode:** the code for the employee's department (e.g., isd)
   * **titleCode:** the code for the employee's professional title (e.g., exec, vp)
   * **email:** the employee's contact email
   * **ext:** the employee's phone contact extension

---

Local Storage (via **ngStorage**) stores the user's preferences. i.e., which map
filters are active and whether to show the select on map popup.

## Graph Structure

The underlying graph is a simple undirected graph made of node objects. The edges
of the graph are implicit in the node objects which describe neighbors.

Given this structure, a basic implementation of [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue)
(located at [`src/client/app/map/graph_lib/dijkstra.js`](src/client/app/map/graph_lib/dijkstra.js))
is used to find the shortest path between any two nodes.

**Node:** The node object describes a node in the graph

For each node object the following properties must be defined: **id**, **neighbors**,
**nType**, and **weight**

   * **id:** the id of the node (this should be the same as in the locations table and SVG element)
   * **neighbors:** an array of ids that are considered adjacent to the node (can traverse to and from)
   * **nType:** an enumeration describing the type of location (e.g., 3 = Path, 5 = Desk, or 6 = Conference Room)
   * **weight:** the weight of the node in Dijkstra's algorithm (path nodes are the only type with non-zero weight)

The graph is constructed from a JSON object described in [`src/server/data/graph.json`](src/server/data/graph.json)
which describes the **nodes** (**id**, **neighbors**, **weight**, **nType**), as well the total number of nodes
and edges (**nodeCount** and **edgeCount**, respectively).

## SVG Map Structure

The map that is actually displayed is an SVG object made of elements that correspond
to nodes in the graph and organized via css classes. For example, each node in the graph
has the class `loc`; each of the desks have the class `desk`; each path has the class
`path`.

In order to join the SVG Map the Graph and the Locations Table, the **id** corresponding
to a specific element/node/location must be the same. That is to say, if the conference
room "West Wing Team Room" has an id of 10 on its SVG Map element, the corresponding node
in the graph with id 10 as well as the location with id 10 in the locations table
must represent it.

This requirement creates a dynamic binding between the displayed map, the underlying
graph, and the locations table, enabling the user to traverse the graph for the shortest
path between two locations and then display it on map, as well as search and filter
through locations in order to see them on the map.

_Note:_ In cases where two entities (i.e., separate locations in the table) must
occupy the same SVG location, add a **data-id** attribute to the element which
serves as a space delimited array of all location IDs that should reside at that element.

## Authentication

Authentication is done through [firebase](https://firebase.google.com/).

To allow users access to the application, you must create a new firebase project
and replace the credentials located in [firebase.js](src/client/app/core/firebase.js)
with your own. Then you can manage users in the **Auth** tab of the firebase console.

## History

* 06/01/16: Added graph library to default ionic template
* 06/02/16: Initialized GitHub repository, integrated map, and started directory
* 06/03/16: Work on directory and "Find on Map"
* 06/05/16: Bug fixed by disabling map cache
* 06/06/16: Favicon added, improved SVG map, and various other updates
* 06/07/16: Firebase connectivity, switching to tab template
* 06/08/16: Progress on map, tab template switch, general cleaning of code
* 06/09/16: Nearly finished with map, authentication, started filtering
* 06/10/16: Finished SVG map
* 06/13/16: From/To directions, map legend, and department highlighting
* 06/14/16: Map Legend & Two-way Departmental Highlight, Select On Map Feature
* 06/15/16: Major code remastering, bug fixes, preparation for graph.json
* 06/16/16: Map and legend smoothing, preparing graph.json
* 06/17/16: Created the new graph.json
* 06/20/16: Made code more robust according to John Papa's angular style guide
* 06/21/16: SVG Icons, "real" employee data, more robust code
* 06/22/16: Made code and map more robust
* 06/23/16: Looking into SVG Panning and Zooming, specifically for mobile
* 06/27/16: Integrated Gulp as well as SVG Pan/Zoom
* 06/28/16: Updated paths on SVG; mobile pinch to zoom; added minor features
* 06/30/16: Major path updates; Directory search filters; more robust deparment constant
* 07/06/16: Stabilizing/Freezing additional functionality; Bug fixes; Removing
dependence on firebase, shifting prefences to local storage, and data to an internal
json file
* 07/08/16: Stabilized most functionality
* 07/14/16: Transferred graphing library to separate module ([angular-graph-dijkstra])


[angular-graph-dijkstra]: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md


## Building

1. Installing Ionic and Cordova CLI
   * `npm install -g ionic cordova`
2. Installing Gulp
   * This doc assumes gulp is installed globally
   * `npm install -g gulp`
3. Installing Packages
   * `npm install`
4. Building with Gulp
   * Run `gulp` to start the development build process
      * Compiling, concatenating, auto-prefixing `.scss` files required by [src/client/content/styles/main.scss](src/client/content/styles/main.scss)
      * Creating `vendor.js` from front-end `npm modules` and `plugins`
      * Linting all `*.js` files, analyzing the source files with `plato`
      * Injecting sources into `index.html`
      * Building everything into `.dev`
      * Starting the local server to serve from `.dev`
      * Starting watchers to automatically rebuild upon saved changes
   * The `--noAnalyze` flag (`--na`) is the same as above, but does not analyze (making recompile faster)
   * The `--build` flag (`-b`) starts the non-development build process
      * In addition to the above: Concats all `*.js` sources into a single `app.js` file
      * Versions `main.css` and `app.js`
      * Builds everything into `www`
   * The `--release` flag removes debug messages (e.g. `console.log`)
   * [gulp.config.json](gulp.config.json) defines the necessary paths in [gulpfile.js](gulpfile.js)

## Ideas to Contribute


* [x] ~~Enable map zoom and pan~~
* [x] ~~Mobile pinch to zoom~~
* [x] ~~Move from using both Bower and NPM to only NPM~~
* [ ] Get directions from "my current location" (implement GPS locator)
* [ ] Give turn-by-turn directions (a la google maps)
* [ ] "Track" employees' location (via cellphone, key-fob, or desk-phone)
* [ ] Integrate employees' calendar to find location
* [ ] Integrate availability of conference rooms and employees (via phone system)
* [ ] Connect authentication to custom system through token
* [ ] Dynamic SVG map and graph creation
* [ ] Directions with detours/via points (e.g., from A to B to C)
* [ ] Add custom tags/notes to locations
* [ ] See [Trello](https://trello.com/b/H3dl9GEI/lincoln-gps-waze) for more ideas

## How to Contribute

Please see [CONTRIBUTING.md](CONTRIBUTING.md).


## Credits

**Authors:** Matthew Vasseur and David Tahvildaran

**Library Resources**
   * [Angular Graph Dijkstra](https://github.com/LincolnTechOpenSource/angular-graph-dijkstra)
   * [SVG Pan Zoom ](https://github.com/ariutta/svg-pan-zoom)

**Adapted Resources:**
   * [jQuery Queued](https://gist.github.com/raybellis/3816885)
   * [Ionic Gulp Generator](https://github.com/tmaximini/generator-ionic-gulp)

## License

See the [LICENSE file](LICENSE) for license rights and limitations (MIT).
