import { useMutation } from "@tanstack/react-query";
import ApiEndpoints from "../constants/ApiEndpoints";
import { requestHelper } from "../helpers";

/**
 * A custom hook that provides IFSC (Indian Financial System Code) bank details lookup functionality
 * using React Query's mutation capabilities.
 * 
 * @param {Object} params - The parameters for the hook
 * @param {(data: Object) => void} params.onSuccess - Callback function to be called when bank details are successfully fetched
 * @returns {UseMutationResult} A React Query mutation result object containing:
 * @returns {(ifsc: string) => Promise<Object>} mutate - Function to trigger the IFSC lookup
 * @returns {boolean} isLoading - Whether the mutation is currently in progress
 * @returns {Object|null} data - The fetched bank details if successful
 * @returns {Error|null} error - Any error that occurred during the mutation
 */
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

/**
 * Example usage:
 * 
 * ```jsx
 * function BankDetailsForm() {
 *   const [bankDetails, setBankDetails] = useState(null);
 * 
 *   const { mutate: lookupBank, isLoading } = useIFSC({
 *     onSuccess: (data) => {
 *       setBankDetails(data);
 *     }
 *   });
 * 
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     const ifscCode = e.target.ifsc.value;
 *     lookupBank(ifscCode);
 *   };
 * 
 *   return (
 *     <div>
 *       <form onSubmit={handleSubmit}>
 *         <input
 *           name="ifsc"
 *           placeholder="Enter IFSC Code"
 *           pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
 *           required
 *         />
 *         <button type="submit" disabled={isLoading}>
 *           {isLoading ? 'Looking up...' : 'Find Bank'}
 *         </button>
 *       </form>
 * 
 *       {bankDetails && (
 *         <div>
 *           <h3>{bankDetails.bank}</h3>
 *           <p>Branch: {bankDetails.branch}</p>
 *           <p>Address: {bankDetails.address}</p>
 *           <p>City: {bankDetails.city}</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
