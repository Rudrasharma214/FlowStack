import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";

export class PlanController {
    constructor(planService) {
        this.planService = planService;
        this.getAllPlans = this.getAllPlans.bind(this);
        this.createPlan = this.createPlan.bind(this);
        this.updatePlan = this.updatePlan.bind(this);
        this.deactivatePlan = this.deactivatePlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
    }

    /* Get All Plans */
    async getAllPlans(req, res, next) {
        try {
            const { search } = req.query;

            const plans = await this.planService.getAllPlans(search);

            if(!plans.success) {
                return sendErrorResponse(res, plans.statusCode, plans.message, plans.errors);
            }

            sendResponse(res, STATUS.OK, "Plans retrieved successfully", plans.data);
        } catch (error) {
            next(error);
        }
    };

    /* Create Plan */
    async createPlan(req, res, next) {
        try {
            const planData = req.body;

            const newPlan = await this.planService.createPlan(planData);

            if(!newPlan.success) {
                return sendErrorResponse(res, newPlan.statusCode, newPlan.message, newPlan.errors);
            }

            sendResponse(res, STATUS.CREATED, "Plan created successfully", newPlan.data);
        } catch (error) {
            next(error);
        }
    };

    /* Update Plan */
    async updatePlan(req, res, next) {
        try {
            const { id } = req.params;
            const planData = req.body;

            if(!id) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Plan ID is required", null);
            }

            const updatedPlan = await this.planService.updatePlan(id, planData);

            if(!updatedPlan.success) {
                return sendErrorResponse(res, updatedPlan.statusCode, updatedPlan.message, updatedPlan.errors);
            }

            sendResponse(res, STATUS.OK, "Plan updated successfully", updatedPlan.data);
        } catch (error) {
            next(error);
        }
    };

    /* Deactivate Plan */
    async deactivatePlan(req, res, next) {
        try {
            const { id } = req.params;
            if(!id) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Plan ID is required", null);
            }

            const deactivatedPlan = await this.planService.deactivatePlan(id);

            if(!deactivatedPlan.success) {
                return sendErrorResponse(res, deactivatedPlan.statusCode, deactivatedPlan.message, deactivatedPlan.errors);
            }

            sendResponse(res, STATUS.OK, "Plan deactivated successfully", deactivatedPlan.data);
        } catch (error) {
            next(error);
        }
    };

    /* Delete Plan */
    async deletePlan(req, res, next) {
        try {
            const { id } = req.params;
            if(!id) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Plan ID is required", null);
            }

            const deletedPlan = await this.planService.deletePlan(id);

            if(!deletedPlan.success) {
                return sendErrorResponse(res, deletedPlan.statusCode, deletedPlan.message, deletedPlan.errors);
            }

            sendResponse(res, STATUS.OK, "Plan deactivated successfully", deletedPlan.data);
        } catch (error) {
            next(error);
        }
    };
};