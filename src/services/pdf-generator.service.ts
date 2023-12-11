import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit-table';

@Injectable()
export class PdfGenerationService {
  async testGen(): Promise<void> {
    // init document
    const marginLeft = 25;
    const marginTop = 60;
    const marginRight = 65;
    const doc = new (PDFDocument as any)({
      margin: marginLeft,
      size: [792.14, 612.16],
    });
    // save document
    doc.pipe(createWriteStream('./util/pdfs/document.pdf'));

    // ------- HEADER -------------
    doc.font('Times-Bold').fontSize(10).text('Ansbacher Law', 0, marginTop, {
      align: 'center',
    });

    doc
      .font('Times-Bold')
      .fontSize(10)
      .text(
        'Legal Request Report for JULINGTON CREEK PLANTATION',
        0,
        marginTop + 15,
        {
          align: 'center',
        },
      );

    doc
      .font('Times-Bold')
      .fontSize(10)
      .text('11/17/2023', 0, marginTop + 30, {
        align: 'center',
      });

    const table = {
      headers: [
        {
          label: 'Project',
          property: 'project',
          width: 227,
          renderer: null,
          headerColor: 'white',
        },
        {
          label: 'File no.',
          property: 'file-num',
          width: 76,
          renderer: null,
          headerColor: 'white',
        },
        {
          label: 'Comments',
          property: 'comments',
          width: 306,
          renderer: null,
          headerColor: 'white',
        },
        {
          label: 'Status',
          property: 'status',
          width: 81,
          renderer: null,
          headerColor: 'white',
        },
      ],
      datas: [
        {
          project:
            'Assist with covenant enforcement violation at 703 Canna Court regarding missing shingles.',
          'file-num': '070200-388',
          comments: `10.18.23 Property remains in violation for failure to prune trees per Dawne Wilbanks.
        11.7.23 Acknowledgment sent for new violation of weeds in turf at property.
        11.10.23 First attorney demand sent to owners for weeds in turf. 11.15.23 CMRR for November 10, 2023 demand signed by trustee owners.
        File is also in collections.`,
          status: 'Active',
          options: {
            fontSize: 30,
            separation: true,
          },
        },
      ],

      rows: [
        [
          'Assist with covenant enforcement violation at 703 Canna Court regarding missing shingles.',
          '070200-388',
          `10.18.23 Property remains in violation for failure to prune trees per Dawne Wilbanks.
      11.7.23 Acknowledgment sent for new violation of weeds in turf at property.
      11.10.23 First attorney demand sent to owners for weeds in turf. 11.15.23 CMRR for November 10, 2023 demand signed by trustee owners.
      File is also in collections.`,
          'Active',
        ],
        [
          'Assist with covenant enforcement violation at 703 Canna Court regarding missing shingles.',
          '070200-388',
          `10.18.23 Property remains in violation for failure to prune trees per Dawne Wilbanks.
      11.7.23 Acknowledgment sent for new violation of weeds in turf at property.
      11.10.23 First attorney demand sent to owners for weeds in turf. 11.15.23 CMRR for November 10, 2023 demand signed by trustee owners.
      File is also in collections.`,
          'Active',
        ],
      ],
    };

    // TABLE
    await doc.table(table, {
      width: doc.page.width - (marginLeft + marginRight),
      // prepareHeader: () => {
      //   doc.font('Courier-Bold').fontSize(9);
      // },
      // prepareRow: () => {
      //   doc.font('./util/fonts/solitas-normal-book.otf');
      // },
      divider: {
        header: { disabled: true },
        horizontal: { disabled: false, width: 3, opacity: 1 },
      },
      y: 120,
    });

    // done!
    doc.end();
    console.log('test test test');
  }
}

// doc.page.margins.bottom = 0;
// doc.text('Page 1', 0.5 * (doc.page.width - 100), doc.page.height - 50, {
//   width: 100,
//   align: 'center',
//   lineBreak: false,
// });

// let pageNumber = 1;
// doc.on('pageAdded', () => {
//   pageNumber++;
//   const bottom = doc.page.margins.bottom;
//   doc.page.margins.bottom = 0;

//   doc.text(
//     'Pág. ' + pageNumber,
//     0.5 * (doc.page.width - 100),
//     doc.page.height - 50,
//     {
//       width: 100,
//       align: 'center',
//       lineBreak: false,
//     },
//   );

//   // Reset text writer position
//   doc.text('', 50, 50);
//   doc.page.margins.bottom = bottom;
// });
