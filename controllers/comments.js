const comments = require('../apis/comments.js');

async function get(req, res, next) {
  try {
    console.log(`GET COMMENTS method in controllers folder with id ${parseInt(req.params.id, 10)}`);

    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await comments.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
    console.log(`----------------------------------------------------------------`);
  } catch (err) {
    next(err);
  }
}

async function post(req, res, next) {
  try {
    console.log(`POST COMMENTS method in controllers folder`);

    var body = '';
    await req.on('data', function(data) {
      body += data;
    });
    
    var bodyObj = JSON.parse(body);
    
    const context = {};

    context.Id = parseInt(bodyObj.Id ?? "0", 10);
    context.CreationDate = new Date(bodyObj.CreationDate ?? new Date());
    context.PostId = parseInt(bodyObj.PostId ?? "0", 10);
    context.Score = parseInt(bodyObj.Score ?? "0", 10);
    context.Text = bodyObj.Text ?? "empty";
    context.UserId = parseInt(bodyObj.UserId ?? "0", 10);

    const rows = await comments.post(context);
    res.status(201).end();
    console.log(`----------------------------------------------------------------`);
  } catch (err) {
    next(err);
  }
}

async function put(req, res, next) {
  try {
    console.log(`PUT COMMENTS method in controllers folder with id ${parseInt(req.params.id, 10)}`);
    
    let success = false;

    var body = '';
    await req.on('data', function(data) {
      body += data;
    });

    var bodyObj = JSON.parse(body);

    const found = await comments.find({ id: parseInt(req.params.id, 10) });
    
    const context = {};

    context.Id = parseInt(bodyObj.Id ?? "0", 10);
    context.CreationDate = new Date(bodyObj.CreationDate ?? new Date());
    context.PostId = parseInt(bodyObj.PostId ?? "0", 10);
    context.Score = parseInt(bodyObj.Score ?? "0", 10);
    context.Text = bodyObj.Text ?? "empty";
    context.UserId = parseInt(bodyObj.UserId ?? "0", 10);

    if (found.length === 1)
        success = await comments.update(context);
    
    if (success)
      res.status(204).end();
    else
      res.status(404).end();
    console.log(`----------------------------------------------------------------`);
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  try {
    console.log(`DELETE COMMENTS method in controllers folder with id ${parseInt(req.params.id, 10)}`);

    const context = {};

    context.id = parseInt(req.params.id, 10);

    let success = false;

    const rows = await comments.find(context);

    if (req.params.id)
      if (rows.length === 1)
        success = await comments.del(context);
    
    if (success)
      res.status(200).end();
    else
      res.status(404).end();
    console.log(`----------------------------------------------------------------`);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.del = del;