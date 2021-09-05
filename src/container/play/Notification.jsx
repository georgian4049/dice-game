import React from "react";
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
          {info.secondary.map((_info) => (
            <div>{_info}</div>
          ))}
        </Box>
      </Dialog>
    );
  } else if (info.type === "next") {
    return (
      <NextPlayerBody handleCancel={handleCancel} iconColor="green">
        {" "}
        <Box width="100%">
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
          <Box>
            <b>Next Turn: </b> {info.nextPlayer}
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
        <Box>Winners:</Box>
        <Box>
          {info.topThreeWinners.map((_info) => (
            <div>{_info.userName}</div>
          ))}
        </Box>
        <Box>Last winner:</Box>
        <Box>{info.lastWinner.userName}</Box>
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

export default Notification;