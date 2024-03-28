import bcrypt from "bcryptjs";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratedHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (enterPassword: string, savedPasword: string, salt: string) => {
  return await GeneratedHashedPassword(enterPassword, salt) === savedPasword; 
}