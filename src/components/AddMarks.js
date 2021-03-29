import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
const AddMarks = () => {
    let history = useHistory();
    let [subjects,setSubjects] = React.useState([]);
    let [exams,setExams] = React.useState([]);
    React.useEffect(()=>{
        fetch("http://localhost:3400/subjects")
        .then((res)=>{
            return res.json()
        })
        .then(data=>{
            console.log("Formik::",formik)
            setSubjects(data)
        })
    },[])
    React.useEffect(()=>{
        fetch("http://localhost:3400/exams")
        .then((res)=>{
            return res.json()
        })
        .then(data=>{
            setExams(data)
        })
    },[])
    const formik = useFormik({
        initialValues: {
            subjectname: "",
            examtitle:'',
            username:'',
            marks:-1
        },
        onSubmit: values => {
            console.log(values)
            fetch(`http://localhost:3400/studentmarks`, {
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
                    <option defaultValue="">Please select Subject</option>
                    {
                        subjects && subjects.map((s,i)=>{
                            return <option>{s.subjectname}</option>
                        })
                    }
                </select>
                {
                    formik.values && formik.values.subjectname && (
                        <>
                            <label htmlFor="examtitle">Exam Title</label>
                            <select onChange={formik.handleChange} value={formik.values.examtitle} name="examtitle" id="examtitle">
                                <option selected value="">Please select Exam</option>
                                {
                                    exams && exams.map((s,i)=>{
                                        return <option>{s.examtitle}</option>
                                    })
                                }
                            </select>
                        </>
                    )
                }
                
                <br></br>
                              <br></br>  
                <button type="submit">Upload Marks</button>
            </form>
        </div>
    );
};

export default AddMarks;