import { supabase } from "@/lib/supabase";

export const getWebsiteSettings = async () => {
  return await supabase
    .from("website_settings")
    .select("*")
    .eq("id", 1)
    .single();
};

export const updateWebsiteSettings = async (data: any) => {
  return await supabase
    .from("website_settings")
    .update(data)
    .eq("id", 1);
};