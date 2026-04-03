import app from "./src/app";

const port = 3001;

app.listen(port, () => {
  console.log(`🚀 Express Bun server running at http://localhost:${port}`);
});