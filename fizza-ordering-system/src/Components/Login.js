import axios from 'axios';
import './login.css'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const myStorage = window.localStorage;
    const initialvalues = { username: "", email: "", password: ""};
    const [formvalues, setFormValues] = useState(initialvalues);
    const [users, setUsers] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    
    const nameRef = useRef();
    const passwordRef = useRef();

    let navigate = useNavigate();

    const handelChange = (e) => {
        //console.log(e.target)
        const {name, value} =e.target;
        setFormValues({ ...formvalues, [name]: value});
        console.log(formvalues);
    }

    const handelSubmit = async (e) => {

        e.preventDefault();

        const newUser = {
            userName: nameRef.current.value,
            password: passwordRef.current.value
        }
        try{
            const result = await axios.post('http://localhost:8000/api/login', newUser)
            console.log(result);
            myStorage.setItem("user", result.data.userName)
            setIsSubmit(true);
        }catch(err){
           setUsers(true)
        }
        setFormErrors(validate(formvalues));
    }

    const handelNavigate = () => {
        navigate('/')
    }

    useEffect(() => {
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formvalues)
            navigate('/orderlist');
        }
    },[formErrors,formvalues,isSubmit,navigate])

    const validate = (values) => {
        const errors = {}
        
        if (!values.username){
            errors.username = " User name is required!... ";
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
                                <h2 className='font-weight-bold py-3'>Login</h2>
                                <h4>Login to enjoy our services</h4>
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
                                            <button type='submit' className='btn1 mt-3 mb-5 '>Login</button>
                                            {users && 
                                                <p className='text'>Invalid username and password!...</p>
                                            }
                                        </div>
                                    </div>
                                    <p>Don't have an account <a href='#' onClick={handelNavigate}>Register here</a></p>
                                </form>
                            </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Login
