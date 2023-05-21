import React from 'react'

function Header({Right,title,description}:{Right?:any,title:string,description:string}) {
  return (
      <div className='w-full py-8 flex justify-between items-center pr-5'>
          <div className="">
              <h1 className='text-[20px] font-semibold'>{title}</h1>
              <p className='text-[12px] font-normal'>{ description}</p>
          </div>
          {Right ? Right : null}
    </div>
  )
}

export default Header