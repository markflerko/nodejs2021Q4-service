build:
	docker build -t app .

run:
	docker run -d -p 4000:4000 -v logs:/app/logs -v db:/app/src/database --rm --name app app:latest

stop:
	docker stop app