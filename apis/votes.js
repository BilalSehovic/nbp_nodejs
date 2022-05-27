const database = require('../nbp.js');

const baseQuery =
    `select Id "Id",
    PostId "PostId",
    UserId "UserId",
    BountyAmount "BountyAmount",
    VoteTypeId "VoteTypeId",
    CreationDate "CreationDate"
  from Votes`;

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