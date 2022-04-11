import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import MenuAppBar from "../components/Navbar";
import { db } from "../config/firebase";
import leaderboard from "../images/leaderboard.jpg";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const userCollectionRef = collection(db, "users");
  const q = query(userCollectionRef, orderBy("total_score", "desc"));
  useEffect(() => {
    const getDataPlayer = async () => {
      const data = await getDocs(q);
      setTimeout(() => {
        setisLoading(false);
        setPlayers(data.docs.map((doc) => ({ ...doc.data() })));
      });
    };
    getDataPlayer();
    console.log(players);
  }, []);
  return (
    <Wrapper>
      <MenuAppBar />
      <LoadingView>{isLoading && <HashLoader color="white" />}</LoadingView>
      <TableContainer>
        <TableContainer
          sx={{
            border: "1px solid rgba(0,0,0,0.2)",
            width: "max-content",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {players.map((item, index) => (
              <TableRow
                key={item.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{item.username}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.gender}</TableCell>
                <TableCell align="right">{item.total_score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
      ;
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(
      0deg,
      rgba(8, 9, 10, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${leaderboard}) no-repeat center center / cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Leaderboard;
