FROM node:18-buster-slim


ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=19000
ENV PORT $PORT
EXPOSE 1900 19001 19002
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.10.212"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN apt-get update && apt-get install -y qemu-user-static
RUN yarn add @expo/ngrok

RUN mkdir /opt/my-app && chown root:root /opt/my-app
WORKDIR /opt/my-app
ENV PATH /opt/my-app/.bin:$PATH
USER root
COPY package.json package-lock.json ./
RUN yarn install

WORKDIR /opt/my-app
COPY . /opt/my-app/


CMD ["npx","expo", "start"]