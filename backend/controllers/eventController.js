import * as eventService from '../services/eventService.js';

export const create = async (req, res, next) => {
  try {
    const e = await eventService.createEvent(req.user.id, req.body);
    res.status(201).json(e);
  } catch (e) {
    next(e);
  }
};

export const list = async (req, res, next) => {
  try {
    const list = await eventService.listByRole(req.user);
    res.json(list);
  } catch (e) {
    next(e);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const e = await eventService.updateStatus(req.user, req.params.id, req.body.status);
    res.json(e);
  } catch (e) {
    next(e);
  }
};
