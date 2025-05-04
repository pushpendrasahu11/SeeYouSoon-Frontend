import React from 'react'
import { NavigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className='cart h-screen flex flex-col justify-between py-5'>

    <div className='space-y-8 pl-5'>
    <div>
      <span className='logo font-bold text-xl'>SeeYouSoon</span>  
    </div>  
      <div className="space-y-8">

      {NavigationMenu.map((item)=> 
      
      <div className='cursor-pointer flex space-x-3 items-center' >
        {item.icon}
        <p className='text-xl'>{item.title}</p>
      </div>

      )}

      </div>
    </div> 
      <div>
        <Divider/>
        <div className="pl-5 flex items-ccenter justify-between pt-5">
          <div className="flex items-center space-x-3">
          <Avatar src='https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png'></Avatar>
            <div>
              <p className='font-bold'>DashingPizza</p>
              <p className='opacity-70'>@DashingPizza</p>
            </div>
          </div>
          <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        
      </Menu>
    </div>
        </div>
      </div>

    </Card>
  )
}

export default Sidebar