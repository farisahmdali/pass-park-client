import React, { useState } from 'react'
import OnBoarding from './OnBoarding'
import Bookings from './Bookings'

function AdminDashbard() {
    const [state,setState] = useState("booking")
  return (
    <div>
        <div className='fixed h-screen bg-a w-[250px] top-0 left-0 p-2'>
            <h1 className='text-white font-bold text-xl text-center'>PASSPARK</h1>
            <button onClick={()=>setState("onb")} className={'w-full hover:bg-b text-left shadow-md px-2 py-1 duration-100 border-b transition-all text-white mt-20 rounded-md ' + (state==="onb" ? "bg-b" : null)}>On Booarding</button>
            <button onClick={()=>setState("booking")}  className={'w-full hover:bg-b text-left shadow-md px-2 py-1 duration-100 border-b transition-all text-white mt-20 rounded-md '+ (state==="booking" ? "bg-b" : null)}>Bookings</button>
            <button onClick={()=>setState("user")} className={'w-full hover:bg-b text-left shadow-md px-2 py-1 duration-100 border-b transition-all text-white mt-20 rounded-md '+ (state==="user" ? "bg-b" : null)}>Users</button>
        </div>
        <div className='ms-[250px]'>
            {state==="onb" && <OnBoarding onClose={()=>setState("booking")}/>}
            {state==="booking" && <Bookings/>}
        </div>
    </div>
  )
}

export default AdminDashbard