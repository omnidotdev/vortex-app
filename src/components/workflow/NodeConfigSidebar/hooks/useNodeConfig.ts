"use client";

import { useCallback, useEffect, useState } from "react";

interface UseNodeConfigReturn {
  formData: Record<string, unknown>;
  handleChange: (key: string, value: unknown) => void;
  handleNestedChange: (parentKey: string, key: string, value: unknown) => void;
  resetForm: (data: Record<string, unknown>) => void;
  isDirty: boolean;
}

export const useNodeConfig = (
  initialData: Record<string, unknown>,
): UseNodeConfigReturn => {
  const [formData, setFormData] = useState<Record<string, unknown>>(
    initialData || {},
  );
  const [isDirty, setIsDirty] = useState(false);

  // Reset when initial data changes (node selection changed)
  useEffect(() => {
    setFormData(initialData || {});
    setIsDirty(false);
  }, [initialData]);

  const handleChange = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const handleNestedChange = useCallback(
    (parentKey: string, key: string, value: unknown) => {
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...((prev[parentKey] as Record<string, unknown>) || {}),
          [key]: value,
        },
      }));
      setIsDirty(true);
    },
    [],
  );

  const resetForm = useCallback((data: Record<string, unknown>) => {
    setFormData(data);
    setIsDirty(false);
  }, []);

  return {
    formData,
    handleChange,
    handleNestedChange,
    resetForm,
    isDirty,
  };
};
