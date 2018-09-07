FROM danlynn/ember-cli:3.3.0

RUN mkdir dodo-frontend
WORKDIR /dodo-frontend

COPY ./package.json .
RUN yarn install

COPY . .

ENTRYPOINT ["ember", "s"]
