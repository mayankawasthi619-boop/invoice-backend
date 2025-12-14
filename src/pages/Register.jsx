import React, {useState} from 'react'
import axios from 'axios'

export default function Register(){
  const [form, setForm] = useState({name:'',email:'',phone:''})
  const [msg, setMsg] = useState('')
  const submit = async e => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, form)
      setMsg('Saved: ' + res.data._id)
    }catch(err){
      setMsg('Error: ' + (err.response?.data?.message || err.message))
    }
  }
  return (
    <div>
      <h2>Registration</h2>
      <form className="form" onSubmit={submit}>
        <label>Name<br/><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><br/>
        <label>Email<br/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label><br/>
        <label>Phone<br/><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></label><br/>
        <button type="submit">Save</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
