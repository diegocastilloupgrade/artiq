# Instrucciones de trabajo para Copilot en este repositorio

## Regla obligatoria de trazabilidad

En cada tarea, documentar cada paso ejecutado en el fichero de trazabilidad del repositorio:
- `docs/cambios-operativos.md`

Cada entrada debe incluir:
- Fecha (YYYY-MM-DD)
- Hora (HH:mm, zona local del usuario)
- Descripcion breve del paso realizado
- Resultado del cambio (creado, editado, configurado, validado, error, revertido)
- Funcionalidad spec o area afectada (git, branch protection, docs, etc)

## Momento de registro

- Registrar durante la ejecucion (paso a paso), no solo al final.
- Si hay un error, registrar el intento y la correccion aplicada.
- Si no hay cambios de ficheros pero si cambios de configuracion/comandos, registrarlo igual.

## Formato recomendado de linea

- `YYYY-MM-DD HH:mm | tipo | descripcion | resultado`

Ejemplo:
- `2026-04-29 15:10 | git | Configurada proteccion de rama main con PR obligatoria | configurado`

## Alcance

Estas reglas aplican a todos los chats y sesiones sobre este repositorio.