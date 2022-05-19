import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import product_routes from './handlers/products';
import dashboardRoutes from './handlers/dashboards';
import cors from 'cors';

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.json());
//When I add this, I can use body type as raw then json
app.use(cors());

app.use(express.urlencoded({ extended: false}));
//When I add this, I can use body type as urlencoded

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

product_routes(app);
user_routes(app);
order_routes(app);
dashboardRoutes(app);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);    
});

export default app;