import { useState } from 'react';

import useResponsibleStatusEffect from '@/hooks/useResponsible/effects/useResponsibleStatusEffect';
import { ResponsibleStatus } from '@/hooks/useResponsible/types';

const useResponsible = () => {
  const [status, setStatus] = useState<ResponsibleStatus | null>(null);

  useResponsibleStatusEffect({ setStatus });

  return { status };
};

export default useResponsible;
