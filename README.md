
DOCKER:
comando docker para levantar proyecto o contruir todo :
docker compose up
docker compose up --build


escalado del backend(para probar la escalabilidad):
docker compose up --scale server=2


aca logueamos en docker con las credenciales en azure de azure y etiquetamos la imagen ACR:
<img width="874" height="687" alt="Login desde Docker a tu ACR esto permite subir " src="https://github.com/user-attachments/assets/0bcb02d0-3830-4878-b684-bfc4e7377353" />


AZURE:
comandos utilizados en azure:

para crear recursos:
<img width="868" height="537" alt="Crear Resource Group" src="https://github.com/user-attachments/assets/359065f3-f772-46b8-b121-977771e5aa5d" />

para crear ACR:
<img width="874" height="747" alt="Crear Azure Container Registry (ACR)" src="https://github.com/user-attachments/assets/3681ecbb-708f-4520-b682-111c72f318f7" />

para obtener usuario y contraseñas:
<img width="865" height="765" alt="Obtener usuario y contraseña del ACR" src="https://github.com/user-attachments/assets/68248571-8725-4362-bd22-870a17fbc752" />

para etiquetar imagen en ACR:
para subir la imagen:
<img width="904" height="815" alt="Subir imagen push" src="https://github.com/user-attachments/assets/46bda32f-a7fa-4494-9f71-51d5625d592d" />

verificamos imagen contruidas:
<img width="882" height="190" alt="verificamos imagen en azure" src="https://github.com/user-attachments/assets/8cfea0c3-765e-4be6-a05d-0aa7d1b5e6b4" />

estructura de las carpetas:

<img width="368" height="915" alt="Captura de pantalla 2025-11-21 a la(s) 2 53 13 p m" src="https://github.com/user-attachments/assets/1bc85f46-5f75-4c82-b178-4b086f617a66" />


 Para contenedores AMD64  construcción de imágenes :

docker buildx build --platform linux/amd64 \
  -t checkvisit-server \
  ./server --load

 NGINX 

docker buildx build --platform linux/amd64 \
  -t checkvisit-nginx \
  -f nginx/Dockerfile \
  . \
  --load

BACKUP (cron y pg_dump)

docker buildx build --platform linux/amd64 \
  -t checkvisit-backup \
  ./backup --load
