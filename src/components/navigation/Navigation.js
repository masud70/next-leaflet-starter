import Button  from "@mui/material/Button";
import Link from "next/link";
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from '../../firebase/FireApp'
import CircularProgress from "@mui/material/CircularProgress";
import Router from 'next/router';


const auth = getAuth(app)

const index = () => {

    const [open, setOpen] = useState(false);
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const [wrongInfoAlert, setWrongInfoAlert] = useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [loading, setLoading] = useState(false)

    const submitLogInInfo = () => {
        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            // Set user info forwards, and route to the admin panel
            const user = credentials.user
            setLoading(false)
            if(email=='admin@admin.com') Router.push('/admin')
            else Router.push('/projects')
            handleClose()
        }).catch(error => {
            setWrongInfoAlert(true)
            setLoading(false)
            console.log("Sign-in error >", error)
        })

        
    }


    return (
        <div className="w-full bg-slate-400 flex md:flex-row flex-col bg-opacity-25 justify-between px-4 py-4">
            <div
                className="font-bold text-3xl items-center justify-center flex text-gray-700"
                style={{ fontFamily: "Tahoma" }}
            >
                Bangladesh Ongoing Projects
            </div>
            <div className="flex items-center">
                <ul className="flex flex-row space-x-0">
                    <li className=" text-md font-semibold hover:bg-slate-500 px-4 min-h-full py-2 hover:bg-opacity-50 transition-all delay-200 hover:text-slate-100">
                        <Link href="/projects">Project Map</Link>
                    </li>
                    <li className=" text-md font-semibold hover:bg-slate-500 px-4 min-h-full py-2 hover:bg-opacity-50 transition-all delay-200 hover:text-slate-100">
                        <Link href="/about">About</Link>
                    </li>
                    <Button sx={{fontWeight:'bold'}} variant="outlined" onClick={handleClickOpen}>
                        Log in
                    </Button>



                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle sx={{fontWeight:'bold',margin:'auto',color:'#2a413c'}}>Log In</DialogTitle>
                        <DialogContent sx={{minHeight:'150px',minWidth:'500px',display:'flex',alignItems:"center",flexDirection:'column'}}>
                                {loading && <>Loading...<br/><CircularProgress/></>}
                                
                                <TextField onChange={(e) => {setEmail(e.target.value); setWrongInfoAlert(false);}} sx={{margin:'5px',width:'80%'}} id="email" label="Email" variant="outlined" />
                                <TextField onChange={(e) => {setPassword(e.target.value); setWrongInfoAlert(false);}} sx={{margin:'5px',width:'80%'}}  id="password" label="Password" variant="outlined" />
                                {
                                    wrongInfoAlert&&
                                    <small style={{color:'red'}}>***You have entered wrong Email/Password.***</small>
                                }
                        </DialogContent>
                        <DialogActions >
                        <Button sx={{fontWeight:'bold',color:'gray'}} onClick={handleClose}>Cancel</Button>
                        <Button sx={{fontWeight:'bold'}} onClick={submitLogInInfo}>Submit</Button>
                        </DialogActions>
                    </Dialog>


                </ul>
            </div>
        </div>
    );
};

export default index;
