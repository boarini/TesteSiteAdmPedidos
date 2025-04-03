Sistema de Gestão de Pedidos  

Sistema criado para gerir pedidos, tanto criar, editar, ver e deletar pedidos.

Tecnologias Utilizadas  

   Para back-end:  
      C# (.NET 7+), Entity Framework,PostgreSQL, Azure Service Bus e WebSockets  

   Para front-end  
      React, Tailwind CSS  

   Docker  


Como Rodar o Projeto  

  
É necessário ver se os seguintes estão instalados na sua máquina:  
   Docker e Docker Compose  
   Node.js (para rodar o frontend sem Docker, se necessário)  
   .NET 7+ (para rodar o backend sem Docker, se necessário)  


Também é necessário, por conta de restirções do github, em appsettings.json, em AzureServiceBusConnectionString, colocar um endpoint pessoal (porém terá que alterar o nome da fila logo abaixo) ou usar a minha chave que é:

Endpoint=sb://testeapi. servicebus.windows.n et/;SharedAccessKeyName=Root ManageSharedAccessKey;SharedAccessKey=o0cXBLZmk KvD6Qf5FcIDbT2OKwMVh2qW3+ASbD5yPTQ=
(contém espaços para ajudar com a detecção)


Caso utilize Docker Compose:  
   Execute o seguinte comando no terminal na raiz do projeto:  

      docker-compose up --build
      

Desse jeito, o front-end e o back-end devem começar a rodar automaticamente

Rodando manualmente:  

    Acesse a pasta do backend:  
    cd apiTesteOrders
   
    Configure a string de conexão com o PostgreSQL no appsettings.json

    Instale as dependências e rode a aplicação:  
    dotnet restore
    dotnet run
   
    A API estará disponível em `http://localhost:7152`.  
   Mude, também, o apiTesteOrders/appsettings.json para conectar ao seu bd
  
    Acesse a pasta do frontend:  
    cd app-teste-entrevista

    Instale as dependências:  
    npm install

    Inicie o React:  
    npm start
   
    Inicie o Tailwind:
    npm install -D tailwindcss@3
    npx tailwindcss init

    O frontend estará disponível em `http://localhost:3000`.  
