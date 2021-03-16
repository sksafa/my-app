import React, { useState, useEffect } from 'react';
import { processOrder,getDatabaseCart,removeFromDatabaseCart } from '../../utilities/databaseManager'
import fakeData from '../../fakeData/'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import happImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const history = useHistory()

    const handelProceedCheckOut =()=>{
        history.push('./Shipment')


    }
    


    const removeProduct = (productKey) =>{
        const newCArt = cart.filter(pd => pd.key !== productKey);
        setCart(newCArt);
        removeFromDatabaseCart(productKey)
        
    }

    useEffect(() => {
        //cart
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])
    
    let thankyou;
    if (orderPlace) {
        thankyou = <img src={ happImage } alt=""/>
    }


    return (
        <div className = "shop_container" >
           <div className="product_container">
           {
               cart.map(pd=>  <ReviewItem
                key ={pd.key}
                product ={pd}
                removeProduct={removeProduct}
                ></ReviewItem>)
                
           }
           { thankyou }
           </div>

            <div className="cart_container">
                <Cart cart={cart}> 
                   <button onClick={handelProceedCheckOut} className="main_button" >Proceed CheckOut</button> 
                </Cart>
                
            </div>
        </div>
        
    );
};

export default Review;