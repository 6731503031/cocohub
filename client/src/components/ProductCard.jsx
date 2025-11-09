import React, {useEffect, useState} from 'react'
import { fetchVarieties } from '../api'
import { Link } from 'react-router-dom'

export default function VarietyList(){
  const [list,setList] = useState([])
  useEffect(()=>{fetchVarieties().then(setList)},[])
  return (
    <div className="variety-list">
      {list.map(v=> (
        <div key={v.id} className="card">
          <img className="resp" src={v.image_urls[0]} alt={v.thai_name} />
          <h3>{v.thai_name}</h3>
          <p>{v.description}</p>
          <Link to={`/varieties/${v.id}`}>ดูรายละเอียด</Link>
        </div>
      ))}
    </div>
  )
}
