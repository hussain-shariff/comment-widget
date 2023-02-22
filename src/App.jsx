import React, { useEffect } from 'react'
import Comment from './components/Comment'
import InputForm from './components/InputForm'
import Sort from './components/SortButton'
import { useSelector, useDispatch } from 'react-redux'
import ReplyComments from './components/ReplyComments';
import { commentActions } from './redux-store/commentSlicer';

let isInitial = true;
function App() {
  const comments = useSelector((state)=> state.comments.commentItems);
  const dispatch = useDispatch();
  const commentElements = comments.map((item)=>{
    return(
      <>
        <Comment key = { item.id } data = { item } reply={ true } parentId ={ null }/>
        {item.replies && <div className="max-w-lg mx-auto">
            <ReplyComments key = { item.id } replyComments = { item.replies } parentId={ item.id }/>
        </div>}
      </>
    )
  })
  useEffect(()=>{
    const sendData = async ()=>{
      const response = await fetch('https://comment-widget-f22f4-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json',{
      method : 'PUT',
      body : JSON.stringify({commentItems: comments})
    })
    if(!response.ok){
      throw new Error('Sending data Failed')
    }
    }
    if(isInitial){
      isInitial = false
      return
    }
    sendData()
  },[comments])

  useEffect(() => {
    fetch('https://comment-widget-f22f4-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json')
      .then(res=> res.json())
      .then(data=> dispatch(commentActions.replaceItems(data)))
  }, [])
  
  return (
    <div className="max-w-2xl mx-auto">
      <InputForm/>
      {comments.length > 1 && <Sort/>}
      <main className='mt-5' >
        { commentElements }
      </main>
    </div>
  )
}

export default App
