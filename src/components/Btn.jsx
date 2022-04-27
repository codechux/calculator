import React from 'react'
import './css/btn.css'

const Btn = ({className, onClick, value}) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    )
}

export default Btn
