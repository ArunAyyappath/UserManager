import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import './userProfile.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: 10,
    width: 100,
    height: 100
  },
  aligncenter: {
    textAlign: 'center'
  }
}));

const Avatars = (props: any): JSX.Element => {
  const classes = useStyles();
  const extractName = (): string | null => {
    if (props.profile.firstName) {
      const [firstWord] = props.profile.firstName.split('');
      return firstWord.toUpperCase();
    }
    if (props.profile.username) {
      const [firstWord] = props.profile.username.split('');
      return firstWord.toUpperCase();
    }
    return null;
  }

  return (
    <React.Fragment>
      {extractName() ? <div >
        <Avatar className={classes.avatar}>{extractName()}</Avatar>
      </div> : null}
    </React.Fragment>
  );
}

const UserProfile = (): JSX.Element => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { profileData } = useSelector((state: any) => state);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser(token))
    } else {
      history.push('/');
    }
  }, []);

  return (
    <React.Fragment>
      {
        profileData
        && !profileData.fetchingUserHasError
        && profileData.profile && (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
              <Typography component="div" align='center'>
                <Paper elevation={5} className={classes.paper}>
                  <Grid container spacing={3}>
                    <Grid item sm={3}>
                      <Avatars profile={profileData.profile} />
                    </Grid>
                    <Grid item sm={9} className='userProfile'>
                      <div>{profileData.profile.username && `User name: ${profileData.profile.username}`}</div>
                      <div>{profileData.profile.email && `Email Id: ${profileData.profile.email}`}</div>
                      <div>{profileData.profile.phone && `Phone: ${profileData.profile.phone}`}</div>
                      <div>{profileData.profile.firstName
                        && profileData.profile.lastName
                        && `Name: ${profileData.profile.firstName} ${profileData.profile.lastName}`}</div>
                    </Grid>
                  </Grid>
                </Paper>
              </Typography>
            </Container>
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default UserProfile;