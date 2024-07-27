FROM node:16.5.0-alpine3.14 As deb-builder

WORKDIR /dist/src/app

COPY package*.json ./

#RUN npm cache clean --force

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

#RUN npm install

RUN npm run build --configuration=production

#RUN ll

FROM nginx:latest

COPY /nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=deb-builder /dist/src/app/dist/my-proj /usr/share/nginx/html

EXPOSE 80