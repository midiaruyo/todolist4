const httpHead = {
    "ALLOW-ACCESS-CONTROL-ORIGIN": "*",
    "ALLOW-ACCESS-CONTROL-METHOD": "GET,POST,OPTIONS,PATCH,DELETE",
    "ALLOW-ACCESS-CONTROL-HEADER":
      "Content-Type,Content-length,authorization,X-Requested-With",
    "Content-Type": "application/json",
  };
  
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