import fs from 'fs';
import PdfPrinter from 'pdfmake';

const tasks = [
  { name: "Task A", desc: "Description of Task A"},
  { name: "Task B", desc: "Description of Task B"},
  {
    name: "Task C",
    desc: "Description of Task C",
    subTasks: [
      "Sub Task 1 of Task C",
      "Sub Task 2 of Task C",
      "Sub Task 3 of Task C"
    ],
  }
];

function genDynamicUlContent(tasks) {
  let content = { ul: [] };

  tasks.forEach((task) => {
    let taskContent = {
      stack: [
        { text: task.name, bold: true, marginTop: 5 },
	{ text: task.desc, marginBotton: 2 }
      ]
    }

    if (typeof task.subTasks === 'undefined') {
      // No sub tasks.
      //console.log('subTasks not defined');
    } else {
      // Show sub tasks using ordered list.
      let subTaskContent = { ol: [] };

      task.subTasks.forEach((item) => {
        subTaskContent.ol.push({ text: item });
      });

      // Append sub tasks to task content.
      taskContent.stack.push(subTaskContent);
    }

    content.ul.push(taskContent);
  });

  return content;
}

let docDefination = {
  'content': [
    { text: 'My Tasks', fontSize: 18, bold: true, alignment: "center" },
    genDynamicUlContent(tasks)
  ],
  defaultStyle: {
    fontSize: 12,
  }
}

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

let printer = new PdfPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(docDefination, {});
pdfDoc.pipe(fs.createWriteStream('test.pdf'));
pdfDoc.end();
