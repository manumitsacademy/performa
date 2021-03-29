import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
const Dashboard = (props)=>{
    React.useEffect(()=>{
        fetch(`http://localhost:3400/subjects`, {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then(data => {                    
                    if(data.length>=1){
                        props.dispatch({type:"UPDATESUBJECTS",payload:data})
                    }
                })
              .catch((error) => {
                console.error('Error:', error);
              });
        
    },[])
    React.useEffect(()=>{
        console.log(props)
    })
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/addSubject">Add Subject</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/addExam">Add Exam</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/addMarks">Add Marks</Link>&nbsp;&nbsp;&nbsp;
            <b>{props.user.username}</b>
        </div>
    )
}

export default connect(store=>store)(Dashboard);