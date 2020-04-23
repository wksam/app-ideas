class Card {
    constructor(content, date, id=null) {
        if(id == null) this.id = this.createID();
        else this.id = id;

        this.content = content;
        this.date = date;

        this.htmlCard = this.createCard();
    }

    get getCard() {
        return this.htmlCard;
    }

    createID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    formattedDate() {
        let day = this.date.getDate().toString();
        day = day.length == 1 ? '0' + day : day;
        let month = (this.date.getMonth() + 1).toString();
        month = month.length == 1 ? '0' + month : month;
        let year = this.date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    setAttr(element, attr, value) {
        return element.setAttribute(attr, value);
    }

    createText(text) {
        return document.createTextNode(text);
    }

    createDiv(divClass) {
        let div = document.createElement('div');
        this.setAttr(div, 'class', divClass);
        return div;
    }

    createCard() {
        let card = this.createDiv('card mb-2');
        card.append(this.createCardBody());
        card.dataset.id = this.id;
        return card;
    }

    createCardBody() {
        let cardBody = this.createDiv('card-body');
        cardBody.append(this.createParagraph());
        cardBody.append(this.createFooter());
        return cardBody;
    }

    createParagraph() {
        let paragraph = document.createElement('p');
        paragraph.append(this.createText(this.content));
        this.setAttr(paragraph, 'class', 'card-text');
        return paragraph;
    }

    createFooter() {
        let footer = this.createDiv('d-flex justify-content-between align-items-center');
        footer.append(this.createDateContainer());
        footer.append(this.createButtonContainer());
        return footer;
    }

    createDateContainer() {
        let dateContainer = document.createElement('small');
        this.setAttr(dateContainer, 'class', 'text-muted');
        dateContainer.append(this.createText(this.formattedDate()));
        return dateContainer;
    }

    createButtonContainer() {
        let container = this.createDiv('d-flex justify-content-end');
        container.append(this.createButton('edit', 'btn btn-primary btn-sm mr-2 edit'));
        container.append(this.createButton('delete', 'btn btn-danger btn-sm delete'));
        return container;
    }

    createButton(type, buttonClass) {
        let button = document.createElement('button');
        this.setAttr(button, 'class', buttonClass);

        if(type != 'delete') {
            button.append(this.createSVG(type, 'bi bi-pencil', '1em', '1em', '0 0 16 16', 'currentColor', 'http://www.w3.org/2000/svg'));
            button.addEventListener('click', editCard);
        } else {
            button.append(this.createSVG(type, 'bi bi-trash', '1em', '1em', '0 0 16 16', 'currentColor', 'http://www.w3.org/2000/svg'));
            button.addEventListener('click', deleteCard);
        }
        
        return button;
    }

    createSVG(type, svgClass, width, height, viewBox, fill, xmlns) {
        let svg = document.createElementNS(xmlns, 'svg');
        this.setAttr(svg, 'class', svgClass);
        this.setAttr(svg, 'width', width);
        this.setAttr(svg, 'height', height);
        this.setAttr(svg, 'viewBox', viewBox);
        this.setAttr(svg, 'fill', fill);

        if(type != 'delete') {
            svg.append(this.createPath('evenodd', 'M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z', 'evenodd', xmlns));
            svg.append(this.createPath('evenodd', 'M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z', 'evenodd', xmlns))
        } else {
            svg.append(this.createPath('', 'M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z', '', xmlns))
            svg.append(this.createPath('evenodd', 'M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z', 'evenodd', xmlns))
        }
        return svg;s
    }

    createPath(fillRule, d, clipRule, xmlns) {
        let path = document.createElementNS(xmlns, 'path');
        if(fillRule != '') this.setAttr(path, 'fill-rule', fillRule);
        if(d != '') this.setAttr(path, 'd', d);
        if(clipRule != '') this.setAttr(path, 'clip-rule', clipRule);
        return path;
    }
}