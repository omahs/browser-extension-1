import { useAccount } from 'wagmi';

import { selectUserAssetWithUniqueId } from '~/core/resources/_selectors/assets';
import { useUserAssets } from '~/core/resources/assets';
import { useCurrentCurrencyStore } from '~/core/state';
import { useConnectedToHardhatStore } from '~/core/state/currentSettings/connectedToHardhat';
import { UniqueId } from '~/core/types/assets';

export function useUserAsset(uniqueId: UniqueId) {
  const { address } = useAccount();
  const { currentCurrency: currency } = useCurrentCurrencyStore();
  const { connectedToHardhat } = useConnectedToHardhatStore();

  const { data: asset } = useUserAssets(
    {
      address,
      currency,
      connectedToHardhat,
    },
    {
      select: selectUserAssetWithUniqueId(uniqueId),
    },
  );

  return asset;
}
