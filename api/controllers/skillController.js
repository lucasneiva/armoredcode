import Skill from "../models/skillModel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getSkills = async ( req, res, next ) => {
    try {
        const skills = await Skill.find();

        return next( CreateSuccess( 200, "All Skills", skills ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );

    }
};

export const getSkillById = async ( req, res, next ) => {
    try {
        const skill = await Skill.findById( req.params.id );

        if ( !skill ) return next( CreateError( 404, "Skill not found!" ) );

        return next( CreateSuccess( 200, "Skill Data", skill ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );

    }
};

export const createSkill = async (req, res, next) => {
    try {
        const newSkillData = req.body;

        // Perform data validation here using Joi or another validation library
        // ...

        const newSkill = new Skill(newSkillData);
        await newSkill.save();

        return next(CreateSuccess(201, "Skill Created!", newSkill));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
};