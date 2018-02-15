exports.allowCrossDomain = function(req, res, next) {
  //instantiate allowed domains list
  const allowedDomains = ['http://localhost:7777', 'http://localhost:4200'];
  //check if request origin is in allowed domains list
  if (allowedDomains.indexOf(req.headers.origin) != -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
  }

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
