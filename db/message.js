const Message = require("../models/message");

const postMessage = (id, user, message) => {
  const data = {
    id,
    user,
    message,
  };

  let newMessage = new Message(data);
  newMessage.save((err, Message) => {
    if (err) {
      console.log("Ocurrio un error al guardar");
      console.log(err);
    }

    console.log("Message saved");
  });
};

module.exports = {
  postMessage,
};
