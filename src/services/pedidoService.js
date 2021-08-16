import { promises as fs } from "fs";

export async function criar(pedido) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const p = {
      id: data.nextId++,
      ...pedido,
      entregue: false,
      timestamp: new Date(),
    };

    data.pedidos.push(p);
    await fs.writeFile(global.fileName, JSON.stringify(data));

    return p;
  } catch (error) {}
}

export async function atualizar(pedido) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    data.pedidos = data.pedidos.filter((p) => p.id !== pedido.id);

    data.pedidos.push(pedido);

    await fs.writeFile(global.fileName, JSON.stringify(data));
  } catch (error) {}
}

export async function obter(id) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const pedido = data.pedidos.find((x) => {
      return x.id == id;
    });

    return pedido;
  } catch (error) {}
}

export async function remover(id) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    data.pedidos = data.pedidos.filter((p) => p.id !== id);

    await fs.writeFile(global.fileName, JSON.stringify(data));
  } catch (error) {}
}
