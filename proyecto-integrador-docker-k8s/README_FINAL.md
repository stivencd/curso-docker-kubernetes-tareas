  # Proyecto Final - Docker & Kubernetes

   **Alumno:** Stiven Castellon Duran <br>
   **Fecha de entrega:** 25/10/2025 <br>
   **Curso:** Docker & Kubernetes - i-Quattro <br>

## Links de Docker Hub
- Backend v2.1: https://hub.docker.com/repository/docker/stivid007/springboot-api/tags
- Frontend v2.2: https://hub.docker.com/repository/docker/stivid007/angular-frontend/tags

Nota: Para el proyecto integrador se utilizo microk8s registry

## Parte 1: Setup del Ambiente

**Ambiente utilizado:**
   - VirutalBox 
   - Nombre de VM/Instancia: [stiven-castellon-k8s]
   - Sistema operativo: Ubuntu 24.04.3 LTS (Noble Numbat)
   - Recursos:
 _____________________________________________________________________________
 | H/W path     | Device   | Class      | Description                          |
 |---------------|-----------|------------|--------------------------------------|
 |               |           | system     | Computer                             |
 | /0            |           | bus        | Motherboard                          |
 | /0/1          |           | memory     | 4 GiB System memory                  |
 | /0/2          |           | processor  | Intel(R) Core(TM) i7 CPU 860 @ 2.80 GHz |
 | /0/3          |           | generic    | Virtio file system                   |
 | /0/3/0        |           | generic    | Virtual I/O device                   |
 | /0/4          |           | display    | Basic Render Driver                  |
 | /0/0          |           | storage    | Virtio 1.0 console                   |
 | /0/0/0        |           | generic    | Virtual I/O device                   |
 | /0/5          |           | system     | PnP device PNP0b00                   |
 | /0/6          | scsi0     | storage    |                                      |
 | /0/6/0.0.0    | /dev/sda  | volume     | 388 MiB Virtual Disk                 |
 | /0/6/0.0.1    | /dev/sdb  | volume     | 1 GiB Virtual Disk                   |
 | /0/6/0.0.2    | /dev/sdc  | volume     | 1 TiB Virtual Disk                   |
 | /0/6/0.0.3    | /dev/sdd  | volume     | 1 TiB Virtual Disk                   |
 | /1            | usb1      | bus        | USB/IP Virtual Host Controller       |
 | /2            | usb2      | bus        | USB/IP Virtual Host Controller       |
 | /3            | eth0      | network    | Ethernet interface                   |

#### 1.2 Instalar microk8s

   - Rango MetalLB:
```bash
microk8s kubectl get ipaddresspool default-addresspool -n metallb-system -o jsonpath='{.spec.addresses[0]}'
172.30.197.190-172.30.197.200
```

```bash
microk8s status
```
   ![microk8s status](screenshots/parte1-1-2-microk8s-status.png)
   
```bash
microk8s kubectl get pods -A
```
   ![Pods running](screenshots/parte1-1-2-pods-running.png)

#### 1.3 Habilitar Addons

![microk8s addons enabled](screenshots/parte1-1-3-addons-enabled.png)


Exponiendo la IPAddress del frontend a traves de MetalLB
```bash
microk8s kubectl expose deployment frontend --port=80 --target-port=80 --type=LoadBalancer -n proyecto-integrador
```
Resultado:
![Frontend expose](screenshots/parte1-1-3-metallb-expose-frontend.png)

![Frontend via MetalLB](screenshots/parte1-1-3-frontend-browser.png)

Exponiendo la IPAddress del backend a traves de MetalLB

```bash
microk8s kubectl expose deployment api --port=8080 --target-port=8080 --type=LoadBalancer -n proyecto-integrador
```
Resultado:
![Backend via MetalLB](screenshots/parte1-1-3-metallb-expose-backend.png)

![Backend api](screenshots/parte1-1-3-api-backend.png)


#### 1.4 Instalar Git y Docker
Instalando Docker/git

![docker version](screenshots/parte1-1-4-git-docker-version.png)

---

## Parte 2: Iteración v2.1 

### Objetivo
Agregar un nuevo endpoint en el backend, versionar la imagen como v2.1, publicarla en tu Docker Hub y actualizar el deployment.

#### 2.1 Agregar Nuevo Endpoint

Captura del nuevo enpoint agregado:

![endpoint added](screenshots/parte2-2-1-enpoint-added.png)

#### 2.2 Build Imagen Docker v2.1

Captura de las images creadas con el tag: v2.1:

![docker images](screenshots/parte2-2-2-docker-images.png)

```bash
# Verificar imagen
docker images | grep springboot-api
```
![docker images api](screenshots/parte2-2-2-docker-images-api.png)

#### 2.3 Push a Microk8s registry

Las images fueron creadas en microk8s registry

![Url images](screenshots/parte2-2-3-url-images.png)

#### 2.4 Actualizar Deployment de Kubernetes

![upgrade-api-version](screenshots/parte2-2-4-upgrade-api-version.png)

#### 2.5 Aplicar Cambios
Estado del rollout aplicado al deployment:

![rollout deployment](screenshots/parte2-2-5-rollout-status-deployement.png)

Describe del pod:

![upgrade pod](screenshots/parte2-2-5-upgrade-pod.png)

Verificando los Pods

![kubectl get pods](screenshots/parte2-2-5-get-pods.png)

Captura del CURL al nuevo endopoint, se cambio la ruta porque ya existia uno definido en el codigo, para evitar error de ambiguedad al iniciar la aplicacion se cambio el endpoint

#### 2.6 Verificar Funcionamiento

![api_info response](screenshots/parte2-2-6-appinfo-response.png)

---

## Parte 3: Iteración v2.2 - 

#### 3.1 Modificar Frontend Angular

Modificando en el HTML: frontend/src/app/app.component.html

![html](screenshots/parte3-3-1-frontend-html-updated.png)

Modificando en el typescript: frontend/src/app/app.component.ts

![ts](screenshots/parte3-3-1-frontend-typescript-updated.png)

#### 3.2 Build Imagen Frontend v2.2

Los links de las images se encuentran en microk8s registry local

```bash
curl http://localhost:32000/v2/angular-frontend/tags/list
{"name":"angular-frontend","tags":["v2.2","v2.0"]}
```
![docker url images](screenshots/parte3-3-2-url-images.png)

#### 3.3 Actualizar Deployment

![update deployment yaml](screenshots/parte3-3-3-update-deployment-yaml.png)

#### 3.4 Aplicar Cambios

Captura de los pods actualizando durante el rollout

![get pods](screenshots/parte3-3-4-get-pods-w.png)

Captura del rollout status

![rollout status](screenshots/parte3-3-4-frontend-rollout-status.png)


#### 3.5 Verificar Funcionamiento

Captura del nuevo boton agregado en el frontend:

![browser](screenshots/parte3-3-5-browser.png)

Exponiendo los puertos con metalLB:

![expose metalLB](screenshots/parte3-3-5-expose-ports.png)


## Parte 4: Gestión de Versiones con Rollout

### Objetivo
Aprender a gestionar versiones de deployments usando comandos de rollout (rollback, rollforward, historial).

#### 4.1 Ver Historial de Rollouts

```bash
# Ver historial del backend
kubectl rollout history deployment/api -n proyecto-integrador
```
![backend rollout history](screenshots/parte4-4-1-backend-rollout-history.png)

```bash
# Ver historial del frontend
kubectl rollout history deployment/frontend -n proyecto-integrador
```

![frontend rollout history](screenshots/parte4-4-1-frontend-rollout-history.png)


#### 4.2 Hacer Rollback a Versión Anterior

```bash
# Rollback del backend a v2.0
kubectl rollout undo deployment/api -n proyecto-integrador
```

![rollout undo process](screenshots/parte4-4-2-rollout-undo-process.png)

```bash
# Ver el proceso
kubectl rollout status deployment/api -n proyecto-integrador
```

![rollout undo status](screenshots/parte4-4-2-rollout-undo-status.png)

```bash
# Verificar que el endpoint /api/student/info ya NO existe
http://172.30.197.191:8080/api/student/info
# Debería dar error 404
```

![rollout undo validate](screenshots/parte4-4-2-rollout-undo-validate.png)

```bash
# Verificar
curl http://172.30.197.191:8080/api/student/info
# Debería dar error 404
```

![alt text](screenshots/parte4-4-2-rollout-undo-curl.png)

#### 4.3 Volver a la Versión v2.1 (Rollforward).

```bash
# Ver historial actualizado
kubectl rollout history deployment/api -n proyecto-integrador
```

![rollout history updated](screenshots/parte4-4-3-rollout-history-updated.png)

```bash
# Rollback a la revisión 2 (que es v2.1)
kubectl rollout undo deployment/api --to-revision=5 -n proyecto-integrador
```
![rollout undo to v2.1](screenshots/parte4-4-3-rollout-undo-to-v2.1.png)

![rollout undo completed](screenshots/parte4-4-3-rollout-undo-to-v2.1-completed.png)

```bash
# Verificar
curl http://172.30.197.191:8080/api/student/info
# Debería funcionar nuevamente
```
![rollout undo to v2.1 curl](screenshots/parte4-4-3-rollout-undo-to-v2.1-curl.png)

![rollout undo to v2.1 browser](screenshots/parte4-4-3-rollout-undo-to-v4.2-browser.png)

#### Explicación en tus propias palabras: ¿Qué hace `kubectl rollout undo`?

Rollout permite hacer un rollback de un deployment actual a uno anterior, es como deshacer los utlimos cambios realizados 

---

## Parte 5: Acceso Externo via Ingress + MetalLB 

### Objetivo
Verificar que el acceso externo funciona correctamente sin necesidad de port-forward, simulando un entorno cloud real.


#### 5.1 Verificar Configuración de Ingress

```bash
# Ver configuración del Ingress
kubectl get ingress -n proyecto-integrador
```
![kubectl get ingress](screenshots/parte5-5-1-kubectl-get-ingress.png)

```bash
# Ver detalles
kubectl describe ingress app-ingress -n proyecto-integrador
```

![kubectl describe ingress](screenshots/parte5-5-1-kubectl-describe-ingress.png)

#### 5.2 Verificar MetalLB

```bash
# Ver servicios de MetalLB
kubectl get svc -n proyecto-integrador
```
![kubectl get svc](screenshots/parte5-5-2-kubectl-get-svc.png)

```bash
# Ver configuración de MetalLB
kubectl get ipaddresspool -n metallb-system
```

![kubectl get ipaddresspool](screenshots/parte5-5-2-kubectl-get-ipaddresspool.png)

#### 5.3 Probar TODOS los Endpoints via IP Externa

Desde el navegador o curl, probar:

```bash
# Frontend
curl http://172.30.197.190/
```

![curl frontend](screenshots/parte5-5-3-curl-frontend.png)

```bash
# API Users
curl http://172.30.197.191:8080/api/users
```
![curl api](screenshots/parte5-5-3-curl-api-users.png)

```bash
# API Greeting
curl http:///172.30.197.191:8080/api/greeting
```
![curl api greeting](screenshots/parte5-5-3-curl-api-greeting.png)

```bash
# API Info (nuevo)
curl http://172.30.197.191:8080/api/student/info
```

![curl api info nuevo](screenshots/parte5-5-3-curl-api-info-nuevo.png)

```bash
# Actuator Health
curl http://172.30.197.191:8080/actuator/health
```

![curl actuator](screenshots/parte5-5-3-curl-actuator.png)

### Puntos Extra

- **Validar HPA (Horizontal Pod Autoscaler)** (+5%)
  - Generar carga desde un pod busybox: `kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -n proyecto-integrador -- /bin/sh -c "while true; do wget -q -O- http://api-service:8080/api/users; done"`
  - En otra terminal, observar: `kubectl get hpa -n proyecto-integrador -w`
```bash
microk8s kubectl get hpa -n proyecto-integrador -w
NAME      REFERENCE        TARGETS                         MINPODS   MAXPODS   REPLICAS   AGE
api-hpa   Deployment/api   cpu: 47%/70%, memory: 53%/80%   2         5         2          47h
api-hpa   Deployment/api   cpu: 190%/70%, memory: 55%/80%   2         5         2          47h
api-hpa   Deployment/api   cpu: 199%/70%, memory: 57%/80%   2         5         4          47h
api-hpa   Deployment/api   cpu: 161%/70%, memory: 33%/80%   2         5         4          47h
api-hpa   Deployment/api   cpu: 173%/70%, memory: 34%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 143%/70%, memory: 31%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 133%/70%, memory: 34%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 138%/70%, memory: 35%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 135%/70%, memory: 36%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 128%/70%, memory: 41%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 162%/70%, memory: 42%/80%   2         5         5          47h
api-hpa   Deployment/api   cpu: 104%/70%, memory: 44%/80%   2         5         5          47h
```

  - Screenshot de HPA mostrando el incremento de CPU y replicas

El incremento esta superior al > 70% en CPU
  ![pextra kubectl get hpa](screenshots/puntoextra-1-kubectl-get-hpa.png)


  - Screenshot de `kubectl get pods -n proyecto-integrador` mostrando los pods adicionales creados

   Se adiciono un total de 5 pods para el backend

  ![kubectl get pods](screenshots/puntoextra-1-kubectl-get-pods.png)

  - Documentar el proceso: estado inicial → generar carga → observar escalado → detener carga (Ctrl+C) → observar scale down

  1.- Estado inicial: se pudo observar que el consumo de CPU estaba por debajo de los limites y las replicas de pods como minimo 2.

  2.- Con la generacion de carga: se pudo observar que el consumo de CPU era superio a los 70% el cual llego a un total de 5 replicas para el backend.

  3.- Scale Down: Despues de detener la prueba de carga se pudo observar que despues de los 5minutos las replicas fueron terminando hasta llegar a 2 replicas.

![scale down](screenshots/puntoextra-1-scale-down.png)

![sclae down](screenshots/puntoextra-1-kubectl-get-pods-scaledown.png)


- **Validar Health Probes** (+3%)
  - Forzar fallo del backend (kill process dentro del pod)
  Se ejecutara el comando para ocasionar el reinicio del pod:

  ```bash
  microk8s kubectl exec -it api-66dd87bbdd-9ntfw -n proyecto-integrador -- kill 1
  ```
  - Screenshot de Kubernetes reiniciando el pod automáticamente
  
  El pod se reiniciará automáticamente:
  ![kubectl get pods](screenshots/puntoextra-2-kubectl-get-pods.png)

  Revisando eventos en terminal:
  ![events](screenshots/puntosextra-2-events.png)

  ```bash
  microk8s kubectl describe pod api-66dd87bbdd-9ntfw -n proyecto-integrador  | grep -A5 "liveness"
  ```
  ![alt text](screenshots/puntosextra-2-liveness.png)

  - Explicar cómo liveness probe detectó el fallo

  Al ocasionar un fallo en el pod, kubernetes intenta reiniciar el pod intentando validar el liveness/readiness despues de 60 segundos de tiempo para iniciar, el pod nunca llega a READY

  El pod se reinicia automáticamente hasta esta en Ready nuevamente:
  ![ready](screenshots/puntosextra-2-ready.png)


- **Persistencia de Datos** (+2%)
  - Eliminar el pod de PostgreSQL
  Ejecutar el comando para eliminar el pod de PostgreSQL
  ```bash
  microk8s kubectl delete pod postgres-0 -n proyecto-integrador
  ```

    - Verificar que los datos persisten cuando se recrea

  El pod se recreaa nuevamente:
  ![delete pod](screenshots/puntosextra-3-delete-pod.png)

  Validar el PVC(Peristence Volume Claim) con el comando:
    ```bash
    kubectl get pvc  -n proyecto-integrador
    ```

    ![pvc](screenshots/puntosextra-3-pvc.png)

  - Screenshot del proceso

  Validar persistencia ejecutando el comando:

  ```bash
  microk8s kubectl exec -it postgres-0 -n proyecto-integrador -- bash 

  postgres-0:/$ psql -U curso -d apidb

  ```
![postgres persistence](screenshots/parte-3-persistence.png)

---
