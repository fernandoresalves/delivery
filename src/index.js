import { promises as fs, writeFile } from "fs";
import express, { response } from "express";
import pedidosRouter from "./routes/pedidos.js";

global.fileName = "pedidos.json";

const app = express();

app.use(express.json());
app.use("/pedidos", pedidosRouter);

app.use((error, req, res, next) => {
  res.status(400).send(`Ops, houve um erro ${error}`);
});
app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName);
    console.log("⚡️ API Started");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      pedidos: [],
    };

    fs.writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        console.log("⚡️ API Started and file created");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
