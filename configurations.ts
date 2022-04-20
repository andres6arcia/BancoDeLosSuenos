export default {
    SERVER:{
        SETTINGS:{
            PORT: 3000,
            PROPERTY_PORT: "port",
            MORGAN_SETTINGS: 'dev'
        },
        JWT:{ // Must be the same data as the CORE
            SECRET: "jwtSecretString",
            EXPIRES: "1d",
            SALT: 10,
            TOKEN_HEADER: "x-access-token",
        },
        MESSAGES:{
            SERVER_ON: "Server on port ",
            SERVER_STATE_RUNNING: "Server is running",
            USER_SIGNED_IN: 'User signed in',
            USER_CREATED: 'User created',
            ERROR_NOT_TOKEN_PROVIDED: "No token provided, send token in the header with the name 'x-access-token'", // Must be the same name as the CORE and SERVER
            ERROR_INVALID_TOKEN_PROVIDED: "Invalid token provided",
            ERROR_INVALID_PARAMETER_ID: 'Invalid id parameter',
            ERROR_INVALID_PARAMETER_PASSWORD: 'Invalid password parameter',
            ERROR_INVALID_PARAMETER_USER_ID: 'Invalid userId parameter',
            ERROR_INVALID_PARAMETER_PRODUCT_TYPE_ID: 'Invalid productTypeId parameter',
            ERROR_INVALID_PARAMETER_PRODUCT_ID: 'Invalid productId parameter',
            ERROR_INVALID_PARAMETER_VALUE: 'Invalid value parameter',
            ERROR_INVALID_PARAMETER_MOVEMENT_ID: 'Invalid movementId parameter',
            ERROR_INVALID_PARAMETER_START_DATE: 'Invalid startDate parameter',
            ERROR_INVALID_PARAMETER_END_DATE: 'Invalid endDate parameter',
            USER_PRODUCT_ADDED: "Product added to user",
            USER_PRODUCT_REQUEST_ADDED: "Product request added to user",
            PRODUCT_MOVEMENT_CREATED: "Product movement created",
            USER_PRODUCTS_RETRIEVED: "User products retrieved",
            PRODUCT_MOVEMENTS_RETRIEVED: "Product movements retrieved",
            PRODUCT_MOVEMENT_RETRIEVED: "Product movement retrieved",
        },
        ROUTES:{
            BASE: '/api',
            INDEX: '/',
            SIGN_IN: '/signIn',
            CREATE_USER: '/createUser',
            USER_POST_PRODUCT: '/postUserProduct/:userId/:productTypeId',
            USER_GET_PRODUCTS: '/getUserProducts/:userId',
            USER_POST_PRODUCT_REQUEST: '/postUserProductRequest/:userId/:productTypeId',
            PRODUCT_POST_MOVEMENT: '/postProductMovement/:userId/:productId',
            PRODUCT_GET_MOVEMENTS: '/getProductMovements/:userId/:productId',
            PRODUCT_GET_MOVEMENT: '/getProductMovement/:userId/:productId/:movementId',
            PRODUCT_GET_MOVEMENTS_BY_DATES: '/getProductMovementsByDates/:userId/:productId/:startDate/:endDate',
        }
    },

    DATA_SOURCES:{
        DB_MONGO: {
            URL: "mongodb://localhost/db",
            STATE_CONEECTED: 1,
            MESSAGE_DB_CONNECTED: 'Connected to MongoDB',
        },
        COLLECTION_NAME_USERS: "users",
        COLLECTION_NAME_PRODUCT_TYPES: "productTypes",
        COLLECTION_NAME_PRODUCTS: "products",
        COLLECTION_NAME_MOVEMENTS: "movements",
        COLLECTION_NAME_PRODUCT_REQUESTS: "productRequests",
        MODEL_NAME_USER: 'user',
        MODEL_NAME_PRODUCT: 'product',
        MODEL_NAME_PRODUCT_TYPE: 'productType',
        MODEL_NAME_MOVEMENT: 'movement',
        MODEL_NAME_PRODUCT_REQUEST: 'productRequest',
        DEFAULT_VALUE_MOVEMENT_STATE_ACTIVE: 1,
        DEFAULT_VALUE_PRODUCT_STATE_ACCEPTED: "Accepted",
        POPULATE_FIELD_PRODUCT_TYPE: 'type',
        POPULATE_FIELD_PRODUCT_TYPE_SELECT: 'name description',
    },

    CORE: {
        JWT:{ // Must be the same data as the SERVER
            SECRET: "jwtSecretString",
            EXPIRES: "1d",
            SALT: 10,
            TOKEN_HEADER: "x-access-token",
        },
        MESSAGES:{
            ERROR_USER_OR_PASSWORD_INCORRECT: 'User or password incorrect',
            ERROR_USER_NOT_FOUND: "User not found",
            ERROR_USER_ALREADY_EXISTS: "User already exists",
            ERROR_PRODUCT_TYPE_NOT_FOUND: "Product type not found",
            ERROR_PRODUCT_NOT_FOUND: "Product not found",
            ERROR_PRODUCT_NOT_FOUND_ON_USER: "Product not found on user",
            ERROR_MOVEMENT_NOT_FOUND: "Movement not found",
            ERROR_MOVEMENT_NOT_FOUND_ON_PRODUCT: "Movement not found on product",
        },
        VALUES:{
            USER_PRODUCT_STATE_PENDING: "Pending",
            USER_PRODUCT_STATE_ACCEPTED: "Accepted",
        }
    }
}