// assets/js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ⬇️ PUT YOUR REAL VALUES HERE (from Supabase Settings → API)
const supabaseUrl = "https://rnfhcedcwimzrkdwnunq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZmhjZWRjd2ltenJrZHdudW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMTY5NTIsImV4cCI6MjA4MDg5Mjk1Mn0.6GktsmRGAAxf0DB_1Dyj5rZilKJ2iBRHk6dKV-O8ddk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("getUser error:", error);
    return null;
  }
  return data.user;
}
