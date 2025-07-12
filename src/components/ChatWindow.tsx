// src/components/ChatWindow.tsx
import { useEffect, useState } from "react";
import { db, auth } from "@/firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatWindowProps {
  onClose: () => void;
  recipient: string; // should be recipient UID
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, recipient }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    if (!user || !recipient) return;

    const chatQuery = query(
      collection(db, "messages"),
      where("participants", "array-contains", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const filtered = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (msg) =>
            (msg.sender === user.uid && msg.recipient === recipient) ||
            (msg.sender === recipient && msg.recipient === user.uid)
        );

      setMessages(filtered);
    });

    return () => unsubscribe();
  }, [user, recipient]);

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      sender: user.uid,
      recipient,
      participants: [user.uid, recipient],
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-[350px] h-[500px] bg-card border border-border shadow-2xl z-50 rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted rounded-t-xl">
        <h4 className="font-semibold text-foreground">Chat with {recipient}</h4>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-background">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === user?.uid
                ? "ml-auto bg-primary text-white"
                : "bg-muted text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
