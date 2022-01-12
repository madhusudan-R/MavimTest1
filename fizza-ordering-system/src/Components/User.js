import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './user.css'

function User() {

    const initialvalues = { username: "", email: "", password: ""};
    const [formvalues, setFormValues] = useState(initialvalues);
    const [formErrors, setFormErrors] = useState({})
    //const [data, setData] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    let navigate = useNavigate();

    const handelChange = (e) => {
        //console.log(e.target)
        const {name, value} =e.target;
        setFormValues({ ...formvalues, [name]: value});
        console.log(formvalues);
    }

    const handelNavigate = () => {
        navigate('/login')
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            userName: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        try{
            const res = await axios.post('http://localhost:8000/api/register', newUser)
            console.log(res);
            localStorage.setItem("user", res.data.userName);
            setIsSubmit(true);
        }catch(err){
            console.log(err)
        }
        setFormErrors(validate(formvalues));
    }


    useEffect(() => {
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formvalues)
            navigate('/orderlist')
        }
    },[formErrors, formvalues, isSubmit, navigate])

    const validate = (values) => {
        const errors = {}
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.edu\.[a-z]{2,3}');
        if (!values.username){
            errors.username = " User name is required!... ";
        }

        if (!values.email){
            errors.email = "Email is required!...";
        } else if (regex.test(values.email)){
            errors.email = "This is not a valid email format!"
        }

        if (!values.password){
            errors.password = "Password is required!... ";
        }else if(values.password.length < 4){
            errors.password = "Password Must be greater than 4 characters"
        } else if(values.password.length > 10){
            errors.password = "Password Must be less than 10 characters"
        }
        return errors;
        
    }

    return (
        <div>
            <section className='form my-4 mx-5'>
                <div className='container'>
                    <div className='row g-0'>
                        <div className='col-lg-5'>
                            <img src='/images/pizza.jpg' className="img-fluid" alt=''/>
                            <div className='title'>
                                <p className='name1'>𝓌𝑒𝓁𝒸𝑜𝓂𝑒</p>
                                <p className='name2'>𝒫𝒾𝓏𝓏𝒶 𝒽𝓊𝓉</p>
                            </div>
                            
                        </div>
                            <div className='col-lg-7 px-5 pt-5'>
                                <h2 className='font-weight-bold py-3'>User-Registration</h2>
                                <h4>Create an account to enjoy our services</h4>
                                <form className='' onSubmit={handelSubmit}>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type='text' 
                                            placeholder='User Name'
                                            name='username'
                                            ref={nameRef} 
                                            className='form-control mt-4' 
                                            value={ formvalues.username} 
                                            onChange={ handelChange }/>
                                        </div>
                                        <p>{formErrors.username}</p>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type='email' 
                                            placeholder='Email Address' 
                                            name='email'
                                            ref={emailRef}
                                            className='email form-control mt-4' 
                                            value={ formvalues.email} 
                                            onChange={ handelChange }/>
                                        </div>
                                        <p>{formErrors.email}</p>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type='password' 
                                            placeholder='password' 
                                            name='password'
                                            ref={passwordRef}
                                            className='pass form-control mt-4' 
                                            value={ formvalues.password} 
                                            onChange={ handelChange }/>
                                        </div>
                                        <p>{formErrors.password}</p>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <button type='submit' className='btn1 mt-3 mb-5 '> Register</button>
                                        </div>
                                    </div>
                                    <p>Alredy have an account <a href='#' onClick={handelNavigate}>Login here</a></p>
                                </form>
                            </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default User;
