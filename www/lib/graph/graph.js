/*
 * graph.js
 * Matthew Vasseur
 * 05/31/16
 *
 * a simple undirected graph to represent the office
 /*---------------------------------------------------------------------------*/

/**
 * Node Type Enumerations
 */
var NodeTypeEnum = {
    ERR: 0, // undefined node type (i.e., an error)
    EXIT: 1, // an exit (e.g., elevator, stairs)
    WALL: 2, // a wall (i.e., something that you cannot walk through)
    PATH: 3, // a walkway you could take (i.e., the floor)
    BROOM: 4, // a bathroom
    DESK: 5, // a desk, cubicle, or office
    CONF: 6, // a conference room

    // enumeration properties
    properties: {
        0: {
            name: "error",
            value: 0,
            code: "ERR"
        },
        1: {
            name: "exit",
            value: 1,
            code: "EXIT"
        },
        2: {
            name: "wall",
            value: 2,
            code: "WALL"
        },
        3: {
            name: "path",
            value: 3,
            code: "PATH"
        },
        4: {
            name: "bathroom",
            value: 4,
            code: "BROOM"
        },
        5: {
            name: "desk",
            value: 5,
            code: "DESK"
        },
        6: {
            name: "conference",
            value: 6,
            code: "CONF"
        },
        7: {
            name: "food_lounge",
            value: 7,
            code: "FOOD"
        }
    }
};

// Make NodeType immutable if possible
if (Object.freeze) Object.freeze(NodeTypeEnum);

/*var nTypeProp = function(val) {
    return NodeTypeEnum.properties[val];
};*/

