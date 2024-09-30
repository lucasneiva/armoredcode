import Proposal from "../models/proposalModel.js";
import { createError } from "../utils/error.js";
import { handleValidationError } from "../utils/handleValidationError.js";
import { createSuccess } from "../utils/success.js";

// export const createProposal = async (req, res, next) => {
//     try {
//         // Assuming you have middleware to verify the token and add the user to req
//         const freelancerId = req.user.id; 

//         const newProposalData = req.body;
//         newProposalData.freelancerId = freelancerId; // Add freelancerId to the data

//         // Perform data validation here

//         const newProposal = new Proposal(newProposalData);
//         await newProposal.save();

//         return next(createSuccess(201, "Proposal Created!", newProposal));
//     } catch (error) {
        
//         return handleValidationError(error, next);
//     }
// };

export const createProposal = async (req, res, next) => {
    try {
        // Assuming you have middleware to verify the token and add the user to req
        const freelancerId = req.user.id; 

        const newProposalData = req.body;
        newProposalData.freelancerId = freelancerId; // Add freelancerId to the data

        // Perform data validation here

        const newProposal = new Proposal(newProposalData);
        await newProposal.save();

        return next(createSuccess(201, "Proposal Created!", newProposal));
    } catch (error) {
        
        return handleValidationError(error, next);
    }
};

export const getProposalsByProjectId = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const proposals = await Proposal.find({ projectId: projectId });

        return next(createSuccess(200, "Proposals for Project", proposals));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const getProposalById = async (req, res, next) => {
    try {
        const proposalId = req.params.id;

        const proposal = await Proposal.findById(proposalId);

        if (!proposal) {
            return next(createError(404, "Proposal not found!"));
        }

        return next(createSuccess(200, "Proposal Data", proposal));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const updateProposal = async (req, res, next) => {
    try {
        const proposalId = req.params.id;
        const updateData = req.body;

        const updatedProposal = await Proposal.findByIdAndUpdate(
            proposalId,
            updateData,
            { new: true }
        );

        if (!updatedProposal) {
            return next(createError(404, "Proposal not found!"));
        }

        return next(createSuccess(200, "Proposal updated successfully!", updatedProposal));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const deleteProposal = async (req, res, next) => {
    try {
        const proposalId = req.params.id;

        const deletedProposal = await Proposal.findByIdAndDelete(proposalId);

        if (!deletedProposal) {
            return next(createError(404, "Proposal not found!"));
        }

        return next(createSuccess(200, "Proposal deleted successfully!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const getFreelancerProposals = async (req, res, next) => {
    try {
        const freelancerId = req.params.freelancerId;

        const proposals = await Proposal.find({ freelancerId: freelancerId }); // Assuming you have a freelancerId field in your Proposal model

        return next(createSuccess(200, "Freelancer's Proposals", proposals));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};
