import Proposal from "../models/proposalModel.js";
import { createError } from "../utils/error.js";
import { handleValidationError } from "../utils/handleValidationError.js";
import { createSuccess } from "../utils/success.js";
import Project from "../models/projectModel.js";
import ChatChannel from "../models/chatChannelModel.js";

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

export const sendProposal = async (req, res, next) => {
    try {
        const proposalId = req.params.id;

        const proposal = await Proposal.findById(proposalId);

        if (!proposal) {
            return next(createError(404, "Proposal not found!"));
        }

        // Check if the proposal is in DRAFT status
        if (proposal.status !== 'DRAFT') {
            return next(createError(400, "Proposal is not in DRAFT status and cannot be sent."));
        }

        proposal.status = 'PENDING';
        await proposal.save();

        return next(createSuccess(200, "Proposal sent successfully!", proposal));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const acceptProposal = async (req, res, next) => {
    try {
        const proposalId = req.params.id;

        // 1. Find the Proposal
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return next(createError(404, "Proposal not found!"));
        }

        // 2. Update Proposal Status
        proposal.status = 'ACCEPTED';
        await proposal.save();

        // 3. Create Chat Channel
        const newChatChannel = new ChatChannel({
            projectId: proposal.projectId,
            freelancerId: proposal.freelancerId,
            clientId: proposal.clientId
        });

        const savedChatChannel = await newChatChannel.save();

        // 4. Update Project with Chat Channel ID
        await Project.findByIdAndUpdate(
            proposal.projectId,
            {
                chatChannelId: savedChatChannel._id,
                freelancerId: proposal.freelancerId,
                startDate: Date.now(), // Set startDate to the current date and time
                projectStatus: 'IN-PROGRESS' // Update the project status to 'IN-PROGRESS'
            }
        );

        return next(createSuccess(200, "Proposal accepted successfully! Chat channel created.", {
            proposal: proposal,
            chatChannel: savedChatChannel
        }));

    } catch (error) {
        console.error("Error accepting proposal:", error);
        return next(createError(500, "Internal Server Error!"));
    }
};

export const rejectProposal = async (req, res, next) => {
    try {
        const proposalId = req.params.id;
        const { rejectionReason } = req.body;

        const updatedProposal = await Proposal.findByIdAndUpdate(
            proposalId,
            {
                status: 'REJECTED',
                rejectionReason: rejectionReason // Add rejectionReason to the update
            },
            { new: true }
        );

        if (!updatedProposal) {
            return next(createError(404, "Proposal not found!"));
        }

        return next(createSuccess(200, "Proposal rejected successfully!", updatedProposal));
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
