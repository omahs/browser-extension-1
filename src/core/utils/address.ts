import { Address } from 'wagmi';

import { UniqueId } from '../types/assets';
import { ChainId } from '../types/chains';

export function truncateAddress(address: Address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function deriveAddressAndChainWithUniqueId(uniqueId: UniqueId) {
  const fragments = uniqueId.split('_');
  const address = fragments[0] as Address;
  const chain = parseInt(fragments[1], 10) as ChainId;
  return {
    address,
    chain,
  };
}
