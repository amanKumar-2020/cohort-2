import express from "express";
import type { Request, Response } from "express";
import graph from "./ai/graph.ai";

const app = express();

app.use(express.json());


app.post("/battle", async (req: Request, res: Response) => {
  const { problem } = req.body;

  const result = await graph.invoke({ problem });

  res.json(result);
});
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
