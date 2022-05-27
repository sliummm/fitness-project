import React, { useState, useEffect } from 'react';
import {db} from '../../firebase';
import {collection, getDocs, deleteDoc, doc, where, query, updateDoc} from 'firebase/firestore';
import Button from '../Button';

const DiaryCard = (props) => {

    const [ diaries, setDiaries ]=useState([]);

    useEffect(()=>{
        const getDiaries = async ()=>{
            const q = query(collection(db,"diaries"),where("UserID","==",props.uid));
            const data = await getDocs(q);

            const entires = data.docs.map((doc)=>({...doc.data(), id:doc.id}));
            
            entires.map(
                (doc)=>{
                    setDiaries(diaries=>[...diaries, doc]);
                })
        }

        getDiaries();

    },[])

    const onMarkAsDone = async(id, status)=>{
        const userDoc = doc(db, "diaries", id);

        const updates = {
            isDone: true
        }

        await updateDoc(userDoc, updates);
        window.location.reload(false);
    }

    const onDeleteDiary =async(id)=>{
        const userDoc = doc(db, "diaries", id);
        await deleteDoc(userDoc);
        window.location.reload(false);
    } 

    return (
        <div className="four wide column">
            {diaries.map((diary,index)=>{
                return(
                        <div className="ui card" key={index}>
                            <div className="content">
                                <div className="header">{diary.Title}</div>
                                <div className="meta">
                                    <p>{diary.PostOn}</p>
                                </div>
                                <div>
                                    {diary.Content}
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                {!diary.isDone && <Button
                                    buttonText="Done!"
                                    buttonType="ui positive basic button"
                                    buttonAction={()=> onMarkAsDone(diary.id, diary.isDone)}
                                /> }
                                <Button
                                    buttonText="Discard!"
                                    buttonType="ui negative basic button"
                                    buttonAction={()=> onDeleteDiary(diary.id)}
                                />
                            </div>
                        </div>
                )
            })}
        </div>
    )
}

export default DiaryCard