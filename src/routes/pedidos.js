import express from "express";
import logger from "../logger.js";
import {
  criar,
  obter,
  atualizar,
  remover,
  entregue,
  comprasPorCliente,
  comprasPorProduto,
  maisvendidos,
} from "../services/pedidoService.js";

const route = express.Router();

route.post("/", async (req, res, next) => {
  try {
    logger.info("POST pedidos.");
    const result = await criar(req.body);
    res.send(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const result = await atualizar(req.body);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.patch("/:id/entregue", async (req, res, next) => {
  try {
    await entregue(req.params.id, req.body.entregue);
    res.end();
  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    await remover(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const result = await obter(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/cliente/compras/:name", async (req, res, next) => {
  try {
    const result = await comprasPorCliente(req.params.name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/produto/compras/:name", async (req, res, next) => {
  try {
    const result = await comprasPorProduto(req.params.name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/produto/maisvendidos", async (req, res, next) => {
  try {
    const result = await maisvendidos();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default route;
