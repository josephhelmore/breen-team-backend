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

1. Run npm install

```
npm install
```

2. Set up databases through through psql command in npm script

```
npm run setup-dbs
```

3. Create .env.development inside the /db folder and set DATABASE_URL in the files.

```
DATABASE_URL=postgresql://{username}:{password}@localhost/breen_server
```

4. Push the schemas to create tables through drizzle-kit

```

npm run push-dev

```

## Test Setup

1. run npm install

```
npm install
```

2. Set up the databases through psql command in npm script if you it's not done as above

```
npm run setup-dbs
```

3. Create .env.test inside the /db folder and set DATABASE_URL in the files.

```
DATABASE_URL=postgresql://{username}:{password}@localhost/breen_server_test
```

4. Push the schemas to create tables through drizzle-kit

```

npm run push-test

```

4. Run the test through Vitest

```

npm t

```


# Running locally script order
npm run setup-dbs    -- create DB
npm run push-dev     -- create tables
npm run seed-dev     -- optional, add test data
npm run start        -- start server

# Testing script order
npm run setup-dbs   
npm run push-test
npm run test




