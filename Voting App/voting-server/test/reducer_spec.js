/**
 * Created by Owner on 1/9/2017.
 */
import reducer from "../src/reducer";
import {Map,List} from "immutable";
import {expect} from "chai";

describe("reducer",()=>{

    it("handles an undefined state",()=>{
       const state = undefined;
       const action_Def = {type:"SET_ENTRIES",entries:["12 Monkeys","12 Angry Men"]};
       const handled = reducer(state,action_Def);
       expect(handled).to.equal(Map({
           entries:List.of("12 Monkeys","12 Angry Men")
       }));

    });

   it("handles the SET_ENTRIES action",()=>{
        const state = Map();
        const action_setEntries = {type:"SET_ENTRIES",entries:["Spiderman","Batman Begins"]};
        const handled = reducer(state,action_setEntries);

        expect(handled).to.equal(Map({
            entries:List.of("Spiderman","Batman Begins")
        }));
   });

   it("handles the next vote",()=>{
        const state = Map({
            entries:List.of("Spiderman","Batman Begins","The Big Lebowski")
        });
        const action_Next = {type:"NEXT"};
        const handled = reducer(state,action_Next);

        expect(handled).to.equal(Map({
            entries:List.of("The Big Lebowski"),
            vote:Map({
                pair:List.of("Spiderman","Batman Begins")
            })
        }));

   });

   it("registers a vote",()=>{
        const state = Map({
            entries:List.of("Training Day","Fences"),
            vote:Map({
                pair:List.of("American Gangster","Airplane"),
                tally:Map({
                    "American Gangster":7,
                    "Airplane":5
                })
            })
        });

        const action_Vote = {type:"VOTE",entry:"American Gangster"};
        const handled = reducer(state,action_Vote);
        expect(handled).to.equal(Map({
            entries:List.of("Training Day","Fences"),
            vote:Map({
                pair:List.of("American Gangster","Airplane"),
                tally:Map({
                    "American Gangster":8,
                    "Airplane":5
                })
            })
        }));

   });




});