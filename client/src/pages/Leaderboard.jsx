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
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import MenuAppBar from "../components/Navbar";
import leaderboard from "../images/leaderboard.jpg";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const lead = useSelector((state) => state.lead);
  const [isLoading, setisLoading] = useState(true);
  return (
    <Wrapper>
      <MenuAppBar />
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
            {lead.map((item, index) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{item.username}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.gender}</TableCell>
                <TableCell align="right">{item.score}</TableCell>
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
