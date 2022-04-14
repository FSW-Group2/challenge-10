import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AuthMiddleware(props) {
  let navigate = useNavigate();
  const token = localStorage.getItem("user");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  return <div>{props.children}</div>;
}

export default AuthMiddleware;
