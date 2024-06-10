import cookieParser from "cookie-parser";

import environment from "../../environment";

const { cookieSecret } = environment.app;

const cookieMiddleware = cookieParser(cookieSecret);

export default cookieMiddleware;
