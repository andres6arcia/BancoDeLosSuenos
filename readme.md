# Banco de los Sueños

_Proyecto creado para Ecosystems Group, consiste en una REST API de una app para un banbo imaginatio llamado 'Banco de los Sueños'_



## Esquema de base de datos

### Colección de Usuarios
```js
const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },         // Cedula del usuario
    password: { type: String, required: true },                 // Clave del usuario, se guarda encriptada
    name:  String,                                              // Nombre del usuario
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }] // Lista de IDS de los productos del usuario 
},{timestamps: true})                                           // Crea los campos createdAt y updatedAt
```

### Colección de Productos
```js
const ProductSchema = new Schema({
    name:  {type: String, required: true},                      // Nombre que le dió el usuario al su producto
    description: String,                                        // Descripcion que le dió el usuario a su producto
    type:  { type: Schema.Types.ObjectId, ref: 'productType'},  // ID de el tipo de producto
    state: {type: String, required: true, default: 'Accepted'}, // Estado actual del producto, puede tener los valores: 'Accepted' y 'Pending'
},{timestamps: true})                                           // Crea los campos createdAt y updatedAt
```

### Colección de Tipos de Productos
```js
const ProductTypeSchema = new Schema({
    id: {type: String, required: true, unique: true},           // ID propio que identifica los tipos de productos, puede tener los valores: 'account', 'leasing', 'easyCredit' y 'creditCard'
    name:  {type: String, required: true},                      // Nombre del tipo de producto
    description: String,                                        // Descripcion del tipo de producto
},{timestamps: true})                                           // Crea los campos createdAt y updatedAt
```

### Colección de Movimientos de los productos
```js
const MovementSchema = new Schema({
    productId: { required: true, type: Schema.Types.ObjectId, ref: 'product' }, // ID del producto al que pertenece el movimiento
    value: {type: Number, required: true},                                      // Valor del movimiento, puede contener valores negativos que representan salidas 
    description: String,                                                        // Descripción de la transaccion dada por la entidad que genero el movimiento
    state: {type: Number, required: true, default: 1 },                         // Estado de la transacción, puede tener el valor: 1:'Accepted'
    store: String,                                                              // Entidad o tienda donde se realizó la transacción 
    tax: Number,                                                                // El valor del impuesto de la transacción
},{timestamps: true})                                                           // Crea los campos createdAt y updatedAt
```



## Rutas de la API
* **'/api/createUser'** Permite crear usuarios sin necesidad de loguearse para poder usar la aplicación, 
  es la única ruta que no requiere autenticación aparte de signIn, se deben enviar por body los 
  siguientes parámetros:
  ```json
  {
    "id":"357",
    "password":"753",
    "name":"Katalina"
  }
* **'/api/signIn'** Permite loguearse para poder usar todas las siguientes rutas, devuelve el token 
  necesario para usar las siguientes rutas, se deben enviar por body los siguientes parámetros:
  ```json
  {
    "id":"123",         // Cedula del usuario
    "password":"951"    // Clave del usuario
  }
  ```
* **'/api/postUserProduct/:userId/:productTypeId'** Crea un producto para el usuario, se deben enviar por 
  body los siguientes parámetros:
  ```json
  {
    "name":"Prestamo moto" // Nombre que desea darle el usuario al nuevo producto
  }
  ```
* **'/api/getUserProducts/:userId'** Devuelve todos los productos del usuario.
* **'/api/postUserProductRequest/:userId/:productTypeId'** Envía una solicitud de nuevo producto al banco, 
  se deben enviar por body los siguientes parámetros: 
  ```json 
  {
    "name":"Solicitud de cuenta leasing para comprar mi casa" // Nombre que desea darle el usuario al nuevo producto
  }
  ```
* **'/api/postProductMovement/:userId/:productId'** Permite registrar un movimiento a un producto de un 
  usuario, se deben enviar por body los siguientes parámetros: 
  ```json
  {
    "description":"Compra producto 'Calibrador llantas'", // Descripción de la transaccion dada por la entidad que genero el movimiento  
    "value": -15,                                         // Valor del movimiento, puede contener valores negativos que representan salidas 
    "store":"AliExpress",                                 // Entidad o tienda donde se realizó la transacción 
    "tax": -3                                             // El valor del impuesto de la transacción
  }
  ```
* **'/api/getProductMovements/:userId/:productId'** Devuelve todas las transacciones de un producto del 
  usuario.
* **'/api/getProductMovement/:userId/:productId/:movementId'** Devuelve una transacción con todo su 
  detalle.
* **'/api/getProductMovementsByDates/:userId/:productId/:startDate/:endDate'** Devuelve todas las 
  transacciónes de un producto del usuario en un rango de fechas con formato YYYY-MM-DD.


  

