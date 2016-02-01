'use strict';

const mongodb = require('mongodb');

const DEFAULT_TIMESTAMP_FIELD_NAME = 'timestamp';
const OBJ_ID = '_id';

module.exports = class Reader {

    constructor (db, collectionName, timestampField) {
        this.db = db;
        this.collectionName = collectionName;
        this.timestampField = timestampField || DEFAULT_TIMESTAMP_FIELD_NAME;
    }

    read () {
        let query;
        if (this.timestampField === OBJ_ID) {
            query = { [this.timestampField]: { $gte: new mongodb.ObjectId() } };
        } else {
            query = { [this.timestampField]: { $gte: new Date() } };
        }

        return this.db.collection(this.collectionName)
            .find(query)
            .addCursorFlag('tailable', true)
            .addCursorFlag('awaitData', true)
            .addCursorFlag('noCursorTimeout', true)
            .setCursorOption('numberOfRetries', Number.MAX_SAFE_INTEGER);
    }
};
