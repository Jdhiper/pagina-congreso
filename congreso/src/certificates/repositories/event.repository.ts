import { adminClient } from "@/utils/supabase/admin";
import { Database } from "@/types/database.types";

export type Event =
  Database["public"]["Tables"]["Events"]["Row"];

export class EventRepository {
  async findById(eventId: string): Promise<Event | null> {
    const { data, error } = await adminClient
      .from("Events")
      .select("*")
      .eq("id", eventId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const eventRepository = new EventRepository();