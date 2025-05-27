import { Enums } from "@/types/database.types";

export const getDayOfWeekText = (day: Enums<"day_of_week">) => {
  switch (day) {
    case "Monday":
      return "Lundi";
    case "Tuesday":
      return "Mardi";
    case "Wednesday":
      return "Mercredi";
    case "Thursday":
      return "Jeudi";
    case "Friday":
      return "Vendredi";
    case "Saturday":
      return "Samedi";
    case "Sunday":
      return "Dimanche";
  }
};
