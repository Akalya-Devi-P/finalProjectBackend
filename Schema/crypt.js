var bcrypt = require('bcryptjs');


function encryptPwd(pwd)
{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pwd, salt);
        return hash
    } 
    catch (error) {
        console.log(error);
    }
}

function dencryptPwd(pwd, dbPwd)
{
    try {
        return bcrypt.compareSync(pwd, dbPwd);
    } 
    catch (error) {
        console.log(error);
    }
}

module.exports = {encryptPwd, dencryptPwd}