interface Props {
  title: string;
  label: string;
  status: string;
  priority: string;
  dueDate?: Date;
}

export function returnDefaultValues(values: Props | undefined) {
  const defaultValues = {
    title: values?.title || "",
    label: values?.label || "",
    status: values?.status || "",
    priority: values?.priority || "",
  };
  if (values?.dueDate) {
    return {
      ...defaultValues,
      dueDate: values.dueDate,
    };
  }

  return defaultValues;
}
