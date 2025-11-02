const router = require("express").Router();
const noteController = require("../../controllers/note.controller");
const authMiddleware = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

// This option doesn't work.
/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *   post:
 *     summary: Create an item
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 */
router
  .route("/")
  .get(noteController.index)
  .post(noteController.create);

router
  .route("/:id")
  .get(noteController.show)
  .put(noteController.update)
  .delete(noteController.delete);


module.exports = router;
