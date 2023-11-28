export class MenuItem {
    name: string = '';
    permissionName: string = '';
    icon: string = '';
    route: string = '';
    items: MenuItem[];
    fontAwesomeIcon: boolean = false;

    constructor(name: string, permissionName: string, icon: string, route: string, childItems: MenuItem[] = null,
        fontAwesomeIcon: boolean = false) {
        this.name = name;
        this.permissionName = permissionName;
        this.icon = icon;
        this.route = route;
        this.fontAwesomeIcon = fontAwesomeIcon;

        if (childItems) {
            this.items = childItems;
        } else {
            this.items = [];
        }
    }
}
