GoIT Node.js Course Template Homewor`<bearer token>`k

# Routes:

## /api/contacts

GET `/` `auth(<bearer token>)`

GET `/<id>` `auth(<bearer token>)`

POST `/` `auth(<bearer token>)` `body({ phone, name, email, favorite })`

DELETE `/<id>` `auth(<bearer token>)`

PUT `/<id>` `auth(<bearer token>)` `body({phone, name, email})`

PUT `/<id>/favorite` `auth(<bearer token>)` `body({ favorite })`

## /api/users

POST `/signup` `body({email, password})`

POST `/login` `body({email, password})`

GET `/logout` `auth(<bearer token>)`

GET `/current` `auth(<bearer token>)`

PATCH `/avatars` `auth(<bearer token>)`

## /api/avatars

GET `/<avatarFileName.extension>`

### Commands:

- `npm start` &mdash;
- `npm run start:dev` &mdash;
- `npm run lint` &mdash;
- `npm lint:fix` &mdash;
