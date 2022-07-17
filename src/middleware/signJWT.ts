import jwt from "jsonwebtoken";
import config from "@src/config/config";

const NAMESPACE = 'AUTH';

interface User {
    id: Number
    email: string
    username: string
    password: string
}

const signJWT = (user: User, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    //Create Logging later
    console.log(`Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        console.error(NAMESPACE, error);
    }
};

export default signJWT;