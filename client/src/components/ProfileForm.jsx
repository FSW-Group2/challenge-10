import styled from "styled-components";
import { DotLoader } from "react-spinners";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { Mail, ModeEdit, Numbers, PermIdentity } from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileForm({ DataPlayer, isLoading, setisLoading }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
    },
    onSubmit: async (value) => {
      const docRef = await setDoc(doc(db, "users", DataPlayer.uid), {
        uid: DataPlayer.uid,
        email: value.email,
        username: value.username,
        gender: value.gender,
        total_score: 0,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setTimeout(() => {
        setisLoading(false);
      });
      navigate("/");
    },
  });

  return (
    <Wrapper>
      {isLoading && <DotLoader color="white" />}

      {DataPlayer && (
        <>
          <Info>
            <h3>Username :</h3>
            <h5>{DataPlayer.username}</h5>
          </Info>
          <Info>
            <h3>Email :</h3>
            <h5>{DataPlayer.email}</h5>
          </Info>
          <Info>
            <h3>Gender :</h3>
            <h5>{DataPlayer.gender}</h5>
          </Info>
          <Button variant="contained" onClick={handleOpen}>
            <ModeEdit />
            Edit
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
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
                <Button type="submit">Send</Button>
              </form>
            </Box>
          </Modal>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 2rem;
  width: 100%;
  Button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  color: #a53b11; ;
`;

const Info = styled.div`
  text-align: left;
  display: flex;
  h3 {
    width: 10rem;
  }
`;
