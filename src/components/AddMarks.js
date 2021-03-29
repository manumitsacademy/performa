import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const AddMarks = () => {
	let history = useHistory();
	let [subjects, setSubjects] = React.useState([]);
	let [allexams, setAllExams] = React.useState([]);
    let [exams,setExams ] = React.useState([]);
	React.useEffect(() => {
		fetch("http://localhost:3400/subjects")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log("Formik::", formik);
				setSubjects(data);
			});
	}, []);
	React.useEffect(() => {
		fetch("http://localhost:3400/exams")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setAllExams(data);
                setExams(data);
			});
	}, []);
    
	const formik = useFormik({
		initialValues: {
			subjectname: "",
			examtitle: "",
			username: "",
			marks: -1,
		},
		onSubmit: (values) => {
			console.log(values);
			fetch(`http://localhost:3400/studentmarks`, {
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
    React.useEffect(()=>{
        console.log("formik.subjectname",formik.values.subjectname);
        var examsOfSelectedSubject = allexams.filter((e,i)=>{
            if(e.subjectname === formik.values.subjectname){
                return true
            }
            else{
                return false
            }
        });
        setExams(examsOfSelectedSubject);
    },[formik.values.subjectname])
	return (
		<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
			<form onSubmit={formik.handleSubmit} className="w-50 form-container">
				<div className="form-group">
					<label htmlFor="subjectname">SubjectName</label>
					<select className="form-control" onChange={formik.handleChange} value={formik.values.subjectname} name="subjectname" id="subjectname">
						<option disabled value="">
							Please select Subject
						</option>
						{subjects &&
							subjects.map((s, i) => {
								return <option>{s.subjectname}</option>;
							})}
					</select>
				</div>
				{formik.values && formik.values.subjectname && (
					<>
						<div className="form-group">
						<label htmlFor="examtitle">Exam Title</label>
						<select className="form-control" onChange={formik.handleChange} value={formik.values.examtitle} 
                        name="examtitle" id="examtitle">
							<option disabled defaultValue="">
								Please select Exam
							</option>
							{exams &&
								exams.map((s, i) => {
									return <option key={i}>{s.examtitle}</option>;
								})}
						</select>
						</div>
					</>
				)}
				<button type="submit" className="btn btn-primary">Upload Marks</button>
			</form>
		</div>
	);
};

export default AddMarks;
