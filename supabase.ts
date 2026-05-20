import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://byvmfjafuceudavevrpc.supabase.co/rest/v1/";

const supabaseKey =
  "sb_publishable_nuOJBRVoh36eoNP4_EQ4BA_BDo34ud0";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);