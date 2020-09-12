const jwt = require("jsonwebtoken")

function restrict() {

	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
			const token = req.headers.authorization
			if (!token) {
				return res.status(401).json(authError)
			}
//should be a hidden env variable but this isnt used code soooo
            jwt.verify(token, "envVAR", (err, decoded) => {
                if (err){
                    return res.status(401).json(authError)
                }
                req.token = decoded

                next()
            })
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict