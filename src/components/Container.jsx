import React from 'react'
import './css/container.css'

const Container = ({children}) => {
    return (
        <div className='container'>
            {children}
           
        </div>
    )
}

export default Container
