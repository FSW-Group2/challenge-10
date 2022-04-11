import React, { useState } from "react";
import styled from "styled-components";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Visibility,
  VisibilityOff,
  PermIdentity,
  Mail,
  Numbers,
  Lock,
} from "@mui/icons-material";
import background from "./../images/features.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const schemaValidation = yup.object().shape({
  username: yup.string().required("username must be required"),
  email: yup.string().email().required("email must be type email"),
  gender: yup.string().required("gender must be required"),
  password: yup.string().min(6).required("password min 6 charachter"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("must be same with password"),
});

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: values.email,
            username: values.username,
            gender: values.gender,
            total_score: 0,
            createdAt: Timestamp.fromDate(new Date()),
          });
          navigate("/");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code.split("auth/")[1];
          const errorMessage = error.message;
          setErrorMessage(errorCode);
          console.log(errorCode, errorMessage);
        });

       
    },
    validationSchema: schemaValidation,
  });

  const [values, setValues] = useState({
    showPassword: false,
  });

  const navigate = useNavigate();

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
        <h1>Register</h1>

        <Card>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel>Username</InputLabel>
              <Input
                id="username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <PermIdentity />
                    </IconButton>
                  </InputAdornment>
                }
                error={Boolean(formik.errors.username)}
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel>Email</InputLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <Mail />
                    </IconButton>
                  </InputAdornment>
                }
                error={Boolean(formik.errors.email)}
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                label="Gender"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <Numbers />
                    </IconButton>
                  </InputAdornment>
                }
                error={Boolean(formik.errors.gender)}
              >
                <FormHelperText>{formik.errors.gender}</FormHelperText>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Men"}>Men</MenuItem>
                <MenuItem value={"Women"}>Women</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
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
                error={Boolean(formik.errors.password)}
              />
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="confirmpassword">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type={values.showPassword ? "text" : "password"}
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
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
                error={Boolean(formik.errors.confirmpassword)}
              />
              <FormHelperText>{formik.errors.confirmpassword}</FormHelperText>
            </FormControl>

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
              Register
            </Button>
            <h6>Register in with</h6>
            <Logo>
              <GoogleIcon />
              <GitHubIcon />
              <FacebookIcon />
              <TwitterIcon />
            </Logo>
            <Divider style={{ background: "#000000" }} />
            <h6>
              Already have account?{" "}
              <Link to={"/login"}>
                <span>Sign In</span>
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
    url(${background}) no-repeat center left / cover;
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
  justify-content: center;
`;

export default Register;
