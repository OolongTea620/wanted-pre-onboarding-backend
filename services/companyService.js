const { Company } = require("../models");

const signUp = async (name, address, phone, email) => {
  //회사 등록
  const company = Company.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
  });
};

module.exports = {
  signUp,
};
