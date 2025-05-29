// controllers/csvController.js
import fs from "fs";
import csv from "csv-parser";
import CompetenciesModel from "../models/competenciesModel.js";

function processCsvData(csvRows, subjectType, competencyType) {
  let result = [];
  let currentSubject = null;

  csvRows.forEach(row => {
    const c1 = row['Column1'] ? row['Column1'].trim() : '';
    const c2 = row['Column2'] ? row['Column2'].trim() : '';
    const c3 = row['Column3'] ? row['Column3'].trim() : '';

    if (c1 && c1.toUpperCase().includes("COMPETÈNCIES")) {
      return;
    }

    if (c1) {
      currentSubject = {
        materia: c1,
        type: subjectType,
        Competencies: []
      };
      result.push(currentSubject);
      return;
    }

    if (currentSubject) {
      if (c2) {
        let newCompetency = {
          descripcio: c2,
          type: competencyType,
          Criteris: []
        };
        if (c3) {
          newCompetency.Criteris.push(c3);
        }
        currentSubject.Competencies.push(newCompetency);
      } else if (!c2 && c3) {
        if (currentSubject.Competencies.length > 0) {
          let lastCompetency = currentSubject.Competencies[currentSubject.Competencies.length - 1];
          lastCompetency.Criteris.push(c3);
        }
      }
    }
  });
  return result;
}

async function uploadCsv(req, res, next) {
  if (!req.file) {
    const err = new Error('No s\'ha enviat cap fitxer');
    err.status = 400;
    return next(err);
  }

  const subjectType = req.body.Type || 'específica';
  const competencyType = req.body.Competencie || 'competència';
  const templateName = req.body.templateName || '';

  const filePath = req.file.path;
  let csvRows = [];

  fs.createReadStream(filePath)
    .pipe(csv({ headers: ['Column1', 'Column2', 'Column3'], skipLines: 0 }))
    .on('data', (row) => {
      csvRows.push(row);
    })
    .on('end', async () => {
      try {
        const jsonData = processCsvData(csvRows, subjectType, competencyType);
        await CompetenciesModel.insertData(jsonData, templateName);
        res.status(200).json({ message: 'Dades importades correctament', data: jsonData });
      } catch (error) {
        next(error);
      } finally {
        fs.unlinkSync(filePath);
      }
    });
}

export {
  uploadCsv,
};

export default { uploadCsv };