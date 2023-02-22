import React, { useState, useEffect } from 'react'
import { 
    UserIcon,
    HandThumbUpIcon,
    HandThumbDownIcon
    } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import { commentActions } from '../redux-store/commentSlicer';
import EditComment from './EditComment';

function Comment({ data, reply, parentId }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [hours, setHours] = useState('');
    const { name, createdAt, likes, dislikes, content, id } = data;
    const dispatch = useDispatch();
    
    const updateLikes=(likes)=>{
        if(reply){dispatch(commentActions.handleLikes({ id, like: likes }))}
            else{dispatch(commentActions.handleReplyLikes({ childId: id, parentId: parentId, like: likes }))} 
    }

    const handleDelete = ()=>{
        if(reply){dispatch(commentActions.deleteComment({ id }))}
        else{dispatch(commentActions.deleteReplyComment({ childId: id, parentId: parentId}))
} 
    }
    useEffect(()=>{
        let date1 = new Date(createdAt)
        let date2 = new Date();
        let diff = date2.getTime() - date1.getTime();
        let hh = Math.floor(diff / 1000 / 60 / 60);
        setHours(hh)
    },[])
        
  return (
    <div className='flex gap-3 mb-5'>
        <div className='mt-2'>
            <UserIcon className='h-12 bg-gray-300 text-gray-500 p-1 cursor-pointer' />
        </div>
        <div >
            <h1 className='text-[#28acff] font-bold text-md'>{ name }
                <span className='text-gray-400 font-semibold text-sm mx-2'>&#183;</span> 
                <span className='text-gray-400 font-semibold text-sm'>{ hours } hours ago</span>
            </h1>
            {!showEdit && <p> { content } </p>}
            {showEdit && <EditComment id={ id } content={ content } setShowEdit={setShowEdit} reply={false}/>}
            <div className='flex items-center text-gray-400 mt-1'>
                <div className='flex items-center  gap-2  mr-3'
                onClick={() => updateLikes(true)}>
                    <span className='text-sm'>{ likes > 0 && likes }</span>
                    <HandThumbUpIcon className={`h-4 cursor-pointer hover:text-black ${ likes > 0 && 'text-[#28acff]'}`}/>
                </div>
                <div className='flex items-center  gap-2 '
                onClick={() => updateLikes(false)}>
                    <span className='text-sm'>{ dislikes > 0 && dislikes }</span>
                    <HandThumbDownIcon className={`h-4 cursor-pointer hover:text-black ${ dislikes > 0 && 'text-red-500'}`}/>
                </div>
                {reply && <span className='text-gray-400 font-semibold text-sm ml-3'>&#183;</span>}
                {reply && <p className='text-sm ml-2 cursor-pointer hover:text-black' onClick={()=>setShowReply(true)}>
                    Reply</p>}
                {reply && <span className='text-gray-400 font-semibold text-sm ml-3'>&#183;</span>}
                {reply && <p className='text-sm ml-2 cursor-pointer hover:text-black' onClick={()=>setShowEdit(true)}>
                    Edit
                </p>}
                <span className='text-gray-400 font-semibold text-sm ml-3'>&#183;</span>
                <p className='text-sm ml-2 cursor-pointer hover:text-black' 
                onClick={handleDelete}>
                    Delete
                </p>
            </div>
            {showReply && <EditComment reply={ true } id={ id } content={ content } setShowReply={setShowReply}/>}
        </div>
    </div>
  )
}
export default Comment