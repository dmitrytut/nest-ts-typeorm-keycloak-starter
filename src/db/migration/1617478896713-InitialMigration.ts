import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1617478896713 implements MigrationInterface {
    name = 'InitialMigration1617478896713';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "public"."profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" citext, "birthDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cbc966fdb35f93df14e23be606f" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."profile"`);
    }
}
