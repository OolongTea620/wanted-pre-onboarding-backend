const { companyService } = require("../services");
const signUp = async (req, res) => {
  const { name, address, phone, email } = req.body;
  await companyService.signUp(name, address, phone, email);
  return res.status(201).json({ message: "기업 등록 완료!" });
};
module.exports = { signUp };
