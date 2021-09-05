import { AiOutlineTrophy } from "react-icons/ai";
import { IoDice } from "react-icons/io5";
import "./styles/index.css";

const Logo = () => {
  return (
    <div className="win-icon">
      <div className="dice-icon">
        <IoDice />
      </div>
      <div className="trophy-icon">
        <AiOutlineTrophy />
      </div>
    </div>
  );
};

export default Logo;
