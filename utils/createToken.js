import jwt from "jsonwebtoken";

export default (payload,exp)=>{
    return jwt.sign(
        {
            ...payload
        },
        'password_key',
        {
            expiresIn: exp,
        },
    );
}
