import React, { useState, useEffect }from 'react';

const Reportview = () =>{

  const currentDate = new Date();
  
  const [displayDate, setDisplayDate] = useState(currentDate);

  const handlePrevious = ()=>{
    const previousWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - 7);
    setDisplayDate(previousWeek);
  }

  const handleNext = ()=>{
    const nextWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() + 7);
    setDisplayDate(nextWeek);
  }


    return (
      <div className="ui menu">
        <a className="item" onClick={handlePrevious}>Previous</a>
        <div className='displayArea' style={{display:'flex', alignItems:'center'}}>
          <div className='currentDate' style={{margin:'0 60px 0 60px'}}>
          {displayDate.toUTCString()}
          </div>
        </div>
        <div className="right menu">
          <a className="item" onClick={handleNext}>Next</a>
        </div>
      </div>
  )
}


export default Reportview;