# MedicoSoft (c) 2019
# Made under Proprietary license
# Docker image for Node on Debian 10

FROM node:12.10.0-buster

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app/

RUN ls /
RUN ls /app
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

CMD ["npm", "start"]
