import clsx from 'clsx';
import {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

import {
  MODAL_CONTENT_POSITION,
  MODAL_CONTENT_SIZE,
  MODAL_VARIANTS,
} from '@/components/Modal/ModalBase/constants';
import { ModalBaseProps } from '@/components/Modal/ModalBase/types';
import { Portal } from '@/components/Portal';

const ModalBase = ({
  target,
  variant,
  isOpen,
  dimmed = false,
  children,
  ref,
  ...props
}: PropsWithChildren<ModalBaseProps>) => {
  const { className, ...rest } = props;

  if (!isOpen || !children) return null;

  const isReactElement = (children: unknown): children is ReactElement => {
    return isValidElement(children);
  };

  const _children = isReactElement(children) ? children : <div>{children}</div>;

  return (
    <Portal target={target}>
      <dialog
        ref={ref}
        className={clsx(
          className,
          'open:animate-fade-in left-0 top-0 h-full w-full overflow-hidden',
          variant === MODAL_VARIANTS['MODAL'] && 'safe-area-bottom',
          MODAL_CONTENT_POSITION[variant],
          dimmed && 'bg-[#0C132166] bg-opacity-40',
        )}
        open={isOpen}
        {...rest}
      >
        {cloneElement(_children, {
          className: clsx(
            _children.props.className,
            MODAL_CONTENT_SIZE[variant],
          ),
        })}
      </dialog>
    </Portal>
  );
};

export default ModalBase;
