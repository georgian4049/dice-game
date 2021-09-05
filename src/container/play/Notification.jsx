import React from "react";
import Box from "../../components/box";
import Dialog from "../../components/dialog";
import { GrFormNextLink } from "react-icons/gr";
import Logo from "../../components/customIcons/logo/Logo";

const Notification = ({ type, playerName, handleCancel }) => {
  if (type === "win") {
    return (
      <Dialog cancelOption={true} handleCancel={handleCancel}>
        <IconBox>
          <Logo />
        </IconBox>
        <Box textAlign="center" color="green">
          {`${playerName} has won the game, congratulations!`}
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <IconBox>
        <GrFormNextLink fontSize={80} />
      </IconBox>
      <Box contentType="flexCenter">
        {`Next turn is of ${playerName}. Click when ready`}
      </Box>
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
