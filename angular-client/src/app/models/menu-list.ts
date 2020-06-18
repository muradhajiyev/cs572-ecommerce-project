type Items = Array<{id: string, text: string}>;

export class MenuListModel{
    title: string;
    paramName: string;
    items: Items;
    pathVariable: boolean = false;
    constructor(title: string, paramName: string, items: Items, pathVariable: boolean = false){
        this.title = title;
        this.paramName = paramName;
        this.items = items;
        this.pathVariable = pathVariable;
    }
    public queryParams(id) {
        let result = {};
        result[this.paramName] = id;
        return result;
    }
}
