import React, {useState} from 'react'
import axios from 'axios'

export default function Feedback(){
  const [text,setText]=useState('')
  const [msg,setMsg]=useState('')
  const send = async e=>{
    e.preventDefault()
    try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`,{text})
      setMsg('Thanks for feedback')
      setText('')
    }catch(err){ setMsg('Error') }
  }
  return (
    <div>
      <h2>Feedback</h2>
      <form onSubmit={send} className="form">
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} style={{width:'100%'}} required/>
        <button type="submit">Send</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
