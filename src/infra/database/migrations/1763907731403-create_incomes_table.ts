import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncomesTable1763907731403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE income_recurrence_type AS ENUM ('one_time', 'monthly');
        `);

        await queryRunner.query(`
            CREATE TABLE "incomes" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "date" date,
                "recurrence_type" income_recurrence_type NOT NULL,
                "description" varchar NOT NULL,
                "amount" decimal(10,2) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "incomes";
        `);
    
        await queryRunner.query(`
            DROP TYPE income_recurrence_type;
        `);
    }

}
