import React, { useState } from "react";
import ListaPedidos from "./ListaPedido";  
import CreateOrder from "./CreateOrder";    

const App = () => {
  const [pedidos, setPedidos] = useState([]);  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-500">
      <div className="container mx-auto p-8">
        
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Sistema de Gestão de Pedidos</h1>
        
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crie um novo Pedido!</h2>
          <CreateOrder setPedidos={setPedidos} /> 
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Pedidos</h2>
          <ListaPedidos pedidos={pedidos} setPedidos={setPedidos} /> 
        </div>
      </div>
    </div>
  );
};

export default App;
