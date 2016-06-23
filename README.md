
[//]: # (ReadMe.md)

# Lincoln GPS Locator

A hybrid mobile application that serves as a GPS Employee Locator for Lincoln
Investment employees.

Built on the Cloud9 IDE in the Ionic/Cordova Framework

## Database Structure

There are two main tables: **Locations** and **Users**.

**Locations:** The locations table describes every *START* or *END* location on
the map (e.g., an employee's desk, or a conference room).

For each of these locations the following properties must be defined: **id**, **nType**,
and **name**

   * **id:** the id of the location (this should be the same as in the graph and SVG element)
   * **nType:** an enumeration describing the type of location (e.g., 5 = Desk, or 6 = Conference Room)
   * **name:** a descriptive name for the location (e.g., "West Wing Team Room", or "Matthew Vasseur")

   In addition to the above properties, employee locations (i.e., desks and offices)
must also define **division**, **title**, **email**, and **ext**

   * **division:** the employee's division (e.g., ISD)
   * **title:** the employee's professional title (e.g., Executive Director)
   * **email:** the employee's contact email
   * **ext:** the employee's phone contact extension

---

**Users:** The users table describes each user who has access to the application

For each of these users the following properties must be defined: **id**, **showMapPopup**,
and **filters**

   * **id:** the id of the user (this should be the same as created by Firebase Authentication)
   * **showMapPopup:** a boolean representing the user's preference on whether to show the "Select on Map" popup
   * **filters:** a JSON object representing each of the possible filters and the user's display preference for them

## Graph Structure

The underlying graph is a simple undirected graph made of node objects. The edges
of the graph are implicit in the node objects which describe neighbors.

Given this structure, a basic implementation of [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue)
(located at [`www/app/map/graph_lib/dijkstra.js`](www/app/map/graph_lib/dijkstra.js))
is used to find the shortest path between any two nodes.

**Node:** The node object describes a node in the graph

For each node object the following properties must be defined: **id**, **neighbors**,
**nType**, and **weight**

   * **id:** the id of the node (this should be the same as in the locations table and SVG element)
   * **neighbors:** an array of ids that are considered adjacent to the node (can traverse to and from)
   * **nType:** an enumeration describing the type of location (e.g., 3 = Path, 5 = Desk, or 6 = Conference Room)
   * **weight:** the weight of the node in Dijkstra's algorithm (path nodes are the only type with non-zero weight)

The graph is constructed from a JSON object described in [`www/lib/graph/graph.json`](www/lib/graph/graph.json)
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

## Ideas to Contribute

* Enable map zoom and pan
* Get directions from "my current location" (implement GPS locator)
* Give turn-by-turn directions (a la google maps)
* "Track" employees' location (via cellphone, key-fob, or desk-phone)
* Integrate employees' calendar to find location
* Integrate availability of conference rooms and employees (via phone system)
* Connect authentication to custom system through token
* Dynamic SVG map and graph creation
* Directions with detours/via points (e.g., from A to B to C)
* Optimize for mobile platform
* See [Trello](https://trello.com/b/H3dl9GEI/lincoln-gps-waze) for more ideas

## How to Contribute

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
6. Contribution will be reviewed


## Credits

Matthew Vasseur

David Tahvildaran
