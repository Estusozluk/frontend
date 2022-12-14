import axios from "axios";
import React, { useEffect, useState } from "react";
import EntryTemplate from "../EntryTemplate/EntryTemplate";
import "./LandingPage.css";

const LandingPage = () => {
  const [data, setData] = useState([]);

  const [likedDisliked, setLikedDisliked] = useState(false);

  useEffect(() => {
    axios.get("https://localhost:5001/api/entry/landing").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [likedDisliked]);

  return (
    <div className="entries">
      {data.map((entry) => {
        return (
          <EntryTemplate
          entryid ={entry.value.titleData.entryid}
            title={entry.value.titleData.titlename}
            caption={entry.value.titleData.content}
            user={entry.value.titleData.username}
            date={entry.value.titleData.writedate}
            likes = {entry.value.likeCount}
            dislikes= {entry.value.dislikeCount}
            
          />
        );
      })}
    </div>
  );
};

export default LandingPage;
