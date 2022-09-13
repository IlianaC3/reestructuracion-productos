const FakerService = require('../services/Faker')
const FakerP = new FakerService();

class FakerClass {
    async FakerController(req, res, next) {
        FakerP.FakerFunction().then((result) => {
            if (result !== undefined) {
                res.status(200).json({
                    message: `Productos`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `No existen productos`,
                });
            }
        });
    }
}

module.exports = FakerClass