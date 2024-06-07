export function Cards() {
  return (
    <section className="w-full bg-background border-t flex flex-col items-center pt-16 pb-16">
      <h2 className="text-lg lg:text-2xl font-semibold mb-14">
        Simplifique Suas Tarefas
      </h2>

      <div className="w-4/5 lg:w-8/12 grid grid-cols-cards gap-4 lg:gap-8">
        <div className="border p-6 rounded-lg flex-1 min-w-[270px] max-w-[350px]">
          <h3 className="font-medium lg:text-lg mb-6">
            Organize Suas Tarefas de Programação
          </h3>

          <p className="text-sm font-light leading-relaxed text-secondary-foreground">
            Com o devDuty, você pode gerenciar todas as suas tarefas de
            programação de forma eficiente. Veja o status de cada tarefa, a data
            de entrega, a prioridade e o tipo de tarefa em uma única tabela
            intuitiva.
          </p>
        </div>

        <div className="border p-6 rounded-lg flex-1 min-w-[270px] max-w-[350px]">
          <h3 className="font-medium text-lg mb-3">
            Classifique Suas Tarefas com Facilidade
          </h3>

          <p className="text-sm font-light leading-relaxed text-secondary-foreground">
            O devDuty permite que você categorize suas tarefas em diferentes
            tipos, como adição de novas funcionalidades, criação de documentação
            ou correção de bugs.
          </p>
        </div>

        <div className="border p-6 rounded-lg flex-1 min-w-[270px] max-w-[350px]">
          <h3 className="font-medium text-lg mb-3">
            Mantenha o Controle Total
          </h3>
          <p className="text-sm font-light leading-relaxed text-secondary-foreground">
            Com o devDuty, você tem controle total sobre o processo de
            desenvolvimento. Acompanhe o progresso das tarefas, ajuste
            prioridades e mantenha-se informado sobre os prazos.
          </p>
        </div>
      </div>
    </section>
  );
}
