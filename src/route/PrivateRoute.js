import { useEffect } from "react"
import { Route, Redirect, useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;
  const history = useHistory()
  useEffect(() => {
    history.push("/home")
  }, [])
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

export default PrivateRoute;
