import React from 'react'
import {CgProfile} from 'react-icons/cg'
import EntryTemplate from '../EntryTemplate/EntryTemplate'
import './Profile.css'

const Profile = () => {

 
  return (
  

        <div className='userInformations'>
          <div className='headerInformations'>
           <div className='username'>
          <h1 className='userName'>ardi jorganxhi</h1>
          <div className='otherInformations'>
            <p>entry sayisi: 0</p>
            <p>takipçi: 0</p>
            <p>takip edilen: 0</p>
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

            <EntryTemplate title={"dunya kupasi"} caption={"4 yilda bir oynanan kupa"} />
          </div>
          
          </div>

       
           
       


      
    </div>
  )
}

export default Profile
