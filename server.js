import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/orders") {
    const { cart, priority } = req.body;

    const orderPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const priorityPrice = priority ? Math.round(orderPrice * 0.2) : 0;

    const estimatedDelivery = new Date(Date.now() + 30 * 60000).toISOString();

    req.body.orderPrice = orderPrice;
    req.body.priorityPrice = priorityPrice;
    req.body.estimatedDelivery = estimatedDelivery;
    req.body.status = "preparing";
  }
  next();
});

server.use(router);
server.listen(5001, () => {
  console.log("✅ Pizza Logic Server is running on http://localhost:5001");
});
