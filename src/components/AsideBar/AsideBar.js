import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import RequestService from '../../services/RequestService'
import TitlePageTemplate from '../TitlePageTemplate/TitlePageTemplate'
import './Aside.css'

const AsideBar = () => {


    const [titlesArray, setTitlesArray] = useState([])


    useEffect(() => {



        RequestService.get("api/title/titles").then(
            res => {
                console.log(res)
                setTitlesArray(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )



    }, [])

    const navigate = useNavigate();
   
    

  return (
    <div className='gundem'>

        <div className='gundemTitle'>Gündem</div>
      <ul className='gundemler'>

      {titlesArray.map(entry => {
                return (
                    <li onClick={() => navigate('/titlePage', {state: {title: entry}})}>
                        <p>{entry}</p>
                    </li>
                )
            })}

      </ul>
    </div>
  )
}

export default AsideBar
