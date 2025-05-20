import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const UserChatCard = () => {
  return (
    <Card>
    <CardHeader
    
    avatar={< Avatar sx={{width:"3.5rem", height:"3.5rem",fontSize:"1.5rem", bgcolor:"#191c29", color:"rgb(88,199,250)"}}
                src='https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_1280.jpg'
            />}
    action={ <IconButton>
                <MoreHorizIcon />
            </IconButton>
            }
    title="Code With Zosh"
    subheader={"new message"}

    />

    </Card>
  )
}

export default UserChatCard