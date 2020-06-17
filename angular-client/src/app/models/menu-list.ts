type Items = Array<{id: string, text: string}>;

export class MenuListModel{
    title: string;
    paramName: string;
    items: Items;
    constructor(title: string, paramName: string, items: Items){
        this.title= title;
        this.paramName = paramName;
        this.items = items;
    }
}