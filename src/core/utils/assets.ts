import { Address } from 'wagmi';

import { SupportedCurrencyKey } from '~/core/references';
import {
  AssetType,
  ParsedAddressAsset,
  ParsedAsset,
  UniqueId,
  ZerionAsset,
  ZerionAssetPrice,
} from '~/core/types/assets';
import { ChainName } from '~/core/types/chains';

import { chainIdFromChainName, isNativeAsset } from './chains';
import {
  convertAmountAndPriceToNativeDisplay,
  convertAmountToBalanceDisplay,
  convertAmountToNativeDisplay,
  convertAmountToPercentageDisplay,
  convertRawAmountToDecimalFormat,
} from './numbers';

const get24HrChange = (priceData?: ZerionAssetPrice) => {
  const twentyFourHrChange = priceData?.relative_change_24h;
  return twentyFourHrChange
    ? convertAmountToPercentageDisplay(twentyFourHrChange)
    : '';
};

export const getNativeAssetPrice = ({
  priceData,
  currency,
}: {
  priceData?: ZerionAssetPrice;
  currency: SupportedCurrencyKey;
}) => {
  const priceUnit = priceData?.value;
  return {
    change: get24HrChange(priceData),
    amount: priceUnit || 0,
    display: convertAmountToNativeDisplay(priceUnit || 0, currency),
  };
};

export const getNativeAssetBalance = ({
  currency,
  priceUnit,
  value,
}: {
  currency: SupportedCurrencyKey;
  decimals: number;
  priceUnit: number;
  value: string | number;
}) => {
  return convertAmountAndPriceToNativeDisplay(value, priceUnit, currency);
};

export function parseAsset({
  address,
  asset,
  currency,
}: {
  address: Address;
  asset: ZerionAsset;
  currency: SupportedCurrencyKey;
}): ParsedAsset {
  const chainName = asset?.network ?? ChainName.mainnet;
  const chainId = chainIdFromChainName(chainName);
  const uniqueId: UniqueId = `${address}_${chainId}`;
  const parsedAsset = {
    address,
    colors: asset?.colors,
    chainId,
    chainName,
    isNativeAsset: isNativeAsset(address, chainName),
    name: asset?.name,
    mainnetAddress: asset?.mainnet_address,
    native: {
      price: getNativeAssetPrice({
        currency,
        priceData: asset?.price,
      }),
    },
    price: asset?.price,
    symbol: asset?.symbol,
    type: asset?.type ?? AssetType.token,
    uniqueId,
  };

  return parsedAsset;
}

export function parseAddressAsset({
  address,
  asset,
  currency,
  quantity,
}: {
  address: Address;
  asset: ZerionAsset;
  currency: SupportedCurrencyKey;
  quantity: string;
}): ParsedAddressAsset {
  const amount = convertRawAmountToDecimalFormat(quantity, asset?.decimals);
  const parsedAsset = parseAsset({
    address,
    asset,
    currency,
  });
  return {
    ...parsedAsset,
    balance: {
      amount,
      display: convertAmountToBalanceDisplay(amount, {
        decimals: asset?.decimals,
        symbol: asset?.symbol,
      }),
    },
    native: {
      ...parsedAsset.native,
      balance: getNativeAssetBalance({
        currency,
        decimals: asset?.decimals,
        priceUnit: asset?.price?.value || 0,
        value: amount,
      }),
    },
  };
}
