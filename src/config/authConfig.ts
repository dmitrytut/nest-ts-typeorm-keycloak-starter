interface IAuthConfig {
    auth: {
        expiresIn: number;
        secret: string;
        cookieName: string;
    };
}

export const authConfig = (): IAuthConfig => ({
    auth: {
        // Expiration time in seconds.
        expiresIn: parseInt(process.env.AUTH_TOKEN_EXPIRES_IN, 10) || 3600,
        secret: process.env.AUTH_TOKEN_SECRET,
        cookieName: process.env.AUTH_TOKEN_COOKIE_NAME || 'jwt',
    },
});
