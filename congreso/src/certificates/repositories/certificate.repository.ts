import { adminClient } from "@/utils/supabase/admin";
import { Database } from "@/types/database.types";

export type Certificate =
  Database["public"]["Tables"]["certificates"]["Row"];

export class CertificateRepository {

  async findByDocumentAndEvent(
    document: string,
    eventId: string
  ): Promise<Certificate | null> {

    const { data, error } = await adminClient
      .from("certificates")
      .select("*")
      .eq("document", document)
      .eq("event_id", eventId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async create(
    certificate: Database["public"]["Tables"]["certificates"]["Insert"]
  ): Promise<Certificate> {

    const { data, error } = await adminClient
      .from("certificates")
      .insert(certificate)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async incrementDownloads(
    id: string,
    currentDownloads: number
  ): Promise<void> {

    const { error } = await adminClient
      .from("certificates")
      .update({
        download_count: currentDownloads + 1,
        downloaded_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

}

export const certificateRepository =
  new CertificateRepository();