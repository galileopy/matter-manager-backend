-- CreateTable
CREATE TABLE "SmtpConfig" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "secure" BOOLEAN NOT NULL,
    "requireTLS" BOOLEAN NOT NULL,
    "maxConnections" INTEGER NOT NULL,
    "tlsRejectUnauthorized" BOOLEAN NOT NULL,
    "tlsCiphers" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "SmtpConfig_pkey" PRIMARY KEY ("id")
);
