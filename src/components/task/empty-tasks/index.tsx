export function EmptyTasks() {
  return (
    <div className="w-full flex justify-center mt-10 mb-10">
      <div className="flex justify-center w-full md:w-4/5 lg:w-4/6 rounded border pt-24 pb-24">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Nenhuma tarefa encontrada!</h2>
          <p className="font-light text-sm mt-2">
            Crie uma tarefa para exibi-la aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
