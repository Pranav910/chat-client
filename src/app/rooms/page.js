'use client'

import styles from '@/src/app/page.module.css'
import { useEffect, useState } from 'react'
import socketio from 'socket.io-client'

let socket;

export default function page() {

  const [message, setMessage] = useState('')
  const [recievegMsg, setRecievedMsg] = useState([{
    message : '',
    pos : ''
  }])

  async function sendMsg(e)
  {
    socket.emit('sendmsgtoroom', {id : socket.id, message})
    
    setMessage('')
  }

  useEffect(() => {
    socket = socketio('http://localhost:8080/', { transports: ['websocket'] })

    socket.on('connect', () => {
      console.log(`${socket.id} joined`)
    })

    return () => {
      socket.emit('dissconnect')
      socket.off()
    }

  }, [])


  useEffect(() => {

    socket.emit('joinroom', {room : 'testroom'})

    socket.on('recieveroommsg', ({id, message}) => {
      console.log(message)
      setRecievedMsg(prev => [...prev, {message, pos : socket.id === id ? 'right' : 'left'}])
    })

  }, [])

  return (
    <main className={styles.main}>
      <div style={{overflowY : 'scroll',display : 'flex', flexDirection : 'column', border : '1px solid black', height : '500px', width : '300px', position : 'relative'}}>
        {
          recievegMsg.map((val, index) => {
            return (<div key={index} style={{width : '100%', padding : '10px 0', textAlign : `${val.pos}`}}><p style={{display : 'inline', margin : '5px 10px'}}>{val.message}</p></div>)
          })
        }
      </div>
      <div className='sendmsg' style={{display : 'flex', position : 'absolute', bottom : '0', transform : 'translateY(-50px)', width : '300px'}}>
          <input style={{width : '80%'}} type='text' placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button style={{width : '20%'}} onClick={sendMsg}>send</button>
          </div>
    </main>
  )
}
