import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
const Dashboard = (props) => {
	React.useEffect(() => {
		fetch(`http://localhost:3400/subjects`, {
			method: "GET", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.length >= 1) {
					props.dispatch({ type: "UPDATESUBJECTS", payload: data });
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);
	React.useEffect(() => {
		console.log(props);
	});

	const logout = () => props.dispatch({type: "UPDATEUSER", payload: {}});

	return props.user.username ? (
		<div className="container py-3">
			<h1 className="row">Dashboard</h1>
			<div className="row justify-content-between align-items-center">
				<h4>Welcome {props.user.username}!</h4>
				<button className="btn btn-danger" onClick={logout}>Logout</button>
			</div>
			<ul class="nav row w-50 justify-content-between">
				<li className="nav-item">
					<Link className="nav-link btn btn-outline-primary" to="/addSubject">
						Add Subject
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link btn btn-outline-primary" to="/addExam">
						Add Exam
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link btn btn-outline-primary" to="/addMarks">
						Add Marks
					</Link>
				</li>
			</ul>
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default connect((store) => store)(Dashboard);
