import React, {useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link,withRouter} from 'react-router-dom'
import NavDrawer from "./components/NavDrawer";
import MenuIcon from "@material-ui/icons/Menu"

import {makeStyles} from "@material-ui/core/styles";

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ff4081'}
  else
    return {color: '#ffffff'}
}

const useStyles = makeStyles((theme)=>({
  root:{
    flexGrow:1,
  },
  menuButton:{
   marginRight:theme.spacing(2)
  },
  title:{
    flexGrow:1,
  }
}))
const Menu = withRouter(({history}) => {
  const classes = useStyles()
  const [drawerState,setDrawerState] = useState(false)
  const toggleDrawer = ()=>{
    setDrawerState(!drawerState)
  }
  return(
    <>
      <NavDrawer drawer_open={drawerState} toggleDrawer={toggleDrawer}/>
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton edge={"start"} className={classes.menuButton} color={"inherit"}>
                      <MenuIcon onClick={toggleDrawer}/>
                  </IconButton>

                          <Typography variant={"h6"} className={classes.title}> <Link to={"/"} style={{textDecoration:'none',color:'inherit'}} >HARVESTAPP </Link> </Typography>

                  {
                      !auth.isAuthenticated() && (<span>
          {/*<Link to="/signup">*/}
          {/*  <Button style={isActive(history, "/signup")}>Sign up*/}
          {/*  </Button>*/}
          {/*</Link>*/}
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
                  }
                  {
                      auth.isAuthenticated() && (<span>
          <Link to={"/message/"}>
            <Button style={isActive(history, "/message/")}>Messages</Button>
          </Link>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
          }}>Sign out</Button>
        </span>)
                  }
              </Toolbar>
          </AppBar>
      </div>

    </>
)})

export default Menu
