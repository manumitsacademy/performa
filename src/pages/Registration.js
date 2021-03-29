import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
const Registration = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            username: '',
            password:'',
            email:'',
            phonenumber:''
        },
        onSubmit: values => {
            fetch(`http://localhost:3400/users`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            })
            .then(response => {
                if(response.statusText==='Created'){
                    alert("Your registration completed")
                    history.push("login")
                }
            })           
            .catch((error) => {
                console.error('Error:', error);
            });
        },
      });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                /><br></br>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />                <br></br>                
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                /><br></br>
                <label htmlFor="phonenumber">phonenumber</label>
                <input
                    id="phonenumber"
                    name="phonenumber"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phonenumber}
                /><br></br>
                              <br></br>  
                <button type="submit">Registration</button>
            </form>
        </div>
    );
};

export default Registration;