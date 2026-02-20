# From is used to tell docker where to downlaod and from where start.
FROM node:18 
# start from  the Backend directory .
WORKDIR /Backend
# Copy package.json file from  current directory.
COPY package*.json ./
RUN npm install 
#copy the content from the current directory in to the curent directory .
COPY . .

EXPOSE 4000
#Run command  to start container
CMD [ "npm", "start" ]