import React from 'react'
import styles from  './loader.module.css'

function Loader() {
    return (
        <>
            <div className={styles.loader} >
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
                <p>Loading please wait...</p>
            </div>
        </>
    )
}

export default Loader