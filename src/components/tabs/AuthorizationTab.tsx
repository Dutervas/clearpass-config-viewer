import type { ParsedService } from "@/lib/parseXml";
import { StringList } from "@/components/StringList";

export function AuthorizationTab({ data }: { data: ParsedService }) {
  return (
    <StringList
      title="Additional Authorization Sources"
      items={data.autzSources}
    />
  );
}
