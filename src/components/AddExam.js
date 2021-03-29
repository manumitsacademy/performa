import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
const AddExam = () => {
    let history = useHistory();
    let [subjects,setSubjects] = React.useState([])
    React.useEffect(()=>{
        fetch("http://localhost:3400/subjects")
        .then((res)=>{
            return res.json()
        })
        .then(data=>{
            setSubjects(data)
        })
    },[])
    const formik = useFormik({
        initialValues: {
            subjectname: '',
            examtitle:'',
            maxmarks:''
        },
        onSubmit: values => {
            console.log(values)
            fetch(`http://localhost:3400/exams`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            })
            .then(response => {
                if(response.statusText==='Created'){
                    alert("Exam Added Success")                    
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
                <select onChange={formik.handleChange} value={formik.values.subjectname} name="subjectname" id="subjectname">
                    <option disabled selected value="null">Please select Subject</option>
                    {
                        subjects && subjects.map((s,i)=>{
                            return <option>{s.subjectname}</option>
                        })
                    }
                </select>
                <label htmlFor="examtitle">Exam Title</label>
                <input
                    id="examtitle"
                    name="examtitle"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.examtitle}
                /><br></br>
                <label htmlFor="maxmarks">Max Marks</label>
                <input
                    id="maxmarks"
                    name="maxmarks"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.maxmarks}
                /><br></br>
                <br></br>
                              <br></br>  
                <button type="submit">Add Exam</button>
            </form>
        </div>
    );
};

export default AddExam;