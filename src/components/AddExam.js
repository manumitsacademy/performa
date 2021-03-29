import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const AddExam = () => {
	let history = useHistory();
	let [subjects, setSubjects] = React.useState([]);
	React.useEffect(() => {
		fetch("http://localhost:3400/subjects")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setSubjects(data);
			});
	}, []);
	const formik = useFormik({
		initialValues: {
			subjectname: "",
			examtitle: "",
			maxmarks: "",
		},
		onSubmit: (values) => {
			console.log(values);
			fetch(`http://localhost:3400/exams`, {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((response) => {
					if (response.statusText === "Created") {
						alert("Exam Added Success");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
	});
	return (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} className="w-50 form-container">
				<div className="form-group">
					<label htmlFor="subjectname">SubjectName</label>
					<select className="form-control" onChange={formik.handleChange} value={formik.values.subjectname} name="subjectname" id="subjectname">
						<option disabled selected value="">
							Please select Subject
						</option>
						{subjects &&
							subjects.map((s, i) => {
								return <option key={i}>{s.subjectname}</option>;
							})}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="examtitle">Exam Title</label>
					<input className="form-control" id="examtitle" name="examtitle" type="text" onChange={formik.handleChange} value={formik.values.examtitle} />
				</div>
				<div className="form-group">
					<label htmlFor="maxmarks">Max Marks</label>
					<input className="form-control" id="maxmarks" name="maxmarks" type="text" onChange={formik.handleChange} value={formik.values.maxmarks} />
				</div>
				<button type="submit" className="btn btn-primary">Add Exam</button>
			</form>
		</div>
	);
};

export default AddExam;
