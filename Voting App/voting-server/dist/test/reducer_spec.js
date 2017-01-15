"use strict";

var _reducer = require("../src/reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _immutable = require("immutable");

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("reducer", function () {

    it("handles an undefined state", function () {
        var state = undefined;
        var action_Def = { type: "SET_ENTRIES", entries: ["12 Monkeys", "12 Angry Men"] };
        var handled = (0, _reducer2.default)(state, action_Def);
        (0, _chai.expect)(handled).to.equal((0, _immutable.Map)({
            entries: _immutable.List.of("12 Monkeys", "12 Angry Men")
        }));
    });

    it("handles the SET_ENTRIES action", function () {
        var state = (0, _immutable.Map)();
        var action_setEntries = { type: "SET_ENTRIES", entries: ["Spiderman", "Batman Begins"] };
        var handled = (0, _reducer2.default)(state, action_setEntries);

        (0, _chai.expect)(handled).to.equal((0, _immutable.Map)({
            entries: _immutable.List.of("Spiderman", "Batman Begins")
        }));
    });

    it("handles the next vote", function () {
        var state = (0, _immutable.Map)({
            entries: _immutable.List.of("Spiderman", "Batman Begins", "The Big Lebowski")
        });
        var action_Next = { type: "NEXT" };
        var handled = (0, _reducer2.default)(state, action_Next);

        (0, _chai.expect)(handled).to.equal((0, _immutable.Map)({
            entries: _immutable.List.of("The Big Lebowski"),
            vote: (0, _immutable.Map)({
                pair: _immutable.List.of("Spiderman", "Batman Begins")
            })
        }));
    });

    it("registers a vote", function () {
        var state = (0, _immutable.Map)({
            entries: _immutable.List.of("Training Day", "Fences"),
            vote: (0, _immutable.Map)({
                pair: _immutable.List.of("American Gangster", "Airplane"),
                tally: (0, _immutable.Map)({
                    "American Gangster": 7,
                    "Airplane": 5
                })
            })
        });

        var action_Vote = { type: "VOTE", entry: "American Gangster" };
        var handled = (0, _reducer2.default)(state, action_Vote);
        (0, _chai.expect)(handled).to.equal((0, _immutable.Map)({
            entries: _immutable.List.of("Training Day", "Fences"),
            vote: (0, _immutable.Map)({
                pair: _immutable.List.of("American Gangster", "Airplane"),
                tally: (0, _immutable.Map)({
                    "American Gangster": 8,
                    "Airplane": 5
                })
            })
        }));
    });
}); /**
     * Created by Owner on 1/9/2017.
     */
//# sourceMappingURL=reducer_spec.js.map