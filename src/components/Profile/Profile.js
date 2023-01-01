import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import RequestService from "../../services/RequestService";
import EntryTemplate from "../EntryTemplate/EntryTemplate";
import "./Profile.css";
import { IoMdSettings } from "react-icons/io";
import SettingsModal from "../Modals/Settings/SettingsModal";

const Profile = () => {
  const [data, setData] = useState([]);

  const [likedArray, setLikedArray] = useState([]);

  const [dislikedArray, setDislikedArray] = useState([]);

  const [settings, setSettings] = useState(false);

  let userid = localStorage.getItem("userId");
  let username = localStorage.getItem("username");
  let follower = localStorage.getItem("follower");
  let following = localStorage.getItem("following");
  let badies = localStorage.getItem("badies");

  const [contentTobeDisplayed, setContentTobeDisplayed] = useState();

  let f1 = localStorage.getItem("followerCount");
  let f2 = localStorage.getItem("followedCount");
  let b1 = localStorage.getItem("badieCount")

  useEffect(() => {

    RequestService.get("api/User/" + username).then(
      res => {
       
        localStorage.setItem("followerCount", res.data.followerCount);
        localStorage.setItem("followedCount", res.data.followedCount);
        localStorage.setItem("badieCount", res.data.badieCount);
       
      }
    )


    RequestService.get("api/entry/user/" + userid).then((res) => {
      
      setData(res.data);
    });

    RequestService.get("api/entry/user/liked/" + userid)
      .then((res) => {
        
        setLikedArray(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });

    RequestService.get("api/entry/user/disliked/" + userid)
      .then((res) => {
       
        setDislikedArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showEnteredEntries = () => {
    setContentTobeDisplayed(
      <div>
        {data.map((entry) => {
          return (
            <EntryTemplate
              entryid={entry.entryid}
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
              delete={true}
            />
          );
        })}
      </div>
    );
  };
  const showLikedEntries = () => {
    setContentTobeDisplayed(
      <div>
        {likedArray.map((entry) => {
          return (
            <EntryTemplate
              entryid={entry.entryid}
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
              delete={false}
            />
          );
        })}
      </div>
    );
  };
  const showDislikedEntries = () => {
    setContentTobeDisplayed(
      <div>
        {dislikedArray.map((entry) => {
          return (
            <EntryTemplate
              entryid={entry.entryid}
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
              delete={false}
            />
          );
        })}
      </div>
    );
  };

  const close = () => {
    setSettings(null);
  };

  const confirm = () => {
    // eklenecek
    // en son olarak çalıştırlacak => setSettings(null);
  };

  return (
    <div className="userInformations">
      {settings && (
        <SettingsModal
          title={settings.title}
          message={settings.message}
          confirm={confirm}
          close={close}
        />
      )}
      <div className="headerInformations">
        <div className="username">
          <h1 className="userName">
            {username}{" "}
            <div
              className="settings"
              onClick={() => {
                setSettings({
                  title: "Alanları Doldurunuz",
                });
              }}
            >
              Bilgileri Güncelle
            </div>
          </h1>

          <div className="otherInformations">
            <p>takipçi: {f1}</p>
            <p>takip edilen: {f2}</p>
            <p>badi sayisi: {b1}</p>
          </div>
        </div>
        
      </div>

      <div className="footerInfo">
        <div onClick={showEnteredEntries} className="footerTitle">
          <h2>girilen entryler</h2>
          <hr className="footerTitleHorizontal"></hr>
        </div>
        <div onClick={showLikedEntries} className="footerTitle">
          <h2>Beğenilen entryler</h2>
          <hr className="footerTitleHorizontal"></hr>
        </div>
        <div onClick={showDislikedEntries} className="footerTitle">
          <h2>Begenilmeyen entryler</h2>
          <hr className="footerTitleHorizontal"></hr>
        </div>
      </div>
      {contentTobeDisplayed}
    </div>
  );
};

export default Profile;
