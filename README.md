# Urbanist Telegram WebApp

## Параметры среды

| Параметр    | Описание      | Обязательный | Значение по умолчанию |
| ----------- | ------------- | ------------ | --------------------- |
| BACKEND_URL | Адрес бэкенда | ✅            |                       |

## Продакшн

1. Скопировать .env.example в .env
2. Изменить параметры в .env под себя
3. Сбилдить и поднять фронтенд с заданными параметрами на порту 80:

```sh
# Run with Docker Compose
docker compose -f docker-compose.dev.yml up -d
# или
docker compose up -d

# Run with Docker
docker build -t telegram-web-app .
docker run -d -p 80:80 telegram-web-app
```

## Разработка

```sh
# Запуск в development mode
npm start

# Линтинг
npm run lint
```
