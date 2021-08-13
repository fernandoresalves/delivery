import express from "express";
import logger from "../logger.js";
import { criar } from "../Pedido.js";

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
  } catch (error) {
    next(error);
  }
});

route.put("/:id/entregar", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

route.get("/cliente/:name/compras", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

route.get("/produto/:name/compras", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

route.get("/produto/maisvendidos", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default route;
