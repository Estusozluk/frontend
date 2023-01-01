import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestService from "../../services/RequestService";
import EntryTemplate from "../EntryTemplate/EntryTemplate";
import "./LandingPage.css";

const LandingPage = () => {
  const [data, setData] = useState([]);

  const [likedDisliked, setLikedDisliked] = useState(false);

  useEffect(() => {
   RequestService.get("api/title/landing").then(
    res => {
      console.log(res.data)
      setData(res.data)
    }
   ).catch(
    err => {
      console.log(err)
    }
   )
  }, [likedDisliked]);

  return (
    <div className="entries">
      {data.map((entry) => {
        return (
          <EntryTemplate
          entryid ={entry.value.entryid}
            title={entry.value.titlename}
            caption={entry.value.content}
            user={entry.value.username}
            date={entry.value.writedate}
            likes = {entry.value.likeCount}
            dislikes= {entry.value.dislikeCount}
            
          />
        );
      })}
    </div>
  );
};

export default LandingPage;
