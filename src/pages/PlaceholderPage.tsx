interface PlaceholderPageProps {
  title: string;
}

function PlaceholderPage({
  title,
}: PlaceholderPageProps) {
  return (
    <div className="w-full min-w-0">
      <p className="text-sm font-semibold text-green-600">
        Football Academy
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        This module will be implemented shortly.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center sm:p-12">
        <h2 className="font-semibold text-slate-700">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Module under development
        </p>
      </div>
    </div>
  );
}

export default PlaceholderPage;