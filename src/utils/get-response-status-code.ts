import httpStatus from "http-status";

const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS } = httpStatus;

type Code =
  | typeof OK
  | typeof NOT_FOUND
  | typeof INTERNAL_SERVER_ERROR
  | typeof TOO_MANY_REQUESTS;

const getResponseStatusCode = (code: Code) => ({
  code: httpStatus[`${code}_CLASS`],
  name: httpStatus[`${code}_NAME`],
  message: httpStatus[`${code}_MESSAGE`],
});

export { OK, NOT_FOUND, INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS };

export default getResponseStatusCode;
