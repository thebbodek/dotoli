import { Persona, PersonaProps } from '@/components/Persona';

const TableCellPersona = (
  props: Omit<PersonaProps, 'type' | 'size' | 'profileTheme'>,
) => {
  return <Persona {...props} profileTheme='light' size='sm' type='single' />;
};

export default TableCellPersona;
