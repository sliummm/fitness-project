import React, { useState, useEffect, useRef }from 'react';

import {db} from '../firebase';
import { useAuth } from '../hooks/useAuth'
import {collection, getDocs, deleteDoc, doc, where, query, updateDoc} from 'firebase/firestore';
import ReportCard from '../components/cards/ReportCard';


const Reportview = () =>{

  const currentDate = new Date();
  const currentUser =  useAuth();
  
  const [ displayDate, setDisplayDate ] = useState(currentDate);

  const handlePrevious = ()=>{
    const previousWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - 7);
    setDisplayDate(previousWeek);
  }

  const handleNext = ()=>{
    const nextWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() + 7);
    setDisplayDate(nextWeek);
  }

  return (
    <div>
      <div className="ui menu" style={{width:'450px', height:'30px'}}>
          <a className="item" onClick={handlePrevious}>Previous</a>
        <div className='currentDate' style={{margin:'0 60px 0 60px',display:'flex', alignItems:'center'}}>
          {displayDate.toUTCString()}
        </div>
        <div className="right menu">
          <a className="item" onClick={handleNext}>Next</a>
        </div>
        </div>
        <div>
          {currentUser&&
          <ReportCard
          uid={currentUser.uid}
          date={displayDate}
          />}
      </div>
    </div>

  )
}


export default Reportview;