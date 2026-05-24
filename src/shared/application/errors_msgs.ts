export type JsonErrorResponse =
    | {
          message: string;
          detailed: any;
      }
    | {
          message: string;
          detailed?: never;
      }
    | {
          message?: never;
          detailed: any;
      };

export interface TModuleErrors {
    /**
     * @param BAD_REQUEST - Bad Request Errors Messages | 400
     */
    BAD_REQUEST: TErrorMsg;

    /**
     * @param UNAUTHORIZED - Unauthorized Errors Messages | 401
     */
    UNAUTHORIZED: TErrorMsg;

    /**
     * @param FORBIDDEN - Forbidden Errors Messages | 403
     */
    FORBIDDEN: TErrorMsg;

    /**
     * @param NOT_FOUND - Not Found Errors Messages (Busca Única) | 404
     */
    NOT_FOUND: TErrorMsg;

    /**
     * @param CONFLICT - Conflict Errors Messages | 409
     */
    CONFLICT: TErrorMsg;

    /**
     * @param UNPROCESSABLE_ENTITY - Unprocessable Entity Errors Messages | 422
     */
    UNPROCESSABLE_ENTITY: TErrorMsg;

    /**
     * @param OTHERS - Other Errors Messages | 402, 405, 406, 407, 408, 410, 411, 412, 413, 414, 415, 416, 417, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
     */
    OTHERS: TErrorMsg;
}

export interface TErrorMsg {
    [key: string]: string | JsonErrorResponse;
}

export const errorMsgs = {} satisfies TErrorMsg;
