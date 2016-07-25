
[//]: # (ReadMe.md)

# Lincoln Employee Locator

A hybrid mobile application that serves as an Employee Locator for Lincoln
Investment employees.

Built on the Cloud9 IDE in the Ionic/Cordova Framework

Current Release: **1.2.0**

## Locations Database

The locations table describes all of the important objects
on the map (e.g., an employee's desk, a conference room, or a bathroom), ignoring paths.

This table is pulled from a JSON object defined in [`src/server/data/locations.json`](src/server/data/graph.json)
which gives each location a key of the form `loc[ID]`, where `[ID]` is the ID associated with that location.

   * For each of these locations, **id**, **nType**, and **name** must be defined
      * **id:** the id of the location (this should be the same as in the graph and SVG element)
      * **nType:** an enumeration for the type of location (e.g., 5 = Employee) (defined in [`core.constants.js`][constants])
      * **name:** a descriptive name for the location (e.g., "West Wing Team Room", or "Matthew Vasseur")
   * Additionally, employee locations (e.g., desks and offices) must also define **depCode**, **titleCode**, **email**, and **ext**
      * **depCode:** the code for the employee's department (e.g., isd) (defined in [`core.constants.js`][constants])
      * **titleCode:** the code for the employee's professional title (e.g., exec, vp) (defined in [`core.constants.js`][constants])
      * **email:** the employee's contact email
      * **ext:** the employee's phone contact extension
   * For example, the following describes an office with two employees and one bathroom:
   Both employees are interns in Information Services Division (`depCode: isd`)

   ```javascript
   {
       loc1: {
           id: 1,
           name: "Matthew Vasseur",
           nType: 5,
           depCode: "isd",
           titlecode: "int"
           email: "mvasseur@lincoln.com",
           ext: "4357"
       },
       loc2: {
           id: 2,
           name: "David Tahvildarna",
           nType: 5,
           depCode: "isd",
           titlecode: "int"
           email: "dtahvildaran@lincoln.com",
           ext: "4358"
       },
       loc3: {
           id: 3,
           nType: 4,
           name: "West Wing Men's Bathroom"
       }
   }
   ```

[constants]: ./src/client/app/core/core.constants.js

## Graph Structure

The underlying graph is created using the [graph-dijkstra][graph-dijkstra] library.
This library describes a simple undirected graph made of node objects where the edges
of the graph are implicit in the node objects which describe neighbors.

Given this structure, an implementation of [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue)
using a priority queue found in the same library is used to find the shortest path between any two nodes.

Any object on the map that can be traversed must be a node in the graph. This includes
all those objects in the locations table as well as all paths.

The graph is constructed from a JSON object defined in [`src/server/data/graph.json`](src/server/data/graph.json)
which describes the **nodes** and **edges** in the graph.

   * Nodes must have **id**, and can optionally specify **props**, an object with **weight**, **nType**, or **neighbors**
      * **id:** the id of the node (this should be the same as in the locations table and SVG element)
      * **nType:** an enumeration for the type of location (e.g., 3 = Path, 5 = Desk) (defined in [`core.constants.js`][constants])
      * **weight:** the weight of the node in Dijkstra's algorithm (only path nodes have non-zero weight)
      * **neighbors:** an array of ids that are considered adjacent to the node (can traverse to and from)
   * Edges should be an array of two element arrays of the IDs of the nodes on each end of the edge
   * For example, the following might describe a short hallway with offices on either end:
   from *Office 1* you must traverse two sectors of the hallway, the second being twice as long, to get to *Office 2*

   ```javascript
   {
       nodes: [
           { id: 1, props: { weight: 0, nType: 5 } }, // Office 1
           { id: 2, props: { weight: 0, nType: 5 } }, // Office 2
           { id: 3, props: { weight: 1, nType: 3 } }, // short path
           { id: 4, props: { weight: 2, nType: 3 } }  // long  path
       ],
       edges: [
           [1, 3],
           [3, 4],
           [4, 2]
       ]
   }
   ```

## SVG Map Structure

The map that is actually displayed is an SVG object defined in [`src/dynamic/map.svg`](src/dynamic/map.svg)
made of elements that correspond to nodes in the graph and organized via css classes.
For example, each node in the graph has the class `loc` each of the desks have the
class `desk` and each path has the class `path`.

In order to join the SVG Map the Graph and the Locations Table, the **id** corresponding
to a specific element/node/location must be the same. That is to say, if the conference
room "West Wing Team Room" has an id of 10 on its SVG Map element, the corresponding node
in the graph with id 10 as well as the location with id 10 in the locations table
must represent it.

This requirement creates a dynamic binding between the displayed map, the underlying
graph, and the locations table enabling the user to traverse the graph for the shortest
path between two locations and then display it on the map, as well as search and filter
through locations in order to see them on the map.

For example, the following SVG Map of 4 rectangles might represent the above graph:

```html
<svg>
    <rect id="1" class="loc desk" x="00" y="0" width="10" height="10">
    <rect id="3" class="loc path" x="10" y="0" width="10" height="10">
    <rect id="4" class="loc path" x="20" y="0" width="10" height="10">
    <rect id="2" class="loc desk" x="30" y="0" width="10" height="10">
</svg>
```

_Note:_ In cases where two entities (i.e., separate locations in the table) must
occupy the same SVG location, add a **data-id** attribute to the element which
serves as a space delimited array of all location IDs that should reside at that element.

## Authentication

Authentication is done through [firebase](https://firebase.google.com/).

To give users access to the application, you must create a new firebase project
and replace the credentials located in [firebase.js](src/client/app/core/firebase.js)
with your own. Then you can manage users in the **Auth** tab of the firebase console.

---

Local Storage (via **ngStorage**) stores the user's preferences. i.e., which map
filters are active and whether to show the select on map popup.

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

## Adapting

All of the files that must be changed in order to adapt this application to your
own office layout and directory are located in [`src/office`](src/office). By editing
these files you can customize and adapt the application to suite your personal office needs.

### `constants.js`

Here is where you should define the Node Types, Departments, Titles, Filters, and
URLs for the graph and locations json files.

* `NODE_TYPES`: enumerations for the possible nodes in the graph, 0 should always be `ERR`
* `DEPARTMENTS`: list of employee and utility (non-employee) departments in the office.
Each department should have a **depCode** and **name**. A department's `depCode`
is the name of the CSS class associated with it. Department's listed under `UTILITIES`
will not show on the Directory page
* `TITLES`: list of titles for employees. Each title should have a **titleCode**
and **name**
* `FILTERS`: list of classes by which you can filter the office map. Each filter
should have a **dispName** and boolean **disp**. The filter's key is the name of the
CSS class it should filter out of the map (e.g., `desk`)
* `GRAPH_URL`: url to the location of the json file that initializes the graph
* `LOC_URL`: url to the location of the json file (or api) that serves as the location database
   * Notice that you may simply edit `graph.json` or `location.json` in [`src/server/data`](src/server/data)
   if you are using a static, flat database (as in our example implementation)

### `map.svg`

The SVG Map of the office layout. This should follow the structure described in
[SVG Map Structure](#SVG-Map-Structure). When updating the map, leave the header, definitions,
and legend, which will update according to `DEPARTMENTS`. Change the office layout
located below `Line 80`, demarcated `UPDATE MAP BELOW LINE`.

The elements of your map should adhere to these properties:
* Element that corresponds to a node in the graph should have the class `loc`
* Element that corresponds to a walkable path should have the class `path`
* Each element should have `id` equal to the id of its corresponding node in the graph
* Elements should also have any classes that correspond to its node type (from `NODE_TYPES`), department
(from `DEPARTMENTS`) or its filters (from `FILTERS`)
* If an element corresponds to two locations, set its `id` to the main location
(the one that should display when clicked on the map) and add a `data-id` attribute
with all other ids. e.g. `id="237" data-id="237 327"`

### `map.scss`

Customize your map's styling. By default each department should be given its own
fill color. Path highlighting and other styling is separate (located in [`/src/client/content/styles/map.scss`](/src/client/content/styles/map.scss)
and does not need to be updated.

### `images/map-icons`

Place any icons used in your map here.

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
* 07/14/16: Transferred graphing library to separate module ([graph-dijkstra])
* 07/19/16: Adapted graphing modules and modularized map functions
* 07/25/16: Separated dynamic, application-specific modules from source

## Credits

**Authors:** Matthew Vasseur and David Tahvildaran

**Library Resources**
   * [Graph Dijkstra][graph-dijkstra]
   * [SVG Pan Zoom ](https://github.com/ariutta/svg-pan-zoom)

[graph-dijkstra]: https://github.com/LincolnTechOpenSource/graph-dijkstra

**Adapted Resources:**
   * [jQuery Queued](https://gist.github.com/raybellis/3816885)
   * [Ionic Gulp Generator](https://github.com/tmaximini/generator-ionic-gulp)

## License

See the [LICENSE file](LICENSE) for license rights and limitations (MIT).
