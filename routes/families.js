const {authentication, adminAuth} = require('../middleware/authentication');
const ServicesFamilies            = require('../services/families');

module.exports = function (app) {
    app.post('/v2/families', getFamilies);
    app.post('/v2/family', getFamily);
    app.put('/v2/family', authentication, adminAuth, saveFamily);
    app.delete('/v2/family/:_id', authentication, adminAuth, deleteFamily);
};

async function getFamilies(req, res, next) {
    try {
        const result = await ServicesFamilies.getFamilies(req.body.PostBody);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getFamily(req, res, next) {
    try {
        const family = await ServicesFamilies.getFamily(req.body.PostBody);
        return res.json(family);
    } catch (error) {
        next(error);
    }
}

async function saveFamily(req, res, next) {
    try {
        const result = await ServicesFamilies.saveFamily(req.body);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}
async function deleteFamily(req, res, next) {
    try {
        await ServicesFamilies.deleteFamily(req.params._id);
        return res.status(200).end();
    } catch (error) {
        next(error);
    }
}
