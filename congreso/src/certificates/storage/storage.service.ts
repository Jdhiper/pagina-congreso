import { adminClient } from "@/utils/supabase/admin";

export class StorageService {

  private readonly bucket = "certificates";

  async upload(
    path: string,
    pdf: Buffer
  ): Promise<string> {

    const { error } = await adminClient.storage
      .from(this.bucket)
      .upload(path, pdf, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    return path;
  }

  async createSignedUrl(path: string, expiresInSeconds = 300): Promise<string> {
    const { data, error } = await adminClient.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresInSeconds);

    if (error) throw error;
    return data.signedUrl;
  }

}

export const storageService = new StorageService();
