import { useNavigate } from "react-router-dom";

import { useUser } from "hooks/useUser";

const PrivateRoute = ({ children }) => {
  const { isLogged } = useUser();
  const navigate = useNavigate();

  return isLogged ? children : navigate("/");
};

export default PrivateRoute;
