/**
 * Created by Owner on 1/10/2017.
 */
import {Map, fromJS} from "immutable";
import {expect} from "chai";
import makeStore from "../src/store";

describe("store",()=>{
    it("makes a redux store with its given reducer",()=>{
       const store = makeStore();
       expect(store.getState()).to.equal(Map());

       store.dispatch({
           type:"SET_ENTRIES",
           entries:["Taxi","Apocalypse Now","Mulholland Drive"]
       });

       expect(store.getState()).to.equal(fromJS({
           entries:["Taxi","Apocalypse Now","Mulholland Drive"]
       }));

    });
});