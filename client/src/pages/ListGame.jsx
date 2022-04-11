import React, { useEffect, useState } from "react";
import styled from "styled-components";
import background from "./../images/requirements.png";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { HashLoader } from "react-spinners";
// import batuguntingkertas from "../assets/image1.jpg";
import { Avatar, Button } from "@mui/material";
import { Link } from 'react-router-dom';
// import othergame from "../assets/image2.jpg";
// import MenuAppBar from "../components/Navbar";

function ListGames() {
  const [games, setGames] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const userCollectionRef = collection(db, "games");
  useEffect(() => {
    const getDataGames = async () => {
      const data = await getDocs(userCollectionRef);
      setTimeout(() => {
        setisLoading(false);
        setGames(data.docs.map((doc) => ({ ...doc.data() })));
      });
    };
    getDataGames();
    console.log(games);
  }, []);
  return (
    <Wrapper>
      {isLoading && <HashLoader color="white" />}
      {games.map((item) => {
        return (
          <Card>
            <div key={item.idgames}>
              <AvatarGames>
                {
                  <Avatar
                    alt="Batu Gunting Kertas"
                    src={item.img_url}
                    sx={{ width: 200, height: 200 }}
                    variant="rounded"
                  />
                }
              </AvatarGames>
              <div>
                <h3>{item.name}</h3>
                <h5>{item.description}</h5>
                {/* <Button variant="contained" color="success"> */}
                {/* <a href={item.game_url} style={{textDecoration:"none"}}>
                Play {item.name}
                </a> */}
                {/* <Link to={item.game_url} style={{textDecoration:"none"}} /> */}
                {/* </Button> */}
                <Button component="a" href={item.game_url} variant="contained" color="success">
                Play {item.name}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(8, 9, 10, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${background}) no-repeat center center / cover;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Card = styled.div`
  padding: 2rem;
  background: linear-gradient(35deg, #446dff, #77a9ff);
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25rem;
  border-radius: 1rem;
  color: white;
  h6 {
    font-weight: 300;
  }
`;

const AvatarGames = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10rem;
`;

export default ListGames;