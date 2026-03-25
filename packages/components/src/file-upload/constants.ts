/**
 * File upload error codes
 */
export const FILE_UPLOAD_ERRORS = {
  /**
   * Exceeds the maxFiles limit
   */
  TOO_MANY_FILES: 'TOO_MANY_FILES',
  /**
   * File type not in the accept list
   */
  FILE_INVALID_TYPE: 'FILE_INVALID_TYPE',
  /**
   * File size exceeds maxFileSize
   */
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  /**
   * File size below minFileSize
   */
  FILE_TOO_SMALL: 'FILE_TOO_SMALL',
  /**
   * Generic validation failure
   */
  FILE_INVALID: 'FILE_INVALID',
  /**
   * Duplicate file detected
   */
  FILE_EXISTS: 'FILE_EXISTS',
} as const
