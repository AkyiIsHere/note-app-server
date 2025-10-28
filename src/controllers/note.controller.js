const StatusCodes = require('http-status-codes');
const controllerAsyncWrapper = require("../helpers/controllerAsyncWrapper");
const responseMessage = require('../helpers/responseMessageHandler')
const Note = require("../models/Note");
const noteService = require('../services/note.service')

const noteController = {
  index: controllerAsyncWrapper(async (req, res) => {
    const notes = await noteService.index(req);
    responseMessage(
      res,
      "Notes retrieved successfully.",
      notes,
      StatusCodes.OK
    );
  }),

  show: controllerAsyncWrapper(async (req, res) => {
    const note = await noteService.show(req)
    responseMessage(res, "Note retrieved successfully.", note, StatusCodes.OK);
  }),

  create: controllerAsyncWrapper(async (req, res) => {
    const note = await noteService.create(req);

    responseMessage(
      res,
      "Note created successfully.",
      note,
      StatusCodes.CREATED
    );
  }),

  update: controllerAsyncWrapper(async (req, res) => {
    const note = await noteService.update(req);
    responseMessage(res, "Note updated successfully.", note, StatusCodes.OK);
  }),

  delete: controllerAsyncWrapper(async (req, res) => {
    await noteService.delete(req);
    responseMessage(res, "Note deleted successfully.", null, StatusCodes.OK);
  }),
};

module.exports = noteController;
