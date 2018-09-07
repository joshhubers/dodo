FROM node:10

RUN mkdir dodo-backend
WORKDIR /dodo-backend

COPY ./package.json .
RUN yarn

COPY . .

ENTRYPOINT ["npm", "start"]
