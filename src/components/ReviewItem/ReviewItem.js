import React from 'react';
import   './ReviewItem.css'

const ReviewItem = (props) => {
    
    console.log(props.key)
    const {name,quantity,key,price} = props.product;
    return (
        <div className = "review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity} </p>
            <p>price: ${price} </p>
            <button className="main_button" onClick={()=>props.removeProduct(key)} >Remove</button>
        </div>
    );
};

export default ReviewItem;