import { useMutation } from "@tanstack/react-query";
import ApiEndpoints from "../constants/ApiEndpoints";
import { requestHelper } from "../helpers";

function useIFSC({ onSuccess }) {
  return useMutation({
    mutationKey: [ApiEndpoints.Bank.IFSC.url],
    mutationFn: async (ifsc) => {
      const res = await requestHelper.request({
        ...ApiEndpoints.Bank.IFSC,
        params: { ifsc },
      });
      return res?.data?.data;
    },
    onSuccess: async (data) => {
      onSuccess(data);
      successToast("Bank found!");
    },
    onError: (errorObject) => {
      errorToast("Bank not found!");
    },
  });
}

export default useIFSC;
