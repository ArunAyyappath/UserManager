import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { tryRegister, isEmailPreExist } from '../../actions/loginActions';
import { useHistory, Link } from 'react-router-dom';
import AlertComponent from '../../alert/AlertComponent';
import './register.css';

const setTheStyles = makeStyles((theme) => ({
  background: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ProfileP: {
    margin: theme.spacing(1),
    backgroundColor: "#4c6aff"
  },
  formStyle: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const UserAuthenticationLayout = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);
  const history = useHistory();

  useEffect(() => {
    if (auth.loggedIn || localStorage.getItem('token')) {
      history.push('/home')
    }
  }, [auth.loggedIn]);

  const checkEmailValidity = (): boolean => {
    const emailValidator = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email.match(emailValidator)) {
      return true;
    }

    return false;
  }

  const checkPasswordValidity = (): boolean => {
    const passwordValidator = /^(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;
    if (password.match(passwordValidator)) {
      return true;
    }

    return false;
  }

  const isEmailIdExisting = (): void => {
    if (checkEmailValidity()) {
      dispatch(isEmailPreExist(email));
    }
  }

  const onSubmit = (): void => {
    if (auth.isEmailValid
      && checkPasswordValidity()
      && username && phoneNumber) {
      dispatch(
        tryRegister({
          ...{ email },
          ...{ password },
          ...{ username },
          ...{ phone: phoneNumber }
        }));
    }
  }

  const classes = setTheStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.background}>
        <Avatar className={classes.ProfileP}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.formStyle} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={email && !checkEmailValidity() ? true : false}
                variant="outlined"
                required
                fullWidth
                label={email && !checkEmailValidity() ? `Please enter a valid email id` : `Email id`}
                name="email"
                autoComplete="email"
                onBlur={isEmailIdExisting}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password && !checkPasswordValidity() ? true : false}
                variant="outlined"
                required
                fullWidth
                label={password && !checkPasswordValidity() ? `Please enter a valid password` : `Password`}
                type="password"
                autoComplete="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                value={password}
                helperText="Must have at least 8 characters and a special symbol"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Phonenumber"
                type="text"
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phoneNumber}
              />
            </Grid>
          </Grid>
        </form>
      </div>
      <Container className='button-wrapper' component="main" maxWidth="xs">
        <div>Already have an account? <Link to='/'>Login</Link></div>
        <Button disabled={!checkEmailValidity() || !checkPasswordValidity()}
          className='login'
          onClick={onSubmit} variant="contained"
          color="primary">Register</Button>
      </Container>
      {auth.loginhasError && <AlertComponent severity="error">{auth.loginhasError}</AlertComponent>}
      {!auth.isEmailValid && auth.emailStatus && <AlertComponent severity="error">{auth.emailStatus}</AlertComponent>}
      {auth.registerhasError && <AlertComponent severity="error">{auth.registerhasError}</AlertComponent>}
    </Container>
  );
}

const Register = (): JSX.Element => {
  return (
    <UserAuthenticationLayout />
  )
}

export default Register;