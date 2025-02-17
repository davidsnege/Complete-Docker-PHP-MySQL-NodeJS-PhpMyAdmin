# Docker with Three Separate Services

- PHP 8, MySQL with phpMyAdmin, and Node.js. Each service will have its own project directory and will be started separately. All services will be on the same network so they can communicate with each other. There are testers available in the PHP and NODE projects (PHPUnit for PHP) and (JEST for Node).

- Configure for your project, this is all in default mode, you need to configure the tests, database names, directories, and files. Currently, it has 2 CRUDs, one in PHP and one in NODEjs that can be used as APIs with Postman or another tool.

- You can build your own endpoints for your needs using the existing examples.

## Directory Structure
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

## If already built:
```bash
docker-compose down -v
docker-compose up --build
```

## Steps to Execute

- Navigate to the project root directory:

- Build and start the containers:
  ```bash
  docker-compose up php
  docker-compose up mysql
  docker-compose up phpmyadmin
  docker-compose up node
  ```

### Access the services:
- PHP: Open your browser and go to http://localhost:8080
- phpMyAdmin: Open your browser and go to http://localhost:8081
- Node.js: Open your browser and go to http://localhost:3000
- Or simply use docker-compose up --build

### PHP Run PHPUnit tests (Installed by default by the Dockerfile)

   #### Enter the PHP container
    docker-compose exec php bash

   #### Once inside the container, verify the installation
    cd /var/www/html
    composer install

   #### Method 1: Using the script defined in composer.json
    ./vendor/bin/phpunit

   #### From outside the container (Recommended)
   docker-compose exec php ./vendor/bin/phpunit

### NODE Run JEST tests (Installed by default by package.json)

   #### Run all tests
     docker-compose exec node npm test

   #### Run tests in watch mode
     docker-compose exec node npm run test:watch

   #### Run tests with coverage
     docker-compose exec node npm run test:coverage
     - You can view the results in the HTML file inside the coverage folder

   #### Run tests with more information
     docker-compose exec node npm test -- --verbose

   #### Run a specific test
     docker-compose exec node npm test -- tests/unit/db.test.js
     docker-compose exec node npm test -- tests/integration/crud.test.js      

## DEBUG BUG (In case of error)

1. **Navigate to the [`MyNew`](MyNew ) directory**:
   ```bash
   cd /home/max144disk/Documentos/Estudos/MyNew
   ```

2. **Remove any existing containers**:
   ```bash
   docker-compose down
   ```

3. **Adjust the permissions of the `mysql/bd` directory**:
   ```bash
   sudo chown -R $USER:$USER /home/max144disk/Documentos/Estudos/MyNew/mysql/bd
   sudo chmod -R 755 /home/max144disk/Documentos/Estudos/MyNew/mysql/bd
   ```

4. **Build and start the Node.js container**:
   ```bash
   docker-compose up --build node
   ```
### If the users table has errors.

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

### Verification
Make sure the package.json and package-lock.json files are in the node directory and the index.js file is in the node/app directory.

### Note
If the problem persists, you can try running the commands manually inside the container to check for any specific issues:

1. **Start an interactive shell in the Node.js container**:
   ```bash
   docker-compose run node /bin/bash
   ```

2. **Check if the files are in the correct location**:
   ```bash
   ls /usr/src/app
   ```

3. **Try installing the dependencies manually**:
   ```bash
   npm install
   ```

4. **Try starting the application manually**:
   ```bash
   npm start
   ```
- This should help identify and fix any specific issues with the Dockerfile configuration or project structure. After running this once, you can exit the Docker bash and run the normal command to bring up the container.

   ```
   docker-compose up node 
   ```

## Git Setup

1. **Initialize Git Repository**
   ```bash
   git init
   ```

2. **Add .gitignore**
   The project includes a `.gitignore` file to exclude:
   - Node.js dependencies and build files
   - PHP vendor directory and environment files
   - MySQL data files
   - IDE configurations
   - System files
   - Test coverage reports

3. **Initial Commit**
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

4. **Add Remote Repository**
   ```bash
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

### Important Git-related Notes:
- Never commit `.env` files containing sensitive data
- Keep database dumps in a separate, secure location
- Review changes before committing to ensure no sensitive data is included

