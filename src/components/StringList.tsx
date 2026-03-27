interface StringListProps {
  title: string;
  items: string[];
}

export function StringList({ title, items }: StringListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-secondary-foreground mb-2">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-muted-foreground italic">None</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li
              key={i}
              className="px-3 py-1.5 bg-muted rounded text-foreground text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
