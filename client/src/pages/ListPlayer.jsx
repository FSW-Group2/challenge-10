import React, { useEffect, useState } from "react";
import styled from "styled-components";
import background from "./../images/requirements.png";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { HashLoader } from "react-spinners";
import male from "../images/male.png";
import { Avatar } from "@mui/material";
import female from "../images/female.png";
import MenuAppBar from "../components/Navbar";

function ListPlayer() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    const getDataPlayer = async () => {
      const data = await getDocs(userCollectionRef);
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
      {isLoading && <HashLoader color="white" />}
      {players.map((item) => {
        return (
          <Card>
            <div key={item.uid}>
              <AvatarPlayer>
                {item.gender === "Men" && (
                  <Avatar
                    alt="male"
                    src={male}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
                {item.gender === "Women" && (
                  <Avatar
                    alt="female"
                    src={female}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
              </AvatarPlayer>
              <div>
                <h3>{item.username}</h3>
                <h6>{item.email}</h6>
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
  background: linear-gradient(35deg, #ff6644, #ff9c77);
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 15rem;
  border-radius: 1rem;
  color: white;
  h6 {
    font-weight: 300;
  }
`;

const AvatarPlayer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10rem;
`;

export default ListPlayer;