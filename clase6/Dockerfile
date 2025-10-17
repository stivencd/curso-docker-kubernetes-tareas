FROM python:3.12-alpine AS builder

WORKDIR /app

# Copiar requirements
COPY requirements.txt .

# Evitar generar los archivos bytecode 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#Instalar dependencias y no almacenar en cache las depencias
RUN python -m venv /opt/venv && /opt/venv/bin/pip install --no-cache-dir -r requirements.txt


FROM python:3.12-alpine
RUN addgroup -g 1001 -S python && adduser -S python -u 1001
# Copiar los binarios del anterior stage
COPY --from=builder /opt/venv /opt/venv
WORKDIR /app
COPY . .
#Variable de entorno
ENV APP_PORT=5000
ENV FLASK_ENV=production

# Activar el entorno virtual
ENV PATH="/opt/venv/bin:$PATH"

RUN chown -R python:python /app
USER python

# Exponer el puerto del contenedor
EXPOSE ${APP_PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
 CMD wget -qO- http://localhost:5000/api/users/status || exit 1

#CMD ["python", "run.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
