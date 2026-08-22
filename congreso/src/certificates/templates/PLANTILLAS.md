# Plantillas de certificados

El generador busca estos archivos en esta carpeta:

- `presencial.pdf`: certificado para las listas presenciales.
- `virtual.pdf`: certificado para las listas virtuales y para toda generación iniciada desde la web.

Mientras alguno de esos archivos no exista, el sistema utiliza `default.pdf` como respaldo para mantener el flujo operativo.

Para la generación previa, pasa explícitamente el tipo al servicio:

```ts
await certificateService.generate(document, eventId, {
  certificateType: "presencial",
});
```

También se acepta `"virtual"`. Si la generación administrativa no pasa el parámetro, el servicio usa `attendances.source`: `presencial` genera la modalidad presencial; cualquier otro valor se trata como virtual.
