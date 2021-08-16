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
    logger.info("POST em pedidos.");
    const result = await criar(req.body);
    res.send(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    logger.info("PUT em pedidos.");
    const result = await atualizar(req.body);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.patch("/:id/entregue", async (req, res, next) => {
  try {
    logger.info("PATCH em pedidos.");
    await entregue(req.params.id, req.body.entregue);
    res.end();
  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    logger.info("DELETE em pedidos.");
    await remover(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    logger.info("GET por id em pedidos.");
    const result = await obter(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/cliente/compras/:name", async (req, res, next) => {
  try {
    logger.info("GET compras por cliente em pedidos.");
    const result = await comprasPorCliente(req.params.name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/produto/compras/:name", async (req, res, next) => {
  try {
    logger.info("GET compras por produto em pedidos.");
    const result = await comprasPorProduto(req.params.name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

route.get("/produto/maisvendidos", async (req, res, next) => {
  try {
    logger.info("GET produtos mais vendidos em pedidos.");
    const result = await maisvendidos();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default route;
