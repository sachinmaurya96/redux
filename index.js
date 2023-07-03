import { createStore, applyMiddleware ,combineReducers} from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk"

//history array
const history =[]
const init = "init";
const inc = "increment";
const dec = "decrement";
const incbym = "incrbyamount";

//store
const store = createStore(
    combineReducers({
        product:productreducer,
        discount:discountreducer
    }),
     applyMiddleware(logger.default,thunk.default));

//reducer
function productreducer(state = { amount: 0 }, action) {
  switch (action.type) {
    case inc:
      return { amount: state.amount + 1 };
      break;
    case dec:
      return { amount: state.amount - 1 };
      break;
    case incbym:
      return { amount: state.amount + action.payload };
      break;
    case init:
      return { amount:action.payload };
      break;
      default:
        return state;
  }
}

function discountreducer(state = { discount:0 }, action) {
    switch (action.type) {
      case incbym:
        if(action.payload>=100){
            return { discount: state.discount + 1 };
        }
    default:
          return state;
    }
  }



//global state
// store.subscribe(() => {
//   history.push(store.getState());
// });



//async api call 
// async function getProducts(){
//   const {data} = await axios.get("http://localhost:3000/products/1")
//   console.log(data)
// }
// getProducts()




//action creaters
function incrementbyamount(value) {
  return {
    type: incbym,
    payload: value,
  };
}

function increment(value) {
  return {
    type: inc,
  };
}

function decrement(value) {
  return {
    type: dec,
  };
}
 function getProducts(id){
    return async (dispatch,getState)=> {
        const {data} = await axios.get(`http://localhost:3000/products/${id}`)
      dispatch(initProducts(data.price))
    }
 }
 
function initProducts(value){
    return {
        type:init,
        payload:value
    }
}

//type
setTimeout(() => {
  store.dispatch(incrementbyamount(99));
},2000);
