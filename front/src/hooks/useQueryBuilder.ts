import { useState, useCallback } from "react";
import { QueryInput, QueryOutput } from "../types/api";
import { apiService } from "../services/apiService";
import { filterEmptyItems, isSubmitDisabled } from "@/util/queryHelpers";
import { queryService } from "../services/queryService";
export const useQueryBuilder = () => {
  const [mustHave, setMustHave] = useState<string[]>([""]);
  const [optionalOr, setOptionalOr] = useState<string[]>([""]);
  const [exclude, setExclude] = useState<string[]>([""]);
  const [result, setResult] = useState<QueryOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("lofi");

  const addItem = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev) => [...prev, ""]);
    },
    []
  );

  const removeItem = useCallback(
    (
      list: string[],
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number
    ) => {
      if (list.length > 1) {
        setter((prev) => prev.filter((_, i) => i !== index));
      }
    },
    []
  );

  const updateItem = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number,
      value: string
    ) => {
      setter((prev) => {
        const newList = [...prev];
        newList[index] = value;
        return newList;
      });
    },
    []
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    const cleanData: QueryInput = {
      must_have: filterEmptyItems(mustHave),
      optional_or: filterEmptyItems(optionalOr),
      exclude: filterEmptyItems(exclude),
    };   

    try {
      const result = await apiService.generateQuery(cleanData);
       if (result.raw_query.length > 70) {
      setError(
        `Query too long (${result.raw_query.length}/70 characters). Try fewer words.`
      );
      setLoading(false);
      return;
    }
      setResult(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Query generation failed:", error);
    } finally {
      setLoading(false);
    }
  }, [mustHave, optionalOr, exclude]);

  const resetForm = useCallback(() => {
    setMustHave([""]);
    setOptionalOr([""]);
    setExclude([""]);
    setResult(null);
    setError(null);
  }, []);

  return {
    // State
    mustHave,
    optionalOr,
    exclude,
    result,
    loading,
    error,

    // Actions
    setMustHave,
    setOptionalOr,
    setExclude,
    addItem,
    removeItem,
    updateItem,
    handleSubmit,
    resetForm,
    setTheme,

    // Computed
    isSubmitDisabled: isSubmitDisabled(mustHave),
  };
};
