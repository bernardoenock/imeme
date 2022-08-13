import express from "express";
import { startDatabase } from "./database";
//Routes
//

const app = express();
app.use(express.json());

app.listen(4242, () => {
  console.log(`Executando na porta 4242`);
  startDatabase();
});

export default app;
