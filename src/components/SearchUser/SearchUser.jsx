import { Avatar, Card, CardHeader } from '@mui/material'
import React from 'react'

const SearchUser = () => {
  const handleClick = () =>{
    
  }
  const handleSearchUser = () =>{

  }
  return (
    <div>
      <div className="relative py-5">
        <input type="text" className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full " placeholder='search user...' onChange={handleSearchUser} />
      </div>

      {
        false && <Card>
          <CardHeader onClick={()=>{
            handleClick()
          }}
          avatar={<Avatar src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg"/>}
          title="Dashing Pizza"
          subheader={"Dashing_pizza"}
          />
          
        </Card>
      }

    </div>
  )
}

export default SearchUser