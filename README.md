TP API Mongoose en NoSQL.


docker-compose up --build -d
docker run -p 5000:5000 --env-file .env api-mongoose
L'API tournera sur http://localhost:5000.
docker logs api_mongoose -f
