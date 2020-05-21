class GoogleBookApi {
    constructor() {
        if(!GoogleBookApi.instance)
            GoogleBookApi.instance = this;
        this.domain = 'https://www.googleapis.com';
        this.path = '/books/v1/volumes';
        return GoogleBookApi.instance;
    }

    fetchSearch(query, offset, limit, currentPage) {
        const params = '?q=' + query + '&startIndex=' + offset + '&maxResults=' + limit;
        const url = this.domain + this.path + params;
        fetch(url).then(response => response.json()).then(data => {
            fillCards(data.items);
        });
    }
}

const api = new GoogleBookApi();