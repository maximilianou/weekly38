step01:
	npm i -g @nestjs/cli
step02:
	nest new notes
step03:
	curl -X POST http://localhost:40000/products -H "Content-Type: application/json" -d '{ "title":"Jacket", "description":"Big and Tall, long sleeve, full zip", "price": 8000}'
step04:
	curl http://localhost:40000/products
