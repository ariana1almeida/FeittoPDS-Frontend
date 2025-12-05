import {useState, useEffect, useRef} from "react";
import { connectSocket, getSocket, type ChatMessage } from "../services/socket";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";

export default function ChatPage() {
  const { authData } = useAuth();
  const [searchParams] = useSearchParams();
  const [room, setRoom] = useState<string>("");
  const [targetUser, setTargetUser] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Get targetId from URL params if present
  useEffect(() => {
    const targetIdFromUrl = searchParams.get('targetId');
    if (targetIdFromUrl) {
      setTargetUser(targetIdFromUrl);
    }
  }, [searchParams]);

  // Auto-join room when targetUser is set and socket is connected
  useEffect(() => {
    if (authData?.uid && targetUser && !room) {
      const userId = authData.uid;
      console.log('Auth data on chat page:', authData);

      // Send join request to backend - backend will create/find room and return ID
      getSocket().emit("chat:join", {
        users: { clientId: userId, providerId: targetUser }
      });
    }
  }, [authData?.uid, targetUser, room]);

  // Ensure socket connects when auth token changes. We don't need the returned value here,
  // so call connectSocket inside useEffect to avoid an unused-variable lint error.
  useEffect(() => {
    connectSocket({ auth: { token: authData?.token } });
    // intentionally not disconnecting here; user can click Disconnect or the app may manage lifecycle elsewhere
  }, [authData?.token]);

  useEffect(() => {
    const s = getSocket();

    const onConnect = () => {
      console.log("socket connected", s.id);
    };
    const onDisconnect = () => console.log("socket disconnected");

    const onMessage = (msg: ChatMessage) => {
      setMessages((prev) => {
        // avoid duplicates (same id) — can happen when multiple events are emitted
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    };

    const onChatJoined = (data: { room: string }) => {
      console.log('Joined room event:', data);
      // Update room state with the ID returned from backend
      setRoom(data.room);
    };

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("chat:message", onMessage);
    s.on("chat:joined", onChatJoined);

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("chat:message", onMessage);
      s.off("chat:joined", onChatJoined);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);


  const sendMessage = () => {
      console.log('Message sent')
    if (!room || !text.trim()) return;
    const payload = {
      sender: authData?.uid,
      receiver: targetUser,
      room,
      text,
      from: authData?.uid ?? "anon",
    };
    // Keep existing chat emit (if backend is updated later)
    getSocket().emit("chat:send", payload);
    setText("");
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 bg-neutral-light text-primary-dark">
      <h1 className="text-2xl font-bold">
          Chat Demo
      </h1>

      <div className="flex-1 overflow-y-auto border rounded p-2 bg-white">{messages.map((m) => (
          <div key={m.id} className={`my-1 ${m.from === authData?.uid ? "text-right" : "text-left"}`}>
             <div className="inline-block px-3 py-2 rounded bg-neutral-light">
               <div className="text-xs opacity-70">{m.from}</div>
               <div>{m.text}</div>
             </div>
           </div>
         ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 bg-amber-300">
        <input
          className="border p-2 rounded flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        {/*<button className="btn btn-blue text-primary-dark" onClick={sendMessage}>*/}
        {/*  Send*/}
        {/*</button>*/}

          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" onClick={sendMessage}>
              Send
          </button>
      </div>

      {room && <div className="text-sm opacity-70">Room: {room}</div>}
    </div>
  );
}
