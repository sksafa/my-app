import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
//<FontAwesomeIcon icon={faShoppingCart} />
//import { Button } from 'react-bootstrap';
//<Button className="primary">test</Button>

const Product = (props) => {
    // console.log(props.product.name)
    const { img, name, seller, price, stock ,key} = props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product_name"><Link to ={"/product/"+key }>{name}</Link></h4>
                <br></br>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>Only {stock} left in stock - Order soon </p>
                 {props.showAddToCart &&
                      <button className="main_button" onClick={() =>props.productHandel(props.product)}
                      > Add to Cart</button> 
         

                 } 
                       
     
            </div>
        </div>
    );
};

export default Product;