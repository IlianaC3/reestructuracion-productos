const { fork } = require('child_process');
const { randomCalc } = require('../operations/randoms/randomCal')
const InfoClass = require('../services/Info');
const InfoData = new InfoClass();

class GeneralInfo {
    async Info(req, res, next) {
        let data = await InfoData.DataProject().then((result) => { return result});
        let test = await InfoData.ForLoop().then((result) => { return result})
        res.status(200).json({
            message: 'Datos',
            elementos: data,
            test: test
        });
    };
    
    //con child process
    async RandomsChildProccess(req, res, next) {
        let random = req.query.cant === undefined ? 1e9 : req.query.cant;
        const forkeando = fork(process.cwd()+'/randoms/randomFork');
        forkeando.send(random);
        forkeando.on('message', (result) => {
            if (result > 0) {
                res.send('La sumatoria total fue '+ result)
            }
        }) 
    };
    
    //sin child process
    async Randoms (req, res, next) {
        let random = req.query.cant === undefined ? 1e9 : req.query.cant;
        let result = randomCalc(random)
        if (result > 0) {
            res.send('La sumatoria total fue '+ result)
        }
    };
}



module.exports = GeneralInfo;