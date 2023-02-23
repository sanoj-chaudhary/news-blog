import React, { useState } from 'react'
import { newsLetterSubscribe } from '../../http/auth-apis'
const Index = () => {
const [email, setEmail] = useState('');
  const subscribe = async (e)=>{
    e.preventDefault()
  
    try {
      const res = await newsLetterSubscribe({"emailid":email})
      if(res.data.bool){
        alert('Thanks for Subscribe')
        setEmail('')
      }
    
    } catch (error) {
      console.log("Message:", error.message)  
    }
  }

  return (
    <div className="card-wrapper px-0 py-4">
      <form onSubmit={(e)=>subscribe(e)} >
       
          <legend className="scheduler-border text-center mt-0">Sign up for the Newsletter</legend>
          <div className="pb-5 text-center">
            <h2>This week in Asia</h2>
            <p>Catch up on our coverage of the region, all in one place.</p>
            <div className="controls bootstrap-timepicker">
              <input required type="email" className="email" name="email"
                placeholder="Enter your email address" onChange={(e)=>setEmail(e.target.value)} value={email} />
              <button type="submit" className='ms-1'> Subscribe</button>
            </div>
          </div>
       
      </form>

    </div>
  )
}

export default Index