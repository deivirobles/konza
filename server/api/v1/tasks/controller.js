const HTTP_STATUS = require("http-status-codes");

const Model = require("./model");
const { paginationParseParams } = require("./../../../utils");

exports.id = async (req, res, next, id) => {
  try {
    const doc = await Model.findById(id).exec();
    if (doc) {
      req.doc = doc;
      next();
    } else {
      next({
        message: "Resource not found",
        statusCode: HTTP_STATUS.NOT_FOUND,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  try {
    const doc = await Model.create(body);
    res.status(HTTP_STATUS.CREATED);
    res.json({
      data: doc,
      success: true,
      statusCode: HTTP_STATUS.CREATED,
    });
  } catch (err) {
    next(err);
  }
};

exports.all = (req, res, next) => {
  const { query } = req;
  const { limit, page, skip } = paginationParseParams(query);

  Model.find({})
    .sort({})
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) {
        next(err);
      } else {
        res.json({
          data: docs,
          success: true,
          statusCode: HTTP_STATUS.OK,
          meta: {
            limit,
            skip,
            page,
          },
        });
      }
    });
};

exports.read = (req, res, next) => {
  const { doc = {} } = req;
  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS.OK,
  });
};

exports.update = async (req, res, next) => {
  try {
    const { body = {}, doc = {} } = req;
    Object.assign(doc, body);
    const updated = await doc.save();

    res.json({
      data: document,
      success: true,
      statusCode: HTTP_STATUS.OK,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { doc = {} } = req;
    const deleted = await doc.remove();
    res.json({
      data: document,
      success: true,
      statusCode: HTTP_STATUS.OK,
    });
  } catch (err) {
    next(err);
  }
};
