import React, { useState } from 'react'
import { 
    Bars3BottomRightIcon,
    } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { commentActions } from '../redux-store/commentSlicer'

function Sort() {
    const [sortText, setSortText] = useState('Sort By')
    const [showSortItems, setShowSortItems] = useState(false)
    const dispatch = useDispatch();

    const handleClick = ()=>{
        setShowSortItems(!showSortItems)
    }

    const handleSortByLikes = ()=>{
        setSortText('Likes')
        dispatch(commentActions.sortByLikes())
    }

  return (
    <div className='flex flex-col items-end gap-2'>
        <div className='flex  mt-4 cursor-pointer' onClick={handleClick} >
            <Bars3BottomRightIcon className='h-7'/>
            <p>
                { sortText }
            </p>
        </div>
        {showSortItems && <div className='border-2 w-16 text-center'>
            <p className='hover:bg-[#28acff] hover:text-white cursor-pointer' onClick={()=> setSortText('Date')}>Date</p> <hr />
            <p className='hover:bg-[#28acff] hover:text-white cursor-pointer' onClick={ handleSortByLikes }>Likes</p>
        </div>}
    </div>
    
  )
}

export default Sort