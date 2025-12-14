import React, {useState} from 'react'
import axios from 'axios'

export default function Invoice(){
  const [customer, setCustomer] = useState({name:'',email:''})
  const [items, setItems] = useState([{desc:'',qty:1,price:0}])
  const [msg,setMsg]=useState('')

  const addItem = ()=> setItems([...items,{desc:'',qty:1,price:0}])
  const updateItem = (i, field, value)=> {
    const copy = [...items]; copy[i][field]=value; setItems(copy)
  }
  const removeItem = i=> setItems(items.filter((_,idx)=>idx!==i))
  const subtotal = items.reduce((s,it)=> s + (Number(it.qty)||0)*(Number(it.price)||0), 0)
  const tax = +(subtotal * 0.18).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  const save = async ()=>{
    try{
      const payload = {customer, items, subtotal, tax, total, date: new Date()}
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/invoices`, payload)
      setMsg('Saved invoice id: ' + res.data._id)
    }catch(err){
      setMsg('Error saving invoice')
    }
  }

  return (
    <div>
      <h2>Invoice Generator</h2>
      <div>
        <label>Customer Name<br/><input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/></label>
        <label>Email<br/><input value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})}/></label>
      </div>
      <hr/>
      <h3>Items</h3>
      {items.map((it,i)=>(
        <div className="item-row" key={i}>
          <input placeholder="Description" value={it.desc} onChange={e=>updateItem(i,'desc',e.target.value)} />
          <input type="number" min="0" style={{width:80}} value={it.qty} onChange={e=>updateItem(i,'qty',e.target.value)} />
          <input type="number" min="0" style={{width:120}} value={it.price} onChange={e=>updateItem(i,'price',e.target.value)} />
          <button type="button" onClick={()=>removeItem(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addItem}>Add item</button>
      <hr/>
      <p>Subtotal: {subtotal}</p>
      <p>Tax (18%): {tax}</p>
      <p><strong>Total: {total}</strong></p>
      <button onClick={save}>Save Invoice</button>
      <p>{msg}</p>
    </div>
  )
}
