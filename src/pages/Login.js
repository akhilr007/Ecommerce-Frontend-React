import {
  Avatar,
  Box,
  Grid,
  Link,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../firebase/Auth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          onSubmit={login}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            label="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            autoFocus
            autoComplete="off"
          ></TextField>
          <TextField
            label="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ m: theme.spacing(3, 0, 2) }}
          >
            Sign In
          </Button>
        </form>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link variant="body2" href="/register">
              New User? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
