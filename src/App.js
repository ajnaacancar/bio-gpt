import { useState } from "react";
import BioChat from "./components/BioChat";
import Chat from "./components/Chat";

function App() {
  const [isFirst, setIsFirst] = useState(true);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <div className="max-w-2xl mx-auto">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2" role="presentation">
                  <button
                    onClick={() => setIsFirst(true)}
                    className={`inline-block text-gray-500 hover:text-blue-600 hover:border-blue-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                      isFirst && "text-blue-700 font-bold border-blue-700"
                    }`}
                  >
                    Generate
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    onClick={() => setIsFirst(false)}
                    className={`inline-block text-gray-500 hover:text-red-600 hover:border-red-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active ${
                      !isFirst && "text-red-700 font-bold border-red-700"
                    }`}
                  >
                    Beam
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {isFirst ? <BioChat /> : <Chat />}
        </div>
      </div>
    </>
  );
}

export default App;
