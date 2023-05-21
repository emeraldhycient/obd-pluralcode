import React, { ReactNode } from 'react'
import Sidebar from './sidebar'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='w-screen h-screen overflow-auto'>
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-2 h-screen w-full">
                    <Sidebar/>
                </div>
                <div className="col-span-10 w-full h-screen overflow-auto">{children}</div>
            </div>
        </div>
    )
}

export default Layout