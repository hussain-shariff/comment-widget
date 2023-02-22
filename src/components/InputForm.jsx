import React, { useState } from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import { commentActions } from '../redux-store/commentSlicer';

function InputForm() {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (comment.length > 200){
            setError(true)
            return
        }
        const id = Math.floor(Math.random() * 1000000);
        const createdAt = new Date();
        dispatch(commentActions.addComment({ id, content : comment, parentId : null, createdAt }))
        setError(false)
        setComment('')
    }

    const handleChange = (e)=>{
        setComment(e.target.value)
    }
  return (
    <>
        <form className="flex items-center gap-x-2 mt-10" onSubmit={ handleSubmit }>
            <UserIcon className='h-10 bg-gray-300 text-gray-500 p-1 cursor-pointer' />
            <input onChange={ handleChange } value={ comment } type="text" placeholder='Join the discussion...' className='border-gray-400 border-2
            flex-grow p-2 rounded-md' />
            {comment && <button type='submit' 
            className='bg-[#28acff] p-2 rounded-md hover:shadow-lg text-white font-semibold shadow-lg'>
                Comment
            </button>}
        </form>
        {error && <p className='text-center text-red-500 text-sm' >comment should not exceed 200 characters.</p>}
    </>
    
  )
}
export default InputForm