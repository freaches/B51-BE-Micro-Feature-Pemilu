import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigrations1704115315705 implements MigrationInterface {
    name = 'MyMigrations1704115315705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "partyLeader" character varying NOT NULL, "visionMission" text NOT NULL, "address" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "numberPaslon" integer NOT NULL, "visionMission" text NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'ghost', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partai_paslon_paslon" ("partaiId" integer NOT NULL, "paslonId" integer NOT NULL, CONSTRAINT "PK_498f32dc090189f7ff631bf4247" PRIMARY KEY ("partaiId", "paslonId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_000899b889d2c426b642b445d4" ON "partai_paslon_paslon" ("partaiId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dfaa72311a56c682f583a58ed1" ON "partai_paslon_paslon" ("paslonId") `);
        await queryRunner.query(`CREATE TABLE "paslon_partai_partai" ("paslonId" integer NOT NULL, "partaiId" integer NOT NULL, CONSTRAINT "PK_33b8c4d5265e514063470190656" PRIMARY KEY ("paslonId", "partaiId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6abb0f5f24bad20c5db9a09a83" ON "paslon_partai_partai" ("paslonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2dc1c0833b8070a597dc1e51a" ON "paslon_partai_partai" ("partaiId") `);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8eb6a34f4e7ee586af421a75bc9" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partai_paslon_paslon" ADD CONSTRAINT "FK_000899b889d2c426b642b445d40" FOREIGN KEY ("partaiId") REFERENCES "partai"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partai_paslon_paslon" ADD CONSTRAINT "FK_dfaa72311a56c682f583a58ed1f" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "paslon_partai_partai" ADD CONSTRAINT "FK_6abb0f5f24bad20c5db9a09a83f" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "paslon_partai_partai" ADD CONSTRAINT "FK_f2dc1c0833b8070a597dc1e51a7" FOREIGN KEY ("partaiId") REFERENCES "partai"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paslon_partai_partai" DROP CONSTRAINT "FK_f2dc1c0833b8070a597dc1e51a7"`);
        await queryRunner.query(`ALTER TABLE "paslon_partai_partai" DROP CONSTRAINT "FK_6abb0f5f24bad20c5db9a09a83f"`);
        await queryRunner.query(`ALTER TABLE "partai_paslon_paslon" DROP CONSTRAINT "FK_dfaa72311a56c682f583a58ed1f"`);
        await queryRunner.query(`ALTER TABLE "partai_paslon_paslon" DROP CONSTRAINT "FK_000899b889d2c426b642b445d40"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_a9d18538b896fe2a6762e143bea"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8eb6a34f4e7ee586af421a75bc9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2dc1c0833b8070a597dc1e51a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6abb0f5f24bad20c5db9a09a83"`);
        await queryRunner.query(`DROP TABLE "paslon_partai_partai"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dfaa72311a56c682f583a58ed1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_000899b889d2c426b642b445d4"`);
        await queryRunner.query(`DROP TABLE "partai_paslon_paslon"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "partai"`);
    }

}
