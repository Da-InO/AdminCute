FROM node:20


WORKDIR /app


# Instalar dependencias
COPY package*.json ./
RUN npm install -g @angular/cli && npm install


# Copiar el código fuente
COPY . .


# Exponer el puerto de desarrollo Angular
EXPOSE 4200


# Comando para iniciar el servidor de desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0"]