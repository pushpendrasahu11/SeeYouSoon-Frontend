import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import { uploadToCloudinary } from 'utils/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../redux/Post/post.action';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRaddius:".6rem",
    outline:"none"
  };
  

const CreatePostModal = ({open, handleClose}) => {

  

  const [selectedImage,setSelectedImage] = useState();
  const [selectedVideo,setSelectedVideo] = useState();
  const [isLoading,setIsLoading] = useState(false);

  const handleSelectImage = async (event) =>{
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0],"image");
    
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image",imageUrl);
  }

  const handleSelectVideo = async(event) =>{
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0],"video");
    
    setSelectedImage(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video",videoUrl);
  }

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues:{
      caption:"",
      image:"",
      video:""
    },
    onSubmit:(values)=>{
      console.log("formik values",values);
      dispatch(createPostAction(values));
    }
  });
  return (
    
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar></Avatar>
                <div>
                  <p className="font-bold text-lg">Dashing Pizza</p>
                  <p className="text-sm">@DashingPizza</p>
                </div>
              </div>
              <textarea
              className='outline-none w-full mt-5 p-2 bg-transparent border rounded-sm border-[#3b4054]'
              name="caption" 
              placeholder='write caption...' 
              id="" 
              value={formik.values.captions}
              rows={4}
              onChange={formik.handleChange}
              >
              </textarea>
              <div className='flex space-x-5 items-center mt-5'>
                <div>
                  <input type="file" accept='image/*' style={{display:'none'}} id="image-input" onChange={handleSelectImage} />
                  <label htmlFor="image-input">
                    <IconButton color='primary' component="span">
                      <ImageIcon/>
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>
                <div>
                  <input type="file" accept='video/*' style={{display:'none'}} id="video-input" onChange={handleSelectVideo} />
                  <label htmlFor="video-input">
                    <IconButton color='primary' component="span">
                      <VideoCallIcon/>
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
              { selectedImage && <div>
                <img className='h-[10rem]' src={selectedImage} alt="" />
              </div>
              }   
              <div className='flex w-full justify-end'>
                <Button variant='contained' type='submit' sx={{borderRadius:'1.5rem'}}>Post</Button>
              </div>
            </div>
          </form>
          <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
              open={isLoading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>

    
  )
}

export default CreatePostModal
