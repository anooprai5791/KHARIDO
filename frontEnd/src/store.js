//store for redux
import {configureStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { newReviewReducer, productDetailsReducer, productReducer, newProductReducer, productsReducer,  reviewReducer, productReviewsReducer, } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveShippingInfo } from './actions/cartAction';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './reducers/orderReducer';

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
})   

let initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
};

const middleware = [thunk];

const store = configureStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
