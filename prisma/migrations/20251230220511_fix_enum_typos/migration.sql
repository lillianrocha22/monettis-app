/*
  Warnings:

  - The values [ENTRETAINMENT] on the enum `TransactionCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [INVESTIMENT] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionCategory_new" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITY', 'SALARY', 'EDUCATION', 'OTHER');
ALTER TABLE "Transaction" ALTER COLUMN "category" TYPE "TransactionCategory_new" USING ("category"::text::"TransactionCategory_new");
ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
ALTER TYPE "TransactionCategory_new" RENAME TO "TransactionCategory";
DROP TYPE "public"."TransactionCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('DEPOSIT', 'EXPENSE', 'INVESTMENT');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "public"."TransactionType_old";
COMMIT;
