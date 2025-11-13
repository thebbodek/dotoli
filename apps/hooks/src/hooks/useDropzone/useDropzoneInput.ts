import { ACCEPT_FILES } from '@bbodek/utils';
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import useComposeEventHandler from '@/hooks/useComposeEventHandler/useComposeEventHandler';
import { UseDropzoneInput } from '@/hooks/useDropzone/types';
import { parseAcceptAttr } from '@/hooks/useDropzone/utils/acceptFiles';
import useExecuteFunction from '@/hooks/useExecuteFunction/useExecuteFunction';

const useDropzoneInput = ({
  isMultiple = true,
  accept = ACCEPT_FILES,
  disabled = false,
  handleUpload,
}: UseDropzoneInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { execute } = useExecuteFunction();
  const { compose } = useComposeEventHandler();

  const handleChangeCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (!e.target || !e.target.files) return;
      const { files } = e.target;

      handleUpload({ files });
    },
    [handleUpload],
  );

  const inputProps = useMemo(
    () =>
      ({ onChange, ...rest }: InputHTMLAttributes<HTMLInputElement> = {}) => {
        const props = {
          isMultiple,
          type: 'file',
          style: { display: 'none' },
          tabIndex: -1,
          ref: inputRef,
          onChange: execute({
            disabled,
            fn: compose({
              externalEventHandler: onChange,
              internalEventHandler: handleChangeCallback,
            }),
          }),
          accept: parseAcceptAttr({ accept }),
          disabled,
        };

        return { ...props, ...rest };
      },
    [
      isMultiple,
      accept,
      inputRef,
      handleChangeCallback,
      disabled,
      execute,
      compose,
    ],
  );

  return { inputProps, inputRef };
};

export default useDropzoneInput;
