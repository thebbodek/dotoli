import { Persona, PersonaProps } from '@/components/Persona';

const TableCellPersona = (
  props: Omit<PersonaProps, 'type' | 'size' | 'profileTheme'>,
) => {
  return <Persona {...props} type='single' size='sm' profileTheme='light' />;
};

export default TableCellPersona;
