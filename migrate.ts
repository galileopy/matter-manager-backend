import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ConfigService } from '@nestjs/config';

import * as pg from 'pg';
import { PrismaClient } from '@prisma/client';

async function runEtl(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule);

  const config = application.get(ConfigService);
  const dumpDb = config.get<string>('DUMP_DB_URL');

  const prisma = application.get(PrismaClient);

  const client = new pg.Client(dumpDb);
  await client.connect();

  // -- DELETE ALL DATA --
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  //   USERS
  const dumpUsers = (await client.query('SELECT * from "tblUsers"')).rows;

  await prisma.$transaction(async (tx) => {
    for (const user of dumpUsers) {
      // only load users of type admin or user
      if (
        user.userTypeID >= 3 ||
        !user.windowslogin ||
        !user.threeLetterAbbreviation
      )
        continue;

      await tx.user.create({
        data: {
          username: user.windowslogin,
          email: user.email,
          role: user.userTypeID === 1 ? 'USER' : 'ADMIN',
          firstName: user.EmployeeFirstName ?? user.windowslogin,
          lastName: user.EmployeeLastName ?? user.windowslogin,
          abbreviation: user.threeLetterAbbreviation.toUpperCase(),
        },
      });
    }
    return;
  });

  // CLIENTS

  const dumpClients = (await client.query('SELECT * from "tblClient"')).rows;

  await prisma.$transaction(async (tx) => {
    for (const client of dumpClients) {
      if (!client.txtClientName) continue;

      await tx.client.create({
        data: {
          name: client.txtClientName,
          suffix: client.nameWithSuffixes
            ? client.nameWithSuffixes.replace(client.txtClientName, '')
            : undefined,
          email: client.txtEmail,
          type: client.clientType === 1 ? 'ASSOCIATION' : 'NON_ASSOCIATION',
          deletedAt: !client.active ? new Date() : undefined,
        },
      });
    }
    return;
  });
}

runEtl().then((_) => process.exit());
