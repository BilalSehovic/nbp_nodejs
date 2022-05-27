const database = require('../nbp.js');

const baseQuery =
    `select Id "Id",
    AcceptedAnswerId "AcceptedAnswerId",
    AnswerCount "AnswerCount",
    Body "Body",
    ClosedDate "ClosedDate",
    CommentCount "CommentCount",
    CommunityOwnedDate "CommunityOwnedDate",
    CreationDate "CreationDate",
    FavoriteCount "FavoriteCount",
    LastActivityDate "LastActivityDate",
    LastEditDate "LastEditDate",
    LastEditorDisplayName "LastEditorDisplayName",
    LastEditorUserId "LastEditorUserId",
    OwnerUserId "OwnerUserId",
    ParentId "ParentId",
    PostTypeId "PostTypeId",
    Score "Score",
    Tags "Tags",
    Title "Title",
    ViewCount "ViewCount"
  from Posts`;

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