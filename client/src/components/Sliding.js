import React from 'react';
import sdk from "../assets/sdk.jpg";
import sk from "../assets/sk.jpg";
import vz from "../assets/vz.jpg";
import vt from "../assets/vt.jpg";
import vk from "../assets/vk.jpg";
import "./Sliding.css";

const Sliding = () => {
  return (
    <div className='w-4/6 flex justify-center gap-x-2 m-16 mx-auto'>
        <div className='card'>
            <img src={vk} alt="Avatar" />
            <div className="container">
            <h4><b>Viraj Kakade</b></h4> 
            <a href="https://www.linkedin.com/in/viraj-kakade-8bb04928b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Linkedin</a>
            </div>
        </div>
        <div className='card' >
            <img src={vt} alt="Avatar" />
            <div className="container">
            <h4><b>Vathsal T</b></h4> 
            <a href="https://www.linkedin.com/in/vathsaltammewar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Linkedin</a>
            </div>
        </div>
        <div className='card'>
            <img src={vz} alt="Avatar" />
            <div className="container">
            <h4><b>Varadraj Zarkar</b></h4> 
            <a href="https://www.linkedin.com/in/varadraj-zarkar-77686122a/" target="_blank">Linkedin</a>
            </div>
        </div>
        <div className='card'>
            <img src={sk} alt="Avatar" />
            <div className="container">
            <h4><b>Shripad K</b></h4> 
            <a href="https://www.linkedin.com/in/shripad-kanakdande?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Linkedin</a>
            </div>
        </div>
        <div className='card'>
            <img src={sdk} alt="Avatar" />
            <div className="container">
            <h4><b>Shreyas Dube</b></h4> 
            <a href="https://www.linkedin.com/in/shreyas-dube-250808239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Linkedin</a>
            </div>
        </div>
      
    </div>
  )
}

export default Sliding;