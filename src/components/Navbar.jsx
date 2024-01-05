import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <main>
            <nav>
                <div>
                    <Link href={'/client'}>Client</Link>
                </div>
            </nav>
        </main>
    )
}

export default Navbar