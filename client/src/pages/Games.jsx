import styled from "styled-components";
import Play from "../components/Play";
import MenuAppBar from "../components/Navbar";
import games from "./../images/games.jpg";

function Games() {
  return (
    <>
      <MenuAppBar />
      <Wrapper>
        <Play />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(
      0deg,
      rgba(8, 9, 10, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${games}) no-repeat center center / cover;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10rem;
  align-items: center;
  /* padding: 5rem 0rem; */
`;

// - Scissors Gradient: hsl(39, 89%, 49%) to hsl(40, 84%, 53%)
// - Paper Gradient: hsl(230, 89%, 62%) to hsl(230, 89%, 65%)
// - Rock Gradient: hsl(349, 71%, 52%) to hsl(349, 70%, 56%)

export default Games;
