import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';

interface IKeycloakConfig {
    keycloak: KeycloakConnectOptions;
}

export const keycloakConfig = (): IKeycloakConfig => ({
    keycloak: {
        'auth-server-url': process.env.KEYCLOAK_AUTH_URL,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        realm: process.env.KEYCLOAK_REALM,
        // Secret key of the client taken from keycloak server.
        secret: process.env.KEYCLOAK_SECRET,
    },
});
