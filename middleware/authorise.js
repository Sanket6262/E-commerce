const jwt = require('jsonwebtoken');

 const authorise = (req, res, next) => {
 const token = req.header('Authorization'); ['Bearer','lkjhn,o986gfvbk']
const bearerWord = (token.split("")[0].trim());
const bearerToken = token.split("")[1];
if (bearerWord  !="Bearer") {
    return res.status(403).json({ message: 'Invalid Header'});
}
if (!bearerToken){
    return res.status(401).json({ message: 'No token, authorization denied'});
}
try{
    const decoded =jwt.verify(bearerToken,'wisdom');
 req.user = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({messsage: 'Token is not valid' });
 }
};
module.exports = authorise;