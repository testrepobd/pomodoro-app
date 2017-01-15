/**
 * Created by Owner on 1/10/2017.
 */
import {createStore} from "redux";
import reducer from "./reducer";


export default function makeStore(){
    return createStore(reducer);
}