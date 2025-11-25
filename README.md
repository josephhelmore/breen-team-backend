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

## Dev Setup

1. Set up databases through through psql command in npm script

```
npm run setup-dbs
```

2. Create .env.development inside the /data folder and set DATABASE_URL in the files.

```
DATABASE_URL=postgresql://{username}:{password}@localhost/breen_server
```

3. Push the schemas to create tables through drizzle-kit

```

npm run push-dev

```

## Test Setup

1. Set up the databases through psql command in npm script if you it's not done as above

```
npm run setup-dbs
```

2. Create .env.test inside the /data folder and set DATABASE_URL in the files.

```
DATABASE_URL=postgresql://{username}:{password}@localhost/breen_server_test
```

3. Push the schemas to create tables through drizzle-kit

```

npm run push-test

```

4. Run the test through Vitest

```

npm t

```
