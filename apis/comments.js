const database = require('../nbp.js');

const baseQuery =
    `select Id "Id",
    CreationDate "CreationDate",
    PostId "PostId",
    Score "Score",
    Text "Text",
    UserId "UserId"
  from Comments`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.Id = context.id;

        query += `\nwhere Id = :Id`;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;