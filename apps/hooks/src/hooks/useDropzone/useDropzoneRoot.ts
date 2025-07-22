import { DragEvent, HTMLAttributes, useCallback, useMemo, useRef } from 'react';

import useComposeEventHandler from '@/hooks/useComposeEventHandler/useComposeEventHandler';
import { DROPZONE_ACTION_MAPPER } from '@/hooks/useDropzone/constants';
import { UseDropzoneRoot } from '@/hooks/useDropzone/types';
import useExecuteFunction from '@/hooks/useExecuteFunction/useExecuteFunction';

const useDropzoneRoot = ({
  inputRef,
  dispatch,
  disabled = false,
  handleUpload,
}: UseDropzoneRoot) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { execute } = useExecuteFunction();
  const { compose } = useComposeEventHandler();

  const isRelatedDropZone = useMemo(
    () => (e: DragEvent<HTMLDivElement>) =>
      e.relatedTarget instanceof Node &&
      rootRef.current &&
      rootRef.current.contains(e.relatedTarget),
    [rootRef.current],
  );

  const handleMouseEnterCallback = useCallback(
    () => dispatch({ type: DROPZONE_ACTION_MAPPER['HOVER'], isHover: true }),
    [dispatch],
  );

  const handleMouseLeaveCallback = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (isRelatedDropZone(e)) return;

      dispatch({ type: DROPZONE_ACTION_MAPPER['HOVER'], isHover: false });
    },
    [dispatch, isRelatedDropZone],
  );

  const handleDragEnterCallback = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      dispatch({ type: DROPZONE_ACTION_MAPPER['DRAG'], isDragActive: true });
    },
    [dispatch],
  );

  const handleDragLeaveCallback = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (isRelatedDropZone(e)) return;

      dispatch({ type: DROPZONE_ACTION_MAPPER['DRAG'], isDragActive: false });
    },
    [dispatch, isRelatedDropZone],
  );

  const handleDragOverCallback = useCallback(
    (e: DragEvent<HTMLDivElement>) => e.preventDefault(),
    [],
  );

  const handleDropCallback = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!e.dataTransfer || !e.dataTransfer.files) return;
      const { files } = e.dataTransfer;

      handleUpload({ files });
    },
    [handleUpload],
  );

  const handleClickCallback = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  }, [inputRef.current]);

  const rootProps = useMemo(
    () =>
      ({
        onDrop,
        onClick,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onMouseEnter,
        onMouseLeave,
        role,
        ...rest
      }: HTMLAttributes<HTMLDivElement> = {}) => {
        const props = {
          onDrop: execute({
            disabled,
            fn: compose({
              externalEventHandler: onDrop,
              internalEventHandler: handleDropCallback,
            }),
          }),
          onClick: execute({
            disabled,
            fn: compose({
              externalEventHandler: onClick,
              internalEventHandler: handleClickCallback,
            }),
          }),
          onDragEnter: execute({
            disabled,
            fn: compose({
              externalEventHandler: onDragEnter,
              internalEventHandler: handleDragEnterCallback,
            }),
          }),
          onDragLeave: execute({
            disabled,
            fn: compose({
              externalEventHandler: onDragLeave,
              internalEventHandler: handleDragLeaveCallback,
            }),
          }),
          onDragOver: execute({
            disabled,
            fn: compose({
              externalEventHandler: onDragOver,
              internalEventHandler: handleDragOverCallback,
            }),
          }),
          onMouseEnter: execute({
            disabled,
            fn: compose({
              externalEventHandler: onMouseEnter,
              internalEventHandler: handleMouseEnterCallback,
            }),
          }),
          onMouseLeave: execute({
            disabled,
            fn: compose({
              externalEventHandler: onMouseLeave,
              internalEventHandler: handleMouseLeaveCallback,
            }),
          }),
          role: typeof role === 'string' && role !== '' ? role : 'presentation',
          ref: rootRef,
        };

        return {
          ...props,
          ...rest,
        };
      },
    [
      handleDropCallback,
      handleClickCallback,
      handleDragEnterCallback,
      handleDragLeaveCallback,
      handleDragOverCallback,
      handleMouseEnterCallback,
      handleMouseLeaveCallback,
      rootRef,
      disabled,
      execute,
      compose,
    ],
  );

  return { rootProps };
};

export default useDropzoneRoot;
