const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const router = require('koa-router')();
const kstatic = require('koa-static');
const convert = require('koa-convert');
const app = new Koa();
const Pug = require('koa-pug');
const todos = require('./todo.js');
const send = require('koa-send');

new Pug({
  app: app, 
  viewPath: './views/'
});

router.get('/', ctx => {
  ctx.render('index');
});
router.get('/todo', ctx => {
  getMocs();  
  ctx.render('todo');
});


app.use(convert(kstatic(__dirname + '/static')));
app.use(bodyParser());
app.use(compression());
app.use(router.routes())
  .use(router.allowedMethods());

getMocs = async (ctx) => {
  app.use(async (ctx) => {
  await send(ctx, './todo.js');
})
}



app.listen(3000, function() {
  console.log('listen port 3000!')
});



