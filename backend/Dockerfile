FROM node:20.18.0

WORKDIR /home/navimar
COPY package*.json ./
RUN npm install 
COPY . ./
RUN npx prisma generate
CMD sh run.sh
