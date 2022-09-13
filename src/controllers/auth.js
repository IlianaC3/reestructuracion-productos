
class PublicAuth {
    async publicAuthorization(req, res, next) {
        // console.log(req)
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}


module.exports = PublicAuth