import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from 'components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../redux/Message/message.action';
import { uploadToCloudinary } from 'utils/uploadToCloudinary';
import { API_BASE_URL } from 'config/api';
import SockJS from 'sockjs-client';
import Stom from 'stompjs';

const Message = () => {

  const dispatch = useDispatch();
  const {message,auth} = useSelector(store=>store);
  const [currentChat,setCurrentChat] = useState();
  const [messages,setMessages] = useState([]);
  const [selectedImage,setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    dispatch(getAllChats())
  },[])

  

  console.log(  ".........hcats",message.chats );

  const handleSelectImage = async(e) =>{
    console.log("handle select image ........")
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0],"image");
    setSelectedImage(imgUrl);
    setLoading(false);
;
  }


  const handleCreateMessage=(value)=>{
    console.log("selected image is ",selectedImage);
    const message={
      chatId: currentChat?.id,
      content:value,
      image:selectedImage
    };
    console.log("selected image is ",selectedImage);

    dispatch(createMessage({message,sendMessageToServer}));
    console.log("message is sent")
  };

  useEffect(()=>{
    setMessages([...messages,message.message])
  },[message.message])


  const [stompClient, setStompClient] = useState(null);

  useEffect(()=>{
    // const sock = new SockJS(`${API_BASE_URL}+"/ws"`);
    const sock = new SockJS("http://localhost:5000/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({},onConnect,onErr)
      
  },[])

  const onConnect=()=>{
    console.log("websocket connected");
  }
  const onErr=(error)=>{
    console.error("websocket Error",error);
  }

  useEffect(()=>{
      if(stompClient && auth.user && currentChat){
        const subscription = stompClient.subscribe(`/user/${currentChat?.id}/private`,onMessageReceive)
      }
  })

  const sendMessageToServer=(newMessage)=>{
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`,{},JSON.stringify(message))
    } 
  }

  const onMessageReceive=(newMessage)=>{
    console.log("message recier form websocket ", newMessage)
  }

  return (
  <div>
    <Grid container className='h-screen overflow-y-hidden'>
      <Grid className='px-5' item xs={3}>
        <div className='flex h-full justify-between space-x-2'>
          <div className='w-full'>
            <div className="flex space-x-4 items-center py-5">
              <WestIcon />
              <h1 className="text-xl font-bold">home</h1>
            </div>
            <div className="h-[83vh]">
              <div className="">
                <SearchUser></SearchUser>
              </div>
              <div className='h-full space-y-4 mt5 overflow-y-scroll hideScrollbar'>
               {
                message.chats.map((item)=>{
                 return <div onClick={()=>{
                    setCurrentChat(item)
                    setMessages(item.messages)
                  }}>


                    <UserChatCard chat={item} />
                    
                  </div>
                  
                })
               }
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={9}>
        {currentChat ? <div>
          <div className="flex justify-between items-center border-l p-5">
            <div className="flex items-center space-x-3">
              <Avatar src='https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_1280.jpg' />
              <p>{auth.user?.id===currentChat.users[0]?.id?currentChat.users[1].firstName + " " + currentChat.users[1].lastName : currentChat.users[0].firstName + " " + currentChat.users[0].lastName }</p>
            </div>
            <div className="flex space-x-3">
              <IconButton>
                <AddIcCallIcon />
              </IconButton>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
            </div>
          </div>
          <div className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
            {messages.map((item)=>
              <ChatMessage item={item} />
            ) }
          </div>
          <div className="sticky bottom-0 border-l">
            {selectedImage && <img src={selectedImage} className='w-[5rem] h-[5rem] object-cover px-2' alt="" />}
          <div className="py-5 flex items-center justify-center space-x-5">
           
            <input
             onKeyPress={(e)=>{
              if(e.key==="Enter" && e.target.value){
                handleCreateMessage(e.target.value)
                setSelectedImage("");
                e.target.value="";
              }
            }}
            type="text" 
            className=' bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5' 
            placeholder='Type message ...'
            />
            <div>
              <input type="file" accept='image/*' onChange={handleSelectImage} id="image-input" className='hidden'/>
              <label htmlFor="image-input">
                <AddPhotoAlternateIcon />
              </label>
            </div>
          </div>
        </div>
        </div> :
        <div className='h-full space-y-5 flex flex-col justify-center items-center'>
          <ChatBubbleOutlineIcon sx={{fontSize:"14rem"}}/>
          <p className="text-xl font-semibold">No chat selected</p>
        </div>
        }
        
      </Grid>
    </Grid>

    
  <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  </div>
)
};

export default Message