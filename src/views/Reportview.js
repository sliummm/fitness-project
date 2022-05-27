import React, { useState, useEffect, useRef }from 'react';

import {db} from '../firebase';
import { useAuth } from '../hooks/useAuth'
import {collection, getDocs, deleteDoc, doc, where, query, updateDoc} from 'firebase/firestore';


const Reportview = () =>{

  const currentDate = new Date();
  const currentUser =  useAuth();
  
  const [ displayDate, setDisplayDate ] = useState(currentDate);
  const [ exerciseReports, setexerciseReports ] = useState([]);
  const [ dietReports, setDietReports ] = useState([]);
  const [ currentUid,setCurrentUid ] = useState();

  useEffect(()=>{

    const getUser = async()=>{

      setCurrentUid(currentUser.uid);
    }

    const getExercises = async()=>{
      const q = query(collection(db,"exercises"),where("uid","==",currentUid));
      const data = await getDocs(q);

      const entries = data.docs.map(doc=>({...doc.data()}));
      entries.map(doc=>{
        setexerciseReports(exerciseReports=>[...exerciseReports,doc]);
      })
    }

    const getDiet = async()=>{
      const q = query(collection(db,"diet"),where("uid","==",currentUid));
      const data = await getDocs(q);

      const entries = data.docs.map(doc=>({...doc.data()}));
      entries.map(doc=>{
        setDietReports(dietReports=>[...dietReports,doc]);
      })
    }
    getUser();
    getExercises();
    getDiet();
  },[])

  console.table(exerciseReports);
  console.table(dietReports);

  const handlePrevious = ()=>{
    const previousWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - 7);
    setDisplayDate(previousWeek);
  }

  const handleNext = ()=>{
    const nextWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() + 7);
    setDisplayDate(nextWeek);
  }

  return (
    <div className="ui menu" style={{width:'450px', height:'30px'}}>
      <a className="item" onClick={handlePrevious}>Previous</a>
        <div className='currentDate' style={{margin:'0 60px 0 60px',display:'flex', alignItems:'center'}}>
          {displayDate.toUTCString()}
        </div>
      <div className="right menu">
        <a className="item" onClick={handleNext}>Next</a>
      </div>
    </div>
  )
}


export default Reportview;