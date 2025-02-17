FROM php:8.0-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev

# Instalar extensiones PHP necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql zip

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configurar directorio de trabajo
WORKDIR /var/www/html

# Copiar composer.json primero para aprovechar la caché de Docker
COPY www/composer.json /var/www/html/

# Instalar dependencias
RUN composer install --no-interaction

# Copiar el resto de archivos
COPY www/ /var/www/html/