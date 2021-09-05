import { Link } from "react-router-dom";
import Box from "../../components/box";

const WrongPage = () => {
  return (
    <Box height="100%" width="100%">
      <Box textAlign="center">
        <h1>404!</h1>
        <br />
        It seems you are on wrong page! <Link to="/home">Click here! </Link>to
        go on home page and play the game
      </Box>
    </Box>
  );
};

export default WrongPage;
