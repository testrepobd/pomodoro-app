"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _core = require("../src/core");

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _core.INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case "SET_ENTRIES":
            return (0, _core.setEntries)(state, action.entries);
        case "NEXT":
            return (0, _core.next)(state);
        case "VOTE":
            return state.update("vote", function (voteState) {
                return (0, _core.vote)(voteState, action.entry);
            });
        default:
            return state;
    }
} /**
   * Created by Owner on 1/9/2017.
   */
//# sourceMappingURL=reducer.js.map