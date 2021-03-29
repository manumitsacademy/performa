import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Registration = () => {
	let history = useHistory();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			email: "",
			phonenumber: "",
		},
		onSubmit: (values) => {
			fetch(`http://localhost:3400/users`, {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((response) => {
					if (response.statusText === "Created") {
						alert("Your registration completed");
						history.push("login");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
		validate: (values) => {
			const errors = {};

			if (!values.username) {
				errors.username = "Username cannot be empty";
			} else if (!/^[a-zA-z0-9]{5,10}$/.test(values.username)) {
				errors.username = "Only alphabets and numbers. Min 5, Max 10 characters";
			}

			if (!values.password) {
				errors.password = "Password cannot be empty";
			} else if (values.password.length < 8 || values.password.length > 32) {
				errors.password = "Password should be between 8 and 32 characters";
			}

			if (!values.email) {
				errors.email = "Email cannot be empty";
			} else if (!emailRe.test(values.email)) {
				errors.email = "Not a valid email id";
			}

			if (!values.phonenumber) {
				errors.phonenumber = "Phone number cannot be empty";
			} else if (!/^(\+91)?[0-9]{10}$/.test(values.phonenumber)) {
				errors.phonenumber = "Not a valid indian phone number";
			}

			return errors;
		},
	});
	return (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} class="w-50 form-container">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						className={`form-control ${formik.errors.username && formik.touched.username && "is-invalid"}`}
						id="username"
						name="username"
						type="text"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.username}
					/>
					{formik.errors.username && formik.touched.username && <div className="text-danger error">{formik.errors.username}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						className={`form-control ${formik.errors.password && formik.touched.password && "is-invalid"}`}
						id="password"
						name="password"
						type="password"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.errors.password && formik.touched.password && <div className="text-danger error">{formik.errors.password}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className={`form-control ${formik.errors.email && formik.touched.email && "is-invalid"}`}
						id="email"
						name="email"
						type="email"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					{formik.errors.email && formik.touched.email && <div className="text-danger error">{formik.errors.email}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="phonenumber">Phone Number</label>
					<input
						className={`form-control ${formik.errors.phonenumber && formik.touched.phonenumber && "is-invalid"}`}
						id="phonenumber"
						name="phonenumber"
						type="tel"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.phonenumber}
					/>
					{formik.errors.phonenumber && formik.touched.phonenumber && <div className="text-danger error">{formik.errors.phonenumber}</div>}
				</div>
				<button type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
					Registration
				</button>
				<Link to="/login" className="btn btn-secondary ml-2">
					Login
				</Link>
			</form>
		</div>
	);
};

export default Registration;
