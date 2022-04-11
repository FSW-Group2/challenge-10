import React, { useEffect, useState } from "react";
import styled from "styled-components";
import refreshimg from "../images/refresh.svg";
import kertas from "../images/icon-paper.svg";
import batu from "../images/icon-rock.svg";
import gunting from "../images/icon-scissors.svg";
import { Modal, Box, Typography } from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const Play = () => {
  const [computer, setComputer] = useState("");
  const [score, setScore] = useState(0);
  const [choise, setChoise] = useState("");
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(true);
  const [result, setResult] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setMyChoise = (value) => {
    setChoise(value);
    setRound(round + 1);
    computerRandom();
    if (round === 2) {
      setActive(false);
      setRefresh(true);
    }
  };

  const computerRandom = () => {
    const choises = ["rock", "paper", "scissor"];
    setComputer(choises[Math.floor(Math.random() * choises.length)]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleRefresh = async (id) => {
    const userDoc = doc(db, "users", id);
    const docSnap = await getDoc(userDoc);
    const currentScore = docSnap.data().total_score;
    const newScore = { total_score: currentScore + score };
    await updateDoc(userDoc, newScore);
    setChoise("");
    setScore(0);
    setRound(0);
    setActive(true);
    setComputer("");
    setResult("");
    setRefresh(false);
  };

  const Result = async () => {
    switch (choise + computer) {
      case "scissorpaper":
      case "rockscissor":
      case "paperrock":
        setResult("YOU WIN!");
        setScore(score + 1);
        break;
      case "paperscissor":
      case "scissorrock":
      case "rockpaper":
        setResult("YOU LOSE!");
        setScore(score - 1);
        break;
      case "paperpaper":
      case "scissorscissor":
      case "rockrock":
        setResult("DRAW");
        break;
    }
  };

  useEffect(() => {
    Result();
  }, [computer, choise]);

  return (
    <Wrapper>
      <Played>
        <Player>
          <h5>You Pick</h5>
          {choise === "paper" && (
            <IconChoise>
              <img src={kertas} alt="kertas" />
            </IconChoise>
          )}
          {choise === "rock" && (
            <IconChoise>
              <img src={batu} alt="batu" />
            </IconChoise>
          )}
          {choise === "scissor" && (
            <IconChoise>
              <img src={gunting} alt="gunting" />
            </IconChoise>
          )}
        </Player>
        <Computer>
          <h5>Computer Pick</h5>
          <div>
            {computer === "paper" && (
              <IconChoise>
                <img src={kertas} alt="kertas" />
              </IconChoise>
            )}
            {computer === "rock" && (
              <IconChoise>
                <img src={batu} alt="batu" />
              </IconChoise>
            )}
            {computer === "scissor" && (
              <IconChoise>
                <img src={gunting} alt="gunting" />
              </IconChoise>
            )}
          </div>
        </Computer>
      </Played>
      {refresh && (
        <div onClick={() => handleRefresh(auth.currentUser.uid)}>
          <img src={refreshimg} alt="refresh" />
        </div>
      )}

      <div>
        <h1>{result}</h1>
        <Point>
          <Round>
            <span>Round</span>
            <div>{round}</div>
          </Round>
          <Round>
            <span>Score</span>
            <div>{score}</div>{" "}
          </Round>
        </Point>
      </div>

      <Picked>
        {active ? (
          <ChoiseFirst>
            <IconChoise onClick={() => setMyChoise("paper")}>
              <img src={kertas} alt="kertas" />
            </IconChoise>

            <IconChoise onClick={() => setMyChoise("rock")}>
              <img src={batu} alt="batu" />
            </IconChoise>

            <IconChoise onClick={() => setMyChoise("scissor")}>
              <img src={gunting} alt="gunting" />
            </IconChoise>
          </ChoiseFirst>
        ) : (
          <Choise>
            <IconChoise data-id="paper">
              <img src={kertas} alt="kertas" />
            </IconChoise>

            <IconChoise data-id="paper">
              <img src={batu} alt="batu" />
            </IconChoise>

            <IconChoise data-id="paper">
              <img src={gunting} alt="gunting" />
            </IconChoise>
          </Choise>
        )}
      </Picked>

      <ButtonNav onClick={handleOpen}>Rules Games</ButtonNav>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rules Rock Scissor Paper Games
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>1. Permainan berlangsung dalam 3 ronde</div>
            <div>2. Jika menang mendapatkan 1 poin</div>
            <div>3. Jika kalah kehilangan 1 poin</div>
            <div>
              4. Jika permainan telah selesai, klik refresh untuk mendapatkan
              score di leaderboard dan mulai game kembali
            </div>
          </Typography>
        </Box>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
  width: 100%;
  justify-content: space-around;
  color: #519cbf;
  cursor: pointer;
`;

const Picked = styled.div`
  position: absolute;
  left: 5rem;
  bottom: 2rem;
  color: white;
  border: solid 1px white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

const Choise = styled.div`
  cursor: not-allowed;
  display: flex;
  gap: 2rem;
`;

const ChoiseFirst = styled.div`
  display: flex;
  gap: 2rem;
`;

const Played = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
  align-items: center;
`;

const IconChoise = styled.div`
  background: white;
  border: solid 10px #519cbf;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Computer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 10rem;
  top: 19rem;
  border: solid 2px wheat;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const Player = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 10rem;
  top: 19rem;
  border: solid 2px #519cbf;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const Point = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

const ButtonNav = styled.div`
  position: absolute;
  right: 5rem;
  bottom: 2rem;
  color: white;
  border: solid 1px white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

const Round = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border-radius: 10px;
  span {
    font-size: 1rem;
  }
`;

export default Play;
