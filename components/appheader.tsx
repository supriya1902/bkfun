export default function AppHeader({
  title,
  subtitle,
  chip,
}: {
  title: string;
  subtitle?: string;
  chip?: React.ReactNode;
}) {
  return (
    <section>
      {chip ? <div className="mb-4">{chip}</div> : null}
      <h1 className="text-3xl font-black">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-zinc-400">{subtitle}</p> : null}
    </section>
  );
}