'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

var _core = require('../src/core');

describe("app logic", function () {
    describe("set entries", function () {
        it("adds a new entry to the most recent state", function () {
            var state = (0, _immutable.Map)();
            var entries = ["Requiem for a Dream", "Gangs of NY"];
            var nextState = (0, _core.setEntries)(state, entries);
            (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
                entries: _immutable.List.of("Requiem for a Dream", "Gangs of NY")
            }));
        });
    });

    describe("next state", function () {
        it("produces the next state with a voting pair from entries", function () {
            var state = (0, _immutable.Map)({
                "entries": _immutable.List.of("Sunshine", "The Dark Knight", "There Will Be Blood")
            });
            var votingState = (0, _core.next)(state);
            (0, _chai.expect)(votingState).to.equal((0, _immutable.Map)({
                "entries": _immutable.List.of("There Will Be Blood"),
                "vote": (0, _immutable.Map)({ "pair": _immutable.List.of("Sunshine", "The Dark Knight") })
            }));
        });

        it("it adds winner of vote back into entries", function () {
            var state = (0, _immutable.Map)({
                "vote": (0, _immutable.Map)({
                    "pair": _immutable.List.of("The Wire", "Fargo"),
                    "tally": (0, _immutable.Map)({
                        "The Wire": 4,
                        "Fargo": 2
                    })
                }),
                "entries": _immutable.List.of("Nothing1", "Nothing2")
            });

            var win = (0, _core.next)(state);
            (0, _chai.expect)(win).to.equal((0, _immutable.Map)({
                "vote": (0, _immutable.Map)({
                    "pair": _immutable.List.of("Nothing1", "Nothing2")
                }),
                "entries": _immutable.List.of("The Wire")
            }));
        });

        it("adds the tied pair back into entries", function () {
            var state = (0, _immutable.Map)({
                "vote": (0, _immutable.Map)({
                    "pair": _immutable.List.of("Bourne Ultimatum", "The Martian"),
                    "tally": (0, _immutable.Map)({
                        "Bourne Ultimatum": 3,
                        "The Martian": 3
                    })
                }),
                "entries": _immutable.List.of("Good Will Hunting", "The Town", "The Departed")
            });

            var tied = (0, _core.next)(state);
            (0, _chai.expect)(tied).to.equal((0, _immutable.Map)({
                "entries": _immutable.List.of("The Departed", "Bourne Ultimatum", "The Martian"),
                "vote": (0, _immutable.Map)({
                    "pair": _immutable.List.of("Good Will Hunting", "The Town")
                })
            }));
        });

        it("ends voting and declares the winner when 1 entry is left", function () {
            var state = (0, _immutable.Map)({
                "vote": (0, _immutable.Map)({
                    "pair": _immutable.List.of("The One", "Ong Bak"),
                    "tally": (0, _immutable.Map)({
                        "The One": 2,
                        "Ong Bak": 4
                    })
                }),
                "entries": _immutable.List.of()
            });
            var final = (0, _core.next)(state);
            (0, _chai.expect)(final).to.equal((0, _immutable.Map)({
                "winner": "Ong Bak"
            }));
        });
    });

    describe("tally votes for a pair of entries", function () {
        it("creates the first vote for a vote pair", function () {
            var state = (0, _immutable.Map)({ "pair": _immutable.List.of("King Kong", "No Country for Old Men") });
            var voteCast = (0, _core.vote)(state, "No Country for Old Men");
            (0, _chai.expect)(voteCast).to.equal((0, _immutable.Map)({
                "pair": _immutable.List.of("King Kong", "No Country for Old Men"),
                "tally": (0, _immutable.Map)({
                    "No Country for Old Men": 1
                })
            }));
        });

        it("adds a vote", function () {
            var state = (0, _immutable.Map)({
                "pair": _immutable.List.of("The Wire", "Fargo"),
                "tally": (0, _immutable.Map)({
                    "The Wire": 4,
                    "Fargo": 2
                })
            });

            var next = (0, _core.vote)(state, "Fargo");
            (0, _chai.expect)(next).to.equal((0, _immutable.Map)({
                "pair": _immutable.List.of("The Wire", "Fargo"),
                "tally": (0, _immutable.Map)({
                    "The Wire": 4,
                    "Fargo": 3
                })
            }));
        });
    });
}); /**
     * Created by Owner on 1/6/2017.
     */
//# sourceMappingURL=core_spec.js.map