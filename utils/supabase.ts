import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://kjrbxotzfgsnwakupgas.supabase.co"
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcmJ4b3R6Zmdzbndha3VwZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NDg5NzIsImV4cCI6MjAzNjUyNDk3Mn0.feAaTMxDaSN_lb8JxSikZ2dFcpMgisP8EEtaHwoJYmA"

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
