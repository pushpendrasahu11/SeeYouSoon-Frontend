import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import PostCard from 'components/Post/PostCard';
import UserReelCard from 'components/Reels/UserReelCard';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const tabs =[
  {value:"post",name:"Post"},
  {value:"reels",name:"Reels"},
  {value:"saved",name:"Saved"},
  {value:"repost",name:"Repost"},
];
const posts=[1,1,1,1]
const reels=[1,1,1,1]
const savedPost=[1,1,1,1]
const repost=[1,1,1,1]
const Profile = () => {
  const {auth} = useSelector(store=>store);
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {id} = useParams()
  return (
    <Card className='py-10 w-[70%]' >
      <div className="rounded-md">
        <div className='h-[15rem]'>
          <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558_1280.jpg" alt="" />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar className='transform -translate-y-24' sx={{width:"10rem",height:"10rem",border:"black solid 0.2rem"}} src='https://cdn.pixabay.com/photo/2015/09/05/22/31/headphones-925789_1280.jpg'/>
          {true ? 
          <Button sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button> 
          : 
          <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>
          }
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl"> {auth.user?.firstName + " " +auth.user?.lastName}</h1>
            <p>@{auth.user?.firstName.toLowerCase() + "_" +auth.user?.lastName.toLowerCase() }</p>
          </div>
          <div className="flex gap-2 items-center py-3">

            <span>42 post </span>
            <span>34 followers </span>
            <span>44 followings </span>

          </div>
          <div>
             <p>Lorem ipsum dolor sit amet consectetur amolestias dignissimos repellat! Aliquam?</p>
          </div>
        </div>
        <section>
          <Box sx={{width:'100%',borderBottom:1,borderColor:"divider"}}>
        <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {tabs.map((item)=>
          <Tab value={item.value} label={item.name} wrapped/>
        )}
        
      </Tabs>
      </Box>
      <div className="flex justify-center">
        {value==="post"  ?(
          <div className='space-y-5 w-[70%] my-10'>
            {posts.map((item)=>
            <div className='border border-slate-100 rounded-md'>
              <PostCard />
            </div>
            )}
          </div>
        ): value === "reels" ? (
          <div className=' flex flex-wrap justify-center gap-2'>
            {reels.map((item)=>
            <UserReelCard />
            )}
          </div>
        ): value === "saved" ? (
          <div className='space-y-5 w-[70%] my-10'>
            {posts.map((item)=>
            <div className='border border-slate-100 rounded-md'>
              <PostCard />
            </div>
            )}
          </div>
        ): value === "repost" ? (
          <div className='space-y-5 w-[70%] my-10'>
            {posts.map((item)=>
            <div className='border border-slate-100 rounded-md'>
              <PostCard />
            </div>
            )}
          </div>
        ):(
          ""
        )
          
        } 
      </div>
        </section>
      </div>
    </Card>
  )
}

export default Profile