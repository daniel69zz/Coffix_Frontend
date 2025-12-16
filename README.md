# COFFIX – Sistema POS para Cafetería

COFFIX es un sistema POS (Point of Sale) desarrollado como proyecto académico para la materia **Sistemas de Información**.  
El sistema está orientado a cafeterías/minimarkets y permite gestionar **ventas**, **pedidos**, **productos**, **stock** y **usuarios con roles**, utilizando tecnologías modernas de desarrollo web.

---

## 🧩 Descripción del Proyecto

En muchos establecimientos pequeños, la gestión de ventas e inventarios aún se realiza de forma manual, lo que genera errores, pérdidas de información y retrasos en la atención al cliente.

COFFIX busca solucionar este problema mediante un **POS web**, accesible, organizado y escalable, que centraliza la información y mejora el control operativo del negocio.

---

## 🚀 Funcionalidades Principales

- Autenticación de usuarios
- Control de acceso por roles
  - Administrador
  - Cajero
  - Cocina
- Gestión de productos
  - Registro y edición
  - Categorías
  - Control de stock
- Gestión de pedidos
  - Creación de pedidos desde el carrito
  - Detalle de productos por pedido
  - Estados del pedido
- Registro de pagos
- Reposición de stock
- Interfaz amigable y responsive

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- React
- Vite
- React Router
- Styled Components

### Backend
- Java
- Spring Boot
- Spring Data JPA

### Base de Datos
- PostgreSQL

### Deploy
- Render (Frontend y Backend)

---

## 🗄️ Modelo de Base de Datos (Resumen)

Tablas principales del sistema:

- USUARIOS
- TIPO_ROL
- PRODUCTOS
- TIPOS_PRODUCTO
- PEDIDOS
- DETALLE_PEDIDO
- PEDIDO_PAGO
- RESTOCK_PRODUCTOS

El modelo está normalizado y diseñado para soportar operaciones transaccionales propias de un sistema POS.

---

## ⚙️ Requisitos del Sistema

- Node.js 18+
- Java 17 o 21
- PostgreSQL
- Maven

---

## ▶️ Ejecución del Proyecto en Local

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd coffix-pos