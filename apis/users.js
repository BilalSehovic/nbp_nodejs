const database = require('../nbp.js');

const baseQuery =
    `select Id "Id",
    AboutMe "AboutMe",
    Age "Age",
    CreationDate "CreationDate",
    DisplayName "DisplayName",
    DownVotes "DownVotes",
    EmailHash "EmailHash",
    LastAccessDate "LastAccessDate",
    Location "Location",
    Reputation "Reputation",
    UpVotes "UpVotes",
    Views "Views",
    WebsiteUrl "WebsiteUrl",
    AccountId "AccountId"
  from Users`;

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