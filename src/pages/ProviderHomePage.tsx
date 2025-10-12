import React from 'react';
import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';

const ProviderHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindo, Prestador de Serviços!
          </h1>
          <p className="text-gray-600 text-lg">
            Gerencie seus serviços e atenda seus clientes de forma eficiente.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Serviços Ativos</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Clientes Atendidos</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="bg-purple-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Avaliação Média</h3>
            <p className="text-3xl font-bold">4.8</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Criar Novo Serviço
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Ver Solicitações
            </button>
            <button className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
              Meus Serviços
            </button>
            <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Relatórios
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-800">Nova solicitação de serviço</p>
              <p className="text-gray-600 text-sm">Limpeza residencial - há 2 horas</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold text-gray-800">Serviço concluído</p>
              <p className="text-gray-600 text-sm">Jardinagem - há 1 dia</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold text-gray-800">Nova avaliação recebida</p>
              <p className="text-gray-600 text-sm">5 estrelas - há 2 dias</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderHomePage;
