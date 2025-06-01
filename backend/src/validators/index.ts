import {z} from 'zod';

export const imageSchema = z.object({
    id:z.string(),
    geometry: z.object({
        type:z.literal('Polygon'),
        coordinates: z.array(z.array(z.tuple([z.number(), z.number()])))
    })
})