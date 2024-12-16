# KanbanJSBR  
Bem-vindo ao **KanbanJSBR**, uma biblioteca simples e poderosa para criar quadros kanban diretamente no seu projeto. Siga as instruções abaixo para começar!

---

## 📦 Como instalar  

1. **Importe os arquivos CSS e JS no seu projeto.**  
   Certifique-se de adicionar os seguintes links ao `<head>` ou antes do fechamento da tag `<body>` do seu HTML:

   ```html
   <link rel="stylesheet" href="LINK_CSS">
   https://cdn.jsdelivr.net/gh/joaomuniz98/KanbanJSBR/src/kanban.js


2 . Crie uma div para renderizar o quadro kanban.
    Adicione um elemento HTML onde o quadro será exibido:

    <div id="kanban"></div>



3 . Instancie o KanbanJSBR no seu script JavaScript.
No arquivo JavaScript, inicialize o KanbanJSBR com os seguintes parâmetros:


```javascript
const boardConfig = {
    columns: [
        {
            id: '1',
            title: 'To Do',
            custom: {
                classKanbanMainColumn: '',
                style: '',
            },
            cards: [
                { text: 'Task 1' },
                { text: 'Task 2' }
            ]
        },
        {
            id: '2',
            title: 'In Progress',
            custom: {
                classKanbanMainColumn: '',
                style: ';',
            },
            cards: []
        },
        {
            id: '3',
            title: 'Done',
            custom: {
                classKanbanMainColumn: '',
                style: '',
            },
            cards: [
                { text: 'Task 3' }
            ]
        }
    ],
};

new Kanban("kanban", boardConfig);

```


4.  Primeiro parâmetro: o id da div onde o quadro será renderizado. No exemplo, é "kanban".
    Segundo parâmetro: a configuração do quadro kanban, incluindo colunas, estilo e cartões iniciais.


Para renderizar este quadro, basta chamar:
```javacript
new Kanban("kanban", boardConfig);
````



