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
    const index = data.pedidos.findIndex((p) => p.id == pedido.id);

    data.pedidos[index] = pedido;

    await fs.writeFile(global.fileName, JSON.stringify(data));
  } catch (error) {}
}

export async function entregue(id, entregue) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const index = data.pedidos.findIndex((p) => p.id == id);

    data.pedidos[index].entregue = entregue;

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
    const d = data.pedidos.filter((p) => p.id != id);
    data.pedidos = d;
    await fs.writeFile(global.fileName, JSON.stringify(data));
  } catch (error) {}
}

export async function comprasPorCliente(nome) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const pedidos = data.pedidos.filter((x) => {
      return x.cliente === nome && x.entregue === true;
    });

    const total = pedidos.reduce((acumulado, pedido) => {
      if (acumulado.valor) {
        return acumulado.valor + pedido.valor;
      }
      return acumulado + pedido.valor;
    });

    return { total };
  } catch (error) {}
}

export async function comprasPorProduto(nome) {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const pedidos = data.pedidos.filter((x) => {
      return x.produto === nome && x.entregue === true;
    });

    const total = pedidos.reduce((acumulado, pedido) => {
      if (acumulado.valor) {
        return acumulado.valor + pedido.valor;
      }
      return acumulado + pedido.valor;
    });

    return { total };
  } catch (error) {}
}

export async function maisvendidos() {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    const pedidos = data.pedidos.filter((x) => {
      return x.entregue === true;
    });

    const contagemProduto = pedidos.reduce((contagemProduto, produto) => {
      contagemProduto[produto.produto] = contagemProduto[produto.produto] || [];
      contagemProduto[produto.produto].push(produto);

      return contagemProduto;
    }, {});

    return contagemProduto;
  } catch (error) {}
}
