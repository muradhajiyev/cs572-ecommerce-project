module.exports = class Paged{
    constructor(items, currentPage, pages, numOfResults){
        this.items = items;
        this.currentPage = currentPage;
        this.pages = pages,
        this.total = numOfResults;
    }
}