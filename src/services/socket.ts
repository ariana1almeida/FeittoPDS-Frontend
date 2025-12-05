import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    const url =
        // import.meta.env.VITE_SOCKET_URL ||
        "http://localhost:3000";
    socket = io(url, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket!;
}

export function connectSocket(opts?: { auth?: Record<string, unknown> }) {
  const s = getSocket();
  if (opts?.auth) s.auth = opts.auth;
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  const s = getSocket();
  if (s.connected) s.disconnect();
}

export type ChatMessage = {
  id: string;
  room: string;
  from: string;
  text: string;
  timestamp: number;
};

