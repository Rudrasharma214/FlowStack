import Plan from '../models/plan.model.js';

export class PlanRepository {
    /* Create Plan */
    async createPlan({
        name,
        description,
        monthly_price,
        yearly_price,
        transaction = null
    }) {
        return await Plan.create(
            {
                name,
                description,
                monthly_price,
                yearly_price,
                is_active: true
            },
            { transaction }
        );
    }

    /* Get plans (active / all / filtered) */
    async getPlans({ where = {}, is_active = false, transaction = null } = {}) {
        const finalWhere = {
            ...where,
            ...(is_active ? { is_active: true } : {})
        };

        return await Plan.findAll({
            where: finalWhere,
            transaction
        });
    }

    /* Find Plan by ID */
    async findById(planId, transaction = null) {
        return await Plan.findOne({
            where: { id: planId },
            transaction
        });
    }

    /* Update Plan */
    async updatePlan(planId, payload, transaction = null) {
        const updateData = Object.fromEntries(
            Object.entries(payload).filter(([_, value]) => value !== undefined)
        );

        if (Object.keys(updateData).length === 0) {
            return [0];
        }

        return await Plan.update(updateData, {
            where: { id: planId },
            transaction
        });
    }

    /* Delete Plan */
    async deletePlan(planId, transaction = null) {
        return await Plan.destroy({
            where: { id: planId },
            transaction
        });
    }
}
