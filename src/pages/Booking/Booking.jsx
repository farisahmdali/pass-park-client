import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../config/context";
import instance from "../../config/axios";
import  { Toaster, toast } from "react-hot-toast"

function Booking() {
  const { state, setState } = useContext(UserContext);
  const [dropDown, setDropDown] = useState();
  const [userDetails,setUserDetails] = useState(state)
  const [slots, setSlots] = useState([]);
  const [book, setBook] = useState();
  const getPlaces = () => {
    instance.get("/placesDrop").then((res) => {
      setDropDown(res.data);
      console.log(res.data);
    }).catch((err)=>console.log(err))
  };
  useEffect(() => {
    getPlaces();
  }, []);
  console.log(state);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const bookingChange = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const getSlots = () => {
    instance
      .get("/availableSlots", { params: { area: state?.area } })
      .then((res) => {
        setSlots(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSlots();
  }, [state?.area]);

  const bookTheSlot = (e)=>{
    e.preventDefault()
    let bookToken = {...userDetails}
    bookToken.floorNumber = book.floorNumber
    bookToken.slot = book.tokens.pop()
    bookToken.type = book.type
    bookToken.placeId = book.placeId
    instance.post("/bookTheSlot",bookToken).then(()=>{
      toast.success("Your Slot is Booked. Please check your mail")
      setBook()
      getSlots()
      setUserDetails()
    }).catch(()=>{
      toast.error("Sorry Your Car is Already Booked")
    })
  }

  return (
    <div className="slot-bg ">
      <Toaster/>
      <div className="w-full min-h-screen bg-[#ffffff00]">
        <div className="w-full  backdrop-blur-md flex flex-wrap gap-3  p-3">
          <div>
            {/* <label className="text-white">Select Parking Area :</label> */}
            <select onChange={handleChange} name="area" id="" value={state?.area} className="bg-transparent px-2 py-1 border-2 border-b text-white focus:border-a focus:outline-none rounded-md">
              <option className="text-black" value="">
                Select Parking Places
              </option>
              {dropDown?.locations?.map((x) => (
                <option className="text-black" value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 p-3 gap-3">
          {slots?.map((x) => (
            <div className={" rounded-lg overflow-hidden shadow-md " + (x?.tokens?.length<=0 ? " bg-red-500" : " bg-gray-100")}>
              <div className="p-6">
                <h1 className="text-sm font-bold">Size: {x?.type}</h1>
                <h2 className="text-lg font-bold">Total Slots: {x?.totalSlots}</h2>
                <h3 className="text-lg font-bold">Slots Left: {x?.tokens?.length}</h3>
                <h2 className="text-lg font-bold">Floor Number: {x?.floorNumber}</h2>
              </div>
              <button onClick={() =>{
                 if(x?.tokens?.length>0){
                   setBook(x)
                  }
                 }} className="w-full bg-blue-500 hover:bg-blue-700 duration-100 transition-all text-white font-bold py-2 px-4">
             { x?.tokens?.length<=0 ? " Sorry Its Full!" : " Book"}
              </button>
            </div>
          ))}
        </div>
      </div>
      {book && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#2e2e2e7c] flex items-center justify-center">
          <button className="bg-red-500 text-white fixed top-3 left-3 px-3 py-1 rounded-md hover:bg-red-700 duration-150 transition-all" onClick={() => setBook(false)}>
            Close
          </button>
          <form onSubmit={bookTheSlot} className="bg-white w-[400px] p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Booking Form</h2>
            <div className="flex flex-col gap-4">
              <label htmlFor="phoneNumber" className="font-semibold">
                Phone Number
              </label>
              <input onChange={bookingChange} id="phoneNumber" value={userDetails?.number} name="number" type="text" placeholder="Enter your phone number" className="border px-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />

              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input onChange={bookingChange} id="name" type="text" value={userDetails?.driver} name="driver" placeholder="Enter your name" className="border border-gray-300 px-2 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />

              <label htmlFor="carNumber" className="font-semibold">
                Car Registration Number
              </label>
              <input onChange={bookingChange} id="carNumber" type="text" value={userDetails?.car} name="car"  placeholder="Enter your car registration number" className="border px-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />

              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input onChange={bookingChange} id="email" type="email" value={userDetails?.email} name="email"  placeholder="Enter your email" className="border px-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />
            </div>
            <button onClick={()=>console.log({...userDetails,...book})} className="mt-6  bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Booking;
