// import { response } from "express";
// import chatModel from "../models/chat.model.js";
// import messageModel from "../models/message.model.js";
import {generateAIResponse} from "../services/ai.service.js"

export async function sendMessage(req, res) {
    const {message} = req.body ;
   const result = await generateAIResponse(message)
   res.json({
    message: result
   })
}