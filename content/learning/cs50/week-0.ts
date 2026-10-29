import type { Chapter } from '../types'

export const week0: Chapter = {
  n: '0',
  slug: { en: 'week-0', es: 'semana-0' },
  colour: 'black',
  published: '2026-10-29',
  seo: {
    title: {
      en: 'CS50 Week 0 Summary: Binary, ASCII, Algorithms & Scratch',
      es: 'Resumen CS50 Semana 0: binario, ASCII, algoritmos y Scratch',
    },
    description: {
      en: 'My CS50x Week 0 notes with interactive examples: flip bits like light bulbs, turn text into numbers, mix RGB colours and race search algorithms through a phone book.',
      es: 'Mi resumen de la Semana 0 de CS50x con ejemplos interactivos: prende bits como bombillos, convierte texto en números, mezcla colores RGB y pon a competir algoritmos de búsqueda.',
    },
  },
  cover: {
    kicker: { en: 'CS50x · Week 0', es: 'CS50x · Semana 0' },
    title: [
      { en: 'From zeros', es: 'De ceros' },
      { en: 'and ones.', es: 'y unos.' },
    ],
    line: {
      en: 'The first CS50 lecture in nine short parts. Touch everything.',
      es: 'La primera clase de CS50 en nueve partes cortas. Toca todo.',
    },
    word: 'HI!',
  },
  intro: {
    en: 'A summary of CS50x Week 0 (Scratch): how computers represent numbers, text, colours and media in binary, what an algorithm is, pseudocode, abstraction and Scratch. Written the way I understood it, with something to try for every idea.',
    es: 'Resumen de la Semana 0 de CS50x (Scratch): cómo las computadoras representan números, texto, colores y multimedia en binario, qué es un algoritmo, pseudocódigo, abstracción y Scratch. Escrito como yo lo entendí, con algo para probar en cada idea.',
  },
  sources: {
    week: 'https://cs50.harvard.edu/x/weeks/0/',
    notes: 'https://cs50.harvard.edu/x/notes/0/',
    transcript: 'https://cdn.cs50.net/2025/fall/lectures/0/lang/en/lecture0.txt',
    video: 'https://youtu.be/UuIEbpQms8o',
  },
  parts: [
    {
      id: 'ai',
      colour: 'paper',
      widget: 'prompt',
      title: { en: 'AI, and why the basics still matter', es: 'La IA, y por qué lo básico sigue importando' },
      key: {
        en: 'CS50 doesn’t teach you to type code, it teaches you to think. AI helps, but you’re still the pilot.',
        es: 'CS50 no te enseña a escribir código, te enseña a pensar. La IA ayuda, pero el piloto sigues siendo tú.',
      },
      points: [
        {
          en: 'Malan builds a chatbot in about ten lines of Python on top of an **API**: a service another company runs, that you write your own code on.',
          es: 'Malan arma un chatbot en unas diez líneas de Python sobre una **API**: un servicio de otra empresa sobre el que escribes tu propio código.',
        },
        {
          en: 'The **user prompt** is what the person types. The **system prompt** is the fixed instruction behind it. Same question, different answer.',
          es: 'El **user prompt** es lo que escribe la persona. El **system prompt** es la instrucción fija que va detrás. Misma pregunta, otra respuesta.',
        },
        {
          en: 'Calculators exist and it’s still worth knowing how to add. Same with AI and code.',
          es: 'Las calculadoras existen y aun así vale la pena saber sumar. Igual pasa con la IA y el código.',
        },
        {
          en: '**Rubber duck debugging**: explain your problem out loud, even to a duck, and you often find the bug yourself.',
          es: '**El pato de goma**: explica tu problema en voz alta, aunque sea a un pato, y muchas veces encuentras el error tú solo.',
        },
      ],
    },
    {
      id: 'what-is-cs',
      colour: 'yellow',
      widget: 'blackbox',
      title: { en: 'What computer science actually is', es: 'Qué es realmente la ciencia de la computación' },
      key: {
        en: 'It’s the study of information: how to represent it, and how to process it to solve problems.',
        es: 'Es el estudio de la información: cómo representarla y cómo procesarla para resolver problemas.',
      },
      points: [
        {
          en: 'Every problem has the same shape: **input** → an **algorithm** (the black box) → **output**.',
          es: 'Todo problema tiene la misma forma: **entrada** → un **algoritmo** (la caja negra) → **salida**.',
        },
        {
          en: '**Computational thinking** is using that idea on real-life problems, not only on computers.',
          es: '**Pensamiento computacional** es usar esa idea en problemas de la vida real, no solo en computadoras.',
        },
        {
          en: 'Before solving anything we have to agree on how to represent inputs and outputs. Spoiler: zeros and ones.',
          es: 'Antes de resolver nada hay que acordar cómo representar entradas y salidas. Spoiler: con ceros y unos.',
        },
      ],
    },
    {
      id: 'binary',
      colour: 'black',
      widget: 'bits',
      title: { en: 'Binary: counting with light bulbs', es: 'Binario: contar con bombillos' },
      key: {
        en: 'A computer only knows on (1) and off (0). Give each position a different weight and you can count surprisingly high.',
        es: 'Una computadora solo sabe prendido (1) y apagado (0). Si cada posición pesa distinto, puedes contar sorprendentemente alto.',
      },
      points: [
        {
          en: 'Decimal uses columns of 1, 10, 100. Binary uses columns of 1, 2, 4, 8… each one doubles.',
          es: 'El decimal usa columnas de 1, 10, 100. El binario usa columnas de 1, 2, 4, 8… cada una es el doble.',
        },
        {
          en: 'A **bit** is one binary digit. A **byte** is 8 bits: 256 patterns, from 0 to 255.',
          es: 'Un **bit** es un dígito binario. Un **byte** son 8 bits: 256 combinaciones, de 0 a 255.',
        },
        {
          en: 'Inside the chip the bulbs are **transistors**: billions of tiny switches.',
          es: 'Dentro del chip los bombillos son **transistores**: miles de millones de interruptores diminutos.',
        },
        {
          en: '32 bits count to about 4 billion. Most computers today use 64.',
          es: 'Con 32 bits cuentas hasta unos 4 mil millones. Hoy casi todas las computadoras usan 64.',
        },
      ],
    },
    {
      id: 'text',
      colour: 'paper',
      widget: 'ascii',
      title: { en: 'Text is numbers we agreed on', es: 'El texto son números que acordamos' },
      key: {
        en: 'Every letter is just a number everybody agreed on. A is 65, B is 66, and so on.',
        es: 'Cada letra es solo un número en el que todos estuvimos de acuerdo. La A es 65, la B es 66, y así.',
      },
      points: [
        {
          en: 'Texting “HI!” sends 3 bytes: 72, 73 and 33. That map from letters to numbers is **ASCII**.',
          es: 'Mandar “HI!” por chat son 3 bytes: 72, 73 y 33. Ese mapa de letras a números es **ASCII**.',
        },
        {
          en: 'Lowercase is uppercase + 32. Flip one single bit and A becomes a.',
          es: 'La minúscula es la mayúscula + 32. Cambia un solo bit y la A se vuelve a.',
        },
        {
          en: 'ASCII only fits English. **Unicode** goes up to 32 bits, so it covers every language and emoji. 😂 is number 128,514.',
          es: 'ASCII solo alcanza para el inglés. **Unicode** llega a 32 bits, así que cubre todos los idiomas y los emoji. 😂 es el número 128.514.',
        },
        {
          en: 'Is 65 the letter A or the number 65? It depends on **context**: the program decides how to read it.',
          es: '¿65 es la letra A o el número 65? Depende del **contexto**: el programa decide cómo leerlo.',
        },
      ],
    },
    {
      id: 'color',
      colour: 'black',
      widget: 'rgb',
      title: { en: 'Colour, images, video and sound', es: 'Color, imágenes, video y sonido' },
      key: {
        en: 'Media is numbers stacked in layers: colour → pixel → image → video.',
        es: 'Lo multimedia son números en capas: color → píxel → imagen → video.',
      },
      points: [
        {
          en: '**RGB**: how much red, green and blue, each from 0 to 255. One byte each, three bytes per colour.',
          es: '**RGB**: cuánto rojo, verde y azul, cada uno de 0 a 255. Un byte cada uno, tres bytes por color.',
        },
        {
          en: 'A **pixel** is one dot with its own colour. Millions of them are why a photo weighs megabytes.',
          es: 'Un **píxel** es un punto con su propio color. Millones de ellos son la razón por la que una foto pesa megas.',
        },
        {
          en: 'Video is many images per second, like a flipbook. Music can be stored as notes: pitch, length, volume.',
          es: 'Un video son muchas imágenes por segundo, como un flipbook. La música se puede guardar como notas: tono, duración, volumen.',
        },
      ],
    },
    {
      id: 'algorithms',
      colour: 'paper',
      widget: 'phonebook',
      title: { en: 'Algorithms: the phone book', es: 'Algoritmos: el directorio telefónico' },
      key: {
        en: 'An algorithm is a list of steps that solves a problem. Working isn’t enough: it should also be fast.',
        es: 'Un algoritmo es una lista de pasos que resuelve un problema. No basta con que funcione: también tiene que ser rápido.',
      },
      points: [
        {
          en: 'Page by page works, but 1,000 pages can take 1,000 steps.',
          es: 'Página por página funciona, pero 1.000 páginas pueden ser 1.000 pasos.',
        },
        {
          en: 'Two pages at a time is twice as fast. If you overshoot the name, go back one page.',
          es: 'De dos en dos es el doble de rápido. Si te pasas del nombre, devuélvete una página.',
        },
        {
          en: 'Splitting the book in half every time takes about 10 steps for 1,000 pages. Double the book and it costs **one more step**. That’s **log₂ n**.',
          es: 'Partir el libro por la mitad cada vez toma unos 10 pasos para 1.000 páginas. Si duplicas el libro cuesta **un paso más**. Eso es **log₂ n**.',
        },
      ],
    },
    {
      id: 'pseudocode',
      colour: 'black',
      widget: 'pseudocode',
      title: { en: 'Pseudocode and the four building blocks', es: 'Pseudocódigo y los cuatro bloques' },
      key: {
        en: 'Almost every program is built from functions, conditionals, boolean expressions and loops.',
        es: 'Casi todo programa se arma con funciones, condicionales, expresiones booleanas y bucles.',
      },
      points: [
        {
          en: '**Functions** are the verbs: open, look, call.',
          es: 'Las **funciones** son los verbos: abrir, mirar, llamar.',
        },
        {
          en: '**Conditionals** are forks in the road. **Boolean expressions** are the yes/no questions that pick the path.',
          es: 'Los **condicionales** son bifurcaciones. Las **expresiones booleanas** son las preguntas de sí o no que eligen el camino.',
        },
        {
          en: '**Loops** repeat steps (“go back to line 3”). This one ends because the book keeps shrinking.',
          es: 'Los **bucles** repiten pasos (“vuelve a la línea 3”). Este termina porque el libro se va achicando.',
        },
        {
          en: 'The last “else” is the **edge case**: what if the person isn’t there? Forgetting cases like that is how programs freeze.',
          es: 'El último “si no” es el **caso borde**: ¿y si la persona no está? Olvidar casos así es lo que congela los programas.',
        },
      ],
    },
    {
      id: 'abstraction',
      colour: 'yellow',
      widget: 'abstraction',
      title: { en: 'Abstraction: from transistors to Python', es: 'Abstracción: de transistores a Python' },
      key: {
        en: 'Each layer hides the complexity of the one below it. We build on what someone else already solved.',
        es: 'Cada capa esconde la complejidad de la de abajo. Construimos sobre lo que alguien más ya resolvió.',
      },
      points: [
        {
          en: 'Companies like Intel and AMD decide which bit patterns mean add, store or print.',
          es: 'Empresas como Intel y AMD deciden qué patrones de bits significan sumar, guardar o imprimir.',
        },
        {
          en: 'A **compiler** translates one language into another, for example C into machine code.',
          es: 'Un **compilador** traduce un lenguaje a otro, por ejemplo C a código máquina.',
        },
        {
          en: 'The chatbot from part 1 is the same idea: someone else did the hard part, you write ten lines on top.',
          es: 'El chatbot de la parte 1 es la misma idea: alguien más hizo la parte difícil y tú escribes diez líneas encima.',
        },
      ],
    },
    {
      id: 'scratch',
      colour: 'paper',
      widget: 'loops',
      title: { en: 'Scratch: programming with blocks', es: 'Scratch: programar con bloques' },
      key: {
        en: 'Scratch, from MIT, has the same ideas as C or Python, without worrying about commas and braces.',
        es: 'Scratch, del MIT, tiene las mismas ideas que C o Python, sin preocuparte por comas ni llaves.',
      },
      points: [
        {
          en: '**Events** start things (“when green flag clicked”). **Arguments** go into a function, a **return value** comes back out, and a **side effect** is what you see or hear.',
          es: 'Los **eventos** arrancan todo (“al hacer clic en la bandera”). Los **argumentos** entran a una función, el **valor de retorno** sale de ella y el **efecto secundario** es lo que ves u oyes.',
        },
        {
          en: 'Copy and paste is a warning sign: one “repeat 3” is better design than three identical blocks.',
          es: 'Copiar y pegar es mala señal: un “repetir 3” está mejor diseñado que tres bloques iguales.',
        },
        {
          en: '“Forever” + “if”: without the loop, the cat checks once whether you’re petting it, and the moment is gone.',
          es: '“Por siempre” + “si”: sin el bucle, el gato revisa una sola vez si lo estás acariciando, y el momento ya pasó.',
        },
        {
          en: 'Big projects are built in small steps. Start with the smallest version that works.',
          es: 'Los proyectos grandes se arman en pasos pequeños. Empieza por la versión más chiquita que funcione.',
        },
      ],
    },
  ],
}
