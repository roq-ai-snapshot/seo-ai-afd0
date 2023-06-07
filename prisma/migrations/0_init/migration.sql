-- CreateTable
CREATE TABLE "content_suggestion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "suggestion" TEXT NOT NULL,
    "pencraft_pro_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "platform" VARCHAR(255) NOT NULL,
    "api_key" VARCHAR(255) NOT NULL,
    "pencraft_pro_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyword" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "keyword" VARCHAR(255) NOT NULL,
    "pencraft_pro_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pencraft_pro" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pencraft_pro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_engagement" INTEGER NOT NULL,
    "seo_score" INTEGER NOT NULL,
    "pencraft_pro_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "content_suggestion" ADD CONSTRAINT "content_suggestion_pencraft_pro_id_fkey" FOREIGN KEY ("pencraft_pro_id") REFERENCES "pencraft_pro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_pencraft_pro_id_fkey" FOREIGN KEY ("pencraft_pro_id") REFERENCES "pencraft_pro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "keyword" ADD CONSTRAINT "keyword_pencraft_pro_id_fkey" FOREIGN KEY ("pencraft_pro_id") REFERENCES "pencraft_pro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pencraft_pro" ADD CONSTRAINT "pencraft_pro_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "performance" ADD CONSTRAINT "performance_pencraft_pro_id_fkey" FOREIGN KEY ("pencraft_pro_id") REFERENCES "pencraft_pro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

