#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo 'Running Node modules'
npm install --prefix /var/www/html

echo "generating application key..."
php artisan key:generate --show

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Optimize"
php artisan optimize 

mkdir storage/framework/{cache/data,views}
chmod -R 777 storage
