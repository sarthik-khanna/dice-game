import styled from "styled-components";
import TotalScore from './TotalScore';
import NumberSelector from './NumberSelector';
import RoleDice from "./RoleDice";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/button";
import Rules from "./Rules";

const GamePlay = () => {
    const [score,setScore] = useState(0);
    const [selectedNumber , setSelectedNumber] = useState(); 
    const [currentDice,setCurrentDice] = useState(1);
    const [error,setError]  = useState();
    const [ShowRules,setShowRules]= useState(false);

    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random()* (max - min) + min);
    };
    const roleDice = () =>{
      if(!selectedNumber) {
        setError("You have not selected any number");
        return;
      }
      const randomNumber= generateRandomNumber(1,7);
      setCurrentDice((prev) => randomNumber);

      if(selectedNumber==randomNumber){
        setScore((prev) => prev  + randomNumber);
      }else{
        setScore((prev)=> prev - 2);
      }
      setSelectedNumber(undefined);
    };
const resetScore=()=>{
  setScore(0);
}
  return (
    <MainContainer>
    <div className='top_section'>
    <TotalScore score={score}/>
    <NumberSelector  setError={setError} error={error}  selectedNumber={selectedNumber}
    setSelectedNumber={setSelectedNumber}/>
    </div>
    <RoleDice currentDice={currentDice} roleDice={roleDice}/>
    <div className="btns">
      <OutlineButton 
      onClick={resetScore}
      >RESET</OutlineButton>
      <Button onClick={()=> setShowRules((prev)=> !prev)} > {ShowRules ? "Hide" : "Show"} Rules</Button>
    </div>
    { ShowRules && <Rules/>}
    </MainContainer>
  );
};
export default GamePlay;

const MainContainer = styled.main`
padding-top:70px;
.top_section{
    display:flex;
    justify-content:space-around;
    align-items:end;
}
.btns{
  margin-top:40px;
  gap:10px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center; 
  gap:10px;
}
`;