import { io } from 'socket.io-client';
import routes from './routes';

export default io(routes.socketPath());
