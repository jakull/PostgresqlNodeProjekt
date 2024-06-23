const { UserController } = require("../controllers/angestellteController")


export const Routes = [{
    method: "get",
    route: "/angestellte",
    controller: UserController,
    action: "all"
},{
    method: "get",
    route: "/angestellte/:id",
    controller: UserController,
    action: "one"
},{
    method: "post",
    route: "/angestellte",
    controller: UserController,
    action: "save"
},{
    method: "post",
    route: "/angestellte-add-email",
    controller: UserController,
    action: "addEmail"
},{
    method: "delete",
    route: "/angestellte/:id",
    controller: UserController,
    action: "remove"
}]

