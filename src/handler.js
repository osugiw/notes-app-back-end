/**** 
 * Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes. 
****/
const { nanoid } = require('nanoid');
const notes  = require('./notes')

// Add a new note
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    
    // Variables to return
    const id = nanoid(16);  // Generate random ID 16 digits length
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Add the note to the array
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);

    // Check if the note is successfully inserted into the array
    const isSuccess = notes.filter((note) => note.id == id).length > 0;

    // If successfully added
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Note has successfully added!',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    // When the notes failed to be inserted
    const response = h.response({
        status: 'fail',
        message: 'Failed to add the note',
    });
    response.code(500);
    return response;
};

// Get notes data
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// Get note data by ID
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    
    const note = notes.filter((n) => n.id === id[0]);
    
    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note,
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Note is not found!'
    });
    response.code(404);
    return response;
};

// Edit note by ID
const editNoesByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((notes) => note.id === id);

    if(index != -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Successfully update the note!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Failed to update the note because ID is not found!',
    });
    response.code(404);
    return response;
};

// Delete Note by ID
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if(index != -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Note has successfully deleted',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Failed to delete the note because ID doesn\'t exist!',
    });
    response.code(404);
    return response;
};

module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoesByIdHandler,
    deleteNoteByIdHandler
};