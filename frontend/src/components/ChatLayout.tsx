/**
 * frontend/src/components/ChatLayout.tsx
 *
 * Main chat page layout — manages message state and wires child components.
 *
 * What is already done for you:
 *   - Imports for the child components and the API function.
 *   - The component skeleton.
 *
 * What you need to implement:
 *   - State management for the list of messages and loading status.
 *   - A handler that sends the user's message to the API, appends the
 *     user message and bot response to state.
 *   - Rendering MessageList and ChatInput together.
 */

import { useState } from "react";
import MessageList, { type Message } from "./MessageList";
import ChatInput from "./ChatInput";
// import { sendChat } from "../lib/api";  // ← uncomment after you implement api.ts

export default function ChatLayout() {
  // TODO-20 (Required): Set up state for messages and loading.
  //
  // Use React's useState:
     const [messages, setMessages] = useState<Message[]>([]);
     const [loading, setLoading] = useState(false);
  //
  // Then write a handleSend function that:
  //   1. Receives a message string from ChatInput.
  //   2. Appends a { role: "user", text: message } to the messages array.
  //   3. Sets loading to true.
  //   4. Calls sendChat(message) from api.ts (import it above).
  //   5. When the response arrives, appends { role: "bot", text: response.answer }
  //      to the messages array.
  //   6. If an error occurs, appends { role: "bot", text: "Error: <message>" }.
  //   7. Sets loading back to false.
  //
  // Hint — updating arrays in React state:
  //   setMessages(prev => [...prev, newMessage]);

  async function handleSend(message: string) {
  setMessages(prev => [...prev, { role: "user", text: message }]);
  setLoading(true);

  try {
    const response = await sendChat(message);
    setMessages(prev => [...prev, { role: "bot", text: response.answer }]);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : "Unknown error";
    setMessages(prev => [...prev, { role: "bot", text: `Error: ${errMessage}` }]);
  } finally {
    setLoading(false);
  }
}
  
  // TODO-21 (Required): Render the layout with MessageList and ChatInput.
  //
  // Return JSX like:
  //   <div>
  //     <h1>RC Car Graph Chatbot</h1>
  //     <MessageList messages={messages} />
  //     <ChatInput onSend={handleSend} disabled={loading} />
  //   </div>

  return <div>Chat layout not implemented yet</div>;
}
