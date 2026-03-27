import type { ParsedService } from "@/lib/parseXml";
import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";

export function EnforcementTab({ data }: { data: ParsedService }) {
  const ep = data.enfPolicy;
  return (
    <div className="space-y-6">
      <FieldRow label="Enforcement Policy" value={data.enfPolicyName} />
      {ep ? (
        <>
          <FieldRow label="Default Profile" value={ep.defaultProfile} />
          <FieldRow label="Evaluation Algorithm" value={ep.evalAlgorithm} />
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Rules</h3>
            <DataTable
              columns={["Conditions", "Enforcement Profiles"]}
              rows={ep.rules.map((r) => ({
                Conditions: r.conditions,
                "Enforcement Profiles": r.profiles,
              }))}
            />
          </div>
        </>
      ) : (
        <p className="text-muted-foreground italic">
          No enforcement policy found.
        </p>
      )}
    </div>
  );
}
