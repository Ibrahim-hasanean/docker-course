FROM node:alpine 
WORKDIR /app 
COPY package.json . 
# RUN npm install
ARG NODE_ENV 
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \ 
    else npm install --only=production; \
    fi
COPY . .
#we can overwrite port  in docker run command
ENV PORT 3000
# expose just for reading we  must define it wehn create container 
EXPOSE 3000
CMD ["node","index"] 