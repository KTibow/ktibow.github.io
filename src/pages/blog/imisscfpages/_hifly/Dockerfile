FROM node:alpine

WORKDIR /app

COPY index.html .

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-p", "80"]
