import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './MainNavigation.css';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '35ch',
    },
  },
}));



const MainNavigation = ({users,handleSearch}) => {
 
  const classes = useStyles();

  return (
    <>
      <header className="main-header"> 
        <nav className="main-navigation__header-nav">
        <form className={classes.root} noValidate autoComplete="off">
          {users.length !==0 && <TextField 
             id="standard-basic" 
             label="Search" 
             onChange={(event)=>{handleSearch(event)}}
          />}
        </form>
        </nav>
       </header>
    </>
  );
};

export default MainNavigation;
