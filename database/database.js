import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://irqplmkfkyawozeafpao.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycXBsbWtma3lhd296ZWFmcGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTI5NjIsImV4cCI6MjA0OTQyODk2Mn0.RwfwQcEtDPWtCBUfq32XJkgrt9ADz7acrxT6hjBuT_E";
const supabase = createClient(supabaseUrl, supabaseKey);

