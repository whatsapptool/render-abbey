import { z } from 'zod';

// Schema untuk data pemain bola
export const rawDataSchema = z.object({
  // rank: z.number(), // Bisa kosong
  name: z.string().optional(),
  date: z.string(),
  full_name: z.string().optional(),
  heros: z.array(z.string()).optional(),
  image: z.string().optional(),
  nation: z.string().optional(),
  nation_code: z.string().optional(),
  team: z.string().optional(),
  date_of_birth: z.string().optional(),
  roles: z.array(z.string()).optional(),
  description: z.string().optional(),
  league: z.string().optional(),
  logo_league: z.string().optional(),
  tier: z.string().optional(),
  followers_count: z.number().optional(),
  views_count: z.number().optional(),
  video_count: z.number().optional(),
  category: z.string().optional(),
});

// Type yang dihasilkan dari schema
export type rawData = z.infer<typeof rawDataSchema>;

// Schema untuk array data pemain bola
export const rawDatasSchema = z.array(rawDataSchema);

// Fungsi untuk memvalidasi data dengan debugging
export const validateRawDatas = (data: unknown) => {
  try {
    console.log("Validating data:", data);
    const validatedData = rawDatasSchema.parse(data);
    console.log("Validation successful:", validatedData);
    return validatedData;
  } catch (error) {
    console.error("Validation error:", error);
    throw error;
  }
};