import axios, { AxiosInstance } from "axios";
import * as dotenv from "dotenv";
import { PaystackPayI } from "../interface_utilities/payment.interface";
import { createHmac } from "crypto";
dotenv.config();
export class Paystack {
  key: string;
  instance: AxiosInstance;
  constructor(key?: string) {
    this.key = key ?? process.env.PAYSTACK_TEST_SECRET!;
    this.instance = this.axiosInstance();
  }

  axiosInstance() {
    const instance = axios.create({
      baseURL: "https://api.paystack.co",
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
      },
    });
    console.log(instance, "instance created");
    return instance;
  }
  verifyPaystackHash(request_headers: any, request_body: any) {
    const hash = createHmac("sha512", this.key)
      .update(JSON.stringify(request_body))
      .digest("hex");
    if (hash == request_headers["x-paystack-signature"]) return true;
    else return false;
  }
  async initialize(data: PaystackPayI) {
    const init = await this.instance.post("/transaction/initialize", {
      amount: data.amount,
      email: data.email,
      reference: data.reference,
      callback_url: data.callback_url ?? undefined,
      plan: data.plan ?? undefined,
      metadata: data.metadata ?? undefined,
      invoice_limit: data.invoice_limit ?? undefined,
      split_code: data.split_code ?? undefined,
      subaccount: data.subaccount ?? undefined,
      transaction_charge: data.transaction_charge ?? undefined,
      bearer: data.bearer ?? undefined,
    });
    return init.data;
  }
  async verifyPayment(ref_id: string) {
    const verify = await this.instance.get(`/transaction/verify/${ref_id}`);
    return verify.data;
  }

  async getTransactionsList() {
    const verify = await this.instance.get(`/transaction`);
    return verify.data;
  }
  async getTransactionsById(trans_id: string) {
    const verify = await this.instance.get(`/transaction/${trans_id}`);
    return verify.data;
  }
  async getTotalTransactionAmount() {
    const verify = await this.instance.get(`/transaction/totals`);
    return verify.data;
  }
}
