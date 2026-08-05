# 🤖 Control Remoto - Sistema de Prompts desde Celular

Un sistema para enviar prompts desde tu celular y ejecutarlos en la computadora.

---

## 📱 ¿Cómo funciona?

1. **Tu celular** → Escribe prompts en una interfaz web
2. **Servidor Node.js** → Recibe y almacena los prompts (puerto 3000)
3. **Tu computadora** → Los prompts aparecen aquí para ejecutar

---

## ⚙️ Instalación (primera vez)

### Paso 1: Instala las dependencias

```powershell
npm install
```

---

## 🚀 Cómo usarlo

### **Opción A: Ejecutar solo el servidor remoto**

```powershell
npm run remote
```

Verás:
```
🚀 Control Remoto - Sistema Activo
📱 Accede desde celular: 192.168.40.64:3000
💻 Servidor: http://localhost:3000
```

### **Opción B: Ejecutar todo junto (Vite + Servidor remoto)**

```powershell
npm run dev:all
```

Esto inicia:
- ✅ Servidor Vite (localhost:5173) → Tu sitio web
- ✅ Servidor remoto (localhost:3000) → Panel de control

---

## 📱 Desde tu CELULAR

1. **Conecta el celular a la misma WiFi** que tu PC
2. **Abre el navegador** en el celular
3. **Escribe en la barra de dirección:**

```
192.168.40.64:3000
```

4. **¡Listo!** Deberías ver la interfaz de control remoto

---

## 💡 Características

✅ **Escribe prompts desde celular**  
✅ **Los prompts se sincronizan en tiempo real**  
✅ **Marca prompts como ejecutados**  
✅ **Historial de todos los prompts**  
✅ **Diseño responsive (celular, tablet, desktop)**  
✅ **Sin necesidad de instalación en celular (solo navegador)**

---

## 📂 Archivos creados

```
teknic/
├── server.js                    # Servidor Node.js
├── public/remote-control.html   # Interfaz web
├── prompts-queue.json           # Base de datos de prompts
└── CONTROL_REMOTO.md           # Este archivo
```

---

## 🔧 Troubleshooting

### "No se conecta desde el celular"

- ✓ Verifica que ambos estén en la **misma WiFi**
- ✓ Asegúrate que el servidor esté corriendo (`npm run remote`)
- ✓ Intenta con `http://` (no HTTPS)
- ✓ Comprueba que el firewall no bloquee el puerto 3000

### "El servidor no inicia"

- Asegúrate de haber ejecutado `npm install`
- Si hay error de puerto, el 3000 podría estar en uso

### "Los prompts no se guardan"

- El archivo `prompts-queue.json` se crea automáticamente
- Verifica permisos de escritura en la carpeta del proyecto

---

## 📊 Cómo Claude ejecuta los prompts

Los prompts se guardan en `prompts-queue.json` y puedes:

1. **Ver el historial:** Los prompts aparecen en la interfaz web
2. **Marcar como ejecutados:** Haz clic en "Marcar como ejecutado"
3. **Programar ejecución automática:** (Opcional) Lee el archivo y ejecuta

---

## 🛑 Para detener el servidor

Presiona **Ctrl + C** en la terminal donde corre el servidor.

---

## 📝 Ejemplo de uso

1. En tu celular: "Revisa el archivo README.md y sugiere mejoras"
2. El prompt aparece en la interfaz
3. Haces clic en "Marcar como ejecutado"
4. El servidor lo marca como ✅

---

**¡Listo para usar!** 🚀
