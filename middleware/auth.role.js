
const secureRoute = (roles)=>(req, res, next) => {
  if(!roles.includes(req.user.type)){
    const error = new Error("Unauthorized access to endpoint");
    error.statusCode = 401;
    throw error
      
  }
  return next();
};

module.exports = secureRoute;