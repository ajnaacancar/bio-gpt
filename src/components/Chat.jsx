import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage2 } from "../features/chat/chatSlice";

function Chat() {
  const {
    isLoading,
    message: bioMessage,
    isSuccess,
  } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([
    {
      customer_message: "Here is beam chat, type your term for completion...",
    },
  ]);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isSuccess) {
      const tempMessags = [...messages, bioMessage];
      setMessages(tempMessags);
    }

 
  }, [bioMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage2(message));
    const temp = {
      customer_message: message,
    };
    setMessages([...messages, temp]);
    setMessage("");
  };

  return (
    <div className="border-2 border-red-400 p-2">
      <div className="overflow-y-scroll h-[600px] sm:w-[600px] px-2 scroll-mb-0 relative">
        {messages &&
          messages.map((mess, i) => (
            <div key={i}>
              {mess && mess.customer_message && (
                <div className="flex justify-end w-full my-2">
                  <div className="w-[70%] bg-red-400  p-4 rounded-xl">
                    {mess.customer_message}
                  </div>
                </div>
              )}

              {mess && mess.text && (
                <div className="flex justify-start w-full my-2">
                  <div className="w-[70%] bg-gray-400  p-4 rounded-xl">
                    {mess.text}
                  </div>
                </div>
              )}
            </div>
          ))}

        {isLoading && <p>Text completion ...</p>}

        <div ref={messageEndRef} />
      </div>

      <form onSubmit={onSubmit} className="space-x-4 items-center">
        <div className="flex justify-center items-center space-x-5 mb-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="p-2 text-lg outline-none border-b w-[75%]"
          />
          <button
            disabled={message === ""}
            className="p-2 bg-red-400 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
