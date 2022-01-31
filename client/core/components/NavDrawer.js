import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart"
import FilterVintageIcon from '@material-ui/icons/FilterVintage'
import TimelineIcon from '@material-ui/icons/Timeline';
import PublicIcon from '@material-ui/icons/Public';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import auth from "../../auth/auth-helper";
import Badge from "@material-ui/core/Badge";
import ForumIcon from '@material-ui/icons/Forum';
import bookmark from "../../datastores/bookmark-ds";
const useStyles  = makeStyles((theme)=>({
    drawerDiv: {
        backgroundColor:theme.palette.primary.light
    }
}))

const NavDrawer = withRouter(({history,drawer_open,toggleDrawer})=>{
    const isActive = (history, path) => {
        if (history.location.pathname == path)
            return {color: '#ff4081'}
        else
            return {color: '#ffffff'}
    }
    const classes = useStyles()
    return(
        <Drawer anchor={"left"} open={drawer_open} onClose={toggleDrawer}>
            <div onClick={toggleDrawer} className={classes.drawerDiv}>
                <List>
                    <Link to="/">
                        <ListItem button>
                                <ListItemIcon style={isActive(history,"/")} >
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText style={isActive(history,"/")}>
                                     Home
                                </ListItemText>
                        </ListItem>
                    </Link>

                    {auth.isAuthenticated()&&(
                        <>
                        <Link to={"/users"}>
                      <ListItem button>
                          <ListItemIcon style={isActive(history, "/users")}>
                              <PersonIcon/>
                          </ListItemIcon>
                          <ListItemText style={isActive(history, "/users")}>
                              Users
                          </ListItemText>
                      </ListItem>
                   </Link>
                    <Link to={"/demand"}>
                        <ListItem button>
                            <ListItemIcon style={isActive(history,"/demand")} >
                                <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText style={isActive(history,"/demand")}>
                                Demands
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={"/harvest"}>
                        <ListItem button>
                            <ListItemIcon style={isActive(history,"/harvest")} >
                                <FilterVintageIcon/>
                            </ListItemIcon>
                            <ListItemText style={isActive(history,"/harvest")}>
                               Harvest
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={"/charts"}>
                        <ListItem button>
                            <ListItemIcon style={isActive(history,"/charts")} >
                               <TimelineIcon/>
                            </ListItemIcon>
                            <ListItemText style={isActive(history,"/charts")}>
                               Charts
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to={"/news"}>
                        <ListItem button>
                            <ListItemIcon style={isActive(history,"/news")} >
                                <PublicIcon/>
                            </ListItemIcon>
                            <ListItemText style={isActive(history,"/news")}>
                                Announcements
                            </ListItemText>
                        </ListItem>
                    </Link>
                        </>
                        )}
                    {
                        auth.isAuthenticated() &&(
                            <>
                            <Link to={"/bookmarks"}>
                                <ListItem button>
                                    <ListItemIcon style={isActive(history,"/bookmarks")} >
                                        <Badge badgeContent={bookmark.itemTotal()} color={"primary"}>
                                            <BookmarkIcon/>
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText style={isActive(history,"/bookmarks")}>
                                        Bookmarks
                                    </ListItemText>
                                </ListItem>
                            </Link>
                            <Link to={"/forum"}>
                                <ListItem button>
                                    <ListItemIcon style={isActive(history,"/forum")} >
                                           <ForumIcon/>
                                    </ListItemIcon>
                                    <ListItemText style={isActive(history,"/forum")}>
                                       Forum
                                    </ListItemText>
                                </ListItem>
                            </Link>
                            </>

                        )
                    }

                    {
                        (auth.isAuthenticated() && auth.isAuthenticated().user.role !== "Admin" || !(auth.isAuthenticated()))&&(
                            <Link to={"/feedback"}>
                                <ListItem button>
                                    <ListItemIcon style={isActive(history,"/feedback")} >
                                        <FeedbackIcon/>
                                    </ListItemIcon>
                                    <ListItemText style={isActive(history,"/feedback")}>
                                        Feedback
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        )
                    }
                    {
                        auth.isAuthenticated() && auth.isAuthenticated().user.role === "Admin" && (
                            <Link to={"/feedback/view"}>
                                <ListItem button>
                                    <ListItemIcon style={isActive(history,"/feedback/view")} >
                                        <FeedbackIcon/>
                                    </ListItemIcon>
                                    <ListItemText style={isActive(history,"/feedback/view")}>
                                        View Feedbacks
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        )
                    }
                </List>
            </div>
        </Drawer>
    )
})
export default NavDrawer