import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import vegetableImg from './../assets/images/bg3.jpg'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

export default function Home(){
    useEffect(()=>{

    },[])
    return (
        <div className={"container content"}>
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title is-size-2 has-text-centered">
                        Welcome to harvest tracking app
                    </h1>
                    <p className="subtitle has-text-centered mt-4">
                        ....
                    </p>
                </div>
            </section>
            <div className={"section"}>
               <img src={vegetableImg}/>
            </div>
        </div>
    )
}

