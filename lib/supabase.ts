import { createClient } from "@supabase/supabase-js";

// 견적서/품목 캐시 조회용 공개 클라이언트. 관리용(SUPABASE_SERVICE_ROLE_KEY) 클라이언트는
// 캐시 갱신 로직을 구현하는 Task 009에서 별도 함수로 분리한다.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
