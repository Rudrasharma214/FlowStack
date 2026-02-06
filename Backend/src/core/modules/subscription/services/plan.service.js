import { STATUS } from "../../../constants/statusCodes.js";
import { Op } from "sequelize";
import Plan from "../models/plan.model.js";
import { PlanRepository } from "../repositories/plan.repositories.js";

const planRepository = new PlanRepository();

export class PlanService {
    /* Get Active Plans */
    async getActivePlans(search) {
        try {
            let whereClause = {};

            if (search) {
                whereClause = {
                    ...whereClause,
                    name: { [Op.like]: `%${search}%` }
                };
            }

            const plans = await planRepository.getActivePlans(whereClause);

            if (!plans) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "No plans found",
                    errors: null
                };
            }

            return {
                success: true,
                message: "Plans retrieved successfully",
                data: plans
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while retrieving plans",
                errors: error.message
            }
        }
    }

    /* Get All Plans for Admin */
    async getAllPlans(search) {
        try {
            let whereClause = {};

            if (search) {
                whereClause = {
                    ...whereClause,
                    name: { [Op.like]: `%${search}%` }
                };
            }

            const plans = await planRepository.getAllPlans(whereClause);

            if (!plans) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "No plans found",
                    errors: null
                };
            }

            return {
                success: true,
                message: "Plans retrieved successfully",
                data: plans
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while retrieving plans",
                errors: error.message
            }
        }
    };

    /* Create Plan */
    async createPlan(planData) {
        try {
            const newPlan = await planRepository.createPlan(planData);

            return {
                success: true,
                message: "Plan created successfully",
                data: newPlan
            };

        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while creating the plan",
                errors: error.message
            }
        }
    };

    /* Update Plan */
    async updatePlan(id, planData) {
        try {
            const plan = await planRepository.findById(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await planRepository.updatePlan(id, planData);

            return {
                success: true,
                message: "Plan updated successfully",
                data: plan
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while updating the plan",
                errors: error.message
            }
        }
    };

    /* Delete Plan */
    async deletePlan(id) {
        try {
            const plan = await planRepository.findById(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await planRepository.deletePlan(id);

            return {
                success: true,
                message: "Plan deleted successfully",
                data: plan
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while deleting the plan",
                errors: error.message
            }
        }
    };
}