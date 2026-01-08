import  SwaggerUi  from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import express from 'express';
import authRoutes from './routes/authroutes';
import courseRoutes from './routes/courseroutes';
import { errorHandler } from './middlewares/errormiddleware';

const app = express();
app.use('/api-doc', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('api', authRoutes);
app.use('/api/courses', courseRoutes);





// 🔴 一定要在所有 routes 後面
app.use(errorHandler);
export default app;