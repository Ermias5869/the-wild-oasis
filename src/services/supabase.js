import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://iscajfnnccvgsoytflig.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY2FqZm5uY2N2Z3NveXRmbGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyODMzMDYsImV4cCI6MjA0Nzg1OTMwNn0.lfdrNQQT2TMyvqqxQCXm_KN1N-xys7Fsb5AQgB36-eU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
