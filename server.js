const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom output for List with _id instead of id
router.render = (req, res) => {
  if (Array.isArray(res.locals.data)) {
    res.jsonp(res.locals.data.map(record => {
      record.id = record._id;
      delete record._id;
      return record;
    }));
  } else {
    let data = res.locals.data;
    data.id = data._id;
    delete data._id;
    res.jsonp(data);
  }
};

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/:resource/:id': '/:resource?_id=:id',
  '/:resource/:id/:resource2': '/:resource?_id=:id/:resource2',
}));

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running')
});
