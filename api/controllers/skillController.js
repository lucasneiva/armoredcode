import Skill from "../models/skillModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const getSkills = async ( req, res, next ) => {
    try {
        const skills = await Skill.find();

        return next( createSuccess( 200, "All Skills", skills ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );

    }
};

export const getSkillById = async ( req, res, next ) => {
    try {
        const skill = await Skill.findById( req.params.id );

        if ( !skill ) return next( createError( 404, "Skill not found!" ) );

        return next( createSuccess( 200, "Skill Data", skill ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );

    }
};

export const createSkill = async (req, res, next) => {
    try {
        const newSkillData = req.body;

        // Perform data validation here using Joi or another validation library
        // ...

        const newSkill = new Skill(newSkillData);
        await newSkill.save();

        return next(createSuccess(201, "Skill Created!", newSkill));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};