# syntax=docker/dockerfile:1

# ---- Stage 1: build the static site ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first so this layer is cached until package files change.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
ARG COMMIT_SHA=docker
ENV GITHUB_SHA=$COMMIT_SHA
RUN npm run build

# ---- Stage 2: serve with Nginx (no Node.js in the final image) ----
FROM nginx:1.27-alpine AS runtime
LABEL org.opencontainers.image.title="vishnu-portfolio" \
      org.opencontainers.image.source="https://github.com/vishi-vishnu/portfolio"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
