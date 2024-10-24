const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/commentsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    text: String,
});

const Comment = mongoose.model('Comment', commentSchema);

app.use(cors());
app.use(express.json());

// Получение всех комментариев
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

// Добавление нового комментария
app.post('/comments', async (req, res) => {
    const newComment = new Comment({ text: req.body.text });
    await newComment.save();
    res.send(newComment);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
