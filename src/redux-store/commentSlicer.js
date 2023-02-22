import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commentItems : []
}

const commentSlicer = createSlice({
    name : 'comments',
    initialState,
    reducers:{
        addComment(state, action){
            const comment = {
                name : 'guest-user',
                parentId : action.payload.parentId,
                createdAt : action.payload.createdAt,
                id : action.payload.id,
                content : action.payload.content,
                replies : [],
                likes : 0,
                dislikes : 0,
                
            }
        state.commentItems.push(comment)
        },
        handleLikes(state, action){
            const comment = state.commentItems.find((item)=> item.id === action.payload.id);
            (action.payload.like) ? comment.likes++ : comment.dislikes++
        },
        deleteComment(state, action){
            state.commentItems = state.commentItems.filter(item=> item.id !== action.payload.id)
        },
        editComment(state, action){
            const comment = state.commentItems.find((item)=> item.id === action.payload.id);
            comment.content = action.payload.content
        },
        sortByLikes(state){
            state.commentItems.sort((a, b)=> a.likes - b.likes)
        },
        addReply(state, action){
            const replyComment = {
                name : 'guest-user',
                id : action.payload.childId,
                parentId : action.payload.parentId,
                replies : [],
                createdAt : action.payload.createdAt,
                content : action.payload.content,
                likes : 0,
                dislikes : 0,
                
            }
            const comment = state.commentItems.find((item)=> item.id === action.payload.parentId);
            comment.replies.push(replyComment);
        },
        handleReplyLikes(state, action){
            const parrentComment = state.commentItems.find((item)=> item.id === action.payload.parentId);
            const childComment = parrentComment.replies.find((item)=> item.id === action.payload.childId);
            (action.payload.like) ? childComment.likes++ : childComment.dislikes++
        },
        deleteReplyComment(state, action){
            const parrentComment = state.commentItems.find((item)=> item.id === action.payload.parentId);
            parrentComment.replies = parrentComment.replies.filter(item=> item.id !== action.payload.childId)
        },
        replaceItems(state, action){
            state.commentItems = action.payload.commentItems
        }
    }
})

export const commentReducer = commentSlicer.reducer;
export const commentActions = commentSlicer.actions;