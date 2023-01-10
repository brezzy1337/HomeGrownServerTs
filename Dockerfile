# syntax=docker/dockerfile:1
FROM node
COPY ./ /app
WORKDIR /app
RUN npm install
CMD ["npm", "tests"]
