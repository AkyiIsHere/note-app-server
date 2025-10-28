const router = require("express").Router();
const noteController = require('../../controllers/note.controller')
const authMiddleware = require('../../middlewares/authMiddleware');

router.use(authMiddleware);

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
