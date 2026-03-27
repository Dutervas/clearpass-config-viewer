import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";
import type { ParsedService } from "@/lib/parseXml";

export function EnforcementTab({ data }: { data: ParsedService }) {
  if (!data.enfPolicy) {
    return <p className="text-muted-foreground italic">No Enforcement Policy configured.</p>;
  }

  const tableRows = data.enfPolicy.rules.map(rule => ({
    "Conditions": rule.conditions,
    "Enforcement Profiles": rule.profiles
  }));

  return (
    <div className="space-y-6">
      
      <div className="flex items-center gap-2 bg-card p-3 border border-border rounded text-sm opacity-90">
        <span className="font-semibold text-secondary-foreground min-w-[150px]">
          Use Cached Results:
        </span>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={data.useCachedResults} readOnly disabled className="cursor-not-allowed" />
          Use cached Roles and Posture attributes from previous sessions
        </label>
      </div>

      <div className="border border-border rounded p-4 space-y-2 bg-card text-sm mt-4">
        <div className="bg-muted -mx-4 -mt-4 p-2 border-b border-border mb-4 text-center font-semibold text-secondary-foreground">
          Enforcement Policy Details
        </div>
        <FieldRow label="Enforcement Policy" value={data.enfPolicy.name} />
        <FieldRow label="Default Profile" value={data.enfPolicy.defaultProfile} />
        <FieldRow label="Rules Evaluation Algorithm" value={data.enfPolicy.evalAlgorithm} />
      </div>

      <DataTable
        columns={["Conditions", "Enforcement Profiles"]}
        rows={tableRows}
        emptyMessage="No enforcement rules configured."
      />
    </div>
  );
}