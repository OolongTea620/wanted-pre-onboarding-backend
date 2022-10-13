const validateEmail = (email) => {
  const emailCondition =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (!emailCondition.test(email)) {
    const error = new Error("옳지 않은 이메일");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateEmail,
};
