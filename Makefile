step01:
	npm i -g @nestjs/cli
step02:
	nest new notes
step03:
	curl -X POST http://localhost:40000/products -d '{ "title":"Jacket", "description":"Big and Tall, long sleeve, full zip", "price": 8000}'