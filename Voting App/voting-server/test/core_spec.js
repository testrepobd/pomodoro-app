/**
 * Created by Owner on 1/6/2017.
 */
import {expect} from 'chai';
import {List,Map} from 'immutable';

import {setEntries,next,vote} from '../src/core';

describe("app logic",()=> {
    describe("set entries", () => {
        it("adds a new entry to the most recent state", () => {
            const state = Map();
            const entries = ["Requiem for a Dream", "Gangs of NY"];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of("Requiem for a Dream", "Gangs of NY")
            }));
        });
    });

    describe("next state", () => {
        it("produces the next state with a voting pair from entries", () => {
            const state = Map({
                "entries": List.of("Sunshine", "The Dark Knight", "There Will Be Blood")
            });
            const votingState = next(state);
            expect(votingState).to.equal(Map({
                "entries": List.of("There Will Be Blood"),
                "vote": Map({"pair": List.of("Sunshine", "The Dark Knight")}),
            }));
        });

        it("it adds winner of vote back into entries", () => {
            const state = Map({
                "vote": Map({
                    "pair": List.of("The Wire", "Fargo"),
                    "tally": Map({
                        "The Wire": 4,
                        "Fargo": 2
                    })
                }),
                "entries": List.of("Nothing1", "Nothing2")
            });

            const win = next(state);
            expect(win).to.equal(Map({
                "vote": Map({
                    "pair": List.of("Nothing1", "Nothing2")
                }),
                "entries": List.of("The Wire")
            }));
        });

        it("adds the tied pair back into entries",()=>{
            const state = Map({
                "vote":Map({
                    "pair":List.of("Bourne Ultimatum","The Martian"),
                    "tally":Map({
                        "Bourne Ultimatum":3,
                        "The Martian":3
                    })
                }),
                "entries":List.of("Good Will Hunting","The Town","The Departed")
            });

            const tied = next(state);
            expect(tied).to.equal(Map({
                "entries":List.of("The Departed","Bourne Ultimatum","The Martian"),
                "vote":Map({
                    "pair":List.of("Good Will Hunting","The Town")
                })
            }));
        });

        it("ends voting and declares the winner when 1 entry is left",()=>{
           const state = Map({
               "vote":Map({
                   "pair":List.of("The One","Ong Bak"),
                   "tally":Map({
                       "The One":2,
                       "Ong Bak":4
                   })
               }),
               "entries":List.of()
           });
           const final = next(state);
           expect(final).to.equal(Map({
               "winner":"Ong Bak"
           }))
        });
    });

    describe("tally votes for a pair of entries", () => {
        it("creates the first vote for a vote pair", () => {
            const state = Map({"pair": List.of("King Kong", "No Country for Old Men")});
            const voteCast = vote(state, "No Country for Old Men");
            expect(voteCast).to.equal(Map({
                    "pair": List.of("King Kong", "No Country for Old Men"),
                    "tally": Map({
                        "No Country for Old Men": 1
                    })
            }));
        });

        it("adds a vote", () => {
            const state = Map({
                    "pair": List.of("The Wire", "Fargo"),
                    "tally": Map({
                        "The Wire": 4,
                        "Fargo": 2
                    })
            });

            const next = vote(state, "Fargo");
            expect(next).to.equal(Map({
                    "pair": List.of("The Wire", "Fargo"),
                    "tally": Map({
                        "The Wire": 4,
                        "Fargo": 3
                    })
            }));

        });
    });

});


