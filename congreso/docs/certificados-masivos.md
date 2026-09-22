# Flujo de certificados presenciales y virtuales

## Regla aplicada para Pasto

- Todos los inscritos se cargan en `registrations`, hayan asistido o no.
- Quienes tienen **3 o más asistencias** se cargan en `attendances` con `source=presencial` y reciben un PDF pregenerado presencial.
- Quienes tienen 0, 1 o 2 asistencias reciben un PDF virtual pregenerado, pero permanece bloqueado.
- También reciben PDF virtual pregenerado quienes aparecen en el registro de asistencia virtual y no tienen prioridad presencial.
- Cuando una persona aprueba el Microsoft Forms, Power Automate crea su fila en `attendances` con `source=virtual`.
- La web nunca genera PDF: solo entrega un archivo pregenerado cuando existe la asistencia correspondiente.

El umbral se mantiene configurable con `--min-attendance`, pero para esta entrega se usa `3`.

## Generación local de Pasto

```bash
npm run certificates:batch -- \
  --input /ruta/asistentes_PRESENCIAL_PASTO.csv \
  --event-id ba74c6ac-d95a-4294-b6b7-60253ec0a3a9 \
  --type presencial \
  --min-attendance 3 \
  --overrides private/presencial-overrides.csv
```

El comando normaliza los documentos, corrige la codificación conocida del archivo, conserva la fila con mayor asistencia cuando un documento está duplicado y genera:

Las excepciones autorizadas se guardan en `private/presencial-overrides.csv`. Esta carpeta y todos los CSV/XLS/XLSX están ignorados por Git para evitar publicar datos personales. Una excepción entra en el grupo presencial aunque no esté en el archivo original o no cumpla el umbral.

- `registrations-supabase.csv`: todos los registrados únicos.
- `attendances-supabase.csv`: solo los elegibles presenciales.
- `certificates-supabase.csv`: registros de los PDF presenciales pregenerados.
- `pdf/`: un PDF presencial por elegible, nombrado con el documento normalizado.
- `manifest.csv`: trazabilidad entre persona, asistencia, archivo y ruta de Storage.
- `pending-virtual.csv`: personas que todavía deben aprobar el formulario virtual.
- `rejected.csv`: duplicados descartados o datos críticos inválidos.
- `data-warnings.csv`: datos que se conservan, pero requieren revisión, como correos mal escritos.

`--prepare-only` produce únicamente los CSV. `--pdf-only` produce únicamente los PDF. `--limit N` sirve para pruebas locales y está bloqueado cuando se usa `--upload`.

## Estado que verá cada persona en la web

| Datos existentes | Resultado |
| --- | --- |
| No está en `registrations` ni `attendances` | No se encontró registro |
| Está en `registrations`, pero no en `attendances` | Registrado; pendiente del formulario virtual |
| Está en `attendances` como `virtual`, sin PDF | La web genera el certificado virtual |
| Está en `attendances` como `presencial`, sin PDF | Se bloquea la generación virtual y se indica contactar a la organización |
| Tiene fila de `certificates` con PDF | La web entrega el PDF existente |

## Carga a Supabase

No se debe cargar nada antes de revisar los CSV, las advertencias, una muestra visual de los PDF y confirmar el umbral.

Cuando todo esté aprobado, el comando admite `--upload`. El orden automático es deliberado:

1. `registrations` con todos los inscritos.
2. PDF presenciales en el bucket `certificates`.
3. Filas de `certificates`.
4. Filas de `attendances` presenciales.

La asistencia se habilita al final para que una carga interrumpida no permita generar por error un certificado virtual.

```bash
npm run certificates:batch -- \
  --input /ruta/asistentes_PRESENCIAL_PASTO.csv \
  --event-id ba74c6ac-d95a-4294-b6b7-60253ec0a3a9 \
  --type presencial \
  --min-attendance 3 \
  --overrides private/presencial-overrides.csv \
  --upload
```

La operación usa `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` de `.env.local`. Nunca se debe exponer la clave administrativa en el navegador.

## Pregeneración virtual

```bash
npm run certificates:virtual-batch -- \
  --virtual-input "/ruta/Registro de Asistencia Virtual.xlsx" \
  --presencial-input /ruta/asistentes_PRESENCIAL_PASTO.csv \
  --event-id ba74c6ac-d95a-4294-b6b7-60253ec0a3a9 \
  --overrides private/presencial-overrides.csv
```

La regla une los documentos únicos del registro virtual con los presenciales de 0, 1 o 2 asistencias. Después elimina a toda persona que tenga 3 o más asistencias o una excepción presencial. Los PDF y CSV quedan en `output/certificates/<evento>/virtual`, una ruta ignorada por Git.

Con `--upload`, el comando sincroniza `registrations`, sube los PDF al bucket `certificates` y crea las filas de `certificates` con `certificate_type=virtual`. No inserta nada en `attendances`, por lo que los archivos continúan bloqueados.

## Microsoft Forms y Power Automate

El formulario debe pedir, como mínimo:

- documento, usando el mismo valor del registro;
- nombre completo;
- correo;
- respuestas o puntaje que permitan decidir si aprobó.

La función de Supabase `release-virtual-certificate` recibe el documento desde Power Automate. Antes de insertar comprueba que existen el registro y un certificado virtual pregenerado. La operación es idempotente y rechaza cualquier documento con modalidad presencial.

El flujo de Power Automate usa:

1. `Microsoft Forms - Cuando se envía una nueva respuesta`.
2. `Microsoft Forms - Obtener los detalles de la respuesta`.
3. `HTTP - POST` a `https://ceaujzhutblpjxynyfns.supabase.co/functions/v1/release-virtual-certificate`.
4. Encabezados `Content-Type: application/json` y `x-automation-secret` con el secreto guardado fuera del repositorio.
5. Cuerpo JSON con `eventId` y el valor dinámico de la pregunta `Número de documento (sin puntos ni espacios)`.

El importador ya está preparado. Cuando se conozcan los títulos definitivos de las columnas del Forms se ejecuta así:

```bash
npm run certificates:virtual -- \
  --input /ruta/respuestas-del-forms.xlsx \
  --pending output/certificates/ba74c6ac-d95a-4294-b6b7-60253ec0a3a9/presencial/pending-virtual.csv \
  --event-id ba74c6ac-d95a-4294-b6b7-60253ec0a3a9 \
  --document-column "Número de documento" \
  --approval-column "Resultado" \
  --approval-value "Aprobado"
```

El importador de respuestas exportadas se conserva como alternativa manual. Sin `--approval-column` y `--approval-value`, considera aprobadas todas las respuestas presentes. La carga se cancela si detecta una asistencia presencial.

## Formulario público gratuito en Supabase

La alternativa activa que no requiere Power Automate Premium está desplegada en:

`https://ceaujzhutblpjxynyfns.supabase.co/functions/v1/virtual-certificate-form`

El formulario guarda la reflexión, la pregunta y la recomendación en
`virtual_certificate_responses`. La tabla tiene RLS habilitado y no concede acceso a
`anon` ni `authenticated`; solamente la Edge Function puede escribir mediante el rol de
servicio. Al enviar una respuesta, la función valida que exista un PDF virtual
pregenerado y crea la asistencia virtual que habilita su consulta. Nunca genera un PDF
en línea ni habilita certificados presenciales. Las respuestas posteriores del mismo
documento no sobrescriben la primera respuesta registrada.
