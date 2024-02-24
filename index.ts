import Koa from "koa";
import { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

const app: Koa = new Koa();

import { router as articles } from "./src/routes/articles";

app.use(json());
app.use(logger());
app.use(articles.routes());
app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { err: "No such endpoint existed" }
    }
  } catch (err: any) {
    ctx.body = { err: err }
  }
})

app.listen(10888, () => {
  console.log("Koa Started");
})