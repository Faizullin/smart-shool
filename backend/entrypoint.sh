#!/bin/bash

# Wait for the database to be ready
# echo "Waiting for database... with ${DB_HOST}  ${DB_PORT}". 
# while ! nc -z $DB_HOST $DB_PORT; do
#     echo "Waiting for PostgreSQL to be available..."
#     sleep 1
# done
# echo "Database is ready!"

# echo "Waiting for database... with ${DB_HOST} ${DB_PORT}" ;
# sleep 3 
# echo "Database is ready (maybe)";

# python3  manage.py makemigrations;
# python3  manage.py migrate;

python3 manage.py collectstatic --noinput;


# # Seed the database
# python3 manage.py shell <<EOF
# from seeding.seed import seed
# seed()
# EOF

# Start the server
exec "$@"
