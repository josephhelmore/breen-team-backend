# The Breen Team Backend

## Description

The backend server for the game project of the breen team. \
Link to the hosted app: https://breen-team-fe-hcif.vercel.app \
Link to the hosted API: https://breen-team-backend.vercel.app/api \
Repo for the front end project: https://github.com/Gilson96/breen-team-FE



# App Plan 

![Alt text](app-plan.png)


## Dependencies

### Basic Dependencies

node-postgres \ 
tsx \
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
DATABASE_URL=postgresql://{username}:{password}@localhost/breen_server \
If you do not have a password, you can remove {password}

GOOGLE_CLIENT_ID={client_id}
GOOGLE_CLIENT_SECRET={client_secret}
SESSION_SECRET={session_secret}
Leave these blank for now

```

4. Push the schemas to create tables through drizzle-kit

```

npm run push-dev

```

5. Seed the dev-schema with the development data

```
npm run seed-dev
```

6. setup Google Auth
<details>
<summary> Setup steps for Oauth. </summary>
<br>
For this setup, a google client_id, client_secret and session secret is needed. \
To do this, there are a few steps to follow; 

1. Go to: https://console.cloud.google.com/apis/dashboard - You may need to login to your google account 

2. Click 'New Project' near the top left corner and give your project a name and make sure the location is set to 'No Organisation'

3. If you already have multiple projects - you may have to navigate to this new project via the 'Notification Bell' in the top right corner of the screen

4. On the left hand side there are a set of tabs, click on the 'Credentials' tab. This should open a page with an empty API Keys table

5. There will be a yellow box to remind you to configure your Consent Screen, click on the configure button. You will now be prompted to configure your app. 

6. Give your App a name and a contact email. 
    1.  Set your audience to external
    2.  Set your contact info to an email
    3.  Finish and create

7. You will now be redirected to the OAuth window. Click on 'Create OAuth Client'
    1.  Application type will be 'Web Application' and the name can be whatever you would like
    2.  Add URI - paste;  and change the PORT to a port you would like to use to run the Dev Environment
    ``` 
    http://localhost:{PORT}
    ``` 
    3.  Add redirect URI - paste; 
    ```
    http://localhost:{PORT}/api/auth/google/callback
    ```

    4. Click 'Create' and you will be given your client_id and client_secret in a popup. 
        1. Paste your client_id in your .env.production; GOOGLE_CLIENT_ID={client_id}
        2. Paste your client_secret in your .env.production; GOOGLE_CLIENT_SECRET={client_secret}

    5. Visit - https://key-generator.com
        1. paste this key into the SESSION_SECRET={session_secret} within the .env files


</details>

7. run dev
``` 
npm run dev

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
GOOGLE_CLIENT_ID={client_id}
GOOGLE_CLIENT_SECRET={client_secret}

Follow step 6 of dev setup if you have not done so yet.

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

npm run setup-dbs -- create DB \
npm run push-dev -- create tables \
npm run seed-dev -- optional, add test data \
npm run start -- start server

# Testing script order

npm run setup-dbs   \
npm run push-test  \
npm run test


## Contributors
Ricky - https://github.com/Colorrr34
Dan - https://github.com/SmackSmash
Gilson - https://github.com/Gilson96
Bruno - https://github.com/Sathoryn
