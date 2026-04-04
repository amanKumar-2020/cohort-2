import express from "express";
import type { Request, Response } from "express";
import graph from "./ai/graph.ai";
import path from "path";

const app = express();

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/battle", async (req: Request, res: Response) => {
  const { problem } = req.body;

  const result = await graph.invoke({ problem });

  res.json(result);
});
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// React fallback (LAST)
app.get("/{*path}", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));``
});

export default app;
