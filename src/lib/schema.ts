import { z } from "zod";

export const characterSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
    
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required"
  }),
  
  born: z.string()
    .datetime({ message: "Invalid date-time format" })
    ,
    
  died: z.string()
    .datetime({ message: "Invalid date-time format" })
    .optional(),
    
  allegiances: z.array(z.string().min(1))
    .min(1, "At least one allegiance is required"),
    
  aliases: z.array(z.string().min(1))
    .optional()
}).refine(data => {
  if (data.died && data.born) {
    return new Date(data.died) >= new Date(data.born);
  }
  return true;
}, {
  message: "Death date must be after birth date",
  path: ["died"]
});
export type Character = z.infer<typeof characterSchema>;