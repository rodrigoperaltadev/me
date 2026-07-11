# Estructuras de Artículos por Formato (Templates)

Este documento contiene las plantillas estructurales para cada formato de blog definido. Usalas como guía al redactar tus archivos `.mdx`.

---

## 1. 📖 Story Code
*Foco: Narrar un problema de producción real, cómo se intentó solucionar de forma incorrecta, la solución real con código y las métricas resultantes.*

### Estructura:
1. **El Quilombo (Contexto)**
   - Introducción rápida de la aplicación y qué dolor de cabeza teníamos en producción (ej. bugs silenciosos, memory leaks, lentitud en el build).
2. **El Diagnóstico**
   - Cómo nos dimos cuenta del problema y qué herramientas de monitoreo o debugging usamos (ej. Knip, React Profiler, logs).
3. **El Camino Equivocado (Aprendizaje)**
   - Qué intentamos primero que parecía la solución lógica pero falló, empeoró la situación o introdujo nuevos bugs.
4. **La Solución (El Código)**
   - Explicación paso a paso del refactor con snippets de código limpios. Mostrá el "antes" y el "después" si es relevante.
5. **Los Resultados (La Foto Final)**
   - Métricas y datos duros: cuánto mejoró la performance, cuántas líneas de código muerto se borraron, o qué feedback dio el cliente.

---

## 2. 🥊 Versus
*Foco: Comparar dos tecnologías, librerías o enfoques de arquitectura cara a cara, obligando a dar un veredicto claro.*

### Estructura:
1. **La Disputa**
   - Cuál es el dilema actual que enfrenta un desarrollador al elegir entre estas dos opciones y por qué es relevante hoy.
2. **Contendiente A: [Nombre]**
   - Breve introducción, pros clave y contras notorios.
3. **Contendiente B: [Nombre]**
   - Breve introducción, pros clave y contras notorios.
4. **La Tarjeta de Puntuación**
   - Tabla comparativa o puntuación en ítems clave:
     - **Developer Experience (DX)**: Facilidad de setup, documentación, tooling.
     - **Rendimiento**: Consumo de recursos, velocidad, peso.
     - **Ecosistema**: Comunidad, plugins, actualizaciones frecuentes.
5. **Veredicto Final**
   - Definir un ganador indiscutido o, en su defecto, un empate técnico detallando exactamente para qué tipo de proyecto o equipo sirve cada opción.

---

## 3. ⏱️ Contacto Estrecho
*Foco: Análisis honesto y sin filtros de una nueva tecnología tras las primeras 4 a 8 horas de uso.*

### Estructura:
1. **El Hype**
   - Qué es esta tecnología, por qué todo el mundo está hablando de ella y qué problema promete resolver.
2. **La Fricción del Setup**
   - Del `npm install` al primer `Hello World`. ¿Fue directo o tuvimos que pelear con configuraciones y bugs de versiones?
3. **La Prueba de Campo**
   - Qué mini-proyecto o PoC armamos para probar sus límites (ej. una API simple, un componente de UI complejo).
4. **Lo Bueno y lo Malo (Sin Filtros)**
   - Lista directa de lo que nos encantó y lo que nos frustró del día a día con la herramienta.
5. **Veredicto Senior**
   - ¿Vale la pena adoptarla para producción hoy en día o es mejor esperar a que madure?

---

## 4. 🦉 Codelingo
*Foco: Resolver un mismo desafío lógico o de interfaz en lenguajes o entornos diferentes, comparando sintaxis y DX.*

### Estructura:
1. **El Desafío**
   - Qué problema de ingeniería o patrón queremos resolver (ej. manejo de estado asíncrono, concurrencia, animaciones).
2. **Enfoque A: [Stack/Lenguaje A]**
   - Snippet de código de la solución, explicación rápida del flujo y nivel de dificultad percibido.
3. **Enfoque B: [Stack/Lenguaje B]**
   - Snippet de código de la solución, explicación rápida del flujo y nivel de dificultad percibido.
4. **La Comparación Técnica**
   - Análisis de cuál sintaxis es más limpia, cuál es más fácil de testear unitariamente y cuál tiene mejor performance nativa.

---

## 5. 🛠️ Toolkit (Tops)
*Foco: Recopilaciones de herramientas o recursos con criterio subjetivo y profesional.*

### Estructura:
1. **El Dolor**
   - Por qué necesitamos este conjunto de herramientas (ej. optimizar nuestro flujo de trabajo, mejorar accesibilidad, debuggear más rápido).
2. **La Selección Curada**
   - Lista de 3 a 5 herramientas/librerías con:
     - Qué problema resuelve.
     - Cuándo deberías usarla y cuándo no.
     - Una alternativa conocida.
3. **Mi Configuración**
   - Tips rápidos o configuraciones que usás en tu día a día para sacarles el máximo provecho.

---

## 6. 🔬 Deep Dive
*Foco: Explicación técnica profunda y rigurosa de un concepto, feature o librería específica.*

### Estructura:
1. **El Concepto Base**
   - Explicación teórica de cómo funciona tras bambalinas (ej. renderizado en el servidor, reconciliación del DOM, concurrencia).
2. **Paso a Paso (Hands-On)**
   - Código limpio de menor a mayor complejidad estructurado de manera que el lector pueda replicarlo.
3. **Los "Gotchas" (Trampas)**
   - Errores comunes, comportamientos extraños no documentados y detalles finos que te vas a chocar cuando lleves este código a producción.

---

## 7. 🗣️ Tengo que bajar yo a explicar todo
*Foco: Explicar un concepto técnico complejo de forma divertida con analogías de la vida cotidiana y ejemplos lúdicos.*

### Estructura:
1. **La Sentencia**
   - Introducción picante o cómica sobre el concepto que se suele usar mal o del cual la gente opina sin saber.
2. **La Analogía Mundana**
   - Explicar el concepto usando un ejemplo de la vida cotidiana (comida, autos, fútbol, etc.) para que se entienda el núcleo de la idea.
3. **El Concepto Real (La bajada técnica)**
   - Explicar formalmente pero de manera súper accesible el término técnico.
4. **Ejemplo de la vida real**
   - Un caso rápido donde se demuestre la utilidad real del concepto.

---

## 8. 🔇 Sin código
*Foco: Ensayos de opinión, debatir sobre cultura dev, metodologías de trabajo y soft skills sin mostrar una sola línea de código.*

### Estructura:
1. **El Disparador**
   - Un mito arraigado en la industria, un post polémico de redes o una vivencia real en un equipo.
2. **La Postura**
   - Tu opinión profesional directa sobre el tema.
3. **El Análisis**
   - Desarrollo reflexivo de por qué las cosas son así y qué se está haciendo mal en la industria general.
4. **Cierre / Debate**
   - Conclusión e invitación a los lectores a comentar o debatir en sus redes.
