import React from 'react';
import fakeData from '../../fakeData';


const Inventory = () => {
    const handelAddProduct =()=>{
        const product = {}
        fetch('https://vast-meadow-86282.herokuapp.com/addProduct',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(fakeData)

        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name</span><input type="text"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity</span><input type="text"/></p>
                <p><span>Upload Image</span><input type="file"/></p>
            <button onClick={handelAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Inventory;