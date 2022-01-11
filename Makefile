build:
	docker build -t app .

run:
	docker run -d -p 4000:4000 -v logs:/app/logs --rm --name app app:latest

stop:
	docker stop app