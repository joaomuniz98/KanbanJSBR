import { even } from "prelude-ls";

class Kanban {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.config = config;


        // Responsavel pela renderização do kanban
        this.render();

        this.configStyle();


        // Propriedades para armazenar a posição inicial do mouse e o card sendo movido
        this.startX = 0;
        this.startY = 0;
        this.currentCard = null;
    }
    configStyle(){


    }
    render() {

        const columns = this.config.columns
        //Coluna Global
        const containerGlobal = document.createElement('div')
        containerGlobal.classList.add('container-global')


        this.container.innerHTML = '';
        columns.forEach((item,index) => {

            //Colunaa
            const columnEl = document.createElement('div');
            const classKanbanMainColumn = columns[index]?.custom?.classKanbanMainColumn?.trim().split(' ') || '';

            console.log(classKanbanMainColumn)
            if (classKanbanMainColumn[0]) {
                
                classKanbanMainColumn.forEach((item) => {
                        columnEl.classList.add(item)
                    })

                  columnEl.classList.add('kanban-column')
            
            } else {
              columnEl.classList.add('kanban-column');
            }
            
            columnEl.innerHTML = `<h3>${item.title}</h3>`;
            columnEl.style = columns[index].custom.style
    

            //Conteudo Card
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('kanban-cards');

            item.cards.forEach((card,index) => {

                const cardEl = document.createElement('div');
                cardEl.classList.add('kanban-card');
                cardEl.textContent = card.text;
                cardEl.addEventListener('mousedown', (event) => this.mouseDown(event, cardEl));
                cardContainer.appendChild(cardEl);
            });

            columnEl.appendChild(cardContainer);
            containerGlobal.appendChild(columnEl)
         });
            
          this.container.appendChild(containerGlobal);
    }

 
    mouseDown(event, cardEl) {
        console.log('Mouse down:', event);

        // Armazena a posição inicial do mouse e o elemento que está sendo arrastado
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.currentCard = cardEl;

        // Adiciona o evento mousemove e mouseup globalmente
        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseMove(event) {
        if (!this.currentCard) return; // Verifica se existe um cartão sendo arrastado

        // Calcula as mudanças no movimento
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;

        // Atualiza a posição do cartão arrastado
        const rect = this.currentCard.getBoundingClientRect();  // Pega a posição atual do card
        this.currentCard.style.position = 'absolute'; // Necessário para o movimento absoluto
        this.currentCard.style.top = rect.top + deltaY + 'px'; // Calcula o novo valor de top
        this.currentCard.style.left = rect.left + deltaX + 'px'; // Calcula o novo valor de left

        // Atualiza a posição inicial do mouse para o próximo movimento
        this.startX = event.clientX;
        this.startY = event.clientY;


        this.checkarColisao()

    }

    mouseUp(event) {
        console.log('Mouse up:', event);
      
        this.currentCard.style.position = ""
        document.removeEventListener('mousemove', this.mouseMove.bind(this));
        document.removeEventListener('mouseup', this.mouseUp.bind(this));

        // Finaliza o arraste
        this.currentCard = null;
    }


    checkarColisao(){

        if(!this.currentCard) return;

        let posicaoCard = this.currentCard.getBoundingClientRect();

        let columns  = this.container.getElementsByClassName('kanban-cards')

        Array.from(columns).forEach((colunEl) => {


            let colunaIndex = colunEl.getBoundingClientRect();

            let verificandoLigacaoColunaCard = this.isIntersecting(posicaoCard,colunaIndex)

            if(verificandoLigacaoColunaCard){

                colunEl.appendChild(this.currentCard)
            }else{
                console.log("Nao é o filho")
            }

        })
        

    }

    isIntersecting(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }
}

export default Kanban;
