FROM node:carbon-slim

# Create app directory
WORKDIR /sourcelambda_ag

# Install app dependencies
COPY package.json /sourcelambda_ag/
RUN npm install

# Bundle app source
COPY . /sourcelambda_ag/
RUN npm run prepublish

EXPOSE 5000

CMD [ "npm", "start" ]
