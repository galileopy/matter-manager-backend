import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ConfigService } from '@nestjs/config';

import * as pg from 'pg';
import { PrismaClient } from '@prisma/client';

async function runEtl(): Promise<void> {
  const userIdMap = {};
  const clientIdMap = {};
  const statusIdMap = {};
  const matterIdMap = {};

  const application = await NestFactory.createApplicationContext(AppModule);
  const config = application.get(ConfigService);
  const dumpDb = config.get<string>('DUMP_DB_URL');
  const prisma = application.get(PrismaClient);

  const client = new pg.Client(dumpDb);
  await client.connect();

  // -- DELETE ALL DATA --
  await prisma.internalNote.deleteMany();
  await prisma.matter.deleteMany();
  await prisma.matterStatus.deleteMany();
  await prisma.emailAddress.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  function createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];

    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }

    return batches;
  }

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

      const newUser = await tx.user.create({
        data: {
          username: user.windowslogin,
          email: user.email,
          role: user.userTypeID === 1 ? 'USER' : 'ADMIN',
          firstName: user.EmployeeFirstName ?? user.windowslogin,
          lastName: user.EmployeeLastName ?? user.windowslogin,
          abbreviation: user.threeLetterAbbreviation.toUpperCase(),
        },
      });
      userIdMap[user.userid] = newUser.id;
    }
    return;
  });

  // CLIENTS

  const dumpClients = (await client.query('SELECT * from "tblClient"')).rows;

  await prisma.$transaction(async (tx) => {
    for (const client of dumpClients) {
      if (!client.txtClientName) continue;

      const newClient = await tx.client.create({
        data: {
          name: client.txtClientName,
          suffix: client.nameWithSuffixes
            ? client.nameWithSuffixes.replace(client.txtClientName, '')
            : undefined,
          type: client.clientType === 1 ? 'ASSOCIATION' : 'NON_ASSOCIATION',
          deletedAt: !client.active ? new Date() : undefined,
        },
      });

      clientIdMap[client.idnClient] = newClient.id;
    }
    return;
  });

  // Emails

  const dumpEmails = (await client.query('SELECT * from "tblEmailAddresses"'))
    .rows;

  await prisma.$transaction(async (tx) => {
    for (const email of dumpEmails) {
      if (!email.membername || !email.memberemail) continue;

      await tx.emailAddress.create({
        data: {
          clientId: clientIdMap[email.clientid],
          memberName: email.membername,
          email: email.memberemail,
          shouldSendReport: email.sendreport,
        },
      });
    }
    return;
  });

  // MatterStatus

  const dumpStatuses = (await client.query('SELECT * from "tblStatus"')).rows;

  await prisma.$transaction(async (tx) => {
    for (const status of dumpStatuses) {
      const newStatus = await tx.matterStatus.create({
        data: {
          status: status.status,
        },
      });
      statusIdMap[status.statusID] = newStatus.id;
    }
    return;
  });

  // Matters

  const dumpMatters = (await client.query('SELECT * from "tblMatters"')).rows;

  await prisma.$transaction(async (tx) => {
    for (const matter of dumpMatters) {
      if (!clientIdMap[matter.clientid]) continue;
      const newMatter = await tx.matter.create({
        data: {
          client: { connect: { id: clientIdMap[matter.clientid] } },
          status: { connect: { id: statusIdMap[matter.statusid] } },
          project: matter.project,
          fileNumber: matter.fileNumber,
          closedAt: matter.wasDeleted ? new Date() : undefined,
          deletedAt: matter.dateClosed,
          needsWrittenConfirmation: matter.writtenConfirmationRequired,
          confirmedAt: matter.dateWrittenConfirmationReceived,
        },
      });
      matterIdMap[matter.mattersid] = newMatter.id;
    }
    return;
  });

  // Internal Notes
  const dumpInternalNotes = (
    await client.query('SELECT * from "tblGeneralMattersInternalNotes"')
  ).rows
    .filter((note) => {
      const hasUser = userIdMap[note.addedbyuserid];
      const hasMatter = matterIdMap[note.generalmattersid];

      return hasUser && hasMatter;
    })
    .map((note) => {
      return {
        addedBy: userIdMap[note.addedbyuserid],
        matterId: matterIdMap[note.generalmattersid],
        note: note.Note,
        deletedAt: !note.isActive ? new Date() : undefined,
      };
    });

  const batches = createBatches(dumpInternalNotes, 100);

  await prisma.$transaction(async (tx) => {
    for (const batch of batches) {
      await tx.internalNote.createMany({ data: batch });
    }
  });
}

runEtl().then((_) => process.exit());
