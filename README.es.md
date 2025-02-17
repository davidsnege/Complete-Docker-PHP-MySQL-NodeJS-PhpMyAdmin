# Docker con tres servicios separados: 
- PHP 8, MySQL con phpMyAdmin y Node.js. Cada servicio tendrá su propio directorio de proyecto y se iniciará por separado. Todos los servicios estarán en la misma red para que puedan comunicarse entre sí. Existen en los proyectos PHP y NODE los siguientes testers para uso (PHPUnit para PHP) y (JEST para Node).

- Configura para tu proyecto, este está todo en modo estándar, necesitas configurar las pruebas, los nombres de las bases de datos, los directorios y archivos. Actualmente, cuenta con 2 CRUDs, uno en PHP y otro en Node.js que pueden ser usados como APIs con Postman u otra herramienta.

- Puedes construir tus propios endpoints para tus necesidades usando los ejemplos ya existentes.

## Estructura de Directorios
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

## Si ya está construido:
```bash
docker-compose down -v
docker-compose up --build
```

## Pasos para Ejecutar 

- Navega hasta el directorio raíz del proyecto:

- Construye e inicia los contenedores:

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

- Accede a los servicios:

    PHP: Abre tu navegador y ve a http://localhost:8080.
    phpMyAdmin: Abre tu navegador y ve a http://localhost:8081.
    Node.js: Abre tu navegador y ve a http://localhost:3000.
    
- Nota

    your_user, your_password y your_database

- Asegúrate de reemplazar your_user, your_password y your_database por los valores reales que estás usando en tu entorno Docker.

- Esto debería crear un entorno Docker funcional con PHP 8, MySQL con phpMyAdmin y Node.js, todos interconectados y con sus propios directorios de proyecto.

### Accede a los servicios:
- PHP: Abre tu navegador y ve a http://localhost:8080.
- phpMyAdmin: Abre tu navegador y ve a http://localhost:8081.
- Node.js: Abre tu navegador y ve a http://localhost:3000.
- O simplemente usa docker-compose up --build

### PHP Ejecutar pruebas PHPUnit (Instalado por defecto por el Dockerfile)

     #### Entrar en el contenedor PHP
        docker-compose exec php bash

     #### Una vez dentro del contenedor, verifica la instalación
        cd /var/www/html
        composer install

     #### Método 1: Usando el script definido en composer.json
        ./vendor/bin/phpunit

     #### Desde fuera del contenedor (Recomendado)
     docker-compose exec php ./vendor/bin/phpunit

### NODE Ejecutar pruebas JEST (Instalado por defecto por package.json)

     #### Ejecutar todas las pruebas
         docker-compose exec node npm test

     #### Ejecutar pruebas en modo observación
         docker-compose exec node npm run test:watch

     #### Ejecutar pruebas con cobertura
         docker-compose exec node npm run test:coverage
         - Puedes ver los resultados en el archivo HTML dentro de la carpeta coverage

     #### Ejecutar pruebas con más información
         docker-compose exec node npm test -- --verbose

     #### Ejecutar una prueba específica
         docker-compose exec node npm test -- tests/unit/db.test.js
         docker-compose exec node npm test -- tests/integration/crud.test.js      

## DEBUG BUG (En caso de error)

1. **Navega hasta el directorio [`MyNew`](MyNew )**:
     ```bash
     cd /home/max144disk/Documentos/Estudios/MyNew
     ```

2. **Elimina cualquier contenedor existente**:
     ```bash
     docker-compose down
     ```

3. **Ajusta los permisos del directorio `mysql/bd`**:
     ```bash
     sudo chown -R $USER:$USER /(El directorio de su proyecto)/mysql/bd
     sudo chmod -R 755 /(El directorio de su proyecto)/mysql/bd
     ```

4. **Construye e inicia el contenedor Node.js**:
     ```bash
     docker-compose up --build node
     ```
### Si la tabla users tiene errores.

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

### Verificación
Asegúrate de que los archivos package.json y package-lock.json están en el directorio node y que el archivo index.js está en el directorio node/app.

### Nota
Si el problema persiste, puedes intentar ejecutar manualmente los comandos dentro del contenedor para verificar si hay algún problema específico:

1. **Inicia un shell interactivo en el contenedor Node.js**:
     ```bash
     docker-compose run node /bin/bash
     ```

2. **Verifica si los archivos están en el lugar correcto**:
     ```bash
     ls /usr/src/app
     ```

3. **Intenta instalar las dependencias manualmente**:
     ```bash
     npm install
     ```

4. **Intenta iniciar la aplicación manualmente**:
     ```bash
     npm start
     ```
- Esto debería ayudar a identificar y corregir cualquier problema específico con la configuración del Dockerfile o la estructura del proyecto. Después de ejecutar esto una vez, puedes salir del bash del Docker y ejecutar el comando normal para levantar el contenedor.

     ```
     docker-compose up node 
     ```

## Configuración del Git

1. **Inicializar Repositorio Git**
     ```bash
     git init
     ```

2. **Agregar .gitignore**
     El proyecto incluye un archivo `.gitignore` para excluir:
     - Dependencias y archivos de build de Node.js
     - Directorio vendor y archivos de entorno de PHP
     - Archivos de datos de MySQL
     - Configuraciones de IDE
     - Archivos de sistema
     - Informes de cobertura de pruebas

3. **Commit Inicial**
     ```bash
     git add .
     git commit -m "Commit inicial"
     ```

4. **Agregar Repositorio Remoto**
     ```bash
     git remote add origin <tu-repositorio-url>
     git branch -M main
     git push -u origin main
     ```

### Notas Importantes Relacionadas con Git:
- Nunca comites archivos `.env` que contengan datos sensibles
- Mantén dumps de base de datos en un lugar seguro separado
- Revisa los cambios antes de hacer commit para asegurarte de que no se incluya ningún dato sensible

docker system prune -a --volumes


