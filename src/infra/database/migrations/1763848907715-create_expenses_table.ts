import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExpensesTable1763848907715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "expenses" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "date" date NOT NULL,
                "description" varchar NOT NULL,
                "amount" decimal(10,2) NOT NULL,
                "category_id" uuid NOT NULL,
                CONSTRAINT "FK_expenses_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "expenses";
        `);
    }
}
