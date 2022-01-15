import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { ExampleHelper } from '.';

const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.get('/', async (ctx: ParameterizedContext) => {
  ctx.body = ExampleHelper.text;
}); // {get} /

export { router as ExampleController };
