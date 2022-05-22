import React, { forwardRef } from 'react';

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  name: string;
}

const CheckBox = forwardRef<HTMLInputElement, IIndeterminateInputProps>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return <input type="checkbox" className="ml-5 flex items-center justify-center" ref={resolvedRef} {...rest} />;
  },
);

export default CheckBox;
