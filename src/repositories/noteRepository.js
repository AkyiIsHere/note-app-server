const { repositoryAsyncWrapper } = require("../helpers/repositoryAsyncWrapper");
const Note = require("../models/Note");

const noteRepository = {
  findAllNotes: repositoryAsyncWrapper(async (req) => {
    const notes = await Note.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    return notes;
  }),

  findNoteById: repositoryAsyncWrapper(async (noteId, userId) => {
    const note = await Note.findOne({ _id: noteId, owner: userId });
    return note;
  }),

  createNote: repositoryAsyncWrapper(async (newNote) => {
    return await Note.create(newNote);
  }),

  updateNote: repositoryAsyncWrapper(async (noteId, userId, title, content) => {
    const updatenote = await Note.findOneAndUpdate(
      { _id: noteId, owner: userId },
      { $set: { title, content } },
      { new: true, runValidators: true }
    );
    return updatenote;
  }),

  deleteNote: repositoryAsyncWrapper(async (noteId, userId) => {
    return await Note.findOneAndDelete({ _id: noteId, owner: userId });
  }),
};

module.exports = noteRepository;
