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

- The [react-native-theme-component](https://github.com/101digital/react-native-theme-component): Using for base theme styles

- The [react-native-webview](https://github.com/react-native-webview/react-native-webview): View product information

- The [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient): Show gradient background

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
  mortgageClient: mortgageApiClient,
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

### Access to Context data and Function

This component provides only one main contexts: `ProductContext`

To access to data, error and function from these contexts, you can use `useContext` inside a React Component.

### Use component inside screen

You can place components as a React Node inside your React Native screen. All styles, props are provided by default, you can customize them also. There are some required props, you need provide them if components request

Styles, props, components you can find them in API reference

## API Reference

### CompareDetailComponent

This component to show information between current product and future product, include: product name, interest rate, comparison rate

- Props:

| Name                | Type                      | Description                                            |
| :------------------ | :------------------------ | :----------------------------------------------------- |
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

- Styles: styles for element inside `CompareDetailComponent` can be found [here](https://github.com/101digital/product-comparison-component/blob/main/src/component/compare-detail-component/types.ts)

- Detail modal styles: styles for bottom sheet can be found [here](https://github.com/101digital/product-comparison-component/blob/main/src/component/product-detail-modal/types.ts)

### ProductDetailComponent

Using to show product information such as Product Overvide, Term and Condition... `url` this required for this component

### RecommandBannerComponent

That is component using at the bottom of wallet item.

- Props

| Name           | Type                   | Description                                                                                                                                |
| :------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| formatCurrency | Function (Required)    | Return formatted amount value                                                                                                              |
| onTakeLook     | Function (Required)    | Handle action when user take a look                                                                                                        |
| gradientColors | Array color (Optional) | Gradient colors for background                                                                                                             |
| message        | string (Optional)      | Default value is "You can save approximately %s per month by switching your mortgage to %d.". %s and %d can be replaced with correct value |

- Styles for banner can be found [here](https://github.com/101digital/product-comparison-component/blob/main/src/component/recommand-banner-component/types.ts)

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

- Styles for this component can be found [here](https://github.com/101digital/product-comparison-component/blob/main/src/component/switch-status-component/types.ts)

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
