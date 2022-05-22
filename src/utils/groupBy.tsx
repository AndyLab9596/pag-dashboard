interface SelectOption {
  value: any;
  label: string;
}

interface GroupResult {
  value: string;
  label: string;
}

export const groupOptionsByLabel = (options: SelectOption[]) => {
  return options.reduce((acc, curr) => {
    const groupBy = curr.label;
    let index = acc.findIndex(item => item.label === groupBy);
    if (index !== -1) {
      (acc[index] as SelectOption).value += `,${curr.value}`;
      return acc;
    }
    let newItem = {
      label: groupBy,
      value: curr.value !== undefined ? `${curr.value}` : '',
    };

    acc.push(newItem);
    return acc;
  }, [] as GroupResult[]);
};
