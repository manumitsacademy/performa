import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
const AddSubject = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            subjectname: ''
        },
        onSubmit: values => {
            fetch(`http://localhost:3400/subjects`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            })
            .then(response => {
                if(response.statusText==='Created'){
                    alert("Subject Added Success")                    
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
                <label htmlFor="subjectname">SubjectName</label>
                <input
                    id="subjectname"
                    name="subjectname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.subjectname}
                /><br></br>
                <br></br>
                              <br></br>  
                <button type="submit">Add Subject</button>
            </form>
        </div>
    );
};

export default AddSubject;