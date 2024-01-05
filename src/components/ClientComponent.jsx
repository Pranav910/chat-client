'use client'

import React, { Children, useEffect } from 'react'

function ClientComponent({val, children}) {

    // useEffect(() => {
    //     console.log(children)
    // }, [])

    return (
        <main>
            <div>
                {val}
                {children}
            </div>
        </main>
    )
}

export default ClientComponent