# Despliegue FTP — Crypto Experience Summit

Este proyecto se publica como **sitio estático Next.js** + **API PHP** + **MySQL** en el mismo hosting WordPress (PHP + MySQL garantizados).

## Despliegue actual: subcarpeta `/crypto-experience-summit`

### 1. Compilar

```bash
npm run build:subfolder
cp deploy/subfolder.htaccess out/.htaccess
```

### 2. Subir por FTPS

```bash
FTP_PASSWORD='tu-contraseña' ./scripts/upload-ftp.sh
```

Si la contraseña contiene `#`, usa comillas simples. El script pasa la clave en una linea aparte para que no se corte.

Si ves `530 Login authentication failed`, verifica usuario/contraseña en cPanel → FTP Accounts.

Servidor: `ftp.ideaswebbolivia.com` · Usuario: `web@digitalpartners.lat` · Puerto: `21` (FTPS explícito)

### 3. Verificar

`https://digitalpartners.lat/crypto-experience-summit/`

---

## Despliegue completo (con networking + MySQL)

1. En cPanel / phpMyAdmin, crea una base de datos MySQL y un usuario con permisos.
2. Ejecuta [`db/schema.sql`](../db/schema.sql).
3. Carga los tickets válidos con [`db/seed_tickets.sql`](../db/seed_tickets.sql) o inserta los números reales manualmente:

```sql
INSERT INTO attendees (ticket_number) VALUES ('TU-TICKET-001');
```

## 2. Configurar la API

Edita [`api/config.php`](../api/config.php) con:

- `db_host`, `db_name`, `db_user`, `db_pass`
- `app_secret` — cadena larga y aleatoria (para firmar tokens)

## 3. Generar el sitio estático

```bash
npm run build
npm run prepare-deploy
```

Esto genera la carpeta `out/` y copia `api/`, `uploads/` y `.htaccess`.

## 4. Subir por FTP

Sube **el contenido de `out/`** al directorio web del dominio (normalmente `public_html/`):

```
public_html/
├── index.html
├── networking/
├── agenda/
├── api/
│   ├── config.php
│   ├── login.php
│   └── ...
├── uploads/          ← permisos de escritura (755 o 775)
└── .htaccess
```

## 5. Permisos

- `uploads/` debe ser escribible por PHP (755 o 775 según el hosting).
- `api/config.php` no debe ser accesible desde el navegador (protegido por `api/.htaccess`).

## 6. Coexistencia con WordPress

Si WordPress ya ocupa el dominio, tienes dos opciones:

**Opción A (recomendada):** usar un subdominio para el summit, p. ej. `summit.tudominio.com`, y subir ahí todo el contenido de `out/`.

**Opción B:** reemplazar el frontend de WordPress en la raíz. WordPress seguirá disponible en `/wp-admin` si conservas sus archivos, pero el `.htaccess` del sitio estático debe servir archivos existentes antes de reescribir a WordPress. Ajusta según tu hosting.

## 7. Probar networking

1. Abre `/networking/`
2. Deberías ver el mensaje de acceso exclusivo.
3. En "Primera vez", usa un ticket cargado en la BD y configura contraseña.
4. Completa tu perfil y verifica que apareces en el directorio.
5. El botón "Conectar por LinkedIn" abre el perfil en una pestaña nueva.

## Variables de entorno (desarrollo local)

Para apuntar el frontend a una API local durante desarrollo:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8080/api
```

En producción no hace falta: la API vive en `/api` del mismo dominio.
