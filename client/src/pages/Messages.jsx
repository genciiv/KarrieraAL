import { useState } from "react";
import ChatList from "../components/messages/ChatList.jsx";
import ChatWindow from "../components/messages/ChatWindow.jsx";

const mockInbox = [
  { id:"m1", name:"Arlind H.", last:"Flasim për intervistën nesër?", messages:[
    { id:"x1", who:"them", text:"Përshëndetje!" },
    { id:"x2", who:"me", text:"Përshëndetje, po." }
  ]},
  { id:"m2", name:"Elira HR", last:"Aplikimi yt u pranua për fazën e dytë.", messages:[
    { id:"y1", who:"them", text:"Faleminderit për aplikimin." }
  ]}
];

export default function Messages() {
  const [convId, setConvId] = useState(mockInbox[0]?.id);
  const conv = mockInbox.find(c=>c.id===convId);

  return (
    <div className="container" style={{marginTop:24, display:"grid", gap:16, gridTemplateColumns:"1fr 2fr"}}>
      <ChatList items={mockInbox} onOpen={setConvId} />
      <ChatWindow conv={conv} />
    </div>
  );
}
