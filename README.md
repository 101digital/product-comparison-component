# product-comparison-component

The <b>product-comparison-component</b> is a reusable component which provides way to see Open Banking Product Comaparison in the apps developed by 101 Digital.

## Features

- Give product comparison information between products
- Provide all functions to work with `ProductService`.
- Access to products data, (contain products state, error state) from wherever in React native app.
- Customize component's props and styles

## Installation

To add this component to React Native app, run this command:

```
yarn add git@github.com:101digital/product-comparison-component.git
```

Make sure you have permission to access this repository

To get more details about how to install private repository, can found here: [https://nts.strzibny.name/using-private-github-repositories-with-yarn-and-npm-in-package-json/]

This lib also required some dependencies. Ignore any dependency if it already existed in your project.

- The Theme Component [react-native-theme-component](https://github.com/101digital/react-native-theme-component): Using for base theme styles

- The Webview [react-native-webview](https://github.com/react-native-webview/react-native-webview): View product information

- The The linear gradient [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient): Show gradient background

We're done! Now you can run your project.

## Quick start

### Initial component

Since <b>product-comparison-component</b> have funtions to connect with API, we have to init `ProductService` with app's client before using. Also, wrap your app with `ProductProvider` to connect to Context API

1. Import product-comparison-component

```javascript
import { ProductProvider, ProductService } from 'product-comparison-component';
```

2. Init `ProductService`

```javascript
ProductService.instance().initClients({
  productClient: productApiClient,
});
```

3. Wrap with `ProductProvider` and init themes.

```javascript
const App = () => {
  return (
    <View>
      <ProductProvider>{/* YOUR APP COMPONENTS */}</ProductProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props inside each component

- In order to do multiple languages, you need to pass `i18n` (`i18n` should be configurated in the app level) into `SwitchStatusComponent`, `RecommandBanner`, `SwitchStatusComponent`, as a root props. And then, you have to copy and paste all attributes of `product_comparison_component` in [texts](src/product-comparison-data.json) into your app locale file. You can also change text value, but DON'T change the key.

### Access to Context data and Function

This component provides only one main contexts: `ProductContext`

To access to data, error and function from these contexts, you can use `useContext` inside a React Component.

## Get comparison data

To get comparison data, you must pass params model into `getComparisons` functions

Params model is

```javascript
export interface CompasionRequestParams {
  walletId: string;
  accountSubtype: string;
  productId: string;
  amount: number;
  bankId: string;
  productCategory: string;
  countryCode: string;
  sort?: string;
}
```

## Access comparisons data

```javascript
const { comparisons } = useContext(ProductContext);
```

Each element in the comparisons includes: `walletId`, `amount`, `period`, `accountSubtype`, `products`

All context data and functions details can be found [here](/src/context/context.ts)

### Use component inside screen

You can place components as a React Node inside your React Native screen. All styles, props are provided by default, you can customize them also. There are some required props, you need provide them if components request

Styles, props, components you can find them in API reference

## API Reference

### CompareDetailComponent

This component to show information between current product and future product, include: product name, interest rate, comparison rate

- Props:

| Name                | Type                      | Description                                            |
| :------------------ | :------------------------ | :----------------------------------------------------- |
| walletId            | String (Required)         | Current walletId to get products list                  |
| onSwitchPressed     | Function (Required)       | Handle action when user tap request switch button      |
| actions             | Array string (Required)   | List information can view in the product               |
| gradientColors      | Array color (Optional)    | Gradient colors for future product background          |
| onPressedAction     | Function (Optional)       | Handle action when user tap view product's information |
| componentTitle      | string (Optional)         | Default value is "Switch to save on your home loan"    |
| benefitTitle        | string (Optional)         | Default value is "Benefits"                            |
| interestRateTitle   | string (Optional)         | Default value is "Interest rate"                       |
| comparisonRateTitle | string (Optional)         | Default value is "Comparison rate"                     |
| showDetailTitle     | string (Optional)         | Default value is "Show more Detail >"                  |
| requestButtonTitle  | string (Optional)         | Default value is "Request Switch Now"                  |
| defaultBankImage    | ImageURISource (Optional) | Fallback image if loading bank image is failed         |

- Styles: styles for element inside `CompareDetailComponent` can be found [here](/src/component/compare-detail-component/types.ts)

- Detail modal styles: styles for bottom sheet can be found [here](/src/component/product-detail-modal/types.ts)

- Example

```javascript
import { ProductContext, CompareDetailComponent } from 'product-comparison-component';

export type SwitchAndSaveScreenParams = {
  walletId: string,
};

const SwitchAndSaveScreen = ({ navigation, route }: SwithAndSaveScreenProps) => {
  const { walletId } = route.params;
  const { getComparisonByWalletId } = useContext(ProductContext);

  const comparison = getComparisonByWalletId(walletId);
  const products = comparison?.products ?? [];

  if (isEmpty(products)) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text variant="h3">Empty</Text>
      </Box>
    );
  }

  const showProductDetail = (action: string) => {
    let url;
    switch (action) {
      case 'Product Overview':
        url = products[1].overviewURL;
        break;
      case 'Fee and Pricing':
        url = products[1].feeAndPricingURL;
        break;
      case 'Eligibilty':
        url = products[1].eligibiltyURL;
        break;
      case 'Term and Condition':
        url = products[1].termsURL;
        break;
      default:
        url = '';
        break;
    }
    navigation.navigate(Route.PRODUCT_DETAIL, { url, title: action });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CompareDetailComponent
          props={{
            walletId: walletId,
            onSwitchPressed: () => navigation.navigate(Route.SWITCH_STATUS),
            actions: ['Product Overview', 'Fee and Pricing', 'Eligibilty', 'Term and Condition'],
            onPressedAction: showProductDetail,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default SwitchAndSaveScreen;
```

### ProductDetailComponent

Using to show product information such as Product Overvide, Term and Condition... `url` this required for this component

- Example

```javascript
import { ProductDetailComponent } from 'product-comparison-component';

export type ProductDetailScreenParam = {
  title: string,
  url: string,
};

const ProductDetailScreen = ({ route, navigation }: ProductDetailScreenProps) => {
  const url = route.params.url;
  const title = route.params.title;

  return (
    <SafeAreaView style={styles.container}>
      <ProductDetailComponent url={url} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ProductDetailScreen;
```

### RecommandBannerComponent

That is component using at the bottom of wallet item.

- Props

| Name           | Type                   | Description                                                                                                                                |
| :------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| walletId       | String (Required)      | Current walletId to get products list                                                                                                      |
| formatCurrency | Function (Required)    | Return formatted amount value                                                                                                              |
| onTakeLook     | Function (Required)    | Handle action when user take a look                                                                                                        |
| gradientColors | Array color (Optional) | Gradient colors for background                                                                                                             |
| message        | string (Optional)      | Default value is "You can save approximately %s per month by switching your mortgage to %d.". %s and %d can be replaced with correct value |

- Styles for banner can be found [here](/src/component/recommand-banner-component/types.ts)

- Example

```javascript
import { currencyFormatter } from '@/helpers/currency-formatter';
import {
  WalletComponent,
  WalletContext,
  WalletComponentRefs,
} from '@banking-component/wallet-component';
import { AlertModal } from 'react-native-theme-component';
import { ProductContext, RecommandBannerComponent } from 'product-comparison-component';
import { AccountLinkingContext } from '@banking-component/account-linking';

const AccountsScreen = (props: AccountScreenProps) => {
  const { navigation } = props;
  const { wallets, errorUnlinkWallet, errorUpdatePrimary, clearWalletErrors, errorLinkWallet } =
    useContext(WalletContext);
  const { scrollHandler, headerTitleOpacity, navigationBarOpacity } = useCollapsibleHeaderHandler();
  const accountRef = useRef<WalletComponentRefs>();
  const { comparisons } = useContext(ProductContext);
  const { bankImages } = useContext(AccountLinkingContext);

  useEffect(() => {
    if (!isEmpty(comparisons)) {
      for (var c of comparisons) {
        const _wallet = wallets.find((w) => w.walletId === c.walletId);
        if (_wallet) {
          accountRef?.current?.showRecommandBanner(_wallet);
        }
      }
    }
  }, [comparisons.length]);

  const handleAddBankAccountPressed = () => {
    navigation.navigate(Route.SELECT_BANK);
  };

  return (
    <>
        <SafeAreaView style={styles.container}>
          <WalletComponent
            ref={accountRef}
            Root={{
              props: {
                formatCurrency: currencyFormatter,
                scrollHandler: scrollHandler,
                bankImages: bankImages,
              },
              components: {
                headerTitle: (
                  <Animated.View style={{ opacity: headerTitleOpacity }}>
                    <Text variant="h1" ml="m">
                      {i18n.t('account.lbl_my_account')}
                    </Text>
                  </Animated.View>
                ),
              },
            }}
            Balance={{
              style: {
                titleTextStyle: {
                  color: '#4DA0F5',
                },
                amountTextStyle: {
                  fontSize: 35,
                  lineHeight: 53,
                },
              },
            }}
            WalletItem={{
              props: {
                onItemPressed: (wallet) => {
                  accountRef?.current?.showActionsSheet(wallet);
                },
              },
              components: {
                recommandBanner: (wallet) => (
                  <RecommandBannerComponent
                    walletId={wallet.walletId}
                    formatCurrency={(amount) => currencyFormatter(amount, wallet.currencyCode)}
                    onTakeLook={() =>
                      navigation.navigate(Route.SWITCH_AND_SAVE, {
                        walletId: wallet.walletId,
                      })
                    }
                  />
                ),
              },
            }}
            LinkAccountButton={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            EmptyWallet={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            ActionSheet={{
              props: {
                onSetPrimaryPress: (wallet) => {
                  accountRef?.current?.setAsPrimary(wallet);
                },
                onUnlinkPress: (wallet) => {
                  accountRef?.current?.unlinkWallet(wallet);
                },
                onPressViewTransactions: (wallet) => {
                  navigation.navigate(Route.TRANSACTIONS_TAB, { wallet });
                },
              },
            }}
          />
        </SafeAreaView>
      <AlertModal
        isVisible={!isEmpty(errorUnlinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUnlinkWallet?.toString()}
      />
      <AlertModal
        isVisible={!isEmpty(errorUpdatePrimary?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUpdatePrimary?.toString()}
      />
      <AlertModal
        isVisible={!isEmpty(errorLinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={'Account linking was unsuccessful, please try again'}
      />
    </>
  );
};

export default AccountsScreen;

```

### SwitchStatusComponent

Using for show status of switching

- Props

| Name         | Type                     | Description                                                                                                   |
| :----------- | :----------------------- | :------------------------------------------------------------------------------------------------------------ |
| status       | RequestStatus (Required) | Status of request switching, value can be `success` or `failed`                                               |
| onConfirmed  | Function (Required)      | Handle action when confirm button is pressed                                                                  |
| title        | string (Optional)        | Default value is "'Congratulations! Swicth & Save Request Successful'"                                        |
| message      | string (Optional)        | Default value is "Your switch request has been submitted successfully. We will be in touch with you shortly." |
| successIcon  | ReactNode (Optional)     | Show success icon when status is `success`                                                                    |
| failedIcon   | React Node (Optional)    | Show failed icon when status is `failed`                                                                      |
| confirmTitle | string (Optional)        | Title of confirm button, default is "OK"                                                                      |

- Styles for this component can be found [here](/src/component/switch-status-component/types.ts)

- Example

```javascript
import { SwitchStatusComponent, RequestStatus } from 'product-comparison-component';

const SwitchStatusScreen = ({ navigation }: SwitchStatusScreenProps) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SwitchStatusComponent
        status={RequestStatus.success}
        onConfirmed={() => navigation.navigate(Route.HOME_TAB)}
      />
    </SafeAreaView>
  );
};

export default SwitchStatusScreen;
```

### Add component to the config.json file manually

1. Make sure you synced latest local data in `product-comparison-data.json` into [product-comparison-component.json](https://github.com/101digital/components-data/blob/main/data/product-comparison-component.json). They should be synced once you update

2. Add the product-comparison-component to `components` tags and replate `[data]` with your values. The product-comparison-component have `componentId` is "fddeac89-dae0-40ed-913b-afe990e5c1d7" and it can't be changed.

```
{
...
 "components": [
    {
      "componentId": "fddeac89-dae0-40ed-913b-afe990e5c1d7",
      "name": "ProductComparisonComponent",
      "isRequired": false,
      "config": {
        "productClient": "[data]",
      }
    }
  ]
...
}
```

3. Check required dependencies of product-comparison-component inside tag `dependencies` in `config.json`. Make sure tag `dependencies` must have enough below data

```
{
...
 "dependencies": [
    { "name": "https://github.com/101digital/react-native-theme-component.git" },
    { "name": "react-native-webview", "version": "^10.8.3" },
    { "name": "react-native-linear-gradient", "version": "^2.5.6" }
  ]
...
}
```

If have any item is not existing in `dependencies` of `config.json` file, please find missing one from `src/component.json` and put it to `dependencies`.
