import { Persona, PersonaProps } from '@/components/Persona';

const TableCellPersona = (
  props: Omit<PersonaProps, 'type' | 'size' | 'color'>,
) => {
  return <Persona {...props} type='single' size='sm' color='black' />;
};

export default TableCellPersona;
