import { auth } from "./../config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
function AuthMiddleware(props) {
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
    });
  }, []);
  return <div>{props.children}</div>;
}

export default AuthMiddleware;
