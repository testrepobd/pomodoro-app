"use strict";

var _immutable = require("immutable");

var _chai = require("chai");

var _store = require("../src/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("store", function () {
    it("makes a redux store with its given reducer", function () {
        var store = (0, _store2.default)();
        (0, _chai.expect)(store.getState()).to.equal((0, _immutable.Map)());

        store.dispatch({
            type: "SET_ENTRIES",
            entries: ["Taxi", "Apocalypse Now", "Mulholland Drive"]
        });

        (0, _chai.expect)(store.getState()).to.equal((0, _immutable.fromJS)({
            entries: ["Taxi", "Apocalypse Now", "Mulholland Drive"]
        }));
    });
}); /**
     * Created by Owner on 1/10/2017.
     */
//# sourceMappingURL=store_spec.js.map