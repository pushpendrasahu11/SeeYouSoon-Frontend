import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../redux/Post/post.action';
import { isLikedByReqUser } from 'utils/isLikedByReqUser';

const PostCard = ({item}) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const {post,auth} = useSelector(store=>store);
  const handleShowComment=()=> setShowComments(!showComments);

  const handleCreateComment=(content)=>{
    const reqData={

      postId:item.id,
      data:{
        content
      }
    }
    dispatch(createCommentAction(reqData))
  }

  const handleLikePost=()=>{
    dispatch(likePostAction(item.id))
  }

  return (
    <Card>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " "  + item.user.lastName}
        subheader={"@" + item.user.firstName.toLowerCase() + " "  + item.user.lastName.toLowerCase()}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div>
        <IconButton onClick={handleLikePost}>
         {isLikedByReqUser(auth.user.id, item)?<FavoriteIcon/> : <FavoriteBorderIcon/>}  
        </IconButton>
        <IconButton >
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleShowComment}>
          <ChatBubbleIcon />
        </IconButton>
        </div>
        <div>
            <IconButton >
            {true? <BookmarkIcon />:<BookmarkBorderIcon />}
            </IconButton>
        </div>
        
        
      </CardActions>
      {showComments && <section>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <Avatar sx={{}} />
          <input onKeyPress={(e)=>{
            if(e.key == "Enter"){
              console.log("Enter pressed-------",e.target.value);
              handleCreateComment(e.target.value);
              e.target.value="";
            }
          }
          } placeholder='wirte you comment' type="text" className="w-full outline-none bg-transparent border border-[#3b4050] rounded-full px-5 py-2" />
        </div>
        <Divider />
        {item.comments.map((comment)=> <div className="mx-3 space-y-2 my-5 text-xs">
          {/* <div className="flex justify-between items-center"> */}
            <div className="flex items-center space-x-5">
              <Avatar sx={{height:"2rem",width:"2rem",fontSize:"0.8rem"}}>
                {comment.user.firstName[0].toUpperCase() + comment.user.lastName[0].toUpperCase() }
              </Avatar>
              <p>{comment.content}</p>
            </div>
          {/* </div> */}
        </div>)}
      </section>}
    </Card>
  )
}

export default PostCard