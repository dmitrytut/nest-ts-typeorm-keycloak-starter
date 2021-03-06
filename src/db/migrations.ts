import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

import { dbConfig } from '../config/db.config';

(async () => {
    const connection = await createConnection({
        ...(dbConfig().db as ConnectionOptions),
        entities: [join(__dirname, '../entity/**/*.entity{.ts,.js}')],
        migrations: [join(__dirname, '/migration/*.js')],
        logging: true,
    });

    try {
        const successMigrations = await connection.runMigrations({
            transaction: 'all',
        });

        /* tslint:disable-next-line:no-console */
        console.log(
            Boolean(successMigrations?.length)
                ? `Success. Migrations list: \n${successMigrations?.map((m) => m.name).join('\n')}`
                : 'Success. No new migrations.',
        );
    } finally {
        await connection.close();
    }
})();
