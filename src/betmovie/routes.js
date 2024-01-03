const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getUser);
router.post("/", controller.addUser);
router.get("/:id", controller.getUserByID);
router.delete("/:id", controller.deleteUser);
router.put("/:id", controller.updateUser);

module.exports = router; 