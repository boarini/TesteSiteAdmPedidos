import React, { useState, useEffect } from "react";
import { buscarPedidos, atualizarPedido, deletarPedido } from "./servicos/api";
import * as signalR from "@microsoft/signalr"; 

const ListaPedidos = ({ setPedidos }) => {
  const [pedidos, setPedidosState] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({ cliente: "", produto: "", valor: "" });

  
  useEffect(() => {
    const fetchPedidos = async () => {
      const fetchedPedidos = await buscarPedidos();
      setPedidosState(fetchedPedidos);
    };
    fetchPedidos();

    
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/orderHub") 
      .build();

    connection.start()
      .then(() => console.log("Connected to SignalR"))
      .catch(err => console.log("Error while connecting to SignalR: " + err));

   
    connection.on("ReceiveOrderUpdate", (updatedOrder) => {
      setPedidosState((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === updatedOrder.id ? { ...pedido, ...updatedOrder } : pedido
        )
      );
    });

    
    return () => {
      connection.stop();
    };
  }, []);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleEditClick = (pedido) => {
    setEditingOrderId(pedido.id);
    setEditData({ cliente: pedido.cliente, produto: pedido.produto, valor: pedido.valor });
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (orderId) => {
    await atualizarPedido(orderId, editData); 
    setPedidosState(pedidos.map((pedido) => (pedido.id === orderId ? { ...pedido, ...editData } : pedido)));
    setEditingOrderId(null);
  };

  const handleDelete = async (orderId) => {
    await deletarPedido(orderId); 
    setPedidosState(pedidos.filter((pedido) => pedido.id !== orderId));
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Pedidos</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <div className="flex justify-between">
              <span className="font-semibold">ID: {pedido.id}</span>
              <span>{pedido.cliente}</span>
            </div>
            <div className="flex justify-between">
              <span>{pedido.produto}</span>
              <span>{pedido.valor}</span>
            </div>

            <button
              className="mt-2 text-blue-500"
              onClick={() => handleToggleExpand(pedido.id)}
            >
              {expandedOrderId === pedido.id ? "Hide Details" : "Show Details"}
            </button>

            {expandedOrderId === pedido.id && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Status: {pedido.status}</p>
                <p>Data de Criação: {pedido.dataCriacao}</p>

                {editingOrderId === pedido.id ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="cliente"
                      value={editData.cliente}
                      onChange={handleInputChange}
                      className="border p-2 rounded w-full mb-2"
                      placeholder="Cliente"
                    />
                    <input
                      type="text"
                      name="produto"
                      value={editData.produto}
                      onChange={handleInputChange}
                      className="border p-2 rounded w-full mb-2"
                      placeholder="Produto"
                    />
                    <input
                      type="number"
                      name="valor"
                      value={editData.valor}
                      onChange={handleInputChange}
                      className="border p-2 rounded w-full mb-2"
                      placeholder="Valor"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSaveEdit(pedido.id)} className="bg-green-500 text-white px-3 py-1 rounded transition-all hover:bg-green-600">
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded transition-all hover:bg-gray-500">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditClick(pedido)} className="bg-blue-500 text-white px-3 py-1 rounded transition-all hover:bg-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(pedido.id)} className="bg-red-500 text-white px-3 py-1 rounded transition-all hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPedidos;
