import React from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './container/Admin';
function App() {
  return (
    <>
      <div  className='w-100 h-[6vh] bg-gray-100 block'>
      </div>
        <div className='w-100 h-[94vh] bg-gray-100 flex'>
          <div className='w-[5%] h-[100%] bg-indigo-950'>
          </div>
          <div className='h-[100%] w-[95%]'>
            <div className='h-[5%] w-[100%] bg-gray-300'>
            </div>
            <Admin/>
          </div>
        </div>
    </>
  )
}

export default App;
