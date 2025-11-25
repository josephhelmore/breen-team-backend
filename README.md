# The Breen Team Backend

## Description

The backend server for the game project of the breen team

## Dependencies

### Basic Dependencies

node-postgres \ tsx \
Drizzle-kit \
Drizzle-ORM \
express

### Dev Dependencies

Vitest \
jest-extended

## Test Setup

1. Set up the database for test through psql command in npm script

```
npm run setup-dbs
```

2. Create .env.development and .env.test inside the /data folder and set DATABASE_URL in the files.

3. Push the schemas to create tables through drizzle-kit

```
npm run push-test
```

4. Run the test through Vitest

```
npm t
```
