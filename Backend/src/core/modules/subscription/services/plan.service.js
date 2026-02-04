import { STATUS } from "../../../constants/statusCodes.js";
import Plan from "../models/plan.model.js";


export class PlanService {
    /* Get All Plans */
    async getAllPlans(search) {
        try {
            let whereClause = {
                is_active: true
            };

            if (search) {
                whereClause = {
                    name: { $like: `%${search}%` }
                };
            }

            const plans = await Plan.findAll({ where: whereClause });

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

    /* Create Plan */
    async createPlan(planData) {
        try {
            if (!planData.name || !planData.montly_price || !planData.yearly_price) {
                return {
                    success: false,
                    statusCode: STATUS.BAD_REQUEST,
                    message: "Missing required fields",
                    errors: null
                };
            }

            const newPlan = await Plan.create(planData);

            return {
                success: true,
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
            const plan = await Plan.findByPk(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await plan.update(planData);

            return {
                success: true,
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

    /* Deactivate Plan */
    async deactivatePlan(id) {
        try {
            const plan = await Plan.findByPk(id);
            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            plan.is_active = false;
            await plan.save();

            return {
                success: true,
                data: plan
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while deactivating the plan",
                errors: error.message
            }
        }
    };

    /* Delete Plan */
    async deletePlan(id) {
        try {
            const plan = await Plan.findByPk(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await plan.destroy({ force: false });

            return {
                success: true,
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