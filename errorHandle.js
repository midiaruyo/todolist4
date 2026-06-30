const { httpHead } = require("./config");
  
function errorHandle(res,msg)
{
    res.writeHead(400, httpHead);
    res.end(
      JSON.stringify({
        status: false,
        message: msg,
      })
    );
}
module.exports ={errorHandle};