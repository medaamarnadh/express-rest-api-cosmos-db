var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = `temp01`;
var router = express.Router();

const { isAuthenticated } = require('../../middlewares/authenticate')

/* GET users listing. */
router.get('/logged-user', isAuthenticated, function(req, res, next) {
    try {
        res.statusCode = 200;
        res.send({
            success: true,
            data: {
                ...req.user
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
    
});

router.post('/register', async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        res.send({
            hash: hash,
        })
        return;
    } catch (err) {
        console.log(err)
        next(req, res, err)
    }
});


router.post('/login', async (req, res, next) => {
    try {
        let hash = `$2a$10$moOateicDVoohZc5KKFioeqL7VCy0uf00bm0.HsL2NQQ3enolYan.`
        const result = bcrypt.compareSync(req.body.password, hash);
        console.log(`Result........  ${result}`)
        if(result) {
            const token = jwt.sign({ email: req.body.email }, secretKey, { expiresIn: '1d' });
            res.send({
                success: false,
                data: {
                    token: token,
                    user: {
                        
                    }
                }
            })
        } else {
            res.send({
                success: false, 
                error: 'Returns login......'
            })
        }
        return;
    } catch (err) {
        console.log(err);
        next(req, res, err);
    }
})

module.exports = router;
