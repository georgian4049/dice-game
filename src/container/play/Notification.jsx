import PropTypes from "prop-types";
import Box from "../../components/box";
import Dialog from "../../components/dialog";
import { GrFormNextLink } from "react-icons/gr";
import Logo from "../../components/customIcons/logo/Logo";
import { useHistory } from "react-router-dom";

const Notification = ({ info, handleCancel }) => {
  const history = useHistory();
  if (info.type === "win") {
    return (
      <Dialog cancelOption={true} handleCancel={handleCancel}>
        <IconBox>
          <Logo />
        </IconBox>
        <Box textAlign="center" color="green">
          {info.primary}
          <br />
          <br />
          {info.secondary.map((_info, index) => (
            <div key={index}>{_info}</div>
          ))}
        </Box>
      </Dialog>
    );
  } else if (info.type === "next") {
    return (
      <NextPlayerBody handleCancel={handleCancel} iconColor="green">
        {" "}
        <Box width="100%">
          <Box width="100%">
            {" "}
            <b>Last Player : </b> {info.lastPlayer?.userName} scored{" "}
            {
              info.lastPlayer?.scoreOrder[
                info.lastPlayer?.scoreOrder.length - 1
              ]
            }
            {" points "}
          </Box>
          <br />
          {info?.playersWithPenalty?.length ? (
            <>
              <Box width="100%" textAlign="center">
                <Box width="100%">
                  Players with penalty are skipped of their turn, they are
                  mentioned below
                </Box>
                <Box>
                  {" "}
                  <ul>
                    {info.playersWithPenalty.map((player, index) => (
                      <li key={index}>{player} </li>
                    ))}{" "}
                  </ul>
                </Box>
              </Box>
            </>
          ) : (
            ""
          )}
          <Box width="100%" contentType="flexCenter">
            <b>Next Turn : </b> {info.nextPlayer}
          </Box>
        </Box>
      </NextPlayerBody>
    );
  } else if (info.type === "reRoll") {
    return (
      <NextPlayerBody handleCancel={handleCancel}>
        <Box width="100%" textAlign="center" color="green">
          {info.primary}
        </Box>
      </NextPlayerBody>
    );
  }
  return (
    <Dialog cancelOption={true} handleCancel={handleCancel}>
      <IconBox>
        <Logo />
      </IconBox>
      <Box textAlign="center" color="green">
        Game Over!
        <br />
        <Box>Top Three Winners:</Box>
        <Box>
          {info.topThreeWinners.map((_info, index) => (
            <div key={index}>{_info.userName}</div>
          ))}
        </Box>
        <Box>Last winner: {info.lastWinner.userName}</Box>
        <div className="footer">
          <button onClick={() => history.push("/home")}>Play Again!</button>
        </div>
      </Box>
    </Dialog>
  );
};

const NextPlayerBody = ({ children, handleCancel, iconColor }) => {
  return (
    <Dialog>
      <IconBox>
        <GrFormNextLink fontSize={80} color={iconColor} />
      </IconBox>
      {children}
      <div className="footer">
        <button onClick={() => handleCancel()}>I am Ready!</button>
      </div>
    </Dialog>
  );
};

const IconBox = ({ children }) => {
  return <Box contentType="flexCenter">{children}</Box>;
};

Notification.propTypes = {
  info: PropTypes.object,
  handleCancel: PropTypes.func,
};

Notification.defaultProps = {
  info: {},
  handleCancel: () => {},
};

NextPlayerBody.propTypes = {
  children: PropTypes.any,
  handleCancel: PropTypes.func,
  iconColor: PropTypes.string,
};
NextPlayerBody.defaultProps = {
  handleCancel: () => {},
  iconColor: "",
};

IconBox.propTypes = {
  children: PropTypes.any,
};

export default Notification;
