import React, { useState }  from 'react'
import { useDispatch } from 'react-redux';
import { commentActions } from '../redux-store/commentSlicer';

function EditComment({ id, content, setShowEdit, reply, setShowReply }) {
    const [comment, setComment] = useState('');
    const [error, seterror] = useState(false)
    const dispatch = useDispatch();

    const handleEdit = (e) =>{
        e.preventDefault()
        if( comment === ""){
            seterror(true)
            return
        }

        if(reply){
            const replyId = Math.floor(Math.random() * 1000000);
            const createdAt = new Date();
            dispatch(commentActions.addReply({childId : replyId, parentId: id,content: comment, createdAt}))
            setShowReply(false) 
        }
        else{
            dispatch(commentActions.editComment({id, content: comment}))
            setShowEdit(false)
        }
        setComment('')
        seterror(false)
    }

    const handleCancel = ()=>{
        if (reply){
            setShowReply(false) 
        }
        else{
            setShowEdit(false)
        }
    }

  return (
    <form className='flex flex-col items-start gap-2' onSubmit={handleEdit}>
        <textarea className='border-2 resize-none p-2 w-80 rounded-md mt-2' 
        placeholder={ reply ? "" : content } 
        value={ comment } 
        onChange={(e)=>setComment(e.target.value)}></textarea>
        {error && <p className='text-red-500 text-sm' >comment cannot be empty</p>}
        <div>
            <button type='submit' className='border-2 border-[#28acff] text-[#28acff] w-20 py-1 px-2 rounded-md text-sm font-semibold mr-3'>
                {reply ? 'Reply' : 'Update'}
            </button>
            <button onClick={handleCancel} className='border-2 border-[#28acff] text-[#28acff] w-20 py-1 px-2 rounded-md font-semibold text-sm'>
                Cancel
            </button>
            
        </div>
    </form>
  )
}

export default EditComment