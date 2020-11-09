const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const isEmpty = require("../validation/is_empty");

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.get("/", (req, res) => {
  Todo.find()
    .sort({ deadline: -1 })
    .then((todo) => {
      if (!isEmpty(todo)) {
        res.json(todo);
      } else {
        res.json({ todo: "no todo found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.get("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      if (!isEmpty(todo)) {
        res.json(todo);
      } else {
        res.json({ todo: "no such found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.get("/rank", (req, res) => {
  Todo.find()
    .sort({ completed: 1 })
    .then((todo) => {
      if (!isEmpty(todo)) {
        res.json(todo);
      } else {
        res.json({ todo: "no todo found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
// uncompleted todos
router.get("/uncompleted", (req, res) => {
  Todo.find({ completed: false })
    .sort({ deadline: -1 })
    .then((todo) => {
      if (!isEmpty(todo)) {
        res.json(plans);
      } else {
        res.json({ todo: "no todo found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
// completed todos
router.get("/completed", (req, res) => {
  Todo.find({ completed: true })
    .sort({ deadline: -1 })
    .then((todo) => {
      if (!isEmpty(todo)) {
        res.json(plans);
      } else {
        res.json({ todo: "no todo found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.post("/", (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
  });
  todo.save().then((todo) => {
    console.log(todo);
    res.json({ todo: { todo } });
  });
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.put("/", (req, res) => {
  Todo.findById(req.body.id)
    .then((todo) => {
      if (!isEmpty(todo)) {
        todo.completed = true;
        todo.save().then((todo) => {
          return res.json({ todo: todo });
        });
      } else {
        res.json({ todo: "no plan found" });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.put("/update", (req, res) => {
  Todo.findById(req.body.id)
    .then((todo) => {
      const update = {
        title: !isEmpty(req.body.title) ? req.body.title : todo.title,
        description: !isEmpty(req.body.description)
          ? req.body.description
          : todo.description,
        deadline: !isEmpty(req.body.deadline)
          ? req.body.deadline
          : todo.deadline,
        completed: !isEmpty(req.body.completed)
          ? req.body.completed
          : todo.completed,
      };
      Todo.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: update,
        }
      ).then((todo) => {
        Todo.findById(todo._id).then((todo) => {
          res.json({ todo: todo });
        });
      });
    })

    .catch((err) => res.json(err));
});

// @route POST api/messages
// @description sends admin a message
// @ access Private
router.delete("/delete/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      console.log(todo);
      console.log(req.body.id);
      if (isEmpty(todo)) {
        return res.status(200).json({ message: "No such todo found" });
      }
      todo.remove().then(() => {
        res.json({ message: "deleted successfully oo" });
      });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
