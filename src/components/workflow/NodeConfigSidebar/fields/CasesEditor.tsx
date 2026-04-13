import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SwitchCase {
  value: string;
  label: string;
}

interface CasesEditorProps {
  cases: SwitchCase[];
  onChange: (cases: SwitchCase[]) => void;
}

export const CasesEditor = ({ cases = [], onChange }: CasesEditorProps) => {
  const handleAddCase = () => {
    onChange([...cases, { value: "", label: "" }]);
  };

  const handleRemoveCase = (index: number) => {
    onChange(cases.filter((_, i) => i !== index));
  };

  const handleUpdateCase = (
    index: number,
    field: "value" | "label",
    value: string,
  ) => {
    const updated = cases.map((c, i) =>
      i === index ? { ...c, [field]: value } : c,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Cases</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCase}
        >
          <Plus className="mr-1 h-3 w-3" />
          Add Case
        </Button>
      </div>

      {cases.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No cases defined. Add a case to create switch branches.
        </p>
      ) : (
        <div className="space-y-2">
          {cases.map((c, index) => (
            <div key={`case-${index}`} className="flex items-center gap-2">
              <Input
                placeholder="Value"
                value={c.value}
                onChange={(e) =>
                  handleUpdateCase(index, "value", e.target.value)
                }
                className="flex-1"
              />
              <Input
                placeholder="Label"
                value={c.label}
                onChange={(e) =>
                  handleUpdateCase(index, "label", e.target.value)
                }
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCase(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
