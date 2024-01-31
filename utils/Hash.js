import bcrypt from "bcrypt";

export const isValidHash = async (text,hash)=>{
   return  await bcrypt.compare(text, hash);
}
export const createHash = async (text)=>{
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(text, salt);
}
