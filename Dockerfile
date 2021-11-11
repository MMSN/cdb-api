FROM node:14-slim as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:14-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${production}
WORKDIR /app
COPY --from=builder app/dist /app/dist
COPY --from=builder app/package.json /app/
COPY --from=builder app/yarn.lock /app/
RUN yarn install --production
EXPOSE 3000
CMD [ "yarn", "start:prod" ]
