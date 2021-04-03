import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';

import { dbConfig } from '../../config/dbConfig';

import * as mocks from './mocks';
import { IMock, IRelationItem } from './interface/mock.interface';

const connectionManager = getConnectionManager();

const connection = connectionManager.create({
    ...(dbConfig().db as ConnectionOptions),
    dropSchema: true,
    synchronize: true,
});

/** Рекурсивный метод для поиска пути в Materialized Path. */
// tslint:disable-next-line: no-any
function findPath(entities: any[], parentId: string, path: string[]): string[] {
    let newPath = [...path];
    newPath.push(parentId);
    const entity = entities.find((el) => el.id === parentId);
    if (entity?.parentId) {
        newPath = [...findPath(entities, entity.parentId, newPath)];
    }

    return newPath;
}

/** Функция заполнения артефактов БД (триггеров, функций, хранимых процедур и тп). */
async function seedDbArtifacts(typeOrmConnection: Connection, clean = true): Promise<void> {
    /** UNCOMMENT TO SEED STORED PROCEDURES AND OTHER NON-ENTITY ARTIFACTS. */
    /*
    if (clean) {
        await typeOrmConnection.query('DROP FUNCTION IF EXISTS "FUNCTION_NAME"');
    }

    let testScript;
    try {
        testScript = fs.readFileSync(
            join(__dirname, '/db/functions/testFunction.sql'),
            'utf8',
        );
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error('Error while reading SQL scripts.');
        throw e;
    }

    if (!testScript) {
        throw new Error('Error: SQL scripts cant be empty.');
    }

    await typeOrmConnection.query(testScript);
   */
}

// tslint:disable-next-line: no-floating-promises
(async () => {
    await connection.connect();
    const repoMocks: IMock<unknown>[] = Object.values(mocks);

    repoMocks.sort((a, b) => b.order - a.order);
    for (const mock of repoMocks) {
        await connection.getRepository(mock.repository).delete({});
    }
    repoMocks.sort((a, b) => a.order - b.order);
    for (const mock of repoMocks) {
        await connection.getRepository(mock.repository).save(mock.syncData);

        if (Boolean(mock.relations)) {
            Object.keys(mock.relations).forEach((entity: string) => {
                (mock.relations[entity] as IRelationItem[]).forEach(async (relation) => {
                    const relationQueryBuilder = connection
                        .createQueryBuilder()
                        .relation(mock.repository, entity)
                        .of(relation.from);
                    if (Array.isArray(relation.to)) {
                        await relationQueryBuilder.add(relation.to);
                    } else {
                        await relationQueryBuilder.set(relation.to);
                    }
                });
            });
        }
    }

    /** Заполняем триггеры, функции. */
    await seedDbArtifacts(connection);
})();
