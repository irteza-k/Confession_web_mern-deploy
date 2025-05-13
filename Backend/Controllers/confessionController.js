const Confession = require('../models/Confessions');
const User = require('../models/User');

// Post a new confession
exports.postConfession = async (req, res) => {
  const { confessionText } = req.body;
  
  try {
    const newConfession = new Confession({
      confessionText,
      postedBy: req.user.id
    });

    await newConfession.save();
    res.status(201).json(newConfession);
  } catch (err) {
    console.error('Create Confession Error:', err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a reaction to a confession
exports.reactToConfession = async (req, res) => {
  const { emoji } = req.body;
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });
    confession.reactions.set(emoji, (confession.reactions.get(emoji) || 0) + 1);
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a comment to a confession
exports.commentOnConfession = async (req, res) => {
  const { text } = req.body;
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });
    confession.comments.push({ text });
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all confessions sorted by popularity
exports.getConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find().lean();
    confessions.forEach(c => {
      let reactionCount = 0;
      if (c.reactions) {
        if (typeof c.reactions.values === 'function') {
          reactionCount = Array.from(c.reactions.values()).reduce((a, b) => a + b, 0);
        } else {
          reactionCount = Object.values(c.reactions).reduce((a, b) => a + b, 0);
        }
      }
      c.popularity = (c.comments?.length || 0) + reactionCount;
    });
    confessions.sort((a, b) => b.popularity - a.popularity);
    res.json({ confessions });
  } catch (err) {
    console.error('Get Confessions Error:', err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single confession
exports.getConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }
    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update confession
exports.updateConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    // Check if user is admin or the confession owner
    const user = await User.findById(req.user.id);
    if (!user.isAdmin && confession.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    confession.confessionText = req.body.confessionText || confession.confessionText;
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete confession
exports.deleteConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    // Check if user is admin or the confession owner
    const user = await User.findById(req.user.id);
    if (!user.isAdmin && confession.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await confession.deleteOne();
    res.json({ message: "Confession removed" });
  } catch (err) {
    console.error('Delete Confession Error:', err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get user's confessions
exports.getUserConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find({ postedBy: req.user.id })
      .sort({ datePosted: -1 });
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
