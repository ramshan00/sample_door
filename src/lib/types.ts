export type Profile = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  university: string;
  city: string;
  budget_PKR: number;
  cleanliness: "Tidy" | "Average" | "Messy";
  sleep_schedule: "Early bird" | "Night owl" | "Flexible";
  study_habits: "In-person classes" | "Online classes" | "Group studies" | "Quiet study";
  food_pref: "Cooks at home" | "Eats out" | "Flexible";
  contact_number: string;
  avatar: string;
  raw_profile_text?: string;
};

export type Listing = {
  listing_id: string;
  city: string;
  area: string;
  monthly_rent_PKR: number;
  rooms_available: number;
  amenities: string[];
  image_url: string;
  description: string;
};
