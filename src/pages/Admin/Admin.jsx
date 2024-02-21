import React from "react";
import instance from "../../config/axios"
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from "react-hot-toast";

function Admin() {
  const [user, setUser] = React.useState({ username: "", password: "" });
  const route = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    console.log(process.env.REACT_APP_API_BASE_URL);
    instance.post("/admin/login",user).then((res)=>{
      Cookies.set("token",res.data.token)
      route("/admin/dashboard",{replace:true})
    }).catch((err)=>{
      toast.error("username or password is wrong")
    })
  };
  return (
    <div className="w-screen text-d h-screen home-design flex justify-center items-center">
      <Toaster/>
      <form onSubmit={handleSubmit} className="w-[400px] flex flex-col h-[300px] backdrop-blur-sm rounded-md p-8 justify-center  border border-a">
        <label className="text-white">Username :</label>
        <input onChange={handleChange} name="username" placeholder="Username" type="text" className="bg-transparent px-2 py-1 border-2 border-b text-d focus:border-a focus:outline-none rounded-md" />
        <label className="text-white mt-3">Password :</label>
        <input onChange={handleChange} name="password" placeholder="Password" type="password" className="bg-transparent px-2 py-1 border-2 border-b text-d focus:border-a focus:outline-none rounded-md" />
        <button className="bg-b self-end px-2 py-1 rounded-md mt-3 text-sm">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
