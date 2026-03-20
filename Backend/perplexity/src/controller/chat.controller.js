import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { generateAIResponse, generateChatTitle } from "../services/ai.service.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let currentChatId = chatId;
  let title = null
  if (!chatId) {
     title = await generateChatTitle(message);
    const newChat = await chatModel.create({
      user: req.user.user,
      title,
    });

    currentChatId = newChat._id;
  }

  const userMessage = await messageModel.create({
    chat: currentChatId,
    content: message,
    role: "user",
  });

  await chatModel.findByIdAndUpdate(currentChatId, {
    $push: { chat: userMessage._id },
  });

  function formatMessages(messagesFromDB) {
    return messagesFromDB.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else {
        return new AIMessage(msg.content);
      }
    });
  }

  const messagesFromDB = await messageModel
    .find({ chat: currentChatId })
    .sort({ createdAt: 1 });

  const msg = formatMessages(messagesFromDB).slice(-10);

  const result = await generateAIResponse(msg);

  const aiMessage = await messageModel.create({
    chat: currentChatId,
    content: result,
    role: "ai",
  });
  await chatModel.findByIdAndUpdate(currentChatId, {
    $push: { chat: aiMessage._id },
  });

  res.json({
    chatId: currentChatId,
    title: title,
    message: result,
  });
}
