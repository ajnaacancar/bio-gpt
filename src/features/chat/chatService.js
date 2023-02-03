import axios from "axios";

//send a message

const sendMessage = async (message) => {
  const response = await axios.post('/text', {prompt: message});
  return response.data;
};

const sendMessage2 = async (message) => {
  const response = await axios.post('/beam', {prompt: message});
  return response.data;
};

const chatService = {
  sendMessage,
  sendMessage2
};

export default chatService;
