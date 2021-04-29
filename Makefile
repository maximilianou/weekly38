step01:
	npm i -g @nestjs/cli
step02:
	nest new notes
step03:
	curl -X POST http://localhost:40000/products -H "Content-Type: application/json" -d '{ "title":"Jacket", "description":"Big and Tall, long sleeve, full zip", "price": 8000}'
step04:
	curl http://localhost:40000/products
step10:
	nest new articles
step11:
	cd articles && npm install @nestjs/graphql graphql-tools graphql apollo-server-express
	cd articles && npm install class-validator
	cd articles && npm install uuid
step12:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"mutation { create(  createUserData: { email: \"maximilianou@gmail.com\", age: 46}){ userId, email, age, isSubscribed } }"}'
step13:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"query { user(  userId: \"71d281d4-8ae3-44d9-af64-78a5dac525f9\"){ userId, email, age, isSubscribed } }"}'
step14:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"mutation { update( updateUserData: { userId: \"71d281d4-8ae3-44d9-af64-78a5dac525f9\", age: 47}){ userId, email, age, isSubscribed } }"}'
step20:
	cd articles && npm run start:dev
	
