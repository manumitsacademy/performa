import React from "react";
import { useFormik } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
const Login = (props) => {
	let history = useHistory();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: (values) => {
			fetch(`http://localhost:3400/users`, {
				method: "GET", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					var userdetails = data.filter((e) => {
						return e.username === values.username && e.password === values.password;
					});
					if (userdetails.length === 1) {
						props.dispatch({ type: "UPDATEUSER", payload: userdetails[0] });
					}
					history.push("/dashboard");
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
		validate: values => {

			const errors = {};

			if (!values.username) {
				errors.username = "Username cannot be empty";
			}

			if (!values.password) {
				errors.password = "Password cannot be empty";
			}

			return errors;

		}
	});
	console.log(formik.errors);
	return props.user.username ? (
		<Redirect to="/dashboard" />
	) : (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} className="w-50 form-container">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input id="username" className={`form-control ${formik.errors.username && formik.touched.username && "is-invalid"}`} name="username" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
					{formik.errors.username && formik.touched.username && <div className="text-danger error">{formik.errors.username}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input id="password" className={`form-control ${formik.errors.password && formik.touched.password && "is-invalid"}`} name="password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					{formik.errors.password && formik.touched.password && <div className="text-danger error">{formik.errors.password}</div>}
				</div>
				<button type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
					Login
				</button>
				<Link className="btn btn-secondary ml-2" to="/registration">
					Signup
				</Link>
			</form>
		</div>
	);
};

export default connect((store) => store)(Login);
