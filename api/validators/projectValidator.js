// projectValidator.js
import { generateValidator } from './validatorGenerator.js';
import Project from '../models/projectModel.js';

const projectJoiSchema = generateValidator( Project.schema );

export default projectJoiSchema;
