import { useMutation } from "@tanstack/react-query";
import { posterWithFormData } from "@/lib/utils";
import type { ApiResponse } from "@/types/api";

type PredictionResponse = ApiResponse<PredictionResult>;
type PredictImageVariables = { image: File; token: string };
type PredictionResult = {
  label: string;
  probs: number[];
  percentage: number;
};

export const usePredictMutation = () => {
  return useMutation<PredictionResponse, Error, PredictImageVariables>({
    mutationFn: ({ image, token }) => {
      const formData = new FormData();
      formData.append("image", image);
      return posterWithFormData("/predict", token, formData);
    },
  });
};
