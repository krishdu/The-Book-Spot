import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;
//console.log(process.env.REACT_APP_CART_URL);
function App() {
    const isCartOpen = useSelector(state => state.ui.isCartOpen);
    const notification = useSelector(state => state.ui.notification);

    const cart  = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCartData());
    }, [dispatch]);


    useEffect(() => {

      if(isInitial){
        isInitial = false;
        return;
      }

      if(cart.changed){
        dispatch(sendCartData(cart));
      }

    }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && 
      <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
      />}
      <Layout>
        { isCartOpen && <Cart /> }
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
