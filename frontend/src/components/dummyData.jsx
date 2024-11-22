import { useEffect, useState } from "react";
import axios from "axios";
const GetDummyData = (props) => {
  const [data, setData] = useState({});
  useEffect((effect) => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {props["kidda"]}
      <br />
      {data.sayHello}
    </div>
  );
};
export default GetDummyData;
