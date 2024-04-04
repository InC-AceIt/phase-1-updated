import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReactTable from '../components/ReactTable';

const QuestSug = () => {
  return (
    <div className=' mt-6 w-full h-full flex flex-col gap-y-6 items-center '>
      <div className='text-2xl font-semibold '>
        Personalised Questions
      </div>
      <div>
      <ReactTable/>
      </div>
    </div>
  )
}


export default QuestSug