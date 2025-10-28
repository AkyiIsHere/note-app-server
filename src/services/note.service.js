const Note = require("../models/Note");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const serviceAsyncWrapper = require("../helpers/serviceAsyncWrapper");
const noteRepository = require("../repositories/noteRepository");

const noteService = {
  index: serviceAsyncWrapper(async (req) => {
    const notes = noteRepository.findAllNotes(req);
    console.log(notes)
    return notes;
  }),

  show: serviceAsyncWrapper(async (req) => {
    const noteId = req.params.id;
    const userId = req.user.id;
    const note = await noteRepository.findNoteById(noteId,userId);

    if (!note) {
      throw new AppError(
        "Note not found or unauthorized.",
        StatusCodes.NOT_FOUND
      );
    }
    return note;
  }),

  create: serviceAsyncWrapper(async (req) => {
    const { title, content } = req.body;
    const newNote = {
      title,
      content,
      owner: req.user.id,
    };
    const res = await noteRepository.createNote(newNote);
    return res;
  }),

  update: serviceAsyncWrapper(async (req) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = await noteRepository.updateNote(noteId, userId, title, content)

    if (!note) {
      throw new AppError(
        "Note not found or unauthorized.",
        StatusCodes.NOT_FOUND
      );
    }

    return note;
  }),

  delete: serviceAsyncWrapper(async (req) => {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = noteRepository.deleteNote(noteId, userId);

    if (!note) {
      throw new AppError(
        "Note not found or unauthorized.",
        StatusCodes.NOT_FOUND
      );
    }

    return true;
  }),
};

module.exports = noteService;
