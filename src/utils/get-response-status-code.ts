import httpStatus from "http-status";

const {
  OK,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  TOO_MANY_REQUESTS,
  NOT_IMPLEMENTED,
} = httpStatus;

export type Code =
  | typeof OK
  | typeof CREATED
  | typeof NO_CONTENT
  | typeof NOT_FOUND
  | typeof BAD_REQUEST
  | typeof INTERNAL_SERVER_ERROR
  | typeof TOO_MANY_REQUESTS
  | typeof NOT_IMPLEMENTED;

const getResponseStatusCode = (code: Code) => ({
  code: httpStatus[`${code}_CLASS`],
  name: httpStatus[`${code}_NAME`],
  message: httpStatus[`${code}_MESSAGE`],
});

export {
  OK,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  TOO_MANY_REQUESTS,
  NOT_IMPLEMENTED,
};

export default getResponseStatusCode;
