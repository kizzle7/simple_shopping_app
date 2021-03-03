import {createStore, applyMiddleware} from 'redux';
import Cookie from 'js-cookie'
import rootReducer from './redux/reducer/index'
import thunk from 'redux-thunk';
const cartItems =  Cookie.getJSON('cartItems') ? Cookie.getJSON('cartItems') : [];
const middleware = [thunk];
const initialState = {cart: {cartItems}};
const store = createStore(rootReducer,initialState, applyMiddleware(...middleware));
export default store;