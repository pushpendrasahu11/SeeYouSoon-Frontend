import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from 'components/Post/PostCard';
import CreatePostModal from 'components/CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../redux/Post/post.action';

const story = [1,1,1,1,1];
// const posts = [1,1,1,1,1];
const MiddlePart = () => {

  const dispatch = useDispatch();

  const {post,auth} = useSelector(store=>store);
  // console.log("post  store",post);

  const [openCreatePostModal,setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () =>{
    setOpenCreatePostModal(false);
  }
  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true);
  }

 useEffect(() => {
  if (auth.user) {
    dispatch(getAllPostAction());
  }
}, [auth.user, post.newComment]); 

  return (
    <div className='px-20'>
      <section className="flex items-center p-5 rounded-b-md">
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{width:"5rem", height:"5rem"}}
          //src='https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png' 
          >
            <AddIcon sx={{fontSize:"3rem"}}></AddIcon>
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item)=>
          <StoryCircle />
        )}
      </section>
      <Card className='p-5 mt-5'>
        <div className="flex justify-between">
          <Avatar />
          <input onClick={handleOpenCreatePostModel} readOnly type="text" className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border" />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ArticleIcon/>
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        
        {
        post.posts.map((items)=>
          <PostCard item={items}/>
        )}
      </div>
      <div>
        <CreatePostModal open={openCreatePostModal} handleClose = {handleCloseCreatePostModal}></CreatePostModal>
      </div>
    </div>
  )
}

export default MiddlePart