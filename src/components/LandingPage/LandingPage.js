import axios from "axios";
import React, { useEffect, useState } from "react";
import EntryTemplate from "../EntryTemplate/EntryTemplate";
import "./LandingPage.css";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

const LandingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5000/api/entry/landing").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className="entries">
      {data.map((entry) => {
        return (
          <EntryTemplate
            title={entry.value.titleData.titlename}
            caption={entry.value.titleData.content}
            user={entry.value.titleData.username}
            date={entry.value.titleData.writedate}
          />
        );
      })}
    </div>
  );
};

export default LandingPage;
