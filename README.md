# Parking lot (NestJs with Typescript)

## Used tech :computer:

- Docker Compose
- Typescript
- Node with NestJs back end
- Prisma database using PostgreSQL

## Installation (with Docker) :rocket:

- Development: run `docker-compose up backend`

## Run :sparkles:

- Backend : [http://localhost:3000/api](http://localhost:3000/api)

Connect Database:

```
- Add new server:
  + Host name: localhost
  + Port: 5432
  + Maintenance DB: thvivat
  + Username: thvivat
  + Password: thvivat
```

## When the app is ready. First thing you must do create parking lot

- POST : [http://localhost:3000/api/parking-lot](http://localhost:3000/api/parking-lot)
```
JSON BODY
{
    "name": "test", // anything
    "address": "test", // anything
    "free": 0,
    "pricePerHour": 0
}
```

## API Parking Lot
- Find all parking lot
    - GET : [http://localhost:3000/api/parking-lot](http://localhost:3000/api/parking-lot)

- It should provide us with api to park the car
    - POST : [http://localhost:3000/api/tickets](http://localhost:3000/api/tickets)
```
JSON BODY
{
    "parkingLotId": 1,
    "plateNumber": "AA-1", // anything
    "carSize": "large" // small, medium, large
}
```

- It should provide us with api to leave the slot
    - PATCH : [http://localhost:3000/api/tickets/leave-slot/:ticketId](http://localhost:3000/api/tickets/leave-slot/:ticketId)

- It should provide us with api to get status of parking lot
    - GET : [http://localhost:3000/api/parking-lot/status/:parkingLotId](http://localhost:3000/api/parking-lot/status/:parkingLotId)

- It should provide us with api to get registration plate number list by car size (:size = small, medium, large)
    - GET : [http://localhost:3000/api/tickets/plate-numbers/:size](http://localhost:3000/api/tickets/plate-numbers/:size)

- It should provide us with api to get registration allocated slot number list by car size (:size = small, medium, large)
    - GET : [http://localhost:3000/api/tickets/slot-numbers/small](http://localhost:3000/api/tickets/slot-numbers/small)