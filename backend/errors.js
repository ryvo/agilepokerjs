const validationError = (validationErrors) => {
  const errors = validationErrors.map((validationError) => ({
    message: validationError.msg,
  }));
  return { errors };
}

const authorizationError = () => {
  return {
    errors: [{ message: "error.unauthorized" }]
  }
}

export { validationError, authorizationError };