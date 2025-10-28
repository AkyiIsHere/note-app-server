const authController = require("../../controllers/auth.controller");
const validateSchema = require("../../middlewares/validationMiddleware");
const { authSchema } = require("../../schemas/authSchema");

const router = require("express").Router();

router.use(validateSchema(authSchema));

router.post('/register', authController.register);
router.post('/login', authController.login)

module.exports = router;
