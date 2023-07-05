export enum CurrencyE {
  NGN = "NGN",
  GHS = "GHS",
  USD = "USD",
  ZAR = "ZAR",
}
export interface PaystackPayI {
  amount: number;
  email: string;
  reference: string;
  currency?: CurrencyE;
  plan?: string;
  invoice_limit?: number;
  callback_url?: string;
  metadata?: string;
  split_code?: string;
  subaccount?: string;
  transaction_charge?: string;
  bearer?: string;
}
