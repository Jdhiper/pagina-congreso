import { adminClient } from "@/utils/supabase/admin";
import { Database } from "@/types/database.types";

export type Registration =
  Database["public"]["Tables"]["registrations"]["Row"];

export class RegistrationRepository {
  async findByDocumentAndEvent(
    document: string,
    eventId: string
  ): Promise<Registration | null> {
    const { data, error } = await adminClient
      .from("registrations")
      .select("*")
      .eq("document", document)
      .eq("event_id", eventId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
}

export const registrationRepository = new RegistrationRepository();
