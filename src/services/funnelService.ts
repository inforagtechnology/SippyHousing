
import { supabase } from "@/lib/supabase";

export const getFunnelSetting = async (): Promise<boolean> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("lead_funnel_enabled")
    .single();

  if (error) {
    console.error(error);
    return true; // default enabled
  }

  return data?.lead_funnel_enabled ?? true;
};

export const updateFunnelSetting = async (
  enabled: boolean
): Promise<boolean> => {
  const { error } = await supabase
    .from("site_settings")
    .update({
      lead_funnel_enabled: enabled,
    })
    .eq("id", 1);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};