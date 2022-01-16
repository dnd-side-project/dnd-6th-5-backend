FROM node:16-alpine3.11

# Create working directory
WORKDIR /app

# Copy package.json file to work directory
COPY package.json .
RUN npm install

# Copy project
COPY . /app/

CMD [ "npm", "start" ]