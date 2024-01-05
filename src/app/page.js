'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import socketio from 'socket.io-client'
import { useRouter } from 'next/navigation';
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

export let socket;

export default function Home() {

  const router = useRouter()

  const [message, setMessage] = useState('')
  const [recievegMsg, setRecievedMsg] = useState([])

  async function sendMsg(e)
  {
    socket.emit('sentmsg', {id : socket.id, message})
    
    // setMessage('')
  }

  async function joinRoom()
  {
    socket.emit('joinroom', {room : 'testroom'})
    router.push('rooms')
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

    socket.on('recievedmsg', ({id, message}) => {
      setRecievedMsg(prev => [...prev, {message, pos : socket.id === id ? 'right' : 'left', flexDirection : socket.id === id ? 'row-reverse' : 'row'}])
    })

  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.messagediv}>
        <div className={styles.renderedmsg}> 
        {
          recievegMsg.map((val, index) => {
            return (<div className={styles.messages} key={index} style={{textAlign : `${val.pos}`, flexDirection : `${val.flexDirection}`}}><FaRegUserCircle size={'25px'} className={styles.profile}/><p style={{display : 'inline', margin : '5px 5px'}}>{val.message}</p></div>)
          })
        }
        </div>
      <div className={styles.sendmsg} >
          <input type='text' placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={sendMsg}><AiOutlineSend size={'20px'}/></button>
          </div>
      </div>
          {/* <button style={{position : 'absolute', bottom : '0'}} onClick={joinRoom}>Join Room</button> */}
    </main>
  )
}
