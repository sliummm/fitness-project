import React, { useState, useEffect } from 'react'
import {db} from '../../firebase'
import {collection, getDocs, deleteDoc, doc, where, query, updateDoc} from 'firebase/firestore';

const ReportCard = (props) => {

  const { uid, date }=props;

  const low = new Date(date.getFullYear(), date.getMonth(), date.getDate()-3);
  const high = new Date(date.getFullYear(), date.getMonth(), date.getDate()+3);

  const dateFilter=(item)=>{
    return new Date(item.date)>=low && new Date(item.date)<=high
  }
  console.log(low);
  console.log(high);

  const [ exerciseReports, setexerciseReports ] = useState([]);
  const [ dietReports, setDietReports ] = useState([]);
  
  useEffect(()=>{

    const getExercises = async()=>{
      const q = query(collection(db,"exercises"),where("uid","==",uid));
      const data = await getDocs(q);
      const entries = data.docs.map(doc=>({...doc.data()}));
      const filtered = entries.filter(dateFilter);
      console.table(filtered);
      setexerciseReports(filtered);
    }

    const getDiet = async()=>{
      const q = query(collection(db,"diet"),where("uid","==",uid));
      const data = await getDocs(q);
      const entries = data.docs.map(doc=>({...doc.data()}));
      const filtered = entries.filter(dateFilter);
      console.table(filtered);
      setDietReports(filtered);
    }
    getExercises();
    getDiet();

    console.log(date);
  },[date]);

  console.table(exerciseReports);
  console.table(dietReports);

  return (
    <div>ReportCard</div>
  )
}

export default ReportCard