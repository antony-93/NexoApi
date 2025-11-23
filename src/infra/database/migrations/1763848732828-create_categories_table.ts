import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriesTable1763848732828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "description" varchar NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "categories";
        `);
    }

}
