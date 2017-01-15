"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INITIAL_STATE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Owner on 1/6/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.setEntries = setEntries;
exports.next = next;
exports.vote = vote;

var _immutable = require("immutable");

var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.Map)();

function setEntries(state, entries) {
    return state.set("entries", (0, _immutable.List)(entries));
}

function next(state) {
    var entries = state.get("entries").concat(getWinners(state.get("vote")));
    if (entries.size === 1) {
        return state.remove("entries").remove("vote").set("winner", entries.first());
    }

    var newState = state.merge({
        "vote": (0, _immutable.Map)({ "pair": entries.take(2) }),
        "entries": entries.skip(2)
    });

    console.log(newState);
    return newState;
}

function getWinners(vote) {
    if (!vote) return [];

    var _vote$get = vote.get("pair"),
        _vote$get2 = _slicedToArray(_vote$get, 2),
        a = _vote$get2[0],
        b = _vote$get2[1];

    var countA = vote.getIn(["tally", a], 0);
    var countB = vote.getIn(["tally", b], 0);
    return countB > countA ? b : countA === countB ? [a, b] : a;
}

function vote(state, vote) {
    return state.updateIn(["tally", vote], 0, function (value) {
        return value + 1;
    });
}
//# sourceMappingURL=core.js.map