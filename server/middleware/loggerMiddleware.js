export function logRequest(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 400 ? '❌' : status >= 300 ? '⚠️' : '✅';
    console.log(
      `${statusColor} [${req.method}] ${req.path} - ${status} (${duration}ms)`
    );
  });

  next();
}
