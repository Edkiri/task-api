import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1678205730610 implements MigrationInterface {
  name = 'init1678205730610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lists" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "slug_name" character varying(255) NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" character varying(255) NOT NULL, "done" boolean NOT NULL DEFAULT false, "important" boolean NOT NULL DEFAULT false, "today" boolean NOT NULL DEFAULT false, "expiresOn" TIMESTAMP, "list_id" integer, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "FK_f4864acd42448f7170d352429e6" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "FK_f4864acd42448f7170d352429e6"`,
    );
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TABLE "lists"`);
  }
}
