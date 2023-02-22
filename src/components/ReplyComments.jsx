import React from 'react'
import Comment from './Comment'

function ReplyComments({ replyComments, parentId }) {
    const replyData = replyComments[0]
    const replyCommentsElements = replyComments.map((item)=>{
        return(
            <Comment key = { item.id } data = { item } reply={ false } parentId={ parentId }/>
        )
    })
  return (
    <>
        { replyCommentsElements }
    </>
  )
}

export default ReplyComments