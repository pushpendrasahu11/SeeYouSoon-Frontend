import { Card, Grid } from '@mui/material'
import Login from './Login'
import React from 'react'
import Register from './Register'

const Authenticaiton = () => {
  return (
    <div>
    <Grid container>
        <Grid classname='h-screen overflow-hidden' item xs={7}>
            <img className='h-full w-full' src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png" />
        </Grid>
    
    <Grid item xs={5}>

    <div className='px-20 flex flex-col justify-center h-full'>

        <Card className='card p-8'>
            <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">SeeYouSoon</h1>
                <p className="text-center text-sm w-[70%]">Follow. Chat. Meet. See You Soon! </p>

                <Login/> 
                {/* <Register/> */}
            </div>
        </Card>
    

    </div>
    </Grid>
    </Grid>
    </div>
  )
}

export default Authenticaiton