# Docker com três serviços separados: 
- PHP 8, MySQL com phpMyAdmin e Node.js. Cada serviço terá seu próprio diretório de projeto e será iniciado separadamente. Todos os serviços estarão na mesma rede para que possam se comunicar entre si. Existem nos projetos PHP e NODE os seguintes testers para uso (PHPUnit para PHP) e (JEST para Node).

- Configure para seu projeto, este está todo em modo padrão, você precisa configurar os testes, os nomes dos bancos de dados, os diretórios e arquivos. No momento, conta com 2 CRUDs, um no PHP e um no Node.js que podem ser usados como APIs com Postman ou outra ferramenta.

- Você pode construir seus próprios endpoints para suas necessidades usando os exemplos já existentes.

## Estrutura de Diretórios
```
MyNew/
├── php/
│   ├── Dockerfile
│   └── www/
│       ├── index.php
│       ├── info.php
│       ├── config.php
│       ├── create.php
│       ├── get_user_data.php
│       ├── get_users.php
│       ├── crud.php
│       ├── read.php
│       ├── update.php
│       ├── delete.php
│       └── tests/
│           └── UserTest.php
├── mysql/
│   ├── Dockerfile
│   └── bd/
├── phpmyadmin/
│   └── Dockerfile
├── node/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── jest.config.js
│   ├── jest.setup.js
│   └── app/
│       ├── index.js
│       ├── config.js
│       ├── create.js
│       ├── read.js
│       ├── update.js
│       └── delete.js
├── tests/
│   ├── integration/
│   │   └── crud.test.js
│   └── unit/
│       └── db.test.js
└── docker-compose.yml
```

## Se já estiver construído:
```bash
docker-compose down -v
docker-compose up --build
```

## Passos para Executar 

- Navegue até o diretório raiz do projeto:

- Construa e inicie os contêineres:

  PHP:
  MySQL:
  phpMyAdmin:
  Node.js:
```bash
docker-compose up php
docker-compose up mysql
docker-compose up phpmyadmin
docker-compose up node
```

- Acesse os serviços:

  PHP: Abra seu navegador e vá para http://localhost:8080.
  phpMyAdmin: Abra seu navegador e vá para http://localhost:8081.
  Node.js: Abra seu navegador e vá para http://localhost:3000.
  
- Nota

  your_user, your_password e your_database

- Certifique-se de substituir your_user, your_password e your_database pelos valores reais que você está usando no seu ambiente Docker.

- Isso deve criar um ambiente Docker funcional com PHP 8, MySQL com phpMyAdmin e Node.js, todos interconectados e com seus próprios diretórios de projeto.

### Acesse os serviços:
- PHP: Abra seu navegador e vá para http://localhost:8080.
- phpMyAdmin: Abra seu navegador e vá para http://localhost:8081.
- Node.js: Abra seu navegador e vá para http://localhost:3000.
- Ou simplesmente use docker-compose up --build

### PHP Executar testes PHPUnit (Instalado por padrão pelo Dockerfile)

   #### Entrar no contêiner PHP
    docker-compose exec php bash

   #### Uma vez dentro do contêiner, verifique a instalação
    cd /var/www/html
    composer install

   #### Método 1: Usando o script definido no composer.json
    ./vendor/bin/phpunit

   #### De fora do contêiner (Recomendado)
   docker-compose exec php ./vendor/bin/phpunit

### NODE Executar testes JEST (Instalado por padrão pelo package.json)

   #### Executar todos os testes
     docker-compose exec node npm test

   #### Executar testes em modo de observação
     docker-compose exec node npm run test:watch

   #### Executar testes com cobertura
     docker-compose exec node npm run test:coverage
     - Você pode ver os resultados no arquivo HTML dentro da pasta coverage

   #### Executar testes com mais informações
     docker-compose exec node npm test -- --verbose

   #### Executar um teste específico
     docker-compose exec node npm test -- tests/unit/db.test.js
     docker-compose exec node npm test -- tests/integration/crud.test.js      

## DEBUG BUG (Em caso de erro)

1. **Navegue até o diretório [`MyNew`](MyNew )**:
   ```bash
   cd /home/max144disk/Documentos/Estudos/MyNew
   ```

2. **Remova quaisquer contêineres existentes**:
   ```bash
   docker-compose down
   ```

3. **Ajuste as permissões do diretório `mysql/bd`**:
   ```bash
   sudo chown -R $USER:$USER /home/max144disk/Documentos/Estudos/MyNew/mysql/bd
   sudo chmod -R 755 /home/max144disk/Documentos/Estudos/MyNew/mysql/bd
   ```

4. **Construa e inicie o contêiner Node.js**:
   ```bash
   docker-compose up --build node
   ```
### Se a tabela de usuários tiver erros.

docker-compose down -v
docker system prune -a --volumes

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL
);

docker-compose down -v
docker-compose up --build

### Verificação
Certifique-se de que os arquivos package.json e package-lock.json estão no diretório node e que o arquivo index.js está no diretório node/app.

### Nota
Se o problema persistir, você pode tentar executar manualmente os comandos dentro do contêiner para verificar se há algum problema específico:

1. **Inicie um shell interativo no contêiner Node.js**:
   ```bash
   docker-compose run node /bin/bash
   ```

2. **Verifique se os arquivos estão no local correto**:
   ```bash
   ls /usr/src/app
   ```

3. **Tente instalar as dependências manualmente**:
   ```bash
   npm install
   ```

4. **Tente iniciar a aplicação manualmente**:
   ```bash
   npm start
   ```
- Isso deve ajudar a identificar e corrigir qualquer problema específico com a configuração do Dockerfile ou a estrutura do projeto. Depois de executar isto uma vez, você pode sair do bash do Docker e executar o comando normal para subir o contêiner.

   ```
   docker-compose up node 
   ```

## Configuração do Git

1. **Inicializar Repositório Git**
   ```bash
   git init
   ```

2. **Adicionar .gitignore**
   O projeto inclui um arquivo `.gitignore` para excluir:
   - Dependências e arquivos de build do Node.js
   - Diretório vendor e arquivos de ambiente do PHP
   - Arquivos de dados do MySQL
   - Configurações de IDE
   - Arquivos de sistema
   - Relatórios de cobertura de testes

3. **Commit Inicial**
   ```bash
   git add .
   git commit -m "Commit inicial"
   ```

4. **Adicionar Repositório Remoto**
   ```bash
   git remote add origin <seu-repositorio-url>
   git branch -M main
   git push -u origin main
   ```

### Notas Importantes Relacionadas ao Git:
- Nunca comite arquivos `.env` contendo dados sensíveis
- Mantenha dumps de banco de dados em um local seguro separado
- Revise as mudanças antes de comitar para garantir que nenhum dado sensível seja incluído

docker system prune -a --volumes

