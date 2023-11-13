import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';
const BRAINTREE_ACCESS_TOKEN = process.env.BRIANTREE_ACCESS_TOKEN || `YjJndnlxMmJocHZqeTdtNjozMTAxY2QyMzBiNmI4OWYwMjM0MzAwMWU3NGU5MTM5ZQ==`

const STREAMCHAT_API_KEY = process.env.STEAMCHAT_API_KEY
const STREAMCHAT_API_SECRET = process.env.STREAMCHAT_API_SECRET

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};


const BRAINTREE = {
    Token: BRAINTREE_ACCESS_TOKEN

const STREAMCHAT = {
    api_key: STREAMCHAT_API_KEY,
    api_secret: STREAMCHAT_API_SECRET

}

const config = {
    server: SERVER,
    braintree: BRAINTREE
    StreamChat: STREAMCHAT
}

export default config;
