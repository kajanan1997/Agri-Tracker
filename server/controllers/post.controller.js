import Post from '../models/post.model'
import errorHandler from "../helpers/dbErrorHandler";

const create =  async (req,res,next)=>{
    let post = new Post(req.body)
    post.postedBy = req.profile
    try {
        let result = await post.save()
        res.json(result)
    }catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
}
}
const list = async (req,res,next)=>{
    let posts = await Post.find().populate('comments.commentedBy','_id name').populate('postedBy','_id name')
        .sort('-createdAt')
        .exec()
    if(posts.length === 0){
        return res.status('400').json({
            error:"No posts found"
        })
    }else{
        return res.status(200).json(posts)
    }
}
const read = async (req,res)=>{
    let post = req.post
    if(!post){
        return res.status(400).json({
            "error":"Invalid "
        })
    }else{

        return res.status(200).json(post)
    }
}
const remove = async (req, res) => {
    let post = req.post
    try{
        let deletedPost = await post.remove()
        res.json(deletedPost)
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const addComment = async (req,res,next)=>{
    let comment = req.body.comment
    comment.commentedBy = req.auth
    try{
        let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
            .populate('comments.commentedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const removeComment = async (req,res,next)=>{
    let commentId = req.body.commentId
    let removedBy = req.auth._id
    try{
        let post = await Post.findById(req.body.postId)
            .populate("comments.commentedBy",'_id name')
            .populate("postedBy",'_id name')
            .exec()
        let comment = post.comments.find((obj)=>(obj._id == commentId))
        if(post.postedBy._id == removedBy || comment.commentedBy._id == removedBy){
            post.comments = post.comments.filter((obj)=>obj !== comment)
            let resp = await post.save()
            return res.status(200).json(resp)
        }else{
            return res.status(403).json({
                "error":"You can't remove comment that you dont have access to"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const postByID = async (req, res, next, id) => {
    try{
        let post = await Post.findById(id).populate('postedBy', '_id name').populate('comments.commentedBy','_id name').exec()
        if (!post)
            return res.status('400').json({
                error: "Post not found"
            })
        req.post = post
        next()
    }catch(err){
        return res.status('400').json({
            error: "Could not retrieve use post"
        })
    }
}
const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if(!isPoster){
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default {
    create,
    list,
    postByID,
    addComment,
    removeComment,
    remove,
    isPoster,
    read
}