import * as feedbackService from '../services/feedbackService.js';

export const submit = async (req, res, next) => {
  try {
    // Map your front‑end key "feedback" → "feedbackText"
    const { feedback: feedbackText, shouldAttendFuture } = req.body;
    const f = await feedbackService.submitFeedback(
      req.user.id,
      req.params.id,
      { feedbackText, shouldAttendFuture }
    );
    res.status(201).json(f);
  } catch (e) {
    // 400 for business-rule errors, 403 for auth errors, etc.
    res.status(400).json({ error: e.message });
  }
};

export const list = async (req, res, next) => {
  try {
    const all = await feedbackService.listAll();
    res.json(all);
  } catch (e) {
    next(e);
  }
};
