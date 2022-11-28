import axios from 'axios'
import React, { useEffect } from 'react'
import EntryTemplate from '../EntryTemplate/EntryTemplate'
import './LandingPage.css'



const LandingPage = () => {

  return (

        <div className='entries'>
        <EntryTemplate title={"dunya kupasi"} caption={"4 yilda bir oynanan kupa"} user={"Ardi Jorganxhi"} date={"26.11.2022"}/>
        <EntryTemplate title={"yapay zeka"} caption={"gelişmekte olan teknoloji"} user={"Rüştü Efe Uzun"} date={"20.10.2022"}/>
        <EntryTemplate title={"disney plus"} caption={"türkiye ye yeni gelmiş yayın platformudur, kısa sürede çok fazla kullanıcıya ulaştı"} user={"Sefa Salim Bozdağ"} date={"15.11.2022"}/>
        <EntryTemplate title={"dunya kupasi"} caption={"4 yilda bir oynanan kupa"} user={"Ardi Jorganxhi"} date={"26.11.2022"}/>
        <EntryTemplate title={"dunya kupasi"} caption={"4 yilda bir oynanan kupa"} user={"Ardi Jorganxhi"} date={"26.11.2022"}/>
        </div>
   
  )
}

export default LandingPage
