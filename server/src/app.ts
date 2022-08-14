import "dotenv/config";
import express from "express";
import { startDatabase } from "./database";
//Routes
import userRoutes from "./routes/users.routes";

const app = express();
app.use(express.json());

app.use("/accounts", userRoutes);

app.get("/", (req, res) => {
  return res.send("API Imemes");
});

app.listen(4242, () => {
  console.log(`Executando na porta 4242`);
  startDatabase();
});

export default app;
