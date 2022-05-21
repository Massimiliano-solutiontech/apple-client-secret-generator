import { readFileSync } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { env } from 'process';

const secretsDir = path.join(__dirname, env.production == null ? '..' : '', 'secrets');

const privateKey = readFileSync(path.join(secretsDir, 'private.key'));
dotenv.config({ path: path.join(secretsDir, '.env') });

const teamId = env.teamId;
const clientId = env.clientId;
const keyId = env.keyId;
const jwsValidity = '180 days';

const payload = {
    iss: teamId,
    aud: 'https://appleid.apple.com',
    sub: clientId,
};

const jws = jwt.sign(payload, privateKey, {
    algorithm: 'ES256', expiresIn: jwsValidity, header: {
        kid: keyId,
        alg: 'ES256',
    },
});

// eslint-disable-next-line no-console
console.log('\x1b[36mkey \x1b[0m%s\n\x1b[33mvalidity \x1b[0m%s', jws, jwsValidity);
