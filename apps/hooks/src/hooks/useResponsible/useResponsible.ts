import { useState } from 'react';

import { ResponsibleStatus } from '@/hooks/useResponsible/types';
import useResponsibleStatusEffect from '@/hooks/useResponsible/effects/useResponsibleStatusEffect';

const useResponsible = () => {
  const [status, setStatus] = useState<ResponsibleStatus | null>(null);

  useResponsibleStatusEffect({ setStatus });

  return { status };
};

export default useResponsible;
