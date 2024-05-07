import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8081';

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  reconnection: false,
  autoConnect: false,
  transports: ['websocket'],
});