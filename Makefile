build:
	docker build -t app .

run:
	docker run -d -p 4000:4000 -v app:/app/database -v app:/app/logs --rm --name app app:latest

stop:
	docker run stop app