import React,{useState,useEffect} from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart ,getDatabaseCart} from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './shop.css'
import { Link } from 'react-router-dom'


const Shop = () => {   
    const first10 = fakeData.slice(0,10);
    const [products,setProduct] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingkey => {
            const product = fakeData.find(pd=> pd.key === existingkey)
            product.quantity = saveCart[existingkey];
            return product;

        })

        setCart(previousCart);
       
    }, [])

    const productHandel = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=> pd.key === toBeAddedKey);
        let count = 1;
        let newCart ;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantityn = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey );
            newCart =[...others,sameProduct];

        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);

    }
    return (
        <div className="shop_container">
            <div className="product_container">
            {
                products.map(productItem =><Product
                   key ={productItem.key}
                    showAddToCart={true}
                     product={productItem} 
                     productHandel ={productHandel} 
                     
                     ></Product>)
            }
            </div>
            <div className="cart_container">
               <Cart cart={cart} >
               <Link to="/review">
                  <button className="main_button" > Review Summary</button> 
                </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;