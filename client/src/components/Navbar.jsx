import React from 'react'
import aceit_transparent from "../assets/aceit_transparent.png"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"


const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>

        <Link to="/"> 
            <img className=" scale-75 hover:scale-90 transition duration-300"src={aceit_transparent} alt="Logo" width={110} height={15} loading="lazy"/>
        </Link>

        <nav>
            <ul className='text-richblack-100 flex gap-x-6 ml-[132px]'>
                <li className=" text-xl hover:scale-110 transition duration-300">
                    <Link to="/">Home</Link>
                </li>
                <li className=" text-xl hover:scale-110 transition duration-300">
                    <Link to="/about">About</Link>
                </li>
                {/* <li className=" text-xl hover:scale-110 transition duration-300">
                    <Link to="/contact">Contact</Link>
                </li> */}
            </ul>
        </nav>

        {/* Login - SignUp - LogOut - Dashboard */}
        <div className='flex items-center gap-x-4'>
            { !isLoggedIn &&
                <Link to="/user/login">
                    <button className='text-xl bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-green-500 hover:scale-110 transition duration-300'>
                        Log in
                    </button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to="/user/signup">
                    <button  className='text-xl bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-green-500 hover:scale-110 transition duration-300'>
                        Sign up
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to="/">
                    <button onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.removeItem("EMAIL")
                        toast.success("Logged Out");
                    }}
                    className='text-xl bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-green-500 hover:scale-110 transition duration-300'>
                        Log Out
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to="/dashboard">
                    <button
                     className='text-xl bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-green-500 hover:scale-110 transition duration-300'>
                        Dashboard
                    </button>
                </Link>
            }
        </div>
      
    </div>
  )
}

export default Navbar
