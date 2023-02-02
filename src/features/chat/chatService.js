import axios from "axios";

//send a message

const sendMessage = async (message) => {
  const response = await axios.post('http://192.168.50.87:5000/text', {prompt: message});
  return response.data;
};

const chatService = {
  sendMessage,
};

export default chatService;
