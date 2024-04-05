import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const LoginForm = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))

    }

    function submitHandler(event) {
        event.preventDefault();
        fetch('https://phase-1-updated.onrender.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    // If login is successful, set isLoggedIn to true
                    localStorage.setItem("EMAIL", formData.email)
                    setIsLoggedIn(true);
                    toast.success("Logged In");
                    navigate("/dashboard");
                } else {
                    // If login fails, handle the error
                    throw new Error('Login failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Failed to log in");
            });
    }

    return (
        <form onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6">

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className=' text-red-700 text-sm'>*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    name="email"
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password<sup className=' text-red-700 text-sm'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    name="password"
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />

                <span
                    className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ?

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                </span>

                <Link to="#">
                    <p className='text-sm mt-1 text-blue-700 max-w-max ml-auto hover:scale-105 transition duration-300'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className=' bg-yellow-300 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 hover:scale-105 transition duration-300'>
                Sign In
            </button>

        </form>
    )
}

export default LoginForm
