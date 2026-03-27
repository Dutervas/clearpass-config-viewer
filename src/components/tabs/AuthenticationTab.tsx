import type { ParsedService } from "@/lib/parseXml";
import { StringList } from "@/components/StringList";

export function AuthenticationTab({ data }: { data: ParsedService }) {
  return (
    <div className="space-y-6">
      <StringList title="Authentication Methods" items={data.authMethods} />
      <StringList title="Authentication Sources" items={data.authSources} />
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground mb-2">
          Strip Username Rules
        </h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={data.stripUsername}
              readOnly
              className="rounded border-border accent-primary"
            />
            Strip Username
          </label>
          <input
            type="text"
            readOnly
            value={data.stripRulesCsv || ""}
            placeholder="No rules"
            className="flex-1 max-w-md px-3 py-1.5 rounded border border-input bg-card text-foreground text-sm"
          />
        </div>
      </div>
    </div>
  );
}
