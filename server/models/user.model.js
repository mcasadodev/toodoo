import bcrypt from "bcrypt";

export class User {
  constructor(id, name, password, email, image, rights) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.image = image;
    this.rights = rights;
  }

  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  matchPassword = async (formPassword, userPassword) => {
    return await bcrypt.compare(formPassword, userPassword);
  };
}
