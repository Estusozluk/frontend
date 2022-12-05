import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import EntryTemplate from '../EntryTemplate/EntryTemplate'
import './Profile.css'
import RequestService from '../../services/RequestService'

const Profile = () => {

  const [data, setData] = useState([]);

  let userid = localStorage.getItem('userId')
  let username = localStorage.getItem('username')
  let follower = localStorage.getItem("follower")
  let following = localStorage.getItem("following")
  let badies = localStorage.getItem("badies")

  useEffect(() => {
    RequestService.get("/api/entry/user/" + userid)
      .then(res => {
        console.log(res.data);
        setData(res.data)
      }
      )
  }, []);


  return (


    <div className='userInformations'>
      <div className='headerInformations'>
        <div className='username'>
          <h1 className='userName'>{username}</h1>
          <div className='otherInformations'>
            
            <p>takipçi: {follower}</p>
            <p>takip edilen: {following}</p>
            <p>badi sayisi: {badies}</p>
          </div>

        </div>
        <div className='userAvatar'>
          <p><CgProfile /></p>
        </div>
      </div>

      <div className='footerInfo'>

        <div className='footerTitle'>
          <h1>girilen entryler</h1>
          <hr className='footerTitleHorizontal'></hr>
        </div>

        <div className='userEntries'>

          {data.map(entry => {
            return <EntryTemplate title={entry.titlename} caption={entry.content} />
          })}
        </div>

      </div>







    </div>
  )
}

export default Profile
