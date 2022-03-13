FROM node:16-alpine3.11

# Create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json file to working directory
COPY package*.json ./
RUN npm install

# Copy project
COPY . ./

CMD [ "npm", "start" ]