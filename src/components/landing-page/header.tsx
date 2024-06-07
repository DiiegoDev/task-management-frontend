export function Header() {
  return (
    <header className="h-28 flex justify-center items-center border-b">
      <div className="w-4/5 flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10 rounded-sm bg-primary-foreground"></div>
          <span className="text-2xl font-semibold">Devduty</span>
        </div>
      </div>
    </header>
  );
}
