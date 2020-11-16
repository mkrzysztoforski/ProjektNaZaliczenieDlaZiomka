# mNote

## Run

```bash
# Production
docker-compose build
docker-compose up

# Development
docker-compose up -d --build --force-recreate --no-deps

# List of running containers
docker ps

# Stop
docker-compose stop
```

## HTTP Request

### Create

```bash
curl --location --request POST 'http://localhost:8080/api/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "note": {
        "title": "{title}",
        "text": "{text}"
    }
}'
```

### Get ALL

```bash
curl --location --request GET 'http://localhost:8080/api/getAll'
```

### Get by id

```bash
curl --location --request GET 'http://localhost:8080/api/getById/{id}'
```

### Update

```bash
curl --location --request PUT 'http://localhost:8080/api/updateById' \
--header 'Content-Type: application/json' \
--data-raw '{
    "note": {
        "id": {id},
        "title": "{title}",
        "text": "{text}",
        "date": "{date}"
    }
}'
```

### Delete

```bash
curl --location --request DELETE 'http://localhost:8080/api/delete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "noteId": {id}
}'
```
