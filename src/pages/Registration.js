import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
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
	});
	return (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} class="w-50 form-container">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input className="form-control" id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input className="form-control" id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input className="form-control" id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
				</div>
				<div className="form-group">
					<label htmlFor="phonenumber">Phone Number</label>
					<input className="form-control" id="phonenumber" name="phonenumber" type="text" onChange={formik.handleChange} value={formik.values.phonenumber} />
				</div>
				<button type="submit" className="btn btn-primary">
					Registration
				</button>
			</form>
		</div>
	);
};

export default Registration;
