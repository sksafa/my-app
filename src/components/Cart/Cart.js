import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } else if (total > 5) {
        shipping = 4.99;
    } else {
        shipping = 0;
    }
    
    let tax = total /10; 

    function formate(value) {
        const formateValue = value.toFixed(2);
        return Number(formateValue);
    }

    const grandTotal = total + shipping + tax




    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items {cart.length}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>10% Tax: {formate(tax)}</p>
            <p>Total Price: {formate(grandTotal)} </p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;