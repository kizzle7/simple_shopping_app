
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {ShopMain} from './pages/index';
import {Checkout} from './pages/checkout'
import {CartSingle} from './pages/cart-single'
import Cart from './pages/cart'
import {Provider } from 'react-redux'
import store from './store'
export const shoppingCartRoute  = () => {
        return(
            <Provider store= {store}>
                 <Router>
                    <Switch>
                        <Route path="/" exact component={ShopMain} />
                        <Route path="/checkout" exact component={Checkout} />
                        <Route  path="/cart-single/:id" exact component={CartSingle} />
                        <Route  path="/cart/:id?" exact component={Cart} />



                    </Switch>
                </Router>
            </Provider>
               
        )
    }


