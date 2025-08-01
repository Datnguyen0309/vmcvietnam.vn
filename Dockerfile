FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm i sharp

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV API_URL https://admindsome.devlab.info.vn/wp-json/wp/v2
ENV ODOO_URL http://10.10.51.16:10026
ENV ODOO_URL_PAYMENT https://eaof.aumpilot.com
ENV API_RMS_URL https://admindsome.devlab.info.vn//wp-json/rankmath/v1/getHead?url=https://admindsome.devlab.info.vn/
ENV NEXT_PUBLIC_DOMAIN https://evome.devlab.info.vn
ENV NEXT_PUBLIC_TOKEN_NEXT 610f25e22dbccb07171
ENV NEXT_PUBLIC_TOKEN_NEXT_PAYMENT 610f25e22dbccb07171
ENV SECRET 86c5931065c13ed78d2ba53c2e950d8
ENV EMAIL_USER itaum116ttcn@gmail.com
ENV EMAIL_PASS yonx azjv mgfo woyf

RUN addgroup --system --gid 1003 nodejs
RUN adduser --system --uid 1003 nextjs

COPY --from=builder /app/next.config.js ./ 
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]