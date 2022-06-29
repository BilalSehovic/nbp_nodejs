const database = require('../nbp.js');

const baseQuery =
    `select Id "Id",
    CreationDate "CreationDate",
    PostId "PostId",
    Score "Score",
    Text "Text",
    UserId "UserId"
from Comments`;
const createQuery = `INSERT INTO Comments ("ID", "CREATIONDATE", "POSTID", "SCORE", "TEXT", "USERID") VALUES `; 
const updateQuery = `UPDATE Comments SET "CREATIONDATE" = :CreationDate, "POSTID" = :PostId, "SCORE" = :Score, "TEXT" = :Text, "USERID" = :UserId WHERE "ID" = :Id`; 
const deleteQuery = `delete from Comments`;

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

async function post(context) {
    let query = createQuery;
    const binds = {};

    if (context) {
        binds.Id = context.Id;
        binds.CreationDate = context.CreationDate;
        binds.PostId = context.PostId;
        binds.Score = context.Score;
        binds.Text = context.Text;
        binds.UserId = context.UserId;

        console.log('binds: ', binds);

        query += `(:Id, :CreationDate, :PostId, :Score, :Text, :UserId)`;
    }

    console.log(`comments api post query: ${query}`);
    
    const result = await database.simpleExecute(query, binds);

    console.log(`comments api post: ${JSON.stringify(result)}`);

    return result.rows;
}

async function update(context) {
    let query = updateQuery;
    const binds = {};

    if (context) {
        binds.Id = context.Id;
        binds.CreationDate = context.CreationDate;
        binds.PostId = context.PostId;
        binds.Score = context.Score;
        binds.Text = context.Text;
        binds.UserId = context.UserId;

        console.log('binds: ', binds);
    }

    console.log(`comments api put query: ${query}`);
    
    const result = await database.simpleExecute(query, binds);

    console.log(`comments api put: ${JSON.stringify(result)}`);

    return true;
}

async function del(context) {
    let query = deleteQuery;
    const binds = {};

    if (context.id) {
        binds.Id = context.id;

        console.log('binds: ', binds);

        query += `\nwhere Id = :Id`;
    }

    const result = await database.simpleExecute(query, binds);

    console.log(`comments api del: ${JSON.stringify(result)}`);

    return true;
}

module.exports.find = find;
module.exports.post = post;
module.exports.update = update;
module.exports.del = del;