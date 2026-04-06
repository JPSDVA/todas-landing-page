import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { count } = await supabase.from('waitlist').select('*', { count: 'exact', head: true });
  return NextResponse.json({ ok: true, waitlist: count ?? 0 });
}
