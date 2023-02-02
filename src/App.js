import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "./features/chat/chatSlice";

function App() {
  const {
    isLoading,
    messages: bioMessages,
    isSuccess,
  } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([
    {
      customer_message: "Here is bio chat, type your term for completion...",
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
      const tempMessags = [...messages, ...bioMessages];
      setMessages(tempMessags);
    }

    scrollToBottom();
  }, [bioMessages]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(message));
    const temp = {
      customer_message: message,
    };
    setMessages([...messages, temp]);
    setMessage("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-2 border-blue-400">
        <div className="overflow-y-scroll h-[600px] sm:w-[600px] px-2 scroll-mb-0 relative">
          {messages &&
            messages.map((mess, i) => (
              <div key={i}>
                {mess && mess.customer_message && (
                  <div className="flex justify-end w-full my-2">
                    <div className="w-[70%] bg-blue-400  p-4 rounded-xl">
                      {mess.customer_message}
                    </div>
                  </div>
                )}

                {mess && mess.generated_text && (
                  <div className="flex justify-start w-full my-2">
                    <div className="w-[70%] bg-gray-400  p-4 rounded-xl">
                      {mess.generated_text}
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
            <button disabled={message === ""}  className="p-2 bg-blue-400 text-white rounded-lg">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
