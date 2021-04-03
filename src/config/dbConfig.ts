import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as path from 'path';

interface IDbConfig {
    db: TypeOrmModuleOptions;
}

export const dbConfig = (): IDbConfig => {
    const entitiesRelativePath = process.env.DB_ENTITIES_PATH || '/dist/entity/**/*.entity{.ts,.js}';

    return {
        db: {
            dropSchema: false,
            logging: false,
            maxQueryExecutionTime: 2000,
            ssl: false,
            synchronize: false,
            entities: [path.join(process.cwd(), entitiesRelativePath)],
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            schema: process.env.DB_SCHEMA || 'public',
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
    };
};
