import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const AddSubject = () => {
	let history = useHistory();
	const formik = useFormik({
		initialValues: {
			subjectname: "",
		},
		onSubmit: (values) => {
			fetch(`http://localhost:3400/subjects`, {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((response) => {
					if (response.statusText === "Created") {
						alert("Subject Added Success");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
	});
	return (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} className="form-container">
				<div className="form-group">
					<label htmlFor="subjectname">SubjectName</label>
					<input className="form-control" id="subjectname" name="subjectname" type="text" onChange={formik.handleChange} value={formik.values.subjectname} />
				</div>
				<button type="submit" className="btn btn-primary">Add Subject</button>
			</form>
		</div>
	);
};

export default AddSubject;
