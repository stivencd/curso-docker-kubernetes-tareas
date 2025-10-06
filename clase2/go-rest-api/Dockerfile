FROM golang:1.25.1-alpine AS builder
WORKDIR /app
# Copy dependency files
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server ./cmd/server

FROM alpine:latest
RUN addgroup -g 1001 -S golang && adduser -S golang -u 1001
WORKDIR /app
COPY --from=builder /app/server .
ENV APP_PORT=8080
RUN chown -R golang:golang /app
USER golang
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
 CMD wget -qO- http://localhost:8080/status || exit 1

CMD ["./server"]