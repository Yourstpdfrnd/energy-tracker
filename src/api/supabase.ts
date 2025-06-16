import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gkujoofdzwehlsqmjuqu.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdWpvb2ZkendlaGxzcW1qdXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTMzNzIsImV4cCI6MjA2NTA4OTM3Mn0.bpA3qOJLwU_gGaOb64jipWsOTAywGoz0BtqcXedjLQE'           

export const supabase = createClient(supabaseUrl, supabaseKey)