import { useEffect, useState } from 'react'
import { socket } from '../../socket'

function useSocketState() {
  const [socketState, setSocketState] = useState(socket.connected)
  socket.on('connect', () => {
    setSocketState(true)
  })
  
  useEffect(() => {
    if (!socketState) {
      socket.connect()
    }
  }, [socketState])

  return {socketState, socket}
}

export default useSocketState
