import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { format } from "date-fns";


export function calculateAge(born?: string, died?: string): string {
  if (!born) return "-";
  
  const birthDate = new Date(born);
  const endDate = died ? new Date(died) : new Date();
  
  // Handle invalid dates
  if (isNaN(birthDate.getTime())) return "-";
  if (died && isNaN(endDate.getTime())) return "-";
  
  let years = endDate.getFullYear() - birthDate.getFullYear();
  let months = endDate.getMonth() - birthDate.getMonth();
  let days = endDate.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (died) {
    return `${years}y ${months}m `;
  }
  return `${years}y ${months}m`;
}


export function formatDisplayDate(date?: string): string {
  if (!date) return "-";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "-" : format(d, "MMM d, yyyy");
}