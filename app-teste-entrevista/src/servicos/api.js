import axios from "axios";

const API_URL = "https://localhost:7152/api/Orders"; // Adjust if necessary

export const buscarPedidos = async () => {
    try {
      const response = await fetch('https://localhost:7152/api/Orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };
  

export const criarPedido = async (dadosPedido) => { // Create order
    try {
        const response = await axios.post(API_URL, dadosPedido);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return null;
    }
};

export const cadastrarPedido = async (orderData) => {
    try {
        const response = await axios.post(API_URL, orderData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding order');
    }
};

export const atualizarPedido = async (id, dadosAtualizados) => {
    return fetch(`https://localhost:7152/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados),
    });
  };
  
  export const deletarPedido = async (id) => {
    return fetch(`https://localhost:7152/orders/${id}`, { method: 'DELETE' });
  };
