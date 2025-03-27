import React, { useState } from "react";
import { cadastrarPedido } from "./servicos/api";

const CreateOrder = ({ setPedidos }) => {
  const [order, setOrder] = useState({
    Cliente: "",
    Produto: "",
    Valor: "",
    Status: "Pendente",
    DataCriacao: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cadastrarPedido(order);
    setPedidos((prevOrders) => [...prevOrders, order]); 
    alert("Order Created Successfully");
    setOrder({
      Cliente: "",
      Produto: "",
      Valor: "",
      Status: "Pendente",
      DataCriacao: new Date().toISOString(),
    }); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-2xl font-semibold mb-4"></h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Cliente</label>
          <input
            type="text"
            name="Cliente"
            value={order.Cliente}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Produto</label>
          <input
            type="text"
            name="Produto"
            value={order.Produto}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Valor</label>
          <input
            type="number"
            name="Valor"
            value={order.Valor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="Status"
            value={order.Status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Pendente">Pendente</option>
            <option value="Processando">Processando</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Criar Pedido
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
