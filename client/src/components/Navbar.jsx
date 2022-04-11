import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import male from "../images/male.png";
import female from "../images/female.png";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../config/firebase";
import AuthContext from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPlayer, setisPlayer] = useState("");
  const [DataPlayer, setDataPlayer] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useContext(AuthContext);
  const userCollectionRef = collection(db, "users");
  onAuthStateChanged(auth, (user) => {
    setisPlayer(user.uid);
  });
  const q = query(userCollectionRef, where("uid", "==", isPlayer));

  useEffect(() => {
    const getDataPlayer = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setTimeout(() => {
          setDataPlayer(doc.data());
          setisLoading(false);
        });
      });
    };
    getDataPlayer();
  }, [isPlayer]);

  // const unsub = onSnapshot(doc(db, "users", "isAuthenticated.uid"), (doc) => {
  //   console.log("Current data: ", doc.data());
  //   // setIsWomen(doc.data());
  // });
  // useEffect(() => {
  //   unsub();
  // }, []);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BoxNav>
      <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        sx={{ borderBottom: 1, borderColor: "white" }}
      >
        <Toolbar>
          <LinkNavbar to={"/"}>
            <Typography variant="h8" component="div" sx={{ mr: 10 }}>
              <h5>Squid Game</h5>
            </Typography>
          </LinkNavbar>
          <Typography
            variant="h8"
            component="div"
            sx={{
              display: "flex",
              gap: 2,
              cursor: "pointer",
              mx: "auto",
            }}
          >
            <LinkNavbar to={"/listgame"}>
              <h5>Games</h5>
            </LinkNavbar>
            <LinkNavbar to={"/leaderboard"}>
              <h5>Leaderboard</h5>
            </LinkNavbar>
            <LinkNavbar to={"/listplayer"}>
              <h5>List Player</h5>
            </LinkNavbar>
          </Typography>

          {isAuthenticated ? (
            <div>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {isLoading && <ClipLoader size={"10px"} />}
                <h5>{DataPlayer.username}</h5>
                {DataPlayer.gender === "Men" && (
                  <Avatar alt="male" src={male} />
                )}
                {DataPlayer.gender === "Women" && (
                  <Avatar alt="female" src={female} />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <LinkNavbar to={"/profile"}>
                  <MenuItem>
                    {DataPlayer.gender === "Men" && (
                      <Avatar alt="male" src={male} />
                    )}
                    {DataPlayer.gender === "Women" && (
                      <Avatar alt="female" src={female} />
                    )}{" "}
                    <div>Profile</div>
                  </MenuItem>
                </LinkNavbar>
                <Divider />

                <MenuItem onClick={handleLogOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Typography
              variant="h8"
              component="div"
              sx={{ display: "flex", gap: 2, cursor: "pointer" }}
            >
              <LinkNavbar to={"/login"}>
                <h5>Login</h5>
              </LinkNavbar>
              <LinkNavbar to={"/register"}>
                <h5>Register</h5>
              </LinkNavbar>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
      </div>
      </BoxNav>
  );
}

const LinkNavbar = styled(Link)`
  color: white;
  text-decoration: none;
  h5 {
    font-weight: 300;
  }
  div {
    color: #000;
  };
`;

const BoxNav = styled.div`
  margin-bottom: 10px;
`;
