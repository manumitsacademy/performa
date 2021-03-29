import React from 'react';
import {useFormik} from 'formik'
import { Link,useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
const Login = (props) => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            username: '',
            password:''
        },
        onSubmit: values => {
            
            fetch(`http://localhost:3400/users`, {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then(data => {
                    var userdetails=data.filter((e)=>{
                    return e.username===values.username && e.password===values.password
                    })
                    if(userdetails.length===1){
                        props.dispatch({type:"UPDATEUSER",payload:userdetails})
                    }
                    history.push("/dashboard")
                })
              .catch((error) => {
                console.error('Error:', error);
              });
        },
      });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">UserName</label>
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
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Login</button>
                <Link to="/registration">Signup</Link>
            </form>
        </div>
    );
};

export default connect(store=>store)(Login);