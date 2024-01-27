import z from 'zod';

export const CreateAttributionInput = z.object({
  attribution_id: z.string().uuid().optional(),
  gender: z.enum(['MALE', 'FEMALE']),
  age: z.enum(['18-24', '25-34', '35-44', '45+']),
});

export type CreateAttributionInputType = z.infer<typeof CreateAttributionInput>;

export const UpdateAttributionInput = z.object({
  attribution_id: z.string().uuid().optional(),
  properties: z.object({
    income_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    is_married: z.boolean().optional(),
    number_of_dependants: z.number().int().min(0).max(10).optional(),
    health_status: z.enum(["BAD", "GOOD", "EXCELLENT"]).optional(),
    financial_goals: z.enum(["DEBT_PAYMENT", "CHILDREN_EDUCATION", "MORTGAGE_PROTECTION", "INCOME_REPLACEMENT"]).optional(),
    debt_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    last_injurance_time: z.enum(["THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "MORE_THAN_A_YEAR"]).optional(),
    assets: z.enum(["INVESTMENT", "SAVINGS", "PROPERTY", "BUSINESS", "OTHER"]).optional(),
  }),
});

export type UpdateAttributionInputType = z.infer<typeof UpdateAttributionInput>;