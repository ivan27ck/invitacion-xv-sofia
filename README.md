# Invitación XV Años · Sofia

Invitación web interactiva con temática **Alicia en el País de las Maravillas**.

## Secciones

1. **Presentación** — Nombre, subtítulo, fecha y animaciones de entrada
2. **Contador** — Cuenta regresiva hasta el evento

## Estructura del proyecto

```
invitacion-xv-sofia/
├── index.html              # Página principal
├── README.md
├── assets/
│   └── images/             # Fondos e imágenes
├── css/
│   ├── main.css            # Importa los demás estilos
│   ├── base.css            # Variables, layout, utilidades
│   ├── presentacion.css    # Estilos sección presentación
│   └── contador.css        # Estilos sección contador
└── js/
    ├── main.js             # Punto de entrada
    ├── config.js           # Fecha del evento
    ├── reveal.js           # Animaciones al hacer scroll
    ├── presentacion.js     # Secuencia animada de presentación
    ├── countdown.js        # Contador regresivo
    └── text-draw.js        # Título letra por letra
```

## Configuración

Edita la fecha del evento en `js/config.js`:

```js
export const EVENT_DATE = new Date('2026-11-14T19:00:00');
```

## Vista local

Abre `index.html` con un servidor local (recomendado por los módulos ES):

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Luego visita `http://localhost:8080`.

## GitHub Pages

1. Sube este repositorio a GitHub
2. Ve a **Settings → Pages**
3. En **Source**, selecciona la rama `main` y carpeta `/ (root)`
4. Guarda — la invitación quedará en `https://tu-usuario.github.io/tu-repo/`

## Tecnologías

- HTML5, CSS3, JavaScript (ES modules)
- Fuentes: [Google Fonts](https://fonts.google.com/) — Great Vibes, Montserrat, Cinzel, Cormorant Garamond
- Sin dependencias externas
