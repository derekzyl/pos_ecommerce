import axios, { AxiosInstance } from "axios";

export class DHLService {
  key: string;
  instance: AxiosInstance;
  constructor(key?: string) {
    this.key = key ?? process.env.DHL_API_KEY!;
    this.instance = this.axiosInstance();
  }

  axiosInstance() {
    const instance = axios.create({
      baseURL: "https://api-eu.dhl.com",
      timeout: 5000,
      headers: {
        "DHL-API-KEY": `${this.key}`,
        "Content-Type": "application/json",
      },
    });
    console.log(instance, "instance created");
    return instance;
  }

  async trackWithId(tracking_id: string) {
    const get_track = await this.instance.get(
      `/track/shipments?${tracking_id}`
    );
    return get_track;
  }
}
