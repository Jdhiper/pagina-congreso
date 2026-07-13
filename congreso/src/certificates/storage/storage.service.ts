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

  getPublicUrl(path: string): string {

    const { data } = adminClient.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

}

export const storageService = new StorageService();