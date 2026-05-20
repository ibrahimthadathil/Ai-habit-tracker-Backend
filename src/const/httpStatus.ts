export const STATUS = {
  SUCCESS: { code: 200, message: "Success" },
  CREATED: { code: 201, message: "Resource created successfully" },
  BAD_REQUEST: { code: 400, message: "Bad request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Resource not found" },
  CONFLICT: { code: 409, message: "Conflict occurred" },
  SERVER_ERROR: { code: 500, message: "Internal server error" },
  NO_CONTENT :{code:204,message:"No Content"}
} as const;