import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../redux/Auth/auth.action';
import { createChat } from '../../redux/Message/message.action';

const SearchUser = () => {

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const {message,auth} = useSelector(store=>store);

  const handleClick = (id) =>{

    dispatch(createChat({userId:id}));
    
  }
  const handleSearchUser = (e) =>{
  
    setUsername(e.target.value);
    console.log("e. value is " + e.target.value);
    console.log("username sent is " + username  )
    dispatch(searchUser(e.target.value));

  }
  return (
    <div>
      <div className="relative py-5">
        <input type="text" className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full " placeholder='search user...' onChange={handleSearchUser} />
      
       {
        username && 
        (auth.searchUser.map((item)=>
          <Card className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
          <CardHeader onClick={()=>{
            handleClick(item.id)
            setUsername("");
          }}
          avatar={<Avatar src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg"/>}
          title={item.firstName + " " + item.lastName}
          subheader={item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()}
          />
          
        </Card>
        ))
        }
      </div>

      

    </div>
  )
}

export default SearchUser