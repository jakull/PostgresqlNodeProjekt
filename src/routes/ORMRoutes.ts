const { UserController } = require("../controllers/angestellteController")


/**
 * @openapi
 * /angestellte:
 *   get:
 *     tags:
 *       - Angestellte
 *     summary: Get all employees
 *     responses:
 *       '200':
 *         description: A list of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
/**
 * @openapi
 * /angestellte/{id}:
 *   get:
 *     tags:
 *       - Angestellte
 *     summary: Get a specific employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the employee to get
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Employee not found
 */
/**
 * @openapi
 * /angestellte:
 *   post:
 *     tags:
 *       - Angestellte
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 */
/**
 * @openapi
 * /angestellte-add-email:
 *   post:
 *     tags:
 *       - Angestellte
 *     summary: Add email to an employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddEmailInput'
 *     responses:
 *       '200':
 *         description: Email added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Employee not found
 */
/**
 * @openapi
 * /angestellte/{id}:
 *   delete:
 *     tags:
 *       - Angestellte
 *     summary: Delete an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the employee to delete
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Employee not found
 */

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

