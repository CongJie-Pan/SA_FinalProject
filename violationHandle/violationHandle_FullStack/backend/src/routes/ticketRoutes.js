const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// GET all tickets
router.get('/', ticketController.getAllTickets);

// GET a specific ticket by ID
router.get('/:id', ticketController.getTicketById);

// POST a new ticket
router.post('/', ticketController.generateTicket);

// PUT (update) an existing ticket
router.put('/:id', ticketController.updateTicket);

// DELETE a ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;