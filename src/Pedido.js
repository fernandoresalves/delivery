import { promises as fs } from "fs";

export async function criar(pedido) {
  try {
    const data = JSON.parse(await fs.readFile("pedidos.json"));
    const p = {
      id: data.nextId++,
      ...pedido,
      entregue: false,
      timestamp: new Date(),
    };

    data.pedidos.push(p);
    await fs.writeFile("pedidos.json", JSON.stringify(data));

    return p;
  } catch (error) {}
}
