const crypto = require('crypto');
const conn = require('../database/connection');
 
module.exports = {
    async create(req, res) {
        const data = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await conn('ongs').insert({ id, ...data });

        return res.json({ id });
    },

    async index(req, res) {
        const ongs = await conn('ongs').select('*');

        return res.json(ongs);
    }
};