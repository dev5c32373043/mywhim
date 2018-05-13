const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

const PORT = process.env.PORT || 4000;
const db = require('./fixtures/db');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(serveStatic(`${__dirname}/dist`));

router.get('/api/products', async (ctx) => {
  ctx.body = {
    products: db.products.all(),
    categories: db.categories.all(),
    locations: db.locations.all(),
  };
});

router.get('/api/products/filter', (ctx) => {
  const query = {};
  Object.keys(ctx.query).map((attr) => {
    if (attr === 'categories[]') {
      query.categories = ctx.query[attr];
    } else if (attr === 'title' || attr === 'location') {
      query[attr] = ctx.query[attr];
    }
  });
  if (ctx.query.order_type && ctx.query.order_by) {
    query.order = {
      type: ctx.query.order_type,
      by: ctx.query.order_by,
    };
  }
  ctx.body = {
    products: db.products.find(query),
    categories: db.categories.all(),
    locations: db.locations.all(),
  };
});

router.get('/api/user/authenticate', (ctx) => {
  if (ctx.request.headers.authorization) {
    ctx.status = 200;
    ctx.body = { id: Math.random(), email: 'sample@email.com' };
  } else {
    ctx.status = 401;
  }
});

router.post('/api/user/login', (ctx) => {
  const params = ctx.request.body;
  if (params.email && params.password) {
    ctx.body = {
      user: { id: Math.random(), email: params.email },
      token: `sample-${Math.random()}`,
    };
  } else {
    ctx.status = 400;
    const errors = {};
    if (!params.email) errors.email = 'required!';
    if (!params.password) errors.password = 'required!';
    ctx.body = { errors };
  }
});

router.post('/api/user/sign_up', (ctx) => {
  const params = ctx.request.body;
  if (params.email && params.password) {
    ctx.body = {
      user: { id: Math.random(), email: params.email },
      token: `sample-${Math.random()}`,
    };
  } else {
    ctx.status = 400;
    const errors = {};
    if (!params.email) errors.email = 'required!';
    if (!params.password) errors.password = 'required!';
    ctx.body = { errors };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = await new Promise((resolve, reject) => {
    fs.readFile('./dist/index.html', { encoding: 'utf8' }, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
});

app.listen(PORT, () => `node listening on port ${PORT}`);
