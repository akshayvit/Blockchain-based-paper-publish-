import { createStore } from "redux";
import reduceactionuser from "../reducers/reduceactionuser";

export default function configstore(state={verified:false,uname:"",location:"",role:"",email:""}) {
    return createStore(reduceactionuser,state);
}