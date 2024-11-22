import { useState } from "react";
const ClickMe = () => {
  let [count, setCount] = useState({ currentCount: 0 });
  const handlePlus = () => {
    setCount((prevCount) => {
      return { ...prevCount, currentCount: prevCount.currentCount + 1 };
    });
  };
  const handleMinus = () => {
    setCount((prevCount) => {
      return { ...prevCount, currentCount: prevCount.currentCount - 1 };
    });
  };
  return (
    <>
      <br />
      <h1>{count["currentCount"]}</h1>{" "}
      <div className="count-div">
        <button onClick={handleMinus}>- </button>
        <button onClick={handlePlus}> +</button>
      </div>
    </>
  );
};
export default ClickMe;
