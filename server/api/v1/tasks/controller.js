exports.create = (req, res, next) => {
  res.json({
    message: "Task created",
  });
};

exports.all = (req, res, next) => {
  res.json({
    message: "All Tasks",
  });
};

exports.read = (req, res, next) => {
  res.json({
    message: "Read one Task",
  });
};

exports.update = (req, res, next) => {
  res.json({
    message: "Update one Task",
  });
};

exports.delete = (req, res, next) => {
  res.json({
    message: "Delete one Task",
  });
};
