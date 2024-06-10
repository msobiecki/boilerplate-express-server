import { mw as requestIp } from "request-ip";

const requestIpMiddleware = requestIp();

export default requestIpMiddleware;
