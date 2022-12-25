import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import EntryTemplate from "../EntryTemplate/EntryTemplate";
import "./Profile.css";

const Profile = () => {
  const [data, setData] = useState([]);

  let userid = localStorage.getItem("userId");
  let username = localStorage.getItem("username");
  let follower = localStorage.getItem("follower");
  let following = localStorage.getItem("following");
  let badies = localStorage.getItem("badies");

  const [contentTobeDisplayed, setContentTobeDisplayed] = useState();

  useEffect(() => {
    axios.get("https://localhost:5000/api/entry/user/" + userid).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const showEnteredEntries = () => {
    setContentTobeDisplayed(
      <div>
        {data.map((entry) => {
          return (
            <EntryTemplate title={entry.titlename} caption={entry.content} />
          );
        })}
      </div>
    );
  };
  const showLikedEntries = () => {
    setContentTobeDisplayed(
      <div>
        <EntryTemplate
          title={"Liked Entryyy"}
          caption="Gandalf Dumbledora tek atar"
        />
      </div>
    );
  };
  const showDislikedEntries = () => {
    setContentTobeDisplayed(
      <div>
        <EntryTemplate
          title={"Disliked Entryyy"}
          caption="Harry Potter > Lord of The Rings"
        />
      </div>
    );
  };

  return (
    <div className="userInformations">
      <div className="headerInformations">
        <div className="username">
          <h1 className="userName">{username}</h1>
          <div className="otherInformations">
            <p>takipçi: {follower}</p>
            <p>takip edilen: {following}</p>
            <p>badi sayisi: {badies}</p>
          </div>
        </div>
        <div className="userAvatar">
          <p>
            <CgProfile />
          </p>
        </div>
      </div>

      <div className="footerInfo">
        <div onClick={showEnteredEntries} className="footerTitle">
          <h1>girilen entryler</h1>
          <hr className="footerTitleHorizontal"></hr>
        </div>
        <div onClick={showLikedEntries} className="footerTitle">
          <h1>Beğenilen entryler</h1>
          <hr className="footerTitleHorizontal"></hr>
        </div>
        <div onClick={showDislikedEntries} className="footerTitle">
          <h1>girilen entryler</h1>
          <hr className="footerTitleHorizontal"></hr>
        </div>
      </div>
      {contentTobeDisplayed}
    </div>
  );
};

export default Profile;
