import React, { useEffect, useState } from "react";
import background from "./../images/sg.jpg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  PermIdentity,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { reset, login } from "../feature/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const [values, setValues] = useState({
    showPassword: false,
  });

  const [isToggle, setisToggle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error("error!");
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, user, isSuccess, message, navigate, dispatch]);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <ImageLeft></ImageLeft>
      <ImageRigth>
        <h1>Sign In</h1>
        <Logo>
          <GoogleIcon />
          <GitHubIcon />
          <FacebookIcon />
          <TwitterIcon />
        </Logo>
        <Card>
          {/* {isToggle && <Alert severity="error">{isToggle}</Alert>} */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel>Username</InputLabel>
              <Input
                value={login.username}
                onChange={(e) =>
                  setformData({ ...formData, username: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <PermIdentity />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={login.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <Lock />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <h5>forgot password?</h5>
            <Button
              variant="outlined"
              type="submit"
              sx={{ my: 2 }}
              style={{
                border: "0.1rem solid #000000",
                color: "#000000",
                width: "80%",
              }}
            >
              Sign In
            </Button>
            <Divider style={{ background: "#000000" }} />
            <h6>
              Don't have an account?{" "}
              <Link to={"/register"}>
                <span>Sign Up</span>
              </Link>
            </h6>
          </form>
        </Card>
      </ImageRigth>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const ImageLeft = styled.div`
  background: linear-gradient(
      0deg,
      rgba(8, 9, 10, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${background}) no-repeat center center / cover;
  width: 50%;
  height: 100%;
`;

const Card = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5 {
    color: #000000;
    font-weight: 600;
    text-align: end;
  }
  width: 20rem;
  h6 {
    font-weight: 300;
    span {
      font-weight: 600;
    }
  }
`;

const ImageRigth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0rem;
`;

export default Login;
