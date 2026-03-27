import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";
import type { ParsedService } from "@/lib/parseXml";

export function ServiceTab({ data }: { data: ParsedService }) {
  const hasAuthorization = data.autzSources.length > 0;
  const hasAccounting = data.acctProxyTargets.length > 0;

  const ruleRows = data.serviceRules.map((rule) => ({
    Type: rule.type,
    Name: rule.name,
    Operator: rule.operator,
    Value: rule.value,
  }));

  return (
    <div className="space-y-6">
      <div className="border border-border rounded p-4 space-y-2 bg-card text-sm">
        <FieldRow label="Name" value={data.name} />
        <FieldRow label="Description" value={data.description} />
        <FieldRow label="Type" value="802.1X Wireless" />
        <FieldRow label="Status" value={data.status} />
        
        {/* Novos campos exibidos condicionalmente se existirem */}
        {data.actionProfile !== "—" && (
          <FieldRow label="Action Profile Name" value={data.actionProfile} />
        )}
        {data.category !== "—" && (
          <FieldRow label="Category" value={data.category} />
        )}

        <div className="flex gap-3 py-2">
          <span className="font-semibold text-secondary-foreground min-w-[180px]">
            Monitor Mode:
          </span>
          <label className="flex items-center gap-2 text-foreground opacity-90">
            <input type="checkbox" checked={data.monitorMode} readOnly disabled className="cursor-not-allowed" />
            Enable to monitor network access without enforcement
          </label>
        </div>

        <div className="flex gap-3 py-2 border-t border-border mt-2 pt-4">
          <span className="font-semibold text-secondary-foreground min-w-[180px]">
            More Options:
          </span>
          <div className="flex flex-wrap gap-5 text-foreground opacity-90">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={hasAuthorization} readOnly disabled className="cursor-not-allowed" /> 
              Authorization
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={data.postureCompliance} readOnly disabled className="cursor-not-allowed" /> 
              Posture Compliance
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={data.auditEndHosts} readOnly disabled className="cursor-not-allowed" /> 
              Audit End-hosts
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={data.profileEndpoints} readOnly disabled className="cursor-not-allowed" /> 
              Profile Endpoints
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={hasAccounting} readOnly disabled className="cursor-not-allowed" /> 
              Accounting Proxy
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-muted p-2 border border-border border-b-0 rounded-t font-semibold text-secondary-foreground text-sm text-center">
          Service Rule
        </div>
        <DataTable
          columns={["Type", "Name", "Operator", "Value"]}
          rows={ruleRows}
          emptyMessage="No service rules configured."
        />
      </div>
    </div>
  );
}