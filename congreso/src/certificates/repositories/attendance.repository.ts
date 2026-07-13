import { adminClient } from "@/utils/supabase/admin";
import { Database } from "@/types/database.types";

export type Attendance =
  Database["public"]["Tables"]["attendances"]["Row"];

export class AttendanceRepository {
  async findByDocumentAndEvent(
    document: string,
    eventId: string
  ): Promise<Attendance | null> {
    const { data, error } = await adminClient
      .from("attendances")
      .select("*")
      .eq("document", document)
      .eq("event_id", eventId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const attendanceRepository = new AttendanceRepository();