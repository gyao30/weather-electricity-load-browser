import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Github from '@material-ui/icons/GitHub';
import MapNY from "./MapNY";
import ListItems from "./ListItems";
import Welcome from "./Welcome";
import PredLineChart from './PredLineChart';
import EmailIcon from '@material-ui/icons/Email';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CSE6242-Group38
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open] = React.useState(true);
  const [welcome, setWelcome] = React.useState(true);
  const [time, setTime] = React.useState("");
  const [zip, setZip] = React.useState("10001");
  const [showPred, setShowPred] = React.useState(false);

  const turnOffPred = () =>{
    setShowPred(false)
  }

  const turnOnPred = () =>{
    setShowPred(true)
  }

  const onTimeChange = (value) => {
    setTime(value);
    // console.log(value);
  }

  const onZipChange = (value) => {
    setZip(value);
    // console.log(zip);
  }

  const turnOffWelcome = () => {
    setWelcome(false);
  }

  const turnOnWelcome = () => {
    setWelcome(true);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="grey" position="absolute" className={clsx(classes.appBar, false && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            className={clsx(classes.menuButton, false && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}
          <img height="75" src={ require('../logo.png') } />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* <span style={{ color: "yellow", fontSize: "30px", fontStyle: "italic" }}>WE</span>  */}
            {/* browser */}
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <a href="mailto:yzhang250@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                <EmailIcon style={{ fontSize: 25 }} />
              </a>

            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge color="secondary">
              <a href="https://github.com/yzhang250/weather-electricity-load-browser" target="_blank" rel="noopener noreferrer" style={{color:"black"}}>
                <Github />
              </a>

            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={true}
      >
        <div className={classes.toolbarIcon}>

        </div>

        <Divider />
        <ListItems open={open} 
        turnOnWelcome={turnOnWelcome} 
        turnOffWelcome={turnOffWelcome}
        onTimeChange={onTimeChange}
        onZipChange={onZipChange}
        turnOnPred = {turnOnPred}
        turnOffPred={turnOffPred} 
        zipcode={zip}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>                
              {welcome?<Welcome/>:showPred?<div><PredLineChart zipcode={zip} /></div>:<div><MapNY time={time} onZipChange={onZipChange}/></div>}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}