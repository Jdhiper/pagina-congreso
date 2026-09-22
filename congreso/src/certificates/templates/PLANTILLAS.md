# Plantillas de certificados

El generador busca estos archivos en esta carpeta:

- `presencial.pdf`: certificado para las listas presenciales.
- `virtual.pdf`: certificado para las listas virtuales y para toda generación iniciada desde la web.

Si falta la plantilla de la modalidad solicitada, la generación se detiene. Esto evita entregar por error un certificado con el texto de otra modalidad.

Para la generación previa, pasa explícitamente el tipo al servicio:

```ts
await certificateService.generate(document, eventId, {
  certificateType: "presencial",
});
```

También se acepta `"virtual"`. Si la generación administrativa no pasa el parámetro, el servicio usa `attendances.source`: `presencial` genera la modalidad presencial; cualquier otro valor se trata como virtual.

La generación masiva y la importación se explican en `docs/certificados-masivos.md`.
