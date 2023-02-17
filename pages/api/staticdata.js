import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const csvDirectory = path.join(process.cwd(), 'csv');
  const fileContents = await fs.readFile(csvDirectory + '/CB-Org-Data-V1.csv', 'utf8');
  res.status(200).send(fileContents);
}