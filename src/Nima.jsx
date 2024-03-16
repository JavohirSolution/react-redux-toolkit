import React, { useEffect, useState } from 'react'

const Nima = () => {
    const [count, setcount] = useState(0)

    return (
        <div>
            <button className='btn btn-danger px-5' onClick={() => setcount(prev => prev + 1)}>Add</button>
            <h1>{count}</h1>
        </div>
    )
}

export default Nima