import React from 'react'
import './css/btnContainer.css'

const BtnContainer = ({children}) => {
    return (
        <div className='btnContainer'>
            {children}
        </div>
    )
}

export default BtnContainer
