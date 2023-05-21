import axiosClient from "@/helpers/apiClient";
import { TObdRequest } from "@/helpers/types";

export const createObdMessage = async ({ dtc_code, dtc_meaning, description, possible_cause }:TObdRequest) => {
    return await axiosClient.post("/upload_dtc", { dtc_code, dtc_meaning, description, possible_cause });
}

export const getAllObdMessages = async () => {
    return await axiosClient.get("/get_uploaded_dtc");
}