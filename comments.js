// Create web server
// Create a new route for adding comments
// Create a new route for getting comments
// Create a new route for deleting comments
// Create a new route for updating comments
// Create a new route for getting a single comment
// Create a new route for getting comments by a single user

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');

// Create a new comment
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        await comment.delete();
        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});