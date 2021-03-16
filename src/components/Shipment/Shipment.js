import React from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css'


const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [ userLogin,setLoginUser ] = useContext(UserContext)
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); 
    return (
     
      <form className="shipForm" onSubmit={handleSubmit(onSubmit)}>
        <input name="name"  defaultValue={userLogin.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error" >Name is required</span>}

        <input name="email" defaultValue={userLogin.email} ref={register({ required: true })} placeholder="Your email" />
        {errors.email && <span className="error" >email is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Your address" />
        {errors.address && <span className="error" >address is required</span>}

        <input name="phone" ref={register({ required: true })}placeholder="Your phone number" />
        {errors.phone && <span className="error" >phone number is required</span>}




        <input type="submit" />
      </form>
    );
};

export default Shipment;