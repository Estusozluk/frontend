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

  useEffect(() => {
    RequestService.get("api/entry/user/" + userid).then((res) => {
      setData(res.data);
    });

    RequestService.get("api/entry/user/liked/" + userid)
      .then((res) => {
        console.log(res);
        setLikedArray(res.data);
        console.log(likedArray);
      })
      .catch((err) => {
        console.log(err);
      });

    RequestService.get("api/entry/user/disliked/" + userid)
      .then((res) => {
        console.log(res);
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
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
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
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
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
              title={entry.titlename}
              caption={entry.content}
              date={entry.writedate}
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
