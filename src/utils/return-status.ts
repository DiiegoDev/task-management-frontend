type Status = "Not started" | "In progress" | "Done";

export function returnStatus(status: string) {
  if (status === "Pendente") return "Andamento";
  if (status === "Andamento") return "Feita";
  if (status === "Feita") return "Feita";
}
