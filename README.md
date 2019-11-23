# GraphQL Node.js Authentication

### Installation
1. Clone the repo
```
$ git clone git@github.com:puncoz/graphql-authentication.git
```
2. Copy `.env.example` to `.env`
```
$ cp .env.example .env
```
3. Update the db credential, jwt secret key and port info in `.env` file
4. Install npm packages
```
$ yarn

Or,

$ npm install
```
4. Run migration
```
$ yarn sequelize:migrate
```
5. Start server
```
$ yarn start
```
6. Voila, browse the graphql url in browser.
```
eg: http://localhost:8081/api
```

### GraphQL
1. Signup
```
mutation{
  signup(username:"test", password:"secret", email:"test@test.com")
}
```

2. Login
```
mutation {
  login(username:"test", password:"secret")
}
```

3. Get Profile
    - Set following http header
    ```
    {
      "Authorization": "Bearer <JWT TOKEN>"
    }
    ```
    ```
    {
      me {
        username
        email
      }
    }
    ```

### Some sample scripts

- Initialize Sequelize
```
$ yarn sequelize:ini
```

- Create migration file
```
$ yarn sequelize:make:migration User --attributes username:string,email:string,password:string
$ yarn sequelize:make:migration Post --attributes user_id:integer,title:string,content:string
```

- Run migration
```
$ yarn sequelize:migrate
```
