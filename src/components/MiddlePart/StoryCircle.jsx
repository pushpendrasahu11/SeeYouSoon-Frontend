import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
  return (
    <div>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar 
          sx={{width:"5rem", height:"5rem"}}
          src='https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png' 
          >
           
          </Avatar>
          <p>Dashing...</p>
        </div>
    </div>
  )
}

export default StoryCircle